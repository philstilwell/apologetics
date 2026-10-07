import { PROMISES, COMMITMENTS, FAILURE_OPTIONS, bibleLink, interpretationOptions } from "./promise-catalog.mjs?v=20261007-clear-responses";
import { STORAGE_KEY, emptyAnswer, isEarthly, requiredCommitments, sanitizeAnswers, assess, reportText } from "./promise-model.mjs?v=20261007-clear-responses";

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
    : "This browser cannot save your choices. Download your readings before leaving.";
}

function updateOverview() {
  const completed = PROMISES.filter((promise) => answers[promise.id]?.complete);
  $("#progress-label").textContent = `${completed.length} / ${PROMISES.length} explored`;
  $("#readings").hidden = completed.length === 0;
  for (const promise of PROMISES) {
    const card = $(`#promise-${promise.id}`);
    const answer = answers[promise.id];
    card.dataset.explored = String(Boolean(answer?.complete));
    card.querySelector(".card-status").textContent = answer?.complete ? assess(answer).label : "";
    card.querySelector(".promise-card-link").setAttribute("aria-label", `${promise.name}: ${answer?.complete ? `review ${assess(answer).label.toLowerCase()}` : "explore this passage"}`);
  }
  $("#reading-list").innerHTML = completed.map((promise) => `<div class="reading-row">
    <div><strong>${escape(promise.name)}</strong><small>${escape(promise.ref)} · KJV</small></div>
    <span class="reading-result">${escape(assess(answers[promise.id]).label)}</span>
    <button class="text-button" data-review="${promise.id}" type="button" aria-label="Review ${escape(promise.name)}">Review ↗</button>
  </div>`).join("");
  if (!storageAvailable) $("#storage-status").textContent = "This browser cannot save your choices. Download your readings before leaving.";
}

function openPromise(id, trigger = null) {
  if (!PROMISES.some((promise) => promise.id === id)) return;
  activeId = id;
  returnFocus = trigger || $(`#promise-${id} .promise-card-link`);
  step = activeAnswer().complete ? 3 : 1;
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

function heading(promise, eyebrow = "YOUR INTERPRETATION") {
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
    <fieldset><legend>${escape(promise.question)}</legend><p class="field-hint">Choose one statement. “Qualifying” means meeting the passage’s conditions, identified before checking results. If you affirm both an earthly and a spiritual promise, choose the earthly claim.</p>${radios("interpretation", interpretationOptions(promise), answer.interpretation)}</fieldset>
    ${note(answer, "What does this verse mean to you? Which conditions or audience matter?")}
    <div class="exercise-actions"><span class="field-hint">You can change your answer.</span><button class="solid-button" id="next-step" type="button" ${answer.interpretation ? "" : "disabled"}>Continue <span aria-hidden="true">→</span></button></div>`;
}

function renderTesting(promise, answer) {
  const reading = interpretationOptions(promise).find((item) => item.id === answer.interpretation);
  return `${heading(promise, "YOUR STANDARD FOR A FAIR TEST")}
    <p class="result-body">Your reading: <strong>${escape(reading.label)}</strong> ${escape(reading.detail)}</p>
    <details class="test-proposal"><summary>What could a fair test look like?</summary><p>${escape(promise.test)}</p><p>${escape(promise.caveat)}</p></details>
    <fieldset><legend>What would a failure to deliver mean for this promise?</legend><p class="field-hint">${answer.interpretation === "guarantee"
      ? "Consider a documented case that meets the conditions you specified beforehand but misses the promised result by your stated deadline."
      : "Consider a fair comparison that finds no promised advantage, with enough cases and time to detect the improvement you predict. One unsuccessful case alone would not refute a claim about better odds."}</p>${radios("failure", FAILURE_OPTIONS, answer.failure)}</fieldset>
    <details class="safeguards"><summary>Make your testing commitment specific</summary><p class="field-hint">Select the safeguards you accept. These are commitments, not completed test definitions.</p><div class="choice-list">${requiredCommitments(answer).map((item) => `<label class="choice"><input type="checkbox" name="commitment" value="${item.id}" ${answer.commitments.includes(item.id) ? "checked" : ""}><span><strong>${escape(item.label)}</strong><small>${escape(item.detail)}</small></span></label>`).join("")}</div></details>
    ${note(answer, promise.suggested)}
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← My interpretation</button><button class="solid-button" id="see-result" type="button" ${answer.failure ? "" : "disabled"}>See what remains <span aria-hidden="true">→</span></button></div>`;
}

function renderResult(promise, answer) {
  const result = assess(answer);
  const options = interpretationOptions(promise);
  const reading = options.find((item) => item.id === answer.interpretation);
  const first = options.find((item) => item.id === answer.firstInterpretation);
  const missing = requiredCommitments(answer).filter((item) => !answer.commitments.includes(item.id));
  const next = PROMISES.find((item) => !answers[item.id]?.complete);
  return `${heading(promise, "WHAT YOUR READING PRESERVES")}
    <span class="result-flag" data-code="${result.code}">${escape(result.label)}</span>
    <h3 class="result-heading">${escape(result.title)}</h3><p class="result-body">${escape(result.body)}</p>
    <dl class="result-facts"><div><dt>Your interpretation</dt><dd>${escape(reading.label)} ${escape(reading.detail)}</dd></div>
      ${isEarthly(answer) ? `<div><dt>What can count against it</dt><dd>${escape(FAILURE_OPTIONS.find((item) => item.id === answer.failure).label)}</dd></div><div><dt>${missing.length ? "Safeguards still uncommitted" : "Next: make the commitment concrete"}</dt><dd>${escape(missing.length ? missing.map((item) => item.label).join("; ") : promise.suggested)}</dd></div>` : ""}
      ${answer.note ? `<div><dt>Your own words</dt><dd>${escape(answer.note)}</dd></div>` : ""}
      ${first && first.id !== reading.id ? `<div><dt>Your first saved reading</dt><dd>${escape(first.label)} ${escape(first.detail)} A revision alone is not evidence of avoiding a test.</dd></div>` : ""}
    </dl>
    <p class="result-caveat">This result describes your interpretation and commitments. No study results were supplied. Neither willingness to test nor a favorable outcome, by itself, establishes divine action.</p>
    <p class="result-links"><a href="./apps/falsifiability-field/">Explore the detailed Promise Test Field ↗</a> · Tablet or larger</p>
    <div class="exercise-actions"><button class="text-button" data-back="1" type="button">← Revise my reading</button><button class="solid-button" ${next ? `data-next-promise="${next.id}"` : 'data-finish="true"'} type="button">${next ? "Try another promise" : "View all my readings"} <span aria-hidden="true">→</span></button></div>`;
}

function render() {
  const promise = activePromise();
  const answer = activeAnswer();
  $("#exercise-counter").textContent = `PASSAGE ${String(PROMISES.indexOf(promise) + 1).padStart(2, "0")} / 09 · ${step === 1 ? "READ" : step === 2 ? "TEST" : "REFLECT"}`;
  content.innerHTML = `<div class="exercise-body">${step === 1 ? renderInterpretation(promise, answer) : step === 2 ? renderTesting(promise, answer) : renderResult(promise, answer)}</div>`;
}

function finishReading() {
  const answer = activeAnswer();
  if (!answer.interpretation || (isEarthly(answer) && !answer.failure)) return;
  answer.firstInterpretation ||= answer.interpretation;
  answer.complete = true;
  persist();
  updateOverview();
  step = 3;
  render();
  focusHeading();
}

content.addEventListener("change", (event) => {
  const field = event.target;
  const answer = activeAnswer();
  if (field.name === "interpretation") {
    if (answer.interpretation !== field.value) {
      answer.interpretation = field.value;
      answer.failure = "";
      answer.commitments = [];
      answer.complete = false;
    }
    $("#next-step").disabled = false;
  } else if (field.name === "failure") {
    answer.failure = field.value;
    answer.complete = false;
    $("#see-result").disabled = false;
  } else if (field.name === "commitment") {
    answer.commitments = [...content.querySelectorAll('input[name="commitment"]:checked')].map((input) => input.value);
    answer.complete = false;
  } else return;
  persist();
  updateOverview();
});

content.addEventListener("input", (event) => {
  if (event.target.id !== "reading-note") return;
  activeAnswer().note = event.target.value.slice(0, 1200);
  persist();
});

content.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "next-step") {
    if (!activeAnswer().interpretation) return;
    if (!isEarthly(activeAnswer())) return finishReading();
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
  link.download = "crosshairs-my-promise-readings.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#page-status").textContent = "Your readings have been downloaded.";
});
$("#reset-readings").addEventListener("click", () => {
  answers = {};
  try { localStorage.removeItem(STORAGE_KEY); } catch { storageAvailable = false; }
  $(".reset-controls").open = false;
  updateOverview();
  $("#page-status").textContent = "Your introductory readings have been cleared. Saved work in the detailed audits is unchanged.";
  $("#promise-prayer .promise-card-link").focus();
});

updateOverview();
const openFromHash = () => {
  const id = location.hash.replace(/^#promise-/, "");
  if (PROMISES.some((promise) => promise.id === id)) openPromise(id);
};
window.addEventListener("hashchange", openFromHash);
openFromHash();
