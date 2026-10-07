import { EVIDENCE_OPTIONS, EXCEPTIONS, TEST_GUIDANCE, emptyTest, testGaps, testTensions, testReport, exceptionReport, testSnapshot } from "./promise-testing.mjs?v=20261007-clear-life";
import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, bibleLink, interpretationOptions } from "./promise-catalog.mjs?v=20261007-clear-life";
import { STORAGE_KEY, emptyAnswer, isEarthly, requiredCommitments, loadSavedRecord, previousReport, assess, reportText, canCommit, isCommitted, needsFailureStandard, commitmentSnapshot, hasRevision, hasTestRevision, recordStatus } from "./promise-model.mjs?v=20261007-clear-life";

const $ = (selector) => document.querySelector(selector);
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const dialog = $("#promise-dialog");
const content = $("#exercise-content");
let answers = {};
let previousAnswers = {};
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  ({ answers, previousAnswers } = loadSavedRecord(saved));
} catch { storageAvailable = false; }

let activeId = null;
let step = 1;
let returnFocus = null;
const activePromise = () => PROMISES.find((promise) => promise.id === activeId);
const activeAnswer = () => answers[activeId] ||= emptyAnswer();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 3, answers, previousAnswers }));
    storageAvailable = true;
  } catch { storageAvailable = false; }
  $("#storage-status").textContent = storageAvailable
    ? "Your choices stay in this browser. They are not sent to us."
    : "This browser cannot save your choices. Download your commitments before leaving.";
}

function updateOverview() {
  const committed = PROMISES.filter((promise) => isCommitted(answers[promise.id]));
  const started = PROMISES.filter((promise) => answers[promise.id]?.interpretation);
  $("#progress-label").textContent = `${committed.length} / ${PROMISES.length} committed`;
  $("#readings").hidden = started.length === 0 && !previousReport(previousAnswers);
  for (const promise of PROMISES) {
    const card = $(`#promise-${promise.id}`);
    const answer = answers[promise.id];
    card.dataset.explored = String(Boolean(answer?.interpretation));
    card.dataset.committed = String(isCommitted(answer));
    card.querySelector(".card-status").textContent = answer?.interpretation ? recordStatus(answer) : "";
    card.querySelector(".promise-card-link").setAttribute("aria-label", `${promise.name}: ${isCommitted(answer) ? "review your commitment" : "state your belief"}`);
  }
  $("#reading-list").innerHTML = PROMISES.map((promise) => {
    const answer = answers[promise.id];
    return `<div class="reading-row">
      <div><strong>${escape(promise.name)}</strong><small>${escape((promise.passages || [promise]).map(p => p.ref).join(" · "))} · KJV</small></div>
      <span class="reading-result">${escape(recordStatus(answer))}${isCommitted(answer) ? ` · ${escape(assess(answer).label)}` : ""}</span>
      <button class="text-button" data-review="${promise.id}" type="button" aria-label="Review ${escape(promise.name)}">${isCommitted(answer) ? "Review" : "Resolve"} ↗</button>
      ${answer?.claim ? `<p class="record-claim">${isCommitted(answer) ? "I affirm:" : "Draft:"} ${escape(answer.claim)}</p>` : ""}
    </div>`;
  }).join("") + previousRecord();
  if (!storageAvailable) $("#storage-status").textContent = "This browser cannot save your choices. Download your commitments before leaving.";
}

function openPromise(id, trigger = null) {
  if (!PROMISES.some((promise) => promise.id === id)) return;
  activeId = id;
  returnFocus = trigger || $(`#promise-${id} .promise-card-link`);
  step = activeAnswer().reviewed || isCommitted(activeAnswer()) ? 3 : 1;
  render();
  if (!dialog.open) dialog.showModal();
  history.replaceState(null, "", `#promise-${id}`);
  focusHeading();
}

function focusHeading() {
  dialog.scrollTop = 0;
  $("#exercise-title")?.focus({ preventScroll: true });
}

function closeExercise() {
  // Update the link before closing so an immediate reload cannot reopen the panel.
  history.replaceState(null, "", "#promises");
  dialog.close();
}

function heading(promise, eyebrow = "WHAT DO YOU ACTUALLY BELIEVE?") {
  return `<div class="exercise-heading"><img src="./assets/promises/${promise.id}.webp" width="64" height="64" alt=""><div><p class="eyebrow">${eyebrow}</p><h2 id="exercise-title" tabindex="-1">${escape(promise.name)}</h2></div></div>`;
}

function radios(name, options, value) {
  return `<div class="choice-list">${options.map((item) => `<label class="choice"><input type="radio" name="${name}" value="${item.id}" ${value === item.id ? "checked" : ""}><span><strong>${escape(item.label)}</strong><small>${escape(item.detail)}</small></span></label>`).join("")}</div>`;
}

function note(answer, prompt) {
  return `<details class="exercise-note" ${answer.note ? "open" : ""}><summary>Explain your reading or add conditions</summary><label for="reading-note">${escape(prompt)}</label><textarea id="reading-note" maxlength="1200" rows="3" placeholder="Optional. Use your own words.">${escape(answer.note)}</textarea></details>`;
}

function claimField(promise, answer) {
  if (!answer.interpretation || answer.interpretation === "unsure") return "";
  const prompt = claimPrompt(promise, answer);
  return `<div class="belief-statement"><label for="belief-statement">${escape(prompt.label)}</label><p class="field-hint" id="belief-help">${escape(prompt.help)}</p><textarea id="belief-statement" aria-describedby="belief-help" maxlength="1200" rows="3" required placeholder="Write what you actually believe, in your own words.">${escape(answer.claim)}</textarea></div>`;
}

function previousRecord() {
  const text = previousReport(previousAnswers);
  return text ? `<details class="previous-record"><summary>Earlier healing, protection, health, and long-life answers</summary><p>These are preserved records from the earlier questions. Read the current passages and make a new commitment.</p><pre class="test-transcript">${escape(text)}</pre></details>` : "";
}

function relatedPassages(promise) {
  if (!promise.passages) return "";
  return `<section class="combined-passages" aria-label="Healing, protection, and health passages"><h3>Healing, protection, and health</h3><p>${escape(promise.context)}</p><p class="field-hint">Open each reading. They need not all make the same promise.</p>${promise.passages.map((passage) => `<details class="combined-passage" id="passage-${passage.id}"><summary><img src="./assets/promises/${passage.id}.webp" width="40" height="40" alt=""><span><strong>${escape(passage.name)}</strong><small>${escape(passage.ref)} · KJV</small></span></summary><blockquote class="verse-block">“${escape(passage.verse)}”<cite>${escape(passage.ref)} · King James Version</cite></blockquote><p>${escape(passage.context)}</p><a href="${bibleLink(passage.contextRef)}" target="_blank" rel="noopener noreferrer">Read the surrounding passage ↗</a></details>`).join("")}</section>`;
}

function renderInterpretation(promise, answer) {
  return `${heading(promise, "01 / READ THE PROMISE")}
    ${answer.needsSourceReview ? `<p class="test-proposal" role="status">The passages in this category have changed. Your earlier words and testing terms are preserved as a draft. Read the current passages, revise your claim if needed, and affirm it again.</p>` : ""}
    ${promise.passages ? relatedPassages(promise) : `<blockquote class="verse-block">“${escape(promise.verse)}”<cite>${escape(promise.ref)} · King James Version</cite></blockquote>
    <details class="context-details"><summary>Read the context before deciding</summary><p>${escape(promise.context)}</p><a href="${bibleLink(promise.contextRef)}" target="_blank" rel="noopener noreferrer">Read the surrounding passage ↗</a><p class="related-verses">Related passages: ${promise.related.map((ref) => `<a href="${bibleLink(ref)}" target="_blank" rel="noopener noreferrer">${escape(ref)}</a>`).join(" · ")}. These may call for different interpretations.</p></details>
    `}
    ${promise.id === "longevity" ? previousRecord() : ""}
    <fieldset><legend>${escape(promise.question)}</legend><p class="field-hint">Choose what you actually believe ${promise.passages ? "these passages commit" : "this passage commits"} God to doing. If you affirm both an earthly and a spiritual promise, choose the earthly claim and describe both. No answer is selected for you.</p>${radios("interpretation", interpretationOptions(promise), answer.interpretation)}</fieldset>
    <div id="claim-field">${claimField(promise, answer)}</div>
    ${note(answer, "Which words in the passage support your reading? Explain any conditions or limits on its audience.")}
    <div class="exercise-actions"><span class="field-hint" id="reading-status">${answer.interpretation === "unsure" ? "Uncertainty remains unresolved." : answer.claim.trim() ? "Your claim is a draft until you affirm it." : "State your belief in your own words before continuing."}</span><button class="solid-button" id="next-step" type="button" ${answer.interpretation === "unsure" || (answer.interpretation && answer.claim.trim()) ? "" : "disabled"}>${answer.interpretation === "unsure" ? "Record as unresolved" : "Name a fair test"} <span aria-hidden="true">→</span></button></div>`;
}

function claimPrompt(promise, answer) {
  if (answer.interpretation === "other") return { label: "State the different claim you actually believe this passage makes.", help: "Specify what is promised, to whom, and under which conditions. Say whether it predicts an earthly result and when. Your claim will be recorded in your own words without being assigned to one of the listed interpretations." };
  if (isEarthly(answer)) return { label: "State the result, who qualifies, and when it must happen.", help: `${promise.suggested} ${answer.interpretation === "tendency" ? "Specify the advantage you expect and the comparison group." : "State what each qualifying person must receive."} If you cannot specify these yet, record the commitment as unresolved.` };
  if (answer.interpretation === "spiritual") return { label: "Name the spiritual benefit and who is promised it.", help: "Say what God commits to providing. Be explicit that you are making no promise of the earthly result discussed here." };
  if (answer.interpretation === "historical") return { label: "Name the original recipients or period and the result promised to them.", help: "Specify the past promise you affirm and why you do not extend it to people today." };
  return { label: "State what this passage does instead of making a divine promise.", help: "Identify the wish, instruction, description, or general principle you believe it expresses. Explain why its wording does not commit God to an outcome." };
}

const leavingUnresolved = (answer) => needsFailureStandard(answer) && ["conditions", "unsure"].includes(answer.failure);

function testText(key, label, hint, value) {
  return `<div class="test-field"><label for="test-${key}">${label}</label><p class="field-hint" id="help-${key}">${escape(hint)}</p><textarea id="test-${key}" data-test-text="${key}" aria-describedby="help-${key}" maxlength="1800" rows="3" placeholder="State your rule before checking the results.">${escape(value)}</textarea></div>`;
}

function exceptionFields(answer) {
  const t = answer.test;
  return `<div id="exception-list" ${t.review === "some" ? "" : "hidden"}>${EXCEPTIONS.map((item) => {
    const entry = t.exceptions[item.id];
    return `<div class="exception-item"><label class="choice"><input type="checkbox" name="exception" value="${item.id}" ${entry ? "checked" : ""}><span><strong>${escape(item.label)}</strong><small>${escape(item.probe)}</small></span></label>
      <div id="exception-${item.id}" class="exception-rule" ${entry ? "" : "hidden"}><fieldset><legend>When would you accept this explanation?</legend>${radios(`exception-policy-${item.id}`, [
        { id: "check", label: "Only with independent evidence", detail: "I must establish it using the same rule before knowing whether the outcome favors my belief." },
        { id: "protect", label: "Even without independent evidence", detail: "I would accept this explanation for a miss even if I could not check whether it applies." },
        { id: "unsure", label: "I have not decided", detail: "This part of my test remains unresolved." },
      ], entry?.policy)}</fieldset><div id="check-${item.id}" ${entry?.policy === "check" ? "" : "hidden"}><label for="exception-check-${item.id}">What evidence would establish this condition—and what would rule it out?</label><textarea id="exception-check-${item.id}" data-exception-check="${item.id}" rows="2" maxlength="1200">${escape(entry?.check || "")}</textarea></div></div></div>`;
  }).join("")}</div>`;
}

function testFields(promise, answer) {
  const t = answer.test;
  const guidance = TEST_GUIDANCE[promise.id];
  return `<details class="test-section" id="evidence-section" open><summary><span>01</span> Choose your evidence</summary>
    <p class="field-hint">Choose the strongest check you will actually accept. No selection is a finding or a measure of how likely Christianity is to be true.</p>
    ${radios("test-method", EVIDENCE_OPTIONS, t.method)}
    <div class="test-proposal"><strong>Evidence to consider for ${escape(promise.name.toLowerCase())}</strong><p>${escape(guidance.evidence)}</p><p><strong>Ordinary explanations to check:</strong> ${escape(guidance.alternatives)}</p></div>
    <details class="context-details"><summary>See a possible fair test and its limits</summary><p>${escape(promise.test)}</p><p>${escape(promise.caveat)}</p></details>
    ${testText("plan", "What exactly will you check?", "Name the qualifying cases, records, outcome measure, deadline, and ordinary explanations. For better odds, specify a comparison, the size of the advantage expected, and how much evidence could detect it. Use existing records where possible; never create danger or withhold care.", t.plan)}
    <button class="text-button" type="button" data-test-next="outcomes-section" ${t.method === "decline" ? "hidden" : ""}>Next: set outcome rules →</button>
    </details>
    <div id="test-terms" ${t.method === "decline" ? "hidden" : ""}>
    <details class="test-section" id="outcomes-section"><summary><span>02</span> Set your outcome rules</summary>
    <p class="field-hint">Write these before seeing results. If a rule is missing, the test remains incomplete. The site records your terms; it cannot judge whether free-text rules form a sound study.</p>
    ${testText("support", "What result would support your claim?", "Name a specific result and why it would be less expected without the promised benefit. A favorable result alone does not identify its cause as divine.", t.support)}
    ${testText("challenge", "What result would count against it—and change your belief?", answer.interpretation === "guarantee" ? "Specify a documented qualifying failure by your deadline. Say what you would stop claiming or how you would lower your confidence if it occurred." : "Specify the result that would challenge your exact prediction and how your belief would change. For better odds, one miss is insufficient: the comparison needs enough evidence to detect or rule out the promised advantage.", t.challenge)}
    ${testText("inconclusive", "What result would leave the question unresolved?", "Distinguish missing records, uncertain eligibility, or too little evidence from both success and failure. An inconclusive test is not a fulfilled promise.", t.inconclusive)}
    ${isEarthly(answer) ? `<fieldset class="safeguards"><legend>Which safeguards do you accept?</legend><p class="field-hint">Unchecked safeguards remain uncommitted. These prevent changing the test after seeing the answer.</p><div class="choice-list">${requiredCommitments(answer).map((item) => `<label class="choice"><input type="checkbox" name="commitment" value="${item.id}" ${answer.commitments.includes(item.id) ? "checked" : ""}><span><strong>${escape(item.label)}</strong><small>${escape(item.detail)}</small></span></label>`).join("")}</div></fieldset>` : ""}
    <button class="text-button" type="button" data-test-next="exceptions-section">Next: face an unfavorable result →</button>
    </details>
    <details class="test-section" id="exceptions-section"><summary><span>03</span> Face an unfavorable result</summary>
    <p class="probing-question">${escape(guidance.question)}</p>
    <fieldset><legend>Would you accept any of these explanations for a miss?</legend><p class="field-hint">A genuine condition is not automatically an excuse. The question is whether you can establish it independently and apply it equally to favorable and unfavorable cases.</p>${radios("test-review", [
      { id: "none", label: "No additional explanation will excuse a qualifying miss", detail: "Once the conditions I specified beforehand are met, the stated failure rule applies. I will not add a new exception because the result is unfavorable." },
      { id: "some", label: "I would accept only the explanations I select below", detail: "For each, I will state whether I require independent evidence that it applies." },
      { id: "unsure", label: "I have not decided which explanations I would accept", detail: "My response to an unfavorable result remains unresolved." },
    ], t.review)}</fieldset>${exceptionFields(answer)}
    <p class="field-hint symmetry-question">Apply your rule to a rival religion: would the same evidence and exceptions persuade you there? If not, identify a relevant difference before treating your own claim more favorably.</p>
    <button class="text-button" type="button" data-test-next="failure-decision">Next: declare my failure standard →</button>
    </details></div>`;
}

function renderTesting(promise, answer) {
  const reading = interpretationOptions(promise).find((item) => item.id === answer.interpretation);
  return `${heading(promise, "02 / NAME A FAIR TEST")}
    <div class="claim-recap"><span class="eyebrow">YOUR DRAFT CLAIM</span><p>${escape(answer.claim)}</p><button class="text-button" type="button" data-back="1">Edit my claim</button></div>
    ${needsFailureStandard(answer) ? `${answer.interpretation === "other" ? '<p class="field-hint">Apply these questions to the claim you wrote. A custom interpretation is not automatically classified as an observable promise.</p>' : ""}${testFields(promise, answer)}
    <fieldset class="failure-decision" id="failure-decision" tabindex="-1"><legend>Would a fair failure count against this belief?</legend><p class="field-hint">${answer.interpretation === "guarantee" ? "Consider a documented case that meets your conditions but misses the guaranteed result by your deadline."
      : answer.interpretation === "tendency" ? "Consider a fair comparison with enough evidence to rule out the advantage you specified. One unsuccessful case alone does not refute better odds."
      : "Consider evidence that contradicts your specific claim under the conditions you stated."} Commit to your actual position.</p>${radios("failure", FAILURE_OPTIONS, answer.failure)}</fieldset>`
    : `<div class="test-proposal"><strong>${escape(reading.label)}</strong><p>${escape(assess(answer).body)}</p><p>${answer.interpretation === "historical" ? "What records could support or challenge fulfillment for the original audience? A past-only promise still makes a claim about what happened. Add your answer below." : answer.interpretation === "spiritual" ? "What reasons support this spiritual reading? What could challenge it? Do not cite earthly success as proof while excluding earthly failure from consideration. Add your answer below." : "Which words and context establish a wish, instruction, description, or wisdom rather than a divine commitment? Add your reason below."}</p></div>`}
    ${note(answer, "Add your reasons, relevant evidence, or further conditions. If you propose an exception not listed above, state how it could be independently checked.")}
    <p class="commitment-affirmation">By choosing “I commit to this belief,” you affirm your claim and the testing positions you selected. Missing test terms remain visible as unfinished obligations. Your first affirmed belief and test terms remain available if you revise them.</p>
    <p class="field-hint" id="commitment-status" role="status">${commitmentHint(answer)}</p>
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← Read the promise</button><button class="solid-button" id="see-result" type="button" ${canCommit(answer) || leavingUnresolved(answer) ? "" : "disabled"}>${leavingUnresolved(answer) ? "Save as unresolved" : "I commit to this belief"} <span aria-hidden="true">→</span></button></div>`;
}

function commitmentHint(answer) {
  if (leavingUnresolved(answer)) return "This will remain unresolved and will not count as a commitment.";
  if (!answer.claim.trim()) return "State your belief in your own words before committing.";
  if (needsFailureStandard(answer) && !answer.failure) return "Choose whether failure could count against your belief before committing.";
  if (needsFailureStandard(answer) && answer.failure === "yes" && testGaps(answer).length) return "You can affirm your belief, but the missing test terms will be marked incomplete.";
  return "You are affirming this as your own belief and standard of evidence.";
}

function updateCommitButton(answer) {
  const button = $("#see-result");
  if (!button) return;
  button.disabled = !canCommit(answer) && !leavingUnresolved(answer);
  button.innerHTML = `${leavingUnresolved(answer) ? "Save as unresolved" : "I commit to this belief"} <span aria-hidden="true">→</span>`;
  $("#commitment-status").textContent = commitmentHint(answer);
}

function updateNextButton(answer) {
  const button = $("#next-step");
  if (!button) return;
  button.disabled = answer.interpretation !== "unsure" && !(answer.interpretation && answer.claim.trim());
  button.innerHTML = `${answer.interpretation === "unsure" ? "Record as unresolved" : "Name a fair test"} <span aria-hidden="true">→</span>`;
  $("#reading-status").textContent = answer.interpretation === "unsure" ? "Uncertainty remains unresolved." : answer.claim.trim() ? "Your claim is a draft until you affirm it." : "State your belief in your own words before continuing.";
}

function renderTestRecord(answer) {
  const t = testSnapshot(answer.test);
  const gaps = testGaps(answer);
  const tensions = testTensions(answer);
  return `<section class="test-record"><h3>Your test, on record</h3>
    ${!answer.firstTest ? `<p class="field-hint">${isCommitted(answer) ? "Your earlier belief commitment is preserved. " : ""}This test extension has not yet been affirmed.</p>` : ""}
    ${tensions.length ? `<div class="test-warning"><strong>Resolve this conflict</strong>${tensions.map((x) => `<p>${escape(x)}</p>`).join("")}</div>` : ""}
    ${gaps.length ? `<details class="test-section" open><summary>What still needs an answer</summary><ul>${gaps.map((x) => `<li>${escape(x)}</li>`).join("")}</ul></details>` : ""}
    <dl class="result-facts"><div><dt>Evidence I will accept</dt><dd>${escape(EVIDENCE_OPTIONS.find((x) => x.id === t.method)?.label || "Not specified")}</dd></div>
    ${(t.method === "decline" ? [] : [["plan", "My evidence plan"], ["support", "Would support my claim"], ["challenge", "Would count against it / change my belief"], ["inconclusive", "Would leave it unresolved"]]).map(([key, label]) => `<div><dt>${label}</dt><dd>${escape(t[key] || "Not specified")}</dd></div>`).join("")}</dl>
    ${t.method === "decline" ? '<p class="field-hint">Earlier draft test terms are inactive while this refusal stands. They remain available if you revise your evidence position.</p>' : `<details class="test-section"><summary>My rules for explanations and exceptions</summary><pre class="test-transcript">${escape(exceptionReport(t))}</pre></details>`}
    ${hasTestRevision(answer) ? `<details class="test-section"><summary>Compare my first affirmed test terms</summary><pre class="test-transcript">${escape(testReport({ test: answer.firstTest }))}</pre><p class="field-hint">Revisions remain visible. A change is not by itself evidence of evasion.</p></details>` : ""}
    <button type="button" class="text-button" data-back="2">${gaps.length ? "Finish or revise my test" : "Revise my test terms"} →</button>
    <p class="result-caveat">A favorable result requires the same scrutiny as an unfavorable one. Check ordinary explanations and use the same standard for a rival religion. This page assesses your stated commitments, not the truth of Christianity.</p></section>`;
}

function renderResult(promise, answer) {
  const result = assess(answer);
  const options = interpretationOptions(promise);
  const reading = options.find((item) => item.id === answer.interpretation);
  const first = answer.firstCommitment;
  const firstReading = first && options.find((item) => item.id === first.interpretation);
  const legacy = options.find((item) => item.id === answer.firstInterpretation);
  const missing = requiredCommitments(answer).filter((item) => !answer.commitments.includes(item.id));
  const index = PROMISES.findIndex((item) => item.id === promise.id);
  const next = [...PROMISES.slice(index + 1), ...PROMISES.slice(0, index)].find((item) => !isCommitted(answers[item.id]));
  return `${heading(promise, "03 / SEE WHAT REMAINS")}
    <p class="eyebrow">${isCommitted(answer) ? "YOUR AFFIRMED COMMITMENT" : "YOUR COMMITMENT IS UNRESOLVED"}</p>
    <span class="result-flag" data-code="${result.code}">${escape(result.label)}</span>
    <h3 class="result-heading">${escape(result.title)}</h3><p class="result-body">${escape(result.body)}</p>
    ${!isCommitted(answer) ? `<p class="commitment-affirmation">This does not count toward your ${PROMISES.length} commitments. Return and resolve what you believe and what that belief requires.</p>` : ""}
    <dl class="result-facts"><div><dt>${isCommitted(answer) ? "I affirm this belief" : "Unconfirmed selection"}</dt><dd>${escape(reading.label)} ${escape(reading.detail)}</dd></div>
      ${answer.claim ? `<div><dt>${isCommitted(answer) ? "My specific claim" : "My draft claim"}</dt><dd>${escape(answer.claim)}</dd></div>` : ""}
      ${needsFailureStandard(answer) ? `<div><dt>My standard for failure</dt><dd>${escape(FAILURE_OPTIONS.find((item) => item.id === answer.failure)?.label || "Unresolved")}</dd></div>` : ""}${isEarthly(answer) && answer.test.method !== "decline" ? `<div><dt>${missing.length ? "Safeguards still uncommitted" : "Next: turn these terms into a study"}</dt><dd>${escape(missing.length ? missing.map((item) => item.label).join("; ") : promise.suggested)}</dd></div>` : ""}
      ${answer.note ? `<div><dt>Further reasons or qualifications</dt><dd>${escape(answer.note)}</dd></div>` : ""}
      ${hasRevision(answer) ? `<div><dt>My first affirmed commitment</dt><dd>${escape(firstReading.label)} ${escape(first.claim)}</dd></div><div><dt>My first standard for failure</dt><dd>${escape(FAILURE_OPTIONS.find((item) => item.id === first.failure)?.label || "No present earthly prediction")}</dd></div><div><dt>My first testing safeguards</dt><dd>${escape(first.commitments.map((id) => COMMITMENTS.find((item) => item.id === id).label).join("; ") || "None selected")} A revision alone is not evidence of avoiding a test.</dd></div>` : ""}
      ${!first && legacy && legacy.id !== reading.id ? `<div><dt>Earlier saved selection, not an affirmed commitment</dt><dd>${escape(legacy.label)}</dd></div>` : ""}
    </dl>
    <p class="result-caveat">This record distinguishes affirmed beliefs from unresolved answers. No study results were supplied. Neither willingness to test nor a favorable outcome, by itself, establishes divine action.</p>
    ${needsFailureStandard(answer) ? renderTestRecord(answer) : answer.firstTest ? `<details class="test-section"><summary>My first affirmed test terms</summary><pre class="test-transcript">${escape(testReport({ test: answer.firstTest }))}</pre><p class="field-hint">Your current reading makes no present earthly prediction. These earlier terms are retained for comparison.</p></details>` : ""}
    ${promise.id === "longevity" ? previousRecord() : ""}
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← ${isCommitted(answer) ? "Revise my commitment" : "Resolve my belief"}</button><button class="solid-button" ${next ? `data-next-promise="${next.id}"` : 'data-finish="true"'} type="button">${next ? "Next commitment" : "View my commitments"} <span aria-hidden="true">→</span></button></div>`;
}

function render() {
  const promise = activePromise();
  const answer = activeAnswer();
  $("#exercise-counter").textContent = `PROMISE ${String(PROMISES.indexOf(promise) + 1).padStart(2, "0")} / ${String(PROMISES.length).padStart(2, "0")} · ${step === 1 ? "READ" : step === 2 ? "TEST" : "RECORD"}`;
  content.innerHTML = `<ol class="exercise-steps" aria-label="Your three steps">${["Read the promise", "Name a fair test", "See what remains"].map((label, i) => `<li ${step === i + 1 ? 'aria-current="step"' : ""}><span>0${i + 1}</span>${label}</li>`).join("")}</ol><div class="exercise-body">${step === 1 ? renderInterpretation(promise, answer) : step === 2 ? renderTesting(promise, answer) : renderResult(promise, answer)}</div>`;
  if (step === 3) {
    const aiPanel = window.CrosshairsAI.createPanel({
      id: 'promises', scope: activeId,
      getData: () => promiseAiData(promise.id),
      description: 'Includes this promise’s verses, your claim, written explanations, test terms, exceptions, and first affirmed position. Drafts remain labelled as drafts.'
    });
    content.querySelector('.exercise-actions').before(aiPanel);
  }
}

function promiseAiData(id = null) {
  const selected = id ? PROMISES.filter(p => p.id === id) : PROMISES;
  return {
    moduleId: 'promises', module: id ? `Promise commitment: ${selected[0].name}` : 'All promise commitments',
    source: 'https://xhairs.com/', scope: id || 'All six promise categories and earlier saved records',
    inputs: { answers: Object.fromEntries(selected.map(p => [p.id, answers[p.id] || emptyAnswer()])),
      additionalExplanations: Object.fromEntries(selected.map(p => [p.id, window.CrosshairsAI.getExplanation('promises', p.id)])),
      previousAnswers: !id || id === 'longevity' ? previousAnswers : {} },
    context: { passages: selected, interpretations: Object.fromEntries(selected.map(p => [p.id, interpretationOptions(p)])),
      failureStandards: FAILURE_OPTIONS, safeguards: COMMITMENTS, evidenceOptions: EVIDENCE_OPTIONS,
      exceptions: EXCEPTIONS, statuses: Object.fromEntries(selected.map(p => [p.id, recordStatus(answers[p.id])])) },
    report: id ? `${recordStatus(answers[id])}. ${assess(answers[id]).body}` : reportText(answers, previousAnswers)
  };
}

function finishReading() {
  const answer = activeAnswer();
  const unresolved = answer.interpretation === "unsure" || leavingUnresolved(answer);
  if (!unresolved && !canCommit(answer)) return;
  answer.affirmed = !unresolved;
  answer.complete = !unresolved;
  answer.reviewed = true;
  if (!unresolved) {
    answer.needsSourceReview = false;
    answer.claim = answer.claim.trim();
    answer.firstInterpretation ||= answer.interpretation;
    answer.firstCommitment ||= commitmentSnapshot(answer);
    if (needsFailureStandard(answer)) answer.firstTest ||= testSnapshot(answer.test);
  }
  persist();
  updateOverview();
  step = 3;
  render();
  focusHeading();
}

function invalidateCommitment(answer) {
  answer.affirmed = false;
  answer.complete = false;
  answer.reviewed = false;
}

content.addEventListener("change", (event) => {
  const field = event.target;
  const answer = activeAnswer();
  if (field.name === "interpretation") {
    if (answer.interpretation !== field.value) {
      answer.interpretation = field.value;
      answer.claim = "";
      answer.failure = "";
      answer.commitments = [];
      answer.test = emptyTest();
      invalidateCommitment(answer);
    }
    $("#claim-field").innerHTML = claimField(activePromise(), answer);
    updateNextButton(answer);
  } else if (field.name === "failure") {
    answer.failure = field.value;
    invalidateCommitment(answer);
    updateCommitButton(answer);
  } else if (field.name === "commitment") {
    answer.commitments = [...content.querySelectorAll('input[name="commitment"]:checked')].map((input) => input.value);
    invalidateCommitment(answer);
  } else if (field.name === "test-method") {
    answer.test.method = field.value;
    $("#test-terms").hidden = field.value === "decline";
    $('[data-test-next="outcomes-section"]').hidden = field.value === "decline";
    invalidateCommitment(answer);
  } else if (field.name === "test-review") {
    answer.test.review = field.value;
    $("#exception-list").hidden = field.value !== "some";
    invalidateCommitment(answer);
  } else if (field.name === "exception") {
    if (field.checked) answer.test.exceptions[field.value] = { policy: "", check: "" };
    else delete answer.test.exceptions[field.value];
    // Re-render only the exception area so removed conditions cannot leave stale controls.
    const holder = $("#exception-list");
    holder.outerHTML = exceptionFields(answer);
    content.querySelector(`input[name="exception"][value="${field.value}"]`)?.focus();
    invalidateCommitment(answer);
  } else if (field.name.startsWith("exception-policy-")) {
    const id = field.name.replace("exception-policy-", "");
    answer.test.exceptions[id].policy = field.value;
    $(`#check-${id}`).hidden = field.value !== "check";
    invalidateCommitment(answer);
  } else return;
  updateCommitButton(answer);
  persist();
  updateOverview();
});

content.addEventListener("input", (event) => {
  const answer = activeAnswer();
  if (event.target.id === "reading-note") answer.note = event.target.value.slice(0, 1200);
  else if (event.target.id === "belief-statement") answer.claim = event.target.value.slice(0, 1200);
  else if (event.target.dataset.testText) answer.test[event.target.dataset.testText] = event.target.value.slice(0, 1800);
  else if (event.target.dataset.exceptionCheck) answer.test.exceptions[event.target.dataset.exceptionCheck].check = event.target.value.slice(0, 1200);
  else return;
  invalidateCommitment(answer);
  updateNextButton(answer);
  updateCommitButton(answer);
  persist();
  updateOverview();
});

content.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.testNext) {
    const target = $(`#${button.dataset.testNext}`);
    button.closest("details").open = false;
    if (target.tagName === "DETAILS") target.open = true;
    target.scrollIntoView({ block: "start" });
    (target.querySelector("summary") || target).focus({ preventScroll: true });
    return;
  }
  if (button.id === "next-step") {
    if (!activeAnswer().interpretation) return;
    if (activeAnswer().interpretation === "unsure") return finishReading();
    if (!activeAnswer().claim.trim()) return;
    step = 2;
  } else if (button.id === "see-result") return finishReading();
  else if (button.dataset.back) step = Number(button.dataset.back);
  else if (button.dataset.nextPromise) return openPromise(button.dataset.nextPromise);
  else if (button.dataset.finish) {
    closeExercise();
    $("#readings").scrollIntoView({ behavior: "smooth" });
    return;
  } else return;
  render();
  focusHeading();
});

$("#close-exercise").addEventListener("click", closeExercise);
dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeExercise(); });
dialog.addEventListener("close", () => {
  (returnFocus?.isConnected ? returnFocus : $(`#promise-${activeId} .promise-card-link`))?.focus({ preventScroll: true });
});

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-promise]");
  if (card && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    openPromise(card.dataset.promise, card);
  }
  const review = event.target.closest("[data-review]");
  if (review) openPromise(review.dataset.review, review);
});

for (const wrap of document.querySelectorAll(".tip-wrap")) {
  const button = wrap.querySelector("button");
  button.addEventListener("click", () => {
    wrap.dataset.dismissed = "false";
    const open = wrap.dataset.open !== "true";
    wrap.dataset.open = String(open);
    if (!open) wrap.dataset.dismissed = "true";
    button.setAttribute("aria-expanded", String(open));
  });
  wrap.addEventListener("pointerenter", () => { wrap.dataset.dismissed = "false"; });
  button.addEventListener("focus", () => { wrap.dataset.dismissed = "false"; });
  wrap.addEventListener("focusout", (event) => {
    if (!wrap.contains(event.relatedTarget)) {
      wrap.dataset.open = "false";
      button.setAttribute("aria-expanded", "false");
    }
  });
}
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || dialog.open) return;
  for (const wrap of document.querySelectorAll(".tip-wrap")) {
    wrap.dataset.dismissed = "true";
    wrap.dataset.open = "false";
    wrap.querySelector("button").setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("click", (event) => {
  for (const wrap of document.querySelectorAll(".tip-wrap")) {
    if (wrap.contains(event.target)) continue;
    wrap.dataset.open = "false";
    wrap.querySelector("button").setAttribute("aria-expanded", "false");
  }
});

$("#download-readings").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([reportText(answers, previousAnswers)], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "crosshairs-my-promise-commitments.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#page-status").textContent = "Your commitments and unresolved answers have been downloaded.";
});
$("#reset-readings").addEventListener("click", () => {
  answers = {};
  previousAnswers = {};
  try { localStorage.removeItem(STORAGE_KEY); } catch { storageAvailable = false; }
  $(".reset-controls").open = false;
  updateOverview();
  $("#page-status").textContent = "Your introductory commitments, drafts, and earlier records have been cleared. Saved work in the detailed audits is unchanged.";
  $("#promise-prayer .promise-card-link").focus();
});

const allPromiseAi = window.CrosshairsAI.createPanel({ id: 'promises', getData: () => promiseAiData(),
  description: 'Includes all six categories, your written answers, testing terms, revisions, and earlier saved records. Unfinished answers stay identified as unfinished.' });
$('#readings .record-footer').before(allPromiseAi);
updateOverview();
const openFromHash = () => {
  const requested = location.hash.replace(/^#promise-/, "");
  const id = ["healing", "protection", "health"].includes(requested) ? "longevity" : requested;
  if (PROMISES.some((promise) => promise.id === id)) {
    openPromise(id);
    if (requested !== id && step === 1) {
      const passage = $(`#passage-${requested}`);
      if (passage) { passage.open = true; passage.scrollIntoView({ block: "start" }); }
    }
  }
};
window.addEventListener("hashchange", openFromHash);
openFromHash();
