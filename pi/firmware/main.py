"""
ShotSpec Pi Firmware - main entrypoint

Responsibilities:
- Initialize stereo cameras
- Run capture loop
- Call edge inference on impact clips
- Prepare PPCP message payloads for the phone
"""

import time
import logging
from pathlib import Path

from pi.firmware.camera import StereoCamera
from pi.firmware.inference import InferenceEngine


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] %(message)s",
)

DATA_DIR = Path("/tmp/shotspec_pi")


def main() -> None:
    logging.info("Starting ShotSpec Pi firmware...")

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # TODO: replace device indices with actual camera IDs on the Pi
    stereo = StereoCamera(left_id=0, right_id=1, data_dir=DATA_DIR)
    engine = InferenceEngine(model_path=None)  # placeholder

    try:
        stereo.open()
        logging.info("Stereo cameras initialized.")

        while True:
            # In v0, we just grab a short clip periodically.
            # Later this will be triggered by real impact detection.
            logging.info("Capturing impact clip candidate...")
            clip = stereo.capture_clip(seconds=0.5)

            if clip is None:
                logging.warning("No frames captured, retrying...")
                time.sleep(1.0)
                continue

            logging.info("Running edge inference on captured clip...")
            result = engine.run(clip)

            logging.info("Inference result: %s", result)

            # TODO: build PPCP message here and send to phone
            # For now we just log and loop.
            time.sleep(1.0)

    except KeyboardInterrupt:
        logging.info("Shutting down (Ctrl-C)...")
    finally:
        stereo.close()
        logging.info("Cameras closed. Goodbye.")


if __name__ == "__main__":
    main()
