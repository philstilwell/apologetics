# Crosshairs Paper Starter

This folder is a local-first academic paper workspace for the `apologetics` tool suite.

Recommended workflow:

- Primary authoring stack: `Quarto`
- Fast PDF-first fallback: `Typst`
- Optional final-stage collaboration/submission: `Overleaf`

Why this setup:

- `Quarto` is the best fit when you want one source that can become `PDF`, `DOCX`, and `HTML`.
- `Typst` is the best fit when you want a clean, fast, attractive PDF with minimal tooling friction.
- `Overleaf` remains useful for coauthors, publisher templates, and journal submission workflows.

Files:

- `crosshairs-audit-paper.qmd`: authoritative Quarto manuscript
- `crosshairs-audit-paper.typ`: optional early Typst starter, not kept in lockstep with the Quarto manuscript
- `references.bib`: bibliography for the Quarto draft
- `generate_visual_preview.py`: generates the visual preview, pathway schematic, and hub QR assets
- `_quarto.yml`: project-level Quarto configuration

Useful commands:

```sh
cd paper
python3 generate_visual_preview.py
quarto render crosshairs-audit-paper.qmd --to pdf
quarto render crosshairs-audit-paper.qmd --to docx
quarto render crosshairs-audit-paper.qmd --to html
typst compile crosshairs-audit-paper.typ
```

Current manuscript title:

`From Theological Inclination to Defensible Belief: Interactive Audits for Honest Religious Inquiry`

Current recommendation for the paper's main theme:

`Crosshairs Audit Lab as a scaffolded pedagogy of epistemic calibration for theologically inclined inquiry.`
