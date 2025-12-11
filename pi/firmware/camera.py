"""
Stereo camera helper for ShotSpec Pi firmware.

This is a simple OpenCV-based stub. On a real Pi you may switch to
Picamera2, GStreamer, or the DepthAI SDK depending on hardware.

For now, it:
- opens two video devices (left/right),
- captures a short stereo clip,
- returns frames as a list of (left, right) pairs.
"""

from __future__ import annotations

import time
from pathlib import Path
from typing import List, Optional, Tuple

import cv2
import numpy as np


StereoFrame = Tuple[np.ndarray, np.ndarray]


class StereoCamera:
    def __init__(
        self,
        left_id: int,
        right_id: int,
        data_dir: Path,
        fps: int = 120,
    ) -> None:
        self.left_id = left_id
        self.right_id = right_id
        self.fps = fps
        self.data_dir = data_dir

        self.left_cap: Optional[cv2.VideoCapture] = None
        self.right_cap: Optional[cv2.VideoCapture] = None

    def open(self) -> None:
        self.left_cap = cv2.VideoCapture(self.left_id)
        self.right_cap = cv2.VideoCapture(self.right_id)

        if not self.left_cap.isOpened():
            raise RuntimeError("Could not open left camera")
        if not self.right_cap.isOpened():
            raise RuntimeError("Could not open right camera")

        # Optional: configure FPS / resolution here
        self.left_cap.set(cv2.CAP_PROP_FPS, self.fps)
        self.right_cap.set(cv2.CAP_PROP_FPS, self.fps)

    def close(self) -> None:
        if self.left_cap is not None:
            self.left_cap.release()
        if self.right_cap is not None:
            self.right_cap.release()

    def capture_clip(self, seconds: float = 0.5) -> Optional[List[StereoFrame]]:
        """
        Capture a short stereo clip and return frames as a list.

        This is a simple blocking capture loop; later we can optimize
        and add real impact-triggered capture.
        """
        if self.left_cap is None or self.right_cap is None:
            raise RuntimeError("Cameras not opened")

        num_frames = max(1, int(self.fps * seconds))
        frames: List[StereoFrame] = []

        start = time.time()
        for _ in range(num_frames):
            ret_l, frame_l = self.left_cap.read()
            ret_r, frame_r = self.right_cap.read()

            if not ret_l or not ret_r:
                # If either camera fails, abort this clip
                break

            frames.append((frame_l, frame_r))

        if not frames:
            return None

        return frames
