const STORAGE_KEY = "belief-overreach-audit-v1";
const EVIDENCE_PROBABILITY = 1 / 6;
const EVIDENCE_PERCENT = EVIDENCE_PROBABILITY * 100;
const TRIAL_OPTIONS = [6, 18, 60];

const severityOptions = [
  {
    id: "minor",
    label: "Minor inconvenience",
    weight: 1,
    detail: "Each collapsed plan wastes a little time or creates a small embarrassment.",
    singularUnit: "small miss",
    pluralUnit: "small misses"
  },
  {
    id: "money",
    label: "Resource loss",
    weight: 2.3,
    detail: "Each collapsed plan costs real money, effort, or emotional bandwidth.",
    singularUnit: "costly miss",
    pluralUnit: "costly misses"
  },
  {
    id: "safety",
    label: "Safety margin",
    weight: 4.2,
    detail: "Each collapsed plan removes backup room and leaves you more exposed.",
    singularUnit: "safety gap",
    pluralUnit: "safety gaps"
  },
  {
    id: "catastrophic",
    label: "Single-point failure",
    weight: 7,
    detail: "Each collapsed plan lands on something you cannot casually replace.",
    singularUnit: "critical failure",
    pluralUnit: "critical failures"
  }
];

const transferClaims = [
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
  trials: 18,
  severity: "money",
  transferClaim: "prayer",
  transferEvidence: 28,
  transferBelief: 74,
  commitments: ["share", "decide", "delay"],
  simulation: {
    rolls: []
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
  confidenceCaption: document.querySelector("#confidenceCaption"),
  bridgeSupported: document.querySelector("#bridgeSupported"),
  bridgeOverhang: document.querySelector("#bridgeOverhang"),
  bridgeEvidenceMarker: document.querySelector("#bridgeEvidenceMarker"),
  bridgeBeliefMarker: document.querySelector("#bridgeBeliefMarker"),
  bridgeSupportedLabel: document.querySelector("#bridgeSupportedLabel"),
  bridgeOverhangLabel: document.querySelector("#bridgeOverhangLabel"),
  bridgeShareLabel: document.querySelector("#bridgeShareLabel"),
  bridgeCaption: document.querySelector("#bridgeCaption"),
  trialButtons: document.querySelector("#trialButtons"),
  severityOptions: document.querySelector("#severityOptions"),
  runSimulation: document.querySelector("#runSimulation"),
  rerollSimulation: document.querySelector("#rerollSimulation"),
  stakesCaption: document.querySelector("#stakesCaption"),
  evidenceHits: document.querySelector("#evidenceHits"),
  plannedHits: document.querySelector("#plannedHits"),
  unsupportedPlans: document.querySelector("#unsupportedPlans"),
  actualHits: document.querySelector("#actualHits"),
  runShortfall: document.querySelector("#runShortfall"),
  rollStrip: document.querySelector("#rollStrip"),
  consequenceSummary: document.querySelector("#consequenceSummary"),
  consequenceStrip: document.querySelector("#consequenceStrip"),
  simulationCaption: document.querySelector("#simulationCaption"),
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
    state.confidence = clampNumber(Number(event.target.value), 0, 100, defaultState.confidence);
    persistState();
    render();
  });

  elements.quickConfidenceButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-confidence]");
    if (!button) {
      return;
    }

    state.confidence = clampNumber(Number(button.dataset.confidence), 0, 100, defaultState.confidence);
    persistState();
    render();
  });

  elements.trialButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-trials]");
    if (!button) {
      return;
    }

    state.trials = validateTrials(Number(button.dataset.trials));
    ensureSimulation(true);
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

  elements.runSimulation.addEventListener("click", rerunSimulation);
  elements.rerollSimulation.addEventListener("click", rerunSimulation);

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
  elements.confidenceCaption.textContent = confidenceMessage.caption;

  setBarWidth(elements.bridgeSupported, EVIDENCE_PERCENT);
  setBarSegment(elements.bridgeOverhang, EVIDENCE_PERCENT, confidenceGap);
  setPointer(elements.bridgeEvidenceMarker, EVIDENCE_PERCENT);
  setPointer(elements.bridgeBeliefMarker, state.confidence);
  elements.bridgeSupportedLabel.textContent = formatPercent(EVIDENCE_PERCENT);
  elements.bridgeOverhangLabel.textContent = formatPercent(confidenceGap);
  elements.bridgeShareLabel.textContent = formatPercent(confidenceShare);
  elements.bridgeCaption.textContent = buildBridgeCaption(confidenceGap, confidenceShare);

  highlightTrialButtons();
  highlightSeverityButtons();
  elements.stakesCaption.textContent = describeStakesCaption(confidenceGap, severity);
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
  renderCommitmentOptions();

  elements.dieSummaryTitle.textContent = buildDieSummaryTitle(confidenceGap, simulation.unsupportedPlans);
  elements.dieSummaryText.textContent = buildDieSummaryText(simulation, severity);
  elements.transferSummaryTitle.textContent = transferRisk.title;
  elements.transferSummaryText.textContent = buildTransferSummaryText(activeClaim, transferGap);
  elements.summaryOutput.value = buildSummaryOutput(simulation, severity, activeClaim, transferRisk);
}

function renderSimulation(simulation, severity) {
  elements.evidenceHits.textContent = String(simulation.evidenceHits);
  elements.plannedHits.textContent = String(simulation.plannedHits);
  elements.unsupportedPlans.textContent = String(simulation.unsupportedPlans);
  elements.actualHits.textContent = String(simulation.actualHits);
  elements.runShortfall.textContent = `Shortfall: ${simulation.runShortfall}`;
  elements.rollStrip.innerHTML = simulation.rolls
    .map((roll) => {
      const isHit = roll === 6;
      return `<span class="roll-token ${isHit ? "hit" : "miss"}" title="Rolled ${roll}">${roll}</span>`;
    })
    .join("");

  const collapsed = simulation.runShortfall || simulation.unsupportedPlans;
  const tokenCount = Math.max(1, Math.min(collapsed || 1, 24));
  const extraCount = Math.max(0, collapsed - tokenCount);
  const tokenClass =
    severity.id === "money" ? "money" : severity.id === "safety" ? "safety" : severity.id === "catastrophic" ? "critical" : "soft";

  elements.consequenceStrip.innerHTML = Array.from({ length: tokenCount }, (_, index) => {
    return `<span class="consequence-token ${tokenClass}" aria-hidden="true">${index + 1}</span>`;
  }).join("");

  if (extraCount > 0) {
    elements.consequenceStrip.insertAdjacentHTML(
      "beforeend",
      `<span class="consequence-token extra" aria-hidden="true">+${extraCount}</span>`
    );
  }

  elements.consequenceSummary.textContent = describeConsequenceSummary(collapsed, severity);
  elements.simulationCaption.textContent = buildSimulationCaption(simulation, severity);
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

function rerunSimulation() {
  state.simulation.rolls = Array.from({ length: state.trials }, () => Math.floor(Math.random() * 6) + 1);
  persistState();
  render();
}

function ensureSimulation(forceNew = false) {
  const needsNew = forceNew || !Array.isArray(state.simulation.rolls) || state.simulation.rolls.length !== state.trials;
  if (needsNew) {
    state.simulation.rolls = Array.from({ length: state.trials }, () => Math.floor(Math.random() * 6) + 1);
  }
}

function getSimulationNumbers() {
  const actualHits = state.simulation.rolls.filter((roll) => roll === 6).length;
  const evidenceHits = Math.round(EVIDENCE_PROBABILITY * state.trials);
  const plannedHits = Math.round((state.confidence / 100) * state.trials);
  const unsupportedPlans = Math.max(0, plannedHits - evidenceHits);
  const runShortfall = Math.max(0, plannedHits - actualHits);

  return {
    evidenceHits,
    plannedHits,
    unsupportedPlans,
    actualHits,
    runShortfall,
    rolls: state.simulation.rolls,
    lastRoll: state.simulation.rolls[state.simulation.rolls.length - 1] || 1
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
      detail: "A small faith gap is already present, even if it feels modest.",
      caption:
        "The die is still only giving you 16.7%. The extra confidence is small, but it is not coming from the evidence line itself."
    };
  }

  if (gap <= 30) {
    return {
      brief: "A substantial slice of confidence is unsupported.",
      detail: "This setting is asking the die to carry much more than one honest chance in six.",
      caption:
        "This is no longer a minor lean. A noticeable chunk of your certainty is coming from faith rather than the support you perceive."
    };
  }

  return {
    brief: "Most of the current posture is overhang.",
    detail: "The larger part of this confidence setting no longer rests on what the die supplies.",
    caption:
      "At this level, the overhang dominates the position. The die has not strengthened. Only the confidence has."
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
      label: "Leaning",
      detail: "Some commitment is already being placed on confidence the evidence does not supply."
    };
  }

  if (score <= 110) {
    return {
      label: "Exposed",
      detail: "Real costs now ride on unsupported belief rather than on the evidence line alone."
    };
  }

  return {
    label: "Ruin-prone",
    detail: "At this combination of gap and stakes, overreach is poised to become costly fast."
  };
}

function buildBridgeCaption(gap, share) {
  if (gap <= 0.5) {
    return "The belief marker is still standing on supported planks. No overhang is being asked to carry weight.";
  }

  return `At this setting, ${formatPercent(share)} of your current confidence stands beyond the support line. That is the portion being carried by faith rather than perceived evidence.`;
}

function describeStakesCaption(gap, severity) {
  if (gap <= 0.5) {
    return `With the slider at or below the evidence line, ${severity.label.toLowerCase()} still matters, but you are not adding extra belief beyond what the die supports.`;
  }

  return `${severity.label} does not make the die kinder. It just makes each unsupported plan more expensive when the world fails to cooperate.`;
}

function describeConsequenceSummary(collapsed, severity) {
  if (collapsed <= 0) {
    return "No collapsed plans in this run.";
  }

  return `${collapsed} ${formatSeverityUnit(severity, collapsed)}`;
}

function buildSimulationCaption(simulation, severity) {
  if (simulation.unsupportedPlans <= 0) {
    return "Your plan is not padded with extra certainty here. Misses can still happen, but they are not being created by overreach beyond the support line.";
  }

  const unsupported = simulation.unsupportedPlans;
  const shortfall = simulation.runShortfall;
  const lead = `Before the sequence began, ${unsupported} of your planned hits were already unsupported by the evidence.`;

  if (shortfall <= 0) {
    return `${lead} This particular run happened to rescue the posture, but the extra plans were still not supplied by the die itself.`;
  }

  return `${lead} In this run, the plan fell short by ${shortfall}, so the unsupported posture turned into ${formatSeverityUnit(severity, shortfall)}.`;
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
      title: "A modest overhang is present.",
      band: "Light overreach"
    };
  }

  if (score <= 80) {
    return {
      title: "The selected claim is carrying a visible overhang.",
      band: "Live overreach"
    };
  }

  if (score <= 150) {
    return {
      title: "The selected claim is carrying a large overhang.",
      band: "Serious overreach"
    };
  }

  return {
    title: "The selected claim is carrying a very heavy overhang.",
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
    return `For ${claim.title}, your confidence is not currently outrunning the support rating you gave it. Even if the claim matters deeply, this setting is not using faith to add extra certainty on top of that support.`;
  }

  return `For ${claim.title}, the current posture adds ${formatNumber(gap)} points of confidence beyond the support rating, then asks that extra confidence to carry ${commitmentNames}. That is where the danger of faith becomes salient under this definition.`;
}

function buildDieSummaryTitle(gap, unsupportedPlans) {
  if (gap <= 0.5) {
    return "The plan is staying inside the die's support line.";
  }

  if (unsupportedPlans <= 2) {
    return "Unsupported plans are beginning to appear.";
  }

  return "Unsupported plans are already in the room.";
}

function buildDieSummaryText(simulation, severity) {
  if (simulation.unsupportedPlans <= 0) {
    return "At the current slider setting, your plan does not budget for more sixes than the evidence supports. Luck can still disappoint you, but faith is not inflating the plan.";
  }

  return `Across ${state.trials} rolls, the evidence line warrants about ${simulation.evidenceHits} hits, but your current confidence plans for ${simulation.plannedHits}. That leaves ${simulation.unsupportedPlans} planned hits with no support behind them, and each one matters more under the current "${severity.label}" setting.`;
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
    `- Faith gap: ${formatNumber(Math.max(0, state.confidence - EVIDENCE_PERCENT))} points`,
    `- Trial window: ${state.trials} rolls`,
    `- Evidence-based hits: ${simulation.evidenceHits}`,
    `- Planned hits at current confidence: ${simulation.plannedHits}`,
    `- Unsupported planned hits: ${simulation.unsupportedPlans}`,
    `- Actual hits in the last run: ${simulation.actualHits}`,
    `- Shortfall in the last run: ${simulation.runShortfall}`,
    `- Consequence setting: ${severity.label}`,
    "",
    "Faith-laden transfer claim",
    `- Claim: ${claim.title}`,
    `- Perceived support: ${formatPercent(state.transferEvidence)}`,
    `- Confidence anyway: ${formatPercent(state.transferBelief)}`,
    `- Faith gap: ${formatNumber(transferGap)} points`,
    `- Commitments riding on the claim: ${commitmentList}`,
    `- Current overreach band: ${transferRisk.band}`,
    "",
    "Plain reading",
    "The die section shows whether plans are being padded with extra confidence before reality answers back. The transfer section shows the same structure in a faith-loaded setting: support and confidence are separated so the overhang becomes visible."
  ].join("\n");
}

function highlightQuickButtons() {
  const buttons = Array.from(elements.quickConfidenceButtons.querySelectorAll("button[data-confidence]"));
  buttons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.confidence) === state.confidence);
  });
}

function highlightTrialButtons() {
  const buttons = Array.from(elements.trialButtons.querySelectorAll("button[data-trials]"));
  buttons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.trials) === state.trials);
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

function validateTrials(value) {
  return TRIAL_OPTIONS.includes(value) ? value : defaultState.trials;
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const claim = getClaim(raw.transferClaim || defaultState.transferClaim);

    return {
      confidence: clampNumber(raw.confidence, 0, 100, defaultState.confidence),
      trials: validateTrials(raw.trials),
      severity: validateSeverity(raw.severity),
      transferClaim: claim.id,
      transferEvidence: clampNumber(raw.transferEvidence, 0, 100, claim.suggestedEvidence),
      transferBelief: clampNumber(raw.transferBelief, 0, 100, claim.suggestedBelief),
      commitments: Array.isArray(raw.commitments)
        ? raw.commitments.filter((id) => commitments.some((item) => item.id === id))
        : [...defaultState.commitments],
      simulation: {
        rolls: Array.isArray(raw.simulation?.rolls)
          ? raw.simulation.rolls.filter((roll) => Number.isInteger(roll) && roll >= 1 && roll <= 6)
          : []
      }
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

function formatPercent(value) {
  const rounded = Math.abs(value - Math.round(value)) < 0.05 ? Math.round(value) : Number(value.toFixed(1));
  return `${rounded}%`;
}

function formatNumber(value) {
  return Math.abs(value - Math.round(value)) < 0.05 ? String(Math.round(value)) : value.toFixed(1);
}

function formatSeverityUnit(severity, count) {
  return count === 1 ? severity.singularUnit : severity.pluralUnit;
}
