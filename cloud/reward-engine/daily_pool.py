# cloud/reward-engine/daily_pool.py

from dataclasses import dataclass
from typing import Optional


@dataclass
class EmissionConfig:
    """
    Configuration for the daily mining emission algorithm.

    All data scores are in "gold data units" (normalized shot-score).
    """
    total_mining_tokens: float     # TOTAL_MINING_TOKENS (e.g. 200_000_000 CLUB)
    target_data_score: float       # TARGET_DATA_SCORE (e.g. 100_000_000 data units)
    curvature_p: float = 1.0       # P; >1 front-loads, <1 back-loads, 1 is linear


def _fraction_remaining(data_score: float, target_data_score: float) -> float:
    """
    Compute fraction of required data still remaining, clamped to [0, 1].

    f = 1 - (data_score / target_data_score)
    """
    if target_data_score <= 0:
        # Degenerate case: no data target configured, treat as fully complete.
        return 0.0

    f = 1.0 - (data_score / target_data_score)
    if f < 0.0:
        return 0.0
    if f > 1.0:
        return 1.0
    return f


def _cumulative_emitted_fraction(fraction_remaining: float, curvature_p: float) -> float:
    """
    Fraction of TOTAL_MINING_TOKENS that should have been emitted
    at a given fraction_remaining, using the curve:

        A(f) = TOTAL * (1 - f^P)

    where:
        f = fraction_remaining in [0, 1]
        P > 1  => more front-loaded
        P = 1  => linear
        P < 1  => more back-loaded
    """
    if curvature_p <= 0:
        # If misconfigured, default to linear.
        curvature_p = 1.0

    return 1.0 - (fraction_remaining ** curvature_p)


def compute_daily_pool(
    config: EmissionConfig,
    prev_data_score: float,
    curr_data_score: float,
) -> float:
    """
    Compute the daily emission pool based on cumulative data progress.

    Inputs:
        config          EmissionConfig with global parameters
        prev_data_score Cumulative validated data score up to yesterday
        curr_data_score Cumulative validated data score up to today

    Output:
        daily_pool      Tokens to emit today (float; caller can round as needed)

    Invariant:
        Summation of daily_pool over the whole mining phase
        will never exceed config.total_mining_tokens, assuming
        data_score is monotonically non-decreasing.
    """
    # Clamp scores to be non-negative and non-decreasing in case of noisy inputs
    if prev_data_score < 0:
        prev_data_score = 0.0
    if curr_data_score < prev_data_score:
        curr_data_score = prev_data_score

    f_prev = _fraction_remaining(prev_data_score, config.target_data_score)
    f_curr = _fraction_remaining(curr_data_score, config.target_data_score)

    emitted_prev_frac = _cumulative_emitted_fraction(f_prev, config.curvature_p)
    emitted_curr_frac = _cumulative_emitted_fraction(f_curr, config.curvature_p)

    # Fraction of total_mining_tokens that should be emitted cumulatively
    # up to prev and curr; delta is today's pool fraction.
    delta_frac = emitted_curr_frac - emitted_prev_frac
    if delta_frac <= 0:
        return 0.0

    daily_pool = config.total_mining_tokens * delta_frac
    return max(0.0, daily_pool)


def example_usage() -> None:
    """
    Simple example to illustrate behavior.
    Not called in production.
    """
    cfg = EmissionConfig(
        total_mining_tokens=200_000_000,
        target_data_score=100_000_000,
        curvature_p=1.5,  # slightly front-loaded
    )

    # Suppose yesterday we had 10M data units, and today we have 12M
    prev_score = 10_000_000
    curr_score = 12_000_000

    pool_today = compute_daily_pool(cfg, prev_score, curr_score)
    print(f"Daily pool for progress {prev_score} -> {curr_score}: {pool_today:.2f} CLUB")


if __name__ == "__main__":
    example_usage()
