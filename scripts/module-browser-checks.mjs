import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { MODULES, TOOLS } from './tool-manifest.mjs';

export async function verifyModuleJourneys(baseUrl, browser) {
  const context = await browser.newContext({ viewport: { width: 1360, height: 960 }, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await fs.mkdir('.local/redesign/modules', { recursive: true });
  async function fits(label) {
    const result = await page.evaluate(() => ({ width: innerWidth, actual: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && el.getBoundingClientRect().width && getComputedStyle(el).position !== 'absolute').slice(0, 8).map(el => `${el.tagName}.${el.className}`) }));
    assert(result.actual <= result.width, `${label}: ${JSON.stringify(result)}`);
  }
  try {
    await page.goto(`${baseUrl}/#apps`);
    assert.equal(await page.locator('.module-card').count(), 9);
    assert.deepEqual(await page.locator('[aria-labelledby="group-morality"] .module-open').evaluateAll(links => links.map(l => new URL(l.href).pathname)), ['/apps/moral-system-threshold/', '/apps/moral-system-stress-test/', '/apps/moral-particulars-audit/']);
    await page.screenshot({ path: '.local/redesign/modules/directory-desktop.png' });
    for (const tool of TOOLS.filter(t => MODULES[t.id])) {
      console.log(`CHECK ${tool.id}`);
      await page.goto(`${baseUrl}${tool.previewPath}`);
      await page.locator('body.module-guide-ready').waitFor();
      assert.equal(await page.locator('h1').count(), 1);
      const m = MODULES[tool.id];
      const originalControls = await page.locator('main input, main textarea, main select').count();
      for (const width of [1360, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        for (let i = 0; i < 3; i++) {
          await page.locator(`[data-module-step="${i}"]`).click();
          assert.equal(await page.locator('[data-module-step][aria-current="step"]').getAttribute('data-module-step'), String(i));
          assert(await page.locator(m.steps[i].target).isVisible(), `${tool.id} stage ${i + 1} target is reachable`);
          await fits(`${tool.id} stage ${i + 1} at ${width}px`);
          if (i === 0 || width === 390) await page.screenshot({ path: `.local/redesign/modules/${tool.id}-${width}-${i + 1}.png` });
        }
      }
      await page.locator('.module-view-toggle').click();
      assert.equal(await page.locator('[data-guide-hidden]').count(), 0, 'Full view reveals all mapped sections');
      assert.equal(await page.locator('main input, main textarea, main select').count(), originalControls, 'Stage navigation must not recreate or discard controls');
      await fits(`${tool.id} full view at 320px`);
      await page.locator('.module-help > summary').click();
      assert(await page.locator('.module-help-content').isVisible());
      await fits(`${tool.id} help at 320px`);
      await page.locator('.module-view-toggle').click();
      await page.goto(`${baseUrl}${tool.previewPath}${m.steps[1].target}`);
      await page.locator('[data-module-step="1"][aria-current="step"]').waitFor();
      assert.equal(await page.locator('[data-module-step="1"]').getAttribute('aria-current'), 'step', `${tool.id}: a saved section link must open the right stage`);
      await page.locator('[data-module-step="2"]').press('Enter');
      await page.goBack();
      await page.locator('[data-module-step="1"][aria-current="step"]').waitFor();
      assert(await page.locator(m.steps[1].target).isVisible(), 'Browser Back restores the previous stage');
    }
    await verifyMoralHandoffs(page, baseUrl);
    await verifyGradient(page, baseUrl);
    await verifyMirror(page, baseUrl);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
}

async function verifyMoralHandoffs(page, baseUrl) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/apps/moral-system-threshold/`);
  const claim = 'My reasons must explain obligations and apply consistently to comparable cases.';
  await page.locator('#claimInput').fill(claim);
  await page.locator('[data-stage-next]').click();
  await page.locator('input[type=radio][name^="status-"]').nth(1).check();
  const chosen = await page.locator('input[type=radio][name^="status-"]:checked').first().inputValue();
  await page.locator('[data-stage-next]').click();
  assert.match(await page.locator('#summaryOutput').inputValue(), /My reasons must explain/);
  await page.locator('[data-readiness-jump]').first().click();
  assert.equal(await page.locator('[data-module-step="1"]').getAttribute('aria-current'), 'step', 'Diagnosis links reveal the checklist');
  await page.reload();
  await page.locator('[data-module-step="0"]').click();
  assert.equal(await page.locator('#claimInput').inputValue(), claim);
  await page.locator('[data-module-step="1"]').click();
  assert.equal(await page.locator('input[type=radio][name^="status-"]:checked').first().inputValue(), chosen);
  await page.locator('[data-module-step="2"]').click();
  await page.locator('[data-stress-link]').first().click();
  await page.waitForURL('**/moral-system-stress-test/**');
  assert.equal(await page.locator('#claimInput').inputValue(), claim, 'Threshold handoff retains the claim');
  assert(await page.locator('#thresholdImportBanner').isVisible());
  await page.locator('[data-module-step="2"]').click();
  await page.locator('[data-particulars-link]:visible').first().click();
  await page.waitForURL('**/moral-particulars-audit/**');
  assert(await page.locator('#stressImportBanner').isVisible());
  await page.locator('[data-issue]').first().click();
  assert.equal(await page.locator('[data-module-step="1"]').getAttribute('aria-current'), 'step', 'Choosing a case reveals its judgment controls');
  assert(await page.locator('#judgment-step').isVisible());
}

async function verifyGradient(page, baseUrl) {
  await page.goto(`${baseUrl}/apps/fine-tuning-bridge-audit/`);
  await page.locator('[data-module-step="2"]').click();
  await page.locator('[data-gradient-link]').click();
  await page.waitForURL('**/theism-gradient-audit/app.html**');
  assert(await page.locator('#bridge-import-banner').isVisible());
  await page.locator('#bridge-import-focus').click();
  await page.locator('[data-module-step="1"][aria-current="step"]').waitFor();
  assert.equal(await page.locator('[data-module-step="1"]').getAttribute('aria-current'), 'step');
  const claimId = await page.locator('.claim').first().getAttribute('data-claim-id');
  const slider = page.locator('.claim input[data-field=confidence]').first();
  await slider.focus();
  await slider.press('Home');
  await slider.press('ArrowRight');
  const value = await slider.inputValue();
  await page.locator('[data-module-step="0"]').click();
  const download = page.waitForEvent('download');
  await page.locator('#export-profile').click();
  const file = await (await download).path();
  assert(JSON.parse(await fs.readFile(file, 'utf8')));
  await page.reload();
  await page.locator('#next-unrated').click();
  await page.locator('[data-module-step="1"][aria-current="step"]').waitFor();
  assert.equal(await page.locator('[data-module-step="1"]').getAttribute('aria-current'), 'step', 'Next unrated opens the claim stage');
  await page.locator('[data-module-step="0"]').click();
  await page.locator('#import-profile-file').setInputFiles(file);
  await page.locator('[data-module-step="1"]').click();
  await page.locator('#search-filter').fill('');
  await page.locator('#category-filter').selectOption('Design Deism');
  assert.equal(await page.locator(`.claim[data-claim-id="${claimId}"] input[data-field=confidence]`).inputValue(), value, 'Export and import keep ratings');
}

async function verifyMirror(page, baseUrl) {
  await page.goto(`${baseUrl}/apps/promising-gods-mirror/`);
  await page.locator('[data-module-step="2"]').click();
  assert.doesNotMatch(await page.locator('#report-output').textContent(), /Matthew 10:29|1 Timothy 4:8/);
  assert.doesNotMatch(await page.evaluate(() => buildReportText()), /Matthew 10:29|1 Timothy 4:8/, 'Copyable report must keep the same reveal boundary');
  await page.locator('[data-module-step="1"]').click();
  const ids = await page.locator('#case-buttons [data-promise-id]').evaluateAll(nodes => nodes.map(n => n.dataset.promiseId));
  assert.equal(ids.length, 9);
  for (const id of ids) {
    await page.locator(`#case-buttons [data-promise-id="${id}"]`).click();
    await page.locator('.mirror-collapse-option').filter({ has: page.locator('input[value="0"]') }).click();
    assert(await page.locator('input[name=collapse-line][value="0"]').isChecked());
  }
  await page.locator('[data-module-step="2"]').click();
  assert(await page.locator('#reveal-grid').isVisible());
  assert.match(await page.locator('#report-output').textContent(), /1 Timothy 4:8/);
  assert.match(await page.evaluate(() => buildReportText()), /1 Timothy 4:8/);
  const ai = page.locator('[data-ai-assessment]');
  await ai.locator('summary').click();
  await ai.locator('[data-ai-action="preview"]').click();
  assert.match(await ai.locator('.ai-prompt-preview').inputValue(), /1 Timothy 4:8/, 'AI prompt includes unlocked comparisons after all nine decisions');
  await page.reload();
  assert.match(await page.locator('#reveal-status').textContent(), /unlocked/i);
}
