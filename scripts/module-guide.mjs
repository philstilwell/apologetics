import { MODULES } from './module-catalog.mjs?v=20261007-modules';

const config = MODULES[document.body.dataset.guidedModule];
if (config) setupGuide(config);

function setupGuide(config) {
  const main = document.querySelector('main');
  const nav = main.querySelector('.module-step-nav');
  const heading = main.querySelector('.module-stage-heading');
  const toggle = main.querySelector('.module-view-toggle');
  const panels = new Map();
  config.steps.forEach((step, index) => step.panels.forEach(selector => {
    const matches = main.querySelectorAll(selector);
    if (!matches.length) throw new Error(`Missing module panel: ${selector}`);
    matches.forEach(node => {
      if (!panels.has(node)) panels.set(node, new Set());
      panels.get(node).add(index);
    });
  }));
  const aiPanel = window.CrosshairsAI.createPanel({ id: document.body.dataset.guidedModule });
  aiPanel.id = 'ai-assessment';
  heading.after(aiPanel);
  panels.set(aiPanel, new Set([2]));
  // Retain existing output elements for their original report/export handlers.
  const oldPrompt = main.querySelector('#aiPromptOutput, #aiPrompt, #ai-prompt, #ai-prompt-box');
  if (oldPrompt) {
    const oldCard = oldPrompt.closest('article, .panel, .result-panel');
    const reportCard = oldCard.previousElementSibling;
    reportCard?.classList.add('ai-retained-report');
    // Moral Particulars also uses this status for its ordinary report-copy action.
    const reportStatus = oldCard.querySelector('#copyStatus');
    if (reportStatus && reportCard) reportCard.append(reportStatus);
    oldCard.hidden = true;
  }

  // Existing elements are moved, never copied: their controls and listeners survive.
  const help = document.createElement('details');
  help.className = 'module-help';
  help.innerHTML = '<summary>Questions, explanations & background</summary><div class="module-help-content"></div>';
  const helpContent = help.querySelector('div');
  const background = main.querySelector(':scope > .app-header, :scope > .topbar');
  if (background) {
    const original = document.createElement('details');
    original.className = 'module-background';
    original.innerHTML = '<summary>Background & more options</summary>';
    original.append(background);
    helpContent.append(original);
  }
  for (const selector of config.help) {
    for (const node of main.querySelectorAll(selector)) {
      // The help sections remain available from every stage.
      if (panels.has(node)) panels.delete(node);
      helpContent.append(node);
    }
  }
  const related = main.querySelector(':scope > .seo-related');
  main.insertBefore(help, related);
  const footer = document.createElement('div');
  footer.className = 'module-stage-footer';
  footer.innerHTML = '<button type="button" data-stage-back>← Previous stage</button><span role="status" aria-live="polite" class="module-stage-status"></span><button type="button" class="module-continue" data-stage-next>Continue →</button><a href="../../#apps" class="module-finish" hidden>Choose another module ↗</a>';
  main.insertBefore(footer, help);
  const previous = footer.querySelector('[data-stage-back]');
  const next = footer.querySelector('[data-stage-next]');
  const finish = footer.querySelector('.module-finish');

  for (const table of main.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'module-table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'Data table; scroll horizontally if needed');
    table.before(wrapper);
    wrapper.append(table);
  }
  for (const label of main.querySelectorAll('.app-step')) {
    if (/^Step \d+$/i.test(label.textContent.trim())) label.classList.add('module-old-step');
  }
  for (const chart of main.querySelectorAll('.evidence-contribution-chart-wrap')) {
    chart.tabIndex = 0;
    chart.setAttribute('role', 'region');
    chart.setAttribute('aria-label', 'Evidence chart; scroll horizontally to compare all items');
  }
  let current = 0;
  let showAll = false;
  function selectStage(index, focus = false) {
    current = index;
    for (const [node, stages] of panels) node.toggleAttribute('data-guide-hidden', !showAll && !stages.has(index));
    for (const link of nav.querySelectorAll('[data-module-step]')) {
      if (!showAll && Number(link.dataset.moduleStep) === current) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
    document.querySelector('#module-stage-count').textContent = showAll ? 'FULL MODULE' : `STAGE ${index + 1} OF 3`;
    document.querySelector('#module-stage-title').textContent = showAll ? 'All sections are open' : config.steps[index].label;
    document.querySelector('#module-stage-hint').textContent = showAll ? 'Use the stage links to move around. Your inputs are the same in both views.' : config.steps[index].hint;
    footer.querySelector('.module-stage-status').textContent = showAll ? 'Full view' : `Stage ${index + 1} of 3`;
    previous.hidden = showAll || current === 0;
    next.hidden = showAll || current === 2;
    finish.hidden = !showAll && current !== 2;
    if (current < 2) next.textContent = `Continue: ${config.steps[current + 1].label} →`;
    toggle.textContent = showAll ? 'Use the guided stages' : 'Show all sections';
    toggle.setAttribute('aria-pressed', String(showAll));
    if (focus) {
      heading.scrollIntoView({ block: 'start', behavior: 'instant' });
      heading.focus({ preventScroll: true });
    }
    // Charts that size themselves to their container can recalculate after being revealed.
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }
  function reveal(target) {
    if (!target || !main.contains(target)) return;
    const directStage = config.steps.findIndex(step => step.target === `#${target.id}`);
    if (!showAll && directStage >= 0 && current !== directStage) selectStage(directStage);
    // Use the nearest mapped panel, including nested panels such as the Mirror reveal.
    let node = target;
    while (node && !panels.has(node)) node = node.parentElement;
    if (node && !showAll && !panels.get(node).has(current)) selectStage([...panels.get(node)][0]);
    for (let parent = target; parent && parent !== main; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
  }
  function targetFromHash(hash) {
    if (!hash || hash.startsWith('#state=')) return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
  }
  function navigate(index) {
    if (index < 0 || index > 2) return;
    showAll = false;
    selectStage(index, true);
    history.pushState(null, '', config.steps[index].target);
  }
  nav.addEventListener('click', event => {
    const link = event.target.closest('[data-module-step]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(Number(link.dataset.moduleStep));
  });
  toggle.hidden = false;
  toggle.addEventListener('click', () => { showAll = !showAll; selectStage(current, true); });
  previous.addEventListener('click', () => navigate(current - 1));
  next.addEventListener('click', () => navigate(current + 1));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('data-module-step') || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname) reveal(targetFromHash(url.hash));
  }, true);
  document.addEventListener('crosshairs:reveal', event => reveal(event.detail?.target));
  window.addEventListener('hashchange', () => {
    if (!location.hash) { showAll = false; selectStage(0); }
    const target = targetFromHash(location.hash);
    reveal(target);
    target?.scrollIntoView({ block: 'start' });
  });
  document.body.classList.add('module-guide-ready');
  selectStage(0);
  const initialTarget = targetFromHash(location.hash);
  if (initialTarget) { reveal(initialTarget); requestAnimationFrame(() => initialTarget.scrollIntoView({ block: 'start' })); }
}
