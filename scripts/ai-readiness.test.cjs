const test = require('node:test');
const assert = require('node:assert/strict');
const ai = require('./ai-assessment.js');
const sentence = 'I state the relevant conditions before examining any of the outcomes.';
function example(overrides = {}) {
  const answer = { interpretation: 'tendency', claim: 'Qualifying prayers improve the chance of receiving the specified result.', affirmed: true, complete: true, failure: 'yes', test: { method: 'comparison', plan: sentence, support: sentence, challenge: sentence, inconclusive: sentence, review: 'none', exceptions: {} }, ...overrides };
  return { moduleId: 'promises', reviewScope: 'prayer', inputs: { answers: { prayer: answer }, additionalExplanations: { prayer: '' }, previousAnswers: {} }, context: { passages: [{ id: 'prayer', name: 'Prayer' }] } };
}
function reviewed(data) {
  const review = { fields: Object.fromEntries(ai.reviewFields(data).map(f => [f.id, sentence])), confirmedFor: '' };
  review.confirmedFor = ai.signature(data, review, '');
  ai.saveReview(data.moduleId, data.reviewScope, review);
  return review;
}
test('Copilot example remains locked: unconfirmed, unresolved conditions, and filler plan', () => {
  const data = example({ claim: 'Prayer requires willingness to obey.', affirmed: false, complete: false, failure: 'conditions', test: { method: 'comparison', plan: 'ascadsad akj asdh' } });
  reviewed(data);
  const r = ai.getReadiness(data);
  assert(!r.ready); assert(r.percent < 100);
  assert(r.checks.filter(c => !c.done).some(c => c.id === 'plan'));
  const prompt = ai.buildPrompt(data);
  assert.match(prompt, /AI assessment unavailable/); assert.doesNotMatch(prompt, /BEGIN ASSESSMENT RECORD/);
});
test('an affirmed promise still needs explicit scope, timing, support, and a completed test', () => {
  const data = example();
  ai.saveReview('promises', 'prayer', { fields: {}, confirmedFor: '' });
  assert(!ai.getReadiness(data).ready);
  reviewed(data);
  assert(ai.getReadiness(data).ready);
  assert.match(ai.buildPrompt(data), /hard limit of 900/);
  assert.match(ai.buildPrompt(data), /at most three/);
  assert.match(ai.buildPrompt(data), /at most two/);
  assert.match(ai.buildPrompt(data), /BEGIN ASSESSMENT RECORD/);
  data.inputs.answers.prayer.test.support = 'test';
  assert(!ai.getReadiness(data).ready);
  assert.doesNotMatch(ai.buildPrompt(data), /BEGIN ASSESSMENT RECORD/);
});
test('input revisions invalidate review even while enough detail remains', () => {
  const data = example(); reviewed(data);
  data.inputs.answers.prayer.claim += ' The expected advantage is limited to this population.';
  assert(!ai.getReadiness(data).ready);
  assert.equal(ai.getReadiness(data).checks.find(c => c.id === 'confirmed').done, false);
  reviewed(data); assert(ai.getReadiness(data).ready);
});
test('a definite refusal to test is assessable with reasons, without a fabricated test plan', () => {
  const data = example({ failure: 'no', test: { method: 'decline' } });
  reviewed(data);
  assert(ai.getReadiness(data).ready);
  assert(ai.reviewFields(data).some(f => f.id === 'revision'));
  assert(!ai.getReadiness(data).checks.some(c => c.id === 'plan'));
});
test('spiritual, past-only, and no-promise positions use relevant requirements', () => {
  for (const interpretation of ['spiritual', 'historical', 'not-promise']) {
    const data = example({ interpretation, test: {}, failure: '' }); reviewed(data);
    assert(ai.getReadiness(data).ready);
    assert(!ai.reviewFields(data).some(f => f.id === 'timing'));
    assert(!ai.getReadiness(data).checks.some(c => c.id === 'method'));
  }
});
test('declared exceptions must have a settled acceptance policy and detail for independent checks', () => {
  const data = example();
  const t = data.inputs.answers.prayer.test;
  t.review = 'some'; t.exceptions = { faith: { policy: 'unsure', check: '' } }; reviewed(data);
  assert(!ai.getReadiness(data).ready);
  t.exceptions.faith = { policy: 'check', check: 'asdf' }; reviewed(data);
  assert(!ai.getReadiness(data).ready);
  t.exceptions.faith = { policy: 'protect', check: '' }; reviewed(data);
  assert(ai.getReadiness(data).ready, 'A definite but weak position is allowed for critique');
});
test('full record waits for every included promise to be ready', () => {
  const single = example(); reviewed(single);
  const data = { ...single, reviewScope: undefined };
  assert(ai.getReadiness(data).ready);
  data.context.passages.push({ id: 'wisdom', name: 'Wisdom' }); data.inputs.answers.wisdom = {};
  assert(!ai.getReadiness(data).ready);
});
test('all other modules require written positions, reasons, revision standards, and confirmation', () => {
  for (const moduleId of ['fine-tuning-bridge-audit', 'moral-system-threshold', 'moral-system-stress-test', 'inductive-symmetry-audit', 'resurrection-evidence-audit', 'belief-overreach-audit', 'falsifiability-field']) {
    const data = { moduleId, inputs: {}, context: {} };
    assert(!ai.getReadiness(data).ready);
    reviewed(data); assert(ai.getReadiness(data).ready);
  }
});
test('Mirror, Gradient, and Particulars also require their substantive module choices', () => {
  const mirror = { moduleId: 'promising-gods-mirror', inputs: {}, context: { completedCases: 8, totalCases: 9 } }; reviewed(mirror);
  assert(!ai.getReadiness(mirror).ready); mirror.context.completedCases = 9; assert(ai.getReadiness(mirror).ready);
  const gradient = { moduleId: 'theism-gradient-audit', inputs: { profile: { responses: {} } }, context: {} }; reviewed(gradient); assert(!ai.getReadiness(gradient).ready);
  gradient.inputs.profile.responses.a = { confidence: 0, personalSubstantiation: 0, note: sentence }; reviewed(gradient); assert(ai.getReadiness(gradient).ready);
  const moral = { moduleId: 'moral-particulars-audit', inputs: { allCaseInputs: [{ input: { stance: '' } }] }, context: {} }; reviewed(moral); assert(!ai.getReadiness(moral).ready);
  moral.inputs.allCaseInputs[0].input.stance = 'oppose'; reviewed(moral); assert(ai.getReadiness(moral).ready);
});
test('obvious filler and short fragments do not count as detailed answers', () => {
  for (const value of ['', 'ascadsad akj asdh', 'test test test test test test', 'lorem ipsum text for a test here', 'Yes, certainly.']) assert(!ai.detailed(value));
  assert(ai.detailed(sentence));
});
