const claimPresets = [
  {
    id: "resurrection",
    title: "Jesus bodily resurrected",
    claim:
      "Jesus was bodily raised by the Christian God, and the Gospel resurrection traditions reliably point to that event.",
    prior: {
      general: 20,
      targeting: 1,
      actType: 0.5,
      unknownReserve: 10,
    },
    evidence: [
      {
        id: "crucifixion",
        title: "Crucifixion",
        type: "background",
        note: "This anchors the story, but it is expected whether or not a resurrection happened.",
        pTrue: 95,
        pAlt: 90,
        weight: 100,
      },
      {
        id: "appearances",
        title: "Post-mortem appearance reports",
        type: "testimony",
        note: "This is a major pressure point. The comparison side must include grief visions, memory, rumor, and communal reinforcement.",
        pTrue: 90,
        pAlt: 20,
        weight: 55,
      },
      {
        id: "conversions",
        title: "Conversions and costly commitment",
        type: "testimony",
        note: "Sincerity can show that people really believed, but sincere belief is not the same as event truth.",
        pTrue: 70,
        pAlt: 10,
        weight: 70,
      },
      {
        id: "empty-tomb",
        title: "Empty tomb tradition",
        type: "literary",
        note: "The comparison side includes mislocation, reburial, theological story-shaping, and later development.",
        pTrue: 60,
        pAlt: 20,
        weight: 60,
      },
      {
        id: "movement-growth",
        title: "Early creed and movement growth",
        type: "social",
        note: "Growth, slogans, and community persistence can happen in sincere movements even when the central interpretation is mistaken.",
        pTrue: 65,
        pAlt: 45,
        weight: 50,
      },
    ],
  },
  {
    id: "modern-miracle",
    title: "Modern miracle report",
    claim:
      "A reported modern miracle is best explained as a supernatural intervention by the Christian God.",
    prior: {
      general: 18,
      targeting: 4,
      actType: 1.5,
      unknownReserve: 12,
    },
    evidence: [
      {
        id: "testimony",
        title: "Witness testimony",
        type: "testimony",
        note: "Confidence, sincerity, and event truth need to be separated.",
        pTrue: 85,
        pAlt: 25,
        weight: 70,
      },
      {
        id: "medical",
        title: "Medical or external record",
        type: "public",
        note: "Independent documentation matters, but an unexplained recovery is not automatically a specific Christian intervention.",
        pTrue: 75,
        pAlt: 35,
        weight: 85,
      },
      {
        id: "specific-prayer",
        title: "Specific prayer timing",
        type: "timing",
        note: "Timing evidence should include selection effects, unreported misses, and how wide the target was.",
        pTrue: 70,
        pAlt: 30,
        weight: 65,
      },
      {
        id: "attribution",
        title: "Christian attribution",
        type: "specificity",
        note: "Moving from unusual event to a specific deity or doctrine adds extra burden.",
        pTrue: 80,
        pAlt: 55,
        weight: 50,
      },
    ],
  },
  {
    id: "prayer-answer",
    title: "Answered prayer",
    claim:
      "A specific positive outcome occurred because God answered Christian prayer.",
    prior: {
      general: 15,
      targeting: 6,
      actType: 2,
      unknownReserve: 15,
    },
    evidence: [
      {
        id: "desired-outcome",
        title: "Desired outcome occurred",
        type: "outcome",
        note: "The ordinary chance of the outcome matters before prayer is treated as the explanation.",
        pTrue: 70,
        pAlt: 45,
        weight: 80,
      },
      {
        id: "specific-request",
        title: "Specific request matched outcome",
        type: "timing",
        note: "Specific matches matter more when misses, base rates, and search width are visible.",
        pTrue: 75,
        pAlt: 35,
        weight: 70,
      },
      {
        id: "community-confidence",
        title: "Community confidence",
        type: "social",
        note: "Shared confidence can stabilize an interpretation without adding much event-level discrimination.",
        pTrue: 80,
        pAlt: 60,
        weight: 45,
      },
      {
        id: "no-clear-alternative",
        title: "No clear alternative named",
        type: "unknowns",
        note: "Not naming an alternative is not the same as eliminating the comparison side.",
        pTrue: 70,
        pAlt: 50,
        weight: 55,
      },
    ],
  },
];

const posturePresets = {
  generous: {
    prior: {
      general: 55,
      targeting: 18,
      actType: 8,
      unknownReserve: 2,
    },
    evidence: {
      pTrueBoost: 1.12,
      pAltFactor: 0.18,
      weightFloor: 88,
    },
  },
  corrected: {
    evidence: {
      pTrueBoost: 1,
      pAltFactor: 1,
      weightFloor: null,
    },
  },
};

const alternativeFeatures = [
  {
    id: "decades-late",
    title: "Decades-late composition",
    ratio: 3,
    note: "Later narrative crystallization is easier to understand if memory and tradition developed after the crisis.",
  },
  {
    id: "scripture-wrap",
    title: "Scriptural fulfillment framing",
    ratio: 3,
    note: "Heavy fulfillment framing is expected when a community rereads defeat as vindication.",
  },
  {
    id: "grief-visions",
    title: "Grief-aligned appearances",
    ratio: 2.5,
    note: "Bereavement experiences and visionary interpretation are ordinary human mechanisms.",
  },
  {
    id: "communal-reinforcement",
    title: "Communal reinforcement",
    ratio: 2,
    note: "Tight groups can harmonize and intensify meaning without deliberate fraud.",
  },
  {
    id: "physicalization",
    title: "Increasing physical detail",
    ratio: 2.5,
    note: "A movement toward concrete apologetic detail fits developing tradition.",
  },
  {
    id: "thin-corroboration",
    title: "Thin outside confirmation",
    ratio: 2,
    note: "Limited public confirmation is more expected when the claim grows inside a proclamation stream.",
  },
  {
    id: "early-creed",
    title: "Early creed slogans",
    ratio: 0.8,
    note: "Early summaries can favor reportage somewhat, but they are still insider proclamation.",
  },
  {
    id: "transformation",
    title: "Follower transformation",
    ratio: 2,
    note: "Renewed zeal after disconfirmation is historically familiar and does not settle truth by itself.",
  },
  {
    id: "source-dependence",
    title: "Source dependence",
    ratio: 1.5,
    note: "Shared sources reduce the force of apparent multiplicity.",
  },
  {
    id: "no-conspiracy",
    title: "No conspiracy required",
    ratio: 1.3,
    note: "Sincere meaning-making avoids the false choice between miracle and deliberate lie.",
  },
];

const state = {
  presetId: claimPresets[0].id,
  evidence: [],
  featureWeights: new Map(alternativeFeatures.map((feature) => [feature.id, 1])),
};

const els = {
  preset: document.querySelector("#claim-preset"),
  claim: document.querySelector("#claim-text"),
  generalPrior: document.querySelector("#general-prior"),
  targetingPenalty: document.querySelector("#targeting-penalty"),
  actTypeRate: document.querySelector("#act-type-rate"),
  unknownReserve: document.querySelector("#unknown-reserve"),
  ledgerList: document.querySelector("#ledger-list"),
  featureGrid: document.querySelector("#feature-grid"),
  loadGenerous: document.querySelector("#load-generous"),
  loadCorrected: document.querySelector("#load-corrected"),
  resetCurrent: document.querySelector("#reset-current"),
  startingConfidence: document.querySelector("#starting-confidence"),
  evidenceAdded: document.querySelector("#evidence-added"),
  updatedConfidence: document.querySelector("#updated-confidence"),
  updatedConfidenceNote: document.querySelector("#updated-confidence-note"),
  neededForHigh: document.querySelector("#needed-for-high"),
  neededForHighNote: document.querySelector("#needed-for-high-note"),
  topDriver: document.querySelector("#top-driver"),
  alternativeStrength: document.querySelector("#alternative-strength"),
  resultCopy: document.querySelector("#result-copy"),
  auditScore: document.querySelector("#audit-score"),
  auditSummary: document.querySelector("#audit-summary"),
  scoreRing: document.querySelector("#score-ring"),
  floatingAuditScore: document.querySelector("#floating-audit-score"),
  floatingAuditState: document.querySelector("#floating-audit-state"),
  floatingScoreRing: document.querySelector("#floating-score-ring"),
  pitfallList: document.querySelector("#pitfall-list"),
  repairList: document.querySelector("#repair-list"),
  mathStarting: document.querySelector("#math-starting"),
  mathUpdated: document.querySelector("#math-updated"),
  mathBf: document.querySelector("#math-bf"),
  mathOdds: document.querySelector("#math-odds"),
  mathLogBf: document.querySelector("#math-log-bf"),
  mathRequired50: document.querySelector("#math-required-50"),
  mathRequired90: document.querySelector("#math-required-90"),
  finalReport: document.querySelector("#final-report"),
  aiPrompt: document.querySelector("#ai-prompt"),
  copyReport: document.querySelector("#copy-report"),
  copyAiPrompt: document.querySelector("#copy-ai-prompt"),
};

init();

function init() {
  buildPresetSelect();
  bindEvents();
  loadPreset(state.presetId);
}

function buildPresetSelect() {
  els.preset.innerHTML = claimPresets
    .map((preset) => `<option value="${preset.id}">${escapeHtml(preset.title)}</option>`)
    .join("");
}

function bindEvents() {
  els.preset.addEventListener("change", () => loadPreset(els.preset.value));
  els.claim.addEventListener("input", render);

  [els.generalPrior, els.targetingPenalty, els.actTypeRate, els.unknownReserve].forEach((input) => {
    input.addEventListener("input", render);
  });

  els.loadGenerous.addEventListener("click", () => applyPosture("generous"));
  els.loadCorrected.addEventListener("click", () => applyPosture("corrected"));
  els.resetCurrent.addEventListener("click", () => loadPreset(state.presetId));
  els.copyReport.addEventListener("click", () => copyText(els.finalReport.value, els.copyReport));
  els.copyAiPrompt.addEventListener("click", () => copyText(els.aiPrompt.value, els.copyAiPrompt));
}

function loadPreset(presetId) {
  const preset = claimPresets.find((item) => item.id === presetId);
  state.presetId = preset.id;
  state.evidence = preset.evidence.map((item) => ({ ...item }));
  state.featureWeights = new Map(alternativeFeatures.map((feature) => [feature.id, 1]));

  els.preset.value = preset.id;
  els.claim.value = preset.claim;
  els.generalPrior.value = String(preset.prior.general);
  els.targetingPenalty.value = String(preset.prior.targeting);
  els.actTypeRate.value = String(preset.prior.actType);
  els.unknownReserve.value = String(preset.prior.unknownReserve);

  renderLedger();
  renderFeatures();
  render();
}

function applyPosture(kind) {
  const posture = posturePresets[kind];
  const preset = claimPresets.find((item) => item.id === state.presetId);
  const prior = kind === "corrected" ? preset.prior : posture.prior;

  els.generalPrior.value = String(prior.general);
  els.targetingPenalty.value = String(prior.targeting);
  els.actTypeRate.value = String(prior.actType);
  els.unknownReserve.value = String(prior.unknownReserve);

  state.evidence = preset.evidence.map((item) => ({
    ...item,
    pTrue: clamp(item.pTrue * posture.evidence.pTrueBoost, 1, 99.9),
    pAlt: clamp(item.pAlt * posture.evidence.pAltFactor, 0.01, 99.9),
    weight: posture.evidence.weightFloor ? Math.max(item.weight, posture.evidence.weightFloor) : item.weight,
  }));

  renderLedger();
  render();
}

function renderLedger() {
  els.ledgerList.innerHTML = state.evidence.map(renderEvidenceCard).join("");
  state.evidence.forEach((item) => {
    ["pTrue", "pAlt", "weight"].forEach((key) => {
      const input = document.querySelector(`#${item.id}-${key}`);
      input.addEventListener("input", () => {
        item[key] = Number(input.value);
        render();
      });
    });
  });
}

function renderEvidenceCard(item) {
  return `
    <article class="ledger-card plain-evidence-card" data-evidence-id="${item.id}">
      <header>
        <div>
          <p class="app-step">${escapeHtml(item.type)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
        </div>
        <div class="ledger-live" id="${item.id}-live">
          <span>Evidence lift</span>
          <strong>1x</strong>
        </div>
      </header>

      <div class="ledger-controls plain-evidence-controls">
        ${renderRange({
          id: item.id,
          key: "pTrue",
          label: "Would we expect this if the claim is true?",
          helper: "Higher means this evidence fits the miracle claim well.",
          value: item.pTrue,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "pAlt",
          label: "Would we still expect this if the claim is not true?",
          helper: "Higher means this evidence can also arise through ordinary or alternative pathways.",
          value: item.pAlt,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "weight",
          label: "How independent is this evidence?",
          helper: "Lower this when sources, memories, communities, or traditions overlap.",
          value: item.weight,
          min: 10,
          max: 100,
          step: 1,
        })}
      </div>
    </article>
  `;
}

function renderRange({ id, key, label, helper, value, min, max, step }) {
  return `
    <div class="range-row compact plain-range">
      <div class="range-top">
        <label for="${id}-${key}">${escapeHtml(label)}</label>
        <span class="range-value" id="${id}-${key}-value">${formatPercent(value / 100)}</span>
      </div>
      <p>${escapeHtml(helper)}</p>
      <input id="${id}-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
    </div>
  `;
}

function renderFeatures() {
  els.featureGrid.innerHTML = alternativeFeatures
    .map((feature) => {
      const current = String(state.featureWeights.get(feature.id) ?? 1);
      const options = [
        ["0", "Set aside"],
        ["0.5", "Some"],
        ["1", "Strong"],
      ]
        .map(
          ([value, label]) => `
            <span>
              <input
                id="feature-${feature.id}-${value}"
                type="radio"
                name="feature-${feature.id}"
                value="${value}"
                ${value === current ? "checked" : ""}
              >
              <label for="feature-${feature.id}-${value}">${label}</label>
            </span>
          `,
        )
        .join("");

      return `
        <article class="feature-card plain-feature-card">
          <div>
            <h3>${escapeHtml(feature.title)}</h3>
            <p>${escapeHtml(feature.note)}</p>
          </div>
          <div class="feature-bottom">
            <span>Pathway strength: ${formatLift(feature.ratio)}</span>
            <div class="segmented three">${options}</div>
          </div>
        </article>
      `;
    })
    .join("");

  alternativeFeatures.forEach((feature) => {
    document.querySelectorAll(`[name="feature-${feature.id}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        state.featureWeights.set(feature.id, Number(input.value));
        render();
      });
    });
  });
}

function render() {
  const assessment = assess();
  renderSliderLabels();
  renderEvidenceLive(assessment);
  renderResultStrip(assessment);
  renderWarnings(assessment);
  els.finalReport.value = buildReport(assessment);
  els.aiPrompt.value = buildAiPrompt(assessment);
}

function renderSliderLabels() {
  setPercentLabel("general-prior", Number(els.generalPrior.value) / 100);
  setPercentLabel("targeting-penalty", Number(els.targetingPenalty.value) / 100);
  setPercentLabel("act-type-rate", Number(els.actTypeRate.value) / 100);
  setPercentLabel("unknown-reserve", Number(els.unknownReserve.value) / 100);
}

function renderEvidenceLive(assessment) {
  assessment.items.forEach((item) => {
    setPercentLabel(`${item.id}-pTrue`, item.pTrue / 100);
    setPercentLabel(`${item.id}-pAlt`, item.pAlt / 100);
    setPercentLabel(`${item.id}-weight`, item.weight / 100);
    const live = document.querySelector(`#${item.id}-live`);
    if (!live) return;
    live.querySelector("strong").textContent = formatLift(item.adjustedBf);
    live.querySelector("span").textContent = `${Math.round(item.share * 100)}% of evidence added`;
  });
}

function renderResultStrip(assessment) {
  const scoreColor = getScoreColor(assessment.auditPressure);
  const shortfallText = assessment.shortfall90 > 1
    ? formatLift(assessment.shortfall90)
    : "Enough";

  els.startingConfidence.textContent = formatPercent(assessment.prior);
  els.evidenceAdded.textContent = formatLift(assessment.totalBf);
  els.updatedConfidence.textContent = formatPercent(assessment.posterior);
  els.updatedConfidenceNote.textContent = "After the listed evidence is counted";
  els.neededForHigh.textContent = shortfallText;
  els.neededForHighNote.textContent = assessment.shortfall90 > 1
    ? "more evidence lift needed to reach 90%"
    : "the current inputs already reach 90%";
  els.topDriver.textContent = assessment.topDriver
    ? `Biggest mover: ${assessment.topDriver.title}`
    : "No evidence driver yet";
  els.alternativeStrength.textContent = formatLift(assessment.alternativeBf);
  els.auditScore.textContent = String(assessment.auditPressure);
  els.auditSummary.textContent = summarizePressure(assessment.auditPressure);
  els.resultCopy.textContent = buildPressureCopy(assessment);
  els.scoreRing.style.setProperty("--score", `${assessment.auditPressure}%`);
  els.scoreRing.style.setProperty("--score-color", scoreColor);
  els.floatingAuditScore.textContent = String(assessment.auditPressure);
  els.floatingAuditState.textContent = summarizePressure(assessment.auditPressure);
  els.floatingScoreRing.style.setProperty("--score", `${assessment.auditPressure}%`);
  els.floatingScoreRing.style.setProperty("--score-color", scoreColor);

  els.mathStarting.textContent = formatPercent(assessment.prior);
  els.mathUpdated.textContent = formatPercent(assessment.posterior);
  els.mathBf.textContent = formatLift(assessment.totalBf);
  els.mathOdds.textContent = formatOdds(assessment.posteriorOdds);
  els.mathLogBf.textContent = `log lift ${assessment.totalLogBf.toFixed(2)}`;
  els.mathRequired50.textContent = formatLift(assessment.required[50]);
  els.mathRequired90.textContent = formatLift(assessment.required[90]);
}

function renderWarnings(assessment) {
  els.pitfallList.innerHTML = assessment.flags
    .map((flag) => `<li><strong>${escapeHtml(flag.title)}:</strong> ${escapeHtml(flag.body)}</li>`)
    .join("");

  els.repairList.innerHTML = assessment.repairs
    .map((repair) => `<article class="repair-card"><strong>${escapeHtml(repair.title)}</strong><br>${escapeHtml(repair.body)}</article>`)
    .join("");
}

function assess() {
  const priorParts = {
    general: Number(els.generalPrior.value) / 100,
    targeting: Number(els.targetingPenalty.value) / 100,
    actType: Number(els.actTypeRate.value) / 100,
    unknownReserve: Number(els.unknownReserve.value) / 100,
  };
  const prior = clamp(priorParts.general * priorParts.targeting * priorParts.actType, 0.000000000001, 0.999999);
  const priorOdds = prior / (1 - prior);

  const rawItems = state.evidence.map((item) => {
    const pTrue = clamp(item.pTrue / 100, 0.0001, 0.9999);
    const pAlt = clamp(item.pAlt / 100, 0.0001, 0.9999);
    const independence = item.weight / 100;
    const rawBf = pTrue / pAlt;
    const rawLogBf = Math.log(rawBf);
    const adjustedLogBf = rawLogBf * independence;
    const adjustedBf = Math.exp(adjustedLogBf);

    return {
      ...item,
      pTrue: item.pTrue,
      pAlt: item.pAlt,
      weight: item.weight,
      rawBf,
      rawLogBf,
      adjustedLogBf,
      adjustedBf,
      share: 0,
    };
  });

  const totalLogBf = rawItems.reduce((sum, item) => sum + item.adjustedLogBf, 0);
  const totalBf = Math.exp(totalLogBf);
  const posteriorOdds = priorOdds * totalBf;
  const posterior = posteriorOdds / (1 + posteriorOdds);
  const positiveLog = rawItems.reduce((sum, item) => sum + Math.max(0, item.adjustedLogBf), 0);
  const items = rawItems.map((item) => ({
    ...item,
    share: positiveLog > 0 ? Math.max(0, item.adjustedLogBf) / positiveLog : 0,
  }));
  const topDriver = [...items].sort((a, b) => b.share - a.share)[0];
  const required = {
    50: requiredBfForTarget(priorOdds, 0.5),
    90: requiredBfForTarget(priorOdds, 0.9),
    99: requiredBfForTarget(priorOdds, 0.99),
  };
  const shortfall90 = required[90] / Math.max(totalBf, 0.000000000001);
  const alternativeBf = calculateAlternativeBf();
  const flags = buildFlags({
    prior,
    priorParts,
    items,
    topDriver,
    alternativeBf,
    totalBf,
    required,
    shortfall90,
  });
  const repairs = buildRepairs(flags);
  const auditPressure = calculateAuditPressure(flags, shortfall90, topDriver, priorParts);

  return {
    claim: els.claim.value.trim(),
    prior,
    priorParts,
    priorOdds,
    items,
    totalLogBf,
    totalBf,
    posterior,
    posteriorOdds,
    required,
    shortfall90,
    topDriver,
    alternativeBf,
    flags,
    repairs,
    auditPressure,
  };
}

function buildFlags(context) {
  const flags = [];
  const suppressed = context.items.filter((item) => item.pAlt < 3 && item.pTrue > 50);
  const highDependence = context.items.filter(
    (item) => ["testimony", "literary", "social"].includes(item.type) && item.weight > 82,
  );
  const neutralRows = context.items.filter((item) => item.rawBf >= 0.8 && item.rawBf <= 1.25);
  const sincerityRows = context.items.filter(
    (item) => item.type === "testimony" && item.adjustedBf > 5,
  );

  if (context.prior > 0.01) {
    flags.push({
      title: "The starting point may be too high",
      body: "This specific miracle begins above 1% before the evidence is counted. That can be fair only if the specificity and event-type assumptions are defended.",
      weight: 16,
    });
  }

  if (context.priorParts.general > 0.45 && context.priorParts.targeting > 0.1) {
    flags.push({
      title: "The claim may borrow too much from generic theism",
      body: "Belief that God might exist is not the same as support for this person, this event, this purpose, and this doctrine.",
      weight: 16,
    });
  }

  if (context.priorParts.unknownReserve < 0.05) {
    flags.push({
      title: "Too little room for other explanations",
      body: "The audit leaves little space for unmodeled mechanisms, selection effects, mistaken memory, or explanations not yet considered.",
      weight: 13,
    });
  }

  if (suppressed.length > 0) {
    flags.push({
      title: "Alternative explanations are treated as almost impossible",
      body: `${suppressed.length} evidence item${suppressed.length === 1 ? "" : "s"} make the non-miracle path lower than 3%, which can make the evidence look stronger than it is.`,
      weight: 18,
    });
  }

  if (highDependence.length > 0) {
    flags.push({
      title: "Related evidence may be counted as separate",
      body: `${highDependence.length} testimony, story, or social item${highDependence.length === 1 ? "" : "s"} are treated as highly independent even though source overlap may matter.`,
      weight: 14,
    });
  }

  if (sincerityRows.length > 0) {
    flags.push({
      title: "Sincerity is doing too much work",
      body: "Some testimony is adding a large lift. Separate honest belief, real experience, correct interpretation, and the event actually happening.",
      weight: 12,
    });
  }

  if (neutralRows.length > 0) {
    flags.push({
      title: "Some evidence barely distinguishes the claim",
      body: `${neutralRows.length} item${neutralRows.length === 1 ? " is" : "s are"} close to neutral. That evidence may belong in the story, but it should not be presented as strong confirmation.`,
      weight: 8,
    });
  }

  if (context.topDriver && context.topDriver.share > 0.55) {
    flags.push({
      title: "One evidence item is carrying the case",
      body: `${context.topDriver.title} supplies more than half of the positive movement, so the result is fragile around that single judgment.`,
      weight: 14,
    });
  }

  if (context.shortfall90 > 1000) {
    flags.push({
      title: "The evidence is still far short of high confidence",
      body: "The current evidence would need more than a thousand times additional lift to reach 90% confidence from the entered starting point.",
      weight: 16,
    });
  }

  if (context.alternativeBf > 100) {
    flags.push({
      title: "Sincere meaning-making remains a strong alternative",
      body: "The selected psychology and tradition-development features strongly fit a sincere post-crisis meaning-making pathway.",
      weight: 10,
    });
  }

  if (flags.length === 0) {
    flags.push({
      title: "No major structural warnings",
      body: "The current model avoids the most obvious reasoning traps. The remaining question is whether each slider value can be defended.",
      weight: 2,
    });
  }

  return flags;
}

function buildRepairs(flags) {
  const titles = new Set(flags.map((flag) => flag.title));
  const repairs = [];

  if (titles.has("Alternative explanations are treated as almost impossible")) {
    repairs.push({
      title: "Rebuild the comparison side",
      body: "Add grief visions, rumor growth, memory distortion, literary development, social reinforcement, selection effects, and unknowns before judging how surprising the evidence is without a miracle.",
    });
  }

  if (titles.has("Related evidence may be counted as separate") || titles.has("One evidence item is carrying the case")) {
    repairs.push({
      title: "Lower overlap-sensitive evidence",
      body: "Reduce independence for sources or traditions that share a community, text, memory stream, or apologetic purpose.",
    });
  }

  if (titles.has("The starting point may be too high") || titles.has("The claim may borrow too much from generic theism")) {
    repairs.push({
      title: "Show the full specificity chain",
      body: "Separate general openness to God from this person, this time, this kind of act, and this Christian interpretation.",
    });
  }

  if (titles.has("Sincerity is doing too much work")) {
    repairs.push({
      title: "Separate belief from event truth",
      body: "Ask what sincerity proves, then separately ask whether the experience was interpreted correctly and whether the event occurred.",
    });
  }

  if (titles.has("The evidence is still far short of high confidence")) {
    repairs.push({
      title: "State the burden plainly",
      body: "Before saying the case is strong, report how much more evidence lift is needed to reach high confidence.",
    });
  }

  if (repairs.length === 0) {
    repairs.push({
      title: "Keep the assumptions visible",
      body: "Export the report and ask whether a fair critic could change any one slider without collapsing the conclusion.",
    });
  }

  return repairs;
}

function calculateAuditPressure(flags, shortfall90, topDriver, priorParts) {
  const flagScore = flags.reduce((sum, flag) => sum + flag.weight, 0);
  const shortfallScore = clamp(Math.log10(Math.max(shortfall90, 1)) * 9, 0, 26);
  const driverScore = topDriver ? clamp((topDriver.share - 0.35) * 48, 0, 18) : 0;
  const reserveScore = priorParts.unknownReserve < 0.05 ? 8 : 0;
  return Math.round(clamp(flagScore + shortfallScore + driverScore + reserveScore, 0, 100));
}

function calculateAlternativeBf() {
  return alternativeFeatures.reduce((product, feature) => {
    const weight = state.featureWeights.get(feature.id) ?? 1;
    return product * Math.pow(feature.ratio, weight);
  }, 1);
}

function requiredBfForTarget(priorOdds, target) {
  const targetOdds = target / (1 - target);
  return targetOdds / priorOdds;
}

function setPercentLabel(id, value) {
  const label = document.querySelector(`#${id}-value`);
  if (label) label.textContent = formatPercent(value);
}

function summarizePressure(score) {
  if (score >= 75) return "Severe audit pressure";
  if (score >= 50) return "High audit pressure";
  if (score >= 25) return "Moderate audit pressure";
  return "Low audit pressure";
}

function buildPressureCopy(assessment) {
  if (assessment.auditPressure >= 75) {
    return "The case currently depends on fragile or under-defended assumptions. A confident conclusion would need stronger alternative-side work, overlap correction, and clearer evidence burden.";
  }

  if (assessment.auditPressure >= 50) {
    return "Several assumptions are carrying more than they can currently justify. The conclusion should be softened unless the warnings can be answered.";
  }

  if (assessment.auditPressure >= 25) {
    return "The structure is partly disciplined, but some assumptions still deserve scrutiny before the claim is treated as well substantiated.";
  }

  return "The model is structurally modest. The remaining question is whether the entered judgments are independently defensible.";
}

function buildReport(assessment) {
  const lines = [
    "# Crosshairs Resurrection Evidence Audit",
    "",
    `Claim: ${assessment.claim || "Not supplied"}`,
    "",
    "## Plain-Language Result",
    `Starting confidence: ${formatPercent(assessment.prior)}`,
    `Evidence added: ${formatLift(assessment.totalBf)}`,
    `Updated confidence: ${formatPercent(assessment.posterior)}`,
    `More evidence needed for 90% confidence: ${assessment.shortfall90 > 1 ? formatLift(assessment.shortfall90) : "none under current inputs"}`,
    `Biggest mover: ${assessment.topDriver ? assessment.topDriver.title : "None"} (${Math.round((assessment.topDriver?.share || 0) * 100)}% of positive movement)`,
    `Sincere meaning-making pathway strength: ${formatLift(assessment.alternativeBf)}`,
    `Audit pressure: ${assessment.auditPressure}/100 (${summarizePressure(assessment.auditPressure)})`,
    "",
    "## Starting Point",
    `Openness to divine action in general: ${formatPercent(assessment.priorParts.general)}`,
    `Specificity allowance for this claim: ${formatPercent(assessment.priorParts.targeting)}`,
    `Commonness of this kind of event: ${formatPercent(assessment.priorParts.actType)}`,
    `Room left for other explanations: ${formatPercent(assessment.priorParts.unknownReserve)}`,
    "",
    "## Evidence Questions",
    ...assessment.items.map(
      (item) =>
        `- ${item.title}: expected if true ${formatPercent(item.pTrue / 100)}, still expected if not true ${formatPercent(item.pAlt / 100)}, independent ${Math.round(item.weight)}%, evidence lift ${formatLift(item.adjustedBf)}.`,
    ),
    "",
    "## Warnings",
    ...assessment.flags.map((flag) => `- ${flag.title}: ${flag.body}`),
    "",
    "## Repair Moves",
    ...assessment.repairs.map((repair) => `- ${repair.title}: ${repair.body}`),
    "",
    "## Math Details",
    `Former prior: ${formatPercent(assessment.prior)}`,
    `Former posterior: ${formatPercent(assessment.posterior)}`,
    `Bayes factor / evidence lift: ${formatFactor(assessment.totalBf)}`,
    `Log evidence lift: ${assessment.totalLogBf.toFixed(2)}`,
    `Posterior odds: ${formatOdds(assessment.posteriorOdds)}`,
    `Lift needed for 50%: ${formatLift(assessment.required[50])}`,
    `Lift needed for 90%: ${formatLift(assessment.required[90])}`,
    `Lift needed for 99%: ${formatLift(assessment.required[99])}`,
  ];

  return lines.join("\n");
}

function buildAiPrompt(assessment) {
  return [
    "You are auditing a Christian evidential claim for plain-language probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
    "",
    "Use plain terms first:",
    "- Starting confidence = prior.",
    "- Updated confidence = posterior.",
    "- Evidence lift = Bayes factor.",
    "- 'Would we expect this if true?' = P(E|H).",
    "- 'Would we still expect this if not true?' = P(E|not-H).",
    "- Independent evidence = dependence correction.",
    "- Room for other explanations = unknown reserve.",
    "",
    "Checks to apply: inflated starting point, specificity cost, suppressed alternatives, false independence, sincerity vs event truth, transfer from ordinary details to miracle truth, truncated alternatives, missing unknown reserve, neutral evidence, and fragility.",
    "",
    buildReport(assessment),
    "",
    "Questions to answer:",
    "1. Which assumption is doing the most work?",
    "2. Which 'still expected if not true' values are too low, if any?",
    "3. Which evidence items should be lowered for overlap or dependence?",
    "4. What updated confidence range results under cautious and generous assumptions?",
    "5. What claim would be proportionate to the evidence actually entered?",
  ].join("\n");
}

async function copyText(text, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch (error) {
    button.textContent = "Copy failed";
  }

  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function formatPercent(value) {
  if (value === 0) return "0%";
  const percent = value * 100;
  if (percent < 0.000001) return "less than 0.000001%";
  if (percent < 0.01) return `${trimNumber(percent, 5)}%`;
  if (percent < 0.1) return `${trimNumber(percent, 3)}%`;
  return `${trimNumber(percent, 1)}%`;
}

function formatFactor(value) {
  if (!Number.isFinite(value)) return "infinite";
  if (value === 0) return "0";
  if (value < 0.001) return "less than 0.001";
  if (value >= 1000000000000) return formatLargeFactor(value);
  if (value >= 100000) return (Math.round(value / 1000) * 1000).toLocaleString();
  if (value >= 1000) return Math.round(value).toLocaleString();
  if (value >= 100) return trimNumber(value, 1);
  if (value >= 10) return trimNumber(value, 2);
  return trimNumber(value, 2);
}

function formatLift(value) {
  return `${formatFactor(value)}x`;
}

function formatOdds(odds) {
  if (!Number.isFinite(odds)) return "infinite";
  if (odds >= 1) return `${formatFactor(odds)}:1`;
  return `1:${formatFactor(1 / odds)}`;
}

function getScoreColor(score) {
  if (score >= 75) return "#5b1705";
  if (score >= 50) return "#9a3d00";
  if (score >= 25) return "#b76600";
  return "#5f5400";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function trimNumber(value, digits) {
  return value
    .toFixed(digits)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
}

function formatLargeFactor(value) {
  const units = [
    [1000000000000000, "quadrillion"],
    [1000000000000, "trillion"],
  ];
  const [divisor, label] = units.find(([unit]) => value >= unit);
  const scaled = value / divisor;
  return `${trimNumber(scaled, scaled >= 100 ? 0 : 1)} ${label}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
