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
  const choose = async (id, interpretation, failure = null, commitments = false) => {
    await page.locator(`[data-promise="${id}"]`).click();
    assert.equal(await page.locator('input[name="interpretation"]:checked').count(), 0, "Do not preselect a reading");
    assert.equal(await page.locator("#next-step").isDisabled(), true);
    await page.locator(`input[name="interpretation"][value="${interpretation}"]`).check();
    await page.locator("#next-step").click();
    if (failure) {
      assert.equal(await page.locator("#see-result").isDisabled(), true);
      assert.equal(await page.locator('input[name="commitment"]:checked').count(), 0);
      if (commitments) {
        await page.locator(".safeguards summary").click();
        for (const checkbox of await page.locator('input[name="commitment"]').all()) await checkbox.check();
      }
      await page.locator(`input[name="failure"][value="${failure}"]`).check();
      await page.locator("#see-result").click();
    }
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
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 9 explored");
    await page.reload();
    assert.equal(await page.locator("#progress-label").textContent(), "1 / 9 explored", "Reload must preserve saved readings");
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
    assert.equal(await page.locator('[data-finish="true"]').count(), 1);
    await page.locator('[data-finish="true"]').click();
    assert.equal(await page.locator(".reading-row").count(), 9);

    // Revising a completed reading cannot silently retain prior test commitments.
    await page.locator('[data-review="prayer"]').click();
    await page.locator('[data-back="1"]').click();
    await page.locator('input[name="interpretation"][value="spiritual"]').check();
    await page.locator(".exercise-note summary").click();
    const note = '<img src=x onerror="alert(1)"> My interpretation changed.';
    await page.locator("#reading-note").fill(note);
    await page.locator("#next-step").click();
    assert.equal(await page.locator(".result-flag").getAttribute("data-code"), "spiritual");
    assert.match(await page.locator(".result-facts").innerText(), /first saved reading/i);
    assert((await page.locator(".result-facts").innerText()).includes(note), "Notes must render as text");
    assert.equal(await page.locator('.result-facts img').count(), 0, "A note must not become HTML");
    await close();
    const downloadPending = page.waitForEvent("download");
    await page.locator("#download-readings").click();
    const download = await downloadPending;
    const downloaded = await fs.readFile(await download.path(), "utf8");
    assert.match(downloaded, /9 of 9/);
    assert.match(downloaded, /No real-world results/);
    assert(downloaded.includes(note));
    for (const promise of PROMISES) assert(downloaded.includes(promise.ref));

    // Reset touches only this introduction's saved work.
    await page.evaluate(() => localStorage.setItem("unrelated-audit", "keep"));
    await page.locator(".reset-controls summary").click();
    await page.locator("#reset-readings").click();
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 9 explored");
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
    assert.equal(await page.locator("#progress-label").textContent(), "0 / 9 explored", "A draft is not a completed reading");
    await page.reload();
    await page.locator('[data-promise="health"]').press("Enter");
    assert(await page.locator('input[value="not-promise"]').isChecked(), "Draft choice survives reload");
    await page.locator("#next-step").click();
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
    await tab.locator("#close-exercise").click();
    assert.match(await tab.locator("#storage-status").innerText(), /cannot save/);
    assert.equal(await tab.locator(".reading-row").count(), 1, "Exercise must work when browser storage is blocked");
  } finally { await unavailable.close(); }
}
