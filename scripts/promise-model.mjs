import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, interpretationOptions } from "./promise-catalog.mjs?v=20261007-commitment";

export const STORAGE_KEY = "crosshairs.promise-intro.v1";
export const emptyAnswer = () => ({ interpretation: "", failure: "", commitments: [], claim: "", note: "", affirmed: false, reviewed: false, complete: false, firstInterpretation: "", firstCommitment: null });
export const isEarthly = (answer) => ["guarantee", "tendency"].includes(answer.interpretation);
export const needsFailureStandard = (answer) => isEarthly(answer) || answer.interpretation === "other";
export const requiredCommitments = (answer) => COMMITMENTS.filter((item) => item.id !== "comparison" || answer.interpretation === "tendency");
const definiteReadings = ["guarantee", "tendency", "spiritual", "historical", "not-promise", "other"];
export const canCommit = (answer) => definiteReadings.includes(answer.interpretation)
  && typeof answer.claim === "string" && Boolean(answer.claim.trim())
  && (!needsFailureStandard(answer) || ["yes", "no"].includes(answer.failure));
export const isCommitted = (answer) => Boolean(answer?.complete && answer.affirmed && canCommit(answer));
export const commitmentSnapshot = (answer) => ({ interpretation: answer.interpretation, claim: answer.claim.trim(), failure: needsFailureStandard(answer) ? answer.failure : "", commitments: isEarthly(answer) ? [...answer.commitments].sort() : [] });
export const hasRevision = (answer) => Boolean(answer.firstCommitment && JSON.stringify(answer.firstCommitment) !== JSON.stringify(commitmentSnapshot(answer)));
export const recordStatus = (answer) => isCommitted(answer) ? "Committed" : answer?.reviewed ? "Unresolved" : answer?.interpretation ? "Draft — not affirmed" : "No commitment";

function cleanChoice(source, options) {
  const answer = emptyAnswer();
  answer.interpretation = options.includes(source.interpretation) ? source.interpretation : "";
  answer.failure = FAILURE_OPTIONS.some((item) => item.id === source.failure) ? source.failure : "";
  answer.commitments = Array.isArray(source.commitments) ? [...new Set(source.commitments.filter((id) => COMMITMENTS.some((item) => item.id === id)))] : [];
  answer.claim = typeof source.claim === "string" ? source.claim.slice(0, 1200) : "";
  answer.note = typeof source.note === "string" ? source.note.slice(0, 1200) : "";
  return answer;
}

export function sanitizeAnswers(raw) {
  const result = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  for (const promise of PROMISES) {
    const source = raw[promise.id];
    if (!source || typeof source !== "object") continue;
    const options = interpretationOptions(promise).map((item) => item.id);
    const answer = cleanChoice(source, options);
    answer.firstInterpretation = options.includes(source.firstInterpretation) ? source.firstInterpretation : "";
    // Earlier versions saved exploratory selections as complete. Keep those choices as drafts;
    // only the visitor's new, explicit affirmation can turn one into a commitment.
    answer.affirmed = source.affirmed === true && canCommit(answer);
    answer.complete = source.complete === true && answer.affirmed;
    answer.reviewed = source.reviewed === true && Boolean(answer.interpretation);
    if (source.firstCommitment && typeof source.firstCommitment === "object") {
      const first = cleanChoice(source.firstCommitment, options);
      if (canCommit(first)) answer.firstCommitment = commitmentSnapshot(first);
    }
    result[promise.id] = answer;
  }
  return result;
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
  const missing = requiredCommitments(answer).filter((item) => !answer.commitments.includes(item.id));
  if (missing.length) return { code: "developing", label: "Test needs definition", title: "You allow a test; its terms need work", body: "You accept that fair failure could count against your reading. Some safeguards are still uncommitted. Clarify these before treating any proposed test as a fair assessment." };
  return { code: "open", label: "Open to testing", title: "You have kept an earthly promise testable in principle", body: "You accept both a predicted result and the possibility of evidence against it, with the basic safeguards agreed. This preserves an empirical claim. It is a commitment to testing—not evidence that the promise has been fulfilled, or a completed study design." };
}

export function reportText(answers) {
  const committed = PROMISES.filter((promise) => isCommitted(answers[promise.id])).length;
  return [
    "CROSSHAIRS — YOUR PROMISE COMMITMENTS",
    `${committed} of ${PROMISES.length} committed; ${PROMISES.length - committed} unresolved`,
    "A commitment is an explicitly affirmed belief, not evidence that the belief is true. Drafts and unresolved answers are not commitments.",
    ...PROMISES.map((promise) => {
      const answer = answers[promise.id] || emptyAnswer();
      const options = interpretationOptions(promise);
      const current = options.find((item) => item.id === answer.interpretation);
      const first = answer.firstCommitment;
      const firstReading = first && options.find((item) => item.id === first.interpretation);
      const legacy = options.find((item) => item.id === answer.firstInterpretation);
      return [
        `${promise.name} — ${promise.ref} (KJV)`,
        `Status: ${recordStatus(answer)}`,
        current ? `${isCommitted(answer) ? "I affirm" : "Unconfirmed selection"}: ${current.label} ${current.detail}` : "No belief has been stated for this passage.",
        answer.claim ? `My specific claim: ${answer.claim}` : "",
        answer.interpretation ? `Implication of this selection: ${assess(answer).body}` : "",
        needsFailureStandard(answer) ? `Failure standard: ${FAILURE_OPTIONS.find((item) => item.id === answer.failure)?.label ?? "Unresolved"}` : "",
        isEarthly(answer) ? `Agreed safeguards: ${requiredCommitments(answer).filter((item) => answer.commitments.includes(item.id)).map((item) => item.label).join("; ") || "None selected"}` : "",
        answer.note ? `Your note: ${answer.note}` : "",
        hasRevision(answer) ? `First affirmed commitment: ${firstReading.label} ${first.claim}\nFirst failure standard: ${FAILURE_OPTIONS.find((item) => item.id === first.failure)?.label ?? "No present earthly prediction"}\nFirst safeguards: ${first.commitments.map((id) => COMMITMENTS.find((item) => item.id === id).label).join("; ") || "None selected"}\nA revision is visible; it is not by itself evidence of evasion.` : "",
        !first && legacy && legacy.id !== current?.id ? `Earlier saved selection (not an affirmed commitment): ${legacy.label}` : "",
      ].filter(Boolean).join("\n");
    }),
    "No real-world results were supplied in this exercise. Positive results also require scrutiny of ordinary explanations before attributing them to divine action.",
    "https://xhairs.com/",
  ].join("\n\n");
}
