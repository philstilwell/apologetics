# XHAIRS.com project instructions

This repository is Phil Stilwell's Crosshairs Audit Lab at https://xhairs.com/. Read `PROJECT_BRIEF.md` and `RESTORATION_AUDIT.md` before beginning substantial work.

## Communication and user preferences

- Write concise, plain English for a technically literate non-programmer. Explain what changed for readers before implementation details.
- Estimate any additional cost before starting paid work.
- Ask which image generation tool to use before creating images.
- Before installing an external repository, assess it with the user's fork of NVIDIA Skillspector.
- Never use local or native voice for audio or video production without explicit instructions.
- Embed every font in newly created or regenerated PDFs. Verify the result with `pdffonts` and inspect the rendered pages.
- Close temporary browser tabs, dialogs, and local preview servers after use.
- Commit and push completed changes by default unless the user directs otherwise. Fetch and inspect concurrent changes first; never force-push shared history. Pushing `main` publishes the website through GitHub Pages.

## Working on the site

- Keep the existing domain and `philstilwell/apologetics` repository connection.
- Preserve the ten tools and their published URLs. The older recovery folder contained only nine tools; the current version includes Promising Gods Mirror.
- `scripts/tool-manifest.mjs` is the shared catalog for tools, page metadata, document links, pathways, and generated content. Read `scripts/apply-seo.mjs` before running `npm run seo:apply`; it rewrites multiple files. Review its complete diff.
- Preserve the distinction between entered assumptions, model scores, and established evidence. Do not present audit pressure or personal substantiation scores as objective probabilities that a religion is true or false.
- Keep the morality sequence: Threshold, Stress Test, Particulars. Preserve imports, exports, storage keys, and handoffs when changing a tool.
- The promise introduction, Promise Test Field transition, and nine other primary modules work on phones. Only the previous Promise Test Field interface and two supporting pages retain the restriction below 768 CSS pixels. Preserve this distinction and update the tests if it changes.
- `scripts/module-catalog.mjs` supplies the nine module descriptions and three-stage mappings; `scripts/module-guide.mjs` and `assets/module-guide.css` provide their shared presentation. Preserve the original controls, saved work, and full-view access. Stage navigation does not imply completion or affirmation. Programmatic jumps must reveal their destination with `crosshairs:reveal` before scrolling.
- Promising Gods Mirror must keep Christian parallels out of both displayed and copyable reports until all nine decisions are complete.
- `scripts/ai-assessment.js` supplies portable AI prompts for every module and the promise introduction. Include exact written answers and all case/claim inputs, even outside the current view. Preserve drafts, missing answers, hypothetical data, and the Mirror reveal boundary. Build prompts locally without sending answers to an AI. Additional explanations are stored separately under `crosshairs.ai-explanation.v1.<module>.<scope>` and removed by clearing their field.
- AI prompts must remain unavailable until the required details and explicit review are complete. Enforce this in the shared prompt builder as well as the buttons, previews, and older AI export modes. The percentage measures information supplied, not truth or soundness. New review fields use `crosshairs.ai-readiness.v1.<module>.<scope>`; changed answers invalidate their confirmation. All-category promise prompts require all six individual records to be ready. Preserve legitimate spiritual, historical, non-promise, and explicitly defended refusal-to-test positions.
- Do not use Old Testament verses as site readings, including Old Testament quotations repeated in New Testament passages. The removed parent-honoring, Pentecost/Joel, and Isaiah healing quotations must not be restored.
- The current promise introduction has six New Testament categories. Healing, protection (sparrows), and health/care (lilies) are grouped with long life. Keep their wording and context distinct; do not call the lilies an explicit health guarantee. Saved v1 answers for the four earlier separate categories remain read-only history, never automatically affirmed as the combined claim. Saved format v3 requires fresh affirmation of earlier Long life and Prophecy answers after their source passages changed, while retaining words, first commitments, and test terms.
- The home-page promise catalog is in `scripts/promise-catalog.mjs`, re-exported by the tool manifest. The introductory answers use a separate storage key, `crosshairs.promise-intro.v1`; never overwrite saved work in the detailed tools.
- The introduction demands an explicit commitment to the visitor's actual belief about what each passage promises. Count only definite, personally specified, explicitly affirmed positions as committed. Keep uncertainty, unfinished testing standards, and unconfirmed drafts visibly unresolved. Never silently convert earlier saved selections into commitments. Preserve the first affirmed claim and testing standard through revisions.
- The Promise Test Field now continues inside the home-page three-step exercise. Preserve `apps/falsifiability-field/legacy.html` for older JSON and `#state=` shares. `scripts/promise-testing.mjs` supplies evidence guidance and exception checks. A belief commitment is distinct from a complete test; never describe entered terms as validated research or real-world results.
- The Quarto manuscript in `paper/crosshairs-audit-paper.qmd` is authoritative for the paper; its Typst counterpart is not kept in sync.
- Keep private recovery notes and raw audit evidence under ignored `.local/`. Do not commit personal conversation exports, local machine paths, credentials, or browser profile data.

## Validation

After installing the locked development dependencies with `npm ci --ignore-scripts`, install the matching browser if needed with `npx playwright install chromium --only-shell`.

- Run `npm test` for the root calculation tests, promise-interpretation rules, 14-page desktop/mobile startup checks, complete introductory promise journeys (including saved readings, revisions, downloads, and keyboard/phone access), and the nine module journeys (stage navigation, narrow screens, saved work, exports, and handoffs).
- Run `npm --prefix apps/theism-gradient-audit test` for its separate scoring and claim-bank checks.
- Exercise changed controls, storage, exports, and handoffs in a browser. A successful startup check is not evidence that every calculation or interaction was audited.
- `scripts/ai-browser-checks.mjs` runs in the root browser suite. Preserve coverage for complete prompt inputs, multiline text, filtered/other cases, fresh copy/download content, manual-copy fallback, saved extra explanations, and the Mirror reveal boundary.
- `scripts/ai-readiness.test.cjs` checks the readiness rules, including unresolved and filler-filled records, explicit refusal, non-earthly readings, revisions, and combined records. Keep browser checks for locked exports and the complete unlock journey.
- Check affected internal links, downloadable files, and PDF font embedding. Document outstanding issues rather than silently changing philosophical assumptions.
- Use `python3 -m http.server 8080 --bind 127.0.0.1` for an on-demand local preview; stop it when finished.
