ShotSpec Emissions Algorithm  
How the Daily Mining Pool Tracks Remaining Data Needs

This document defines how ShotSpec converts a fixed total mining budget into a dynamic daily reward pool based on how much training data is still needed.

The goal is simple:
Only emit CLUB when useful data progress has been made, and never exceed the total mining budget.

---

Core Inputs

TOTAL_MINING_TOKENS  
Total CLUB allocated for data-mining rewards over the lifetime of the mining phase.

TARGET_DATA_SCORE  
Total desired amount of “gold data units.”  
This is a normalized score that weights shots by quality, angles, devices, and conditions.

Example:
• A phone-only shot might be 1 data unit  
• A shot with phone plus Neural Node might be 3 data units  
• A full three-angle impact capture could be 5 or more data units

---

Fraction of Data Remaining

Each day the system computes:

fraction_remaining_t = 1 - (data_score_t / TARGET_DATA_SCORE)

where data_score_t is the cumulative validated data score up to that day.

The value is clamped to the range [0, 1]:

• At launch: data_score = 0 → fraction_remaining = 1.0  
• At full target: data_score = TARGET_DATA_SCORE → fraction_remaining = 0.0

---

Linear Emission (P = 1)

The simplest form is:

daily_pool_t = TOTAL_MINING_TOKENS × (f_prev - f_curr)

where:
• f*prev = fraction_remaining*(t-1)  
• f_curr = fraction_remaining_t

Properties:
• If no new data arrives, f_prev = f_curr and daily_pool = 0  
• If a lot of progress happens, daily_pool is larger  
• Summed over the whole mining period, total emissions never exceed TOTAL_MINING_TOKENS

---

Curved Emission (Front- or Back-Loaded)

To shape reward timing, a curvature parameter P is introduced:

A(f) = TOTAL_MINING_TOKENS × (1 - f^P)

Where:
• f is fraction_remaining  
• P > 1 front-loads rewards  
• P = 1 keeps them linear  
• P < 1 back-loads rewards

The cumulative fraction of tokens that should have been emitted at a given f is:

emitted_fraction(f) = 1 - f^P

The daily pool is then:

daily_pool_t = TOTAL_MINING_TOKENS × (emitted_fraction(f_curr) - emitted_fraction(f_prev))

Again, the sum of all daily pools over the full mining phase equals TOTAL_MINING_TOKENS.

---

Implementation Summary

Inputs per day:
• prev_data_score (yesterday)  
• curr_data_score (today)  
• EmissionConfig with:
• total_mining_tokens  
 • target_data_score  
 • curvature_p (P)

Algorithm steps:

1. Clamp prev_data_score and curr_data_score so curr_data_score is not less than prev_data_score.
2. Compute f_prev and f_curr as fractions remaining.
3. Compute emitted_fraction for both using curvature_p.
4. daily_pool = TOTAL_MINING_TOKENS × (emitted_fraction_curr - emitted_fraction_prev).
5. If delta is negative or zero, emit 0 for that day.

---

Where It Fits In ShotSpec

This algorithm lives in the cloud reward engine and runs once per day.  
The daily_pool is then subdivided based on:

• Device tiers (Neural Node, Lite Node, Phone Node)  
• Course rarity and co-op status  
• Environmental rarity (wind, snow, temperature extremes)  
• Bag completeness and club NFTs  
• Anti-cheat and validation status

This ensures:
• The total mining allocation is mathematically capped  
• Rewards scale with meaningful progress  
• The protocol can flexibly front- or back-load incentives using a single parameter

---

Configuration Guidance

Early in the network:
• curvature_p > 1 (for example 1.5 to 2.0)  
• Stronger daily pools when data is scarce

Later in the network:
• curvature_p approaches 1.0 or slightly below  
• Emissions become smoother and less aggressive

All of this is DAO-governable so the community can evolve the curve as the model approaches “neural network launch monitor” maturity.
