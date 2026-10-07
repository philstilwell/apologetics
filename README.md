# Crosshairs Audit Lab

Static GitHub Pages suite for Crosshairs audits: compact tools that inspect Christian claims, evidential standards, bridge premises, probabilistic assumptions, and substantiation gaps.

Author: Phil Stilwell

The home page covers six New Testament promise categories and asks visitors to commit to what they actually believe the passages promise, if anything. Each commitment requires a definite position, a specific claim in the visitor’s own words, and explicit affirmation; earthly claims also require a declared standard for failure. Drafts and uncertainty remain unresolved. Original bronze emblems, hover/focus/tap explanations, a saved record, and a text download support the exercise. Long life now brings healing, protection (sparrows), and health/care (lilies) into one category, while keeping each passage and its limits explicit. Previous separate answers remain available as read-only records and in downloads. The Promise Test Field now continues within three guided steps: read the promise, name a fair test, and see what remains. Evidence plans, support/failure/inconclusive rules, and independently checked versus unverified exceptions appear in the record and download. A belief can be committed while its test remains visibly incomplete. The exercise, old-address transition, and nine other primary modules work on phones; the retained previous interface and two supporting pages still require tablet-size screens or larger. Older Promise Test Field shared links and JSON files still work in `apps/falsifiability-field/legacy.html`.

The visible “Beyond promises” directory introduces nine other modules through plain questions about evidence, arguments for Christianity, and morality. Each opens in three guided stages, with optional background, access to all sections, and a route back to the directory. The original calculations, saved work, and transfers are preserved. Navigation is distinct from completing an exercise.

Every module also prepares a prompt for any AI, including the visitor’s written answers, selections, other cases, and optional further explanation. “Ask any AI to assess my position” appears in the third stage, each promise result, and the complete promise record. Visitors can review, copy, or download a rigorous assessment request covering contradictions, weak premises, missing evidence, possible repairs, and optional fair tests. Prompts are generated locally; the site sends nothing to an AI. Extra explanations are saved separately and can be removed by clearing their field.

A readiness percentage and missing-answer checklist keep prompts locked until the required details and explicit review are complete. Edits require renewed confirmation. Promise reviews require affirmed claims, defined scope, interpretive reasons, and relevant test terms or an explained refusal; the full record requires all six categories. The percentage measures completeness, not the quality or truth of a position. Prompts now request a concise assessment focused on up to three major weaknesses and two useful tests.

## Continuing the project

The working project is **XHAIRS.com — Crosshairs Audit Lab**.

- [Project brief](PROJECT_BRIEF.md): purpose, ten tools, structure, and publishing instructions.
- [Restoration audit](RESTORATION_AUDIT.md): October 7, 2026 verification results and maintenance priorities.
- [Agent instructions](AGENTS.md): working conventions and required checks for future chats.

Development checks:

```sh
npm ci --ignore-scripts
npx playwright install chromium --only-shell
npm test
npm --prefix apps/theism-gradient-audit test
```

The first two commands prepare local test dependencies. The website itself is served directly from this repository.

## Apps

<!-- GENERATED:readme-apps:start -->
- Belief Overreach Audit: a fair-die calibration drill and transfer audit for showing how confidence can outrun perceived evidence and create unsupported commitments.
- Fine-Tuning Bridge Audit: an upstream bridge audit for checking whether fine-tuning really licenses design, life-purpose, human-purpose, or thicker theistic conclusions.
- Earthly Promise Test Field: now integrated into the home-page promise commitments, with the previous interface preserved for saved files and shared results.
- Promising Gods Mirror: a companion mirror that uses fictive gods and flat earthly outcomes to show where public promises collapse into protected or merely comforting non-promises.
- Inductive Symmetry Audit: an interactive diagnostic for spotting cherry-picked inductive standards in apologetic arguments.
- Resurrection Evidence Audit: a Bayesian self-audit for resurrection and miracle claims, including explicit priors, likelihoods, dependence weights, required Bayes factors, pitfall flags, and a postdiction comparator.
- Moral System Threshold: a preliminary checklist for deciding whether a claimed Christian morality has enough architecture to count as a moral system at all.
- Moral System Stress Test: a coherence audit for testing whether Christian moral claims supply an actual moral system or collapse into emotion, obedience, practical advice, or vague guidance.
- Moral Particulars Audit: a case-level audit for mapping concrete Christian moral judgments to their grounders and disagreement diagnoses.
- Deism-Theism Gradient Audit: a Christianity-focused assessment of confidence, substantiation gaps, dependency tensions, and bridge claims across 50 graded claims.
<!-- GENERATED:readme-apps:end -->

## GitHub Pages

The published site is static and can be served from the repository root.

Recommended Pages settings:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

For a local preview:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Useful paths:

<!-- GENERATED:readme-paths:start -->
- Hub: `http://localhost:8080/`
- Belief Overreach Audit: `http://localhost:8080/apps/belief-overreach-audit/`
- Fine-Tuning Bridge Audit: `http://localhost:8080/apps/fine-tuning-bridge-audit/`
- Earthly Promise Test Field: `http://localhost:8080/apps/falsifiability-field/`
- Promising Gods Mirror: `http://localhost:8080/apps/promising-gods-mirror/`
- Inductive Symmetry Audit: `http://localhost:8080/apps/inductive-symmetry-audit/`
- Resurrection Evidence Audit: `http://localhost:8080/apps/resurrection-evidence-audit/`
- Moral System Threshold: `http://localhost:8080/apps/moral-system-threshold/`
- Moral System Stress Test: `http://localhost:8080/apps/moral-system-stress-test/`
- Moral Particulars Audit: `http://localhost:8080/apps/moral-particulars-audit/`
- Deism-Theism Gradient Audit: `http://localhost:8080/apps/theism-gradient-audit/app.html`
<!-- GENERATED:readme-paths:end -->
