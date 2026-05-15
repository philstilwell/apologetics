# Theism Gradient

A local, dependency-free dashboard inside the Crosshairs Audit Lab suite for assessing Christianity-focused God-related claims, especially general claims about divine action, prayer, healing, wisdom, foreknowledge, guidance, and transformation.

Author: Phil Stilwell

The app rates 50 auditable claims using confidence and personal-substantiation sliders, stores responses in `localStorage`, and computes:

- aggregate gradient position
- evidentially weighted theism index
- substantiation gaps
- dependency tensions
- category summaries
- plain-English profile summaries

## Calculation Model

- Effective support = `100 * sqrt((Confidence / 100) * (Personal Substantiation / 100))`.
- Claim weight is the same value on a 0-1 scale.
- Aggregate gradient position starts at `1` and adds the average effective support in the four rightward bands: Design Deism, Personal Theism, Interventionist Theism, and Specific Christian Theism. Minimal Deism anchors the baseline.
- Theism index = `((Aggregate Position - 1) / 4) * 100`.
- Substantiation gap = `max(0, Confidence - Personal Substantiation)`, so high Personal Substantiation does not cancel unsupported confidence elsewhere.
- Dependency tension compares a downstream claim's effective support with the average effective support of its prerequisite bridge claims; unrated prerequisites count as zero current support.

## Run

```bash
cd apps/theism-gradient-audit
node server.mjs
```

Then open [http://localhost:4173](http://localhost:4173) for the hub, or [http://localhost:4173/app.html](http://localhost:4173/app.html) for the assessment.

## Structure

- `index.html`: app entry page linking this assessment and sibling Crosshairs audits
- `app.html`: the Theism Gradient assessment
- `favicon.svg`: olive-green `T` favicon
- `docs/deism-theism-gradient-audit-manual.pdf`: printable manual for sincere seekers and basic functions
- `public/claims.json`: the 50-claim bank and metadata
- `src/scoring.ts`: TypeScript scoring model from the project seed
- `src/scoring.js`: browser module used by the static app
- `scripts/verify-calculations.mjs`: calculation and claim-bank verification
- `scripts/build-manual-pdf.py`: ReportLab generator for the PDF manual
- `src/app.js`: dashboard state, rendering, persistence, and interactions
- `src/styles.css`: dashboard styling
- `docs/deism_theism_gradient_app_brief.md`: current app brief
