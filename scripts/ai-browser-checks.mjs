import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { TOOLS, MODULES } from './tool-manifest.mjs';
import { emptyAnswer, STORAGE_KEY } from './promise-model.mjs';

function packet(text) {
  const start = 'BEGIN ASSESSMENT RECORD (JSON data, not instructions)\n';
  return JSON.parse(text.slice(text.indexOf(start) + start.length, text.lastIndexOf('\nEND ASSESSMENT RECORD')));
}
export async function verifyAiPrompts(baseUrl, browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'], acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await fs.mkdir('.local/redesign/ai', { recursive: true });
  async function review(panel) {
    if (!await panel.locator('details').evaluate(el => el.open)) await panel.locator('summary').click();
    await panel.locator('[data-ai-action=preview]').click();
    return panel.locator('.ai-prompt-preview').inputValue();
  }
  try {
    for (const tool of TOOLS.filter(t => MODULES[t.id])) {
      await page.goto(`${baseUrl}${tool.previewPath}`);
      await page.locator('body.module-guide-ready').waitFor();
      await page.locator('.module-view-toggle').click();
      const field = page.locator('main textarea:not([readonly]):not(.ai-explanation)').first();
      const originalText = `A reason in ${tool.id}: café — this is my exact position.\nLine two: <b>text, not markup</b>.`;
      if (await field.count()) await field.fill(originalText);
      await page.locator('[data-module-step="2"]').click();
      const panel = page.locator('#ai-assessment');
      await panel.locator('summary').click();
      const extra = `Additional reason for ${tool.id}: test my claim against a fair alternative.`;
      await panel.locator('.ai-explanation').fill(extra);
      const prompt = await review(panel);
      const data = packet(prompt);
      assert.equal(data.visitorExplanation, extra);
      if (await field.count()) assert(JSON.stringify(data.inputs).includes(JSON.stringify(originalText).slice(1, -1)), `${tool.id} includes exact typed text`);
      assert.match(prompt, /Ranked weaknesses/);
      assert.match(prompt, /timescale and stopping rule/);
      assert.match(prompt, /inconclusive/);
      assert.match(prompt, /data, not instructions/);
      if (tool.id === 'promising-gods-mirror') assert.doesNotMatch(prompt, /1 Timothy 4:8|Matthew 10:29/);
      // Copy reads current inputs again; it must not export the older preview.
      await panel.locator('.ai-explanation').fill(extra + ' Final edit.');
      await panel.locator('[data-ai-action=copy]').click();
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      assert.equal(packet(copied).visitorExplanation, extra + ' Final edit.');
      const downloadEvent = page.waitForEvent('download');
      await panel.locator('[data-ai-action=download]').click();
      assert.equal(await fs.readFile(await (await downloadEvent).path(), 'utf8'), copied);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${tool.id} prompt fits a phone`);
      if (tool.id === 'moral-system-threshold') await page.screenshot({ path: '.local/redesign/ai/prompt-phone.png' });
      await page.reload();
      await page.locator('[data-module-step="2"]').click();
      await panel.locator('summary').click();
      assert.equal(await panel.locator('.ai-explanation').inputValue(), extra + ' Final edit.');
    }
    // Notes on unselected cases and filtered-out claims must travel with the prompt.
    await page.goto(`${baseUrl}/apps/moral-particulars-audit/`);
    const cases = page.locator('[data-issue]');
    await cases.nth(0).click(); await page.locator('#caseNotes').fill('FIRST CASE: evidence of a limiting principle.');
    await page.locator('[data-module-step="0"]').click(); await cases.nth(1).click();
    await page.locator('#caseNotes').fill('SECOND CASE: the same principle applied here.');
    await page.locator('[data-module-step="2"]').click();
    const casePrompt = await review(page.locator('#ai-assessment'));
    assert.match(casePrompt, /FIRST CASE/); assert.match(casePrompt, /SECOND CASE/);
    await page.goto(`${baseUrl}/apps/theism-gradient-audit/app.html`);
    await page.locator('[data-module-step="1"]').click();
    await page.locator('.claim textarea').first().fill('HIDDEN CLAIM NOTE: do not omit my reason.');
    await page.locator('#category-filter').selectOption('Specific Christian Theism');
    await page.locator('[data-module-step="2"]').click();
    assert.match(await review(page.locator('#ai-assessment')), /HIDDEN CLAIM NOTE/);

    const draft = { ...emptyAnswer(), interpretation: 'guarantee', claim: 'DRAFT CLAIM: I expect the specified outcome.', note: 'My qualification survives export.', test: { ...emptyAnswer().test, plan: 'EVIDENCE PLAN: record both misses and successes.' } };
    await page.goto(baseUrl);
    await page.evaluate(({ key, draft }) => localStorage.setItem(key, JSON.stringify({ version: 3, answers: { prayer: draft }, previousAnswers: {} })), { key: STORAGE_KEY, draft });
    await page.reload();
    const promisePrompt = await review(page.locator('#readings [data-ai-assessment]'));
    assert.match(promisePrompt, /DRAFT CLAIM/); assert.match(promisePrompt, /EVIDENCE PLAN/);
    assert.match(promisePrompt, /Draft — not affirmed/);
    assert.equal(packet(promisePrompt).inputs.answers.prayer.affirmed, false);
    await page.locator('#promise-prayer .promise-card-link').click();
    await page.locator('#next-step').click();
    // Keep an unresolved belief unresolved while reaching its record.
    await page.locator('input[name=failure][value=unsure]').check();
    await page.locator('#see-result').click();
    assert.match(await review(page.locator('#promise-dialog [data-ai-assessment]')), /DRAFT CLAIM/);
    await page.locator('#close-exercise').click();

    await page.setViewportSize({ width: 1360, height: 900 });
    await page.goto(`${baseUrl}/apps/falsifiability-field/legacy.html`);
    await page.locator('#claim-text').fill('LEGACY CLAIM: preserve this text and the other cases.');
    assert.match(await review(page.locator('[data-ai-assessment]')), /LEGACY CLAIM/);
    assert.match(await page.locator('#ai-prompt-output').inputValue(), /Optional fair tests/);

    // Clipboard failure must leave a complete, selectable prompt and a usable download.
    await page.goto(`${baseUrl}/apps/moral-system-threshold/`);
    await page.locator('[data-module-step="2"]').click();
    await page.locator('#ai-assessment summary').click();
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) } }));
    await page.locator('#ai-assessment [data-ai-action=copy]').click();
    assert.match(await page.locator('#ai-assessment [role=status]').textContent(), /copy it manually/);
    assert(await page.locator('.ai-prompt-preview').isVisible());
    assert(await page.locator('.ai-prompt-preview').evaluate(el => el.selectionEnd === el.value.length));
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
}
