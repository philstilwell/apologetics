const STORAGE_KEY = "moral-system-stress-test-v3";

const routes = [
  { id: "none", label: "Choose a primary route" },
  { id: "god-nature", label: "God's nature" },
  { id: "divine-command", label: "Divine command" },
  { id: "scripture", label: "Scripture" },
  { id: "holy-spirit", label: "Holy Spirit guidance" },
  { id: "church-tradition", label: "Church tradition" },
  { id: "conscience", label: "Conscience or moral intuition" },
  { id: "natural-law", label: "Reason or natural law" },
  { id: "human-flourishing", label: "Human flourishing" },
  { id: "hybrid", label: "Hybrid Christian account" }
];

const strengthLevels = [
  { value: 0, label: "None" },
  { value: 1, label: "Asserted" },
  { value: 2, label: "Thin" },
  { value: 3, label: "Supported" },
  { value: 4, label: "Strong" }
];

const claimPositions = [
  {
    id: "divine-command",
    label: "Divine command",
    claim: "Christianity provides a coherent objective moral system because moral obligations are grounded in God's authority and expressed through divine commands."
  },
  {
    id: "god-nature",
    label: "God's nature",
    claim: "Christian morality is objective because goodness is grounded in God's unchanging nature and commands express that nature."
  },
  {
    id: "scripture-authority",
    label: "Scripture authority",
    claim: "Christian morality is coherent because scripture reveals God's binding moral will with sufficient authority for moral knowledge and guidance."
  },
  {
    id: "scripture-spirit",
    label: "Scripture and Spirit",
    claim: "Christian morality is coherent because scripture, interpreted with the guidance of the Holy Spirit, reveals God's binding moral will."
  },
  {
    id: "natural-law",
    label: "Natural law",
    claim: "Christian morality is coherent because reason can discern moral truths built into human nature and the created order."
  },
  {
    id: "conscience",
    label: "God-given conscience",
    claim: "Christian morality is coherent because God gives humans conscience and moral intuition that can recognize objective moral truths."
  },
  {
    id: "church-tradition",
    label: "Church tradition",
    claim: "Christian morality is coherent because scripture is authoritatively interpreted through the church's tradition, teaching, and communal correction."
  },
  {
    id: "great-commandments",
    label: "Love commandments",
    claim: "Christian morality is coherent because all moral duties are grounded in love of God and love of neighbor."
  },
  {
    id: "virtue-character",
    label: "Christlike virtue",
    claim: "Christian morality is coherent because moral goodness is formed by Christlike character, virtues, and conformity to God's purposes."
  },
  {
    id: "kingdom-ethic",
    label: "Kingdom ethic",
    claim: "Christian morality is coherent because Jesus' kingdom teachings provide the binding pattern for moral life and human community."
  },
  {
    id: "flourishing-in-god",
    label: "Flourishing in God",
    claim: "Christian morality is coherent because human flourishing is grounded in God's design for persons, relationships, and creation."
  },
  {
    id: "moral-lawgiver",
    label: "Moral lawgiver",
    claim: "Christianity best explains objective moral obligations because binding moral law requires a personal moral lawgiver."
  }
];

const elements = [
  {
    id: "moral-meaning",
    title: "Moral Meaning",
    tier: "core",
    axis: "clarity",
    description: "Defines what moral terms mean without merely repeating words such as right, wrong, good, or evil.",
    why: "Without stable moral meaning, the system never says what it is talking about. Moral language can then collapse into approval, disgust, usefulness, or authority-language instead of identifying an objective moral property.",
    checks: [
      { id: "defines-terms", label: "Defines the key moral terms" },
      { id: "objective-sense", label: "Distinguishes objective wrong from dislike" },
      { id: "non-circular-language", label: "Avoids circular moral labels" }
    ]
  },
  {
    id: "truth-ground",
    title: "Truth Maker",
    tier: "core",
    axis: "ontology",
    description: "Explains whether moral claims can be true and what makes them true beyond human preference.",
    why: "A coherent objective moral system needs moral claims to be truth-apt and needs something that makes them true. Otherwise moral claims function as attitudes, commands, or social signals rather than objective facts.",
    checks: [
      { id: "truth-apt", label: "Treats moral claims as true or false" },
      { id: "truth-maker", label: "Identifies what makes them true" },
      { id: "preference-independent", label: "Grounds truth beyond preference or power" }
    ]
  },
  {
    id: "authority-check",
    title: "Authority Check",
    tier: "core",
    axis: "access",
    description: "Explains how an authority is recognized as morally good without assuming its commands are already moral.",
    why: "If authority is accepted as moral only because it says so, the system becomes obedience rather than moral evaluation. A coherent system needs a way to identify moral authority without circularly assuming it.",
    checks: [
      { id: "independent-test", label: "Gives a test for moral authority" },
      { id: "not-command-only", label: "Avoids good because commanded" },
      { id: "can-detect-failure", label: "Could detect an immoral command" }
    ]
  },
  {
    id: "moral-access",
    title: "Moral Access",
    tier: "core",
    axis: "access",
    description: "Gives a reliable way accountable agents can know the standard and check disputed claims.",
    why: "Objective obligations cannot guide or fairly bind agents if agents have no reliable access to them. The system needs a method for knowing moral truth and resolving disagreement.",
    checks: [
      { id: "public-method", label: "Uses an explainable method" },
      { id: "handles-disagreement", label: "Handles sincere disagreement" },
      { id: "accessible", label: "Is accessible to those held accountable" }
    ]
  },
  {
    id: "binding-force",
    title: "Binding Force",
    tier: "core",
    axis: "force",
    description: "Explains why moral requirements bind agents rather than merely advising, rewarding, or threatening them.",
    why: "A moral system must explain why one ought to comply, not merely why compliance is useful, rewarded, or preferred. Without binding force, morality thins into prudence or strategy.",
    checks: [
      { id: "obligation", label: "Explains obligation rather than benefit" },
      { id: "not-prudence", label: "Distinguishes duty from prudence" },
      { id: "accountability", label: "Explains blame or accountability" }
    ]
  },
  {
    id: "case-guidance",
    title: "Case Guidance",
    tier: "core",
    axis: "clarity",
    description: "Produces determinate answers for actual cases and ranks duties when they conflict.",
    why: "A system that cannot decide concrete cases is not yet action-guiding. It needs principles that apply before the desired conclusion is chosen and rules for conflicts between duties.",
    checks: [
      { id: "decides-cases", label: "Decides concrete cases" },
      { id: "ranks-duties", label: "Ranks competing duties" },
      { id: "predictive", label: "Works before the desired conclusion" }
    ]
  },
  {
    id: "consistent-scope",
    title: "Consistent Scope",
    tier: "core",
    axis: "scope",
    description: "Applies across persons, cultures, and time without ad hoc tribal or authority-favored exceptions.",
    why: "Objective morality must say who is bound and why like cases receive like treatment. Without consistent scope, exceptions can protect favored groups, eras, or authorities by special pleading.",
    checks: [
      { id: "like-cases", label: "Treats like cases alike" },
      { id: "scope", label: "Specifies who is bound" },
      { id: "no-special-pleading", label: "Avoids special pleading" }
    ]
  },
  {
    id: "correction",
    title: "Correction Method",
    tier: "core",
    axis: "stability",
    description: "Explains how mistaken moral interpretations are identified and repaired without ad hoc revision.",
    why: "Every moral community can misread, rationalize, or inherit bad norms. A coherent system needs a principled way to identify error and distinguish moral discovery from convenient revision.",
    checks: [
      { id: "detects-error", label: "Detects mistaken interpretation" },
      { id: "learning-rule", label: "Distinguishes learning from moral change" },
      { id: "repair-rule", label: "Has a rule for revising mistakes" }
    ]
  }
];

const challenges = [
  {
    id: "euthyphro-split",
    title: "The Euthyphro Split",
    pressure: "high",
    elements: ["truth-ground", "authority-check", "binding-force"],
    routes: ["divine-command", "god-nature", "scripture"],
    tags: ["authority", "grounding"],
    summary: "If an act is moral only because God commands it, the command appears arbitrary. If God commands it because it is already moral, the standard appears independent of command.",
    counterfactual: "Suppose God commanded cruelty, slavery, or the killing of infants. Would the command make the act moral, or would you judge the command by a prior standard?",
    questions: [
      "Is the command moral because God commands it, or does God command it because it is moral?",
      "What standard lets you identify God's nature as good before you submit to it?",
      "If the divine command changed tomorrow, would the moral fact change with it?"
    ]
  },
  {
    id: "prior-assessment",
    title: "Prior Assessment Trap",
    pressure: "high",
    elements: ["authority-check", "moral-access", "truth-ground"],
    routes: ["scripture", "god-nature", "divine-command", "holy-spirit", "church-tradition"],
    tags: ["verification", "circularity"],
    summary: "A system cannot use God's commands as the only evidence that God is morally authoritative while using God's authority to validate those commands.",
    counterfactual: "Imagine two alleged divine authorities issuing incompatible commands while each claims perfect goodness. What non-circular test selects one as morally authoritative?",
    questions: [
      "What could count as evidence that a divine command is immoral?",
      "Can you evaluate God's moral character before accepting God's authority?",
      "If no independent assessment is allowed, how is this different from obedience?"
    ]
  },
  {
    id: "meaning-gap",
    title: "Moral Meaning Gap",
    pressure: "high",
    elements: ["moral-meaning", "truth-ground", "binding-force"],
    routes: ["conscience", "human-flourishing", "natural-law", "hybrid"],
    tags: ["language", "objectivity"],
    summary: "Moral language can sound objective while leaving the key terms undefined or interchangeable with approval, disgust, usefulness, or authority.",
    counterfactual: "Replace every moral word in the claim with an affective or pragmatic term. If the argument still works, the moral vocabulary may be rhetorical rather than explanatory.",
    questions: [
      "When you say wrong, do you mean objectively forbidden, harmful, disapproved, or imprudent?",
      "What does the moral word add beyond emotion, agreement, or usefulness?",
      "Could someone share your reaction while rejecting your moral ontology?"
    ]
  },
  {
    id: "holy-spirit-divergence",
    title: "Holy Spirit Divergence",
    pressure: "high",
    elements: ["moral-access", "case-guidance", "correction"],
    routes: ["holy-spirit"],
    tags: ["access", "disagreement"],
    summary: "Appeals to inner divine guidance do not by themselves produce public, reproducible convergence among sincere believers.",
    counterfactual: "Two sincere Christians pray and report opposite guidance on divorce, sexuality, war, or punishment. Which report is the moral fact, and how can outsiders know?",
    questions: [
      "What prevents Holy Spirit guidance from being indistinguishable from intuition, culture, or bias?",
      "What test resolves two incompatible claims of divine guidance?",
      "Should a non-Christian be culpable for not detecting this private guidance?"
    ]
  },
  {
    id: "scripture-ambiguity",
    title: "Scripture Ambiguity Matrix",
    pressure: "high",
    elements: ["case-guidance", "moral-access", "correction"],
    routes: ["scripture", "church-tradition", "hybrid"],
    tags: ["clarity", "interpretation"],
    summary: "If an objective moral source is clear, competent users should not routinely produce incompatible answers on core conduct.",
    counterfactual: "Give separated Christians the same Bible and ask for answers on divorce, remarriage, slavery, corporal punishment, sex acts, violence, and generosity. The spread of answers tests the method.",
    questions: [
      "Which interpretive rule decides the disputed case, and why is that rule itself authoritative?",
      "Why would a clear moral source require so many expert mediators?",
      "Would the same interpretive method have condemned slavery before culture shifted against it?"
    ]
  },
  {
    id: "slavery-shift",
    title: "The Slavery Shift",
    pressure: "high",
    elements: ["consistent-scope", "correction", "case-guidance"],
    routes: ["scripture", "divine-command", "god-nature", "natural-law", "hybrid"],
    tags: ["history", "scope"],
    summary: "A system that permits a practice under one covenant or culture while condemning it under another needs a principled account of what changed.",
    counterfactual: "If slavery was permitted then but condemned now, did the moral fact change, did human interpretation improve, or was the original command not moral?",
    questions: [
      "Was the most severe biblical slavery morally permissible when regulated by scripture?",
      "If the answer is no, why did the moral source fail to prohibit it clearly?",
      "If the answer is yes, what makes the same practice impermissible now?"
    ]
  },
  {
    id: "infant-killing-command",
    title: "Infant Killing Command",
    pressure: "high",
    elements: ["consistent-scope", "authority-check", "binding-force"],
    routes: ["scripture", "divine-command", "god-nature"],
    tags: ["violence", "authority"],
    summary: "Commands to kill infants or entire populations pressure the claim that divine command delivers a stable, universal moral standard.",
    counterfactual: "If a claimed revelation today ordered believers to kill infants in an enemy group, would obedience be moral if the source were verified as divine?",
    questions: [
      "Can intentional killing of infants be morally required by divine command?",
      "If yes, what remains of universal moral prohibitions?",
      "If no, what standard lets you reject the command as immoral?"
    ]
  },
  {
    id: "favored-exception",
    title: "Favored Exception Test",
    pressure: "medium",
    elements: ["case-guidance", "consistent-scope"],
    routes: ["scripture", "divine-command", "god-nature", "hybrid"],
    tags: ["exception", "scope"],
    summary: "A rule that admits exceptions for favored persons, tribes, or outcomes needs a principled conflict hierarchy.",
    counterfactual: "If deception is condemned generally but praised when it protects favored agents, the system needs a rule that explains the difference without special pleading.",
    questions: [
      "What general principle permits the exception?",
      "Would that same principle apply to outsiders with rival loyalties?",
      "How do users know when the ordinary rule has been overridden?"
    ]
  },
  {
    id: "accessibility",
    title: "Accessibility Problem",
    pressure: "medium",
    elements: ["moral-access", "consistent-scope"],
    routes: ["scripture", "holy-spirit", "church-tradition", "god-nature", "natural-law"],
    tags: ["access", "fairness"],
    summary: "A universally binding moral system should be accessible enough for accountable agents to discover what binds them.",
    counterfactual: "Consider people before the Bible, outside Israel, outside Christianity, or without reliable teachers. If they are bound, what access did they have?",
    questions: [
      "Can people be culpable for violating rules they could not reasonably know?",
      "Why would objective moral guidance be filtered through history, translation, and contested interpretation?",
      "What public method allows outsiders to check the alleged standard?"
    ]
  },
  {
    id: "intuition-fragmentation",
    title: "Intuition Fragmentation",
    pressure: "medium",
    elements: ["moral-access", "truth-ground"],
    routes: ["conscience", "natural-law", "hybrid", "god-nature"],
    tags: ["intuition", "disagreement"],
    summary: "Moral intuitions vary across people, cultures, and eras, so intuition alone struggles to verify objective moral facts.",
    counterfactual: "If one culture intuits a practice as honorable and another intuits it as horrific, the system needs more than intensity of feeling.",
    questions: [
      "What makes one intuition truth-tracking and another merely emotional?",
      "How do you detect when an intuition was formed by culture rather than moral reality?",
      "If God designed moral intuitions, why do they diverge among sincere believers?"
    ]
  },
  {
    id: "practical-advice-boundary",
    title: "Practical Advice Boundary",
    pressure: "medium",
    elements: ["binding-force", "truth-ground", "moral-meaning"],
    routes: ["human-flourishing", "natural-law", "hybrid"],
    tags: ["obligation", "prudence"],
    summary: "Facts about flourishing, harm, cooperation, or happiness do not by themselves entail obligation unless the system supplies a binding value premise.",
    counterfactual: "Assume an action increases total flourishing but violates someone's deep preference. Why must that person accept flourishing as morally binding?",
    questions: [
      "Why is flourishing morally binding rather than personally or socially preferred?",
      "What bridges the move from this helps to therefore one must do it?",
      "Could the framework be strong practical advice without being an objective moral system?"
    ]
  },
  {
    id: "sufficiency-collapse",
    title: "Sufficiency Collapse",
    pressure: "high",
    elements: ["moral-meaning", "truth-ground", "authority-check", "moral-access", "binding-force", "case-guidance", "consistent-scope", "correction"],
    routes: ["none"],
    tags: ["architecture", "sufficiency"],
    summary: "A list of moral claims is not yet a moral system unless it supplies meaning, truth ground, authority, access, force, guidance, scope, and correction.",
    counterfactual: "A rulebook can command, a preference can motivate, and a policy can help. None alone establishes an objective moral system.",
    questions: [
      "Which mandatory components are substantiated, and together are they sufficient?",
      "What would still be missing after every mandatory component is granted?",
      "Which component prevents collapse into emotion, obedience, or practical advice?"
    ]
  }
];

const profilePresets = [
  {
    id: "divine-command",
    label: "Divine command",
    description: "Starts with God's commands as the primary moral route.",
    claim: "Christianity provides a coherent objective moral system because moral obligations are grounded in God's authority and expressed through divine commands.",
    route: "divine-command",
    strength: 3,
    components: ["moral-meaning", "truth-ground", "authority-check", "moral-access", "binding-force", "case-guidance", "consistent-scope", "correction"],
    routeOverrides: {
      "truth-ground": "god-nature",
      "moral-access": "scripture",
      "correction": "scripture"
    },
    notes: {
      "truth-ground": "Moral facts are grounded in God's perfectly good nature rather than in human preference.",
      "binding-force": "Obligation is treated as accountability before the creator and moral lawgiver."
    }
  },
  {
    id: "god-nature",
    label: "God's nature",
    description: "Grounds moral truth in God's character rather than command alone.",
    claim: "Christian morality is objective because goodness is grounded in God's unchanging nature and commands express that nature.",
    route: "god-nature",
    strength: 3,
    components: ["moral-meaning", "truth-ground", "authority-check", "moral-access", "binding-force", "case-guidance", "consistent-scope", "correction"],
    routeOverrides: {
      "moral-access": "scripture",
      "case-guidance": "scripture",
      "correction": "church-tradition"
    },
    notes: {
      "authority-check": "The account must still explain how humans identify God's nature as good without circularity.",
      "case-guidance": "Commands and principles are interpreted as expressions of God's character."
    }
  },
  {
    id: "scripture-spirit",
    label: "Scripture and Spirit",
    description: "Uses revelation, interpretation, and spiritual guidance.",
    claim: "Christian morality is coherent because scripture, interpreted with the guidance of the Holy Spirit, reveals God's binding moral will.",
    route: "scripture",
    strength: 3,
    components: ["moral-meaning", "truth-ground", "authority-check", "moral-access", "binding-force", "case-guidance", "consistent-scope", "correction"],
    routeOverrides: {
      "moral-access": "holy-spirit",
      "case-guidance": "scripture",
      "correction": "church-tradition"
    },
    notes: {
      "moral-access": "Moral knowledge is accessed through scripture, prayer, conscience, and communal discernment.",
      "correction": "The church is expected to correct interpretation through shared scripture and spiritual maturity."
    }
  },
  {
    id: "natural-law",
    label: "Natural law",
    description: "Uses reason, human nature, and created purposes.",
    claim: "Christian morality is coherent because reason can discern moral truths built into human nature and the created order.",
    route: "natural-law",
    strength: 3,
    components: ["moral-meaning", "truth-ground", "authority-check", "moral-access", "binding-force", "case-guidance", "consistent-scope", "correction"],
    routeOverrides: {
      "truth-ground": "god-nature",
      "moral-access": "natural-law",
      "case-guidance": "natural-law",
      "correction": "hybrid"
    },
    notes: {
      "moral-access": "Reason and conscience are treated as public ways to identify moral truths.",
      "consistent-scope": "The standard is expected to apply to all humans because it is tied to human nature."
    }
  }
];

function defaultState() {
  return {
    claim: "",
    routes: {},
    strength: {},
    checks: {},
    notes: {},
    claimPosition: "",
    challengeFilter: "matched",
    reportMode: "full"
  };
}
let state = loadState();

const refs = {
  aiPrompt: document.querySelector("#aiPrompt"),
  boundaryList: document.querySelector("#boundaryList"),
  boundaryPressure: document.querySelector("#boundaryPressure"),
  challengeFilter: document.querySelector("#challengeFilter"),
  challengeList: document.querySelector("#challengeList"),
  claimInput: document.querySelector("#claimInput"),
  claimPositionGrid: document.querySelector("#claimPositionGrid"),
  coherenceStatusBody: document.querySelector("#coherenceStatusBody"),
  componentStatusList: document.querySelector("#componentStatusList"),
  completenessScore: document.querySelector("#completenessScore"),
  copyAiPromptButton: document.querySelector("#copyAiPromptButton"),
  copyPromptsButton: document.querySelector("#copyPromptsButton"),
  copyReportButton: document.querySelector("#copyReportButton"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  elementGrid: document.querySelector("#elementGrid"),
  finalReport: document.querySelector("#finalReport"),
  loadSampleButton: document.querySelector("#loadSampleButton"),
  matchedChallengeCount: document.querySelector("#matchedChallengeCount"),
  missingList: document.querySelector("#missingList"),
  presetButtons: document.querySelector("#presetButtons"),
  printReportButton: document.querySelector("#printReportButton"),
  promptBoard: document.querySelector("#promptBoard"),
  reportMode: document.querySelector("#reportMode"),
  resetButton: document.querySelector("#resetButton"),
  routeList: document.querySelector("#routeList"),
  selectedCount: document.querySelector("#selectedCount"),
  selectedCountNote: document.querySelector("#selectedCountNote"),
  statusBoundaryRisk: document.querySelector("#statusBoundaryRisk"),
  statusCompleteness: document.querySelector("#statusCompleteness"),
  statusCoreCovered: document.querySelector("#statusCoreCovered"),
  statusRouteCount: document.querySelector("#statusRouteCount"),
  topPressureList: document.querySelector("#topPressureList")
};

function loadState() {
  const fromHash = loadStateFromHash();
  if (fromHash) return normalizeState(fromHash);
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normalizeState(stored);
  } catch {
    return defaultState();
  }
}

function normalizeState(source) {
  const base = defaultState();
  if (!source || typeof source !== "object") return base;
  return {
    ...base,
    ...source,
    routes: { ...base.routes, ...(source.routes || {}) },
    strength: { ...base.strength, ...(source.strength || {}) },
    checks: { ...base.checks, ...(source.checks || {}) },
    notes: { ...base.notes, ...(source.notes || {}) }
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadStateFromHash() {
  if (!window.location.hash.startsWith("#state=")) return null;
  try {
    const encoded = window.location.hash.slice("#state=".length);
    return JSON.parse(decodeURIComponent(escape(window.atob(encoded))));
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function routeLabel(routeId) {
  return routes.find((route) => route.id === routeId)?.label || "Choose a primary route";
}

function claimPositionForClaim(claim) {
  const normalized = (claim || "").trim();
  return claimPositions.find((position) => position.claim === normalized)?.id || "";
}

function strengthLabel(value) {
  const numeric = Number(value) || 0;
  return strengthLevels.find((level) => level.value === numeric)?.label || "None";
}

function strengthValue(elementId) {
  return Math.max(0, Math.min(4, Number(state.strength[elementId]) || 0));
}

function getElementById(elementId) {
  return elements.find((element) => element.id === elementId);
}

function selectedChecks(elementId) {
  return state.checks[elementId] || {};
}

function checkCompletion(element) {
  if (!element?.checks?.length) return 1;
  const selected = selectedChecks(element.id);
  const checkedCount = element.checks.filter((check) => selected[check.id]).length;
  return checkedCount / element.checks.length;
}

function missingChecks(element) {
  const selected = selectedChecks(element.id);
  return (element?.checks || []).filter((check) => !selected[check.id]);
}

function pressureRank(pressure) {
  return { high: 3, medium: 2, low: 1 }[pressure] || 0;
}

function getSelectedElements() {
  return elements;
}

function getAttemptedElements() {
  return elements.filter((element) => {
    const hasRoute = routeIsChosen(element.id);
    const hasStrength = strengthValue(element.id) > 0;
    const hasChecks = Object.values(selectedChecks(element.id)).some(Boolean);
    const hasNote = Boolean((state.notes[element.id] || "").trim());
    return hasRoute || hasStrength || hasChecks || hasNote;
  });
}

function getSelectedRoutes() {
  const selected = getSelectedElements()
    .map((element) => state.routes[element.id] || "none")
    .filter((routeId) => routeId !== "none");
  return [...new Set(selected)];
}

function routeIsChosen(elementId) {
  return Boolean(state.routes[elementId] && state.routes[elementId] !== "none");
}

function elementScore(elementId) {
  const element = getElementById(elementId);
  let score = 0;
  if (routeIsChosen(elementId)) score += 0.3;
  score += Math.min(strengthValue(elementId) / 3, 1) * 0.3;
  score += checkCompletion(element) * 0.4;
  return Math.min(1, score);
}

function elementIsReady(elementId) {
  const element = getElementById(elementId);
  return Boolean(
    routeIsChosen(elementId) &&
      strengthValue(elementId) >= 3 &&
      checkCompletion(element) === 1
  );
}

function averageScores(ids) {
  if (!ids.length) return 0;
  return ids.reduce((total, id) => total + elementScore(id), 0) / ids.length;
}

function calculateCompleteness() {
  const coreIds = elements.filter((element) => element.tier === "core").map((element) => element.id);
  return Math.round(averageScores(coreIds) * 100);
}

function getMatchedChallenges() {
  const attempted = getAttemptedElements();
  const selectedIds = attempted.map((element) => element.id);
  const selectedRoutes = getSelectedRoutes();
  const scored = challenges.map((challenge) => {
    const elementHits = challenge.elements.filter((id) => selectedIds.includes(id)).length;
    const routeHits = challenge.routes.filter((id) => selectedRoutes.includes(id)).length;
    const genericHit = challenge.routes.includes("none") && selectedIds.length > 0;
    return {
      ...challenge,
      matchScore: elementHits + routeHits * 2 + (genericHit ? 1 : 0)
    };
  });

  const fallback = scored.filter((challenge) =>
    ["sufficiency-collapse", "meaning-gap", "prior-assessment", "scripture-ambiguity"].includes(challenge.id)
  );

  return scored
    .filter((challenge) => challenge.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || pressureRank(b.pressure) - pressureRank(a.pressure))
    .concat(attempted.length ? [] : fallback);
}

function getChallengesForFilter() {
  if (state.challengeFilter === "all") {
    return [...challenges].sort((a, b) => pressureRank(b.pressure) - pressureRank(a.pressure));
  }
  if (state.challengeFilter === "severe") {
    return getMatchedChallenges().filter((challenge) => challenge.pressure === "high");
  }
  return getMatchedChallenges();
}

function getBoundaryTests() {
  const selectedRoutes = getSelectedRoutes();
  const hasEmotionRoute = selectedRoutes.some((routeId) =>
    ["conscience", "human-flourishing"].includes(routeId)
  );
  const hasAuthorityRoute = selectedRoutes.some((routeId) =>
    ["scripture", "god-nature", "divine-command", "holy-spirit", "church-tradition"].includes(routeId)
  );
  const hasPracticalRoute = selectedRoutes.some((routeId) =>
    ["human-flourishing"].includes(routeId)
  );

  const ontologyReady = elementIsReady("truth-ground") && elementScore("moral-meaning") >= 0.75;
  const forceReady = elementIsReady("binding-force");
  const authorityReady = elementIsReady("authority-check") && elementScore("moral-access") >= 0.75;
  const clarityReady = elementIsReady("case-guidance");

  return [
    {
      title: "Emotion Boundary",
      status: !hasEmotionRoute ? "warn" : ontologyReady ? "pass" : "fail",
      body: !hasEmotionRoute
        ? "No conscience or flourishing route is currently carrying the system."
        : ontologyReady
          ? "The selected account attempts to ground moral terms beyond emotional force."
          : "The selected account risks redescribing emotion, empathy, disgust, or preference as morality."
    },
    {
      title: "Obedience Boundary",
      status: !hasAuthorityRoute ? "warn" : authorityReady ? "pass" : "fail",
      body: !hasAuthorityRoute
        ? "No divine, scriptural, or spiritual authority route is currently carrying the system."
        : authorityReady
          ? "The selected account attempts to assess authority without simply submitting to it."
          : "The selected account risks treating moral truth as obedience to an authority already assumed to be moral."
    },
    {
      title: "Practical Boundary",
      status: !hasPracticalRoute ? "warn" : forceReady ? "pass" : "fail",
      body: !hasPracticalRoute
        ? "No flourishing route is currently carrying the system."
        : forceReady
          ? "The selected account attempts to separate obligation from useful advice or desired outcomes."
          : "The selected account risks being a practical recommendation rather than a binding moral system."
    },
    {
      title: "Guidance Boundary",
      status: clarityReady ? "pass" : "fail",
      body: clarityReady
        ? "The selected account includes case guidance and duty ranking."
        : "The selected account lacks enough case-level guidance or duty ranking to decide hard cases."
    }
  ];
}

function getMissingCore() {
  return elements
    .filter((element) => element.tier === "core")
    .filter((element) => !elementIsReady(element.id))
    .map((element) => {
      if (!routeIsChosen(element.id)) return { ...element, reason: "No substantiation route chosen." };
      if (strengthValue(element.id) < 3) return { ...element, reason: "Support strength is below supported." };
      return { ...element, reason: "Checklist is incomplete." };
    });
}

function getCoreElements() {
  return elements.filter((element) => element.tier === "core");
}

function getComponentStatus(element) {
  if (!routeIsChosen(element.id) && strengthValue(element.id) === 0 && checkCompletion(element) === 0) {
    return {
      state: "missing",
      label: "Not started",
      detail: "No substantiation selected"
    };
  }
  if (!routeIsChosen(element.id)) {
    return {
      state: "route",
      label: "Route needed",
      detail: "No substantiation route"
    };
  }
  if (strengthValue(element.id) < 3) {
    return {
      state: "thin",
      label: "Thin",
      detail: `${strengthLabel(strengthValue(element.id))} support`
    };
  }
  const unchecked = missingChecks(element);
  if (unchecked.length) {
    return {
      state: "thin",
      label: "Checks needed",
      detail: `${unchecked.length} substantiation check${unchecked.length === 1 ? "" : "s"} missing`
    };
  }
  return {
    state: "ready",
    label: "Ready",
    detail: `${routeLabel(state.routes[element.id])}, ${strengthLabel(strengthValue(element.id))}`
  };
}

function filteredElements() {
  return elements;
}

function renderClaimPositions() {
  const selectedPosition = state.claimPosition || claimPositionForClaim(state.claim);
  refs.claimPositionGrid.innerHTML = claimPositions
    .map((position) => {
      const inputId = `claim-position-${position.id}`;
      const checked = position.id === selectedPosition ? "checked" : "";
      return `
        <label class="claim-position-option" for="${inputId}">
          <input id="${inputId}" type="radio" name="claim-position" value="${escapeHtml(position.id)}" ${checked}>
          <span>${escapeHtml(position.label)}</span>
        </label>
      `;
    })
    .join("");
}

function renderElements() {
  refs.claimInput.value = state.claim;
  const routeOptions = routes
    .map((route) => `<option value="${route.id}">${escapeHtml(route.label)}</option>`)
    .join("");

  const items = filteredElements();
  refs.elementGrid.innerHTML = items.length
    ? items
        .map((element) => {
          const readyClass = elementIsReady(element.id) ? " is-ready" : "";
          const note = state.notes[element.id] || "";
          const strength = strengthValue(element.id);
          const checkState = selectedChecks(element.id);
          const checklist = element.checks
            .map((check) => {
              const checkId = `check-${element.id}-${check.id}`;
              const isChecked = checkState[check.id] ? "checked" : "";
              return `
                <label class="substantiation-check" for="${checkId}">
                  <input id="${checkId}" type="checkbox" ${isChecked} data-check-element="${element.id}" data-check-id="${check.id}">
                  <span>${escapeHtml(check.label)}</span>
                </label>
              `;
            })
            .join("");
          return `
            <article class="element-card${readyClass}" data-element-card="${element.id}">
              <div class="element-head">
                <div>
                  <div class="element-title">
                    <strong>${escapeHtml(element.title)}</strong>
                    <span class="pill ${element.tier}">required</span>
                  </div>
                  <p>${escapeHtml(element.description)}</p>
                  <section class="component-necessity" aria-label="Why ${escapeHtml(element.title)} is necessary">
                    <strong>Why necessary</strong>
                    <p>${escapeHtml(element.why)}</p>
                  </section>
                </div>
              </div>
              <div class="substantiation">
                <label for="route-${element.id}">Substantiation route</label>
                <select id="route-${element.id}" data-route="${element.id}">
                  ${routeOptions}
                </select>
                <div class="strength-control">
                  <label for="strength-${element.id}">
                    Support strength <strong>${escapeHtml(strengthLabel(strength))}</strong>
                  </label>
                  <input id="strength-${element.id}" type="range" min="0" max="4" step="1" value="${strength}" data-strength="${element.id}">
                  <div class="strength-scale" aria-hidden="true">
                    <span>None</span>
                    <span>Strong</span>
                  </div>
                </div>
                <fieldset class="substantiation-checks">
                  <legend class="substantiation-legend">
                    <span>Substantiation checks</span>
                    <button class="substantiation-help" type="button" aria-label="Explain substantiation checks">
                      <span class="label-help-dot" aria-hidden="true">?</span>
                      <span class="substantiation-tooltip" role="tooltip">
                        These boxes name the specific jobs this mandatory component must do in a coherent objective moral system. Check a box only when the account gives an actual substantiation, not just a label or assertion. A component is ready only when it has a primary route, has at least supported strength, and satisfies every check. Leave a box unchecked when that part still needs an argument.
                      </span>
                    </button>
                  </legend>
                  ${checklist}
                </fieldset>
                <details class="optional-note">
                  <summary>Optional note</summary>
                  <textarea id="note-${element.id}" data-note="${element.id}" rows="3" placeholder="Add a short clarification only if needed.">${escapeHtml(note)}</textarea>
                </details>
              </div>
            </article>
          `;
        })
        .join("")
    : `<article class="element-card"><strong>No components in this view</strong><p>Change the filter or select more components.</p></article>`;

  refs.elementGrid.querySelectorAll("[data-route]").forEach((select) => {
    select.value = state.routes[select.dataset.route] || "none";
  });
}

function renderChallenges() {
  const challengeItems = getChallengesForFilter();
  refs.challengeFilter.value = state.challengeFilter;
  refs.challengeList.innerHTML = challengeItems.length
    ? challengeItems
        .map((challenge) => {
          return `
            <article class="challenge-card">
              <div class="challenge-meta">
                <strong>${escapeHtml(challenge.title)}</strong>
                <span class="pressure ${challenge.pressure}">${challenge.pressure}</span>
              </div>
              <p>${escapeHtml(challenge.summary)}</p>
              <p><strong>Counterfactual</strong> ${escapeHtml(challenge.counterfactual)}</p>
              <ul class="question-list">
                ${challenge.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
              </ul>
              <div class="tag-row">
                ${challenge.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </article>
          `;
        })
        .join("")
    : `<article class="challenge-card"><strong>No matched challenges</strong><p>Choose routes or substantiation checks, or switch the filter to all challenges.</p></article>`;
}

function renderPrompts() {
  const matched = getMatchedChallenges().slice(0, 8);
  const required = getCoreElements();
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const opening = [
    `You claim: ${claim}`,
    "Please identify which required components of an objective moral system are supported, which are only asserted, and which remain missing."
  ].join("\n\n");

  const selectedText = required
    .map((element) => `${element.title}: ${routeLabel(state.routes[element.id] || "none")}, ${strengthLabel(strengthValue(element.id))}`)
    .join("; ");

  refs.promptBoard.innerHTML = `
    <article class="prompt-card">
      <strong>Opening frame</strong>
      <p>${escapeHtml(opening)}</p>
    </article>
    <article class="prompt-card">
      <strong>Current substantiation choices</strong>
      <p>${escapeHtml(selectedText)}</p>
    </article>
    ${matched
      .map(
        (challenge) => `
          <article class="prompt-card">
            <strong>${escapeHtml(challenge.title)}</strong>
            <ul class="question-list">
              ${challenge.questions.slice(0, 2).map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("")}
  `;
}

function renderPresets() {
  refs.presetButtons.innerHTML = profilePresets
    .map(
      (preset) => `
        <button type="button" class="moral-lens-button" data-preset-id="${escapeHtml(preset.id)}">
          <strong>${escapeHtml(preset.label)}</strong>
          <span>${escapeHtml(preset.description)}</span>
        </button>
      `
    )
    .join("");
}

function renderSummary() {
  const required = getCoreElements();
  const readyCount = required.filter((element) => elementIsReady(element.id)).length;
  const completeness = calculateCompleteness();
  const boundaryTests = getBoundaryTests();
  const failures = boundaryTests.filter((test) => test.status === "fail").length;
  const warnings = boundaryTests.filter((test) => test.status === "warn").length;
  const boundaryRisk = failures * 2 + warnings;
  const matched = getMatchedChallenges();
  refs.selectedCount.textContent = String(readyCount);
  refs.selectedCountNote.textContent = `${readyCount} of ${required.length} mandatory components ready`;
  refs.completenessScore.textContent = `${completeness}%`;
  refs.boundaryPressure.textContent = String(boundaryRisk);
  refs.matchedChallengeCount.textContent = String(matched.length);

  refs.boundaryList.innerHTML = boundaryTests
    .map(
      (test) => `
        <article class="boundary-item ${test.status}">
          <strong>${escapeHtml(test.title)}</strong>
          <p>${escapeHtml(test.body)}</p>
        </article>
      `
    )
    .join("");

  const missing = getMissingCore();
  refs.missingList.innerHTML = missing.length
    ? missing
        .slice(0, 8)
        .map(
          (item) => `
            <article class="missing-item">
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.reason)}</p>
            </article>
          `
        )
        .join("")
    : `<article class="boundary-item pass"><strong>Required set covered</strong><p>Every required component has a route, supported strength, and completed checks.</p></article>`;

  const routeCounts = required.reduce((acc, element) => {
    const route = state.routes[element.id] || "none";
    if (route === "none") return acc;
    acc[route] = (acc[route] || 0) + 1;
    return acc;
  }, {});

  const routeItems = Object.entries(routeCounts).sort((a, b) => b[1] - a[1]);
  refs.routeList.innerHTML = routeItems.length
    ? routeItems
        .map(
          ([routeId, count]) => `
            <article class="route-item">
              <strong>${escapeHtml(routeLabel(routeId))}</strong>
              <span>${count}</span>
            </article>
          `
        )
        .join("")
    : `<article class="route-item"><strong>No routes chosen</strong><span>0</span></article>`;

  renderStaticStatus({
    boundaryRisk,
    completeness,
    matched,
    routeItems
  });
}

function renderStaticStatus({ boundaryRisk, completeness, matched, routeItems }) {
  const coreElements = getCoreElements();
  const componentRows = coreElements.map((element) => ({
    element,
    status: getComponentStatus(element)
  }));
  const readyCount = componentRows.filter((row) => row.status.state === "ready").length;
  const missingCount = componentRows.filter((row) => row.status.state === "missing").length;
  const thinCount = componentRows.filter((row) => row.status.state === "thin" || row.status.state === "route").length;
  const topPressures = matched.slice(0, 3);

  refs.statusCompleteness.textContent = `${completeness}%`;
  refs.statusCoreCovered.textContent = `${readyCount}/${coreElements.length}`;
  refs.statusBoundaryRisk.textContent = String(boundaryRisk);
  refs.statusRouteCount.textContent = String(routeItems.filter(([routeId]) => routeId !== "none").length);

  if (readyCount === coreElements.length && boundaryRisk === 0) {
    refs.coherenceStatusBody.textContent =
      "The attempted system currently covers every required component and has no active boundary failures in the tool.";
  } else if (readyCount >= Math.max(1, coreElements.length - 2)) {
    refs.coherenceStatusBody.textContent =
      `The attempted system is partly built: ${readyCount} required components are ready, ${thinCount} need stronger substantiation, and ${missingCount} are missing.`;
  } else if (readyCount > 0) {
    refs.coherenceStatusBody.textContent =
      `The attempted system is still incomplete: ${readyCount} required components are ready, with ${coreElements.length - readyCount} not yet fully supported.`;
  } else {
    refs.coherenceStatusBody.textContent =
      "Choose substantiation options to see whether the attempted objective moral system has the required structure.";
  }

  refs.componentStatusList.innerHTML = componentRows
    .map(
      ({ element, status }) => `
        <article class="component-status ${status.state}">
          <span>${escapeHtml(element.title)}</span>
          <strong>${escapeHtml(status.label)}</strong>
          <small>${escapeHtml(status.detail)}</small>
        </article>
      `
    )
    .join("");

  refs.topPressureList.innerHTML = topPressures.length
    ? `
      <p class="app-step">Top pressure</p>
      ${topPressures
        .map(
          (challenge) => `
            <article>
              <strong>${escapeHtml(challenge.title)}</strong>
              <span>${escapeHtml(challenge.pressure)}</span>
            </article>
          `
        )
        .join("")}
    `
    : `<p class="app-step">Top pressure</p><article><strong>No challenge match yet</strong><span>none</span></article>`;
}

function selectedElementsLines() {
  const required = getCoreElements();
  return required.flatMap((element) => {
    const checked = element.checks.filter((check) => selectedChecks(element.id)[check.id]).map((check) => check.label);
    const unchecked = missingChecks(element).map((check) => check.label);
    const note = (state.notes[element.id] || "").trim();
    return [
      `### ${element.title}`,
      `Route: ${routeLabel(state.routes[element.id] || "none")}`,
      `Support: ${strengthLabel(strengthValue(element.id))} (${strengthValue(element.id)}/4)`,
      `Checks satisfied: ${checked.length ? checked.join("; ") : "None"}`,
      `Checks missing: ${unchecked.length ? unchecked.join("; ") : "None"}`,
      note ? `Optional note: ${note}` : "",
      ""
    ].filter((line) => line !== "");
  });
}

function buildReport(mode = state.reportMode) {
  const required = getCoreElements();
  const readyCount = required.filter((element) => elementIsReady(element.id)).length;
  const missing = getMissingCore();
  const matched = getMatchedChallenges().slice(0, mode === "brief" ? 5 : 10);
  const boundaryTests = getBoundaryTests();
  const claim = state.claim.trim() || "No claim entered.";
  const lines = [
    "# Crosshairs Moral System Stress Test",
    "",
    `Claim: ${claim}`,
    `Completeness: ${calculateCompleteness()}%`,
    `Required components: ${required.length}`,
    `Components ready: ${readyCount} / ${required.length}`,
    ""
  ];

  if (mode === "ai") {
    return buildAiPrompt();
  }

  lines.push("## Required Components", "", ...selectedElementsLines());
  lines.push("## Boundary Tests", "");
  boundaryTests.forEach((test) => {
    lines.push(`- ${test.title}: ${test.status.toUpperCase()} - ${test.body}`);
  });
  lines.push("");

  lines.push("## Incomplete Required Components", "");
  if (!missing.length) {
    lines.push("No incomplete required components.", "");
  } else {
    missing.forEach((item) => lines.push(`- ${item.title}: ${item.reason}`));
    lines.push("");
  }

  lines.push("## Counterfactual Challenges", "");
  matched.forEach((challenge, index) => {
    lines.push(`${index + 1}. ${challenge.title} (${challenge.pressure})`);
    lines.push(`   ${challenge.counterfactual}`);
    challenge.questions.slice(0, mode === "brief" ? 1 : 3).forEach((question) => lines.push(`   - ${question}`));
    lines.push("");
  });

  if (mode === "skeptical") {
    lines.push("## Skeptical Follow-up", "");
    lines.push("- Identify which mandatory component prevents collapse into emotion, obedience, or practical advice.");
    lines.push("- Ask whether the same standard would be accepted if a rival religion used it.");
    lines.push("- Test whether hard cases are decided before or after the preferred conclusion is protected.");
    lines.push("- Require a repair move for every incomplete required component.");
    lines.push("");
  }

  return lines.join("\n");
}

function buildAiPrompt() {
  const required = getCoreElements();
  const matched = getMatchedChallenges().slice(0, 10);
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const selectedData = required
    .map((element) => {
      const note = (state.notes[element.id] || "").trim() || "No substantiation supplied.";
      const checked = element.checks.filter((check) => selectedChecks(element.id)[check.id]).map((check) => check.label);
      const unchecked = missingChecks(element).map((check) => check.label);
      return [
        `${element.title}`,
        `route: ${routeLabel(state.routes[element.id] || "none")}`,
        `support: ${strengthLabel(strengthValue(element.id))} (${strengthValue(element.id)}/4)`,
        `checks satisfied: ${checked.length ? checked.join("; ") : "none"}`,
        `checks missing: ${unchecked.length ? unchecked.join("; ") : "none"}`,
        `note: ${note}`
      ].join(" | ");
    })
    .join("\n");
  const challengeData = matched
    .map((challenge, index) => {
      const questions = challenge.questions.map((question) => `- ${question}`).join("\n");
      return `${index + 1}. ${challenge.title} (${challenge.pressure})\nCounterfactual: ${challenge.counterfactual}\n${questions}`;
    })
    .join("\n\n");

  return [
    "Copy/paste this entire prompt into an AI assistant.",
    "",
    "I am stress-testing a claimed moral system for coherence. The goal is to assess whether it supplies the required components of an objective moral system, rather than collapsing into emotion, obedience, or practical advice.",
    "",
    `Claim under audit: ${claim}`,
    "",
    `Completeness score from the tool: ${calculateCompleteness()}%`,
    "",
    "Mandatory components and substantiation controls:",
    selectedData,
    "",
    "Matched counterfactuals and questions:",
    challengeData || "No challenges matched.",
    "",
    "Please do five things:",
    "1. Steelman the strongest coherent version of this moral-system account.",
    "2. Identify the top unresolved tensions, prioritizing circular authority, access, obligation, guidance, scope, and correction.",
    "3. Explain where the account risks collapsing into emotion, obedience, or practical advice.",
    "4. Suggest the strongest possible repair moves and state what each repair would need to substantiate.",
    "5. Provide cross-examination questions that a Christian defender must answer directly."
  ].join("\n");
}

function renderReports() {
  refs.reportMode.value = state.reportMode;
  refs.finalReport.value = buildReport(state.reportMode);
  refs.aiPrompt.value = buildAiPrompt();
}

function generatePromptsText() {
  const matched = getMatchedChallenges().slice(0, 8);
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const lines = [
    `Claim: ${claim}`,
    "",
    "Challenge frame:",
    "Please identify which required components of an objective moral system are supported and which remain unsubstantiated.",
    ""
  ];
  matched.forEach((challenge, index) => {
    lines.push(`${index + 1}. ${challenge.title}`);
    challenge.questions.slice(0, 2).forEach((question) => lines.push(`- ${question}`));
    lines.push("");
  });
  return lines.join("\n");
}

async function copyText(text, button, resetLabel) {
  const original = resetLabel || button?.textContent || "Copy";
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }
  if (!copied) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.append(textarea);
    textarea.focus();
    textarea.select();
    copied = document.execCommand("copy");
    textarea.remove();
  }
  if (button) {
    button.textContent = copied ? "Copied" : "Copy failed";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  }
}

function applyPreset(presetId) {
  const preset = profilePresets.find((item) => item.id === presetId) || profilePresets[0];
  state = defaultState();
  state.claim = preset.claim;
  state.claimPosition = claimPositionForClaim(preset.claim);
  preset.components.forEach((elementId) => {
    const element = getElementById(elementId);
    state.routes[elementId] = preset.routeOverrides?.[elementId] || preset.route;
    state.strength[elementId] = preset.strengthOverrides?.[elementId] || preset.strength || 3;
    state.checks[elementId] = {};
    element?.checks?.forEach((check) => {
      state.checks[elementId][check.id] = true;
    });
    state.notes[elementId] =
      preset.notes[elementId] ||
      "";
  });
  saveState();
  renderAll();
}

function renderAll() {
  renderClaimPositions();
  renderPresets();
  renderElements();
  renderChallenges();
  renderPrompts();
  renderSummary();
  renderReports();
}

function bindEvents() {
  refs.claimInput.addEventListener("input", (event) => {
    state.claim = event.target.value;
    state.claimPosition = claimPositionForClaim(state.claim);
    saveState();
    renderClaimPositions();
    renderPrompts();
    renderReports();
  });

  refs.claimPositionGrid.addEventListener("change", (event) => {
    const position = claimPositions.find((item) => item.id === event.target.value);
    if (!position) return;
    state.claim = position.claim;
    state.claimPosition = position.id;
    saveState();
    refs.claimInput.value = state.claim;
    renderClaimPositions();
    renderPrompts();
    renderReports();
  });

  refs.elementGrid.addEventListener("change", (event) => {
    const routeId = event.target.dataset.route;
    const strengthId = event.target.dataset.strength;
    const checkElementId = event.target.dataset.checkElement;
    const checkId = event.target.dataset.checkId;
    if (routeId) {
      state.routes[routeId] = event.target.value;
      saveState();
      renderAll();
      return;
    }
    if (strengthId) {
      state.strength[strengthId] = Number(event.target.value);
      saveState();
      renderAll();
      return;
    }
    if (checkElementId && checkId) {
      state.checks[checkElementId] = {
        ...(state.checks[checkElementId] || {}),
        [checkId]: event.target.checked
      };
      saveState();
      renderAll();
    }
  });

  refs.elementGrid.addEventListener("input", (event) => {
    const noteId = event.target.dataset.note;
    if (!noteId) return;
    state.notes[noteId] = event.target.value;
    saveState();
    renderSummary();
    renderChallenges();
    renderPrompts();
    renderReports();
  });

  refs.challengeFilter.addEventListener("change", (event) => {
    state.challengeFilter = event.target.value;
    saveState();
    renderChallenges();
    renderReports();
  });

  refs.reportMode.addEventListener("change", (event) => {
    state.reportMode = event.target.value;
    saveState();
    renderReports();
  });

  refs.presetButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset-id]");
    if (button) applyPreset(button.dataset.presetId);
  });

  refs.loadSampleButton.addEventListener("click", () => applyPreset("scripture-spirit"));
  refs.resetButton.addEventListener("click", () => {
    state = defaultState();
    saveState();
    renderAll();
  });

  refs.copySummaryButton.addEventListener("click", () => copyText(buildReport("brief"), refs.copySummaryButton, "Copy Summary"));
  refs.copyPromptsButton.addEventListener("click", () => copyText(generatePromptsText(), refs.copyPromptsButton, "Copy Prompts"));
  refs.copyReportButton.addEventListener("click", () => copyText(refs.finalReport.value, refs.copyReportButton, "Copy Report"));
  refs.copyAiPromptButton.addEventListener("click", () => copyText(refs.aiPrompt.value, refs.copyAiPromptButton, "Copy AI Prompt"));
  refs.printReportButton.addEventListener("click", () => window.print());
}

bindEvents();
renderAll();
