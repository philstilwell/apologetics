const STORAGE_KEY = "moral-system-stress-test-v2";

const routes = [
  { id: "none", label: "Choose a route" },
  { id: "scripture", label: "Scripture" },
  { id: "god-nature", label: "God's nature" },
  { id: "divine-command", label: "Divine command" },
  { id: "holy-spirit", label: "Holy Spirit guidance" },
  { id: "moral-intuition", label: "Moral intuition" },
  { id: "natural-law", label: "Reason or natural law" },
  { id: "well-being", label: "Well-being or harm" },
  { id: "social-contract", label: "Social contract" },
  { id: "pro-social", label: "Pro-social behavior" },
  { id: "hybrid", label: "Hybrid account" }
];

const elements = [
  {
    id: "semantic-target",
    title: "Stable Moral Meaning",
    tier: "core",
    axis: "clarity",
    description: "Defines what moral terms refer to without relying on undefined words such as right, wrong, good, or evil."
  },
  {
    id: "truth-aptness",
    title: "Truth Aptness",
    tier: "core",
    axis: "ontology",
    description: "Explains whether moral claims can be true or false, and what would make them so."
  },
  {
    id: "ontological-ground",
    title: "Ontological Ground",
    tier: "core",
    axis: "ontology",
    description: "Identifies what exists beyond personal feeling, group preference, or command that grounds moral facts or obligations."
  },
  {
    id: "epistemic-access",
    title: "Epistemic Access",
    tier: "core",
    axis: "access",
    description: "Gives a method for discovering moral truths that sincere investigators can apply and check."
  },
  {
    id: "non-circular-authority",
    title: "Non-Circular Authority",
    tier: "core",
    axis: "access",
    description: "Lets users assess the authority as moral before treating its commands as morally binding."
  },
  {
    id: "normative-force",
    title: "Obligatory Force",
    tier: "core",
    axis: "force",
    description: "Explains why one must comply, not merely why compliance is desired, rewarded, safer, or socially useful."
  },
  {
    id: "action-guidance",
    title: "Action Guidance",
    tier: "core",
    axis: "clarity",
    description: "Produces determinate answers for actual cases rather than only slogans, ideals, or retrospective rationalizations."
  },
  {
    id: "consistency",
    title: "Consistency Over Time",
    tier: "core",
    axis: "stability",
    description: "Keeps the same moral status for like cases unless a principled difference is supplied."
  },
  {
    id: "universality",
    title: "Universality Of Scope",
    tier: "core",
    axis: "scope",
    description: "Specifies who is bound and avoids tribal, historical, or authority-favored exceptions without a clear principle."
  },
  {
    id: "conflict-resolution",
    title: "Conflict Resolution",
    tier: "core",
    axis: "clarity",
    description: "Ranks duties, values, or commands when they collide and explains why that ranking is not arbitrary."
  },
  {
    id: "public-convergence",
    title: "Public Convergence",
    tier: "support",
    axis: "access",
    description: "Provides a process likely to reduce disagreement among competent, sincere users of the system."
  },
  {
    id: "error-correction",
    title: "Error Correction",
    tier: "support",
    axis: "stability",
    description: "Distinguishes moral discovery from cultural drift, reinterpretation, or changing emotional pressure."
  },
  {
    id: "prudence-distinction",
    title: "Prudence Distinction",
    tier: "core",
    axis: "force",
    description: "Separates moral obligation from practical recommendations, incentives, personal goals, or strategies for happiness."
  },
  {
    id: "accountability",
    title: "Accountability",
    tier: "support",
    axis: "force",
    description: "Explains why agents deserve praise, blame, punishment, or judgment rather than merely being managed."
  }
];

const sources = [
  {
    id: "morality-games",
    title: "Morality Games",
    url: "https://freeoffaith.com/2025/03/25/%e2%9c%93-morality-games/",
    note: "Divine-command and moral anti-realist challenge framing."
  },
  {
    id: "coherent-biblical-morality",
    title: "The Absence of a Coherent Biblical Morality",
    url: "https://freeoffaith.com/morality/",
    note: "Verification, circular authority, conflicting intuitions, Holy Spirit divergence, biblical ambiguity, and Christian moral disagreement."
  },
  {
    id: "lawgiver-necessity",
    title: "#43: Moral Lawgiver Necessity",
    url: "https://freeoffaith.com/2024/11/20/43/",
    note: "Challenges the inference from emotional discomfort or social fears to objective morality or a moral lawgiver."
  },
  {
    id: "christian-consensus",
    title: "#41: Christian Moral Consensus",
    url: "https://freeoffaith.com/2024/11/19/41/",
    note: "Tests clarity and consensus across marriage, sex, violence, slavery, generosity, suicide, and other disputed cases."
  },
  {
    id: "changing-cultures",
    title: "#06: Unchanging God Or Changing Cultures",
    url: "https://freeoffaith.com/2024/11/06/06/",
    note: "Presses consistency, universality, precision, accessibility, and historical adaptation in biblical morality."
  },
  {
    id: "juan",
    title: "The Mirage of the Cosmic Rulebook",
    url: "https://freeoffaith.com/juan/",
    note: "Cosmic-rulebook framing and anti-realist challenge material."
  },
  {
    id: "moral-anti-realism",
    title: "Moral Anti-Realism",
    url: "https://freeoffaith.com/2025/04/12/%E2%9C%93-moral-anti-realism/",
    note: "Distinguishes emotion, moral language, obligation, and pro-social behavior."
  }
];

const challenges = [
  {
    id: "euthyphro-split",
    title: "The Euthyphro Split",
    pressure: "high",
    elements: ["ontological-ground", "non-circular-authority", "normative-force"],
    routes: ["divine-command", "god-nature", "scripture"],
    tags: ["authority", "grounding"],
    summary: "If an act is moral only because God commands it, the command appears arbitrary. If God commands it because it is already moral, the standard appears independent of God.",
    counterfactual: "Suppose God commanded cruelty, slavery, or the killing of infants. Would the command make the act moral, or would you judge the command by a prior standard?",
    questions: [
      "Is the command moral because God commands it, or does God command it because it is moral?",
      "What standard lets you identify God's nature as moral before you submit to it?",
      "If the divine command changed tomorrow, would the moral fact change with it?"
    ],
    sourceIds: ["coherent-biblical-morality", "moral-anti-realism", "morality-games"]
  },
  {
    id: "prior-assessment",
    title: "Prior Assessment Trap",
    pressure: "high",
    elements: ["non-circular-authority", "epistemic-access", "truth-aptness"],
    routes: ["scripture", "god-nature", "divine-command", "holy-spirit"],
    tags: ["verification", "circularity"],
    summary: "A system cannot use God's commands as the only evidence that God is morally authoritative while using God's authority to validate those commands.",
    counterfactual: "Imagine two alleged gods, each issuing incompatible commands and each claiming perfect goodness. What non-circular test selects one as morally authoritative?",
    questions: [
      "What could count as evidence that a divine command is immoral?",
      "Can you evaluate God's moral character before accepting God's authority?",
      "If no independent assessment is allowed, how is this different from obedience?"
    ],
    sourceIds: ["coherent-biblical-morality"]
  },
  {
    id: "orphaned-terms",
    title: "Orphaned Moral Terms",
    pressure: "high",
    elements: ["semantic-target", "truth-aptness", "prudence-distinction"],
    routes: ["moral-intuition", "well-being", "pro-social", "hybrid", "natural-law"],
    tags: ["language", "emotion"],
    summary: "Moral words can carry emotional force while remaining untethered from any clear ontology.",
    counterfactual: "Replace every moral word in the claim with an affective or pragmatic term. If the argument still works, the moral vocabulary may be doing rhetorical work rather than explanatory work.",
    questions: [
      "When you say wrong, do you mean objectively forbidden, socially harmful, emotionally abhorrent, or imprudent?",
      "What does the moral word add beyond disapproval, fear, disgust, empathy, or a practical preference?",
      "Could someone share your emotional reaction while rejecting your moral ontology?"
    ],
    sourceIds: ["moral-anti-realism"]
  },
  {
    id: "holy-spirit-divergence",
    title: "Holy Spirit Divergence",
    pressure: "high",
    elements: ["epistemic-access", "public-convergence", "action-guidance"],
    routes: ["holy-spirit"],
    tags: ["access", "disagreement"],
    summary: "Appeals to inner divine guidance do not by themselves produce public, reproducible convergence among sincere believers.",
    counterfactual: "Two sincere Christians pray and report opposite guidance on divorce, sexuality, war, or punishment. Which report is the moral fact, and how can outsiders know?",
    questions: [
      "What prevents Holy Spirit guidance from being indistinguishable from intuition, culture, or bias?",
      "What test resolves two incompatible claims of divine guidance?",
      "Should a non-Christian be culpable for not detecting this private guidance?"
    ],
    sourceIds: ["coherent-biblical-morality", "christian-consensus"]
  },
  {
    id: "scripture-ambiguity",
    title: "Scripture Ambiguity Matrix",
    pressure: "high",
    elements: ["action-guidance", "public-convergence", "epistemic-access"],
    routes: ["scripture", "hybrid"],
    tags: ["clarity", "interpretation"],
    summary: "If an objective moral source is clear, competent users should not routinely produce incompatible answers on core conduct.",
    counterfactual: "Give separated Christians the same Bible and ask for answers on divorce, remarriage, slavery, corporal punishment, sex acts, violence, and generosity. The spread of answers tests the method.",
    questions: [
      "Which interpretive rule decides the disputed case, and why is that rule itself authoritative?",
      "Why would a perfectly clear moral source require so many expert mediators?",
      "Would the same interpretive method have condemned slavery before culture shifted against it?"
    ],
    sourceIds: ["christian-consensus", "coherent-biblical-morality", "changing-cultures"]
  },
  {
    id: "slavery-shift",
    title: "The Slavery Shift",
    pressure: "high",
    elements: ["consistency", "universality", "error-correction"],
    routes: ["scripture", "divine-command", "god-nature", "natural-law", "hybrid"],
    tags: ["history", "scope"],
    summary: "A system that permits a practice under one covenant or culture while condemning it under another needs a principled account of what changed.",
    counterfactual: "If slavery was permitted then but condemned now, did the moral fact change, did human interpretation improve, or was the original command not moral?",
    questions: [
      "Was the most severe biblical slavery morally permissible when regulated by scripture?",
      "If the answer is no, why did the moral source fail to prohibit it clearly?",
      "If the answer is yes, what makes the same practice impermissible now?"
    ],
    sourceIds: ["changing-cultures", "coherent-biblical-morality", "christian-consensus"]
  },
  {
    id: "infant-killing-command",
    title: "Infant Killing Command",
    pressure: "high",
    elements: ["universality", "consistency", "non-circular-authority", "normative-force"],
    routes: ["scripture", "divine-command", "god-nature"],
    tags: ["violence", "authority"],
    summary: "Commands to kill infants or entire populations pressure the claim that divine command delivers a stable, universal moral standard.",
    counterfactual: "If a claimed revelation today ordered believers to kill infants in an enemy group, would obedience be moral if the source were verified as divine?",
    questions: [
      "Can intentional killing of infants be morally required by divine command?",
      "If yes, what remains of universal moral prohibitions?",
      "If no, what standard lets you reject the biblical command as immoral?"
    ],
    sourceIds: ["changing-cultures", "coherent-biblical-morality"]
  },
  {
    id: "cultural-adaptation",
    title: "Cultural Adaptation Problem",
    pressure: "medium",
    elements: ["consistency", "error-correction", "universality"],
    routes: ["scripture", "god-nature", "natural-law", "hybrid"],
    tags: ["history", "progress"],
    summary: "Moral rules that shift alongside culture may reflect human adaptation rather than an unchanging divine standard.",
    counterfactual: "Compare tribal warfare, harsh penalties, slavery regulation, mercy teachings, and modern rights language. The trajectory resembles cultural movement unless a stable principle explains the shifts.",
    questions: [
      "Which moral facts remained fixed while the commands changed?",
      "How do you distinguish progressive revelation from cultural updating?",
      "Could the same explanation defend any future reversal?"
    ],
    sourceIds: ["changing-cultures"]
  },
  {
    id: "rahab-exception",
    title: "Favored Exception Test",
    pressure: "medium",
    elements: ["universality", "conflict-resolution", "consistency"],
    routes: ["scripture", "divine-command", "god-nature", "hybrid"],
    tags: ["exception", "scope"],
    summary: "A rule that admits exceptions for favored persons, tribes, or outcomes needs a principled conflict hierarchy.",
    counterfactual: "If deception is condemned generally but praised when it protects favored agents, the system needs a rule that explains the difference without special pleading.",
    questions: [
      "What general principle permits the exception?",
      "Would that same principle apply to outsiders with rival loyalties?",
      "How do users know when the ordinary rule has been overridden?"
    ],
    sourceIds: ["changing-cultures"]
  },
  {
    id: "accessibility",
    title: "Accessibility Problem",
    pressure: "medium",
    elements: ["epistemic-access", "universality", "public-convergence"],
    routes: ["scripture", "holy-spirit", "god-nature", "natural-law"],
    tags: ["access", "fairness"],
    summary: "A universally binding moral system should be accessible enough for accountable agents to discover what binds them.",
    counterfactual: "Consider people before the Bible, outside Israel, outside Christianity, or without reliable teachers. If they are bound, what access did they have?",
    questions: [
      "Can people be culpable for violating rules they could not reasonably know?",
      "Why would objective moral guidance be filtered through history, translation, and contested interpretation?",
      "What public method allows outsiders to check the alleged standard?"
    ],
    sourceIds: ["changing-cultures", "christian-consensus"]
  },
  {
    id: "intuition-fragmentation",
    title: "Intuition Fragmentation",
    pressure: "high",
    elements: ["epistemic-access", "truth-aptness", "public-convergence"],
    routes: ["moral-intuition", "natural-law", "hybrid", "god-nature"],
    tags: ["intuition", "emotion"],
    summary: "Moral intuitions vary across people, cultures, and eras, so intuition alone struggles to verify objective moral facts.",
    counterfactual: "If one culture intuits a practice as honorable and another intuits it as horrific, the system needs more than intensity of feeling.",
    questions: [
      "What makes one intuition truth-tracking and another merely emotional?",
      "How do you detect when an intuition was formed by culture rather than moral reality?",
      "If God designed moral intuitions, why do they diverge so sharply among sincere believers?"
    ],
    sourceIds: ["coherent-biblical-morality", "moral-anti-realism", "christian-consensus"]
  },
  {
    id: "is-ought-gap",
    title: "Is-Ought Gap",
    pressure: "high",
    elements: ["normative-force", "prudence-distinction", "ontological-ground"],
    routes: ["well-being", "pro-social", "social-contract", "natural-law", "hybrid"],
    tags: ["obligation", "prudence"],
    summary: "Facts about flourishing, harm, cooperation, or happiness do not by themselves entail an obligation unless a value premise is added.",
    counterfactual: "Assume an action increases total well-being but violates someone's deep preference. Why must that person accept well-being as the binding standard?",
    questions: [
      "Why is well-being morally binding rather than personally or socially preferred?",
      "What bridges the move from this promotes flourishing to therefore one must do it?",
      "Could the framework be a strong practical recommendation without being a moral system?"
    ],
    sourceIds: ["lawgiver-necessity", "moral-anti-realism"]
  },
  {
    id: "goal-without-obligation",
    title: "Goal Without Obligation",
    pressure: "medium",
    elements: ["prudence-distinction", "normative-force", "semantic-target"],
    routes: ["pro-social", "well-being", "social-contract", "moral-intuition"],
    tags: ["goals", "anti-realism"],
    summary: "A chosen goal can explain intentional action without implying any objective or prescriptive must.",
    counterfactual: "A person may value compassion and pursue it consistently while denying that anyone is morally obligated to do the same.",
    questions: [
      "Does your framework show an obligation, or only a goal you strongly endorse?",
      "If someone lacks the goal, what makes them incorrect rather than different or dangerous?",
      "Can the same behavior be explained by emotion-derived preference alone?"
    ],
    sourceIds: ["moral-anti-realism", "lawgiver-necessity", "juan"]
  },
  {
    id: "lawgiver-non-sequitur",
    title: "Lawgiver Non Sequitur",
    pressure: "medium",
    elements: ["ontological-ground", "normative-force", "truth-aptness"],
    routes: ["god-nature", "divine-command", "scripture", "hybrid"],
    tags: ["lawgiver", "necessity"],
    summary: "Finding an amoral universe emotionally unacceptable does not logically entail that objective morality or a moral lawgiver exists.",
    counterfactual: "A universe without objective morality could still contain empathy, cooperation, laws, affection, punishment, and stable societies.",
    questions: [
      "Does the argument infer existence from emotional need?",
      "What contradiction follows from a universe containing no objective moral facts?",
      "Could pro-social behavior arise from psychology, incentives, and culture without moral realism?"
    ],
    sourceIds: ["lawgiver-necessity", "moral-anti-realism"]
  },
  {
    id: "consensus-benchmark",
    title: "Consensus Benchmark",
    pressure: "medium",
    elements: ["public-convergence", "action-guidance", "epistemic-access"],
    routes: ["scripture", "holy-spirit", "moral-intuition", "god-nature", "hybrid"],
    tags: ["consensus", "method"],
    summary: "A reliable moral method should reduce disagreement among careful users, especially on central cases.",
    counterfactual: "If sincere ministers or churches sharply disagree after using the same alleged sources, the method may not be publicly reliable.",
    questions: [
      "What level of disagreement would count against the claimed method?",
      "Are disagreements blamed on human sin only after the method fails?",
      "Can the same method predict answers before culture settles them?"
    ],
    sourceIds: ["christian-consensus", "coherent-biblical-morality"]
  },
  {
    id: "accountability-desert",
    title: "Desert Or Management",
    pressure: "medium",
    elements: ["accountability", "normative-force", "truth-aptness"],
    routes: ["social-contract", "well-being", "pro-social", "divine-command", "god-nature"],
    tags: ["accountability", "punishment"],
    summary: "Punishment can be justified pragmatically as deterrence or containment, but moral desert requires a further account.",
    counterfactual: "A society may imprison dangerous people to protect others without showing those people cosmically deserve suffering.",
    questions: [
      "Does punishment express deserved blame or practical risk management?",
      "If desert is real, what makes it real?",
      "If desert is divine, how can humans verify the divine judgment is moral?"
    ],
    sourceIds: ["moral-anti-realism", "coherent-biblical-morality"]
  },
  {
    id: "sufficiency-collapse",
    title: "Sufficiency Collapse",
    pressure: "high",
    elements: ["semantic-target", "ontological-ground", "epistemic-access", "normative-force", "action-guidance"],
    routes: ["none"],
    tags: ["architecture", "sufficiency"],
    summary: "A list of moral claims is not yet a moral system unless it supplies meaning, ground, access, force, guidance, and conflict handling.",
    counterfactual: "A rulebook can command, a preference can motivate, and a policy can help. None alone establishes an actual moral system.",
    questions: [
      "Which selected elements are necessary, and together are they sufficient?",
      "What would still be missing after all your selected elements are granted?",
      "Which element prevents collapse into emotion, obedience, or practical advice?"
    ],
    sourceIds: ["coherent-biblical-morality", "moral-anti-realism"]
  }
];

const profilePresets = [
  {
    id: "divine-command",
    label: "Divine command",
    description: "Treats God's command and nature as the main moral ground.",
    claim: "Christianity provides a coherent objective moral system because moral obligations are grounded in God's nature and expressed through divine commands.",
    route: "divine-command",
    selected: [
      "semantic-target",
      "truth-aptness",
      "ontological-ground",
      "epistemic-access",
      "non-circular-authority",
      "normative-force",
      "action-guidance",
      "consistency",
      "universality",
      "conflict-resolution"
    ],
    notes: {
      "ontological-ground": "Moral facts are grounded in God's perfectly good nature rather than in human preference or social agreement.",
      "non-circular-authority": "God is treated as morally authoritative because perfect goodness belongs to God's nature, not merely because God has power.",
      "normative-force": "Obligation is explained as accountability before the creator and moral lawgiver, not just fear of consequences."
    }
  },
  {
    id: "scripture-spirit",
    label: "Scripture and Spirit",
    description: "Uses biblical revelation, interpretation, and inner guidance.",
    claim: "Christian morality is coherent because scripture, interpreted with the guidance of the Holy Spirit, reveals God's binding moral will.",
    route: "scripture",
    selected: [
      "semantic-target",
      "truth-aptness",
      "ontological-ground",
      "epistemic-access",
      "non-circular-authority",
      "normative-force",
      "action-guidance",
      "consistency",
      "universality",
      "conflict-resolution",
      "public-convergence",
      "error-correction"
    ],
    routeOverrides: {
      "epistemic-access": "holy-spirit",
      "public-convergence": "holy-spirit",
      "error-correction": "scripture"
    },
    notes: {
      "epistemic-access": "Moral knowledge is accessed through scripture, church teaching, conscience, prayer, and Spirit-guided discernment.",
      "action-guidance": "Biblical commands and moral principles are applied to cases through interpretation and Christian formation.",
      "public-convergence": "The church is expected to converge through shared scripture, communal correction, and spiritual maturity."
    }
  },
  {
    id: "well-being",
    label: "Well-being ethic",
    description: "Leans on harm, flourishing, empathy, and social repair.",
    claim: "A coherent moral system should be grounded in the well-being of conscious creatures, not in obedience to authority.",
    route: "well-being",
    selected: [
      "semantic-target",
      "truth-aptness",
      "ontological-ground",
      "epistemic-access",
      "normative-force",
      "action-guidance",
      "consistency",
      "universality",
      "conflict-resolution",
      "public-convergence",
      "error-correction",
      "prudence-distinction"
    ],
    notes: {
      "semantic-target": "Moral terms refer to patterns of avoidable harm, flourishing, fairness, and the treatment of conscious agents.",
      "epistemic-access": "Evidence about harm, empathy, flourishing, and social outcomes gives public access to moral evaluation.",
      "prudence-distinction": "The framework must still explain why well-being is binding rather than merely preferred or useful."
    }
  },
  {
    id: "anti-realist",
    label: "Anti-realist control",
    description: "Tests whether moral talk can be useful without objective moral facts.",
    claim: "Moral language may express emotion-shaped goals and social commitments without describing objective moral facts.",
    route: "pro-social",
    selected: [
      "semantic-target",
      "epistemic-access",
      "action-guidance",
      "consistency",
      "conflict-resolution",
      "public-convergence",
      "error-correction",
      "prudence-distinction"
    ],
    notes: {
      "semantic-target": "Moral language can name shared values, aversions, commitments, and social expectations without positing objective moral properties.",
      "action-guidance": "Action guidance can come from negotiated goals, empathy, law, norms, and practical strategies for reducing harm.",
      "prudence-distinction": "This route intentionally tests whether the system is candidly practical rather than pretending to supply objective obligation."
    }
  }
];

function defaultState() {
  return {
    claim: "",
    selected: {},
    routes: {},
    notes: {},
    challengeFilter: "matched",
    elementFilter: "all",
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
  coherenceStatusBody: document.querySelector("#coherenceStatusBody"),
  componentStatusList: document.querySelector("#componentStatusList"),
  completenessScore: document.querySelector("#completenessScore"),
  copyAiPromptButton: document.querySelector("#copyAiPromptButton"),
  copyPromptsButton: document.querySelector("#copyPromptsButton"),
  copyReportButton: document.querySelector("#copyReportButton"),
  copyShareLinkButton: document.querySelector("#copyShareLinkButton"),
  copyStatus: document.querySelector("#copyStatus"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  elementFilter: document.querySelector("#elementFilter"),
  elementGrid: document.querySelector("#elementGrid"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  finalReport: document.querySelector("#finalReport"),
  loadJsonButton: document.querySelector("#loadJsonButton"),
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
  shareStateOutput: document.querySelector("#shareStateOutput"),
  sourceList: document.querySelector("#sourceList"),
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
    selected: { ...base.selected, ...(source.selected || {}) },
    routes: { ...base.routes, ...(source.routes || {}) },
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

function encodeSharePayload(value) {
  return window.btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function shareLinkForState() {
  const url = new URL(window.location.href);
  url.hash = `state=${encodeSharePayload(state)}`;
  return url.toString();
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
  return routes.find((route) => route.id === routeId)?.label || "Choose a route";
}

function sourceLabel(sourceId) {
  return sources.find((source) => source.id === sourceId)?.title || sourceId;
}

function pressureRank(pressure) {
  return { high: 3, medium: 2, low: 1 }[pressure] || 0;
}

function getSelectedElements() {
  return elements.filter((element) => state.selected[element.id]);
}

function getSelectedRoutes() {
  const selected = getSelectedElements()
    .map((element) => state.routes[element.id] || "none")
    .filter((routeId) => routeId !== "none");
  return [...new Set(selected)];
}

function noteIsSubstantial(elementId) {
  return (state.notes[elementId] || "").trim().length >= 40;
}

function routeIsChosen(elementId) {
  return Boolean(state.routes[elementId] && state.routes[elementId] !== "none");
}

function elementScore(elementId) {
  if (!state.selected[elementId]) return 0;
  let score = 0.38;
  if (routeIsChosen(elementId)) score += 0.24;
  if (noteIsSubstantial(elementId)) score += 0.38;
  return Math.min(1, score);
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
  const selectedIds = getSelectedElements().map((element) => element.id);
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
    ["sufficiency-collapse", "orphaned-terms", "prior-assessment", "is-ought-gap", "scripture-ambiguity"].includes(challenge.id)
  );

  return scored
    .filter((challenge) => challenge.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || pressureRank(b.pressure) - pressureRank(a.pressure))
    .concat(selectedIds.length ? [] : fallback);
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
    ["moral-intuition", "well-being", "social-contract", "pro-social"].includes(routeId)
  );
  const hasAuthorityRoute = selectedRoutes.some((routeId) =>
    ["scripture", "god-nature", "divine-command", "holy-spirit"].includes(routeId)
  );
  const hasPracticalRoute = selectedRoutes.some((routeId) =>
    ["well-being", "social-contract", "pro-social"].includes(routeId)
  );

  const ontologyReady = elementScore("ontological-ground") >= 0.85 && elementScore("truth-aptness") >= 0.6;
  const forceReady = elementScore("normative-force") >= 0.85 && elementScore("prudence-distinction") >= 0.6;
  const authorityReady = elementScore("non-circular-authority") >= 0.85 && elementScore("epistemic-access") >= 0.6;
  const clarityReady = elementScore("action-guidance") >= 0.6 && elementScore("conflict-resolution") >= 0.6;

  return [
    {
      title: "Emotion Boundary",
      status: !hasEmotionRoute ? "warn" : ontologyReady ? "pass" : "fail",
      body: !hasEmotionRoute
        ? "No intuition, well-being, social-contract, or pro-social route is currently carrying the system."
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
        ? "No well-being, contract, or pro-social route is currently carrying the system."
        : forceReady
          ? "The selected account attempts to separate obligation from useful advice or desired outcomes."
          : "The selected account risks being a practical recommendation rather than a binding moral system."
    },
    {
      title: "Guidance Boundary",
      status: clarityReady ? "pass" : "fail",
      body: clarityReady
        ? "The selected account includes action guidance and conflict handling."
        : "The selected account lacks enough case-level guidance or duty ranking to decide hard cases."
    }
  ];
}

function getMissingCore() {
  return elements
    .filter((element) => element.tier === "core")
    .filter((element) => !state.selected[element.id] || !routeIsChosen(element.id) || !noteIsSubstantial(element.id))
    .map((element) => {
      if (!state.selected[element.id]) return { ...element, reason: "Not selected." };
      if (!routeIsChosen(element.id)) return { ...element, reason: "No substantiation route chosen." };
      return { ...element, reason: "Substantiation is too thin." };
    });
}

function getCoreElements() {
  return elements.filter((element) => element.tier === "core");
}

function getComponentStatus(element) {
  if (!state.selected[element.id]) {
    return {
      state: "missing",
      label: "Missing",
      detail: "Not selected"
    };
  }
  if (!routeIsChosen(element.id)) {
    return {
      state: "route",
      label: "Route needed",
      detail: "No substantiation route"
    };
  }
  if (!noteIsSubstantial(element.id)) {
    return {
      state: "thin",
      label: "Thin",
      detail: "Substantiation too thin"
    };
  }
  return {
    state: "ready",
    label: "Ready",
    detail: routeLabel(state.routes[element.id])
  };
}

function filteredElements() {
  const missingIds = new Set(getMissingCore().map((element) => element.id));
  if (state.elementFilter === "core") return elements.filter((element) => element.tier === "core");
  if (state.elementFilter === "selected") return elements.filter((element) => state.selected[element.id]);
  if (state.elementFilter === "missing") return elements.filter((element) => missingIds.has(element.id));
  return elements;
}

function renderElements() {
  refs.claimInput.value = state.claim;
  refs.elementFilter.value = state.elementFilter;
  const routeOptions = routes
    .map((route) => `<option value="${route.id}">${escapeHtml(route.label)}</option>`)
    .join("");

  const items = filteredElements();
  refs.elementGrid.innerHTML = items.length
    ? items
        .map((element) => {
          const checked = state.selected[element.id] ? "checked" : "";
          const selectedClass = checked ? " is-selected" : "";
          const note = state.notes[element.id] || "";
          return `
            <article class="element-card${selectedClass}" data-element-card="${element.id}">
              <div class="element-head">
                <input type="checkbox" ${checked} data-element-toggle="${element.id}" aria-label="${escapeHtml(element.title)}">
                <div>
                  <div class="element-title">
                    <strong>${escapeHtml(element.title)}</strong>
                    <span class="pill ${element.tier}">${element.tier}</span>
                  </div>
                  <p>${escapeHtml(element.description)}</p>
                </div>
              </div>
              <div class="substantiation">
                <label for="route-${element.id}">Substantiation route</label>
                <select id="route-${element.id}" data-route="${element.id}">
                  ${routeOptions}
                </select>
                <label for="note-${element.id}">Substantiation claim</label>
                <textarea id="note-${element.id}" data-note="${element.id}" rows="4" placeholder="State how this element is grounded, known, and applied.">${escapeHtml(note)}</textarea>
              </div>
            </article>
          `;
        })
        .join("")
    : `<article class="element-card"><strong>No elements in this view</strong><p>Change the filter or select more elements.</p></article>`;

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
          const sourceLinks = challenge.sourceIds
            .map((sourceId) => sources.find((source) => source.id === sourceId))
            .filter(Boolean)
            .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.title)}</a>`)
            .join(" | ");
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
              <p>${sourceLinks}</p>
            </article>
          `;
        })
        .join("")
    : `<article class="challenge-card"><strong>No matched challenges</strong><p>Select elements or choose all challenges.</p></article>`;
}

function renderPrompts() {
  const matched = getMatchedChallenges().slice(0, 8);
  const selected = getSelectedElements();
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const opening = [
    `You claim: ${claim}`,
    "Please identify every element you consider necessary for an actual moral system and explain how each is substantiated without collapsing into emotion, obedience, or practical advice."
  ].join("\n\n");

  const selectedText = selected.length
    ? selected.map((element) => `${element.title}: ${routeLabel(state.routes[element.id] || "none")}`).join("; ")
    : "No elements selected yet.";

  refs.promptBoard.innerHTML = `
    <article class="prompt-card">
      <strong>Opening frame</strong>
      <p>${escapeHtml(opening)}</p>
    </article>
    <article class="prompt-card">
      <strong>Current selections</strong>
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

function renderSources() {
  refs.sourceList.innerHTML = sources
    .map(
      (source) => `
        <article class="source-card">
          <strong>${escapeHtml(source.title)}</strong>
          <p>${escapeHtml(source.note)}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.url)}</a></p>
        </article>
      `
    )
    .join("");
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
  const selected = getSelectedElements();
  const completeness = calculateCompleteness();
  const boundaryTests = getBoundaryTests();
  const failures = boundaryTests.filter((test) => test.status === "fail").length;
  const warnings = boundaryTests.filter((test) => test.status === "warn").length;
  const boundaryRisk = failures * 2 + warnings;
  const matched = getMatchedChallenges();
  refs.selectedCount.textContent = String(selected.length);
  refs.selectedCountNote.textContent = selected.length === 1 ? "1 element selected" : `${selected.length} elements selected`;
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
    : `<article class="boundary-item pass"><strong>Core covered</strong><p>All core elements have a route and a substantive claim.</p></article>`;

  const routeCounts = selected.reduce((acc, element) => {
    const route = state.routes[element.id] || "none";
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
    : `<article class="route-item"><strong>No routes selected</strong><span>0</span></article>`;

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
      "The attempted system currently covers every core component and has no active boundary failures in the tool.";
  } else if (readyCount >= 8) {
    refs.coherenceStatusBody.textContent =
      `The attempted system is partly built: ${readyCount} core components are ready, ${thinCount} need stronger substantiation, and ${missingCount} are missing.`;
  } else if (readyCount > 0) {
    refs.coherenceStatusBody.textContent =
      `The attempted system is still incomplete: ${readyCount} core components are ready, with ${coreElements.length - readyCount} not yet fully supported.`;
  } else {
    refs.coherenceStatusBody.textContent =
      "Select elements to see whether the attempted moral system has the necessary core components.";
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
  const selected = getSelectedElements();
  if (!selected.length) return ["No elements selected."];
  return selected.flatMap((element) => [
    `### ${element.title}`,
    `Route: ${routeLabel(state.routes[element.id] || "none")}`,
    `Substantiation: ${(state.notes[element.id] || "").trim() || "None supplied."}`,
    ""
  ]);
}

function buildReport(mode = state.reportMode) {
  const selected = getSelectedElements();
  const missing = getMissingCore();
  const matched = getMatchedChallenges().slice(0, mode === "brief" ? 5 : 10);
  const boundaryTests = getBoundaryTests();
  const claim = state.claim.trim() || "No claim entered.";
  const lines = [
    "# Crosshairs Moral System Stress Test",
    "",
    `Claim: ${claim}`,
    `Completeness: ${calculateCompleteness()}%`,
    `Selected elements: ${selected.length} / ${elements.length}`,
    ""
  ];

  if (mode === "ai") {
    return buildAiPrompt();
  }

  lines.push("## Selected Elements", "", ...selectedElementsLines());
  lines.push("## Boundary Tests", "");
  boundaryTests.forEach((test) => {
    lines.push(`- ${test.title}: ${test.status.toUpperCase()} - ${test.body}`);
  });
  lines.push("");

  lines.push("## Missing Core", "");
  if (!missing.length) {
    lines.push("No missing core elements.", "");
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
    lines.push("- Identify which selected element prevents collapse into emotion, obedience, or practical advice.");
    lines.push("- Ask whether the same standard would be accepted if a rival religion used it.");
    lines.push("- Test whether hard cases are decided before or after the preferred conclusion is protected.");
    lines.push("- Require a repair move for every missing core element.");
    lines.push("");
  }

  if (mode !== "brief") {
    lines.push("## Sources", "");
    sources.forEach((source) => lines.push(`- ${source.title}: ${source.url}`));
  }

  return lines.join("\n");
}

function buildAiPrompt() {
  const selected = getSelectedElements();
  const matched = getMatchedChallenges().slice(0, 10);
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const selectedData = selected
    .map((element) => {
      const note = (state.notes[element.id] || "").trim() || "No substantiation supplied.";
      return `${element.title} | route: ${routeLabel(state.routes[element.id] || "none")} | claim: ${note}`;
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
    "I am stress-testing a claimed moral system for coherence. The goal is to assess whether it supplies the necessary and sufficient elements of an actual moral system, rather than collapsing into emotion, obedience, or practical advice.",
    "",
    `Claim under audit: ${claim}`,
    "",
    `Completeness score from the tool: ${calculateCompleteness()}%`,
    "",
    "Selected elements and substantiation:",
    selectedData || "No elements selected.",
    "",
    "Matched counterfactuals and questions:",
    challengeData || "No challenges matched.",
    "",
    "Please do six things:",
    "1. Steelman the strongest coherent version of this moral-system account.",
    "2. Identify the top unresolved tensions, prioritizing circular authority, access, obligation, guidance, consistency, universality, and conflict resolution.",
    "3. Explain where the account risks collapsing into emotion, obedience, or practical advice.",
    "4. Suggest the strongest possible repair moves and state what each repair would need to substantiate.",
    "5. Provide cross-examination questions that a Christian defender must answer directly.",
    "6. Generate follow-up prompts for deeper analysis, including one image-generation prompt for a quantified dashboard-style depiction of the selected elements, routes, boundary risks, and counterfactual pressure."
  ].join("\n");
}

function renderReports() {
  refs.reportMode.value = state.reportMode;
  refs.finalReport.value = buildReport(state.reportMode);
  refs.aiPrompt.value = buildAiPrompt();
  if (refs.shareStateOutput && !document.activeElement?.isSameNode(refs.shareStateOutput)) {
    refs.shareStateOutput.value = JSON.stringify(state, null, 2);
  }
}

function generatePromptsText() {
  const matched = getMatchedChallenges().slice(0, 8);
  const claim = state.claim.trim() || "Christianity provides a coherent objective moral system.";
  const lines = [
    `Claim: ${claim}`,
    "",
    "Challenge frame:",
    "Please identify every element you consider necessary for an actual moral system and explain how each is substantiated without collapsing into emotion, obedience, or practical advice.",
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
  if (refs.copyStatus) {
    refs.copyStatus.textContent = copied ? "Copied." : "Copy failed. Select the text and copy manually.";
    window.setTimeout(() => {
      refs.copyStatus.textContent = "";
    }, 2200);
  }
}

function applyPreset(presetId) {
  const preset = profilePresets.find((item) => item.id === presetId) || profilePresets[0];
  state = defaultState();
  state.claim = preset.claim;
  preset.selected.forEach((elementId) => {
    state.selected[elementId] = true;
    state.routes[elementId] = preset.routeOverrides?.[elementId] || preset.route;
    state.notes[elementId] =
      preset.notes[elementId] ||
      `This preset treats ${routeLabel(state.routes[elementId])} as the route for substantiating ${elements.find((element) => element.id === elementId)?.title || elementId}. Edit this claim to make the actual argument precise.`;
  });
  saveState();
  renderAll();
}

function updateElementSelection(elementId, selected) {
  state.selected[elementId] = selected;
  if (selected && !state.routes[elementId]) state.routes[elementId] = "none";
}

function renderAll() {
  renderPresets();
  renderElements();
  renderChallenges();
  renderPrompts();
  renderSources();
  renderSummary();
  renderReports();
}

function bindEvents() {
  refs.claimInput.addEventListener("input", (event) => {
    state.claim = event.target.value;
    saveState();
    renderPrompts();
    renderReports();
  });

  refs.elementGrid.addEventListener("change", (event) => {
    const toggleId = event.target.dataset.elementToggle;
    const routeId = event.target.dataset.route;
    if (toggleId) {
      updateElementSelection(toggleId, event.target.checked);
      saveState();
      renderAll();
      return;
    }
    if (routeId) {
      state.routes[routeId] = event.target.value;
      if (event.target.value !== "none") state.selected[routeId] = true;
      saveState();
      renderAll();
    }
  });

  refs.elementGrid.addEventListener("input", (event) => {
    const noteId = event.target.dataset.note;
    if (!noteId) return;
    state.notes[noteId] = event.target.value;
    if (event.target.value.trim()) state.selected[noteId] = true;
    saveState();
    renderSummary();
    renderChallenges();
    renderPrompts();
    renderReports();
  });

  refs.elementFilter.addEventListener("change", (event) => {
    state.elementFilter = event.target.value;
    saveState();
    renderElements();
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

  refs.copyShareLinkButton.addEventListener("click", () =>
    copyText(shareLinkForState(), refs.copyShareLinkButton, "Copy State Link")
  );
  refs.exportJsonButton.addEventListener("click", () => {
    refs.shareStateOutput.value = JSON.stringify(state, null, 2);
    refs.shareStateOutput.focus();
    refs.shareStateOutput.select();
    refs.copyStatus.textContent = "JSON shown below. Copy it to save this audit state.";
  });
  refs.loadJsonButton.addEventListener("click", () => {
    try {
      state = normalizeState(JSON.parse(refs.shareStateOutput.value));
      saveState();
      renderAll();
      refs.copyStatus.textContent = "Saved JSON restored.";
    } catch {
      refs.copyStatus.textContent = "Could not restore that JSON.";
    }
    window.setTimeout(() => {
      refs.copyStatus.textContent = "";
    }, 2200);
  });
}

bindEvents();
renderAll();
