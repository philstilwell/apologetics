// The former Promise Test Field's questions, without numeric "rigor" scores.
export const EVIDENCE_OPTIONS = [
  { id: "story", label: "Personal testimony", detail: "I will use reported experiences. A story can suggest a question; by itself it cannot establish a general guarantee or a comparative advantage." },
  { id: "records", label: "A complete record of qualifying cases", detail: "I will record requests, conditions, deadlines, successes, and misses before selecting examples." },
  { id: "comparison", label: "A fair comparison", detail: "I will compare otherwise similar cases, including ordinary explanations such as care, resources, and exposure." },
  { id: "independent", label: "A comparison with independent review", detail: "Reviewers will assess outcomes without knowing which group a case belongs to where feasible. Independent repeats will check whether the result holds." },
  { id: "custom", label: "A different evidence plan", detail: "I will specify the evidence and explain how it could distinguish fulfillment from nonfulfillment." },
  { id: "decline", label: "I will not submit this claim to an outcome test", detail: "I affirm the belief but do not commit to checking whether its predicted outcome occurs." },
];

export const EXCEPTIONS = [
  { id: "no-testing", label: "God must not be tested", probe: "Does this forbid contrived challenges, or also checking a claim against records already available? If no check is allowed, why count favorable outcomes as evidence?" },
  { id: "skeptics-block", label: "Skeptics prevent the result", probe: "How will the presence or influence of skeptics be identified before the result? Could any observer check the claim without being blamed for a miss?" },
  { id: "weak-faith", label: "Faith was too weak", probe: "What independently observable criterion establishes sufficient faith before the outcome? Failure itself cannot be your only evidence of weak faith." },
  { id: "no-is-answer", label: "A refusal still fulfills the promise", probe: "Does the verse promise a response or the requested result? If both receiving and not receiving count as fulfillment, what outcome could fail?" },
  { id: "mysterious-timing", label: "The promised result may come later", probe: "What deadline follows from your reading? If the deadline can always be extended, a present miss can never count against it." },
  { id: "after-sincerity", label: "The person was not a true or sincere believer", probe: "How is eligibility established before observing success or failure? Would the same standard exclude a successful case?" },
  { id: "interference", label: "Spiritual interference prevented it", probe: "What evidence of interference exists independently of the failed result? What would rule this explanation out?" },
  { id: "ordinary-still-divine", label: "An ordinary outcome still fulfills it", probe: "Is an ordinary outcome the result you originally claimed, or a replacement? If no difference is predicted, can the outcome distinguish divine action from ordinary causes?" },
];

export const TEST_GUIDANCE = {
  prayer: { evidence: "Dated requests and deadlines, records of all qualifying requests, and comparable cases without the targeted prayer.", alternatives: "Chance, vague requests, selective recall, practical help, and changes in the request after the result.", question: "If the request is not granted, is that a failed prediction—or have you changed what ‘receive’ means?" },
  provision: { evidence: "Dated records of basic needs and deadlines, including unmet needs, with income and available assistance recorded.", alternatives: "Family support, church assistance, public benefits, income, and unequal access to resources.", question: "If qualifying people remain without food or clothing, what exactly would your interpretation require you to reconsider?" },
  wisdom: { evidence: "Decisions or conduct assessed against a definition of wisdom agreed in advance, with independent review where possible.", alternatives: "Experience, education, outside advice, hindsight, and evaluating only decisions that worked out.", question: "What observable change does your definition of wisdom predict? Do not substitute forecasting skill unless that is your actual claim." },
  prophecy: { evidence: "Publicly dated predictions, precise outcomes and deadlines, all misses, and a comparison with ordinary forecasting where relevant.", alternatives: "Ambiguous wording, common events, many guesses, leaked information, and reinterpretation after the event.", question: "Would you credit an equally specific successful prediction from another religion using exactly this standard?" },
  character: { evidence: "Conduct defined in advance, observations before and after change, reports from affected people, and otherwise comparable groups.", alternatives: "Social support, incentives, age, selection effects, concealed misconduct, and relabeling failures as non-Christians.", question: "Who counts as ‘in Christ’ before their conduct is known? Do not treat a convenient demographic proxy as morality itself." },
  longevity: { evidence: "Existing recovery, illness, injury, and verified lifespan records. Decide in advance which physical benefits your reading predicts, which people qualify, and what comparison is needed.", alternatives: "Age, genetics, treatment, health care, income, lifestyle, exposure to harm, community support, and selecting only healthy survivors.", question: "If qualifying people stay ill, suffer harm, or die young, which part of your stated claim fails? Do not switch from a physical benefit to spiritual care after seeing the result. The sparrows and lilies require an argument for any health or lifespan prediction." },
};

export const emptyTest = () => ({ method: "", plan: "", support: "", challenge: "", inconclusive: "", review: "", exceptions: {} });
export function cleanTest(raw = {}) {
  const result = emptyTest();
  if (!raw || typeof raw !== "object") return result;
  result.method = EVIDENCE_OPTIONS.some((x) => x.id === raw.method) ? raw.method : "";
  result.review = ["none", "some", "unsure"].includes(raw.review) ? raw.review : "";
  for (const key of ["plan", "support", "challenge", "inconclusive"]) result[key] = typeof raw[key] === "string" ? raw[key].slice(0, 1800) : "";
  for (const item of EXCEPTIONS) {
    const source = raw.exceptions?.[item.id];
    if (!source || typeof source !== "object") continue;
    result.exceptions[item.id] = { policy: ["check", "protect", "unsure"].includes(source.policy) ? source.policy : "", check: typeof source.check === "string" ? source.check.slice(0, 1200) : "" };
  }
  return result;
}

// Hidden draft fields are preserved for editing, but are not affirmed as active terms.
export function testSnapshot(raw) {
  const t = cleanTest(raw);
  if (t.method === "decline") return { ...emptyTest(), method: "decline" };
  if (t.review !== "some") t.exceptions = {};
  else for (const entry of Object.values(t.exceptions)) if (entry.policy !== "check") entry.check = "";
  return t;
}

export function testGaps(answer) {
  const t = cleanTest(answer.test);
  const gaps = [];
  if (!t.method) gaps.push("Choose what evidence you will accept.");
  if (t.method === "decline") return ["You have declined an outcome test."];
  if (!t.plan.trim()) gaps.push("Specify the cases, evidence, timing, and ordinary explanations to check.");
  if (!t.support.trim()) gaps.push("Name the result that would support your claim.");
  if (!t.challenge.trim()) gaps.push("Name the result that would count against your claim and how your belief would change.");
  if (!t.inconclusive.trim()) gaps.push("Distinguish an inconclusive result from support or failure.");
  if (!t.review || t.review === "unsure") gaps.push("Decide whether you will accept any of the listed explanations for a miss.");
  if (t.review === "some") {
    const entries = Object.entries(t.exceptions);
    if (!entries.length) gaps.push("Select the explanation you would accept.");
    for (const [id, entry] of entries) {
      const label = EXCEPTIONS.find((x) => x.id === id).label;
      if (!entry.policy || entry.policy === "unsure") gaps.push(`Decide when you would accept “${label}.”`);
      if (entry.policy === "check" && !entry.check.trim()) gaps.push(`Specify an independent check for “${label}.”`);
    }
  }
  return gaps;
}

export function testTensions(answer) {
  const t = cleanTest(answer.test);
  const tensions = [];
  if (answer.failure === "yes" && t.method === "decline") tensions.push("You say a fair failure would count against the claim, but decline to check outcomes. Your willingness to revise has no agreed route to evidence.");
  if (t.method !== "decline" && t.review === "some") for (const [id, entry] of Object.entries(t.exceptions)) {
    if (entry.policy === "protect") tensions.push(`You accept “${EXCEPTIONS.find((x) => x.id === id).label}” without an independent check. Where this explanation is allowed, a miss need not count against the claim. Specify what could still fail despite it.`);
  }
  return tensions;
}

export function testReport(answer) {
  const t = testSnapshot(answer.test);
  if (t.method === "decline") return ["Evidence position: I will not submit this claim to an outcome test.", "Any earlier draft test terms are inactive while this refusal stands.", ...testTensions(answer).map((x) => `Tension: ${x}`)].join("\n");
  return [
    `Evidence I will accept: ${EVIDENCE_OPTIONS.find((x) => x.id === t.method)?.label || "Not specified"}`,
    `My evidence plan: ${t.plan || "Not specified"}`,
    `Would support my claim: ${t.support || "Not specified"}`,
    `Would count against it / change my belief: ${t.challenge || "Not specified"}`,
    `Would be inconclusive: ${t.inconclusive || "Not specified"}`,
    exceptionReport(t),
    ...testTensions(answer).map((x) => `Tension: ${x}`),
    ...testGaps(answer).map((x) => `Still to specify: ${x}`),
  ].join("\n");
}

export function exceptionReport(test) {
  const t = cleanTest(test);
  return [
    `Explanations for a miss: ${t.review === "none" ? "None of the listed explanations will excuse a miss; only the conditions I specified beforehand apply." : t.review === "some" ? "Only the selected explanations, under the rules below." : "Not settled"}`,
    ...(t.review === "some" ? Object.entries(t.exceptions).map(([id, entry]) => `${EXCEPTIONS.find((x) => x.id === id).label}: ${entry.policy === "check" ? `Only with independent evidence: ${entry.check || "Check not specified"}` : entry.policy === "protect" ? "Accepted even without independent evidence" : "Acceptance rule unresolved"}`) : []),
  ].join("\n");
}
