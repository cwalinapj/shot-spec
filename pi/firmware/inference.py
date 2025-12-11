"""
Inference stub for ShotSpec Pi firmware.

In v0, this just computes simple statistics on the frames.
Later we will:
- load a real model onto the AI accelerator (e.g. Hailo-8),
- generate compact embeddings,
- estimate club/ball vectors at impact.
"""

from __future__ import annotations

from typing import Dict, List, Tuple

import numpy as np

from pi.firmware.camera import StereoFrame


class InferenceEngine:
    def __init__(self, model_path: str | None) -> None:
        self.model_path = model_path
        # TODO: load accelerator / model here

    def run(self, clip: List[StereoFrame]) -> Dict:
        """
        Run "inference" on a stereo clip.

        For now, returns simple brightness/stddev metrics so that the
        firmware loop has something structured to work with.
        """
        left_frames = [f[0] for f in clip]
        right_frames = [f[1] for f in clip]

        def _stats(frames: List[np.ndarray]) -> Dict[str, float]:
            stacked = np.stack(frames, axis=0).astype("float32")
            return {
                "mean": float(stacked.mean()),
                "std": float(stacked.std()),
                "min": float(stacked.min()),
                "max": float(stacked.max()),
            }

        return {
            "left_stats": _stats(left_frames),
            "right_stats": _stats(right_frames),
            "num_frames": len(clip),
        }
