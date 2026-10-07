import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, bibleLink, interpretationOptions } from "./promise-catalog.mjs?v=20261007-commitment";
import { STORAGE_KEY, emptyAnswer, isEarthly, requiredCommitments, sanitizeAnswers, assess, reportText, canCommit, isCommitted, needsFailureStandard, commitmentSnapshot, hasRevision, recordStatus } from "./promise-model.mjs?v=20261007-commitment";

const $ = (selector) => document.querySelector(selector);
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const dialog = $("#promise-dialog");
const content = $("#exercise-content");
let answers = {};
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (saved?.version === 1) answers = sanitizeAnswers(saved.answers);
} catch { storageAvailable = false; }

let activeId = null;
let step = 1;
let returnFocus = null;
const activePromise = () => PROMISES.find((promise) => promise.id === activeId);
const activeAnswer = () => answers[activeId] ||= emptyAnswer();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, answers }));
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
  $("#readings").hidden = started.length === 0;
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
      <div><strong>${escape(promise.name)}</strong><small>${escape(promise.ref)} · KJV</small></div>
      <span class="reading-result">${escape(recordStatus(answer))}${isCommitted(answer) ? ` · ${escape(assess(answer).label)}` : ""}</span>
      <button class="text-button" data-review="${promise.id}" type="button" aria-label="Review ${escape(promise.name)}">${isCommitted(answer) ? "Review" : "Resolve"} ↗</button>
      ${answer?.claim ? `<p class="record-claim">${isCommitted(answer) ? "I affirm:" : "Draft:"} ${escape(answer.claim)}</p>` : ""}
    </div>`;
  }).join("");
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
  return `<details class="exercise-note" ${answer.note ? "open" : ""}><summary>Add your own interpretation or conditions</summary><label for="reading-note">${escape(prompt)}</label><textarea id="reading-note" maxlength="1200" rows="3" placeholder="Optional. Use your own words.">${escape(answer.note)}</textarea></details>`;
}

function renderInterpretation(promise, answer) {
  return `${heading(promise)}
    <blockquote class="verse-block">“${escape(promise.verse)}”<cite>${escape(promise.ref)} · King James Version</cite></blockquote>
    <details class="context-details"><summary>Read the context before deciding</summary><p>${escape(promise.context)}</p><a href="${bibleLink(promise.contextRef)}" target="_blank" rel="noopener noreferrer">Read the surrounding passage ↗</a><p class="related-verses">Related passages: ${promise.related.map((ref) => `<a href="${bibleLink(ref)}" target="_blank" rel="noopener noreferrer">${escape(ref)}</a>`).join(" · ")}. These may call for different interpretations.</p></details>
    <fieldset><legend>${escape(promise.question)}</legend><p class="field-hint">Choose the statement you actually believe this passage teaches. You will be asked to specify and affirm it. If you affirm both an earthly and a spiritual promise, choose the earthly claim. Conditions must be identified before checking outcomes.</p>${radios("interpretation", interpretationOptions(promise), answer.interpretation)}</fieldset>
    ${note(answer, "What does this verse mean to you? Which conditions or audience matter?")}
    <div class="exercise-actions"><span class="field-hint">Selecting an option is only a draft.</span><button class="solid-button" id="next-step" type="button" ${answer.interpretation ? "" : "disabled"}>${answer.interpretation === "unsure" ? "Record as unresolved" : "Define my commitment"} <span aria-hidden="true">→</span></button></div>`;
}

function claimPrompt(promise, answer) {
  if (answer.interpretation === "other") return { label: "State the different claim you actually believe this passage makes.", help: "Specify what is promised, to whom, and under which conditions. Say whether it predicts an earthly result and when. Your claim will be recorded in your own words without being assigned to one of the listed interpretations." };
  if (isEarthly(answer)) return { label: "State the result, who qualifies, and when it must happen.", help: `${promise.suggested} ${answer.interpretation === "tendency" ? "Specify the advantage you expect and the comparison group." : "State what each qualifying person must receive."} If you cannot specify these yet, record the commitment as unresolved.` };
  if (answer.interpretation === "spiritual") return { label: "Name the spiritual benefit and who is promised it.", help: "Say what God commits to providing. Be explicit that you are making no promise of the earthly result discussed here." };
  if (answer.interpretation === "historical") return { label: "Name the original recipients or period and the result promised to them.", help: "Specify the past promise you affirm and why you do not extend it to people today." };
  return { label: "State what this passage does instead of making a divine promise.", help: "Identify the wish, instruction, description, or general principle you believe it expresses. Explain why its wording does not commit God to an outcome." };
}

const leavingUnresolved = (answer) => needsFailureStandard(answer) && ["conditions", "unsure"].includes(answer.failure);

function renderTesting(promise, answer) {
  const reading = interpretationOptions(promise).find((item) => item.id === answer.interpretation);
  const prompt = claimPrompt(promise, answer);
  return `${heading(promise, "MAKE YOUR COMMITMENT EXPLICIT")}
    <p class="result-body">The belief you are choosing: <strong>${escape(reading.label)}</strong> ${escape(reading.detail)}</p>
    <div class="belief-statement"><label for="belief-statement">${escape(prompt.label)}</label><p class="field-hint" id="belief-help">${escape(prompt.help)}</p><textarea id="belief-statement" aria-describedby="belief-help" maxlength="1200" rows="3" required placeholder="Write what you actually believe, in your own words.">${escape(answer.claim)}</textarea></div>
    ${needsFailureStandard(answer) ? `${isEarthly(answer) ? `<details class="test-proposal"><summary>What could a fair test look like?</summary><p>${escape(promise.test)}</p><p>${escape(promise.caveat)}</p></details>` : ""}
    <fieldset><legend>Would failure count against the belief you just stated?</legend><p class="field-hint">${answer.interpretation === "other" ? "Consider evidence that contradicts the specific claim you wrote, assessed under its stated conditions. If you believe no observed failure could count against it, choose that position explicitly."
      : answer.interpretation === "guarantee" ? "Consider a documented case that meets the conditions you specified beforehand but misses the promised result by your stated deadline."
      : "Consider a fair comparison that finds no promised advantage, with enough cases and time to detect the improvement you predict. One unsuccessful case alone would not refute a claim about better odds."}</p>${radios("failure", FAILURE_OPTIONS, answer.failure)}</fieldset>
    ${isEarthly(answer) ? `<details class="safeguards" open><summary>Your commitments to testing</summary><p class="field-hint">Check only the safeguards you actually accept. Unchecked items remain uncommitted; checking them does not prove your claim or complete a study design.</p><div class="choice-list">${requiredCommitments(answer).map((item) => `<label class="choice"><input type="checkbox" name="commitment" value="${item.id}" ${answer.commitments.includes(item.id) ? "checked" : ""}><span><strong>${escape(item.label)}</strong><small>${escape(item.detail)}</small></span></label>`).join("")}</div></details>` : ""}` : ""}
    ${note(answer, "Add any further reasons, qualifications, or distinctions.")}
    <p class="commitment-affirmation">By choosing “I commit to this belief,” you affirm that the selected statement and your own words express what you actually believe this passage promises, if anything.</p>
    <p class="field-hint" id="commitment-status" role="status">${commitmentHint(answer)}</p>
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← My belief</button><button class="solid-button" id="see-result" type="button" ${canCommit(answer) || leavingUnresolved(answer) ? "" : "disabled"}>${leavingUnresolved(answer) ? "Save as unresolved" : "I commit to this belief"} <span aria-hidden="true">→</span></button></div>`;
}

function commitmentHint(answer) {
  if (leavingUnresolved(answer)) return "This will remain unresolved and will not count as a commitment.";
  if (!answer.claim.trim()) return "State your belief in your own words before committing.";
  if (needsFailureStandard(answer) && !answer.failure) return "Choose whether failure could count against your belief before committing.";
  return "Revisions are allowed. Your first affirmed commitment will remain visible for comparison.";
}

function updateCommitButton(answer) {
  const button = $("#see-result");
  if (!button) return;
  button.disabled = !canCommit(answer) && !leavingUnresolved(answer);
  button.innerHTML = `${leavingUnresolved(answer) ? "Save as unresolved" : "I commit to this belief"} <span aria-hidden="true">→</span>`;
  $("#commitment-status").textContent = commitmentHint(answer);
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
  return `${heading(promise, isCommitted(answer) ? "YOUR AFFIRMED COMMITMENT" : "YOUR COMMITMENT IS UNRESOLVED")}
    <span class="result-flag" data-code="${result.code}">${escape(result.label)}</span>
    <h3 class="result-heading">${escape(result.title)}</h3><p class="result-body">${escape(result.body)}</p>
    ${!isCommitted(answer) ? '<p class="commitment-affirmation">This does not count toward your nine commitments. Return and resolve what you believe and what that belief requires.</p>' : ""}
    <dl class="result-facts"><div><dt>${isCommitted(answer) ? "I affirm this belief" : "Unconfirmed selection"}</dt><dd>${escape(reading.label)} ${escape(reading.detail)}</dd></div>
      ${answer.claim ? `<div><dt>${isCommitted(answer) ? "My specific claim" : "My draft claim"}</dt><dd>${escape(answer.claim)}</dd></div>` : ""}
      ${needsFailureStandard(answer) ? `<div><dt>My standard for failure</dt><dd>${escape(FAILURE_OPTIONS.find((item) => item.id === answer.failure)?.label || "Unresolved")}</dd></div>` : ""}${isEarthly(answer) ? `<div><dt>${missing.length ? "Safeguards still uncommitted" : "Next: turn these terms into a study"}</dt><dd>${escape(missing.length ? missing.map((item) => item.label).join("; ") : promise.suggested)}</dd></div>` : ""}
      ${answer.note ? `<div><dt>Further reasons or qualifications</dt><dd>${escape(answer.note)}</dd></div>` : ""}
      ${hasRevision(answer) ? `<div><dt>My first affirmed commitment</dt><dd>${escape(firstReading.label)} ${escape(first.claim)}</dd></div><div><dt>My first standard for failure</dt><dd>${escape(FAILURE_OPTIONS.find((item) => item.id === first.failure)?.label || "No present earthly prediction")}</dd></div><div><dt>My first testing safeguards</dt><dd>${escape(first.commitments.map((id) => COMMITMENTS.find((item) => item.id === id).label).join("; ") || "None selected")} A revision alone is not evidence of avoiding a test.</dd></div>` : ""}
      ${!first && legacy && legacy.id !== reading.id ? `<div><dt>Earlier saved selection, not an affirmed commitment</dt><dd>${escape(legacy.label)}</dd></div>` : ""}
    </dl>
    <p class="result-caveat">This record distinguishes affirmed beliefs from unresolved answers. No study results were supplied. Neither willingness to test nor a favorable outcome, by itself, establishes divine action.</p>
    <p class="result-links"><a href="./apps/falsifiability-field/">Audit this commitment in the detailed Promise Test Field ↗</a> · Tablet or larger. Carry your stated claim and conditions into that audit.</p>
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← ${isCommitted(answer) ? "Revise my commitment" : "Resolve my belief"}</button><button class="solid-button" ${next ? `data-next-promise="${next.id}"` : 'data-finish="true"'} type="button">${next ? "Next commitment" : "View my commitments"} <span aria-hidden="true">→</span></button></div>`;
}

function render() {
  const promise = activePromise();
  const answer = activeAnswer();
  $("#exercise-counter").textContent = `PASSAGE ${String(PROMISES.indexOf(promise) + 1).padStart(2, "0")} / 09 · ${step === 1 ? "STATE" : step === 2 ? "COMMIT" : "RECORD"}`;
  content.innerHTML = `<div class="exercise-body">${step === 1 ? renderInterpretation(promise, answer) : step === 2 ? renderTesting(promise, answer) : renderResult(promise, answer)}</div>`;
}

function finishReading() {
  const answer = activeAnswer();
  const unresolved = answer.interpretation === "unsure" || leavingUnresolved(answer);
  if (!unresolved && !canCommit(answer)) return;
  answer.affirmed = !unresolved;
  answer.complete = !unresolved;
  answer.reviewed = true;
  if (!unresolved) {
    answer.claim = answer.claim.trim();
    answer.firstInterpretation ||= answer.interpretation;
    answer.firstCommitment ||= commitmentSnapshot(answer);
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
      invalidateCommitment(answer);
    }
    $("#next-step").disabled = false;
    $("#next-step").innerHTML = `${answer.interpretation === "unsure" ? "Record as unresolved" : "Define my commitment"} <span aria-hidden="true">→</span>`;
  } else if (field.name === "failure") {
    answer.failure = field.value;
    invalidateCommitment(answer);
    updateCommitButton(answer);
  } else if (field.name === "commitment") {
    answer.commitments = [...content.querySelectorAll('input[name="commitment"]:checked')].map((input) => input.value);
    invalidateCommitment(answer);
  } else return;
  persist();
  updateOverview();
});

content.addEventListener("input", (event) => {
  const answer = activeAnswer();
  if (event.target.id === "reading-note") answer.note = event.target.value.slice(0, 1200);
  else if (event.target.id === "belief-statement") answer.claim = event.target.value.slice(0, 1200);
  else return;
  invalidateCommitment(answer);
  updateCommitButton(answer);
  persist();
  updateOverview();
});

content.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "next-step") {
    if (!activeAnswer().interpretation) return;
    if (activeAnswer().interpretation === "unsure") return finishReading();
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
  const url = URL.createObjectURL(new Blob([reportText(answers)], { type: "text/plain;charset=utf-8" }));
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
  try { localStorage.removeItem(STORAGE_KEY); } catch { storageAvailable = false; }
  $(".reset-controls").open = false;
  updateOverview();
  $("#page-status").textContent = "Your introductory commitments and drafts have been cleared. Saved work in the detailed audits is unchanged.";
  $("#promise-prayer .promise-card-link").focus();
});

updateOverview();
const openFromHash = () => {
  const id = location.hash.replace(/^#promise-/, "");
  if (PROMISES.some((promise) => promise.id === id)) openPromise(id);
};
window.addEventListener("hashchange", openFromHash);
openFromHash();
