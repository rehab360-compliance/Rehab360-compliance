# Rehab360-compliance

Compliance documentation and templates for Rehab360, covering SAQA and HWSETA accreditation requirements.

## Repository Structure

| Path | Description |
|------|-------------|
| [docs/saqa/assessment-moderation/](docs/saqa/assessment-moderation/) | SAQA/HWSETA assessment, moderation, and accreditation evidence templates |
| [docs/outpatient-treatment-curriculum/](docs/outpatient-treatment-curriculum/) | UTC-based outpatient SUD treatment curriculum — SAQA/HWSETA evidence, curriculum modules, facilitator resources, learner materials, and assessment templates |

## Key Documents

- [Accreditation Evidence Alignment Table – SAQA/HWSETA](docs/saqa/assessment-moderation/accreditation-evidence-alignment-table.md) – evidence mapping for NQF Level 4 (Peer Counseling) and NQF Level 5 (Facilitators)
- [Outpatient Treatment Curriculum – Overview](docs/outpatient-treatment-curriculum/README.md) – UTC-based outpatient SUD programme aligned to HWSETA NQF Level 4 and Level 5
- [UTC Module Overview](docs/outpatient-treatment-curriculum/curriculum/utc-module-overview.md) – all ten UTC modules with learning outcomes, duration, and unit standard alignment
- [Accreditation Evidence Alignment Table – Outpatient Treatment Curriculum](docs/outpatient-treatment-curriculum/saqa/assessment-moderation/accreditation-evidence-alignment-table.md) – evidence mapping for the UTC outpatient programme

## UTCOPD Mirror Repository

The content of [`docs/outpatient-treatment-curriculum/`](docs/outpatient-treatment-curriculum/) is automatically mirrored to **[Akgosil3/UTCOPD](https://github.com/Akgosil3/UTCOPD)** on every push to `main` that modifies files in that folder, via the [sync-to-utcopd workflow](.github/workflows/sync-to-utcopd.yml).

### One-time setup required

A repository secret named `UTCOPD_PUSH_TOKEN` must be added to this repository before the workflow can push to UTCOPD:

1. Create a GitHub Personal Access Token (classic) for `Akgosil3` with **`repo`** scope, or a fine-grained PAT with **Contents: Read and write** access to `Akgosil3/UTCOPD`.
2. In `rehab360-compliance/Rehab360-compliance` → **Settings → Secrets and variables → Actions**, add a new secret:
   - **Name:** `UTCOPD_PUSH_TOKEN`
   - **Value:** the PAT created in step 1.
3. Trigger the workflow manually via **Actions → Sync outpatient curriculum to UTCOPD → Run workflow** for the initial push, or merge this PR to `main` to trigger it automatically.
