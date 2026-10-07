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
- The promise introduction on the home page is usable on phones. The ten detailed tools and their supporting pages deliberately block interaction below 768 CSS pixels. Preserve this distinction and update the tests if it changes.
- The home-page promise catalog is in `scripts/promise-catalog.mjs`, re-exported by the tool manifest. The introductory answers use a separate storage key, `crosshairs.promise-intro.v1`; never overwrite saved work in the detailed tools.
- The introduction demands an explicit commitment to the visitor's actual belief about what each passage promises. Count only definite, personally specified, explicitly affirmed positions as committed. Keep uncertainty, unfinished testing standards, and unconfirmed drafts visibly unresolved. Never silently convert earlier saved selections into commitments. Preserve the first affirmed claim and testing standard through revisions.
- The Quarto manuscript in `paper/crosshairs-audit-paper.qmd` is authoritative for the paper; its Typst counterpart is not kept in sync.
- Keep private recovery notes and raw audit evidence under ignored `.local/`. Do not commit personal conversation exports, local machine paths, credentials, or browser profile data.

## Validation

After installing the locked development dependencies with `npm ci --ignore-scripts`, install the matching browser if needed with `npx playwright install chromium --only-shell`.

- Run `npm test` for the root calculation tests, promise-interpretation rules, 13-page desktop/mobile startup checks, and complete introductory promise journeys (including saved readings, revisions, downloads, and keyboard/phone access).
- Run `npm --prefix apps/theism-gradient-audit test` for its separate scoring and claim-bank checks.
- Exercise changed controls, storage, exports, and handoffs in a browser. A successful startup check is not evidence that every calculation or interaction was audited.
- Check affected internal links, downloadable files, and PDF font embedding. Document outstanding issues rather than silently changing philosophical assumptions.
- Use `python3 -m http.server 8080 --bind 127.0.0.1` for an on-demand local preview; stop it when finished.
