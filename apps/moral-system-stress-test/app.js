const STORAGE_KEY = "moral-system-stress-test-v3";
const THRESHOLD_BASE_URL = "../moral-system-threshold/";
const PARTICULARS_BASE_URL = "../moral-particulars-audit/";
let importedFromThreshold = false;

const stressToThresholdRouteMap = {
  "divine-command": "divine-command",
  scripture: "scripture",
  "god-nature": "god-nature",
  "holy-spirit": "holy-spirit",
  conscience: "conscience",
  "church-tradition": "church-tradition",
  "natural-law": "reason-natural-law",
  "human-flourishing": "harm-flourishing",
  hybrid: "hybrid"
};

const claimPositionThresholdRouteMap = {
  "divine-command": "divine-command",
  "god-nature": "god-nature",
  "scripture-authority": "scripture",
  "scripture-spirit": "holy-spirit",
  "natural-law": "reason-natural-law",
  conscience: "conscience",
  "church-tradition": "church-tradition",
  "great-commandments": "scripture",
  "virtue-character": "god-nature",
  "kingdom-ethic": "scripture",
  "flourishing-in-god": "harm-flourishing",
  "moral-lawgiver": "divine-command"
};

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

const SUPPORTED_STRENGTH_VALUE = 3;
const BOUNDARY_RISK_POINTS = {
  pass: 0,
  warn: 1,
  fail: 2
};

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
    checkHelpIntro: "For Moral Meaning, the checks ask whether the claim gives moral language stable content before using that language to argue for objectivity.",
    checks: [
      {
        id: "defines-terms",
        label: "Defines the key moral terms",
        help: "The account states what terms such as good, wrong, duty, evil, and obligation mean instead of relying on their emotional force."
      },
      {
        id: "objective-sense",
        label: "Distinguishes objective wrong from dislike",
        help: "The account explains how a moral claim can remain true even when an individual, culture, or authority does not feel disapproval."
      },
      {
        id: "non-circular-language",
        label: "Avoids circular moral labels",
        help: "The account does not define moral words by simply repeating moral words, such as saying good means good, moral means moral, or right means aligned with the right standard without explaining the standard."
      }
    ]
  },
  {
    id: "truth-ground",
    title: "Truth Maker",
    tier: "core",
    axis: "ontology",
    description: "Explains whether moral claims can be true and what makes them true beyond human preference.",
    why: "A coherent objective moral system needs moral claims to be truth-apt and needs something that makes them true. Otherwise moral claims function as attitudes, commands, or social signals rather than objective facts.",
    checkHelpIntro: "For Truth Maker, the checks ask whether the account treats moral claims as real truth claims and identifies what in reality makes them true.",
    checks: [
      {
        id: "truth-apt",
        label: "Treats moral claims as true or false",
        help: "The account treats statements like cruelty is wrong as claims that can be correct or incorrect, not merely as commands, approvals, social rules, or expressions of feeling."
      },
      {
        id: "truth-maker",
        label: "Identifies what makes them true",
        help: "The account names the truth-making feature, fact, standard, relation, nature, or principle that explains why the moral claim is true."
      },
      {
        id: "preference-independent",
        label: "Grounds truth beyond preference or power",
        help: "The account explains why moral truth does not change merely because a person wants it to, a group votes for it, or a powerful authority enforces it."
      }
    ]
  },
  {
    id: "authority-check",
    title: "Authority Check",
    tier: "core",
    axis: "access",
    description: "Explains how an authority is recognized as morally good without assuming its commands are already moral.",
    why: "If authority is accepted as moral only because it says so, the system becomes obedience rather than moral evaluation. A coherent system needs a way to identify moral authority without circularly assuming it.",
    checkHelpIntro: "For Authority Check, the checks ask whether the account can recognize legitimate moral authority without treating authority itself as the definition of morality.",
    checks: [
      {
        id: "independent-test",
        label: "Gives a test for moral authority",
        help: "The account supplies criteria for judging whether a claimed authority is morally trustworthy, rather than assuming the authority is moral from the start."
      },
      {
        id: "not-command-only",
        label: "Avoids good because commanded",
        help: "The account explains why a command is morally good without reducing goodness to the bare fact that the command was issued."
      },
      {
        id: "can-detect-failure",
        label: "Could detect an immoral command",
        help: "The account has a principled way to reject a false, mistaken, or immoral command claim instead of making every alleged command automatically binding."
      }
    ]
  },
  {
    id: "moral-access",
    title: "Moral Access",
    tier: "core",
    axis: "access",
    description: "Gives a reliable way accountable agents can know the standard and check disputed claims.",
    why: "Objective obligations cannot guide or fairly bind agents if agents have no reliable access to them. The system needs a method for knowing moral truth and resolving disagreement.",
    checkHelpIntro: "For Moral Access, the checks ask whether accountable agents can know, compare, and dispute moral claims by a usable method.",
    checks: [
      {
        id: "public-method",
        label: "Uses an explainable method",
        help: "The account provides a method that can be stated, examined, and applied, rather than relying only on private certainty or unexplained intuition."
      },
      {
        id: "handles-disagreement",
        label: "Handles sincere disagreement",
        help: "The account gives a way to compare rival moral conclusions when sincere, informed people claim different answers."
      },
      {
        id: "accessible",
        label: "Is accessible to those held accountable",
        help: "The account explains how the relevant moral standard is available enough to the people who are expected to obey it or be judged by it."
      }
    ]
  },
  {
    id: "binding-force",
    title: "Binding Force",
    tier: "core",
    axis: "force",
    description: "Explains why moral requirements bind agents rather than merely advising, rewarding, or threatening them.",
    why: "A moral system must explain why one ought to comply, not merely why compliance is useful, rewarded, or preferred. Without binding force, morality thins into prudence or strategy.",
    checkHelpIntro: "For Binding Force, the checks ask whether the account explains obligation itself instead of only explaining incentives, consequences, threats, or benefits.",
    checks: [
      {
        id: "obligation",
        label: "Explains obligation rather than benefit",
        help: "The account explains why an agent ought to do the moral thing even when it is costly, unrewarded, unpopular, or personally disadvantageous."
      },
      {
        id: "not-prudence",
        label: "Distinguishes duty from prudence",
        help: "The account separates moral duty from wise strategy, self-interest, reward seeking, punishment avoidance, or social stability."
      },
      {
        id: "accountability",
        label: "Explains blame or accountability",
        help: "The account explains why moral failure deserves criticism, guilt, blame, or accountability rather than merely counting as an impractical choice."
      }
    ]
  },
  {
    id: "case-guidance",
    title: "Case Guidance",
    tier: "core",
    axis: "clarity",
    description: "Produces determinate answers for actual cases and ranks duties when they conflict.",
    why: "A system that cannot decide concrete cases is not yet action-guiding. It needs principles that apply before the desired conclusion is chosen and rules for conflicts between duties.",
    checkHelpIntro: "For Case Guidance, the checks ask whether the account can move from abstract moral claims to actual judgments without improvising after the desired answer is known.",
    checks: [
      {
        id: "decides-cases",
        label: "Decides concrete cases",
        help: "The account can apply its standard to real cases and produce more than a slogan, impulse, or broad aspiration."
      },
      {
        id: "ranks-duties",
        label: "Ranks competing duties",
        help: "The account explains what happens when duties collide, such as truth-telling, mercy, justice, loyalty, harm prevention, and promise keeping."
      },
      {
        id: "predictive",
        label: "Works before the desired conclusion",
        help: "The account can be applied before the preferred answer is selected, so the method is not reverse engineered to protect a prior conclusion."
      }
    ]
  },
  {
    id: "consistent-scope",
    title: "Consistent Scope",
    tier: "core",
    axis: "scope",
    description: "Applies across persons, cultures, and time without ad hoc tribal or authority-favored exceptions.",
    why: "Objective morality must say who is bound and why like cases receive like treatment. Without consistent scope, exceptions can protect favored groups, eras, or authorities by special pleading.",
    checkHelpIntro: "For Consistent Scope, the checks ask whether the account applies its moral standard across agents and situations without ad hoc exceptions.",
    checks: [
      {
        id: "like-cases",
        label: "Treats like cases alike",
        help: "The account applies the same judgment when the morally relevant facts are the same, even across different people, groups, cultures, or eras."
      },
      {
        id: "scope",
        label: "Specifies who is bound",
        help: "The account identifies which agents are morally accountable under the standard and explains why they fall inside or outside its scope."
      },
      {
        id: "no-special-pleading",
        label: "Avoids special pleading",
        help: "The account does not create exceptions for favored persons, traditions, authorities, or historical moments unless the exception rests on a relevant moral difference."
      }
    ]
  },
  {
    id: "correction",
    title: "Correction Method",
    tier: "core",
    axis: "stability",
    description: "Explains how mistaken moral interpretations are identified and repaired without ad hoc revision.",
    why: "Every moral community can misread, rationalize, or inherit bad norms. A coherent system needs a principled way to identify error and distinguish moral discovery from convenient revision.",
    checkHelpIntro: "For Correction Method, the checks ask whether the account can identify and repair mistaken moral interpretation without simply redescribing change as correctness.",
    checks: [
      {
        id: "detects-error",
        label: "Detects mistaken interpretation",
        help: "The account gives criteria for recognizing when a person, institution, tradition, community, or interpretation has gotten a moral question wrong."
      },
      {
        id: "learning-rule",
        label: "Distinguishes learning from moral change",
        help: "The account explains how to tell the difference between discovering a moral truth more accurately and changing the moral standard itself."
      },
      {
        id: "repair-rule",
        label: "Has a rule for revising mistakes",
        help: "The account provides a principled repair process for revising moral beliefs, including cherished or inherited ones, without ad hoc convenience."
      }
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
    summary: "A list of moral claims is not a full moral system unless it explains what moral words mean, what makes the claims true, who has authority, how people can know the standard, why it binds, how it guides choices, who it applies to, and how mistakes are corrected.",
    counterfactual: "A rulebook can give commands, feelings can motivate people, and policies can be useful. None of those by itself creates an objective moral system.",
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
  thresholdImportBanner: document.querySelector("#thresholdImportBanner"),
  thresholdImportCopy: document.querySelector("#thresholdImportCopy"),
  thresholdImportClaim: document.querySelector("#thresholdImportClaim"),
  thresholdLinks: document.querySelectorAll("[data-threshold-link]"),
  truthSourceLegend: document.querySelector("#truthSourceLegend"),
  truthSourcePlot: document.querySelector("#truthSourcePlot"),
  particularsLinks: document.querySelectorAll("[data-particulars-link]"),
  topPressureList: document.querySelector("#topPressureList")
};

function loadState() {
  const fromLocation = loadStateFromLocation();
  if (fromLocation) {
    importedFromThreshold = true;
    const normalized = normalizeState(fromLocation);
    persistState(normalized);
    clearTransferredStateFromLocation();
    return normalized;
  }
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
  persistState(state);
}

function persistState(snapshot) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function loadStateFromLocation() {
  const searchParams = new URLSearchParams(window.location.search);
  const queryState = searchParams.get("state");
  if (queryState) return decodeStatePayload(queryState);
  return loadStateFromHash();
}

function decodeStatePayloadBytes(encoded) {
  const normalized = encoded.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = window.atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function decodeStatePayload(encoded) {
  try {
    return decodeStatePayloadBytes(encoded);
  } catch {
    try {
      return JSON.parse(decodeURIComponent(escape(window.atob(encoded))));
    } catch {
      return null;
    }
  }
}

function loadStateFromHash() {
  if (!window.location.hash.startsWith("#state=")) return null;
  const encoded = window.location.hash.slice("#state=".length);
  return decodeStatePayload(encoded);
}

function clearTransferredStateFromLocation() {
  const url = new URL(window.location.href);
  let changed = false;
  if (url.searchParams.has("state")) {
    url.searchParams.delete("state");
    changed = true;
  }
  if (url.hash.startsWith("#state=")) {
    url.hash = "";
    changed = true;
  }
  if (!changed) return;
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function encodeStatePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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

function mapStressRouteToThresholdRoute(routeId) {
  return stressToThresholdRouteMap[routeId] || null;
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

function average(values) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
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

function summarizeSelectedRoutes() {
  const counts = getCoreElements().reduce((acc, element) => {
    const routeId = state.routes[element.id] || "none";
    if (routeId === "none") return acc;
    acc[routeId] = (acc[routeId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || routeLabel(a[0]).localeCompare(routeLabel(b[0])))
    .map(([routeId, count]) => ({
      id: routeId,
      label: routeLabel(routeId),
      count
    }));
}

function getTruthSourceRoutes() {
  return routes.filter((route) => route.id !== "none");
}

function routeIsChosen(elementId) {
  return Boolean(state.routes[elementId] && state.routes[elementId] !== "none");
}

function routeCompletion(elementId) {
  return routeIsChosen(elementId) ? 1 : 0;
}

function strengthCompletion(elementId) {
  return Math.min(strengthValue(elementId) / SUPPORTED_STRENGTH_VALUE, 1);
}

function elementScore(elementId) {
  const element = getElementById(elementId);
  return average([
    routeCompletion(elementId),
    strengthCompletion(elementId),
    checkCompletion(element)
  ]);
}

function elementIsReady(elementId) {
  const element = getElementById(elementId);
  return Boolean(
    routeIsChosen(elementId) &&
      strengthValue(elementId) >= SUPPORTED_STRENGTH_VALUE &&
      checkCompletion(element) === 1
  );
}

function averageScores(ids) {
  return average(ids.map((id) => elementScore(id)));
}

function calculateCompleteness() {
  const coreIds = elements.filter((element) => element.tier === "core").map((element) => element.id);
  return Math.round(averageScores(coreIds) * 100);
}

function elementGap(elementId) {
  return Math.max(0, 1 - elementScore(elementId));
}

function challengeRouteIds(challenge) {
  return challenge.routes.filter((routeId) => routeId !== "none");
}

function scoreChallenge(challenge) {
  const attemptedIds = new Set(getAttemptedElements().map((element) => element.id));
  const selectedRoutes = new Set(getSelectedRoutes());
  const activeElementIds = challenge.elements.filter(
    (id) => attemptedIds.has(id) && !elementIsReady(id)
  );
  const routeIds = challengeRouteIds(challenge);
  const activeRouteIds = routeIds.filter((id) => selectedRoutes.has(id));
  const componentScore = average(activeElementIds.map((id) => elementGap(id)));
  const routeScore = routeIds.length ? activeRouteIds.length / routeIds.length : 0;
  const genericScore =
    challenge.routes.includes("none") && attemptedIds.size
      ? Math.max(0, 1 - averageScores(getCoreElements().map((element) => element.id)))
      : 0;
  const activeScores = [componentScore, routeScore, genericScore].filter((score) => score > 0);
  const matchScore = Math.round(average(activeScores) * 100);

  return {
    ...challenge,
    matchScore,
    componentScore,
    routeScore,
    genericScore,
    activeElementIds,
    activeRouteIds
  };
}

function compareChallenges(a, b) {
  return (
    b.matchScore - a.matchScore ||
    pressureRank(b.pressure) - pressureRank(a.pressure) ||
    a.title.localeCompare(b.title)
  );
}

function getMatchedChallenges() {
  const attempted = getAttemptedElements();
  const scored = challenges.map(scoreChallenge);

  const fallback = scored.filter((challenge) =>
    ["sufficiency-collapse", "meaning-gap", "prior-assessment", "scripture-ambiguity"].includes(challenge.id)
  );

  if (!attempted.length) return fallback;

  return scored.filter((challenge) => challenge.matchScore > 0).sort(compareChallenges);
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

  const ontologyReady = elementIsReady("truth-ground") && elementIsReady("moral-meaning");
  const forceReady = elementIsReady("binding-force");
  const authorityReady = elementIsReady("authority-check") && elementIsReady("moral-access");
  const clarityReady = elementIsReady("case-guidance");

  return [
    {
      id: "emotion",
      title: "Emotion Boundary",
      status: !hasEmotionRoute ? "warn" : ontologyReady ? "pass" : "fail",
      body: !hasEmotionRoute
        ? "No conscience or flourishing route is currently carrying the system."
        : ontologyReady
          ? "The selected account attempts to ground moral terms beyond emotional force."
          : "The selected account risks redescribing emotion, empathy, disgust, or preference as morality.",
      help: [
        {
          label: "What this boundary tests",
          body: "It asks whether the moral claim is doing more than reporting approval, disapproval, conscience, empathy, disgust, or a preferred vision of flourishing."
        },
        {
          label: "Pass means",
          body: "If emotion-adjacent routes are carrying the claim, Moral Meaning and Truth Maker support are strong enough to distinguish objective wrongness from felt aversion or preference."
        },
        {
          label: "Warning means",
          body: "No conscience or flourishing route is currently active, so this specific collapse risk is not the main pressure point under the present selections."
        },
        {
          label: "Failure means",
          body: "An emotion-adjacent route is active while stable moral meaning or truth-making support is incomplete, so the claim may be borrowing moral language from feeling."
        }
      ]
    },
    {
      id: "obedience",
      title: "Obedience Boundary",
      status: !hasAuthorityRoute ? "warn" : authorityReady ? "pass" : "fail",
      body: !hasAuthorityRoute
        ? "No divine, scriptural, or spiritual authority route is currently carrying the system."
        : authorityReady
          ? "The selected account attempts to assess authority without simply submitting to it."
          : "The selected account risks treating moral truth as obedience to an authority already assumed to be moral.",
      help: [
        {
          label: "What this boundary tests",
          body: "It asks whether the moral claim can evaluate authority as morally good rather than treating command, scripture, tradition, or spiritual authority as automatically moral."
        },
        {
          label: "Pass means",
          body: "Authority routes are active, but Authority Check and Moral Access are strong enough to explain how legitimate moral authority is recognized and disputed."
        },
        {
          label: "Warning means",
          body: "No divine, scriptural, spiritual, or church-authority route is currently active, so obedience is not the main current dependency."
        },
        {
          label: "Failure means",
          body: "An authority route is active without enough independent authority-checking or access, so the claim may collapse into obeying a source already assumed to be right."
        }
      ]
    },
    {
      id: "practical",
      title: "Practical Boundary",
      status: !hasPracticalRoute ? "warn" : forceReady ? "pass" : "fail",
      body: !hasPracticalRoute
        ? "No flourishing route is currently carrying the system."
        : forceReady
          ? "The selected account attempts to separate obligation from useful advice or desired outcomes."
          : "The selected account risks being a practical recommendation rather than a binding moral system.",
      help: [
        {
          label: "What this boundary tests",
          body: "It asks whether the moral claim explains obligation itself, not merely what tends to help people flourish, cooperate, avoid harm, or get better outcomes."
        },
        {
          label: "Pass means",
          body: "A practical or flourishing route may be active, but Binding Force is strong enough to separate moral duty from useful strategy."
        },
        {
          label: "Warning means",
          body: "No flourishing route is currently active, so practical usefulness is not the main current dependency."
        },
        {
          label: "Failure means",
          body: "The claim leans on flourishing or usefulness while Binding Force is incomplete, so it may show that an action is advisable without showing that it is morally required."
        }
      ]
    },
    {
      id: "guidance",
      title: "Guidance Boundary",
      status: clarityReady ? "pass" : "fail",
      body: clarityReady
        ? "The selected account includes case guidance and duty ranking."
        : "The selected account lacks enough case-level guidance or duty ranking to decide hard cases.",
      help: [
        {
          label: "What this boundary tests",
          body: "It asks whether the moral claim can guide actual decisions, especially when principles conflict or hard cases pull in different directions."
        },
        {
          label: "Pass means",
          body: "Case Guidance is ready, so the account includes enough case application and duty ranking to attempt concrete judgments."
        },
        {
          label: "Warning means",
          body: "This boundary does not use a warning state because every attempted moral system needs action guidance, regardless of which route carries it."
        },
        {
          label: "Failure means",
          body: "Case Guidance is incomplete, so the claim may sound objective in abstraction while still lacking a method for deciding real disputes."
        }
      ]
    }
  ];
}

function calculateBoundaryRisk(boundaryTests = getBoundaryTests()) {
  return boundaryTests.reduce(
    (total, test) => total + (BOUNDARY_RISK_POINTS[test.status] ?? 0),
    0
  );
}

function getMissingCore() {
  return elements
    .filter((element) => element.tier === "core")
    .filter((element) => !elementIsReady(element.id))
    .map((element) => {
      if (!routeIsChosen(element.id)) return { ...element, reason: "No substantiation route chosen." };
      if (strengthValue(element.id) < SUPPORTED_STRENGTH_VALUE) return { ...element, reason: "Support strength is below supported." };
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
  if (strengthValue(element.id) < SUPPORTED_STRENGTH_VALUE) {
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

function renderSubstantiationTooltip(element, tooltipId) {
  const checkRows = element.checks
    .map(
      (check) => `
        <span class="tooltip-check-item">
          <strong>${escapeHtml(check.label)}</strong>
          <span>${escapeHtml(check.help || "This checkbox should be marked only when the chosen route gives this part real support.")}</span>
        </span>
      `
    )
    .join("");
  return `
    <span class="substantiation-tooltip" id="${tooltipId}" role="tooltip">
      <strong>${escapeHtml(element.title)} checks</strong>
      <span class="tooltip-intro">${escapeHtml(element.checkHelpIntro || "These checks ask whether this mandatory component is substantiated rather than merely named.")}</span>
      <span class="tooltip-check-list">${checkRows}</span>
      <span class="tooltip-coda">Mark a checkbox only when the chosen route and strength rating actually substantiate that requirement. Leave it unchecked when the point is merely asserted, assumed, or still needs an argument.</span>
    </span>
  `;
}

function renderBoundaryTooltip(test, tooltipId) {
  const helpRows = test.help
    .map(
      (item) => `
        <span class="tooltip-check-item">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.body)}</span>
        </span>
      `
    )
    .join("");
  return `
    <span class="section-tooltip boundary-tooltip" id="${tooltipId}" role="tooltip">
      <strong>${escapeHtml(test.title)}</strong>
      <span class="tooltip-intro">Boundary tests ask whether the current moral-system claim remains distinct from a nearby non-moral substitute.</span>
      <span class="tooltip-check-list">${helpRows}</span>
      <span class="tooltip-coda">The card text gives the current reading from your selections; this tooltip explains how to interpret that reading.</span>
    </span>
  `;
}

function renderMissingTooltip(element, tooltipId) {
  return `
    <span class="section-tooltip missing-tooltip" id="${tooltipId}" role="tooltip">
      <strong>Why ${escapeHtml(element.title)} is necessary</strong>
      <span class="tooltip-intro">${escapeHtml(element.why)}</span>
      <span class="tooltip-coda">The box stays in this section until this component has a chosen route, supported strength, and completed substantiation checks.</span>
    </span>
  `;
}

function renderTopPressureTooltip(challenge, tooltipId) {
  const componentHitIds = challenge.activeElementIds || [];
  const routeHitIds = challenge.activeRouteIds || [];
  const componentHits = componentHitIds
    .map((id) => getElementById(id)?.title || id);
  const routeHits = routeHitIds
    .map((id) => routeLabel(id));
  const componentText = componentHits.length ? componentHits.join(", ") : "No incomplete required part is tied to this challenge";
  const routeText = routeHits.length ? routeHits.join(", ") : "No selected source route is tied to this challenge";
  return `
    <span class="section-tooltip top-pressure-tooltip" id="${tooltipId}" role="tooltip">
      <strong>${escapeHtml(challenge.title)}</strong>
      <span class="tooltip-intro">${escapeHtml(challenge.summary)}</span>
      <span class="tooltip-check-list">
        <span class="tooltip-check-item">
          <strong>Required parts involved</strong>
          <span>${escapeHtml(componentText)}</span>
        </span>
        <span class="tooltip-check-item">
          <strong>Source routes involved</strong>
          <span>${escapeHtml(routeText)}</span>
        </span>
        <span class="tooltip-check-item">
          <strong>Case to test</strong>
          <span>${escapeHtml(challenge.counterfactual)}</span>
        </span>
      </span>
      <span class="tooltip-coda">This challenge appears when your selected required parts or source routes connect to it. The badge shows how serious the issue is.</span>
    </span>
  `;
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
          const tooltipId = `substantiation-help-${element.id}`;
          const tooltip = renderSubstantiationTooltip(element, tooltipId);
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
            <article class="element-card${readyClass}" data-element-card="${element.id}" tabindex="-1">
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
                    <button class="substantiation-help" type="button" aria-label="Explain ${escapeHtml(element.title)} substantiation checks" aria-describedby="${tooltipId}">
                      <span class="label-help-dot" aria-hidden="true">?</span>
                      ${tooltip}
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
        .map((challenge, index) => {
          const challengeNumber = String(index + 1).padStart(2, "0");
          return `
            <article class="challenge-card challenge-${challenge.pressure}" id="${challengeAnchor(challenge.id)}" tabindex="-1">
              <div class="challenge-card-top">
                <span class="challenge-number" aria-hidden="true">${challengeNumber}</span>
                <div class="challenge-title-block">
                  <div class="challenge-meta">
                    <span class="challenge-type">Counterfactual challenge</span>
                    <span class="pressure ${challenge.pressure}">${challenge.pressure}</span>
                  </div>
                  <h3>${escapeHtml(challenge.title)}</h3>
                  <p class="challenge-summary">${escapeHtml(challenge.summary)}</p>
                </div>
              </div>
              <section class="challenge-counterfactual" aria-label="Counterfactual test for ${escapeHtml(challenge.title)}">
                <span class="challenge-kicker">Counterfactual test</span>
                <p>${escapeHtml(challenge.counterfactual)}</p>
              </section>
              <div class="challenge-question-block" aria-label="Cross-examination prompts">
                <div class="challenge-section-head">
                  <span>Cross-examination</span>
                  <span>${challenge.questions.length} prompts</span>
                </div>
                <ol class="question-list">
                  ${challenge.questions.map((question) => `<li><span>${escapeHtml(question)}</span></li>`).join("")}
                </ol>
              </div>
              <div class="tag-row" aria-label="Challenge tags">
                ${challenge.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </article>
          `;
        })
        .join("")
    : `<article class="challenge-card"><strong>No matched challenges</strong><p>Choose routes or substantiation checks, or switch the filter to all challenges.</p></article>`;
}

function challengeAnchor(challengeId) {
  return `challenge-${challengeId}`;
}

function openChallengeLink(link) {
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#challenge-")) return;
  let target = document.getElementById(href.slice(1));
  if (!target) {
    state.challengeFilter = "matched";
    saveState();
    renderChallenges();
    renderReports();
    target = document.getElementById(href.slice(1));
  }
  if (!target) return;
  window.history.pushState(null, "", href);
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
  target.focus({ preventScroll: true });
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

function renderTruthSourceMap() {
  if (!refs.truthSourcePlot || !refs.truthSourceLegend) return;

  const sourceRoutes = getTruthSourceRoutes();
  const coreElements = getCoreElements();
  const laneWidth = 100 / sourceRoutes.length;
  const elementsByRoute = new Map(
    sourceRoutes.map((route) => [
      route.id,
      coreElements
        .filter((element) => state.routes[element.id] === route.id)
        .sort((a, b) => a.title.localeCompare(b.title))
    ])
  );
  const sourceSummaries = sourceRoutes
    .map((route, index) => {
      const laneElements = elementsByRoute.get(route.id) || [];
      if (!laneElements.length) return null;
      const averageStrength =
        laneElements.reduce((total, element) => total + strengthValue(element.id), 0) / laneElements.length;
      const averageChecks =
        laneElements.reduce((total, element) => total + checkCompletion(element), 0) / laneElements.length;
      const readyCount = laneElements.filter((element) => elementIsReady(element.id)).length;
      return {
        route,
        index,
        count: laneElements.length,
        averageStrength,
        averageChecks,
        readyCount,
        allReady: readyCount === laneElements.length
      };
    })
    .filter(Boolean);

  refs.truthSourcePlot.innerHTML = `
    <div class="source-axis source-x-axis">Source lanes</div>
    <div class="source-axis source-y-axis">Support strength</div>
    ${sourceRoutes
      .map(
        (route, index) => `
          <span class="source-lane${index % 2 ? " is-alt" : ""}" style="left:${index * laneWidth}%; width:${laneWidth}%"></span>
          <span class="source-x-tick" style="left:${index * laneWidth + laneWidth / 2}%">${index + 1}</span>
        `
      )
      .join("")}
    ${[0, 1, 2, 3, 4]
      .map((value) => `<span class="source-y-tick" style="bottom:${value * 25}%">${value}</span>`)
      .join("")}
    ${sourceSummaries
      .map((summary) => {
        const x = summary.index * laneWidth + laneWidth * 0.17;
        const width = laneWidth * 0.66;
        const y = summary.averageStrength * 25;
        const thickness = 5 + summary.averageChecks * 6;
        const opacity = 0.55 + summary.averageChecks * 0.43;
        const statusClass = summary.allReady ? "ready" : "thin";
        const componentNames = (elementsByRoute.get(summary.route.id) || [])
          .map((element) => element.title)
          .join(", ");
        const label = `${summary.route.label}: ${summary.count} component${summary.count === 1 ? "" : "s"} (${componentNames}), average support ${summary.averageStrength.toFixed(1)}/4, ${Math.round(summary.averageChecks * 100)}% checks complete`;
        return `
          <button
            type="button"
            class="source-line ${statusClass}"
            data-source-route="${escapeHtml(summary.route.id)}"
            style="left:${x}%; bottom:${y}%; width:${width}%; height:${thickness}px; opacity:${opacity}"
            title="${escapeHtml(label)}"
            aria-label="${escapeHtml(`Open ${label}`)}"
          ></button>
        `;
      })
      .join("")}
    ${sourceSummaries.length ? "" : `<div class="source-empty">Choose substantiation routes to plot the claimed sources of moral truth.</div>`}
  `;

  refs.truthSourceLegend.innerHTML = sourceRoutes
    .map((route, index) => {
      const laneElements = elementsByRoute.get(route.id) || [];
      const count = laneElements.length;
      const componentList = count
        ? laneElements.map((element) => element.title).join(", ")
        : "No components assigned";
      return `
        <article class="source-legend-item${count ? " has-points" : ""}">
          <strong>${index + 1}</strong>
          <span>${escapeHtml(route.label)}</span>
          <em>${count}</em>
          <small class="source-component-list${count ? "" : " empty"}">${escapeHtml(componentList)}</small>
        </article>
      `;
    })
    .join("");
}

function renderSummary() {
  const required = getCoreElements();
  const readyCount = required.filter((element) => elementIsReady(element.id)).length;
  const completeness = calculateCompleteness();
  const boundaryTests = getBoundaryTests();
  const boundaryRisk = calculateBoundaryRisk(boundaryTests);
  const matched = getMatchedChallenges();
  refs.selectedCount.textContent = String(readyCount);
  refs.selectedCountNote.textContent = `${readyCount} of ${required.length} mandatory components ready`;
  refs.completenessScore.textContent = `${completeness}%`;
  refs.boundaryPressure.textContent = String(boundaryRisk);
  refs.matchedChallengeCount.textContent = String(matched.length);

  refs.boundaryList.innerHTML = boundaryTests
    .map(
      (test) => {
        const tooltipId = `boundary-help-${test.id}`;
        return `
        <article class="boundary-item ${test.status}">
          <div class="boundary-item-head">
            <strong>${escapeHtml(test.title)}</strong>
            <button class="section-help boundary-help" type="button" aria-label="Explain ${escapeHtml(test.title)}" aria-describedby="${tooltipId}">
              <span class="label-help-dot" aria-hidden="true">?</span>
              ${renderBoundaryTooltip(test, tooltipId)}
            </button>
          </div>
          <p>${escapeHtml(test.body)}</p>
        </article>
      `;
      }
    )
    .join("");

  const missing = getMissingCore();
  refs.missingList.innerHTML = missing.length
    ? missing
        .slice(0, 8)
        .map(
          (item) => {
            const tooltipId = `missing-help-${item.id}`;
            return `
            <article class="missing-item">
              <div class="missing-item-head">
                <strong>${escapeHtml(item.title)}</strong>
                <button class="section-help missing-help" type="button" aria-label="Explain why ${escapeHtml(item.title)} is necessary" aria-describedby="${tooltipId}">
                  <span class="label-help-dot" aria-hidden="true">?</span>
                  ${renderMissingTooltip(item, tooltipId)}
                </button>
              </div>
              <p>${escapeHtml(item.reason)}</p>
            </article>
          `;
          }
        )
        .join("")
    : `<article class="boundary-item pass"><strong>Required set covered</strong><p>Within this audit, none of the eight mandatory components is currently marked incomplete: each one has a chosen substantiation route, a supported strength rating, and all required checks completed.</p><p>This does not prove the moral system is coherent. It means the component checklist is filled out enough for the harder questions to move to boundary tests, route dependency, and counterfactual challenges.</p></article>`;

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

  renderTruthSourceMap();
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
          (challenge) => {
            const tooltipId = `top-pressure-help-${challenge.id}`;
            return `
              <article class="top-pressure-item">
                <a href="#${challengeAnchor(challenge.id)}" aria-label="View explanation for ${escapeHtml(challenge.title)}">
                  <strong>${escapeHtml(challenge.title)}</strong>
                </a>
                <span class="pressure-badge">${escapeHtml(challenge.pressure)}</span>
                <button class="section-help top-pressure-help" type="button" aria-label="Explain why ${escapeHtml(challenge.title)} is contributing pressure" aria-describedby="${tooltipId}">
                  <span class="label-help-dot" aria-hidden="true">?</span>
                </button>
                ${renderTopPressureTooltip(challenge, tooltipId)}
              </article>
            `;
          }
        )
        .join("")}
    `
    : `<p class="app-step">Top pressure</p><article class="top-pressure-item"><strong>No challenge match yet</strong><span class="pressure-badge">none</span></article>`;
}

function inferThresholdRoute() {
  const mappedRoutes = [
    ...new Set(
      getCoreElements()
        .map((element) => mapStressRouteToThresholdRoute(state.routes[element.id] || "none"))
        .filter(Boolean)
    )
  ];

  if (mappedRoutes.length === 1) return mappedRoutes[0];
  if (mappedRoutes.length > 1) return "hybrid";
  return claimPositionThresholdRouteMap[state.claimPosition] || "divine-command";
}

function buildThresholdState() {
  const thresholdState = {
    route: inferThresholdRoute(),
    claim: state.claim.trim(),
    elements: {}
  };

  getCoreElements().forEach((element) => {
    const routeChosen = routeIsChosen(element.id);
    const strength = strengthValue(element.id);
    const hasChecks = Object.values(selectedChecks(element.id)).some(Boolean);
    const note = (state.notes[element.id] || "").trim();
    let status = "missing";

    if (routeChosen || strength > 0 || hasChecks || note) {
      status = strength >= SUPPORTED_STRENGTH_VALUE ? "substantiated" : "asserted";
    }

    thresholdState.elements[element.id] = {
      status,
      note
    };
  });

  return thresholdState;
}

function buildThresholdHref() {
  return `${THRESHOLD_BASE_URL}?state=${encodeStatePayload(buildThresholdState())}`;
}

function buildParticularsState() {
  const readyComponents = getCoreElements().filter((element) => elementIsReady(element.id));
  const routeSummary = summarizeSelectedRoutes();
  const noteCount = getCoreElements().filter((element) => Boolean((state.notes[element.id] || "").trim())).length;

  return {
    pipelineContext: {
      source: "moral-system-stress-test",
      claim: state.claim.trim(),
      claimPosition: state.claimPosition || claimPositionForClaim(state.claim),
      selectedRoutes: routeSummary,
      readyComponentIds: readyComponents.map((element) => element.id),
      readyComponentTitles: readyComponents.map((element) => element.title),
      noteCount,
      completeness: calculateCompleteness(),
      boundaryRisk: calculateBoundaryRisk(),
      matchedChallengeCount: getMatchedChallenges().length
    }
  };
}

function buildParticularsHref() {
  return `${PARTICULARS_BASE_URL}?state=${encodeStatePayload(buildParticularsState())}`;
}

function updatePipelineLinks() {
  const thresholdHref = buildThresholdHref();
  const particularsHref = buildParticularsHref();

  refs.thresholdLinks.forEach((link) => {
    link.href = thresholdHref;
  });
  refs.particularsLinks.forEach((link) => {
    link.href = particularsHref;
  });
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
    lines.push(
      "No incomplete required components under the current selections. This means each mandatory component has a route, supported strength, and completed checks; it does not by itself prove the system is coherent.",
      ""
    );
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
  updatePipelineLinks();
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
    state.routes[elementId] = preset.routeOverrides?.[elementId] || preset.route;
    state.strength[elementId] = preset.strengthOverrides?.[elementId] || preset.strength || 3;
    state.checks[elementId] = {};
    state.notes[elementId] =
      preset.notes[elementId] ||
      "";
  });
  saveState();
  renderAll();
}

function renderAll() {
  renderThresholdImportNotice();
  renderClaimPositions();
  renderPresets();
  renderElements();
  renderChallenges();
  renderPrompts();
  renderSummary();
  renderReports();
}

function renderThresholdImportNotice() {
  if (!refs.thresholdImportBanner || !refs.thresholdImportCopy || !refs.thresholdImportClaim) return;
  if (!importedFromThreshold) {
    refs.thresholdImportBanner.hidden = true;
    return;
  }

  const importedCount = elements.filter((element) => routeIsChosen(element.id)).length;
  const hasClaim = Boolean(state.claim.trim());
  refs.thresholdImportBanner.hidden = false;
  refs.thresholdImportCopy.textContent = importedCount
    ? `This stress test imported your ${hasClaim ? "claim, " : ""}${importedCount} threshold component${
        importedCount === 1 ? "" : "s"
      }, and any threshold notes as starting points. Now deepen the routes, support levels, and substantiation checks here.`
    : `This stress test imported your ${hasClaim ? "claim" : "threshold setup"} from the preliminary checklist. Now add the component routes, support levels, and substantiation checks here.`;
  refs.thresholdImportClaim.textContent = hasClaim ? `Imported claim: ${state.claim.trim()}` : "";
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

  refs.truthSourcePlot?.addEventListener("click", (event) => {
    const line = event.target.closest("[data-source-route]");
    if (!line) return;
    const card = [...refs.elementGrid.querySelectorAll("[data-element-card]")]
      .find((item) => state.routes[item.dataset.elementCard] === line.dataset.sourceRoute);
    if (!card) return;
    card.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center"
    });
    card.focus({ preventScroll: true });
  });

  refs.challengeFilter.addEventListener("change", (event) => {
    state.challengeFilter = event.target.value;
    saveState();
    renderChallenges();
    renderReports();
  });

  refs.topPressureList.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#challenge-']");
    if (!link) return;
    event.preventDefault();
    openChallengeLink(link);
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
