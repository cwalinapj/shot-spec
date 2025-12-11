cat > README.md << 'EOF'

# ShotSpec Monorepo

ShotSpec is a **golf data + AI network** built around:

- **Pi Pods**: edge devices with stereo cameras + AI accelerator
- **Phone App**: wallet, GPS oracle, DTL camera, and UX
- **Cloud Orchestrator**: validation, fusion, anti-cheat, AI pipeline
- **Solana Programs**: rewards, NFTs, staking, governance

The goal: turn every golf swing into **verifiable, on-chain telemetry** and train a
world–class golf model using real–world impact data.

---

## Repository Structure

Top-level layout:

- `pi/` – Pi firmware, inference, and Pi–Phone Communication Protocol (PPCP)
- `phone-app/` – Mobile app (wallet, GPS, DTL capture, UX)
- `cloud/` – Backend APIs, validation, reward engine, ML fusion
- `solana/` – Anchor programs for devices, rewards, NFTs, governance
- `models/` – Training, inference, embeddings, and datasets
- `hardware/` – CAD, enclosures, mounts, electronics, battery design
- `docs/` – Specs, protocol docs, whitepaper, tokenomics
- `infra/` – Docker, k8s, Terraform, GitHub Actions, deployment scripts
- `scripts/` – Dev utilities, setup helpers, migration tools
- `tests/` – Cross-system tests and integration harnesses

---

## High-Level Architecture

```text
      +----------------------+
      |        Cloud         |
      | Validation + AI/ML   |
      +----------+-----------+
                 ^
                 | LTE/5G (Phone Uplink)
      +----------+-----------+
      |        Phone         |
      | Wallet + GPS + DTL   |
      +----------+-----------+
                 ^
                 | BLE / WiFi-Direct
      +----------+-----------+
      |         Pi           |
      | Stereo Impact + AI   |
      +----------------------+
```
