# XHAIRS.com project brief

Crosshairs Audit Lab is Phil Stilwell's collection of interactive tools for examining Christian apologetic claims. It helps users make evidential standards, assumptions, dependencies, and degrees of confidence explicit. The site is available at [xhairs.com](https://xhairs.com/), with its source and history in [philstilwell/apologetics](https://github.com/philstilwell/apologetics).

The project contains ten tools, a shared home page, manuals, curricula, and an academic paper. The October 7, 2026 restoration recovered the published version and established a new working folder named `XHAIRS.com`. A subsequent redesign replaced the dense home page with an introduction to nine biblical promise claims. See [the restoration audit](RESTORATION_AUDIT.md) for the original verification results and remaining maintenance priorities.

## Promise introduction

The home page now begins with nine illustrated topics: answered prayer, healing, protection, provision, wisdom and guidance, prophecy, transformed character, health, and long life. Each opens a contextualized KJV passage and a short radio-button exercise. Visitors distinguish an earthly guarantee, improved chances, a spiritual reading, a historically limited promise, no such promise, and uncertainty. Earthly readings ask whether fair failure would count against the interpretation; optional checkboxes record safeguards for a proposed test.

Results describe the visitor's interpretation and testing commitments, not study findings. No empirical results are supplied. The first saved interpretation is retained when the visitor revises it, without treating that revision as evidence of evasion. Saved answers stay in this browser under `crosshairs.promise-intro.v1` and can be downloaded as plain text. Reset affects only this introduction.

All nine topics, their hover/focus/tap explanations, and the exercise work on phones. The detailed audit library retains all ten tools, manuals, curricula, and the academic paper. Those older interactive pages still require at least 768 CSS pixels.

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

- `index.html`, `assets/promise-landing.css`, and `scripts/promise-intro.mjs` provide the introductory home page. `scripts/promise-catalog.mjs` holds the verses and proposed tests; `scripts/promise-model.mjs` holds the interpretation rules and saved-answer validation.
- `styles.css` retains the detailed tool layouts. `assets/site-theme.css` supplies the coordinated charcoal, ivory, and bronze presentation without changing their calculations or saved-answer formats. Self-hosted Barlow fonts and their licenses are in `assets/fonts/`; generated promise emblems and their Imagegen prompts are in `assets/promises/`.
- `apps/` holds the ten tools and their individual logic.
- `scripts/tool-manifest.mjs` describes the tool catalog, document links, pathways, and page metadata. `scripts/apply-seo.mjs` applies that material to generated sections and search metadata.
- `assets/manuals/`, `assets/curricula/`, `output/pdf/`, and the Theism Gradient `docs/` folder contain public PDFs. Preserve the existing paths because they are published links.
- `paper/crosshairs-audit-paper.qmd` and `paper/references.bib` contain the authoritative paper source and references. Read `paper/README.md` before editing it.
- `apologist-question-writeups.md` holds question-led descriptions useful for outreach.
- `scripts/small-screen-notice.js` deliberately disables interaction below 768 CSS pixels on the detailed tool pages. The home page does not load this restriction.

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
