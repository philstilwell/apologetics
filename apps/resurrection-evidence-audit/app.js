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
        note: "Expected under resurrection and non-resurrection hypotheses; it anchors the story but barely discriminates.",
        pTrue: 95,
        pAlt: 90,
        weight: 100,
      },
      {
        id: "appearances",
        title: "Post-mortem appearances",
        type: "testimony",
        note: "The major swing point; the denominator must include grief visions, memory, rumor, and communal reinforcement.",
        pTrue: 90,
        pAlt: 20,
        weight: 55,
      },
      {
        id: "conversions",
        title: "Conversions and costly commitment",
        type: "testimony",
        note: "Sincerity can support belief that experiences occurred, but it does not directly validate the event.",
        pTrue: 70,
        pAlt: 10,
        weight: 70,
      },
      {
        id: "empty-tomb",
        title: "Empty tomb tradition",
        type: "literary",
        note: "Natural complement space includes mislocation, reburial, theological narrative, and later development.",
        pTrue: 60,
        pAlt: 20,
        weight: 60,
      },
      {
        id: "movement-growth",
        title: "Early creed and movement growth",
        type: "social",
        note: "Growth, slogans, and community persistence are often expected under both sincere postdiction and miracle claims.",
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
        note: "Sincerity and confidence must be separated from event truth.",
        pTrue: 85,
        pAlt: 25,
        weight: 70,
      },
      {
        id: "medical",
        title: "Medical or external record",
        type: "public",
        note: "Independent documentation can matter, but unexplained recovery is not automatically Christian intervention.",
        pTrue: 75,
        pAlt: 35,
        weight: 85,
      },
      {
        id: "specific-prayer",
        title: "Specific prayer timing",
        type: "timing",
        note: "Timing evidence must be compared against selection effects and unreported misses.",
        pTrue: 70,
        pAlt: 30,
        weight: 65,
      },
      {
        id: "attribution",
        title: "Christian attribution",
        type: "specificity",
        note: "Attribution to a specific deity or doctrine carries extra targeting cost.",
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
        note: "The baseline probability of the outcome matters before prayer is counted as explanatory.",
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
        note: "Shared confidence can stabilize interpretation without adding much event-level discrimination.",
        pTrue: 80,
        pAlt: 60,
        weight: 45,
      },
      {
        id: "no-clear-alternative",
        title: "No clear alternative named",
        type: "unknowns",
        note: "Not naming an alternative is not the same as eliminating the complement.",
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
    prior: {
      general: 20,
      targeting: 1,
      actType: 0.5,
      unknownReserve: 10,
    },
    evidence: {
      pTrueBoost: 1,
      pAltFactor: 1,
      weightFloor: null,
    },
  },
};

const postdictionFeatures = [
  {
    id: "decades-late",
    title: "Decades-late composition",
    ratio: 3,
    note: "Later narrative crystallization is more expected if memory and tradition developed after crisis.",
  },
  {
    id: "scripture-wrap",
    title: "Scriptural fulfillment framing",
    ratio: 3,
    note: "Heavy retrofitting is expected under reinterpretation after disconfirmation.",
  },
  {
    id: "grief-visions",
    title: "Grief-aligned appearances",
    ratio: 2.5,
    note: "Bereavement experiences and visionary interpretation are ordinary psychological mechanisms.",
  },
  {
    id: "communal-reinforcement",
    title: "Communal reinforcement",
    ratio: 2,
    note: "Tight groups can harmonize and intensify meaning without deliberate fraud.",
  },
  {
    id: "physicalization",
    title: "Increasing physicalization",
    ratio: 2.5,
    note: "A trajectory toward concrete apologetic detail fits developing tradition.",
  },
  {
    id: "thin-corroboration",
    title: "Thin external corroboration",
    ratio: 2,
    note: "Limited public confirmation is more expected under an internal proclamation stream.",
  },
  {
    id: "early-creed",
    title: "Early creed slogans",
    ratio: 0.8,
    note: "Early summaries can slightly favor resurrection reportage, but they are still insider proclamation.",
  },
  {
    id: "transformation",
    title: "Follower transformation",
    ratio: 2,
    note: "Renewed zeal after disconfirmation is historically familiar and not truth-discriminating by itself.",
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
    note: "Sincere postdiction avoids the false choice between miracle and deliberate lie.",
  },
];

const state = {
  presetId: claimPresets[0].id,
  evidence: [],
  featureWeights: new Map(postdictionFeatures.map((feature) => [feature.id, 1])),
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
  posteriorValue: document.querySelector("#posterior-value"),
  posteriorOdds: document.querySelector("#posterior-odds"),
  actualBf: document.querySelector("#actual-bf"),
  actualLogBf: document.querySelector("#actual-log-bf"),
  requiredBf: document.querySelector("#required-bf"),
  bfShortfall: document.querySelector("#bf-shortfall"),
  topDriver: document.querySelector("#top-driver"),
  driverShare: document.querySelector("#driver-share"),
  required50: document.querySelector("#required-50"),
  required90: document.querySelector("#required-90"),
  required99: document.querySelector("#required-99"),
  auditScore: document.querySelector("#audit-score"),
  auditSummary: document.querySelector("#audit-summary"),
  auditCopy: document.querySelector("#audit-copy"),
  scoreRing: document.querySelector("#score-ring"),
  pitfallList: document.querySelector("#pitfall-list"),
  repairList: document.querySelector("#repair-list"),
  postdictionBf: document.querySelector("#postdiction-bf"),
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
    <article class="ledger-card" data-evidence-id="${item.id}">
      <header>
        <div>
          <p class="app-step">${escapeHtml(item.type)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
        </div>
        <div class="ledger-live" id="${item.id}-live">
          <span>BF</span>
          <strong>1</strong>
        </div>
      </header>

      <div class="ledger-controls">
        ${renderRange(item.id, "pTrue", "P(E|claim)", item.pTrue, 0.01, 99.9, 0.01)}
        ${renderRange(item.id, "pAlt", "P(E|not claim)", item.pAlt, 0.01, 99.9, 0.01)}
        ${renderRange(item.id, "weight", "Independence weight", item.weight, 10, 100, 1)}
      </div>
    </article>
  `;
}

function renderRange(id, key, label, value, min, max, step) {
  return `
    <div class="range-row compact">
      <div class="range-top">
        <label for="${id}-${key}">${label}</label>
        <span class="range-value" id="${id}-${key}-value">${formatPercent(value / 100)}</span>
      </div>
      <input id="${id}-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
    </div>
  `;
}

function renderFeatures() {
  els.featureGrid.innerHTML = postdictionFeatures
    .map((feature) => {
      const options = [
        ["0", "Ignore"],
        ["0.5", "Weak"],
        ["1", "Full"],
      ]
        .map(
          ([value, label]) => `
            <span>
              <input
                id="feature-${feature.id}-${value}"
                type="radio"
                name="feature-${feature.id}"
                value="${value}"
                ${value === "1" ? "checked" : ""}
              >
              <label for="feature-${feature.id}-${value}">${label}</label>
            </span>
          `,
        )
        .join("");

      return `
        <article class="feature-card">
          <div>
            <h3>${escapeHtml(feature.title)}</h3>
            <p>${escapeHtml(feature.note)}</p>
          </div>
          <div class="feature-bottom">
            <span>LR ${feature.ratio.toFixed(1)}</span>
            <div class="segmented three">${options}</div>
          </div>
        </article>
      `;
    })
    .join("");

  postdictionFeatures.forEach((feature) => {
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
  renderPriorLabels();
  renderLedgerLive(assessment);
  renderDashboard(assessment);
  renderPitfalls(assessment);
  els.finalReport.value = buildReport(assessment);
  els.aiPrompt.value = buildAiPrompt(assessment);
}

function renderPriorLabels() {
  setPercentLabel("general-prior", Number(els.generalPrior.value) / 100);
  setPercentLabel("targeting-penalty", Number(els.targetingPenalty.value) / 100);
  setPercentLabel("act-type-rate", Number(els.actTypeRate.value) / 100);
  setPercentLabel("unknown-reserve", Number(els.unknownReserve.value) / 100);
}

function renderLedgerLive(assessment) {
  assessment.items.forEach((item) => {
    setPercentLabel(`${item.id}-pTrue`, item.pTrue / 100);
    setPercentLabel(`${item.id}-pAlt`, item.pAlt / 100);
    setPercentLabel(`${item.id}-weight`, item.weight / 100);
    const live = document.querySelector(`#${item.id}-live`);
    if (!live) return;
    live.querySelector("strong").textContent = formatFactor(item.adjustedBf);
    live.querySelector("span").textContent = `${Math.round(item.share * 100)}% swing`;
  });
}

function renderDashboard(assessment) {
  const scoreColor = getScoreColor(assessment.auditPressure);
  els.posteriorValue.textContent = formatPercent(assessment.posterior);
  els.posteriorOdds.textContent = `odds ${formatOdds(assessment.posteriorOdds)}`;
  els.actualBf.textContent = formatFactor(assessment.totalBf);
  els.actualLogBf.textContent = `log BF ${assessment.totalLogBf.toFixed(2)}`;
  els.requiredBf.textContent = formatFactor(assessment.required[90]);
  els.bfShortfall.textContent = assessment.shortfall90 > 1
    ? `${formatFactor(assessment.shortfall90)} more evidence needed`
    : "meets the 90% threshold";
  els.topDriver.textContent = assessment.topDriver ? assessment.topDriver.title : "None";
  els.driverShare.textContent = `${Math.round((assessment.topDriver?.share || 0) * 100)}% of update`;
  els.required50.textContent = formatFactor(assessment.required[50]);
  els.required90.textContent = formatFactor(assessment.required[90]);
  els.required99.textContent = formatFactor(assessment.required[99]);
  els.auditScore.textContent = String(assessment.auditPressure);
  els.auditSummary.textContent = summarizePressure(assessment.auditPressure);
  els.auditCopy.textContent = buildPressureCopy(assessment);
  els.scoreRing.style.setProperty("--score", `${assessment.auditPressure}%`);
  els.scoreRing.style.setProperty("--score-color", scoreColor);
  els.postdictionBf.textContent = formatFactor(assessment.postdictionBf);
}

function renderPitfalls(assessment) {
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
  const postdictionBf = calculatePostdictionBf();
  const flags = buildFlags({
    prior,
    priorParts,
    items,
    topDriver,
    postdictionBf,
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
    postdictionBf,
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
      title: "Targeted prior is doing heavy work",
      body: "The prior for this specific miracle is above 1%; the targeting and act-type costs need independent defense.",
      weight: 16,
    });
  }

  if (context.priorParts.general > 0.45 && context.priorParts.targeting > 0.1) {
    flags.push({
      title: "Possible prior stacking",
      body: "Generic theism appears to be carrying a highly specific Christian intervention without enough partition cost.",
      weight: 16,
    });
  }

  if (context.priorParts.unknownReserve < 0.05) {
    flags.push({
      title: "Unknown reserve too thin",
      body: "The complement leaves little room for unmodeled natural mechanisms, selection effects, or long-tail alternatives.",
      weight: 13,
    });
  }

  if (suppressed.length > 0) {
    flags.push({
      title: "Suppressed alternative likelihood",
      body: `${suppressed.length} evidence row${suppressed.length === 1 ? "" : "s"} set P(E|not claim) below 3%, which can manufacture huge Bayes factors.`,
      weight: 18,
    });
  }

  if (highDependence.length > 0) {
    flags.push({
      title: "Dependence inflation",
      body: `${highDependence.length} testimony, literary, or social row${highDependence.length === 1 ? "" : "s"} retain very high independence weight.`,
      weight: 14,
    });
  }

  if (sincerityRows.length > 0) {
    flags.push({
      title: "Sincerity-to-truth transfer",
      body: "Testimony rows are producing large Bayes factors; separate sincerity, experience, interpretation, and event truth.",
      weight: 12,
    });
  }

  if (neutralRows.length > 0) {
    flags.push({
      title: "Bayes-neutral evidence counted",
      body: `${neutralRows.length} row${neutralRows.length === 1 ? " is" : "s are"} close to BF 1 and should not be rhetorically treated as strong confirmation.`,
      weight: 8,
    });
  }

  if (context.topDriver && context.topDriver.share > 0.55) {
    flags.push({
      title: "Single swing driver",
      body: `${context.topDriver.title} supplies more than half of the positive update, so the posterior is fragile around that row.`,
      weight: 14,
    });
  }

  if (context.shortfall90 > 1000) {
    flags.push({
      title: "Required evidence gap",
      body: "The current Bayes factor is more than three orders of magnitude short of the 90% threshold.",
      weight: 16,
    });
  }

  if (context.postdictionBf > 100) {
    flags.push({
      title: "Postdiction pressure active",
      body: "The selected psychology and tradition-development features strongly favor postdiction over literal reportage.",
      weight: 10,
    });
  }

  if (flags.length === 0) {
    flags.push({
      title: "No major structural flags",
      body: "The current model avoids the most obvious Bayesian pitfalls, though the numeric assumptions still need defense.",
      weight: 2,
    });
  }

  return flags;
}

function buildRepairs(flags) {
  const titles = new Set(flags.map((flag) => flag.title));
  const repairs = [];

  if (titles.has("Suppressed alternative likelihood")) {
    repairs.push({
      title: "Rebuild the denominator",
      body: "Model grief visions, rumor cascades, memory distortion, legendary growth, incentive structures, and unknowns before assigning P(E|not claim).",
    });
  }

  if (titles.has("Dependence inflation") || titles.has("Single swing driver")) {
    repairs.push({
      title: "Run a dependence sweep",
      body: "Lower independence weights for shared traditions, source dependence, and community clustering; then report the posterior band rather than a point result.",
    });
  }

  if (titles.has("Targeted prior is doing heavy work") || titles.has("Possible prior stacking")) {
    repairs.push({
      title: "Publish the prior chain",
      body: "Show the move from generic theism to this person, this time, this purpose, this act type, and this doctrinal interpretation.",
    });
  }

  if (titles.has("Sincerity-to-truth transfer")) {
    repairs.push({
      title: "Separate testimony layers",
      body: "Treat honest testimony, real experience, correct interpretation, and actual miracle as distinct conditional steps.",
    });
  }

  if (titles.has("Required evidence gap")) {
    repairs.push({
      title: "State the evidence burden plainly",
      body: "Report how much Bayes-factor weight is needed for 50%, 90%, and 99% confidence before declaring the case cumulative.",
    });
  }

  if (repairs.length === 0) {
    repairs.push({
      title: "Keep assumptions visible",
      body: "Export the report and ask whether a critic could adjust any one assumption without collapsing the conclusion.",
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

function calculatePostdictionBf() {
  return postdictionFeatures.reduce((product, feature) => {
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
    return "The model depends on fragile or under-defended assumptions. A confident conclusion would need stronger denominator work, dependence correction, and sensitivity reporting.";
  }

  if (assessment.auditPressure >= 50) {
    return "Several assumptions are carrying more than they can currently justify. The conclusion should be softened unless the flagged variables can be defended.";
  }

  if (assessment.auditPressure >= 25) {
    return "The structure is partly disciplined, but some assumptions still deserve scrutiny before the claim is treated as substantiated.";
  }

  return "The model is structurally modest. The remaining question is whether the entered probabilities are independently defensible.";
}

function buildReport(assessment) {
  const lines = [
    "# Crosshairs Resurrection Evidence Audit",
    "",
    `Claim: ${assessment.claim || "Not supplied"}`,
    "",
    "## Prior Chain",
    `General divine-action prior: ${formatPercent(assessment.priorParts.general)}`,
    `Targeting specificity: ${formatPercent(assessment.priorParts.targeting)}`,
    `Act-type rate: ${formatPercent(assessment.priorParts.actType)}`,
    `Targeted prior: ${formatPercent(assessment.prior)}`,
    `Unknown reserve: ${formatPercent(assessment.priorParts.unknownReserve)}`,
    "",
    "## Evidence Ledger",
    ...assessment.items.map(
      (item) =>
        `- ${item.title}: P(E|claim) ${formatPercent(item.pTrue / 100)}, P(E|not claim) ${formatPercent(item.pAlt / 100)}, independence ${Math.round(item.weight)}%, adjusted BF ${formatFactor(item.adjustedBf)}.`,
    ),
    "",
    "## Results",
    `Actual BF: ${formatFactor(assessment.totalBf)} (log BF ${assessment.totalLogBf.toFixed(2)})`,
    `Posterior: ${formatPercent(assessment.posterior)} (${formatOdds(assessment.posteriorOdds)} odds)`,
    `BF needed for 50%: ${formatFactor(assessment.required[50])}`,
    `BF needed for 90%: ${formatFactor(assessment.required[90])}`,
    `BF needed for 99%: ${formatFactor(assessment.required[99])}`,
    `Top swing driver: ${assessment.topDriver ? assessment.topDriver.title : "None"} (${Math.round((assessment.topDriver?.share || 0) * 100)}%)`,
    `Postdiction BF: ${formatFactor(assessment.postdictionBf)}`,
    `Audit pressure: ${assessment.auditPressure}/100 (${summarizePressure(assessment.auditPressure)})`,
    "",
    "## Flags",
    ...assessment.flags.map((flag) => `- ${flag.title}: ${flag.body}`),
    "",
    "## Repairs",
    ...assessment.repairs.map((repair) => `- ${repair.title}: ${repair.body}`),
  ];

  return lines.join("\n");
}

function buildAiPrompt(assessment) {
  return [
    "You are auditing a Christian evidential claim for probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
    "",
    "Use these checks: prior stacking, specificity/targeting cost, suppressed P(E|not-H), false independence, testimony sincerity vs event truth, likelihood transfer from mundane details to miracles, truncated alternatives, no unknown reserve, Bayes-neutral evidence, and posterior fragility.",
    "",
    buildReport(assessment),
    "",
    "Questions to answer:",
    "1. Which assumption is doing the most work?",
    "2. Which P(E|not-H) values are too low, if any?",
    "3. Which evidence rows should be down-weighted for dependence?",
    "4. What posterior band results under modest skeptical and generous assumptions?",
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
  if (value < 0.000001) return `${(value * 100).toExponential(2)}%`;
  if (value < 0.001) return `${(value * 100).toFixed(5)}%`;
  if (value < 0.01) return `${(value * 100).toFixed(3)}%`;
  if (value < 0.1) return `${(value * 100).toFixed(2)}%`;
  return `${(value * 100).toFixed(1)}%`;
}

function formatFactor(value) {
  if (!Number.isFinite(value)) return "infinite";
  if (value === 0) return "0";
  if (value >= 100000 || value < 0.001) return value.toExponential(2);
  if (value >= 1000) return Math.round(value).toLocaleString();
  if (value >= 100) return value.toFixed(1);
  if (value >= 10) return value.toFixed(2);
  return value.toFixed(3);
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
