# XHAIRS.com restoration audit

The October 7, 2026 restoration establishes a verified starting point for continued work on Crosshairs Audit Lab. The recovered current website contains ten tools and passes its existing automated checks. Its public pages and linked PDFs matched the current GitHub source at the start of the restoration. The remaining work concerns document portability, the archived/supporting pages’ small-screen restrictions, and deeper interaction coverage. Later October 7 work below resolves the Mirror reveal defect and adds guided, phone-accessible primary modules.

## Recovered version

The older local copy ended at `feec66241b902880658065c8806a7b8d6583efa7` on May 15, 2026. GitHub's `main` was 25 commits ahead, at [`4405a1dffb85832a155a13065c7146bd3378c124`](https://github.com/philstilwell/apologetics/commit/4405a1dffb85832a155a13065c7146bd3378c124), dated May 21, 2026. The older commit is an ancestor of that version; there was no divergent local branch or uncommitted source change to reconcile.

The restoration retained the repository's complete 304-commit history at that baseline, including Promising Gods Mirror, its manual and curriculum, the academic paper, and later home-page refinements. The original local folder was left intact. The active destination folder is named `XHAIRS.com`.

## Checks and results

| Check | Result | Scope |
| --- | --- | --- |
| Root calculation tests | Passed | Fine-Tuning and Belief Overreach checks |
| Browser startup suite | Passed | All 13 HTML pages at desktop size and 390 by 844; expected headings, titles, JavaScript error checks, and small-screen notices |
| Moral calculation checks | Passed | Existing Moral Particulars and Moral System Stress scenarios |
| Theism Gradient checks | Passed | Scoring functions and the 50-claim bank |
| Internal page references | Passed | 372 HTML link and resource references; no missing target files or static anchors |
| Live site comparison | Passed | 13 pages and 21 linked PDFs returned HTTP 200 and matched local bytes exactly before restoration changes |
| PDF structure | Passed | All 26 repository PDFs opened through `pdfinfo`; 476 pages in total |
| PDF font embedding | Maintenance required | 25 PDFs contain unembedded fonts; only the academic paper has all listed fonts embedded |
| External article and companion links | Partly verified | Credencing and LogFall returned HTTP 200; Academia.edu returned HTTP 403 to the automated checker |
| Visual spot check | Passed for sampled views | Home-page opening layout and Promising Gods Mirror choice/result layout in Chrome |
| Mirror interaction sample | Passed | Choosing the first stop line changed the completion count to 1 of 9 and the failure tally to 1 |
| Test-runner failure cleanup | Fixed and verified | A deliberately unavailable browser now reports its error and exits instead of leaving the local server running |

The browser suite verifies startup and selected calculation scenarios. It does not exhaustively validate every control, export, import, handoff, or philosophical model. The PDF checks verify readable structure and font metadata; they are not a visual review of every page. The static reference check does not cover every dynamically constructed JavaScript URL. Treat the Academia.edu response as an access restriction to this checker, not proof of a broken destination.

## Changes made during restoration

- Added a project brief, durable agent instructions, and this audit, with links from the README.
- Restored the locked development dependencies and the browser version needed by the existing tests.
- Corrected `scripts/smoke-test.mjs` so it closes its server even when the browser fails to launch or close.
- Kept private recovery notes and raw audit evidence under ignored `.local/`.

No tool formula, public page, published PDF, or domain setting was changed as part of this restoration.

## Priorities for the next work

**Subsequent redesign, October 7, 2026:** The home page now offers a phone-accessible nine-promise introduction, with original Imagegen emblems and coordinated typography. The older tools and all document paths remain available. The new introduction has separate interpretation rules and browser journey checks. At that stage the PDF-font and Mirror reveal findings remained open. The later module redesign below resolves the Mirror defect and extends phone access to the nine other primary modules.

### Embed the fonts in the manuals and curricula

All 20 currently linked tool manuals and curricula, plus five older or duplicate PDFs, rely on unembedded fonts. Their rendering depends on the reader's system substituting fonts. Regenerate the documents with embedded fonts, then compare extracted text, page counts, and rendered pages with the originals. Preserve their public paths and verify every font with `pdffonts`. The academic paper already has embedded fonts.

### Keep the Mirror parallels hidden until the exercise is complete

Promising Gods Mirror says the Christian parallels remain locked until all nine cases are decided. However, its visible classroom report already includes those parallels in the initial state, and `buildReportText()` includes them in the copyable report. The browser spot check confirmed that the report is visible while the reveal still reports eight remaining cases.

Review `renderReport()`, `buildReportText()`, and `renderReveal()` in `apps/promising-gods-mirror/app.js`. Apply the completion condition consistently to the screen report, copied report, and printed report. Add a regression check that parallels are absent before completion and present after all nine decisions. This defect predates restoration. It was resolved in the later module redesign described below; both report paths now require all nine decisions.

### Decide how phone users should reach the site

At restoration, the shared notice deliberately blocked interaction below 768 CSS pixels, including the home page. The later promise and module redesigns replace that restriction on the home page, transition, and nine primary tools. The previous Promise Test Field interface and two supporting pages still retain it. Tests now distinguish phone access from those remaining restrictions.

### Expand tests around complete user journeys

Prioritize Promising Gods Mirror's complete reveal flow, the Threshold to Stress Test to Particulars handoff, the Fine-Tuning to Theism Gradient transfer, and response import/export round trips. Include incomplete inputs and saved responses. Keep assumptions and score interpretations explicit when reviewing calculations.

### Review HTTPS enforcement and the external article link

GitHub Pages reports deployment from `main`, repository root, with `xhairs.com` as the custom domain. HTTPS access works, but the GitHub `https_enforced` setting was false during restoration. Check the domain's redirect and certificate configuration before changing that setting. Verify the Academia.edu article in a normal signed-in browser if the reference is needed for publication.

## Reproducing the existing checks

From the repository root:

```sh
npm ci --ignore-scripts
npx playwright install chromium --only-shell
npm test
npm --prefix apps/theism-gradient-audit test
```

For a particular PDF, use `pdfinfo path/to/file.pdf` and `pdffonts path/to/file.pdf`. Every font row in a newly generated PDF must show `yes` in the embedding column. Local raw results and recovery provenance are kept in `.local/evidence/` and `.local/RESTORATION_HANDOFF.md`; those files are excluded from Git.


## October 7, 2026 — Promise Test Field integration

The original restoration results above remain a historical baseline. The Promise Test Field's primary experience now lives in the home-page promise exercise, following Read the promise → Name a fair test → See what remains. Evidence, outcome rules, fair comparisons, ordinary explanations, eight possible defenses against a miss, and belief revision are retained without numerical testability scores. The interface distinguishes an affirmed belief from an incomplete test and distinguishes independent checks from unverified protection.

The original URL now provides a phone-accessible transition; the previous interface is retained at `apps/falsifiability-field/legacy.html`. Original `#state=` links route there with their payload intact. Previous JSON import/export and manual paths are preserved. The suite now contains 14 HTML pages. Existing PDFs were not regenerated; the previously documented font limitations remain.

Validation passed: root calculation checks; 12 promise-model checks; all 14 pages at desktop and phone sizes; all nine promise journeys; independent-condition versus unverified-exception handling; first-test revision records; storage, downloads, keyboard navigation, and narrow-screen forms; old shared-state redirects and JSON round trips; and the separate Theism Gradient checks. All 89 local links from the three affected pages resolve. Metadata regeneration is repeatable without further changes. Desktop and phone views were also inspected in the browser.


## October 7, 2026 — Six New Testament categories

Healing, protection, and health are now grouped with Long life, leaving six landing-page categories. The combined category presents Ephesians 6:2–3, James 5:14–15, the sparrows in Matthew 10:29–31, and the lilies in Matthew 6:28–30. Current introductory quotations, context links, and related references are all in the New Testament. Context explains that sparrows can fall and that the lilies comparison explicitly concerns clothing; a health or lifespan inference must be argued. Each passage remains separately readable.

Saved format version 2 preserves v1 answers for the four former categories in a read-only record and in downloads. No prior answer is automatically affirmed as the combined claim. The other five categories retain their commitments. Old healing/protection/health links open their corresponding reading in Long life.

Validation: root checks and 14 promise-model tests passed, including New Testament reference coverage and migration. All 14 pages passed desktop/phone startup checks. Browser journeys covered six categories, expanded passages on phones, old deep links, saved-record migration, fresh affirmation, reloads, downloads, and existing test rules and previous-version compatibility. The separate Theism Gradient checks also passed.


## October 7, 2026 — Clearer Long life readings; no Old Testament quotations

Removed the parent-honoring quotation from Long life and from Promising Gods Mirror. Long life now opens with a plain question about recovery, safety, health, or lifespan, followed by the three readings on healing, sparrows, and lilies. Each keeps its own context. Choices distinguish a guaranteed result, an average advantage, spiritual care only, a past-only promise, no promise, another claim, and uncertainty. Testing prompts distinguish one failed guarantee from a failed prediction about group averages.

Prophecy now uses John 16:13 instead of the Pentecost quotation of Joel. The Mirror also removes the repeated Joel quotation and two healing readings that repeat Isaiah. Its remaining longevity parallel states explicitly that a lifespan prediction is an additional interpretation. An audit of the published text sources and the extracted text of all 26 PDFs found no further matching Old Testament citations or these repeated quotations; no PDFs needed regeneration.

Saved format v3 keeps all previous words and test terms. Earlier Long life and Prophecy answers require review and fresh affirmation because the readings have changed; unchanged categories retain their commitments. First affirmed claims and tests remain available through revisions.

Validation passed: all 15 promise-model checks; all 14 pages at desktop and phone sizes; six-category journeys; revised reading displays; migration and fresh affirmation of v2 answers; first-claim and test preservation; downloads, keyboard access, and previous-version compatibility; and the separate Theism Gradient checks.


## October 7, 2026 — Beyond promises and guided modules

The landing page now explicitly introduces nine other modules, with a prominent opening link and a visible directory immediately after the promise exercise and saved record. Plain questions organize the cards into belief and evidence, arguments for Christianity, and morality. Manuals, curricula, original tool URLs, and the Threshold → Stress Test → Particulars order remain available.

All nine primary modules now use three guided stages, concise directions, optional background and explanations, a full-view option, and a clear return to the directory. The original controls are retained, not copied or reset. Stage navigation does not count as completion or belief affirmation. Internal links and programmatic jumps reveal the relevant stage. These modules now support phones; narrow tables and the resurrection evidence chart scroll within their containers. The previous Promise Test Field interface and two supporting pages retain their existing screen restriction.

Fixed the pre-existing Mirror reveal defect: Christian parallels are absent from the displayed and copyable reports until all nine cases are decided. The same rendered report is used for printing. Reloading preserves completed decisions and the unlocked comparison.

Added browser coverage for all three stages of all nine modules at 1360, 390, and 320 CSS pixels; full view, optional help, keyboard navigation, saved section links, browser Back, and preservation of controls; Threshold saved answers and the Threshold → Stress → Particulars transfer; Fine-Tuning → Theism Gradient transfer and a rating export/import round trip; and the complete Mirror reveal flow. The full root suite passes: calculation checks, all 15 promise-model checks, all 14 page startup checks, the promise journeys, and these new module journeys. The separate Theism Gradient calculation checks also pass. Desktop and phone screenshots were inspected. All 362 static local page, asset, document, and anchor references across the 14 HTML pages resolve, and metadata regeneration produces no further changes.

No calculation formula, saved-answer format, or PDF was changed. The historical PDF font limitations remain. The expanded checks cover the listed journeys; they are not an exhaustive audit of every philosophical assumption or control.

## October 7, 2026 — Portable AI assessments

All nine guided modules now offer a common assessment prompt in their third stage. The six home-page promise categories each offer it in their result, with another prompt for the complete saved record. The retained Promise Test Field also uses the common prompt. Copy, review, and text download include exact written answers, all supplied cases and claims, relevant definitions, and the current report. Inputs outside the visible case or filter remain included. Visitors can add further explanation, saved separately until they clear it. Nothing is automatically uploaded to an AI.

The prompt asks for a charitable reconstruction, precise and ranked weaknesses, the strongest replies, repairs with their consequences, and optional practical tests with supporting, challenging, and inconclusive outcomes. It distinguishes contradictions from weak evidence, preserves the difference between drafts and commitments, challenges the tool’s assumptions, and rejects treating generated scores as truth probabilities. Embedded visitor text is explicitly data to assess, not instructions. Mirror comparisons remain locked until all nine decisions. Copy and download read the latest inputs; clipboard failure reveals and selects the full text for manual copying. Large records are not truncated.

Browser coverage checks all nine module prompts on phones, exact multiline text, saved extra explanations, fresh copy/download equality, multiple Moral Particulars cases, filtered Gradient claims, individual and full promise records, draft status, legacy inputs, and clipboard failure. The module journey also checks that the Mirror AI prompt includes comparisons after all nine decisions. No calculation formula, original saved-answer format, transfer, or PDF was changed.

Validation passed: the full root suite (calculation checks, 15 promise-model checks, 14-page desktop/phone startup checks, promise journeys, module journeys, and portable AI prompt checks), plus the separate Theism Gradient calculation checks. All 287 static local file references resolve. Metadata regeneration is repeatable. The phone prompt was visually inspected. Existing PDF font limitations remain unchanged.

## October 7, 2026 — Readiness before AI assessment

The supplied Copilot example exposed an assessment generated from an unconfirmed reading, an unresolved failure standard, and filler in the test plan. AI prompts now require enough recorded detail and an explicit review before copy, preview, or download becomes available. The same check protects the shared prompt builder and previous AI export paths. A visible percentage bar and missing-answer checklist show progress, including the first two steps of each promise exercise. Editing answers invalidates confirmation and clears previously generated prompt text. The full promise prompt requires all six individual reviews; each individual prompt can be used as soon as its own record is ready.

Promise requirements distinguish a specific affirmed claim, eligibility and conditions, textual reasons, timing, and the applicable evidence and outcome rules. An explicit refusal to test remains assessable when explained; it does not require an invented study. Spiritual, historical, and no-promise readings use appropriate interpretive questions. Other modules require a stated position, reasons, a revision standard, and reviewed settings, plus substantive case decisions where applicable. Review fields are saved separately and can be cleared without erasing the original exercise.

Required prose is screened for minimum detail and obvious placeholders. This local check cannot establish meaning, coherence, evidential adequacy, or truth; the interface and exported prompt state that limit. The prompt now asks for 500–750 words, at most three significant weaknesses and two optional tests, with a 900-word ceiling. It requires exact claims, strong fair replies, concrete repairs, clear outcomes, and proportionate conclusions. If the supplied prose still fails to state a usable position, the AI is asked to identify the crucial gap and ask at most two questions instead of inventing premises or a study.

Added ten readiness rule checks and browser journeys for locked defaults, filler, the Copilot example, complete unlocking, revised answers, older AI outputs, reloads, all six promise reviews, and preserved copy/download behavior. Existing calculation, promise, module, transfer, and Mirror checks remain in place. The desktop progress display was inspected visually. No calculation formula, original answer format, or PDF was changed.

Validation passed: the full root suite, including 25 promise/readiness rule checks and all 14 desktop/phone startup pages, plus the separate Theism Gradient checks. All 287 static local file references resolve, metadata regeneration is repeatable, and desktop and phone displays were inspected. The new checks establish completion and export behavior; they do not claim to validate the meaning of arbitrary prose.

The progress heading now explicitly distinguishes “AI prompt locked” from “AI prompt ready.” Percentages are labeled “complete,” and only a fully completed record is described as ready to review, copy, or download. This corrects the earlier contradictory “Ready for AI review” heading on incomplete records throughout the site.
