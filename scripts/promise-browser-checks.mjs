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
    health: "John wishes Gaius well in a personal greeting; he does not commit God to providing physical health.",
    longevity: "Those who honor their parents by my stated criteria have an average lifespan at least two years longer than otherwise comparable people.",
  };
  const choose = async (id, interpretation, failure = null, commitments = false) => {
    await page.locator(`[data-promise="${id}"]`).click();
    assert.equal(await page.locator('input[name="interpretation"]:checked').count(), 0, "Do not preselect a reading");
    assert.equal(await page.locator("#next-step").isDisabled(), true);
    await page.locator(`input[name="interpretation"][value="${interpretation}"]`).check();
    await page.locator("#next-step").click();
    if (interpretation !== "unsure") {
      assert.equal(await page.locator("#see-result").isDisabled(), true, "A selected category alone is not a commitment");
      await page.locator("#belief-statement").fill("   ");
      assert.equal(await page.locator("#see-result").isDisabled(), true, "Blank words cannot be affirmed");
      await page.locator("#belief-statement").fill(claims[id]);
    }
    if (failure) {
      assert.equal(await page.locator("#see-result").isDisabled(), true, "An earthly claim also requires a failure standard");
      assert.equal(await page.locator('input[name="commitment"]:checked').count(), 0);
      if (commitments) {
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
    assert.equal(await page.locator(".promise-card").count(), 9);
    assert.equal(await page.locator(".library-item").count(), 10);
    assert.equal(await page.locator("#readings").isVisible(), false);
    assert(await page.locator(".promise-card-icon").evaluateAll((imgs) => imgs.every((img) => img.complete && img.naturalWidth > 0)), "All nine icons must load");
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
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 9 committed");
    await page.reload();
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 9 committed", "Reload must preserve saved readings");
    assert.equal(await choose("healing", "guarantee", "no"), "protected");
    await close();
    assert.equal(await choose("protection", "historical"), "historical");
    await close();
    assert.equal(await choose("provision", "tendency", "conditions"), "conditional");
    await close();
    assert.equal(await choose("wisdom", "spiritual"), "spiritual");
    await close();
    assert.equal(await choose("prophecy", "unsure"), "undecided");
    await close();
    assert.equal(await choose("character", "guarantee", "yes"), "developing");
    await close();
    assert.equal(await choose("health", "not-promise"), "not-promise");
    await close();
    assert.equal(await choose("longevity", "tendency", "unsure"), "undecided");
    await close();
    assert.equal(await page.locator("#progress-label").textContent(), "6 / 9 committed", "Three unresolved answers must not count as commitments");
    assert.equal(await page.locator(".reading-row").count(), 9, "Every outstanding passage stays visible");
    assert.equal(await page.locator('.reading-result').filter({ hasText: /^Unresolved$/ }).count(), 3);
    const unresolvedDownload = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const unresolvedText = await fs.readFile(await (await unresolvedDownload).path(), "utf8");
    assert.match(unresolvedText, /6 of 9 committed; 3 unresolved/);
    assert.match(unresolvedText, /Prophecy —[\s\S]*?Status: Unresolved/);

    // Resolve the remaining beliefs; choosing uncertainty earlier is not a first commitment.
    for (const [id, reading] of [["provision", "tendency"], ["prophecy", "other"], ["longevity", "tendency"]]) {
      await page.locator(`[data-review="${id}"]`).click();
      await page.locator('[data-back="1"]').click();
      await page.locator(`input[name="interpretation"][value="${reading}"]`).check();
      await page.locator("#next-step").click();
      await page.locator("#belief-statement").fill(claims[id]);
      if (["tendency", "other"].includes(reading)) await page.locator('input[name="failure"][value="yes"]').check();
      await page.locator("#see-result").click();
      if (reading === "other") assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "custom", "A custom belief must retain its own statement without an invented assessment");
      if (id === "longevity") {
        assert.equal(await page.locator('[data-finish="true"]').count(), 1);
        await page.locator('[data-finish="true"]').click();
      } else await close();
    }
    assert.equal(await page.locator("#progress-label").textContent(), "9 / 9 committed");

    // Revising a completed reading cannot silently retain prior test commitments.
    await page.locator('[data-review="prayer"]').click();
    await page.locator('[data-back="1"]').click();
    await page.locator('input[name="interpretation"][value="spiritual"]').check();
    await page.locator(".exercise-note summary").click();
    const note = '<img src=x onerror="alert(1)"> My interpretation changed.';
    await page.locator("#reading-note").fill(note);
    await page.locator("#next-step").click();
    assert.equal(await page.locator("#progress-label").textContent(), "8 / 9 committed", "A changed draft requires fresh affirmation");
    await page.locator("#belief-statement").fill("I believe God assures believers spiritually through prayer, without promising the requested earthly outcome or better odds of it.");
    await page.locator("#see-result").click();
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "spiritual");
    assert.match(await page.locator(".result-facts").innerText(), /first affirmed commitment/i);
    assert((await page.locator(".result-facts").innerText()).includes(note), "Notes must render as text");
    assert.equal(await page.locator('.result-facts img').count(), 0, "A note must not become HTML");
    await close();
    const downloadPending = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const download = await downloadPending;
    const downloaded = await fs.readFile(await download.path(), "utf8");
    assert.match(downloaded, /9 of 9 committed; 0 unresolved/);
    assert(downloaded.includes(claims.prayer), "The first affirmed claim must survive a later revision");
    assert.match(downloaded, /No real-world results/);
    assert(downloaded.includes(note));
    for (const promise of PROMISES) assert(downloaded.includes(promise.ref));

    // Reset touches only this introduction's saved work.
    await page.evaluate(() => localStorage.setItem("unrelated-audit", "keep"));
    await page.locator(".reset-controls summary").click();
    await page.locator("#reset-readings").click();
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 9 committed");
    assert.equal(await page.evaluate(() => localStorage.getItem("unrelated-audit")), "keep");
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), null);

    // Phone, keyboard, direct links, drafts, and final-row tooltip positioning.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl);
    await page.screenshot({ path: ".local/redesign/landing-mobile.png", fullPage: true });
    for (const id of ["prayer", "health", "longevity"]) {
      await page.locator(`#promise-${id} .tip-button`).click();
      const box = await page.locator(`#tip-${id}`).boundingBox();
      assert(box && box.x >= 0 && box.x + box.width <= 390, `${id} tooltip should fit a phone`);
      await page.keyboard.press("Escape");
    }
    await page.goto(`${baseUrl}/#promise-health`);
    await page.locator("#promise-dialog[open]").waitFor();
    await page.locator('input[name="interpretation"][value="not-promise"]').check();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 9 committed", "A draft is not a completed reading");
    await page.reload();
    await page.locator('[data-promise="health"]').press("Enter");
    assert(await page.locator('input[value="not-promise"]').isChecked(), "Draft choice survives reload");
    await page.locator("#next-step").click();
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert(await page.locator("#promise-dialog").evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth), `Commitment form must fit at ${width}px`);
    }
    await page.locator("#belief-statement").fill(claims.health);
    await page.screenshot({ path: ".local/redesign/commitment-mobile.png" });
    await page.locator("#see-result").click();
    await page.screenshot({ path: ".local/redesign/result-mobile.png" });
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "not-promise");
    await close();
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
    await tab.locator("#next-step").click();
    await tab.locator("#belief-statement").fill(claims.health);
    await tab.locator("#see-result").click();
    await tab.locator("#close-exercise").click();
    assert.match(await tab.locator("#storage-status").innerText(), /cannot save/);
    assert.equal(await tab.locator("#progress-label").textContent(), "1 / 9 committed", "Exercise must work when browser storage is blocked");
  } finally { await unavailable.close(); }

  const legacy = await browser.newContext();
  try {
    await legacy.addInitScript((key) => localStorage.setItem(key, JSON.stringify({ version: 1, answers: {
      prayer: { interpretation: "guarantee", failure: "yes", complete: true, firstInterpretation: "guarantee", note: "My old note", commitments: ["scope"] },
      health: { interpretation: "unsure", complete: true },
    } })), STORAGE_KEY);
    const tab = await legacy.newPage();
    await tab.goto(baseUrl);
    assert.equal(await tab.locator("#progress-label").textContent(), "0 / 9 committed");
    await tab.locator('[data-review="prayer"]').click();
    assert(await tab.locator('input[value="guarantee"]').isChecked(), "Earlier choices must be preserved");
    assert.equal(await tab.locator("#reading-note").inputValue(), "My old note");
    await tab.locator("#next-step").click();
    assert(await tab.locator("#see-result").isDisabled(), "Legacy completed readings require a specific claim and new affirmation");
  } finally { await legacy.close(); }
}
