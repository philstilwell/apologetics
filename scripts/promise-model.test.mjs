import assert from "node:assert/strict";
import test from "node:test";
import { PROMISES } from "./promise-catalog.mjs";
import { assess, emptyAnswer, reportText, sanitizeAnswers } from "./promise-model.mjs";

const fullCommitment = { ...emptyAnswer(), interpretation: "tendency", failure: "yes", commitments: ["scope", "outcome", "records", "comparison"] };

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
  assert.equal(clean.health.complete, true);
  assert.equal(clean.prayer.note.length, 1200);
  assert.deepEqual(clean.prayer.commitments, ["scope"]);
  assert.equal(clean.unknown, undefined);
  assert.deepEqual(sanitizeAnswers(null), {});
  assert.deepEqual(sanitizeAnswers([]), {});
});

test("the report preserves notes, conditions, revisions and the absence of study results", () => {
  const answers = { prayer: { ...fullCommitment, failure: "conditions", complete: true, note: "Define faith independently.", firstInterpretation: "guarantee" }, healing: { ...fullCommitment, complete: false } };
  const report = reportText(answers);
  assert.match(report, /1 of 9/);
  assert.match(report, /Define faith independently/);
  assert.match(report, /First saved reading/);
  assert.match(report, /No real-world results/);
  assert.doesNotMatch(report, /Healing —/);
});

test("every promise supplies a contextualized passage and a tailored proposed test", () => {
  assert.equal(new Set(PROMISES.map((item) => item.id)).size, 9);
  assert.equal(PROMISES.length, 9);
  for (const promise of PROMISES) {
    for (const key of ["ref", "verse", "context", "contextRef", "test", "caveat", "suggested"]) assert(promise[key]?.length, `${promise.id}: missing ${key}`);
  }
});
