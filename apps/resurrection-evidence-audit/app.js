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
    id: "car-crash-demon",
    title: "Teaching parallel: demon turned the wheel",
    claim:
      "A car crashed because a demon physically turned the steering wheel, rather than because of ordinary causes such as mechanical failure, swerving to avoid an animal, falling asleep, distraction, or road conditions.",
    prior: {
      general: 12,
      targeting: 0.6,
      actType: 0.15,
      unknownReserve: 20,
    },
    claimCopy:
      "Use this teaching example to compare a specific non-material claim with ordinary crash explanations. The point is to see why a dramatic explanation must do more than say, 'the cause is unclear.'",
    startingCopy:
      "Before counting crash details or testimony, ask how plausible this exact kind of cause is. The sliders use ordinary questions instead of probability notation.",
    startingHelpOne:
      "These sliders ask what the demon-wheel claim should get before the crash evidence is added. A broad belief in spiritual beings does not automatically make this exact crash demon-caused.",
    generalPriorLabel: "How open are you to demon action in general?",
    generalPriorHelper:
      "Higher means you already think demons sometimes act in the physical world.",
    targetingPenaltyLabel: "How much of that openness applies to this exact crash?",
    targetingPenaltyHelper:
      "Lower means the claim is very specific: this demon, this car, this road, this moment.",
    actTypeRateLabel: "How common is this kind of demon-caused event?",
    actTypeRateHelper:
      "Lower means demon-caused steering is rare even before this crash is considered.",
    unknownReserveHelper:
      "Higher means you are leaving room for mechanical, driver, road, animal, or unknown causes.",
    alternativeTitle: "Teaching parallel: test the demon-wheel claim",
    alternativeCopy:
      "The crash is real, but the cause is disputed. This preset asks whether the evidence selects a demon rather than ordinary crash causes.",
    alternativeLabel: "Competing crash explanations",
    alternativesHelpTitle: "Why the crash alternatives matter",
    alternativesHelpOne:
      "The alternative is not simply 'the driver lied.' A driver can be sincere and still misread a sudden crash caused by steering failure, a tire problem, an animal, fatigue, distraction, or the road.",
    alternativesHelpTwo:
      "Mark a crash explanation as strong when it fits the details. Set it aside only when the evidence really rules it out, not because it makes the demon claim harder to defend.",
    alternativeReportLabel: "Ordinary crash-explanation strength",
    trueEvidenceHelper:
      "Set this high only if the evidence would be natural to expect if a demon really turned the wheel.",
    altEvidenceHelper:
      "Set this high if mechanical failure, an animal swerve, sleep, distraction, or road conditions could still explain it.",
    weightEvidenceHelper:
      "Set this lower when details come from the same person, same memory, same camera angle, or same investigation.",
    startingPointKind: "specific demon-wheel claim",
    borrowingTitle: "The claim may borrow too much from general supernatural openness",
    borrowingBody:
      "Being open to spirits or demons in general is not the same as support for this demon, this road, this moment, and this physical steering claim.",
    suppressedPathName: "ordinary crash path",
    alternativeStrongTitle: "Ordinary crash explanations remain strong",
    alternativeStrongBody:
      "The selected crash features still fit mechanical failure, animal avoidance, fatigue, distraction, or road conditions better than a demon-turning-the-wheel claim.",
    comparisonRepairBody:
      "Check steering and tires, road evidence, animal signs, fatigue, distraction, phone data, and witness timing before treating a demon as the best explanation.",
    overlapRepairBody:
      "Reduce independence for details that come from the same driver, witness conversation, camera angle, police report, or repair inspection.",
    specificityRepairBody:
      "Separate general openness to non-material causes from this demon, this car, this road, this moment, and this physical steering claim.",
    aiAuditLine:
      "You are auditing a non-material claim using a car-crash teaching parallel for plain-language probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
    aiCheckHint:
      "Checks to apply: inflated starting point, specificity cost, suppressed ordinary crash causes, false independence, sincere testimony vs event cause, transfer from an unexplained crash to a demon cause, truncated alternatives, missing unknown reserve, neutral evidence, and fragility.",
    reportTitle: "# Crosshairs Teaching Parallel Audit",
    evidence: [
      {
        id: "crash-happened",
        title: "The crash happened",
        type: "background",
        note: "The crash itself is expected under both a demon claim and ordinary crash explanations; it does not choose between them.",
        pTrue: 98,
        pAlt: 98,
        weight: 100,
      },
      {
        id: "sudden-swerve",
        title: "Sudden wheel movement",
        type: "event detail",
        note: "A sudden turn fits the demon story, but it also fits a driver swerving, a steering problem, a tire problem, or a startled correction.",
        pTrue: 85,
        pAlt: 75,
        weight: 75,
      },
      {
        id: "driver-reports-force",
        title: "Driver says the wheel was pulled",
        type: "testimony",
        note: "The driver may be sincere, but shock and memory can turn 'I lost control' into 'something grabbed the wheel.'",
        pTrue: 80,
        pAlt: 35,
        weight: 55,
      },
      {
        id: "no-obvious-cause",
        title: "No obvious cause at first",
        type: "unknowns",
        note: "Not seeing a cause right away is not the same as ruling out mechanical failure, fatigue, animal avoidance, distraction, or road conditions.",
        pTrue: 65,
        pAlt: 60,
        weight: 70,
      },
      {
        id: "prior-demon-belief",
        title: "Demon explanation appears quickly",
        type: "social",
        note: "A community may quickly interpret an unclear event through its existing beliefs. That can explain the label without proving the cause.",
        pTrue: 70,
        pAlt: 75,
        weight: 40,
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

const resurrectionAlternativeFeatures = [
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

const crashAlternativeFeatures = [
  {
    id: "mechanical-failure",
    title: "Mechanical failure",
    ratio: 4,
    note: "A steering, tire, brake, suspension, or warning-light problem can cause a sudden loss of control.",
  },
  {
    id: "animal-swerve",
    title: "Swerving to miss an animal",
    ratio: 3,
    note: "A sudden steering move is common when a driver reacts to a deer, dog, or other animal near the road.",
  },
  {
    id: "falling-asleep",
    title: "Falling asleep or microsleep",
    ratio: 3.5,
    note: "Fatigue can cause lane drift, late correction, and a crash without much braking or clear memory.",
  },
  {
    id: "driver-distraction",
    title: "Driver distraction",
    ratio: 2.5,
    note: "A phone, passenger, dashboard control, or momentary attention lapse can explain delayed reaction.",
  },
  {
    id: "road-conditions",
    title: "Road or weather conditions",
    ratio: 2,
    note: "Wet pavement, gravel, ice, a curve, or poor visibility can make ordinary control loss more likely.",
  },
  {
    id: "stress-memory",
    title: "Stress-shaped memory",
    ratio: 2.5,
    note: "After a frightening crash, a sincere driver may remember force, grabbing, or pulling more vividly than the mechanics of the event.",
  },
  {
    id: "demon-specificity",
    title: "Extra specificity of the demon claim",
    ratio: 3,
    note: "Moving from 'the cause is unclear' to 'a demon turned the wheel' adds a very specific claim that needs its own support.",
  },
];

const defaultPresetText = {
  reportTitle: "# Crosshairs Resurrection Evidence Audit",
  claimCopy:
    "Start with the exact claim. A thinner claim needs less support; a highly specific miracle claim needs more.",
  startingCopy:
    "Before counting testimony or stories, ask how plausible this specific kind of event is. The sliders below replace formal probability labels with ordinary questions.",
  startingHelpTitle: "How to set these sliders",
  startingHelpOne:
    "These sliders ask what the claim should get before the specific evidence is added. A broad belief that God may exist does not automatically make one exact miracle likely.",
  startingHelpTwo:
    "Move slowly. If you raise one slider, ask what fact justifies the higher number. If the reason is only 'I already believe this,' the slider may be too generous.",
  generalPriorLabel: "How open are you to divine action in general?",
  generalPriorHelper:
    "Higher means you already think God acting in the world is broadly plausible.",
  targetingPenaltyLabel: "How much of that openness applies to this exact claim?",
  targetingPenaltyHelper:
    "Lower means the claim is very specific: this person, this time, this purpose.",
  actTypeRateLabel: "How common is this kind of event?",
  actTypeRateHelper:
    "Lower means events like this are rare even before this case is considered.",
  unknownReserveLabel: "How much room remains for other explanations?",
  unknownReserveHelper:
    "Higher means you are leaving room for explanations you may not have thought of yet.",
  alternativeTitle: "Keep sincere alternatives visible",
  alternativeCopy:
    "The alternative is not 'they lied.' It can include grief, dissonance, memory, scriptural rereading, and community reinforcement.",
  alternativeLabel: "Alternative pathway strength",
  alternativesHelpTitle: "Why the alternative pathway matters",
  alternativesHelpOne:
    "The alternative is not simply 'everyone lied.' People can be sincere and still explain events through grief, group pressure, memory, scripture, or later storytelling.",
  alternativesHelpTwo:
    "Mark a pathway as strong when it clearly fits the evidence. Set it aside only when you have a reason, not just because it makes the miracle claim harder to defend.",
  alternativeReportLabel: "Sincere meaning-making pathway strength",
  trueEvidenceHelper:
    "Set this high only if the evidence would be natural to expect under the miracle claim.",
  altEvidenceHelper:
    "Set this high if ordinary causes, memory, grief, rumor, or story growth could also explain it.",
  weightEvidenceHelper:
    "Set this lower when sources share the same people, texts, memories, or community.",
  startingPointKind: "specific miracle",
  borrowingTitle: "The claim may borrow too much from generic theism",
  borrowingBody:
    "Belief that God might exist is not the same as support for this person, this event, this purpose, and this doctrine.",
  suppressedPathName: "non-miracle path",
  alternativeStrongTitle: "Sincere meaning-making remains a strong alternative",
  alternativeStrongBody:
    "The selected psychology and tradition-development features strongly fit a sincere post-crisis meaning-making pathway.",
  comparisonRepairBody:
    "Add grief visions, rumor growth, memory distortion, literary development, social reinforcement, selection effects, and unknowns before judging how surprising the evidence is without a miracle.",
  overlapRepairBody:
    "Reduce independence for sources or traditions that share a community, text, memory stream, or apologetic purpose.",
  specificityRepairBody:
    "Separate general openness to God from this person, this time, this kind of act, and this Christian interpretation.",
  aiAuditLine:
    "You are auditing a Christian evidential claim for plain-language probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
  aiCheckHint:
    "Checks to apply: inflated starting point, specificity cost, suppressed alternatives, false independence, sincerity vs event truth, transfer from ordinary details to miracle truth, truncated alternatives, missing unknown reserve, neutral evidence, and fragility.",
};

const state = {
  presetId: claimPresets[0].id,
  evidence: [],
  featureWeights: new Map(resurrectionAlternativeFeatures.map((feature) => [feature.id, 1])),
};

const els = {
  preset: document.querySelector("#claim-preset"),
  claim: document.querySelector("#claim-text"),
  claimCopy: document.querySelector("#claim-copy"),
  startingCopy: document.querySelector("#starting-copy"),
  startingHelpTitle: document.querySelector("#starting-help-title"),
  startingHelpOne: document.querySelector("#starting-help-one"),
  startingHelpTwo: document.querySelector("#starting-help-two"),
  generalPrior: document.querySelector("#general-prior"),
  generalPriorLabel: document.querySelector("#general-prior-label"),
  generalPriorHelper: document.querySelector("#general-prior-helper"),
  targetingPenalty: document.querySelector("#targeting-penalty"),
  targetingPenaltyLabel: document.querySelector("#targeting-penalty-label"),
  targetingPenaltyHelper: document.querySelector("#targeting-penalty-helper"),
  actTypeRate: document.querySelector("#act-type-rate"),
  actTypeRateLabel: document.querySelector("#act-type-rate-label"),
  actTypeRateHelper: document.querySelector("#act-type-rate-helper"),
  unknownReserve: document.querySelector("#unknown-reserve"),
  unknownReserveLabel: document.querySelector("#unknown-reserve-label"),
  unknownReserveHelper: document.querySelector("#unknown-reserve-helper"),
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
  alternativeTitle: document.querySelector("#alternatives-title"),
  alternativeCopy: document.querySelector("#alternatives-copy"),
  alternativeStrengthLabel: document.querySelector("#alternative-strength-label"),
  alternativeStrength: document.querySelector("#alternative-strength"),
  alternativesHelpTitle: document.querySelector("#alternatives-help-title"),
  alternativesHelpOne: document.querySelector("#alternatives-help-one"),
  alternativesHelpTwo: document.querySelector("#alternatives-help-two"),
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
  loadPreset(getInitialPresetId());
}

function buildPresetSelect() {
  els.preset.innerHTML = claimPresets
    .map((preset) => `<option value="${preset.id}">${escapeHtml(preset.title)}</option>`)
    .join("");
}

function getInitialPresetId() {
  const requestedPreset = new URLSearchParams(window.location.search).get("preset");
  return claimPresets.some((preset) => preset.id === requestedPreset)
    ? requestedPreset
    : state.presetId;
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

function getPresetById(presetId) {
  return claimPresets.find((item) => item.id === presetId) || claimPresets[0];
}

function getCurrentPreset() {
  return getPresetById(state.presetId);
}

function getPresetMeta(preset = getCurrentPreset()) {
  return {
    ...defaultPresetText,
    ...preset,
  };
}

function getAlternativesForPreset(preset = getCurrentPreset()) {
  return preset.id === "car-crash-demon"
    ? crashAlternativeFeatures
    : resurrectionAlternativeFeatures;
}

function getCurrentAlternatives() {
  return getAlternativesForPreset();
}

function loadPreset(presetId) {
  const preset = getPresetById(presetId);
  state.presetId = preset.id;
  state.evidence = preset.evidence.map((item) => ({ ...item }));
  state.featureWeights = new Map(getAlternativesForPreset(preset).map((feature) => [feature.id, 1]));

  els.preset.value = preset.id;
  els.claim.value = preset.claim;
  els.generalPrior.value = String(preset.prior.general);
  els.targetingPenalty.value = String(preset.prior.targeting);
  els.actTypeRate.value = String(preset.prior.actType);
  els.unknownReserve.value = String(preset.prior.unknownReserve);

  renderPresetText(preset);
  renderLedger();
  renderFeatures();
  render();
}

function applyPosture(kind) {
  const posture = posturePresets[kind];
  const preset = getCurrentPreset();
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

function renderPresetText(preset) {
  const meta = getPresetMeta(preset);
  setText(els.claimCopy, meta.claimCopy);
  setText(els.startingCopy, meta.startingCopy);
  setText(els.startingHelpTitle, meta.startingHelpTitle);
  setText(els.startingHelpOne, meta.startingHelpOne);
  setText(els.startingHelpTwo, meta.startingHelpTwo);
  setText(els.generalPriorLabel, meta.generalPriorLabel);
  setText(els.generalPriorHelper, meta.generalPriorHelper);
  setText(els.targetingPenaltyLabel, meta.targetingPenaltyLabel);
  setText(els.targetingPenaltyHelper, meta.targetingPenaltyHelper);
  setText(els.actTypeRateLabel, meta.actTypeRateLabel);
  setText(els.actTypeRateHelper, meta.actTypeRateHelper);
  setText(els.unknownReserveLabel, meta.unknownReserveLabel);
  setText(els.unknownReserveHelper, meta.unknownReserveHelper);
  setText(els.alternativeTitle, meta.alternativeTitle);
  setText(els.alternativeCopy, meta.alternativeCopy);
  setText(els.alternativeStrengthLabel, meta.alternativeLabel);
  setText(els.alternativesHelpTitle, meta.alternativesHelpTitle);
  setText(els.alternativesHelpOne, meta.alternativesHelpOne);
  setText(els.alternativesHelpTwo, meta.alternativesHelpTwo);
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
  const meta = getPresetMeta();

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
          helper: meta.trueEvidenceHelper,
          value: item.pTrue,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "pAlt",
          label: "Would we still expect this if the claim is not true?",
          helper: meta.altEvidenceHelper,
          value: item.pAlt,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "weight",
          label: "How independent is this evidence?",
          helper: meta.weightEvidenceHelper,
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
  const alternativeFeatures = getCurrentAlternatives();

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
  els.updatedConfidenceNote.textContent = "The result after the current evidence settings";
  els.neededForHigh.textContent = shortfallText;
  els.neededForHighNote.textContent = assessment.shortfall90 > 1
    ? "more evidence lift needed to reach 90%"
    : "the current inputs already reach 90%";
  els.topDriver.textContent = assessment.topDriver
    ? `Most of the movement: ${assessment.topDriver.title}`
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
  const preset = getCurrentPreset();
  const meta = getPresetMeta(preset);
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
    preset,
    meta,
    prior,
    priorParts,
    items,
    topDriver,
    alternativeBf,
    totalBf,
    required,
    shortfall90,
  });
  const repairs = buildRepairs(flags, meta);
  const auditPressure = calculateAuditPressure(flags, shortfall90, topDriver, priorParts);

  return {
    preset,
    meta,
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
  const meta = context.meta;
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
      body: `This ${meta.startingPointKind} begins above 1% before the evidence is counted. That can be fair only if the specificity and event-type assumptions are defended.`,
      weight: 16,
    });
  }

  if (context.priorParts.general > 0.45 && context.priorParts.targeting > 0.1) {
    flags.push({
      title: meta.borrowingTitle,
      body: meta.borrowingBody,
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
      body: `${suppressed.length} evidence item${suppressed.length === 1 ? "" : "s"} make the ${meta.suppressedPathName} lower than 3%, which can make the evidence look stronger than it is.`,
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
      title: meta.alternativeStrongTitle,
      body: meta.alternativeStrongBody,
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

function buildRepairs(flags, meta) {
  const titles = new Set(flags.map((flag) => flag.title));
  const repairs = [];

  if (
    titles.has("Alternative explanations are treated as almost impossible") ||
    titles.has(meta.alternativeStrongTitle)
  ) {
    repairs.push({
      title: "Rebuild the comparison side",
      body: meta.comparisonRepairBody,
    });
  }

  if (titles.has("Related evidence may be counted as separate") || titles.has("One evidence item is carrying the case")) {
    repairs.push({
      title: "Lower overlap-sensitive evidence",
      body: meta.overlapRepairBody,
    });
  }

  if (titles.has("The starting point may be too high") || titles.has(meta.borrowingTitle)) {
    repairs.push({
      title: "Show the full specificity chain",
      body: meta.specificityRepairBody,
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
  return getCurrentAlternatives().reduce((product, feature) => {
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

function setText(element, value) {
  if (element) element.textContent = value;
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
    assessment.meta.reportTitle,
    "",
    `Claim: ${assessment.claim || "Not supplied"}`,
    "",
    "## Plain-Language Result",
    `Starting confidence: ${formatPercent(assessment.prior)}`,
    `Evidence added: ${formatLift(assessment.totalBf)}`,
    `Updated confidence: ${formatPercent(assessment.posterior)}`,
    `More evidence needed for 90% confidence: ${assessment.shortfall90 > 1 ? formatLift(assessment.shortfall90) : "none under current inputs"}`,
    `Biggest mover: ${assessment.topDriver ? assessment.topDriver.title : "None"} (${Math.round((assessment.topDriver?.share || 0) * 100)}% of positive movement)`,
    `${assessment.meta.alternativeReportLabel}: ${formatLift(assessment.alternativeBf)}`,
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
    assessment.meta.aiAuditLine,
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
    assessment.meta.aiCheckHint,
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
  if (score >= 25) return "#66752c";
  return "#1f5a3a";
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
