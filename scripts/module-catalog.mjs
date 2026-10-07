// Reader-facing descriptions and the guided route through the existing audits.
// Panel selectors retain the original controls, calculations, and saved data.
export const MODULE_GROUPS = [
  { id: 'evidence', name: 'Belief & evidence', description: 'Examine your confidence, your reasons, and the standards you apply.' },
  { id: 'arguments', name: 'Arguments for Christianity', description: 'Inspect what an argument supports—and what still needs to be established.' },
  { id: 'morality', name: 'Morality', description: 'Follow the sequence: define a system, test its coherence, then apply it to real cases.' },
];

export const MODULES = {
  'belief-overreach-audit': {
    group: 'evidence', label: 'Confidence & evidence', question: 'Does my confidence exceed my evidence?',
    summary: 'Compare confidence with support, then see what happens when a decision asks more of a belief than it can carry.',
    intro: 'Begin with a simple example. Change the assumptions, watch the consequences, and decide whether your own confidence is proportionate to your reasons.',
    outcome: 'A clearer distinction between confidence, supporting evidence, and the risk of acting on a belief.',
    note: 'The scenarios are illustrations. Their settings and outcomes are not measurements of Christianity’s truth.',
    steps: [
      { label: 'Understand the example', hint: 'Meet the four approaches to confidence before choosing a scenario.', target: '#overview-step', panels: ['#overview-step'] },
      { label: 'Try the comparison', hint: 'Choose a setting, change an assumption, and compare what happens. Presets are examples, not your beliefs.', target: '#scenario-step', panels: ['#scenario-step'] },
      { label: 'Consider the consequences', hint: 'Read the result in light of the assumptions you used. Decide what confidence those reasons can support.', target: '#summary-step', panels: ['.overreach-dashboard', '#lessons-step', '#summary-step'] },
    ], help: ['#qa-step'],
  },
  'inductive-symmetry-audit': {
    group: 'evidence', label: 'Consistent standards', question: 'Would I accept this reasoning for another belief?',
    summary: 'Compare the reasoning you accept with the reasoning you reject. Name a relevant difference when your standards change.',
    intro: 'Choose an argument, state your positions on comparable cases, and explain any difference in how you treat them.',
    outcome: 'A record of where your evidential standards agree, differ, or still need a reason.',
    note: 'A difference needs an explanation; it is not automatically a contradiction or proof that a belief is false.',
    steps: [
      { label: 'Choose an argument', hint: 'Read the argument and its comparison. Example profiles are starting points to inspect, not positions you have affirmed.', target: '#archetype-title', panels: ['.archetype-panel', '.comparison-panel'] },
      { label: 'Apply your standard', hint: 'Choose your stances, then state why any different treatment is justified.', target: '#stances', panels: ['#stances', '#audit'] },
      { label: 'Review the comparison', hint: 'Find the differences that still need a defense. Copy your report to continue the discussion.', target: '#results', panels: ['#results'] },
    ], help: ['.differentiator-guide', '#qa'],
  },
  'promising-gods-mirror': {
    group: 'evidence', label: 'The promise mirror', question: 'Would I defend the same promise from another god?',
    summary: 'Judge nine invented promises before seeing their Christian parallels. Apply the same standard to both.',
    intro: 'Read the invented claims and their hypothetical results. Decide when each stops promising a physical outcome, then compare your decisions with familiar claims.',
    outcome: 'Nine explicit decisions to compare with the standards you use for Christian promises.',
    note: 'The gods, verses, studies, and outcomes in these cases are invented. They are thought experiments, not research findings.',
    steps: [
      { label: 'Read the setup', hint: 'Meet the three invented gods. The same question applies to every case: what result was actually promised?', target: '#gods', panels: ['#gods'] },
      { label: 'Decide each case', hint: 'Read the claim, test, and hypothetical result. Choose the first point where you no longer regard it as the same physical promise.', target: '#cases', panels: ['#cases', '.mirror-case-picker', '.mirror-active-selection', '.mirror-promise-panel', '#collapse'] },
      { label: 'Compare your standards', hint: 'Finish all nine decisions to reveal the Christian parallels. Then ask whether you would draw the same line for them.', target: '#reveal', panels: ['#cases', '#reveal'] },
    ], help: ['#qa-step'],
  },
  'fine-tuning-bridge-audit': {
    group: 'arguments', label: 'Fine-tuning & design', question: 'What does fine-tuning actually establish?',
    summary: 'Examine each step from a universe that permits life to a designer, a purpose, and the Christian God.',
    intro: 'State your conclusion first. Then check the reasons needed to move from life-permitting conditions to a claim about design or God.',
    outcome: 'The strongest conclusion supported by the assumptions and arguments you enter.',
    note: 'A model score summarizes your entries. It is not the probability that a designer or God exists.',
    steps: [
      { label: 'State your conclusion', hint: 'Choose the claim you want to defend and make your starting commitments explicit.', target: '#claim-step', panels: ['#claim-step', '#prior-step'] },
      { label: 'Check each inference', hint: 'Inspect the supporting premises, the kind of world expected, and what counts as the intended target.', target: '#bridge-step', panels: ['#bridge-step', '#world-step', '#goal-step'] },
      { label: 'See what is supported', hint: 'Review the limits of your argument. Save the report or carry the result into the Theism Gradient.', target: '#diagnosis-step', panels: ['.fine-dashboard', '.fine-score-panel', '#diagnosis-step', '#next-step', '#report-step'] },
    ], help: ['#qa-step'],
  },
  'resurrection-evidence-audit': {
    group: 'arguments', label: 'The resurrection', question: 'How much does the resurrection evidence support?',
    summary: 'Separate the historical claim, your starting assumptions, the evidence, and competing explanations.',
    intro: 'State exactly what you believe happened. Assess the evidence both with and without that claim, then examine what your assumptions imply.',
    outcome: 'A transparent account of how your starting assumptions, evidence ratings, and alternatives affect the conclusion.',
    note: 'The displayed probability is conditional on your inputs and this model. It is not an independently established historical probability.',
    steps: [
      { label: 'State the claim', hint: 'Specify the event you are assessing and its starting plausibility before adding this case’s evidence.', target: '#claim-step', panels: ['#claim-step', '#starting-step'] },
      { label: 'Weigh the evidence', hint: 'Compare what each item would look like if the claim were true or false. Account for shared sources and alternatives.', target: '#evidence-step', panels: ['#evidence-step', '#alternatives-step'] },
      { label: 'Review your conclusion', hint: 'Check which assumptions drive the result and what would change it. Save a report that keeps those assumptions visible.', target: '#result-step', panels: ['.plain-result-strip', '#result-step', '#report-step'] },
    ], help: ['.plain-help', '#qa-step'],
  },
  'theism-gradient-audit': {
    group: 'arguments', label: 'From a creator to Christianity', question: 'Can I defend each step toward my Christian beliefs?',
    summary: 'Rate 50 claims separately. Distinguish how confident you feel from the case you can personally make.',
    intro: 'Start with one claim or one subject. Give separate ratings for confidence and the support you can explain, then review the gaps and dependencies.',
    outcome: 'A map of which beliefs you can defend, which depend on other claims, and which need more work.',
    note: 'These are your ratings of confidence and support. The overall index does not measure the probability that Christianity is true.',
    steps: [
      { label: 'Choose a starting point', hint: 'Start with an unrated claim or choose a subject. Load a sample only if you want to explore someone else’s example.', target: '#guided-title', panels: ['.guided-panel', '.lens-panel'] },
      { label: 'Rate your reasons', hint: 'For each claim, separate confidence from the support you can personally explain. Add a note about what still needs work.', target: '#claim-explorer-title', panels: ['.diagnostics-grid', '.claim-section'] },
      { label: 'Review the whole picture', hint: 'Inspect gaps and claims that depend on weaker premises. Export your profile before major revisions.', target: '#dashboard-title', panels: ['.summary-band', '.metric-grid', '.dashboard-grid', '.analysis-grid', '.report-grid'] },
    ], help: ['.method-panel', '.qa-panel'],
  },
  'moral-system-threshold': {
    group: 'morality', label: '1. Define a moral system', question: 'Have I supplied a moral system—or only a source of rules?',
    summary: 'Identify the essential parts of your moral view before testing whether they fit together.',
    intro: 'Name the basis of your moral view. For each required part, distinguish what is missing, merely asserted, or supported by reasons.',
    outcome: 'A clear account of what your moral framework supplies and what still needs to be explained.',
    note: 'Passing this checklist means the framework has specified parts. It does not establish that the moral view is true.',
    steps: [
      { label: 'Name your moral view', hint: 'State the source or approach you believe grounds morality. Explain the claim in your own words.', target: '#claim-step', panels: ['#claim-step'] },
      { label: 'Check its essentials', hint: 'Work through the eight components. State what supports each one rather than marking mere agreement as support.', target: '#checklist-step', panels: ['#checklist-step'] },
      { label: 'See what is missing', hint: 'Review the gaps. When ready, carry your answers into the Moral System Stress Test.', target: '#diagnosis-step', panels: ['.threshold-dashboard', '#diagnosis-step', '#next-step', '#report-step'] },
    ], help: ['#qa-step'],
  },
  'moral-system-stress-test': {
    group: 'morality', label: '2. Test its coherence', question: 'Do the parts of my moral system fit together?',
    summary: 'Test how your view handles authority, obligations, disagreement, and difficult boundary cases.',
    intro: 'Continue from the threshold checklist or state a view here. Explain how its parts work together and address the challenges your answers raise.',
    outcome: 'A record of the supporting reasons, unresolved tensions, and difficult cases for your moral view.',
    note: 'The scores organize the view you enter. They do not establish which moral theory is correct.',
    steps: [
      { label: 'State your moral claim', hint: 'Confirm the view you want to defend. Imported answers remain available; review them before proceeding.', target: '#claim-step', panels: ['.morality-sequence-band', '#claim-step'] },
      { label: 'Test how it works', hint: 'Check the components and boundary cases. Give reasons for the parts you consider supported.', target: '#elements-step', panels: ['#elements-step', '#boundary-step'] },
      { label: 'Face the challenges', hint: 'Address the tensions, save your report, and take your view into the concrete cases in Moral Particulars.', target: '#challenge-step', panels: ['.moral-dashboard', '#challenge-step', '#dialogue-step', '#report-step', '.morality-pipeline-panel'] },
    ], help: ['#qa-step'],
  },
  'moral-particulars-audit': {
    group: 'morality', label: '3. Apply it to real cases', question: 'Do my moral judgments follow the reasons I give?',
    summary: 'Take positions on concrete cases, identify your reasons, and account for disagreement.',
    intro: 'Choose a case and state your judgment. Identify what grounds it, explain disagreement, and compare your reasoning across cases.',
    outcome: 'A case-by-case record showing where your moral reasons are consistent and where they need explanation.',
    note: 'A pattern in your answers is a prompt for reflection. It is not an automatic verdict about right and wrong.',
    steps: [
      { label: 'Choose a case', hint: 'Select a concrete question. A preset supplies example weights; it does not settle your judgment.', target: '#issue-step', panels: ['.morality-sequence-band', '#issue-step'] },
      { label: 'State your reasons', hint: 'Give your judgment, weigh its grounds, and explain why a reasonable person might disagree.', target: '#judgment-step', panels: ['#judgment-step', '#disagreement-step'] },
      { label: 'Check your consistency', hint: 'Review patterns across your cases. Revisit any judgment whose reasons you cannot apply consistently elsewhere.', target: '#patterns-step', panels: ['.particulars-dashboard', '#patterns-step', '#report-step'] },
    ], help: ['#qa-step'],
  },
};
