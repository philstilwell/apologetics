import assert from "node:assert/strict";
import test from "node:test";
import { emptyTest, cleanTest, testGaps, testTensions, TEST_GUIDANCE, testSnapshot } from "./promise-testing.mjs";
import { PROMISES } from "./promise-catalog.mjs";
import { assess, emptyAnswer, reportText, sanitizeAnswers, canCommit, isCommitted, commitmentSnapshot, hasRevision, loadSavedRecord, previousReport } from "./promise-model.mjs";

const definedTest = { ...emptyTest(), method: "comparison", plan: "All cases over a year, matched baseline and independent review", support: "The predicted advantage with sufficient precision", challenge: "No predicted advantage with sufficient precision; withdraw the prediction", inconclusive: "Missing records or insufficient precision", review: "none" };
const fullCommitment = { ...emptyAnswer(), test: definedTest, interpretation: "tendency", claim: "Qualifying requests will succeed more often than matched requests without prayer within a year.", failure: "yes", commitments: ["scope", "outcome", "records", "comparison"] };

test("consenting to a test is not reported as evidence of fulfillment", () => {
  const result = assess(fullCommitment);
  assert.equal(result.code, "open");
  assert.match(result.body, /not evidence/);
  assert.equal(assess({ ...fullCommitment, failure: "no" }).code, "protected");
  assert.equal(assess({ ...fullCommitment, failure: "conditions" }).code, "conditional");
});

test("an improved-chances claim needs a comparison; an individual guarantee does not", () => {
  const noComparison = { ...fullCommitment, commitments: ["scope", "outcome", "records"] };
  assert.equal(assess(noComparison).code, "developing");
  assert.equal(assess({ ...noComparison, interpretation: "guarantee" }).code, "open");
});

test("spiritual, historical, non-promise and unresolved readings remain distinct", () => {
  for (const [interpretation, code] of [["spiritual", "spiritual"], ["historical", "historical"], ["not-promise", "not-promise"], ["unsure", "undecided"]]) {
    assert.equal(assess({ ...fullCommitment, interpretation }).code, code);
  }
  assert.equal(assess(emptyAnswer()).code, "unstarted");
  assert.equal(assess({ ...fullCommitment, failure: "" }).code, "undecided");
});

test("saved state cannot mark incomplete or unknown answers as finished", () => {
  const source = {
    prayer: { interpretation: "tendency", complete: true, commitments: ["scope", "scope", "invented"], note: "x".repeat(1500) },
    wisdom: { interpretation: "invented", complete: true, failure: "yes" },
    character: { interpretation: "not-promise", complete: true, failure: "invented" },
    unknown: fullCommitment,
  };
  const clean = sanitizeAnswers(source);
  assert.equal(clean.prayer.complete, false);
  assert.equal(clean.wisdom.complete, false);
  assert.equal(clean.character.complete, false, "An old exploratory answer is not an affirmed commitment");
  assert.equal(clean.prayer.note.length, 1200);
  assert.deepEqual(clean.prayer.commitments, ["scope"]);
  assert.equal(clean.unknown, undefined);
  assert.deepEqual(sanitizeAnswers(null), {});
  assert.deepEqual(sanitizeAnswers([]), {});
});

test("the report distinguishes commitments from drafts and retains every unanswered passage", () => {
  const answers = { prayer: { ...fullCommitment, affirmed: true, complete: true, note: "Define faith independently.", firstCommitment: commitmentSnapshot({ ...fullCommitment, interpretation: "guarantee" }) }, wisdom: { ...fullCommitment, complete: false } };
  const report = reportText(answers);
  assert.match(report, /1 of 6 committed; 5 unresolved/);
  assert.match(report, /Define faith independently/);
  assert.match(report, /First affirmed commitment/);
  assert.match(report, /No real-world results/);
  assert.match(report, /Wisdom & guidance —[\s\S]*?Status: Draft — not affirmed/);
  assert.match(report, /Long life —[\s\S]*?Status: No commitment/);
  assert.match(report, /My specific claim: Qualifying requests/);
});

test("completion demands a specific belief and an explicit affirmation; uncertainty never counts", () => {
  const affirmed = { ...fullCommitment, affirmed: true, complete: true };
  assert.equal(canCommit(fullCommitment), true);
  assert.equal(isCommitted(fullCommitment), false, "A ready draft has not been affirmed");
  assert.equal(isCommitted(affirmed), true);
  for (const patch of [{ claim: "   " }, { interpretation: "unsure" }, { failure: "unsure" }, { failure: "conditions" }, { interpretation: "invented" }]) {
    assert.equal(isCommitted({ ...affirmed, ...patch }), false);
  }
  assert.equal(isCommitted({ ...affirmed, failure: "no" }), true, "Refusing outcome-based testing is an explicit position, not consent to testing");
  for (const interpretation of ["spiritual", "historical", "not-promise"]) {
    assert.equal(isCommitted({ ...affirmed, interpretation, failure: "" }), true);
  }
  assert.equal(isCommitted({ ...affirmed, interpretation: "other", failure: "" }), false);
  assert.equal(isCommitted({ ...affirmed, interpretation: "other" }), true);
  assert.equal(assess({ ...affirmed, interpretation: "other" }).code, "custom", "Custom prose is never automatically classified as a testable promise");
});

test("old answers survive as drafts and new commitments survive a storage round trip", () => {
  const old = { interpretation: "guarantee", failure: "yes", complete: true, firstInterpretation: "spiritual", note: "Existing explanation", commitments: ["scope"] };
  const revised = { ...fullCommitment, claim: "My revised deadline is two years.", affirmed: true, complete: true, reviewed: true, firstCommitment: commitmentSnapshot(fullCommitment) };
  const clean = sanitizeAnswers(JSON.parse(JSON.stringify({ prayer: old, wisdom: revised, prophecy: { ...revised, interpretation: "unsure" } })));
  assert.equal(clean.prayer.interpretation, "guarantee");
  assert.equal(clean.prayer.firstInterpretation, "spiritual");
  assert.equal(clean.prayer.note, old.note);
  assert.equal(isCommitted(clean.prayer), false);
  assert.equal(isCommitted(clean.wisdom), true);
  assert.equal(hasRevision(clean.wisdom), true, "Revising terms within the same category remains visible");
  assert.equal(clean.wisdom.firstCommitment.claim, fullCommitment.claim);
  assert.equal(isCommitted(clean.prophecy), false);
});

test("every promise supplies a contextualized passage and a tailored proposed test", () => {
  assert.equal(new Set(PROMISES.map((item) => item.id)).size, 6);
  assert.equal(PROMISES.length, 6);
  for (const promise of PROMISES) {
    for (const key of ["ref", "verse", "context", "contextRef", "test", "caveat", "suggested"]) assert(promise[key]?.length, `${promise.id}: missing ${key}`);
  }
});

test("a belief commitment does not manufacture missing test terms or accept stories as comparative evidence", () => {
  const previous = { ...fullCommitment, test: undefined, affirmed: true, complete: true };
  const clean = sanitizeAnswers({ prayer: previous }).prayer;
  assert(isCommitted(clean), "An earlier explicit belief commitment survives the extension");
  assert.equal(assess(clean).code, "developing");
  assert(testGaps(clean).length >= 6);
  assert.equal(assess({ ...fullCommitment, test: { ...definedTest, method: "story" } }).code, "developing");
  assert.equal(assess({ ...fullCommitment, test: { ...definedTest, method: "records" } }).code, "developing");
});

test("independently checkable conditions are distinct from unverified protection and unresolved rules", () => {
  const conditional = { ...fullCommitment, test: { ...definedTest, review: "some", exceptions: { "weak-faith": { policy: "check", check: "Predefined eligibility assessed without knowledge of outcomes" } } } };
  assert.equal(assess(conditional).code, "open");
  assert.deepEqual(testTensions(conditional), []);
  conditional.test.exceptions["weak-faith"].check = "";
  assert.equal(assess(conditional).code, "developing");
  conditional.test.exceptions["weak-faith"].policy = "protect";
  assert.equal(assess(conditional).code, "tension");
  assert.match(testTensions(conditional)[0], /independent check/);
  conditional.test.review = "none";
  assert.equal(assess(conditional).code, "open", "Deselected exceptions have no effect");
  assert.equal(assess({ ...fullCommitment, test: { ...definedTest, method: "decline" } }).code, "tension");
});

test("test terms and their first affirmed version round-trip safely without becoming evidence", () => {
  const revised = { ...fullCommitment, affirmed: true, complete: true, test: { ...definedTest, challenge: "A revised failure threshold" }, firstTest: definedTest };
  const restored = sanitizeAnswers({ prayer: revised }).prayer;
  assert.equal(restored.firstTest.challenge, definedTest.challenge);
  assert.match(reportText({ prayer: restored }), /First affirmed test terms/);
  assert.deepEqual(cleanTest({ method: "fake", review: "fake", plan: "x".repeat(1900), exceptions: { bad: { policy: "check" }, "weak-faith": { policy: "fake", check: 1 } } }), { ...emptyTest(), plan: "x".repeat(1800), exceptions: { "weak-faith": { policy: "", check: "" } } });
  for (const promise of PROMISES) for (const key of ["evidence", "alternatives", "question"]) assert(TEST_GUIDANCE[promise.id][key]);
});

test("hidden drafts do not become current test commitments", () => {
  const draft = { ...definedTest, review: "some", exceptions: { "weak-faith": { policy: "protect", check: "A previous check" } } };
  assert.equal(testSnapshot(draft).exceptions["weak-faith"].check, "");
  assert.deepEqual(testSnapshot({ ...draft, method: "decline" }), { ...emptyTest(), method: "decline" });
  assert.deepEqual(testSnapshot({ ...draft, review: "none" }).exceptions, {});
});

test("six categories use New Testament references and keep the three combined passages distinct", () => {
  const nt = new Set(["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"]);
  assert.deepEqual(PROMISES.map(p => p.id), ["prayer", "provision", "wisdom", "prophecy", "character", "longevity"]);
  for (const p of PROMISES) for (const ref of [p.ref, p.contextRef, ...p.related, ...(p.passages || []).flatMap(x => [x.ref, x.contextRef])]) {
    assert(nt.has(ref.replace(/\s+\d.*$/, "")), `Non-New-Testament reference: ${ref}`);
  }
  const life = PROMISES.find(p => p.id === "longevity");
  assert.deepEqual(life.passages.map(p => p.ref), ["James 5:14–15", "Matthew 10:29–31", "Matthew 6:28–30"]);
  assert.match(life.passages[1].context, /does not say they never die/);
  assert.match(life.passages[2].context, /clothing/);
});

test("previous separate commitments survive without being assigned to the combined claim", () => {
  const old = { ...fullCommitment, affirmed: true, complete: true, firstCommitment: commitmentSnapshot(fullCommitment), firstTest: definedTest };
  const v1 = { version: 1, answers: { prayer: old, healing: { ...old, claim: "My original healing claim" }, protection: { ...old, claim: "My original protection claim" }, health: { ...old, claim: "My original health claim" }, longevity: { ...old, claim: "My original lifespan claim" } } };
  const loaded = loadSavedRecord(v1);
  assert(isCommitted(loaded.answers.prayer));
  assert.equal(loaded.answers.longevity, undefined);
  assert.equal(Object.keys(loaded.previousAnswers).length, 4);
  assert(isCommitted(loaded.previousAnswers.healing));
  assert.equal(loaded.previousAnswers.longevity.claim, "My original lifespan claim");
  assert.match(previousReport(loaded.previousAnswers), /do not count as a commitment to the new combined category/);
  const restored = loadSavedRecord(JSON.parse(JSON.stringify({ version: 2, ...loaded, answers: { ...loaded.answers, longevity: { ...old, claim: "My new combined claim" } } })));
  assert.equal(restored.answers.longevity.claim, "My new combined claim");
  assert.equal(restored.previousAnswers.longevity.claim, "My original lifespan claim");
  const report = reportText(restored.answers, restored.previousAnswers);
  assert.match(report, /2 of 6 committed/);
  assert.match(report, /My original healing claim/);
  assert.match(report, /My new combined claim/);
  assert.deepEqual(loadSavedRecord(null), { answers: {}, previousAnswers: {} });
});
