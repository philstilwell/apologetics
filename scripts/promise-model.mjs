import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, interpretationOptions } from "./promise-catalog.mjs?v=20261007-clear-responses";

export const STORAGE_KEY = "crosshairs.promise-intro.v1";
export const emptyAnswer = () => ({ interpretation: "", failure: "", commitments: [], note: "", complete: false, firstInterpretation: "" });
export const isEarthly = (answer) => ["guarantee", "tendency"].includes(answer.interpretation);
export const requiredCommitments = (answer) => COMMITMENTS.filter((item) => item.id !== "comparison" || answer.interpretation === "tendency");

export function sanitizeAnswers(raw) {
  const result = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  for (const promise of PROMISES) {
    const source = raw[promise.id];
    if (!source || typeof source !== "object") continue;
    const options = interpretationOptions(promise).map((item) => item.id);
    const answer = emptyAnswer();
    answer.interpretation = options.includes(source.interpretation) ? source.interpretation : "";
    answer.firstInterpretation = options.includes(source.firstInterpretation) ? source.firstInterpretation : "";
    answer.failure = FAILURE_OPTIONS.some((item) => item.id === source.failure) ? source.failure : "";
    answer.commitments = Array.isArray(source.commitments) ? [...new Set(source.commitments.filter((id) => COMMITMENTS.some((item) => item.id === id)))] : [];
    answer.note = typeof source.note === "string" ? source.note.slice(0, 1200) : "";
    answer.complete = source.complete === true && Boolean(answer.interpretation) && (!isEarthly(answer) || Boolean(answer.failure));
    result[promise.id] = answer;
  }
  return result;
}

export function assess(answer = emptyAnswer()) {
  if (!answer.interpretation) return { code: "unstarted", label: "Not explored", title: "Your interpretation comes first", body: "Choose what you think this passage promises before considering how to test it." };
  const readings = {
    spiritual: { code: "spiritual", label: "Spiritual promise only", title: "You affirm a spiritual promise only", body: "Your reading commits God to a spiritual benefit. It predicts neither the earthly outcome under discussion nor better odds of that outcome. An outcome test of that earthly claim therefore cannot assess your reading. This does not settle whether the spiritual claim is true." },
    historical: { code: "historical", label: "Past promise only", title: "You affirm a promise for the past only", body: "Your reading gives this passage no promised result for people today. Any claim that it was fulfilled for its original audience still calls for evidence appropriate to that time and place." },
    "not-promise": { code: "not-promise", label: "No divine promise", title: "You read this passage as making no divine promise", body: "On your reading, this passage does not commit God to provide an earthly or spiritual result. It may still express a wish, instruction, description, or general wisdom. It cannot serve as a divine guarantee on this interpretation." },
    unsure: { code: "undecided", label: "Reading unresolved", title: "The interpretation is still open", body: "You have not adopted one of the proposed readings. Your own explanation is retained without being forced into a verdict. Clarifying what the passage predicts is the next step." },
  };
  if (readings[answer.interpretation]) return readings[answer.interpretation];
  if (answer.failure === "no") return { code: "protected", label: "Beyond an outcome test", title: "The earthly claim is protected from failure", body: "You expect an earthly benefit, but no earthly outcome would count against this interpretation. It therefore offers no outcome-based way to distinguish fulfillment from nonfulfillment. That protects the assertion, while removing this route to checking it." };
  if (answer.failure === "conditions") return { code: "conditional", label: "Conditions unresolved", title: "The promise’s conditions still need to be specified", body: "You have not yet defined who qualifies or what would count as failure. State those conditions before checking outcomes, and assess them independently of success. Until then, we cannot tell which outcomes could fairly challenge this reading." };
  if (answer.failure !== "yes") return { code: "undecided", label: "Failure standard open", title: "What counts against it is still undecided", body: "Your interpretation predicts an earthly result, but you have not settled whether a fair failure would count against it. The prediction and its failure standard need to be considered together." };
  const missing = requiredCommitments(answer).filter((item) => !answer.commitments.includes(item.id));
  if (missing.length) return { code: "developing", label: "Test needs definition", title: "You allow a test; its terms need work", body: "You accept that fair failure could count against your reading. Some safeguards are still uncommitted. Clarify these before treating any proposed test as a fair assessment." };
  return { code: "open", label: "Open to testing", title: "You have kept an earthly promise testable in principle", body: "You accept both a predicted result and the possibility of evidence against it, with the basic safeguards agreed. This preserves an empirical claim. It is a commitment to testing—not evidence that the promise has been fulfilled, or a completed study design." };
}

export function reportText(answers) {
  const entries = PROMISES.filter((promise) => answers[promise.id]?.complete);
  return [
    "CROSSHAIRS — YOUR PROMISE READINGS",
    `${entries.length} of ${PROMISES.length} passages explored`,
    "These are interpretations and testing commitments, not study findings or probabilities of religious truth.",
    ...entries.map((promise) => {
      const answer = answers[promise.id];
      const options = interpretationOptions(promise);
      const current = options.find((item) => item.id === answer.interpretation);
      const first = options.find((item) => item.id === answer.firstInterpretation);
      return [
        `${promise.name} — ${promise.ref} (KJV)`,
        `Reading: ${current.label} ${current.detail}`,
        `Result: ${assess(answer).title}`,
        assess(answer).body,
        isEarthly(answer) ? `Failure standard: ${FAILURE_OPTIONS.find((item) => item.id === answer.failure)?.label ?? "Unresolved"}` : "",
        isEarthly(answer) ? `Agreed safeguards: ${requiredCommitments(answer).filter((item) => answer.commitments.includes(item.id)).map((item) => item.label).join("; ") || "None selected"}` : "",
        answer.note ? `Your note: ${answer.note}` : "",
        first && first.id !== current.id ? `First saved reading: ${first.label} ${first.detail} A change of reading alone is not evidence of evading a test.` : "",
      ].filter(Boolean).join("\n");
    }),
    "No real-world results were supplied in this exercise. Positive results also require scrutiny of ordinary explanations before attributing them to divine action.",
    "https://xhairs.com/",
  ].join("\n\n");
}
