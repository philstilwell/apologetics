const STORAGE_KEY = "belief-overreach-audit-v1";
const EVIDENCE_PROBABILITY = 1 / 6;
const EVIDENCE_PERCENT = Number((EVIDENCE_PROBABILITY * 100).toFixed(1));
const DICE_PER_BATCH = 10;
const MAX_BATCHES = 30;

const severityOptions = [
  {
    id: "minor",
    label: "Minor inconvenience",
    weight: 1,
    detail: "Each shortfall wastes a little time or creates a small inconvenience.",
    singularUnit: "minor setback",
    pluralUnit: "minor setbacks"
  },
  {
    id: "money",
    label: "Budget strain",
    weight: 2.3,
    detail: "Each shortfall costs money, effort, or emotional bandwidth.",
    singularUnit: "costly setback",
    pluralUnit: "costly setbacks"
  },
  {
    id: "safety",
    label: "Safety margin loss",
    weight: 4.2,
    detail: "Each shortfall removes backup room and leaves you more exposed.",
    singularUnit: "safety loss",
    pluralUnit: "safety losses"
  },
  {
    id: "catastrophic",
    label: "Single-point exposure",
    weight: 7,
    detail: "Each shortfall lands on something you cannot easily replace or retry.",
    singularUnit: "critical setback",
    pluralUnit: "critical setbacks"
  }
];

const transferClaims = [
  {
    id: "worship",
    title: "Which god, if any, should I worship?",
    prompt: "One god or one religious path deserves worship strongly enough to justify allegiance, ritual, obedience, and identity.",
    tension:
      "If the support is thinner than the confidence, faith can push a person to worship one god, reject rivals, or reject no-worship paths without enough evidence to license that choice.",
    suggestedEvidence: 24,
    suggestedBelief: 76
  },
  {
    id: "prayer",
    title: "Answered prayer",
    prompt: "A prayer request is more likely to be fulfilled because it was prayed for.",
    tension:
      "The danger enters when misses stop lowering confidence and start getting redescribed as hidden wisdom, timing, or mystery instead.",
    suggestedEvidence: 28,
    suggestedBelief: 74
  },
  {
    id: "healing",
    title: "Divine healing",
    prompt: "Prayer or divine action produces healings that should outperform ordinary recovery alone.",
    tension:
      "The pressure point is whether surprising recoveries are allowed to count for the claim while ordinary declines and misses are protected from counting against it.",
    suggestedEvidence: 22,
    suggestedBelief: 67
  },
  {
    id: "guidance",
    title: "Divine guidance",
    prompt: "God gives believers guidance or insight that outperforms ordinary reflection, advice, and luck.",
    tension:
      "The danger appears when successful calls are remembered as guidance while bad calls, mixed results, and vague impressions do little to lower confidence.",
    suggestedEvidence: 31,
    suggestedBelief: 78
  },
  {
    id: "resurrection",
    title: "Resurrection case",
    prompt: "The resurrection is historically supported strongly enough to justify very high confidence.",
    tension:
      "The pressure point is whether testimony, argument, and background assumptions are being asked to carry a level of certainty they do not themselves provide.",
    suggestedEvidence: 38,
    suggestedBelief: 84
  }
];

const commitments = [
  {
    id: "worship",
    label: "Give worship, obedience, or loyalty to it",
    detail: "Let the claim direct prayer, ritual, obedience, or identity.",
    weight: 3.1
  },
  {
    id: "exclude",
    label: "Reject rival gods or no-god paths",
    detail: "Use the claim to rule out alternative worship options or non-worship entirely.",
    weight: 2.5
  },
  {
    id: "share",
    label: "Tell others the claim is settled",
    detail: "Present the conclusion as already established rather than still under live review.",
    weight: 1.2
  },
  {
    id: "filter",
    label: "Use it to dismiss alternatives",
    detail: "Let the claim stop comparison with rival explanations or ordinary causes.",
    weight: 1.6
  },
  {
    id: "decide",
    label: "Make a major life decision on it",
    detail: "Let the claim direct relationships, time, vocation, location, or identity.",
    weight: 2.6
  },
  {
    id: "delay",
    label: "Delay ordinary fallback options",
    detail: "Hold off on safer or more ordinary routes because the claim feels solid enough already.",
    weight: 2.9
  },
  {
    id: "moralize",
    label: "Treat doubt as a character problem",
    detail: "Explain disagreement mainly in terms of spiritual or moral failure rather than evidential limits.",
    weight: 1.8
  }
];

const defaultState = {
  confidence: 58,
  severity: "money",
  transferClaim: "worship",
  transferEvidence: 24,
  transferBelief: 76,
  commitments: ["worship", "exclude", "decide"],
  simulation: {
    rounds: []
  }
};

const elements = {
  targetDie: document.querySelector("#targetDie"),
  lastDie: document.querySelector("#lastDie"),
  lastRollLabel: document.querySelector("#lastRollLabel"),
  metricEvidence: document.querySelector("#metricEvidence"),
  metricConfidence: document.querySelector("#metricConfidence"),
  metricConfidenceNote: document.querySelector("#metricConfidenceNote"),
  metricGap: document.querySelector("#metricGap"),
  metricGapNote: document.querySelector("#metricGapNote"),
  metricExposure: document.querySelector("#metricExposure"),
  metricExposureNote: document.querySelector("#metricExposureNote"),
  confidenceRange: document.querySelector("#confidenceRange"),
  confidenceReadout: document.querySelector("#confidenceReadout"),
  quickConfidenceButtons: document.querySelector("#quickConfidenceButtons"),
  gaugeEvidenceLabel: document.querySelector("#gaugeEvidenceLabel"),
  gaugeGapLabel: document.querySelector("#gaugeGapLabel"),
  gaugeEvidenceBar: document.querySelector("#gaugeEvidenceBar"),
  gaugeFaithBar: document.querySelector("#gaugeFaithBar"),
  gaugePointer: document.querySelector("#gaugePointer"),
  gaugeGapNote: document.querySelector("#gaugeGapNote"),
  confidenceCaption: document.querySelector("#confidenceCaption"),
  bridgeSupported: document.querySelector("#bridgeSupported"),
  bridgeOverhang: document.querySelector("#bridgeOverhang"),
  bridgeEvidenceMarker: document.querySelector("#bridgeEvidenceMarker"),
  bridgeBeliefMarker: document.querySelector("#bridgeBeliefMarker"),
  bridgeSupportedLabel: document.querySelector("#bridgeSupportedLabel"),
  bridgeOverhangLabel: document.querySelector("#bridgeOverhangLabel"),
  bridgeShareLabel: document.querySelector("#bridgeShareLabel"),
  bridgeCaption: document.querySelector("#bridgeCaption"),
  traceStatus: document.querySelector("#traceStatus"),
  traceCaption: document.querySelector("#traceCaption"),
  severityOptions: document.querySelector("#severityOptions"),
  runSimulation: document.querySelector("#runSimulation"),
  resetSimulation: document.querySelector("#resetSimulation"),
  stakesCaption: document.querySelector("#stakesCaption"),
  evidenceHits: document.querySelector("#evidenceHits"),
  plannedHits: document.querySelector("#plannedHits"),
  cumulativeRate: document.querySelector("#cumulativeRate"),
  actualHits: document.querySelector("#actualHits"),
  runShortfall: document.querySelector("#runShortfall"),
  rollStrip: document.querySelector("#rollStrip"),
  consequenceSummary: document.querySelector("#consequenceSummary"),
  consequenceStrip: document.querySelector("#consequenceStrip"),
  simulationCaption: document.querySelector("#simulationCaption"),
  regressionStatus: document.querySelector("#regressionStatus"),
  regressionChart: document.querySelector("#regressionChart"),
  regressionCaption: document.querySelector("#regressionCaption"),
  evidencePlannerPlan: document.querySelector("#evidencePlannerPlan"),
  faithPlannerPlan: document.querySelector("#faithPlannerPlan"),
  decisionPenalty: document.querySelector("#decisionPenalty"),
  decisionPenaltyNote: document.querySelector("#decisionPenaltyNote"),
  longRunCost: document.querySelector("#longRunCost"),
  longRunCostNote: document.querySelector("#longRunCostNote"),
  claimButtons: document.querySelector("#claimButtons"),
  claimTitle: document.querySelector("#claimTitle"),
  claimPrompt: document.querySelector("#claimPrompt"),
  claimTension: document.querySelector("#claimTension"),
  transferEvidenceRange: document.querySelector("#transferEvidenceRange"),
  transferEvidenceReadout: document.querySelector("#transferEvidenceReadout"),
  transferBeliefRange: document.querySelector("#transferBeliefRange"),
  transferBeliefReadout: document.querySelector("#transferBeliefReadout"),
  transferGaugeSupport: document.querySelector("#transferGaugeSupport"),
  transferEvidenceBar: document.querySelector("#transferEvidenceBar"),
  transferFaithBar: document.querySelector("#transferFaithBar"),
  transferPointer: document.querySelector("#transferPointer"),
  transferGapReadout: document.querySelector("#transferGapReadout"),
  transferGapNote: document.querySelector("#transferGapNote"),
  commitmentGrid: document.querySelector("#commitmentGrid"),
  dieSummaryTitle: document.querySelector("#dieSummaryTitle"),
  dieSummaryText: document.querySelector("#dieSummaryText"),
  transferSummaryTitle: document.querySelector("#transferSummaryTitle"),
  transferSummaryText: document.querySelector("#transferSummaryText"),
  summaryOutput: document.querySelector("#summaryOutput"),
  copySummary: document.querySelector("#copySummary"),
  copyStatus: document.querySelector("#copyStatus")
};

const state = loadState();

renderDieFace(elements.targetDie, 6);
renderClaimButtons();
renderSeverityOptions();
renderCommitmentOptions();
ensureSimulation();
bindEvents();
render();

function bindEvents() {
  elements.confidenceRange.addEventListener("input", (event) => {
    state.confidence = normalizeConfidence(clampNumber(Number(event.target.value), 0, 100, defaultState.confidence));
    persistState();
    render();
  });

  elements.quickConfidenceButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-confidence]");
    if (!button) {
      return;
    }

    state.confidence = normalizeConfidence(clampNumber(Number(button.dataset.confidence), 0, 100, defaultState.confidence));
    persistState();
    render();
  });

  elements.severityOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-severity]");
    if (!button) {
      return;
    }

    state.severity = validateSeverity(button.dataset.severity);
    persistState();
    render();
  });

  elements.runSimulation.addEventListener("click", appendSimulationRound);
  elements.resetSimulation.addEventListener("click", restartSimulation);

  elements.claimButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-claim]");
    if (!button) {
      return;
    }

    const claim = getClaim(button.dataset.claim);
    state.transferClaim = claim.id;
    state.transferEvidence = claim.suggestedEvidence;
    state.transferBelief = claim.suggestedBelief;
    persistState();
    render();
  });

  elements.transferEvidenceRange.addEventListener("input", (event) => {
    state.transferEvidence = clampNumber(Number(event.target.value), 0, 100, defaultState.transferEvidence);
    persistState();
    render();
  });

  elements.transferBeliefRange.addEventListener("input", (event) => {
    state.transferBelief = clampNumber(Number(event.target.value), 0, 100, defaultState.transferBelief);
    persistState();
    render();
  });

  elements.commitmentGrid.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-commitment]");
    if (!input) {
      return;
    }

    const id = input.dataset.commitment;
    if (input.checked) {
      if (!state.commitments.includes(id)) {
        state.commitments.push(id);
      }
    } else {
      state.commitments = state.commitments.filter((item) => item !== id);
    }

    persistState();
    render();
  });

  elements.copySummary.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(elements.summaryOutput.value);
      } else {
        elements.summaryOutput.focus();
        elements.summaryOutput.select();
        document.execCommand("copy");
      }
      elements.copyStatus.textContent = "Summary copied.";
    } catch (error) {
      elements.copyStatus.textContent = "Copy failed. Select the summary manually.";
    }
  });
}

function render() {
  const severity = getSeverity(state.severity);
  const confidenceGap = Math.max(0, state.confidence - EVIDENCE_PERCENT);
  const confidenceShare = state.confidence > 0 ? (confidenceGap / state.confidence) * 100 : 0;
  const confidenceMessage = describeConfidenceGap(confidenceGap);
  const exposure = describeExposure(confidenceGap, severity.weight);
  const simulation = getSimulationNumbers();
  const plannerComparison = getPlannerComparison(simulation, severity);
  const transferGap = Math.max(0, state.transferBelief - state.transferEvidence);
  const transferCommitmentWeight = getCommitmentWeight(state.commitments);
  const transferRisk = describeTransferRisk(transferGap, transferCommitmentWeight);
  const activeClaim = getClaim(state.transferClaim);

  elements.metricEvidence.textContent = formatPercent(EVIDENCE_PERCENT);
  elements.metricConfidence.textContent = formatPercent(state.confidence);
  elements.metricConfidenceNote.textContent = confidenceMessage.brief;
  elements.metricGap.textContent = `${formatNumber(confidenceGap)} pts`;
  elements.metricGapNote.textContent = confidenceMessage.detail;
  elements.metricExposure.textContent = exposure.label;
  elements.metricExposureNote.textContent = exposure.detail;

  elements.confidenceRange.value = String(state.confidence);
  elements.confidenceReadout.textContent = formatPercent(state.confidence);
  highlightQuickButtons();

  elements.gaugeEvidenceLabel.textContent = formatPercent(EVIDENCE_PERCENT);
  elements.gaugeGapLabel.textContent = `${formatNumber(confidenceGap)} points`;
  setBarWidth(elements.gaugeEvidenceBar, EVIDENCE_PERCENT);
  setBarSegment(elements.gaugeFaithBar, EVIDENCE_PERCENT, confidenceGap);
  setPointer(elements.gaugePointer, state.confidence);
  elements.gaugeGapNote.textContent = buildGapNote(confidenceGap, "green support line");
  elements.confidenceCaption.textContent = confidenceMessage.caption;

  setBarWidth(elements.bridgeSupported, EVIDENCE_PERCENT);
  setBarSegment(elements.bridgeOverhang, EVIDENCE_PERCENT, confidenceGap);
  setPointer(elements.bridgeEvidenceMarker, EVIDENCE_PERCENT);
  setPointer(elements.bridgeBeliefMarker, state.confidence);
  elements.bridgeSupportedLabel.textContent = formatPercent(EVIDENCE_PERCENT);
  elements.bridgeOverhangLabel.textContent = formatPercent(confidenceGap);
  elements.bridgeShareLabel.textContent = formatPercent(confidenceShare);
  elements.bridgeCaption.textContent = buildBridgeCaption(confidenceGap, confidenceShare);

  renderTracePanel(simulation);
  highlightSeverityButtons();
  elements.stakesCaption.textContent = describeStakesCaption(confidenceGap, severity);
  elements.evidencePlannerPlan.textContent = formatHitCount(simulation.evidenceHits);
  elements.faithPlannerPlan.textContent = formatHitCount(simulation.plannedHits);
  elements.decisionPenalty.textContent = simulation.unsupportedPlans > 0 ? `+${formatNumber(simulation.unsupportedPlans)}` : "0";
  elements.decisionPenaltyNote.textContent =
    simulation.unsupportedPlans > 0
      ? `${formatNumber(simulation.unsupportedPlans)} extra planned hits are already being licensed before any roll happens.`
      : "No extra commitments are being licensed beyond the support line.";
  elements.longRunCost.textContent = plannerComparison.averageExtraCost > 0 ? `+${formatNumber(plannerComparison.averageExtraCost)}` : "0";
  elements.longRunCostNote.textContent =
    plannerComparison.averageExtraShortfall > 0
      ? `If repeated many times, the faith-driven planner pays about ${formatNumber(plannerComparison.averageExtraShortfall)} more setbacks on average.`
      : "If repeated many times, both planners perform the same because there is no measure of faith.";
  renderSimulation(simulation, severity);
  renderLastRoll(simulation.lastRoll);

  renderClaimButtons();
  elements.claimTitle.textContent = activeClaim.title;
  elements.claimPrompt.textContent = activeClaim.prompt;
  elements.claimTension.textContent = activeClaim.tension;
  elements.transferEvidenceRange.value = String(state.transferEvidence);
  elements.transferBeliefRange.value = String(state.transferBelief);
  elements.transferEvidenceReadout.textContent = formatPercent(state.transferEvidence);
  elements.transferBeliefReadout.textContent = formatPercent(state.transferBelief);
  elements.transferGaugeSupport.textContent = formatPercent(state.transferEvidence);
  setBarWidth(elements.transferEvidenceBar, state.transferEvidence);
  setBarSegment(elements.transferFaithBar, state.transferEvidence, transferGap);
  setPointer(elements.transferPointer, state.transferBelief);
  elements.transferGapReadout.textContent = `${formatNumber(transferGap)} points`;
  elements.transferGapNote.textContent = buildGapNote(transferGap, "support line you entered");
  renderCommitmentOptions();

  elements.dieSummaryTitle.textContent = buildDieSummaryTitle(confidenceGap, simulation.unsupportedPlans);
  elements.dieSummaryText.textContent = buildDieSummaryText(simulation, severity);
  elements.transferSummaryTitle.textContent = transferRisk.title;
  elements.transferSummaryText.textContent = buildTransferSummaryText(activeClaim, transferGap);
  elements.summaryOutput.value = buildSummaryOutput(simulation, severity, activeClaim, transferRisk);
}

function renderSimulation(simulation, severity) {
  elements.evidenceHits.textContent = formatHitCount(simulation.evidenceHits);
  elements.plannedHits.textContent = formatHitCount(simulation.plannedHits);
  elements.cumulativeRate.textContent = formatPercent(simulation.actualRate);
  elements.actualHits.textContent = formatHitCount(simulation.actualHits);
  elements.runShortfall.textContent = `Batch sixes: ${simulation.lastBatchHits}`;
  elements.rollStrip.innerHTML = simulation.rolls
    .map((roll) => {
      const isHit = roll === 6;
      return `<span class="roll-token ${isHit ? "hit" : "miss"}" title="Rolled ${roll}">${roll}</span>`;
    })
    .join("");

  const collapsed = simulation.runShortfall || simulation.unsupportedPlans;
  const collapsedDisplay = collapsed > 0 ? Math.max(1, Math.round(collapsed)) : 0;
  const tokenCount = Math.max(1, Math.min(collapsedDisplay || 1, 24));
  const extraCount = Math.max(0, collapsedDisplay - tokenCount);
  const tokenClass =
    severity.id === "money" ? "money" : severity.id === "safety" ? "safety" : severity.id === "catastrophic" ? "critical" : "soft";

  elements.consequenceStrip.innerHTML = collapsed > 0
    ? Array.from({ length: tokenCount }, (_, index) => {
        return `<span class="consequence-token ${tokenClass}" aria-hidden="true">${index + 1}</span>`;
      }).join("")
    : `<span class="consequence-token extra" aria-hidden="true">0</span>`;

  if (extraCount > 0) {
    elements.consequenceStrip.insertAdjacentHTML(
      "beforeend",
      `<span class="consequence-token extra" aria-hidden="true">+${extraCount}</span>`
    );
  }

  elements.consequenceSummary.textContent = describeConsequenceSummary(collapsed, severity);
  elements.simulationCaption.textContent = buildSimulationCaption(simulation, severity);
}

function renderTracePanel(simulation) {
  const throwsRemaining = Math.max(0, MAX_BATCHES - simulation.roundsCount);
  elements.traceStatus.textContent = `${simulation.roundsCount} ${simulation.roundsCount === 1 ? "throw" : "throws"} of ${MAX_BATCHES} logged`;
  elements.traceCaption.textContent =
    simulation.roundsCount >= MAX_BATCHES
      ? `This trace has reached 30 throws, or ${simulation.totalDice} dice. The next click on the primary button resets the trace and starts a fresh line.`
      : `Each click adds another 10 dice to the same cumulative trace. ${throwsRemaining} more throw${throwsRemaining === 1 ? "" : "s"} remain before the trace resets at 30.`;
  elements.regressionStatus.textContent = `${simulation.totalDice} dice tracked across ${simulation.roundsCount} ${simulation.roundsCount === 1 ? "throw" : "throws"}`;
  elements.runSimulation.textContent =
    simulation.roundsCount >= MAX_BATCHES ? "Reset trace and roll 10 dice" : "Roll another 10 dice";
  elements.resetSimulation.textContent = simulation.roundsCount > 1 ? "Start new trace" : "Roll a fresh 10 dice";
  renderRegressionChart(simulation);
  elements.regressionCaption.textContent = buildRegressionCaption(simulation);
}

function renderClaimButtons() {
  elements.claimButtons.innerHTML = transferClaims
    .map((claim) => {
      const active = claim.id === state.transferClaim ? "active" : "";
      return `
        <button type="button" class="claim-button ${active}" data-claim="${claim.id}">
          <strong>${claim.title}</strong>
          <span>${claim.prompt}</span>
        </button>
      `;
    })
    .join("");
}

function renderSeverityOptions() {
  elements.severityOptions.innerHTML = severityOptions
    .map((option) => {
      return `
        <button type="button" class="severity-option" data-severity="${option.id}">
          <strong>${option.label}</strong>
          <span>${option.detail}</span>
        </button>
      `;
    })
    .join("");
}

function renderCommitmentOptions() {
  elements.commitmentGrid.innerHTML = commitments
    .map((item) => {
      const checked = state.commitments.includes(item.id) ? "checked" : "";
      return `
        <label class="commitment-option">
          <input type="checkbox" data-commitment="${item.id}" ${checked}>
          <span>
            <strong>${item.label}</strong>
            <small>${item.detail}</small>
          </span>
        </label>
      `;
    })
    .join("");
}

function renderLastRoll(lastRoll) {
  renderDieFace(elements.lastDie, lastRoll || 1);
  elements.lastRollLabel.textContent = `Last roll in the sequence: ${lastRoll || 1}.`;
}

function appendSimulationRound() {
  if (!Array.isArray(state.simulation.rounds)) {
    state.simulation.rounds = [];
  }

  if (state.simulation.rounds.length >= MAX_BATCHES) {
    state.simulation.rounds = [];
  }

  state.simulation.rounds.push(createSimulationRound());
  persistState();
  render();
}

function restartSimulation() {
  state.simulation.rounds = [createSimulationRound()];
  persistState();
  render();
}

function ensureSimulation(forceNew = false) {
  const hasRounds = Array.isArray(state.simulation.rounds) && state.simulation.rounds.length > 0;
  if (forceNew || !hasRounds) {
    state.simulation.rounds = [createSimulationRound()];
    return;
  }

  if (state.simulation.rounds.length > MAX_BATCHES) {
    state.simulation.rounds = state.simulation.rounds.slice(-MAX_BATCHES);
  }
}

function getSimulationNumbers() {
  const rounds = Array.isArray(state.simulation.rounds) ? state.simulation.rounds : [];
  const rolls = rounds.flat();
  const roundsCount = rounds.length;
  const totalDice = rolls.length;
  const actualHits = rolls.filter((roll) => roll === 6).length;
  const evidenceHits = EVIDENCE_PROBABILITY * totalDice;
  const plannedHits = (state.confidence / 100) * totalDice;
  const unsupportedPlans = Math.max(0, plannedHits - evidenceHits);
  const runShortfall = Math.max(0, plannedHits - actualHits);
  const actualRate = totalDice > 0 ? (actualHits / totalDice) * 100 : 0;
  const lastBatch = rounds[rounds.length - 1] || [];
  const lastBatchHits = lastBatch.filter((roll) => roll === 6).length;

  let runningHits = 0;
  const cumulativeRates = rounds.map((round, index) => {
    runningHits += round.filter((roll) => roll === 6).length;
    return {
      round: index + 1,
      rate: (runningHits / ((index + 1) * DICE_PER_BATCH)) * 100
    };
  });

  return {
    roundsCount,
    totalDice,
    evidenceHits,
    plannedHits,
    unsupportedPlans,
    actualHits,
    actualRate,
    runShortfall,
    rolls: lastBatch,
    lastRoll: lastBatch[lastBatch.length - 1] || 1,
    lastBatchHits,
    cumulativeRates
  };
}

function describeConfidenceGap(gap) {
  if (gap <= 0.5) {
    return {
      brief: "Your confidence is staying inside the support line.",
      detail: "This matches the support you say the evidence provides.",
      caption:
        "At or below the evidence line, the tool is showing core rationality under your definition: belief remains inside perceived support."
    };
  }

  if (gap <= 10) {
    return {
      brief: "Confidence is leaning slightly beyond the support line.",
      detail: "A small measure of faith is already present under this audit's definition.",
      caption:
        "The die is still only giving you 16.7%. The extra confidence is small, but it adds no new information. It only lets the decision outrun the support."
    };
  }

  if (gap <= 30) {
    return {
      brief: "A substantial slice of confidence is above the support line.",
      detail: "This setting is asking the die to carry much more than one honest chance in six.",
      caption:
        "This is no longer a minor lean. A noticeable chunk of your certainty lies above the support you perceive. This tool labels that excess confidence faith, and it worsens the decision rather than improving it."
    };
  }

  return {
    brief: "Most of the current confidence is above the support line.",
    detail: "The larger part of this confidence setting no longer rests on what the die supplies.",
    caption:
      "At this level, the overhang dominates the position. The die has not strengthened. Only the confidence has, so the decision quality is now being driven mostly by faith."
  };
}

function describeExposure(gap, severityWeight) {
  const score = gap * severityWeight;

  if (score <= 12) {
    return {
      label: "Guarded",
      detail: "Even with the chosen stakes, the current posture stays close to the support line."
    };
  }

  if (score <= 45) {
    return {
      label: "Strained",
      detail: "Some commitment is already being placed on a worse-than-evidence decision posture."
    };
  }

  if (score <= 110) {
    return {
      label: "Exposed",
      detail: "Real costs now ride on confidence the evidence would not license."
    };
  }

  return {
    label: "Acute",
    detail: "At this combination of gap and stakes, even a modest run of misses can become costly fast."
  };
}

function buildBridgeCaption(gap, share) {
  if (gap <= 0.5) {
    return "The belief marker is still standing on supported planks. No overhang is being asked to carry weight.";
  }

  return `At this setting, ${formatPercent(share)} of your current confidence stands beyond the warranted degree of belief. That striped overhang is the measure of faith.`;
}

function buildGapNote(gap, supportLineLabel) {
  if (gap <= 0.05) {
    return `No measure of faith is present here. Your confidence is staying inside the warranted degree of belief marked by the ${supportLineLabel}.`;
  }

  return `The gold striped segment is the measure of faith: whatever degree of belief exceeds the warranted degree of belief marked by the ${supportLineLabel}.`;
}

function buildRegressionCaption(simulation) {
  const distanceFromMean = Math.abs(simulation.actualRate - EVIDENCE_PERCENT);

  if (simulation.roundsCount <= 1) {
    return `After the first throw of 10 dice, the cumulative rate can swing sharply. As more throws are added, the line is usually pulled back toward the 16.7% mean.`;
  }

  if (distanceFromMean <= 0.75) {
    return `After ${simulation.roundsCount} throws (${simulation.totalDice} dice), the cumulative line is sitting close to the 16.7% mean. Longer traces usually keep hugging that same one-in-six center more tightly.`;
  }

  return `After ${simulation.roundsCount} throws (${simulation.totalDice} dice), the cumulative line is at ${formatPercent(simulation.actualRate)}, which is ${formatNumber(distanceFromMean)} points away from the 16.7% mean. More throws usually shrink that gap rather than reinforcing it.`;
}

function describeStakesCaption(gap, severity) {
  if (gap <= 0.5) {
    return `With the slider at or below the evidence line, ${severity.label.toLowerCase()} still matters, but you are not adding extra belief beyond what the die supports. The cumulative trace may still wander, but the plan itself is not overshooting the support line.`;
  }

  return `${severity.label} does not make the die kinder. Faith does not improve the decision. It changes how expensive each overreach-driven shortfall becomes when the world fails to cooperate.`;
}

function describeConsequenceSummary(collapsed, severity) {
  if (collapsed <= 0.05) {
    return "No cumulative shortfall in this trace.";
  }

  return `About ${formatNumber(collapsed)} ${formatSeverityUnit(severity, collapsed)}`;
}

function buildSimulationCaption(simulation, severity) {
  if (simulation.unsupportedPlans <= 0) {
    return `Across ${simulation.roundsCount} tracked throw${simulation.roundsCount === 1 ? "" : "s"} of 10 dice, your plan is not padded with extra certainty. The line can still drift, but that drift is coming from luck rather than confidence above the support line.`;
  }

  const unsupported = simulation.unsupportedPlans;
  const shortfall = simulation.runShortfall;
  const evidenceShortfall = Math.max(0, simulation.evidenceHits - simulation.actualHits);
  const extraRunShortfall = Math.max(0, shortfall - evidenceShortfall);
  const lead = `Across ${simulation.roundsCount} tracked throw${simulation.roundsCount === 1 ? "" : "s"} (${simulation.totalDice} dice), ${formatNumber(unsupported)} of your planned hits were already above the support line.`;

  if (shortfall <= 0.05) {
    return `${lead} This particular run happened to rescue the posture, but the extra plans were still not supplied by the die itself.`;
  }

  if (extraRunShortfall > 0.05) {
    return `${lead} In this cumulative trace, faith added about ${formatNumber(extraRunShortfall)} extra ${formatSeverityUnit(severity, extraRunShortfall)} beyond what the evidence-capped planner would have paid.`;
  }

  return `${lead} In this cumulative trace, the overreach did not add extra realized cost, but it was still a worse decision because the extra commitments were never licensed by the evidence.`;
}

function describeTransferRisk(gap, commitmentWeight) {
  const score = gap * (1 + commitmentWeight * 0.4);

  if (gap <= 0.5) {
    return {
      title: "Belief is staying inside the stated support.",
      band: "Aligned"
    };
  }

  if (score <= 30) {
    return {
      title: "A modest measure of faith is present.",
      band: "Light overreach"
    };
  }

  if (score <= 80) {
    return {
      title: "The selected claim is carrying a visible measure of faith.",
      band: "Live overreach"
    };
  }

  if (score <= 150) {
    return {
      title: "The selected claim is carrying a large measure of faith.",
      band: "Serious overreach"
    };
  }

  return {
    title: "The selected claim is carrying a very heavy measure of faith.",
    band: "Severe overreach"
  };
}

function buildTransferSummaryText(claim, gap) {
  const commitmentNames = state.commitments.length
    ? state.commitments
        .map((id) => commitments.find((item) => item.id === id)?.label)
        .filter(Boolean)
        .join(", ")
    : "no additional commitments";

  if (gap <= 0.5) {
    return `For ${claim.title}, your confidence is not currently outrunning the support rating you gave it. Even if the claim matters deeply, this setting is not adding extra confidence on top of that support.`;
  }

  return `For ${claim.title}, the current posture adds ${formatNumber(gap)} points of confidence beyond the support rating, then asks that extra confidence to carry ${commitmentNames}. That excess confidence is what this tool labels faith, and it lowers decision quality rather than improving it.`;
}

function buildDieSummaryTitle(gap, unsupportedPlans) {
  if (gap <= 0.5) {
    return "The plan is staying inside the die's support line.";
  }

  if (unsupportedPlans <= 2) {
    return "Faith is beginning to worsen the plan.";
  }

  return "Faith is already worsening the plan.";
}

function buildDieSummaryText(simulation, severity) {
  if (simulation.unsupportedPlans <= 0) {
    return "At the current slider setting, your plan does not budget for more sixes than the evidence supports. Luck can still disappoint you, but confidence above the support line is not inflating the cumulative trace.";
  }

  return `Across ${simulation.roundsCount} tracked throw${simulation.roundsCount === 1 ? "" : "s"} (${simulation.totalDice} dice), the evidence line warrants about ${formatNumber(simulation.evidenceHits)} hits, but your current confidence plans for ${formatNumber(simulation.plannedHits)}. That leaves ${formatNumber(simulation.unsupportedPlans)} extra planned hits beyond the support line. Those extra commitments make the decision itself worse before any outcome arrives, and they add more long-run cost under the current "${severity.label}" setting.`;
}

function buildSummaryOutput(simulation, severity, claim, transferRisk) {
  const transferGap = Math.max(0, state.transferBelief - state.transferEvidence);
  const commitmentList = state.commitments.length
    ? state.commitments
        .map((id) => commitments.find((item) => item.id === id)?.label)
        .filter(Boolean)
        .join("; ")
    : "None selected";

  return [
    "Belief Overreach Audit",
    "",
    "Fair-die drill",
    `- Evidence support for the next roll being a six: ${formatPercent(EVIDENCE_PERCENT)}`,
    `- Chosen confidence: ${formatPercent(state.confidence)}`,
    `- Measure of faith (belief above warranted belief): ${formatNumber(Math.max(0, state.confidence - EVIDENCE_PERCENT))} points`,
    `- Tracked throws of 10 dice: ${simulation.roundsCount} of ${MAX_BATCHES}`,
    `- Total dice tracked: ${simulation.totalDice}`,
    `- Evidence-based hits across tracked dice: ${formatNumber(simulation.evidenceHits)}`,
    `- Planned hits at current confidence: ${formatNumber(simulation.plannedHits)}`,
    `- Extra planned hits beyond the support line: ${formatNumber(simulation.unsupportedPlans)}`,
    `- Actual hits across tracked dice: ${simulation.actualHits}`,
    `- Cumulative hit rate across tracked dice: ${formatPercent(simulation.actualRate)}`,
    `- Most recent 10-die batch sixes: ${simulation.lastBatchHits}`,
    `- Current cumulative shortfall: ${formatNumber(simulation.runShortfall)}`,
    `- Consequence setting: ${severity.label}`,
    "",
    "Faith-related transfer claim",
    `- Claim: ${claim.title}`,
    `- Perceived support: ${formatPercent(state.transferEvidence)}`,
    `- Confidence anyway: ${formatPercent(state.transferBelief)}`,
    `- Measure of faith (belief above warranted belief): ${formatNumber(transferGap)} points`,
    `- Commitments riding on the claim: ${commitmentList}`,
    `- Current overreach band: ${transferRisk.band}`,
    "",
    "Plain reading",
    "The die section shows that faith adds no value to the decision. It licenses extra commitments beyond perceived support, which lowers expected success and raises long-run cost. Across longer runs, the observed share of sixes tends to regress toward the same 16.7% mean rather than toward your preferred confidence level. The transfer section applies the same point to religious choices, including which god, if any, to worship. Hope, comfort, longing, or fear may explain why people raise confidence above perceived support, but those motives do not increase evidential support. When a religion praises this very overreach as virtue, the method itself is irrational on this audit's definition because it tells belief to exceed perceived support on purpose."
  ].join("\n");
}

function getPlannerComparison(simulation, severity) {
  const averageExtraShortfall = expectedExtraShortfall(
    simulation.totalDice,
    simulation.evidenceHits,
    simulation.plannedHits,
    EVIDENCE_PROBABILITY
  );
  const averageExtraCost = averageExtraShortfall * severity.weight;

  return {
    averageExtraShortfall,
    averageExtraCost
  };
}

function expectedExtraShortfall(trials, evidenceHits, plannedHits, probability) {
  if (plannedHits <= evidenceHits) {
    return 0;
  }

  const missProbability = 1 - probability;
  let chance = Math.pow(missProbability, trials);
  let total = 0;

  for (let actualHits = 0; actualHits <= trials; actualHits += 1) {
    const evidenceShortfall = Math.max(0, evidenceHits - actualHits);
    const faithShortfall = Math.max(0, plannedHits - actualHits);
    total += (faithShortfall - evidenceShortfall) * chance;

    if (actualHits < trials) {
      chance *= ((trials - actualHits) / (actualHits + 1)) * (probability / missProbability);
    }
  }

  return total;
}

function highlightQuickButtons() {
  const buttons = Array.from(elements.quickConfidenceButtons.querySelectorAll("button[data-confidence]"));
  buttons.forEach((button) => {
    button.classList.toggle("active", Math.abs(Number(button.dataset.confidence) - state.confidence) < 0.05);
  });
}

function highlightSeverityButtons() {
  const buttons = Array.from(elements.severityOptions.querySelectorAll("button[data-severity]"));
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.severity === state.severity);
  });
}

function getCommitmentWeight(selectedCommitments) {
  return selectedCommitments.reduce((total, id) => {
    const commitment = commitments.find((item) => item.id === id);
    return total + (commitment ? commitment.weight : 0);
  }, 0);
}

function setBarWidth(element, width) {
  element.style.width = `${clampNumber(width, 0, 100, 0)}%`;
}

function setBarSegment(element, left, width) {
  const safeLeft = clampNumber(left, 0, 100, 0);
  const safeWidth = clampNumber(width, 0, 100 - safeLeft, 0);
  element.style.left = `${safeLeft}%`;
  element.style.width = `${safeWidth}%`;
}

function setPointer(element, value) {
  element.style.left = `${clampNumber(value, 0, 100, 0)}%`;
}

function renderRegressionChart(simulation) {
  const width = 640;
  const height = 240;
  const margin = { top: 18, right: 22, bottom: 34, left: 44 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  if (!simulation.cumulativeRates.length) {
    elements.regressionChart.innerHTML = `
      <text class="chart-placeholder" x="${width / 2}" y="${height / 2}" text-anchor="middle">
        Roll 10 dice to start the cumulative trace.
      </text>
    `;
    return;
  }

  const maxObserved = Math.max(...simulation.cumulativeRates.map((point) => point.rate), EVIDENCE_PERCENT);
  const yMax = Math.min(100, Math.max(40, Math.ceil((maxObserved + 10) / 10) * 10));
  const yTicks = [0, yMax / 2, yMax];
  const xTicks = Array.from(
    new Set([1, Math.max(1, Math.ceil(simulation.roundsCount / 2)), simulation.roundsCount])
  );
  const getX = (index) =>
    simulation.cumulativeRates.length === 1
      ? margin.left + innerWidth / 2
      : margin.left + (index / (simulation.cumulativeRates.length - 1)) * innerWidth;
  const getY = (rate) => margin.top + innerHeight - (rate / yMax) * innerHeight;
  const linePoints = simulation.cumulativeRates.map((point, index) => `${getX(index)},${getY(point.rate)}`).join(" ");
  const meanY = getY(EVIDENCE_PERCENT);

  elements.regressionChart.innerHTML = `
    ${yTicks
      .map((tick) => {
        const y = getY(tick);
        return `
          <line class="chart-grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
          <text class="chart-axis-label" x="${margin.left - 8}" y="${y + 4}" text-anchor="end">${formatPercent(tick)}</text>
        `;
      })
      .join("")}
    <line class="chart-axis-line" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}"></line>
    <line class="chart-axis-line" x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}"></line>
    <line class="chart-mean-line" x1="${margin.left}" y1="${meanY}" x2="${width - margin.right}" y2="${meanY}"></line>
    <text class="chart-mean-label" x="${width - margin.right}" y="${meanY - 8}" text-anchor="end">Mean 16.7%</text>
    <polyline class="chart-observed-line" points="${linePoints}"></polyline>
    ${simulation.cumulativeRates
      .map((point, index) => `<circle class="chart-point" cx="${getX(index)}" cy="${getY(point.rate)}" r="4"></circle>`)
      .join("")}
    ${xTicks
      .map((tick) => {
        const x = getX(tick - 1);
        return `
          <text class="chart-axis-label" x="${x}" y="${height - margin.bottom + 20}" text-anchor="middle">${tick}</text>
        `;
      })
      .join("")}
    <text class="chart-axis-title" x="${margin.left}" y="${margin.top - 2}" text-anchor="start">Cumulative six rate</text>
    <text class="chart-axis-title" x="${width - margin.right}" y="${height - 6}" text-anchor="end">Throws of 10 dice</text>
  `;
}

function createSimulationRound() {
  return Array.from({ length: DICE_PER_BATCH }, () => Math.floor(Math.random() * 6) + 1);
}

function renderDieFace(container, value) {
  const positions = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
  };

  container.innerHTML = Array.from({ length: 9 }, (_, index) => {
    const slot = index + 1;
    const active = positions[value]?.includes(slot) ? "pip active" : "pip";
    return `<span class="${active}"></span>`;
  }).join("");
}

function getClaim(id) {
  return transferClaims.find((claim) => claim.id === id) || transferClaims[0];
}

function getSeverity(id) {
  return severityOptions.find((option) => option.id === id) || severityOptions[1];
}

function validateSeverity(id) {
  return severityOptions.some((option) => option.id === id) ? id : defaultState.severity;
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const claim = getClaim(raw.transferClaim || defaultState.transferClaim);
    const savedConfidence = normalizeConfidence(clampNumber(raw.confidence, 0, 100, defaultState.confidence));

    return {
      confidence: savedConfidence,
      severity: validateSeverity(raw.severity),
      transferClaim: claim.id,
      transferEvidence: clampNumber(raw.transferEvidence, 0, 100, claim.suggestedEvidence),
      transferBelief: clampNumber(raw.transferBelief, 0, 100, claim.suggestedBelief),
      commitments: Array.isArray(raw.commitments)
        ? raw.commitments.filter((id) => commitments.some((item) => item.id === id))
        : [...defaultState.commitments],
      simulation: normalizeSimulation(raw.simulation)
    };
  } catch (error) {
    return JSON.parse(JSON.stringify(defaultState));
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clampNumber(value, min, max, fallback) {
  const numeric = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, numeric));
}

function normalizeConfidence(value) {
  return value === 17 ? EVIDENCE_PERCENT : value;
}

function formatPercent(value) {
  const rounded = Math.abs(value - Math.round(value)) < 0.05 ? Math.round(value) : Number(value.toFixed(1));
  return `${rounded}%`;
}

function formatNumber(value) {
  return Math.abs(value - Math.round(value)) < 0.05 ? String(Math.round(value)) : value.toFixed(1);
}

function formatHitCount(value) {
  const magnitude = formatNumber(value);
  return `${magnitude} ${Math.abs(value - 1) < 0.05 ? "hit" : "hits"}`;
}

function formatSeverityUnit(severity, count) {
  return Math.abs(count - 1) < 0.05 ? severity.singularUnit : severity.pluralUnit;
}

function normalizeSimulation(rawSimulation) {
  const normalizedRounds = Array.isArray(rawSimulation?.rounds)
    ? rawSimulation.rounds
        .map((round) =>
          Array.isArray(round)
            ? round.filter((roll) => Number.isInteger(roll) && roll >= 1 && roll <= 6).slice(0, DICE_PER_BATCH)
            : []
        )
        .filter((round) => round.length === DICE_PER_BATCH)
        .slice(0, MAX_BATCHES)
    : [];

  if (normalizedRounds.length > 0) {
    return { rounds: normalizedRounds };
  }

  if (Array.isArray(rawSimulation?.rolls)) {
    const validRolls = rawSimulation.rolls.filter((roll) => Number.isInteger(roll) && roll >= 1 && roll <= 6);
    const migratedRounds = [];

    for (let index = 0; index + DICE_PER_BATCH <= validRolls.length && migratedRounds.length < MAX_BATCHES; index += DICE_PER_BATCH) {
      migratedRounds.push(validRolls.slice(index, index + DICE_PER_BATCH));
    }

    return { rounds: migratedRounds };
  }

  return { rounds: [] };
}
