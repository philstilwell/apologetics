const state = {
  data: null,
  pattern: null,
  responses: new Map(),
};

const treatmentScores = {
  accept: 8,
  weaken: 4.6,
  reject: 1.5,
};

const treatmentLabels = {
  accept: "Accept",
  weaken: "Weaken",
  reject: "Reject",
};

const claimMarker = "◉ ";

const archetypes = [
  {
    id: "open-agnostic",
    label: "Open Agnostic",
    force: 3,
    mode: "inductive",
    treatment: "accept",
    differentiatorType: "independent",
    differentiator: "I am provisionally allowing the same inductive permission unless a real difference is shown.",
    description: "Low certainty. Parallel inductions are treated as live evidence unless a specific differentiator earns its keep.",
  },
  {
    id: "methodical-skeptic",
    label: "Methodical Skeptic",
    force: 4,
    mode: "inductive",
    treatment: "weaken",
    differentiatorType: "quality",
    differentiator: "The parallel may matter, but I want stronger evidence quality before giving it full force.",
    description: "Cautious and evidence-first. The anchor and parallels are both allowed, but neither is treated as decisive.",
  },
  {
    id: "cautious-theist",
    label: "Cautious Theist",
    force: 6,
    mode: "abductive",
    treatment: "weaken",
    differentiatorType: "scope",
    differentiator: "I think the cases differ in scope, but the distinction still needs independent defense.",
    description: "Moderate confidence. Theistic inference is allowed as a possibility while parallel pressures remain visible.",
  },
  {
    id: "classical-apologist",
    label: "Classical Apologist",
    force: 8,
    mode: "metaphysical",
    treatment: "reject",
    differentiatorType: "assertion",
    differentiator: "The theistic case is treated as different because it concerns ultimate reality rather than ordinary cases.",
    description: "High confidence. The anchor is strong and most parallels are restricted by asserted scope differences.",
  },
  {
    id: "evangelical-dogmatist",
    label: "Evangelical Dogmatist",
    force: 10,
    mode: "modal",
    treatment: "reject",
    differentiatorType: "modal-smuggling",
    differentiator: "The preferred rule is treated as necessary, while contrary parallels are ruled out as inapplicable.",
    description: "Maximum certainty. The anchor is hardened into necessity and the parallels are largely denied permission.",
  },
];

const els = {
  patternSelect: document.querySelector("#pattern-select"),
  archetypeButtons: document.querySelector("#archetype-buttons"),
  archetypeComparison: document.querySelector("#archetype-comparison"),
  archetypeDescription: document.querySelector("#archetype-description"),
  claim: document.querySelector("#claim-input"),
  evidence: document.querySelector("#evidence-input"),
  rule: document.querySelector("#rule-input"),
  preferredForce: document.querySelector("#preferred-force"),
  preferredForceValue: document.querySelector("#preferred-force-value"),
  modeOptions: document.querySelector("#mode-options"),
  parallelList: document.querySelector("#parallel-list"),
  resetPattern: document.querySelector("#reset-pattern"),
  copyReport: document.querySelector("#copy-report"),
  copyAiPrompt: document.querySelector("#copy-ai-prompt"),
  stanceScoreValue: document.querySelector("#stance-score-value"),
  stanceScoreLabel: document.querySelector("#stance-score-label"),
  stanceAnchorRule: document.querySelector("#stance-anchor-rule"),
  stanceMode: document.querySelector("#stance-mode"),
  stanceForce: document.querySelector("#stance-force"),
  stanceGrid: document.querySelector("#stance-grid"),
  scoreRing: document.querySelector("#score-ring"),
  scoreValue: document.querySelector("#score-value"),
  scoreSummary: document.querySelector("#score-summary"),
  miniBars: document.querySelector("#mini-bars"),
  scoreDrivers: document.querySelector("#score-drivers"),
  flagList: document.querySelector("#flag-list"),
  repairList: document.querySelector("#repair-list"),
  exportBox: document.querySelector("#export-box"),
  aiPromptBox: document.querySelector("#ai-prompt-box"),
};

init();

async function init() {
  try {
    const response = await fetch("./data/audit-patterns.json");
    state.data = await response.json();
    buildPatternSelect();
    buildDefenseModes();
    buildArchetypeButtons();
    bindBaseEvents();
    setPattern(state.data.patterns[0].id);
  } catch (error) {
    els.parallelList.innerHTML = `
      <article class="parallel-card">
        <h3>Data could not be loaded</h3>
        <p>${escapeHtml(error.message)}</p>
      </article>
    `;
  }
}

function buildPatternSelect() {
  els.patternSelect.innerHTML = state.data.patterns
    .map((pattern) => `<option value="${pattern.id}">${escapeHtml(pattern.title)}</option>`)
    .join("");
}

function buildArchetypeButtons() {
  els.archetypeButtons.innerHTML = archetypes
    .map(
      (archetype) => `
        <button
          class="archetype-button"
          type="button"
          data-archetype-id="${archetype.id}"
          aria-label="Apply ${escapeHtml(archetype.label)} archetype"
        >
          <strong>${escapeHtml(archetype.label)}</strong>
          <span>${escapeHtml(archetype.description)}</span>
        </button>
      `,
    )
    .join("");
}

function buildDefenseModes() {
  els.modeOptions.innerHTML = state.data.defenseModes
    .map(
      (mode, index) => `
        <span>
          <input
            id="mode-${mode.id}"
            type="radio"
            name="defense-mode"
            value="${mode.id}"
            ${index === 0 ? "checked" : ""}
          >
          <label for="mode-${mode.id}" title="${escapeHtml(mode.note)}">${escapeHtml(mode.label)}</label>
        </span>
      `,
    )
    .join("");
}

function bindBaseEvents() {
  els.patternSelect.addEventListener("change", () => setPattern(els.patternSelect.value));
  els.preferredForce.addEventListener("input", () => {
    els.preferredForceValue.textContent = els.preferredForce.value;
    renderResults();
  });

  [els.claim, els.evidence, els.rule].forEach((field) => {
    field.addEventListener("input", renderResults);
  });

  els.modeOptions.addEventListener("change", renderResults);
  els.archetypeButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-archetype-id]");
    if (!button) return;
    applyArchetype(button.dataset.archetypeId);
  });
  els.resetPattern.addEventListener("click", () => setPattern(state.pattern.id));
  els.copyReport.addEventListener("click", copyReport);
  els.copyAiPrompt.addEventListener("click", copyAiPrompt);
  els.stanceGrid.addEventListener("click", (event) => {
    const target = event.target.closest("[data-scroll-target]");
    if (!target) return;

    document.querySelector(target.dataset.scrollTarget)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

function applyArchetype(archetypeId) {
  const archetype = archetypes.find((item) => item.id === archetypeId);
  if (!archetype) return;

  els.preferredForce.value = String(archetype.force);
  els.preferredForceValue.textContent = String(archetype.force);
  document.querySelector(`#mode-${archetype.mode}`).checked = true;

  state.pattern.parallels.forEach((parallel) => {
    state.responses.set(parallel.id, {
      treatment: archetype.treatment,
      differentiatorType: archetype.differentiatorType,
      differentiator: archetype.differentiator,
    });
  });

  els.archetypeDescription.textContent = archetype.description;
  document.querySelectorAll(".archetype-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.archetypeId === archetype.id);
  });

  renderParallels();
  renderResults();
}

function setPattern(patternId) {
  const pattern = state.data.patterns.find((item) => item.id === patternId);
  state.pattern = pattern;
  state.responses.clear();

  els.patternSelect.value = pattern.id;
  els.claim.value = pattern.claim;
  els.evidence.value = pattern.evidence;
  els.rule.value = formatClaim(pattern.rule, 1);
  els.preferredForce.value = String(pattern.defaultForce);
  els.preferredForceValue.textContent = String(pattern.defaultForce);

  const inductive = document.querySelector("#mode-inductive");
  if (inductive) inductive.checked = true;
  els.archetypeDescription.textContent =
    "Apply a common stance profile, then inspect how the tension changes.";
  document.querySelectorAll(".archetype-button").forEach((button) => {
    button.classList.remove("active");
  });

  pattern.parallels.forEach((parallel) => {
    state.responses.set(parallel.id, {
      treatment: parallel.defaultTreatment,
      differentiatorType: "none",
      differentiator: "",
    });
  });

  renderParallels();
  renderResults();
}

function renderParallels() {
  els.parallelList.innerHTML = state.pattern.parallels
    .map((parallel, index) => renderParallelCard(parallel, index + 2))
    .join("");

  state.pattern.parallels.forEach((parallel) => {
    const card = document.querySelector(`[data-parallel-id="${parallel.id}"]`);
    const response = state.responses.get(parallel.id);

    card.querySelectorAll(`[name="treatment-${parallel.id}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        response.treatment = input.value;
        renderResults();
      });
    });

    card.querySelector(`[name="diff-type-${parallel.id}"]`).addEventListener("change", (event) => {
      response.differentiatorType = event.target.value;
      renderResults();
    });

    card.querySelector(`[name="diff-text-${parallel.id}"]`).addEventListener("input", (event) => {
      response.differentiator = event.target.value;
      renderResults();
    });
  });
}

function renderParallelCard(parallel, stanceNumber) {
  const response = state.responses.get(parallel.id);
  const treatmentOptions = ["accept", "weaken", "reject"]
    .map(
      (id) => `
        <span>
          <input
            id="${parallel.id}-${id}"
            type="radio"
            name="treatment-${parallel.id}"
            value="${id}"
            ${response.treatment === id ? "checked" : ""}
          >
          <label for="${parallel.id}-${id}">${treatmentLabels[id]}</label>
        </span>
      `,
    )
    .join("");

  const diffOptions = state.data.differentiatorTypes
    .map(
      (type) => `
        <option value="${type.id}" ${response.differentiatorType === type.id ? "selected" : ""}>
          ${escapeHtml(type.label)}
        </option>
      `,
    )
    .join("");

  return `
    <article class="parallel-card compact" id="parallel-${parallel.id}" data-parallel-id="${parallel.id}">
      <header class="parallel-compact-head">
        <div>
          <p class="app-step">Parallel induction</p>
          <h3 class="claim-text">${escapeHtml(formatClaim(parallel.title, stanceNumber))}</h3>
        </div>
        <div class="parallel-head-meta">
          <span class="similarity-pill">${Math.round(parallel.similarity * 100)}% similar</span>
          <span class="tag scope">${escapeHtml(parallel.scope)}</span>
        </div>
      </header>

      <details class="parallel-details">
        <summary>
          <span>${escapeHtml(parallel.variable)}</span>
          <strong>Observation and implication</strong>
        </summary>
        <p><strong>Observation:</strong> ${escapeHtml(parallel.observation)}</p>
        <p><strong>Implication:</strong> ${escapeHtml(parallel.implication)}</p>
      </details>

      <details class="annotation parallel-help">
        <summary>How to judge this assertion</summary>
        <p>
          Decide whether this parallel observation deserves the same kind of inductive
          permission as the anchor rule. If you weaken or reject it, name the evidential
          difference that does the work.
        </p>
        <p>
          Start by asking whether the parallel uses the same style of inference as the
          anchor: observed pattern, analogy, best explanation, necessity claim, or exception
          from ordinary cases. Similarity does not mean the conclusions must match. It means
          the standards for counting the evidence should match.
        </p>
        <ul>
          <li><strong>Accept</strong> when the parallel should count with roughly the same permission as the anchor.</li>
          <li><strong>Weaken</strong> when the parallel counts, but a real difference lowers its force.</li>
          <li><strong>Reject</strong> when the parallel should not count unless you can name why it is evidentially different.</li>
        </ul>
        <p>
          The differentiator should identify the variable that changes the evidential
          situation. Merely saying that the preferred conclusion is special will usually
          register as unresolved asymmetry.
        </p>
      </details>

      <div class="parallel-controls">
        <div class="field-group treatment-field">
          <span class="parallel-label">Treatment</span>
          <div class="segmented three">${treatmentOptions}</div>
        </div>
        <div class="field-group">
          <label for="diff-type-${parallel.id}">Differentiator type</label>
          <select id="diff-type-${parallel.id}" name="diff-type-${parallel.id}">
            ${diffOptions}
          </select>
        </div>
        <div class="field-group differentiator-text">
          <label for="diff-text-${parallel.id}">Differentiator offered</label>
          <textarea
            id="diff-text-${parallel.id}"
            name="diff-text-${parallel.id}"
            placeholder="What makes this parallel evidentially different?"
          >${escapeHtml(response.differentiator)}</textarea>
        </div>
      </div>
    </article>
  `;
}

function renderResults() {
  if (!state.pattern) return;

  const assessment = assess();
  const scoreColor = getScoreColor(assessment.score);
  renderStanceBoard(assessment, scoreColor);
  els.scoreRing.style.setProperty("--score", `${assessment.score}%`);
  els.scoreRing.style.setProperty("--score-color", scoreColor);
  els.scoreValue.textContent = String(assessment.score);
  els.scoreSummary.textContent = assessment.summary;

  els.miniBars.innerHTML = assessment.items
    .map(
      (item) => `
        <div class="mini-bar">
          <span class="claim-text">${escapeHtml(formatClaim(item.title, item.stanceNumber))}</span>
          <span class="mini-bar-track">
            <span class="mini-bar-fill" style="width: ${item.risk}%; --score-color: ${scoreColor};"></span>
          </span>
          <strong>${item.risk}</strong>
        </div>
      `,
    )
    .join("");

  renderScoreDrivers(assessment);
  els.flagList.innerHTML = assessment.flags
    .map((flag) => `<li><strong>${escapeHtml(flag.title)}:</strong> ${escapeHtml(flag.body)}</li>`)
    .join("");

  els.repairList.innerHTML = assessment.repairs
    .map((repair) => `<article class="repair-card"><strong>${escapeHtml(repair.title)}</strong><br>${escapeHtml(repair.body)}</article>`)
    .join("");

  els.exportBox.value = buildMarkdownReport(assessment);
  els.aiPromptBox.value = buildAiExplorationPrompt(assessment);
}

function renderScoreDrivers(assessment) {
  const drivers = buildScoreDrivers(assessment);
  els.scoreDrivers.innerHTML = `
    <details class="annotation" open>
      <summary>Why did my score change?</summary>
      <p>
        This panel names the main variables currently moving the score. It prioritizes
        the largest residual tensions, weak differentiators, defense-mode burdens, and
        high anchor force.
      </p>
      <p>
        To reduce the score, revise the items named here first. A useful revision usually
        accepts more of the parallel pressure, lowers the claimed force of the anchor, or
        replaces a weak differentiator with one that has independent support.
      </p>
      <div class="driver-list">
        ${drivers
          .map(
            (driver) => `
              <article class="driver-card">
                <strong>${escapeHtml(driver.title)}</strong>
                <p>${escapeHtml(driver.body)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderStanceBoard(assessment, scoreColor) {
  els.stanceScoreValue.textContent = String(assessment.score);
  els.stanceScoreLabel.textContent = getScoreLabel(assessment.score);
  els.stanceScoreValue.style.color = scoreColor;
  els.stanceAnchorRule.textContent = formatClaim(els.rule.value.trim() || assessment.pattern.rule, 1);
  els.stanceMode.textContent = `Mode: ${assessment.mode.label}`;
  els.stanceForce.textContent = `Anchor force: ${assessment.preferredForce}/10`;

  els.stanceGrid.innerHTML = assessment.items
    .map((item) => {
      const tensionClass = getTensionClass(item.risk);
      const treatment = treatmentLabels[item.response.treatment];

      return `
        <button
          class="stance-card ${tensionClass}"
          type="button"
          data-scroll-target="#parallel-${item.id}"
          aria-label="Jump to ${escapeHtml(item.title)} controls"
        >
          <span class="stance-card-top">
            <span class="stance-treatment ${item.response.treatment}">${treatment}</span>
            <strong>${item.risk}</strong>
          </span>
          <span class="stance-card-title claim-text">${escapeHtml(formatClaim(item.title, item.stanceNumber))}</span>
          <span class="stance-card-meta">${Math.round(item.similarity * 100)}% similar | ${escapeHtml(item.variable)}</span>
          <span class="stance-tension-track" aria-hidden="true">
            <span style="width: ${item.risk}%"></span>
          </span>
        </button>
      `;
    })
    .join("");

  renderArchetypeComparison();
}

function assess() {
  const preferredForce = Number(els.preferredForce.value);
  const mode = getDefenseMode();
  const items = state.pattern.parallels.map((parallel, index) =>
    assessParallel(parallel, preferredForce, index + 2),
  );
  const averageRisk = items.reduce((sum, item) => sum + item.risk, 0) / Math.max(items.length, 1);
  const score = clamp(Math.round(averageRisk + mode.riskModifier), 0, 100);
  const flags = buildFlags(items, mode, preferredForce);
  const repairs = buildRepairs(score, mode, items);

  return {
    pattern: state.pattern,
    score,
    mode,
    preferredForce,
    items,
    flags,
    repairs,
    summary: summarizeScore(score),
  };
}

function assessParallel(parallel, preferredForce, stanceNumber) {
  return assessParallelWithResponse(parallel, preferredForce, state.responses.get(parallel.id), stanceNumber);
}

function assessParallelWithResponse(parallel, preferredForce, response, stanceNumber) {
  const treatmentScore = treatmentScores[response.treatment];
  const differentiator = getDifferentiatorType(response.differentiatorType);
  const gap = Math.max(0, preferredForce - treatmentScore) / 10;
  const textBonus = response.differentiator.trim().length > 24 ? 0.04 : 0;
  const allowance = Math.min(0.78, differentiator.allowance + textBonus);
  const residual = Math.max(0, gap - allowance * 0.62);
  const risk = clamp(Math.round(residual * parallel.similarity * 145), 0, 100);

  return {
    ...parallel,
    stanceNumber,
    response,
    treatmentScore,
    differentiator,
    allowance,
    risk,
  };
}

function assessArchetype(archetype) {
  const mode = state.data.defenseModes.find((item) => item.id === archetype.mode);
  const items = state.pattern.parallels.map((parallel, index) =>
    assessParallelWithResponse(parallel, archetype.force, {
      treatment: archetype.treatment,
      differentiatorType: archetype.differentiatorType,
      differentiator: archetype.differentiator,
    }, index + 2),
  );
  const averageRisk = items.reduce((sum, item) => sum + item.risk, 0) / Math.max(items.length, 1);
  const score = clamp(Math.round(averageRisk + mode.riskModifier), 0, 100);

  return {
    ...archetype,
    mode,
    items,
    score,
    summary: summarizeScore(score),
  };
}

function renderArchetypeComparison() {
  if (!state.pattern || !els.archetypeComparison) return;

  els.archetypeComparison.innerHTML = archetypes
    .map((archetype) => {
      const comparison = assessArchetype(archetype);
      const scoreColor = getScoreColor(comparison.score);
      const top = [...comparison.items].sort((a, b) => b.risk - a.risk)[0];

      return `
        <article class="comparison-card">
          <div class="comparison-top">
            <strong>${escapeHtml(archetype.label)}</strong>
            <span style="color: ${scoreColor};">${comparison.score}</span>
          </div>
          <div class="comparison-meter">
            <span style="width: ${comparison.score}%; background: ${scoreColor};"></span>
          </div>
          <p>${escapeHtml(comparison.summary)}</p>
          <small>Mode: ${escapeHtml(comparison.mode.label)} | Force: ${archetype.force}/10</small>
          <small>Top tension: ${escapeHtml(top ? formatClaim(top.title, top.stanceNumber) : "None")}</small>
        </article>
      `;
    })
    .join("");
}

function buildFlags(items, mode, preferredForce) {
  const flags = [];
  const rejectedHighSimilarity = items.filter(
    (item) => item.similarity >= 0.8 && item.response.treatment === "reject",
  );
  const unsupported = items.filter(
    (item) =>
      item.response.treatment !== "accept" &&
      ["none", "assertion", "circular", "modal-smuggling", "specificity"].includes(item.response.differentiatorType),
  );
  const highRisk = items.filter((item) => item.risk >= 45);

  if (mode.id === "modal") {
    flags.push({
      title: "Modal bridge owed",
      body: "The selected mode promotes observed regularity toward necessity, so the audit expects an independent bridge premise.",
    });
  }

  if (mode.id === "abductive") {
    flags.push({
      title: "Rival space active",
      body: "Best-explanation framing must compare rival hypotheses instead of treating compatibility as confirmation.",
    });
  }

  if (preferredForce >= 8 && rejectedHighSimilarity.length > 0) {
    flags.push({
      title: "Strong preferred induction, weak parallel permission",
      body: `${rejectedHighSimilarity.length} highly similar parallel assessment${rejectedHighSimilarity.length === 1 ? " is" : "s are"} rejected.`,
    });
  }

  if (unsupported.length > 0) {
    flags.push({
      title: "Differentiator ledger",
      body: `${unsupported.length} discounted parallel${unsupported.length === 1 ? " has" : "s have"} no independently supported differentiator.`,
    });
  }

  if (highRisk.length > 0) {
    flags.push({
      title: "Residual asymmetry",
      body: `The largest residual gaps appear in: ${highRisk
        .map((item) => formatClaim(item.title, item.stanceNumber))
        .join(", ")}.`,
    });
  }

  if (flags.length === 0) {
    flags.push({
      title: "Low asymmetry",
      body: "The current settings treat the selected parallel inductions with broadly similar evidential permission.",
    });
  }

  return flags;
}

function buildRepairs(score, mode, items) {
  const highest = [...items].sort((a, b) => b.risk - a.risk)[0];
  const repairs = state.pattern.repair.map((body, index) => ({
    title: index === 0 ? "Modest claim" : index === 1 ? "Scope control" : "Bridge premise",
    body,
  }));

  if (score >= 55 && highest) {
    repairs.push({
      title: "Immediate pressure point",
      body: `Repair the argument by either accepting "${formatClaim(
        highest.title,
        highest.stanceNumber,
      )}" as relevant or supplying an independent differentiator that changes ${highest.variable.toLowerCase()}.`,
    });
  }

  if (["modal", "metaphysical", "analytic"].includes(mode.id)) {
    repairs.push({
      title: "Burden shift",
      body: mode.note,
    });
  }

  return repairs;
}

function buildScoreDrivers(assessment) {
  const weakDifferentiators = assessment.items.filter(
    (item) =>
      item.response.treatment !== "accept" &&
      ["none", "assertion", "circular", "modal-smuggling", "specificity"].includes(item.response.differentiatorType),
  );
  const topItems = [...assessment.items].sort((a, b) => b.risk - a.risk).slice(0, 2);
  const drivers = [];

  if (topItems[0]) {
    drivers.push({
      title: "Largest residual tension",
      body: `${topItems
        .map((item) => `${formatClaim(item.title, item.stanceNumber)} (${item.risk})`)
        .join(" and ")} drive the score because they are treated much weaker than the anchor while remaining similar.`,
    });
  }

  if (weakDifferentiators.length > 0) {
    drivers.push({
      title: "Differentiator quality",
      body: `${weakDifferentiators.length} discounted parallel${weakDifferentiators.length === 1 ? " uses" : "s use"} no, weak, circular, modalized, or specificity-inflating differentiators.`,
    });
  }

  if (assessment.mode.riskModifier > 0) {
    drivers.push({
      title: "Defense mode burden",
      body: `${assessment.mode.label} mode adds pressure because it asks the anchor to do more than ordinary induction without automatically licensing the same move for parallels.`,
    });
  }

  if (assessment.preferredForce >= 8) {
    drivers.push({
      title: "Anchor force",
      body: `The accepted rule is set to ${assessment.preferredForce}/10, so rejecting similar parallels creates a larger evidential gap.`,
    });
  }

  if (drivers.length === 0) {
    drivers.push({
      title: "Low tension profile",
      body: "The score stays low because the anchor and the parallels are receiving broadly similar evidential permission.",
    });
  }

  return drivers.slice(0, 3);
}

function buildDiagnosis(assessment) {
  const drivers = buildScoreDrivers(assessment);
  return `${assessment.summary} Main drivers: ${drivers.map((driver) => driver.title.toLowerCase()).join(", ")}.`;
}

function buildFollowUpPrompts(assessment) {
  const topItems = [...assessment.items].sort((a, b) => b.risk - a.risk).slice(0, 3);
  const highest = topItems[0];
  const weakDifferentiator = assessment.items.find(
    (item) =>
      item.response.treatment !== "accept" &&
      ["none", "assertion", "circular", "modal-smuggling", "specificity"].includes(item.response.differentiatorType),
  );
  const prompts = [];

  if (highest) {
    prompts.push(
      `Focus only on "${formatClaim(
        highest.title,
        highest.stanceNumber,
      )}". What exact premise would justify treating this parallel induction as weaker than my anchor rule, and what independent evidence would support that premise?`,
    );
  }

  if (weakDifferentiator) {
    prompts.push(
      `Rewrite my differentiator for "${formatClaim(
        weakDifferentiator.title,
        weakDifferentiator.stanceNumber,
      )}" so it is not circular, not merely asserted, and not just a restatement of the conclusion.`,
    );
  }

  if (assessment.mode.riskModifier > 0) {
    prompts.push(
      `Explain what extra bridge premise is required by ${assessment.mode.label} mode, and show how the argument changes if that bridge premise is removed.`,
    );
  }

  if (assessment.preferredForce >= 8) {
    prompts.push(
      `Test whether my ${assessment.preferredForce}/10 force rating is too high. What would a 5/10 version of the same inductive rule permit and forbid?`,
    );
  }

  prompts.push(
    `Compare the original claim with this repaired claim: "${assessment.repairs[0]?.body || els.claim.value.trim()}". What evidence would be needed to move from the repaired claim back to the original conclusion?`,
  );

  prompts.push(
    `Ask me five yes-or-no questions that would reveal whether I am applying one evidential standard to the anchor and another to the parallel inductions.`,
  );

  const imagePrompt = buildImagePromptRequest(assessment);
  return [...prompts.slice(0, 5), imagePrompt];
}

function buildImagePromptRequest(assessment) {
  const quantifiedStances = [
    `◉ [1] ${stripClaimPrefix(els.rule.value.trim() || assessment.pattern.rule)} - anchor force ${assessment.preferredForce}/10`,
    ...assessment.items.map(
      (item) =>
        `${formatClaim(item.title, item.stanceNumber)} - ${treatmentLabels[item.response.treatment]}, residual tension ${item.risk}/100, similarity ${Math.round(item.similarity * 100)}%`,
    ),
  ].join("; ");

  return `Create an image prompt for a largely quantified visual depiction of this stance map and its tensions. Show the numbered stances, treatment status, residual tension scores, similarity percentages, and overall risk score (${assessment.score}/100). Use a clean analytical dashboard style, not a cartoon. Data to visualize: ${quantifiedStances}.`;
}

function buildMarkdownReport(assessment) {
  const lines = [
    "# Inductive Symmetry Audit",
    "",
    `Pattern: ${assessment.pattern.title}`,
    `Score: ${assessment.score}/100`,
    `Defense mode: ${assessment.mode.label}`,
    `Preferred force: ${assessment.preferredForce}/10`,
    "",
    "## Diagnosis",
    buildDiagnosis(assessment),
    "",
    "### Why the score moved",
  ];

  buildScoreDrivers(assessment).forEach((driver) => {
    lines.push(`- ${driver.title}: ${driver.body}`);
  });

  lines.push(
    "",
    "## Claim",
    els.claim.value.trim(),
    "",
    "## Evidence",
    els.evidence.value.trim(),
    "",
    "## Accepted Rule",
    formatClaim(els.rule.value.trim(), 1),
    "",
    "## Parallel Assessments",
  );

  assessment.items.forEach((item) => {
    lines.push(
      "",
      `### ${formatClaim(item.title, item.stanceNumber)}`,
      `Treatment: ${treatmentLabels[item.response.treatment]}`,
      `Similarity: ${Math.round(item.similarity * 100)}%`,
      `Differentiator: ${item.differentiator.label}`,
      `Residual risk: ${item.risk}/100`,
      `Note: ${item.differentiator.warning}`,
    );
    if (item.response.differentiator.trim()) {
      lines.push(`User differentiator: ${item.response.differentiator.trim()}`);
    }
  });

  lines.push("", "## Flags");
  assessment.flags.forEach((flag) => lines.push(`- ${flag.title}: ${flag.body}`));
  lines.push("", "## Repair");
  assessment.repairs.forEach((repair) => lines.push(`- ${repair.title}: ${repair.body}`));

  return lines.join("\n");
}

function buildAiExplorationPrompt(assessment) {
  const drivers = buildScoreDrivers(assessment);
  const followUpPrompts = buildFollowUpPrompts(assessment);
  const archetypeSummaries = archetypes.map((archetype) => {
    const comparison = assessArchetype(archetype);
    return `${archetype.label}: ${comparison.score}/100, ${comparison.mode.label} mode, force ${archetype.force}/10`;
  });
  const lines = [
    "Copy/paste this entire prompt into an AI assistant.",
    "",
    "You are a rigorous but fair Socratic auditor of inductive reasoning in apologetics.",
    "Help me examine whether my current stance is cherry-picking inductive permission. Do not simply reassure me or dunk on the argument. Separate truth, possibility, and evidential permission.",
    "",
    "Your tasks:",
    "1. Identify the strongest tensions in my stance.",
    "2. Explain whether each differentiator is strong, weak, circular, modalized, scope-shifting, or specificity-inflating.",
    "3. Ask targeted follow-up questions that would force the stance to become more consistent.",
    "4. Suggest the most charitable repair that preserves what the evidence can support.",
    "5. State what would need to be true for my stronger conclusion to be licensed.",
    "6. Generate several follow-up prompts I can paste back into an AI assistant to continue the analysis, including one image-generation prompt for a quantified visual depiction of the numbered stance map.",
    "",
    "Theory vocabulary to use:",
    "- Inductive symmetry: similar inductive patterns should receive similar evidential permission unless a relevant differentiator is supplied.",
    "- Modal smuggling: turning an observed regularity or plausible explanation into necessity without an independent bridge.",
    "- Scope drift: moving beyond the domain actually supported by the evidence.",
    "- Specificity inflation: using modest evidence to reach a highly specific theological conclusion.",
    "",
    "BEGIN CURRENT USER DATA",
    "",
    "Audit context:",
    `Pattern: ${assessment.pattern.title}`,
    `Claim being defended: ${els.claim.value.trim()}`,
    `Evidence emphasized: ${els.evidence.value.trim()}`,
    `Accepted inductive rule: ${formatClaim(els.rule.value.trim(), 1)}`,
    `Defense mode: ${assessment.mode.label}`,
    `Force assigned to accepted rule: ${assessment.preferredForce}/10`,
    `Risk score: ${assessment.score}/100`,
    `Score summary: ${assessment.summary}`,
    `Diagnosis: ${buildDiagnosis(assessment)}`,
    "",
    "Main score drivers:",
  ];

  drivers.forEach((driver) => {
    lines.push(`- ${driver.title}: ${driver.body}`);
  });

  lines.push("", "Parallel induction ledger:");
  assessment.items.forEach((item) => {
    lines.push(
      "",
      `Parallel claim: ${formatClaim(item.title, item.stanceNumber)}`,
      `Treatment: ${treatmentLabels[item.response.treatment]}`,
      `Similarity to anchor: ${Math.round(item.similarity * 100)}%`,
      `Variable at issue: ${item.variable}`,
      `Observation: ${item.observation}`,
      `Implication: ${item.implication}`,
      `Differentiator type: ${item.differentiator.label}`,
      `Differentiator warning: ${item.differentiator.warning}`,
      `User differentiator: ${item.response.differentiator.trim() || "None supplied"}`,
      `Residual tension: ${item.risk}/100`,
    );
  });

  lines.push("", "Flags:");
  assessment.flags.forEach((flag) => lines.push(`- ${flag.title}: ${flag.body}`));

  lines.push("", "Repair options generated by the audit:");
  assessment.repairs.forEach((repair) => lines.push(`- ${repair.title}: ${repair.body}`));

  lines.push("", "Archetype comparison for the same argument:");
  archetypeSummaries.forEach((summary) => lines.push(`- ${summary}`));

  lines.push("", "Suggested subsequent prompts to ask next:");
  followUpPrompts.forEach((prompt, index) => lines.push(`${index + 1}. ${prompt}`));

  lines.push(
    "",
    "END CURRENT USER DATA",
    "",
    "Please respond in this format:",
    "1. A concise diagnosis of the stance.",
    "2. The top three tensions, each tied to a specific parallel claim.",
    "3. The differentiator that would most improve the argument, stated as a testable or independently defensible premise.",
    "4. Five Socratic questions I should answer before treating the original conclusion as licensed.",
    "5. A repaired version of the claim that avoids cherry-picking.",
    "6. Six follow-up prompts I can paste next, each focused on a specific unresolved tension in this audit; one must ask for an image prompt that depicts the numbered stances and tensions quantitatively.",
  );

  return lines.join("\n");
}

function formatClaim(value, stanceNumber = null) {
  const text = stripClaimPrefix(value);
  const numberedPrefix = Number.isInteger(stanceNumber) ? `[${stanceNumber}] ` : "";
  return `${claimMarker}${numberedPrefix}${text}`;
}

function stripClaimPrefix(value) {
  return String(value)
    .trim()
    .replace(/^◉\s*(?:\[\d+\]\s*)?/, "")
    .trim();
}

async function copyReport() {
  await copyTextFromBox(els.exportBox, els.copyReport, "Copy summary");
}

async function copyAiPrompt() {
  await copyTextFromBox(els.aiPromptBox, els.copyAiPrompt, "Copy AI prompt");
}

async function copyTextFromBox(box, button, resetLabel) {
  const text = box.value;
  let copied = copyTextBySelection(text);

  if (!copied && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }

  button.textContent = copied ? "Copied" : "Select text";
  setTimeout(() => {
    button.textContent = resetLabel;
  }, 3000);
}

function copyTextBySelection(text) {
  const temporaryBox = document.createElement("textarea");
  let copyEventHandled = false;
  const handleCopy = (event) => {
    event.preventDefault();
    event.clipboardData?.setData("text/plain", text);
    copyEventHandled = true;
  };

  temporaryBox.value = text;
  temporaryBox.setAttribute("readonly", "");
  temporaryBox.style.position = "fixed";
  temporaryBox.style.inset = "0 auto auto 0";
  temporaryBox.style.width = "1px";
  temporaryBox.style.height = "1px";
  temporaryBox.style.opacity = "0";
  document.body.appendChild(temporaryBox);
  temporaryBox.focus();
  temporaryBox.select();
  temporaryBox.setSelectionRange(0, text.length);
  document.addEventListener("copy", handleCopy, { once: true });

  try {
    return document.execCommand("copy") || copyEventHandled;
  } catch {
    return false;
  } finally {
    document.removeEventListener("copy", handleCopy);
    temporaryBox.remove();
  }
}

function getDefenseMode() {
  const selected = document.querySelector(`[name="defense-mode"]:checked`);
  return state.data.defenseModes.find((mode) => mode.id === selected.value);
}

function getDifferentiatorType(id) {
  return state.data.differentiatorTypes.find((type) => type.id === id);
}

function summarizeScore(score) {
  if (score < 20) {
    return "Low cherry-picking risk. The parallel assessments are currently receiving comparable evidential permission.";
  }

  if (score < 45) {
    return "Moderate risk. Some asymmetry remains, but the argument may be repairable with clearer scope and differentiators.";
  }

  if (score < 70) {
    return "High risk. The preferred induction is doing more work than similar rejected inductions are allowed to do.";
  }

  return "Severe risk. The conclusion appears protected by asymmetric evidential treatment rather than proportionate induction.";
}

function getScoreLabel(score) {
  if (score < 20) return "Low";
  if (score < 45) return "Moderate";
  if (score < 70) return "High";
  return "Severe";
}

function getTensionClass(score) {
  if (score < 20) return "low";
  if (score < 45) return "moderate";
  if (score < 70) return "high";
  return "severe";
}

function getScoreColor(score) {
  if (score < 20) return "var(--green)";
  if (score < 45) return "var(--amber)";
  if (score < 70) return "var(--rust)";
  return "var(--wine)";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
