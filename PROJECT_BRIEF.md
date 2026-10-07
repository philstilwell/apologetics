# XHAIRS.com project brief

Crosshairs Audit Lab is Phil Stilwell's collection of interactive tools for examining Christian apologetic claims. It helps users make evidential standards, assumptions, dependencies, and degrees of confidence explicit. The site is available at [xhairs.com](https://xhairs.com/), with its source and history in [philstilwell/apologetics](https://github.com/philstilwell/apologetics).

The project contains ten tools, a shared home page, manuals, curricula, and an academic paper. The October 7, 2026 restoration recovered the current published version and established a new working folder named `XHAIRS.com`. See [the restoration audit](RESTORATION_AUDIT.md) for verification results and priorities.

## Purpose and interpretation

The tools inspect reasoning rather than issue automatic verdicts about Christianity. Users should be able to identify which premises support a conclusion, whether confidence exceeds the support supplied, and whether the same standard is applied to rival claims. The home page explicitly distinguishes audit pressure from the probability that a claim is false, and describes scores as structured reflections of user inputs.

Preserve this distinction in explanations, graphs, manuals, and promotional writing. A useful result identifies a pressure point and the assumptions behind it; it does not claim that an app has proved someone wrong. Christian and skeptical users should both be able to apply the tools consistently.

## Tool catalog

| Tool | Purpose | Published path |
| --- | --- | --- |
| Belief Overreach Audit | Compare confidence, perceived support, commitment, and risk | `/apps/belief-overreach-audit/` |
| Fine-Tuning Bridge Audit | Examine each inference from life-permitting conditions to stronger design and theological claims | `/apps/fine-tuning-bridge-audit/` |
| Earthly Promise Test Field | Examine whether claims about prayer, healing, protection, and guidance remain open to ordinary testing | `/apps/falsifiability-field/` |
| Promising Gods Mirror | Use fictive gods and flat earthly outcomes to examine protected promises | `/apps/promising-gods-mirror/` |
| Inductive Symmetry Audit | Identify unequal standards for favored and rival evidence | `/apps/inductive-symmetry-audit/` |
| Resurrection Evidence Audit | Examine miracle evidence, priors, alternatives, and source dependence | `/apps/resurrection-evidence-audit/` |
| Moral System Threshold | Check whether a claimed morality supplies the minimum components of a moral system | `/apps/moral-system-threshold/` |
| Moral System Stress Test | Examine the coherence and completeness of that system | `/apps/moral-system-stress-test/` |
| Moral Particulars Audit | Apply moral commitments to concrete cases and disagreements | `/apps/moral-particulars-audit/` |
| Deism-Theism Gradient Audit | Compare confidence and substantiation across 50 progressively specific claims | `/apps/theism-gradient-audit/app.html` |

Each tool has a manual and curriculum linked from the home page. The full site has 13 HTML pages: the home page, ten primary tools, Inductive Symmetry theory notes, and the Theism Gradient introduction.

## Structure and prior decisions

The site uses ordinary HTML, CSS, and JavaScript and is published directly from the repository root. There is no required production build or paid application backend in this setup. Node.js and Playwright support local tests; PDF and paper generation have separate requirements.

- `index.html` and `styles.css` provide the home page and shared presentation.
- `apps/` holds the ten tools and their individual logic.
- `scripts/tool-manifest.mjs` describes the tool catalog, document links, pathways, and page metadata. `scripts/apply-seo.mjs` applies that material to generated sections and search metadata.
- `assets/manuals/`, `assets/curricula/`, `output/pdf/`, and the Theism Gradient `docs/` folder contain public PDFs. Preserve the existing paths because they are published links.
- `paper/crosshairs-audit-paper.qmd` and `paper/references.bib` contain the authoritative paper source and references. Read `paper/README.md` before editing it.
- `apologist-question-writeups.md` holds question-led descriptions useful for outreach.
- `scripts/small-screen-notice.js` deliberately disables interaction below 768 CSS pixels. The current product expects an iPad-size display or larger.

The home page groups tools into guided pathways. Preserve the progression from Moral System Threshold to Moral System Stress Test to Moral Particulars, and the bridge from Fine-Tuning to the Theism Gradient. Several tools store responses in the visitor's browser and exchange results through imports or handoffs; changes to those formats require compatibility checks.

## Publishing and local work

GitHub Pages currently publishes the root of `main`. `CNAME` contains `xhairs.com`. A push to `main` can therefore update the public site. HTTPS URLs were verified during restoration, although GitHub's HTTPS enforcement setting was off; review that configuration as a separate maintenance task.

Use the same repository and domain for continued development. Inspect remote changes before editing or pushing, preserve the existing history, and review the final changes before publishing. The original recovered folder remains a fallback copy.

Run the project locally from its root:

```sh
npm ci --ignore-scripts
npx playwright install chromium --only-shell
npm test
npm --prefix apps/theism-gradient-audit test
python3 -m http.server 8080 --bind 127.0.0.1
```

The final command serves an on-demand preview at `http://127.0.0.1:8080/`; stop it when finished. The first two commands are setup steps, not requirements to repeat for every edit. Test results and remaining maintenance work are recorded in [RESTORATION_AUDIT.md](RESTORATION_AUDIT.md).
