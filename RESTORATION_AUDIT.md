# XHAIRS.com restoration audit

The October 7, 2026 restoration establishes a verified starting point for continued work on Crosshairs Audit Lab. The recovered current website contains ten tools and passes its existing automated checks. Its public pages and linked PDFs matched the current GitHub source at the start of the restoration. The remaining work concerns document portability, a reveal-flow defect, small-screen access, and deeper interaction coverage.

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

**Subsequent redesign, October 7, 2026:** The home page now offers a phone-accessible nine-promise introduction, with original Imagegen emblems and coordinated typography. The older tools and all document paths remain available. The new introduction has separate interpretation rules and browser journey checks. The original PDF-font and Mirror reveal-flow findings below remain open; the homepage portion of the phone-access concern has been addressed.

### Embed the fonts in the manuals and curricula

All 20 currently linked tool manuals and curricula, plus five older or duplicate PDFs, rely on unembedded fonts. Their rendering depends on the reader's system substituting fonts. Regenerate the documents with embedded fonts, then compare extracted text, page counts, and rendered pages with the originals. Preserve their public paths and verify every font with `pdffonts`. The academic paper already has embedded fonts.

### Keep the Mirror parallels hidden until the exercise is complete

Promising Gods Mirror says the Christian parallels remain locked until all nine cases are decided. However, its visible classroom report already includes those parallels in the initial state, and `buildReportText()` includes them in the copyable report. The browser spot check confirmed that the report is visible while the reveal still reports eight remaining cases.

Review `renderReport()`, `buildReportText()`, and `renderReveal()` in `apps/promising-gods-mirror/app.js`. Apply the completion condition consistently to the screen report, copied report, and printed report. Add a regression check that parallels are absent before completion and present after all nine decisions. This defect predates restoration and remains open.

### Decide how phone users should reach the site

The shared notice deliberately blocks interaction below 768 CSS pixels, including the home page. The current tests confirm that behavior; a passing mobile test does not mean the site is usable on a phone. Consider making the home page, tool explanations, and document links accessible first, then adapting individual tool layouts. Preserve the existing product decision until that work is undertaken.

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
