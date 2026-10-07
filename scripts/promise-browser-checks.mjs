import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { PROMISES } from "./promise-catalog.mjs";
import { STORAGE_KEY } from "./promise-model.mjs";

// Exercise real user journeys, including distinctions the startup checks cannot cover.
export async function verifyPromiseJourneys(baseUrl, browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: "reduce", acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const claims = {
    prayer: "Among believers whose requests meet my stated faith and forgiveness conditions, the requested outcomes occur 10 percentage points more often within a year than for otherwise matched requests without targeted prayer.",
    healing: "Every sick believer receiving the elders’ prayer of faith and anointing physically recovers from the named illness within one year.",
    protection: "Jesus promised the returning seventy protection during their mission; I do not extend that protection to Christians today.",
    provision: "Seeking the kingdom first brings a higher chance of adequate food, water, and clothing than for otherwise matched people over a year.",
    wisdom: "God grants inward spiritual understanding to those who ask in faith; I claim no externally measurable improvement in judgment.",
    prophecy: "God promises inspired spiritual speech to believers today, without promising foreknowledge of future events.",
    character: "Within one year, people identified as in Christ before observation show less dishonest conduct than they did before conversion.",
    health: "I read the sparrows and lilies as encouragement to trust, without a divine guarantee of health or safety. I do not read the healing passage as a divine guarantee either.",
    longevity: "Every sick believer who receives the elders’ prayer of faith and anointing will recover from the named illness within one year. This does not promise a particular age at death.",
  };
  const choose = async (id, interpretation, failure = null, commitments = false) => {
    await page.locator(`[data-promise="${id}"]`).click();
    if (id === "longevity") await page.screenshot({ path: ".local/redesign/long-life-clear-desktop.png" });
    assert.equal(await page.locator('input[name="interpretation"]:checked').count(), 0, "Do not preselect a reading");
    assert.equal(await page.locator("#next-step").isDisabled(), true);
    await page.locator(`input[name="interpretation"][value="${interpretation}"]`).check();
    if (interpretation !== "unsure") {
      assert.equal(await page.locator("#next-step").isDisabled(), true, "A selected category alone is not a commitment");
      await page.locator("#belief-statement").fill("   ");
      assert.equal(await page.locator("#next-step").isDisabled(), true, "Blank words cannot be affirmed");
      await page.locator("#belief-statement").fill(claims[id]);
    }
    await page.locator("#next-step").click();
    if (failure) {
      assert.equal(await page.locator("#see-result").isDisabled(), true, "An earthly claim also requires a failure standard");
      assert.equal(await page.locator('input[name="commitment"]:checked').count(), 0);
      if (commitments) {
        await fillTest(page);
        for (const checkbox of await page.locator('input[name="commitment"]').all()) await checkbox.check();
      }
      await page.locator(`input[name="failure"][value="${failure}"]`).check();
    }
    if (interpretation !== "unsure") await page.locator("#see-result").click();
    return page.locator(".result-flag").getAttribute("data-code");
  };
  const close = async () => {
    await page.locator("#close-exercise").click();
    await page.locator("#promise-dialog").waitFor({ state: "hidden" });
    assert.equal(new URL(page.url()).hash, "#promises");
  };
  try {
    await page.goto(baseUrl);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator(".promise-card").count(), 6);
    assert.equal(await page.locator(".library-item").count(), 10);
    assert.equal(await page.locator("#readings").isVisible(), false);
    assert(await page.locator(".promise-card-icon").evaluateAll((imgs) => imgs.every((img) => img.complete && img.naturalWidth > 0)), "All six icons must load");
    await fs.mkdir(".local/redesign", { recursive: true });
    await page.screenshot({ path: ".local/redesign/landing-desktop.png", fullPage: true });
    await page.screenshot({ path: ".local/redesign/landing-opening.png" });

    const tip = page.locator("#promise-prayer .tip-button");
    await tip.hover();
    await page.locator("#tip-prayer").waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#tip-prayer").isVisible(), false, "Hover explanation must dismiss with Escape");
    await page.mouse.move(0, 0);
    await tip.focus();
    assert.equal(await page.locator("#tip-prayer").isVisible(), true, "Keyboard focus must reveal the explanation");
    await page.keyboard.press("Escape");

    assert.equal(await choose("prayer", "tendency", "yes", true), "open");
    await page.screenshot({ path: ".local/redesign/reading-result.png" });
    await close();
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 6 committed");
    await page.reload();
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 6 committed", "Reload must preserve saved readings");
    assert.equal(await choose("provision", "tendency", "conditions"), "conditional");
    await close();
    assert.equal(await choose("wisdom", "spiritual"), "spiritual");
    await close();
    assert.equal(await choose("prophecy", "unsure"), "undecided");
    await close();
    assert.equal(await choose("character", "guarantee", "yes"), "developing");
    await close();
    assert.equal(await choose("longevity", "guarantee", "no"), "protected");
    await close();
    assert.equal(await page.locator("#progress-label").textContent(), "4 / 6 committed", "Two unresolved answers must not count as commitments");
    assert.equal(await page.locator(".reading-row").count(), 6, "Every outstanding passage stays visible");
    assert.equal(await page.locator('.reading-result').filter({ hasText: /^Unresolved$/ }).count(), 2);
    const unresolvedDownload = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const unresolvedText = await fs.readFile(await (await unresolvedDownload).path(), "utf8");
    assert.match(unresolvedText, /4 of 6 committed; 2 unresolved/);
    assert.match(unresolvedText, /Prophecy —[\s\S]*?Status: Unresolved/);

    // Resolve the remaining beliefs; choosing uncertainty earlier is not a first commitment.
    for (const [id, reading] of [["provision", "tendency"], ["prophecy", "other"]]) {
      await page.locator(`[data-review="${id}"]`).click();
      await page.locator('[data-back="1"]').click();
      await page.locator(`input[name="interpretation"][value="${reading}"]`).check();
      await page.locator("#belief-statement").fill(claims[id]);
      await page.locator("#next-step").click();
      if (["tendency", "other"].includes(reading)) await page.locator('input[name="failure"][value="yes"]').check();
      await page.locator("#see-result").click();
      if (reading === "other") assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "custom", "A custom belief must retain its own statement without an invented assessment");
      if (id === "prophecy") {
        assert.equal(await page.locator('[data-finish="true"]').count(), 1);
        await page.locator('[data-finish="true"]').click();
      } else await close();
    }
    assert.equal(await page.locator("#progress-label").textContent(), "6 / 6 committed");

    // Revising a completed reading cannot silently retain prior test commitments.
    await page.locator('[data-review="prayer"]').click();
    await page.locator('[data-back="1"]').click();
    await page.locator('input[name="interpretation"][value="spiritual"]').check();
    await page.locator(".exercise-note summary").click();
    const note = '<img src=x onerror="alert(1)"> My interpretation changed.';
    await page.locator("#reading-note").fill(note);
    assert.equal(await page.locator("#progress-label").textContent(), "5 / 6 committed", "A changed draft requires fresh affirmation");
    await page.locator("#belief-statement").fill("I believe God assures believers spiritually through prayer, without promising the requested earthly outcome or better odds of it.");
    await page.locator("#next-step").click();
    await page.locator("#see-result").click();
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "spiritual");
    assert.match(await page.locator(".result-facts").first().innerText(), /first affirmed commitment/i);
    assert((await page.locator(".result-facts").first().innerText()).includes(note), "Notes must render as text");
    assert.equal(await page.locator('.result-facts img').count(), 0, "A note must not become HTML");
    await close();
    const downloadPending = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const download = await downloadPending;
    const downloaded = await fs.readFile(await download.path(), "utf8");
    assert.match(downloaded, /6 of 6 committed; 0 unresolved/);
    assert(downloaded.includes(claims.prayer), "The first affirmed claim must survive a later revision");
    assert.match(downloaded, /No real-world results/);
    assert(downloaded.includes(note));
    for (const promise of PROMISES) assert(downloaded.includes(promise.ref));

    // Reset touches only this introduction's saved work.
    await page.evaluate(() => localStorage.setItem("unrelated-audit", "keep"));
    await page.locator(".reset-controls summary").click();
    await page.locator("#reset-readings").click();
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 6 committed");
    assert.equal(await page.evaluate(() => localStorage.getItem("unrelated-audit")), "keep");
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), null);

    // Phone, keyboard, direct links, drafts, and final-row tooltip positioning.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl);
    await page.screenshot({ path: ".local/redesign/landing-mobile.png", fullPage: true });
    for (const id of ["prayer", "character", "longevity"]) {
      await page.locator(`#promise-${id} .tip-button`).click();
      const box = await page.locator(`#tip-${id}`).boundingBox();
      assert(box && box.x >= 0 && box.x + box.width <= 390, `${id} tooltip should fit a phone`);
      await page.keyboard.press("Escape");
    }
    await page.goto(`${baseUrl}/#promise-health`);
    await page.locator("#promise-dialog[open]").waitFor();
    assert.equal(new URL(page.url()).hash, "#promise-longevity", "Old category links lead to the combined category");
    assert.equal(await page.locator(".combined-passage").count(), 3);
    assert.equal(await page.locator(".exercise-body > .verse-block").count(), 0, "The combined category has only its three source readings");
    assert.doesNotMatch(await page.locator("#exercise-content").textContent(), /Honour thy father|long-life verse above|Ephesians/);
    assert.match(await page.locator("#exercise-content").textContent(), /What do you believe these passages promise people today/);
    assert(await page.locator("#passage-health").getAttribute("open") !== null);
    assert.match(await page.locator("#passage-health").innerText(), /Consider the lilies/);
    for (const id of ["healing", "protection"]) {
      await page.locator(`#passage-${id} summary`).click();
      assert(await page.locator(`#passage-${id} .verse-block`).isVisible());
    }
    await page.screenshot({ path: ".local/redesign/long-life-passages-mobile.png" });
    await page.locator('input[name="interpretation"][value="not-promise"]').check();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 6 committed", "A draft is not a completed reading");
    await page.reload();
    await page.locator('[data-promise="longevity"]').press("Enter");
    assert(await page.locator('input[value="not-promise"]').isChecked(), "Draft choice survives reload");
    await page.locator("#belief-statement").fill(claims.health);
    await page.locator("#next-step").click();
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert(await page.locator("#promise-dialog").evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth), `Commitment form must fit at ${width}px`);
    }
    await page.screenshot({ path: ".local/redesign/commitment-mobile.png" });
    await page.locator("#see-result").click();
    await page.screenshot({ path: ".local/redesign/result-mobile.png" });
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "not-promise");
    await close();
    await verifyGuidedTest(page, baseUrl);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow at ${width}px`);
    }
    assert.deepEqual(errors, []);
  } finally { await context.close(); }

  const unavailable = await browser.newContext();
  try {
    await unavailable.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage disabled"); } });
    });
    const tab = await unavailable.newPage();
    await tab.goto(`${baseUrl}/#promise-health`);
    await tab.locator('input[value="not-promise"]').check();
    await tab.locator("#belief-statement").fill(claims.health);
    await tab.locator("#next-step").click();
    await tab.locator("#see-result").click();
    await tab.locator("#close-exercise").click();
    assert.match(await tab.locator("#storage-status").innerText(), /cannot save/);
    assert.equal(await tab.locator("#progress-label").textContent(), "1 / 6 committed", "Exercise must work when browser storage is blocked");
  } finally { await unavailable.close(); }

  const legacy = await browser.newContext();
  try {
    await legacy.addInitScript((key) => localStorage.setItem(key, JSON.stringify({ version: 1, answers: {
      prayer: { interpretation: "guarantee", failure: "yes", complete: true, firstInterpretation: "guarantee", note: "My old note", commitments: ["scope"] },
      health: { interpretation: "unsure", complete: true },
    } })), STORAGE_KEY);
    const tab = await legacy.newPage();
    await tab.goto(baseUrl);
    assert.equal(await tab.locator("#progress-label").textContent(), "0 / 6 committed");
    await tab.locator('[data-review="prayer"]').click();
    assert(await tab.locator('input[value="guarantee"]').isChecked(), "Earlier choices must be preserved");
    assert.equal(await tab.locator("#reading-note").inputValue(), "My old note");
    assert(await tab.locator("#next-step").isDisabled(), "Legacy completed readings require a specific claim and new affirmation");
  } finally { await legacy.close(); }
  await verifyMergedRecords(baseUrl, browser);
  await verifyChangedSources(baseUrl, browser);
}

async function fillTest(page) {
  await page.locator('input[name="test-method"][value="comparison"]').check();
  await page.locator("#test-plan").fill("Record all qualifying cases for one year; match baseline conditions and resources. Compare the stated benefit using independent outcome review and enough cases to detect the predicted advantage.");
  await page.locator('[data-test-next="outcomes-section"]').click();
  assert.equal(await page.locator("#evidence-section").getAttribute("open"), null);
  await page.locator("#test-support").fill("The specified advantage is present with sufficiently precise evidence after accounting for baseline differences and ordinary causes.");
  await page.locator("#test-challenge").fill("A precise comparison rules out the advantage I specified. I will withdraw that prediction and lower my confidence in this reading.");
  await page.locator("#test-inconclusive").fill("Uncertain eligibility, missing records, or estimates too imprecise to distinguish the promised advantage from no advantage.");
  await page.locator("#exceptions-section summary").click();
  await page.locator('input[name="test-review"][value="none"]').check();
}

async function verifyGuidedTest(page, baseUrl) {
  await page.goto(`${baseUrl}/#promise-prayer`);
  await page.locator('input[name="interpretation"][value="tendency"]').check();
  await page.locator("#belief-statement").fill("Qualifying requests receive the named result ten percentage points more often than matched requests within one year.");
  await page.locator("#next-step").click();
  await fillTest(page);
  for (const checkbox of await page.locator('input[name="commitment"]').all()) await checkbox.check();
  await page.locator('input[name="failure"][value="yes"]').check();
  await page.locator('input[name="test-review"][value="some"]').check();
  await page.locator('input[name="exception"][value="weak-faith"]').check();
  await page.locator('input[name="exception-policy-weak-faith"][value="check"]').check();
  await page.locator("#exception-check-weak-faith").fill("Before outcomes, apply publicly stated eligibility criteria with independent reviewers. Do not infer weak faith from a failure.");
  await page.locator('[data-test-next="failure-decision"]').click();
  assert.equal(await page.locator("#exceptions-section").getAttribute("open"), null);
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    assert(await page.locator("#promise-dialog").evaluate((d) => d.scrollWidth <= d.clientWidth), `Expanded test and exceptions must fit at ${width}px`);
  }
  await page.locator("#see-result").click();
  assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "open");
  await page.reload();
  assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "open");
  await page.locator('[data-back="2"]').click();
  await page.locator("#exceptions-section summary").click();
  assert.equal(await page.locator("#exception-check-weak-faith").inputValue(), "Before outcomes, apply publicly stated eligibility criteria with independent reviewers. Do not infer weak faith from a failure.");
  await page.locator('input[name="exception-policy-weak-faith"][value="protect"]').check();
  await page.locator("#see-result").click();
  assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "tension");
  await page.getByText("Compare my first affirmed test terms", { exact: true }).click();
  assert.match(await page.locator(".test-transcript").last().innerText(), /Only with independent evidence/);
  await page.locator('[data-back="2"]').click();
  await page.locator('input[name="test-method"][value="decline"]').check();
  assert.equal(await page.locator("#test-terms").isVisible(), false);
  await page.locator("#see-result").click();
  assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "tension");
  await page.locator("#close-exercise").click();
  const pending = page.waitForEvent("download");
  await page.locator("#download-readings").click();
  const report = await fs.readFile(await (await pending).path(), "utf8");
  assert.match(report, /First affirmed test terms/);
  assert.match(report, /I will withdraw that prediction/);
  assert.match(report, /inconclusive/);
  assert.match(report, /earlier draft test terms are inactive/);
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${baseUrl}/apps/falsifiability-field/`);
  assert.match(await page.locator("h1").innerText(), /A CLEARER PATH/);
  await page.getByRole("link", { name: "Choose a promise" }).click();
  assert.equal(new URL(page.url()).hash, "#promises");

  // Old shared-state links and JSON retain their exact meanings in the previous interface.
  const old = { version: 1, selectedClaimId: "answered-prayer", promptMode: "selected", claims: { "answered-prayer": { studyId: "prayer-log", willingness: 73, failure: 62, excuses: ["weak-faith"], text: "Saved before the guided version", outcomeRules: { forClaim: "All requests", againstClaim: "Missed requests", neutral: "Missing records" }, mindChange: "I would reconsider" } } };
  const hash = `#state=${Buffer.from(JSON.stringify(old)).toString("base64url")}`;
  await page.goto(`${baseUrl}/apps/falsifiability-field/${hash}`);
  await page.waitForURL(`**/legacy.html${hash}`);
  await page.locator(".share-details summary").click();
  await page.locator("#export-json").click();
  const exported = JSON.parse(await page.locator("#share-state-output").inputValue());
  assert.equal(exported.claims["answered-prayer"].willingness, 73);
  assert.equal(exported.claims["answered-prayer"].text, old.claims["answered-prayer"].text);
  assert.deepEqual(exported.claims["answered-prayer"].outcomeRules, old.claims["answered-prayer"].outcomeRules);
  exported.claims["answered-prayer"].willingness = 41;
  await page.locator("#share-state-output").fill(JSON.stringify(exported));
  await page.locator("#load-json").click();
  await page.locator("#export-json").click();
  assert.equal(JSON.parse(await page.locator("#share-state-output").inputValue()).claims["answered-prayer"].willingness, 41);
  await page.goto(`${baseUrl}/apps/falsifiability-field/#state=invalid`);
  await page.waitForURL("**/legacy.html#state=invalid");
  assert.match(await page.locator("#share-status").textContent(), /state link could not be loaded/i);
  await page.goto(`${baseUrl}/apps/falsifiability-field/`);
  await page.setViewportSize({ width: 320, height: 844 });
  assert(await page.getByRole("link", { name: "Choose a promise" }).isVisible());
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.goto(baseUrl);
}

async function verifyMergedRecords(baseUrl, browser) {
  const context = await browser.newContext({ acceptDownloads: true });
  try {
    await context.addInitScript((key) => {
      if (localStorage.getItem(key)) return;
      const answer = { interpretation: "guarantee", failure: "yes", claim: "Earlier personally affirmed claim", affirmed: true, complete: true, commitments: [] };
      localStorage.setItem(key, JSON.stringify({ version: 1, answers: {
        prayer: { ...answer, claim: "My prayer commitment is unchanged" },
        healing: { ...answer, claim: "My earlier healing commitment" },
        protection: { ...answer, claim: "My earlier protection commitment" },
        health: { ...answer, claim: "My earlier health commitment" },
        longevity: { ...answer, claim: "My earlier lifespan commitment" },
      } }));
    }, STORAGE_KEY);
    const page = await context.newPage();
    await page.goto(`${baseUrl}/#promise-protection`);
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 6 committed");
    assert.equal(await page.locator('input[name="interpretation"]:checked').count(), 0);
    assert(await page.locator("#passage-protection .verse-block").isVisible());
    assert.match(await page.locator("#passage-protection").innerText(), /two sparrows/);
    await page.locator("#promise-dialog .previous-record summary").click();
    assert.match(await page.locator("#promise-dialog .previous-record").innerText(), /My earlier health commitment/);
    await page.locator('input[name="interpretation"][value="historical"]').check();
    await page.locator("#belief-statement").fill("I limit the physical promises in these passages to their original audiences and do not extend them to Christians today.");
    await page.locator("#next-step").click();
    await page.locator("#see-result").click();
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "historical");
    await page.reload();
    assert.equal(await page.locator("#progress-label").textContent(), "2 / 6 committed");
    await page.locator("#close-exercise").click();
    const pending = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const text = await fs.readFile(await (await pending).path(), "utf8");
    for (const name of ["healing", "protection", "health", "lifespan"]) assert(text.includes(`My earlier ${name} commitment`));
    assert.match(text, /2 of 6 committed/);
    const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
    assert.equal(stored.version, 3);
    assert.equal(Object.keys(stored.previousAnswers).length, 4);
  } finally { await context.close(); }
}


async function verifyChangedSources(baseUrl, browser) {
  const context = await browser.newContext();
  try {
    await context.addInitScript(key => {
      if (localStorage.getItem(key)) return;
      const a = { interpretation: "guarantee", failure: "yes", claim: "My previously affirmed claim", affirmed: true, complete: true, reviewed: true, commitments: [], test: { plan: "My earlier evidence plan" } };
      localStorage.setItem(key, JSON.stringify({ version: 2, answers: { prayer: a, prophecy: a, longevity: a } }));
    }, STORAGE_KEY);
    const page = await context.newPage();
    await page.goto(`${baseUrl}/#promise-longevity`);
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 6 committed");
    assert.match(await page.locator("#exercise-content [role=status]").innerText(), /passages in this category have changed/);
    assert.equal(await page.locator("#belief-statement").inputValue(), "My previously affirmed claim");
    await page.locator('input[name="interpretation"][value="spiritual"]').check();
    await page.locator("#belief-statement").fill("I believe these passages promise spiritual care today but no physical advantage.");
    await page.locator("#next-step").click();
    await page.locator("#see-result").click();
    await page.reload();
    assert.equal(await page.locator("#progress-label").textContent(), "2 / 6 committed");
    assert.match(await page.locator("#exercise-content").textContent(), /My previously affirmed claim/);
    const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
    assert.equal(saved.version, 3);
    assert.equal(saved.answers.longevity.needsSourceReview, false);
    assert.equal(saved.answers.longevity.firstTest.plan, "My earlier evidence plan");
    assert.equal(saved.answers.prophecy.needsSourceReview, true);
    await page.locator("#close-exercise").click();
    await page.locator('[data-promise="prophecy"]').click();
    assert.match(await page.locator(".verse-block").textContent(), /John 16:13/);
    assert.doesNotMatch(await page.locator(".verse-block").textContent(), /pour out of my Spirit/);
    await page.goto(`${baseUrl}/apps/promising-gods-mirror/`);
    assert.doesNotMatch(await page.locator("body").textContent(), /Honour thy father|Acts 2:17|by whose stripes|Esaias the prophet/);
    assert.doesNotMatch(await page.locator("#report-output").textContent(), /1 Timothy 4:8/, "The Mirror must not reveal parallels before its decisions are complete");
  } finally { await context.close(); }
}
