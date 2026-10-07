import assert from "node:assert/strict";
import test from "node:test";
import { PROMISES } from "./promise-catalog.mjs";
import { assess, emptyAnswer, reportText, sanitizeAnswers, canCommit, isCommitted, commitmentSnapshot, hasRevision } from "./promise-model.mjs";

const fullCommitment = { ...emptyAnswer(), interpretation: "tendency", claim: "Qualifying requests will succeed more often than matched requests without prayer within a year.", failure: "yes", commitments: ["scope", "outcome", "records", "comparison"] };

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
    healing: { interpretation: "invented", complete: true, failure: "yes" },
    health: { interpretation: "not-promise", complete: true, failure: "invented" },
    unknown: fullCommitment,
  };
  const clean = sanitizeAnswers(source);
  assert.equal(clean.prayer.complete, false);
  assert.equal(clean.healing.complete, false);
  assert.equal(clean.health.complete, false, "An old exploratory answer is not an affirmed commitment");
  assert.equal(clean.prayer.note.length, 1200);
  assert.deepEqual(clean.prayer.commitments, ["scope"]);
  assert.equal(clean.unknown, undefined);
  assert.deepEqual(sanitizeAnswers(null), {});
  assert.deepEqual(sanitizeAnswers([]), {});
});

test("the report distinguishes commitments from drafts and retains every unanswered passage", () => {
  const answers = { prayer: { ...fullCommitment, affirmed: true, complete: true, note: "Define faith independently.", firstCommitment: commitmentSnapshot({ ...fullCommitment, interpretation: "guarantee" }) }, healing: { ...fullCommitment, complete: false } };
  const report = reportText(answers);
  assert.match(report, /1 of 9 committed; 8 unresolved/);
  assert.match(report, /Define faith independently/);
  assert.match(report, /First affirmed commitment/);
  assert.match(report, /No real-world results/);
  assert.match(report, /Healing —[\s\S]*?Status: Draft — not affirmed/);
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
  const clean = sanitizeAnswers(JSON.parse(JSON.stringify({ prayer: old, healing: revised, prophecy: { ...revised, interpretation: "unsure" } })));
  assert.equal(clean.prayer.interpretation, "guarantee");
  assert.equal(clean.prayer.firstInterpretation, "spiritual");
  assert.equal(clean.prayer.note, old.note);
  assert.equal(isCommitted(clean.prayer), false);
  assert.equal(isCommitted(clean.healing), true);
  assert.equal(hasRevision(clean.healing), true, "Revising terms within the same category remains visible");
  assert.equal(clean.healing.firstCommitment.claim, fullCommitment.claim);
  assert.equal(isCommitted(clean.prophecy), false);
});

test("every promise supplies a contextualized passage and a tailored proposed test", () => {
  assert.equal(new Set(PROMISES.map((item) => item.id)).size, 9);
  assert.equal(PROMISES.length, 9);
  for (const promise of PROMISES) {
    for (const key of ["ref", "verse", "context", "contextRef", "test", "caveat", "suggested"]) assert(promise[key]?.length, `${promise.id}: missing ${key}`);
  }
});
