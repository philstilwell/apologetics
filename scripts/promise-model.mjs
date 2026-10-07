import { PREVIOUS_PROMISES } from "./promise-history.mjs?v=20261007-clear-life";
import { cleanTest, emptyTest, testGaps, testTensions, testReport, testSnapshot } from "./promise-testing.mjs?v=20261007-clear-life";
import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, interpretationOptions } from "./promise-catalog.mjs?v=20261007-clear-life";

export const STORAGE_KEY = "crosshairs.promise-intro.v1";
export const emptyAnswer = () => ({ interpretation: "", failure: "", commitments: [], claim: "", note: "", affirmed: false, reviewed: false, complete: false, firstInterpretation: "", firstCommitment: null, test: emptyTest(), firstTest: null });
export const isEarthly = (answer) => ["guarantee", "tendency"].includes(answer.interpretation);
export const needsFailureStandard = (answer) => isEarthly(answer) || answer.interpretation === "other";
export const requiredCommitments = (answer) => COMMITMENTS.filter((item) => item.id !== "comparison" || answer.interpretation === "tendency");
const definiteReadings = ["guarantee", "tendency", "spiritual", "historical", "not-promise", "other"];
export const canCommit = (answer) => definiteReadings.includes(answer.interpretation)
  && typeof answer.claim === "string" && Boolean(answer.claim.trim())
  && (!needsFailureStandard(answer) || ["yes", "no"].includes(answer.failure));
export const isCommitted = (answer) => Boolean(answer?.complete && answer.affirmed && canCommit(answer));
export const commitmentSnapshot = (answer) => ({ interpretation: answer.interpretation, claim: answer.claim.trim(), failure: needsFailureStandard(answer) ? answer.failure : "", commitments: isEarthly(answer) && answer.test?.method !== "decline" ? [...answer.commitments].sort() : [] });
export const hasRevision = (answer) => Boolean(answer.firstCommitment && JSON.stringify(answer.firstCommitment) !== JSON.stringify(commitmentSnapshot(answer)));
export const hasTestRevision = (answer) => Boolean(answer.firstTest && JSON.stringify(testSnapshot(answer.firstTest)) !== JSON.stringify(testSnapshot(answer.test)));
export const recordStatus = (answer) => isCommitted(answer) ? "Committed" : answer?.reviewed ? "Unresolved" : answer?.interpretation ? "Draft — not affirmed" : "No commitment";

function cleanChoice(source, options) {
  const answer = emptyAnswer();
  answer.interpretation = options.includes(source.interpretation) ? source.interpretation : "";
  answer.failure = FAILURE_OPTIONS.some((item) => item.id === source.failure) ? source.failure : "";
  answer.commitments = Array.isArray(source.commitments) ? [...new Set(source.commitments.filter((id) => COMMITMENTS.some((item) => item.id === id)))] : [];
  answer.claim = typeof source.claim === "string" ? source.claim.slice(0, 1200) : "";
  answer.note = typeof source.note === "string" ? source.note.slice(0, 1200) : "";
  answer.test = cleanTest(source.test);
  return answer;
}

export function sanitizeAnswers(raw, catalog = PROMISES) {
  const result = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  for (const promise of catalog) {
    const source = raw[promise.id];
    if (!source || typeof source !== "object") continue;
    const options = interpretationOptions(promise).map((item) => item.id);
    const answer = cleanChoice(source, options);
    answer.firstInterpretation = options.includes(source.firstInterpretation) ? source.firstInterpretation : "";
    // Earlier versions saved exploratory selections as complete. Keep those choices as drafts;
    // only the visitor's new, explicit affirmation can turn one into a commitment.
    answer.needsSourceReview = source.needsSourceReview === true;
    answer.affirmed = source.affirmed === true && !answer.needsSourceReview && canCommit(answer);
    answer.complete = source.complete === true && answer.affirmed;
    answer.reviewed = source.reviewed === true && Boolean(answer.interpretation);
    if (source.firstCommitment && typeof source.firstCommitment === "object") {
      const first = cleanChoice(source.firstCommitment, options);
      if (canCommit(first)) answer.firstCommitment = commitmentSnapshot(first);
    }
    if (source.firstTest && typeof source.firstTest === "object") answer.firstTest = testSnapshot(source.firstTest);
    result[promise.id] = answer;
  }
  return result;
}

export function loadSavedRecord(saved) {
  if (!saved || ![1, 2, 3].includes(saved.version)) return { answers: {}, previousAnswers: {} };
  const answers = sanitizeAnswers(saved.answers);
  if (saved.version < 3) {
    // Replacing the source passages must not silently affirm a belief about new texts.
    // Retain the visitor's words, first commitments, and test terms for review.
    for (const id of ["prophecy", "longevity"]) {
      const answer = answers[id];
      if (!answer?.interpretation) continue;
      if (isCommitted(answer)) {
        answer.firstCommitment ||= commitmentSnapshot(answer);
        if (needsFailureStandard(answer)) answer.firstTest ||= testSnapshot(answer.test);
      }
      answer.needsSourceReview = true;
      answer.affirmed = answer.complete = answer.reviewed = false;
    }
  }
  if (saved.version === 1) {
    // The combined category has different passages and scope. Never silently affirm it
    // using a belief about one of the four previous, separate categories.
    delete answers.longevity;
    return { answers, previousAnswers: sanitizeAnswers(saved.answers, PREVIOUS_PROMISES) };
  }
  return { answers, previousAnswers: sanitizeAnswers(saved.previousAnswers, PREVIOUS_PROMISES) };
}

export function assess(answer = emptyAnswer()) {
  if (!answer.interpretation) return { code: "unstarted", label: "No commitment", title: "State what you believe this passage promises", body: "Choose your actual belief, specify the claim, and affirm it as your own." };
  const readings = {
    spiritual: { code: "spiritual", label: "Spiritual promise only", title: "You affirm a spiritual promise only", body: "Your reading commits God to a spiritual benefit. It predicts neither the earthly outcome under discussion nor better odds of that outcome. An outcome test of that earthly claim therefore cannot assess your reading. This does not settle whether the spiritual claim is true." },
    historical: { code: "historical", label: "Past promise only", title: "You affirm a promise for the past only", body: "Your reading gives this passage no promised result for people today. Any claim that it was fulfilled for its original audience still calls for evidence appropriate to that time and place." },
    "not-promise": { code: "not-promise", label: "No divine promise", title: "You read this passage as making no divine promise", body: "On your reading, this passage does not commit God to provide an earthly or spiritual result. It may still express a wish, instruction, description, or general wisdom. It cannot serve as a divine guarantee on this interpretation." },
    unsure: { code: "undecided", label: "Belief unresolved", title: "You have not committed to a belief about this passage", body: "This remains an unanswered commitment. Return to the verse and state what, if anything, you believe it commits God to doing. Your uncertainty is recorded, but it does not count as a completed commitment." },
  };
  if (readings[answer.interpretation]) return readings[answer.interpretation];
  if (answer.interpretation === "other") return { code: "custom", label: "Custom claim; test not assessed", title: "Your own claim needs its own assessment", body: "Your stated belief and standard for failure are recorded below. This exercise has not classified your custom claim as an earthly or spiritual promise, or established whether it can be tested. Evaluate the claim you actually wrote, using the result, audience, and conditions you specified." };
  if (answer.failure === "no") return { code: "protected", label: "Beyond an outcome test", title: "The earthly claim is protected from failure", body: "You expect an earthly benefit, but no earthly outcome would count against this interpretation. It therefore offers no outcome-based way to distinguish fulfillment from nonfulfillment. That protects the assertion, while removing this route to checking it." };
  if (answer.failure === "conditions") return { code: "conditional", label: "Conditions unresolved", title: "The promise’s conditions still need to be specified", body: "You have not yet defined who qualifies or what would count as failure. State those conditions before checking outcomes, and assess them independently of success. Until then, we cannot tell which outcomes could fairly challenge this reading." };
  if (answer.failure !== "yes") return { code: "undecided", label: "Failure standard open", title: "What counts against it is still undecided", body: "Your interpretation predicts an earthly result, but you have not settled whether a fair failure would count against it. The prediction and its failure standard need to be considered together." };
  const tensions = testTensions(answer);
  if (tensions.length) return { code: "tension", label: "Testing commitment has a conflict", title: "Your failure rule and your exceptions pull apart", body: tensions.join(" ") };
  const missing = requiredCommitments(answer).filter((item) => !answer.commitments.includes(item.id));
  const gaps = testGaps(answer);
  if (missing.length || gaps.length) return { code: "developing", label: "Test still incomplete", title: "You allow a test. Now finish its terms.", body: "Your belief predicts an observable result and you accept that fair failure could count against it. The missing terms below prevent this record from specifying that fair test. Your belief can be affirmed while the test remains incomplete." };
  if (answer.test?.method === "story") return { code: "developing", label: "Evidence remains too limited", title: "A story does not establish the promised pattern", body: "You have named outcome rules, but selected personal testimony alone. A story can motivate investigation. Check the underlying records and ordinary explanations; a claim of better odds also needs a fair comparison. Favorable stories alone do not establish a general guarantee." };
  if (answer.interpretation === "tendency" && answer.test?.method === "records") return { code: "developing", label: "Comparison still needed", title: "Better odds require something to compare them with", body: "A record of qualifying cases does not by itself establish an advantage over comparable cases. Specify the comparison and account for ordinary differences before using a success rate as support." };
  return { code: "open", label: "Test terms on record", title: "You have kept an observable promise open to challenge", body: "You have stated the claim, evidence plan, outcome rules, and limits on explanations for a miss. These are your declared terms—not evidence of fulfillment or a validated study. Independent review must still check whether the design can detect the predicted result and fairly distinguish the alternatives." };
}

export function reportText(answers, previousAnswers = {}) {
  const committed = PROMISES.filter((promise) => isCommitted(answers[promise.id])).length;
  return [
    "CROSSHAIRS — YOUR PROMISE COMMITMENTS",
    `${committed} of ${PROMISES.length} committed; ${PROMISES.length - committed} unresolved`,
    "A commitment is an explicitly affirmed belief, not evidence that the belief is true. Drafts and unresolved answers are not commitments.",
    ...PROMISES.map((promise) => answerReport(promise, answers[promise.id])),
    previousReport(previousAnswers),
    "No real-world results were supplied in this exercise. Positive results also require scrutiny of ordinary explanations before attributing them to divine action.",
    "https://xhairs.com/",
  ].join("\n\n");
}

function answerReport(promise, answer = emptyAnswer()) {
  const options = interpretationOptions(promise);
  const current = options.find((item) => item.id === answer.interpretation);
  const first = answer.firstCommitment;
  const firstReading = first && options.find((item) => item.id === first.interpretation);
  const legacy = options.find((item) => item.id === answer.firstInterpretation);
  return [
    `${promise.name} — ${promise.retired ? "previous question" : (promise.passages || [promise]).map(p => p.ref).join("; ") + " (KJV)"}`,
    `Status: ${recordStatus(answer)}`,
    answer.needsSourceReview ? "The source passages have changed. This earlier answer needs review and fresh affirmation." : "",
    current ? `${isCommitted(answer) ? "I affirm" : "Unconfirmed selection"}: ${current.label} ${current.detail}` : "No belief has been stated for this passage.",
    answer.claim ? `My specific claim: ${answer.claim}` : "",
    answer.interpretation ? `Implication of this selection: ${assess(answer).body}` : "",
    needsFailureStandard(answer) ? `Failure standard: ${FAILURE_OPTIONS.find((item) => item.id === answer.failure)?.label ?? "Unresolved"}` : "",
    isEarthly(answer) && answer.test?.method !== "decline" ? `Agreed safeguards: ${requiredCommitments(answer).filter((item) => answer.commitments.includes(item.id)).map((item) => item.label).join("; ") || "None selected"}` : "",
    needsFailureStandard(answer) ? testReport(answer) : "",
    hasTestRevision(answer) ? `First affirmed test terms:\n${testReport({ test: answer.firstTest })}\nChanges to test terms are visible; a revision is not by itself evidence of evasion.` : "",
    answer.note ? `Your note: ${answer.note}` : "",
    hasRevision(answer) ? `First affirmed commitment: ${firstReading.label} ${first.claim}\nFirst failure standard: ${FAILURE_OPTIONS.find((item) => item.id === first.failure)?.label ?? "No present earthly prediction"}\nFirst safeguards: ${first.commitments.map((id) => COMMITMENTS.find((item) => item.id === id).label).join("; ") || "None selected"}\nA revision is visible; it is not by itself evidence of evasion.` : "",
    !first && legacy && legacy.id !== current?.id ? `Earlier saved selection (not an affirmed commitment): ${legacy.label}` : "",
  ].filter(Boolean).join("\n");
}

export function previousReport(previousAnswers = {}) {
  const recorded = PREVIOUS_PROMISES.filter((p) => {
    const a = previousAnswers[p.id];
    return a && (a.interpretation || a.claim || a.note);
  });
  if (!recorded.length) return "";
  return [
    "EARLIER SEPARATE CATEGORIES — PRESERVED RECORD",
    "These answers refer to the earlier healing, protection, health, and long-life questions. They are preserved as originally recorded; they do not count as a commitment to the new combined category. Read its New Testament passages and affirm a new claim.",
    ...recorded.map((p) => answerReport(p, previousAnswers[p.id])),
  ].join("\n\n");
}
