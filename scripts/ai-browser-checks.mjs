import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { TOOLS, MODULES } from './tool-manifest.mjs';
import { emptyAnswer, STORAGE_KEY } from './promise-model.mjs';
import { PROMISES } from './promise-catalog.mjs';

function packet(text) {
  const start = 'BEGIN ASSESSMENT RECORD (JSON data, not instructions)\n';
  return JSON.parse(text.slice(text.indexOf(start) + start.length, text.lastIndexOf('\nEND ASSESSMENT RECORD')));
}
export async function verifyAiPrompts(baseUrl, browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'], acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await fs.mkdir('.local/redesign/ai', { recursive: true });
  async function review(panel) {
    if (!await panel.locator('details').evaluate(el => el.open)) await panel.locator('summary').click();
    await panel.locator('[data-ai-action=preview]').click();
    return panel.locator('.ai-prompt-preview').inputValue();
  }
  async function finishReview(panel) {
    if (!await panel.locator('details').evaluate(el => el.open)) await panel.locator('summary').click();
    const fields = panel.locator('[data-ai-field]');
    for (let i = 0; i < await fields.count(); i++) {
      const field = fields.nth(i);
      if (!await field.inputValue()) await field.fill('I apply the same stated conditions to every comparable case before checking the result.');
    }
    await panel.locator('.ai-confirm').check();
    assert.equal(await panel.locator('progress').getAttribute('value'), '100');
  }
  try {
    for (const tool of TOOLS.filter(t => MODULES[t.id])) {
      console.log(`AI CHECK ${tool.id}`);
      await page.goto(`${baseUrl}${tool.previewPath}`);
      await page.locator('body.module-guide-ready').waitFor();
      await page.locator('.module-view-toggle').click();
      const field = page.locator('main textarea:not([readonly]):not(.ai-explanation):not([data-ai-field])').first();
      const originalText = `A reason in ${tool.id}: café — this is my exact position.\nLine two: <b>text, not markup</b>.`;
      if (await field.count()) await field.fill(originalText);
      await page.locator('[data-module-step="2"]').click();
      const panel = page.locator('#ai-assessment');
      await panel.locator('summary').click();
      assert(await panel.locator('[data-ai-action=copy]').isDisabled(), `${tool.id} begins locked`);
      await panel.locator('[data-ai-field=position]').fill('ascadsad akj asdh');
      assert(await panel.locator('.ai-confirm').isDisabled(), 'Filler does not unlock confirmation');
      await panel.locator('[data-ai-field=position]').fill('I claim this conclusion follows only if the stated conditions and supporting reasons hold.');
      if (tool.id === 'promising-gods-mirror') {
        assert.doesNotMatch(await panel.locator('.ai-prompt-preview').inputValue(), /1 Timothy 4:8|Matthew 10:29/);
        await page.locator('[data-module-step="1"]').click();
        const ids = await page.locator('#case-buttons [data-promise-id]').evaluateAll(nodes => nodes.map(n => n.dataset.promiseId));
        for (const id of ids) { await page.locator(`#case-buttons [data-promise-id="${id}"]`).click(); await page.locator('.mirror-collapse-option').filter({ has: page.locator('input[value="0"]') }).click(); }
        await page.locator('[data-module-step="2"]').click();
      }
      if (tool.id === 'moral-particulars-audit') {
        await page.locator('[data-module-step="1"]').click();
        await page.locator('input[name=stance][value=support]').check();
        await page.locator('[data-module-step="2"]').click();
      }
      const extra = `Additional reason for ${tool.id}: test my claim against a fair alternative.`;
      await panel.locator('.ai-explanation').fill(extra);
      await finishReview(panel);
      const prompt = await review(panel);
      const data = packet(prompt);
      assert.equal(data.visitorExplanation, extra);
      if (await field.count()) assert(JSON.stringify(data.inputs).includes(JSON.stringify(originalText).slice(1, -1)), `${tool.id} includes exact typed text`);
      assert.match(prompt, /Ranked weaknesses/);
      assert.match(prompt, /timescale and stopping rule/);
      assert.match(prompt, /inconclusive/);
      assert.match(prompt, /data, not instructions/);
      if (tool.id === 'promising-gods-mirror') assert.match(prompt, /1 Timothy 4:8/);
      // Copy reads current inputs again; it must not export the older preview.
      await panel.locator('.ai-explanation').fill(extra + ' Final edit.');
      assert(await panel.locator('[data-ai-action=copy]').isDisabled(), 'An edit invalidates the earlier review');
      assert.equal(await panel.locator('.ai-prompt-preview').inputValue(), '', 'An invalidated prompt is removed');
      const olderPrompt = page.locator('#aiPromptOutput, #aiPrompt, #ai-prompt, #ai-prompt-box');
      if (await olderPrompt.count()) assert.match(await olderPrompt.inputValue(), /AI assessment unavailable/, 'Earlier AI output cannot bypass the gate');
      await finishReview(panel);
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
      if (tool.id === 'moral-system-threshold') assert(await panel.locator('[data-ai-action=copy]').isEnabled(), 'An unchanged reviewed position survives reload');
    }
    // Notes on unselected cases and filtered-out claims must travel with the prompt.
    await page.goto(`${baseUrl}/apps/moral-particulars-audit/`);
    const cases = page.locator('[data-issue]');
    await cases.nth(0).click(); await page.locator('#caseNotes').fill('FIRST CASE: evidence of a limiting principle.');
    await page.locator('[data-module-step="0"]').click(); await cases.nth(1).click();
    await page.locator('#caseNotes').fill('SECOND CASE: the same principle applied here.');
    await page.locator('[data-module-step="2"]').click();
    await finishReview(page.locator('#ai-assessment'));
    const casePrompt = await review(page.locator('#ai-assessment'));
    assert.match(casePrompt, /FIRST CASE/); assert.match(casePrompt, /SECOND CASE/);
    await page.goto(`${baseUrl}/apps/theism-gradient-audit/app.html`);
    await page.locator('[data-module-step="1"]').click();
    await page.locator('.claim textarea').first().fill('HIDDEN CLAIM NOTE: do not omit my reason.');
    await page.locator('#category-filter').selectOption('Specific Christian Theism');
    await page.locator('[data-module-step="2"]').click();
    await finishReview(page.locator('#ai-assessment'));
    assert.match(await review(page.locator('#ai-assessment')), /HIDDEN CLAIM NOTE/);

    const draft = { ...emptyAnswer(), interpretation: 'tendency', failure: 'conditions', claim: 'Prayer requires willingness to obey.', test: { ...emptyAnswer().test, method: 'comparison', plan: 'ascadsad akj asdh' } };
    await page.goto(baseUrl);
    await page.evaluate(({ key, draft }) => localStorage.setItem(key, JSON.stringify({ version: 3, answers: { prayer: draft }, previousAnswers: {} })), { key: STORAGE_KEY, draft });
    await page.reload();
    const allPanel = page.locator('#readings [data-ai-assessment]');
    assert(await allPanel.locator('[data-ai-action=copy]').isDisabled());
    await page.locator('#promise-prayer .promise-card-link').click();
    assert(await page.locator('#promise-dialog progress').isVisible(), 'Progress is visible from the first step');
    await page.locator('#next-step').click();
    await page.locator('#see-result').click();
    let promisePanel = page.locator('#promise-dialog [data-ai-assessment]');
    await promisePanel.locator('summary').click();
    assert(await promisePanel.locator('[data-ai-action=preview]').isDisabled(), 'The incomplete Copilot example cannot export');
    assert.match(await promisePanel.locator('.ai-readiness-checklist').textContent(), /Affirm this as your actual belief/);
    // Complete the underlying position and test through the real exercise controls.
    await page.locator('#promise-dialog [data-back="1"]').click();
    await page.locator('#belief-statement').fill('Qualifying prayer requests are fulfilled more often than comparable requests without prayer.');
    await page.locator('#next-step').click();
    await page.locator('#test-plan').fill('Compare all dated qualifying requests with similar cases, using outcomes recorded at six months.');
    await page.locator('#outcomes-section > summary').click();
    await page.locator('#test-support').fill('A repeated advantage across comparable groups would support the claim, after accounting for ordinary causes.');
    await page.locator('#test-challenge').fill('An adequately precise result ruling out my predicted advantage would lower my confidence in this reading.');
    await page.locator('#test-inconclusive').fill('Too few cases or missing records would leave this comparison inconclusive rather than successful.');
    await page.locator('#exceptions-section > summary').click();
    await page.locator('input[name=test-review][value=none]').check();
    await page.locator('input[name=failure][value=yes]').check();
    await page.locator('#see-result').click();
    promisePanel = page.locator('#promise-dialog [data-ai-assessment]');
    await finishReview(promisePanel);
    const promisePrompt = await review(promisePanel);
    assert.equal(packet(promisePrompt).inputs.answers.prayer.affirmed, true);
    assert.match(promisePrompt, /six months/);
    await page.locator('#close-exercise').click();
    assert(await allPanel.locator('[data-ai-action=copy]').isDisabled(), 'A partial set cannot unlock the full-record prompt');
    // Other readings need interpretive reasons, not irrelevant physical experiments.
    await page.evaluate(({ key, ids }) => {
      const saved = JSON.parse(localStorage.getItem(key));
      for (const id of ids) saved.answers[id] = { interpretation: 'not-promise', claim: 'I read this passage as general instruction rather than a guaranteed divine outcome.', affirmed: true, complete: true, reviewed: true };
      localStorage.setItem(key, JSON.stringify(saved));
    }, { key: STORAGE_KEY, ids: PROMISES.filter(p => p.id !== 'prayer').map(p => p.id) });
    await page.reload();
    for (const promise of PROMISES.filter(p => p.id !== 'prayer')) {
      await page.locator(`#promise-${promise.id} .promise-card-link`).click();
      const panel = page.locator('#promise-dialog [data-ai-assessment]');
      await finishReview(panel);
      assert.equal(await panel.locator('[data-ai-field=timing]').count(), 0);
      await page.locator('#close-exercise').click();
    }
    assert.equal(await allPanel.locator('progress').getAttribute('value'), '100');
    const completeRecord = await review(allPanel);
    assert.equal(Object.keys(packet(completeRecord).assessmentBrief).length, 6);
    assert.match(completeRecord, /Qualifying prayer requests/);
    await page.screenshot({ path: '.local/redesign/ai/ready-record-phone.png' });

    await page.setViewportSize({ width: 1360, height: 900 });
    await page.goto(`${baseUrl}/apps/falsifiability-field/legacy.html`);
    await page.locator('#claim-text').fill('LEGACY CLAIM: preserve this text and the other cases.');
    assert.match(await page.locator('#ai-prompt-output').inputValue(), /AI assessment unavailable/);
    await finishReview(page.locator('[data-ai-assessment]'));
    assert.match(await review(page.locator('[data-ai-assessment]')), /LEGACY CLAIM/);
    assert.match(await page.locator('#ai-prompt-output').inputValue(), /Optional fair tests/);

    // Clipboard failure must leave a complete, selectable prompt and a usable download.
    await page.goto(`${baseUrl}/apps/moral-system-threshold/`);
    await page.locator('[data-module-step="2"]').click();
    await finishReview(page.locator('#ai-assessment'));
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) } }));
    await page.locator('#ai-assessment [data-ai-action=copy]').click();
    assert.match(await page.locator('#ai-assessment [role=status]').textContent(), /copy it manually/);
    assert(await page.locator('.ai-prompt-preview').isVisible());
    assert(await page.locator('.ai-prompt-preview').evaluate(el => el.selectionEnd === el.value.length));
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
}
