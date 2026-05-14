const STORAGE_KEY = "fine-tuning-bridge-audit-v1";
const SNAPSHOT_STORAGE_KEY = "fine-tuning-bridge-audit-snapshots-v1";
const SNAPSHOT_SLOT_COUNT = 3;
const THEISM_GRADIENT_BASE_URL = "../theism-gradient-audit/app.html";

const routes = [
  {
    id: "design-only",
    label: "Design only",
    help: "Use this when fine-tuning is being asked only to support purposive calibration, not yet life-purpose, human-purpose, or Christianity.",
    claim: "The apparent fine-tuning of physical constants is evidence of purposive calibration.",
    focusClaims: ["C011", "C012", "C013", "C014"]
  },
  {
    id: "life-purpose",
    label: "Life purpose",
    help: "Use this when the argument wants to move from fine-tuning to a universe intended for life itself.",
    claim: "The universe was intentionally set so that life would emerge.",
    focusClaims: ["C014", "C015", "C018"]
  },
  {
    id: "human-purpose",
    label: "Human purpose",
    help: "Use this when the argument wants to move from life-permission to conscious beings, persons, or something close to human-centered purpose.",
    claim: "The universe was intentionally set for conscious beings or something close to human-purpose.",
    focusClaims: ["C014", "C015", "C016", "C018", "C025"]
  },
  {
    id: "christian-purpose",
    label: "Christian purpose",
    help: "Use this when fine-tuning is being asked to help carry a personal, revelatory, or specifically Christian conclusion.",
    claim: "The universe's fine-tuning points beyond generic design toward a personal or Christian God with purposes related to humans.",
    focusClaims: ["C014", "C015", "C016", "C018", "C019", "C025", "C026", "C041"]
  }
];

const bridgeDefinitions = [
  {
    id: "narrow-range",
    title: "Narrow Range",
    question: "What turns life-permitting from a description of our location into a genuinely narrow target?",
    explanation: [
      "This bridge asks whether the life-permitting region is actually narrow in a meaningful sense, or whether the argument is only pointing out that we exist in one of the regions where beings like us could exist. Simply saying that life depends on certain constants is not yet enough. The case still has to show that the life-friendly region is small relative to a relevant wider range of alternatives.",
      "That matters because fine-tuning only starts to look surprising if life really occupies a sharply limited target. If the argument never establishes a genuinely narrow target, then 'life-permitting' may function more like a description of where observers can appear than like evidence of improbable calibration.",
      "A stronger answer here would explain what the relevant comparison range is, why that range is not arbitrary, and why the life-permitting region should be treated as impressively small rather than merely different from nearby cases."
    ]
  },
  {
    id: "probability-measure",
    title: "Probability Measure",
    question: "What measure over alternatives is being used, and why is it not merely smuggled in?",
    explanation: [
      "This bridge asks how the argument is assigning probability across alternative constants, initial conditions, or cosmic setups. Once someone says a life-permitting universe is 'unlikely,' they are already assuming some way of weighting the alternatives. But that weighting cannot simply be taken for granted.",
      "Without a responsible measure, a probability claim can become rhetorical rather than evidential. The argument may sound mathematically serious while silently relying on an undefined or biased space of possibilities. In that case, 'unlikely' may mean little more than 'I find this striking.'",
      "A stronger answer here would say what alternatives are being compared, why they are being treated as comparable, and why the probability distribution is not being chosen merely because it makes life look rare."
    ]
  },
  {
    id: "observer-selection",
    title: "Observer Selection",
    question: "What keeps anthropic selection from doing most of the explanatory work here?",
    explanation: [
      "This bridge asks what explanatory work is still left once anthropic selection is taken seriously. Observers can only find themselves in regions where observers are possible. So the bare fact that we observe an observer-permitting universe is not automatically surprising in the way it first appears.",
      "That matters because a fine-tuning argument can overstate the puzzle if it ignores the filtering effect built into our situation. If observation-selection already explains a large part of why we should expect to see life-permitting conditions, then design has less remaining work to do.",
      "A stronger answer here would explain why anthropic selection is not enough on its own, and why there is still a residual feature of the universe that remains more surprising under impersonal processes than under the proposed design conclusion."
    ]
  },
  {
    id: "impersonal-alternatives",
    title: "Impersonal Alternatives",
    question: "Which impersonal alternatives remain live, and why do they fail relative to design?",
    explanation: [
      "This bridge asks whether live non-design explanations are being kept on the table long enough to receive a fair hearing. These can include brute chance, deeper physical necessity, unknown future physics, multiverse-style generation, or other impersonal search-space processes that could produce some observer-friendly outcomes without intention.",
      "That matters because design only gains explanatory force if the remaining impersonal alternatives really perform worse. If those alternatives are dismissed too quickly, caricatured, or treated as obviously absurd before they are examined, the argument may be moving to design by default rather than by comparison.",
      "A stronger answer here would name the most serious live impersonal competitors, explain what they would predict, and show why they handle the evidence less well than purposive calibration does."
    ]
  },
  {
    id: "design-step",
    title: "Design Step",
    question: "Why does the case move from fine-tuning to design rather than merely to unexplained selectivity?",
    explanation: [
      "This bridge is the actual move from an interesting pattern to purposive calibration. Even if the universe looks selective in a way that invites explanation, that does not yet mean intention is the best explanation. There is still a big difference between 'this is striking' and 'this was aimed at an end.'",
      "That matters because many arguments quietly slide from surprise to agency. But unexplained selectivity could still remain just that: unexplained. To earn design, the case has to show not only that the universe is interesting, but that purposive choice explains the interesting feature better than the live impersonal alternatives do.",
      "A stronger answer here would say what design specifically explains, why it explains that feature better than the alternatives, and what makes purposive calibration more than a label attached to our sense of improbability."
    ]
  },
  {
    id: "life-step",
    title: "Life Target",
    question: "What makes life the target instead of one more byproduct inside a vast physical process?",
    explanation: [
      "This bridge asks why life should be treated as the intended target rather than merely one byproduct inside a much larger physical setup. A universe could display elegant order, long-lived stars, black holes, stable laws, or some other large-scale output without life being the central point of the arrangement.",
      "That matters because a life-permitting universe is not automatically a life-aimed universe. The mere existence of one local life pocket inside an enormous mostly lifeless cosmos does not by itself show that life is what the universe was mainly trying to produce.",
      "A stronger answer here would explain why the observed universe looks more like a life-targeted system than a system whose main output is order, structure, or some non-biological end, and why life should be treated as the goal rather than an accidental passenger."
    ]
  },
  {
    id: "human-step",
    title: "Human Target",
    question: "What licenses the move from life-permitting to human-centered or person-centered purpose?",
    explanation: [
      "This bridge asks why the case should move from life in general to humans, persons, or conscious moral beings in particular. Even if one grants that life is somehow intended, that still leaves open whether the target is sparse life, abundant life, intelligence, consciousness, persons, or something else entirely.",
      "That matters because human-centered conclusions are much thicker than life-permitting ones. A universe with one tiny pocket of life does not obviously look optimized for beings like us, and the fact that we care about persons is not by itself evidence that persons are the cosmic target.",
      "A stronger answer here would explain what features of the observed universe make a person-centered reading more plausible than sparse-life, rare-observer, or nonhuman-purpose readings."
    ]
  },
  {
    id: "theistic-step",
    title: "Theistic Step",
    question: "What bridge turns generic design into anything like personal theism or Christianity?",
    explanation: [
      "This bridge asks how the argument moves beyond thin design to anything recognizably theistic, personal, caring, revelatory, or Christian. Fine-tuning, even at its strongest, would at most seem to point toward some kind of purposive calibration. It does not automatically tell us that the calibrator loves humans, answers prayer, reveals moral truths, or stands behind Christianity.",
      "That matters because many apologetic arguments borrow later religious conclusions too early. A generic designer, a deistic architect, a mind with opaque goals, and the God of Christian theology are not interchangeable outcomes. Each further step needs its own bridge.",
      "A stronger answer here would say what features of the evidence move the case from generic calibration to personal agency, then from personal agency to moral or revelatory concern, and then from there to anything specifically Christian."
    ]
  }
];

const routeRequirements = {
  "design-only": [
    "narrow-range",
    "probability-measure",
    "observer-selection",
    "impersonal-alternatives",
    "design-step"
  ],
  "life-purpose": [
    "narrow-range",
    "probability-measure",
    "observer-selection",
    "impersonal-alternatives",
    "design-step",
    "life-step"
  ],
  "human-purpose": [
    "narrow-range",
    "probability-measure",
    "observer-selection",
    "impersonal-alternatives",
    "design-step",
    "life-step",
    "human-step"
  ],
  "christian-purpose": [
    "narrow-range",
    "probability-measure",
    "observer-selection",
    "impersonal-alternatives",
    "design-step",
    "life-step",
    "human-step",
    "theistic-step"
  ]
};

const statusOptions = [
  { id: "missing", label: "Missing" },
  { id: "asserted", label: "Asserted" },
  { id: "substantiated", label: "Substantiated" }
];

const statusRank = {
  missing: 0,
  asserted: 1,
  substantiated: 2
};

const scenarioOptions = [
  { id: "", label: "Choose a beach..." },
  { id: "A", label: "A · Massive beach, one rare five-high stack" },
  { id: "B", label: "B · Tiny beach, one five-high stack" },
  { id: "C", label: "C · Massive beach, stacks nearly everywhere" }
];

const scenarioDetails = {
  A: "Massive beach, one rare five-high stack",
  B: "Tiny beach, one five-high stack",
  C: "Massive beach, stacks nearly everywhere"
};

const scenarioOrder = {
  A: 0,
  B: 1,
  C: 2
};

const worldQuestions = [
  {
    id: "actualUniverse",
    label: "Which beach best resembles the actual universe?",
    help: "Do not answer what you wish a designer would create. Answer what the observed cosmos most looks like."
  },
  {
    id: "naturalEmergence",
    label: "Which beach best fits natural emergence in a vast search space?",
    help: "This is the shape you think a huge unguided or impersonal process would most naturally produce."
  },
  {
    id: "sparseDesigner",
    label: "Which beach best fits a designer content with only a little life?",
    help: "Sparse design is different from life-abundant design. Keep that distinction visible."
  },
  {
    id: "lifeMaximizer",
    label: "Which beach best fits a designer strongly optimizing for abundant life?",
    help: "If life is the target, ask whether one tiny life pocket is what that target would naturally look like."
  },
  {
    id: "humanCentered",
    label: "Which beach best fits a designer strongly aiming at humans or human-like persons?",
    help: "This is the strongest world-shape claim. It should not be inherited for free from thin design."
  }
];

const goalDefinitions = [
  {
    id: "orderElegance",
    group: "Non-life targets",
    label: "Order or elegance",
    prompt: "Could ordered law, beauty, or stable structure itself be the target?",
    help: "Move right if you think mathematical beauty, elegant law, or stable order fits the observed universe better than life-centered goals do."
  },
  {
    id: "blackHolesStars",
    group: "Non-life targets",
    label: "Stars, black holes, or grand astrophysical structure",
    prompt: "Could large-scale astrophysical structure be the target rather than biology?",
    help: "Move right if a fine-tuner could reasonably look satisfied with stars, black holes, galaxies, or other large-scale structure even without much life."
  },
  {
    id: "sparseLife",
    group: "Life targets",
    label: "A little life somewhere",
    prompt: "Could one small pocket of life be enough for the intended goal?",
    help: "Move right if you think a designer could be content with a rare local life pocket rather than a universe crowded with life."
  },
  {
    id: "abundantLife",
    group: "Life targets",
    label: "Abundant life",
    prompt: "Would a life-targeted universe look more full of life wherever life could flourish?",
    help: "Move right if you think life as the target should look more widespread, common, or easy to find than our universe currently appears."
  },
  {
    id: "humansPersons",
    group: "Human or personal targets",
    label: "Humans or human-like persons",
    prompt: "Do humans or conscious moral persons look like the visible target?",
    help: "Move right if you think the universe looks more aimed at persons like us than at one possible byproduct among many."
  },
  {
    id: "unknownEnds",
    group: "Human or personal targets",
    label: "Unknown or opaque ends",
    prompt: "Could the target still remain unclear even if design were true?",
    help: "Move right if you think the universe may reflect a purpose we do not understand, rather than a clearly human-centered or life-centered goal."
  },
  {
    id: "economyExpectation",
    group: "Life targets",
    label: "Economical sufficiency",
    prompt: "Would an economical designer allow only enough life for the goal rather than life everywhere?",
    help: "Move right if you expect a designer to allow just enough life for the intended purpose without filling the cosmos with it."
  }
];

const goalGroups = [
  {
    id: "non-life",
    title: "Non-life targets",
    description: "These options treat order or large-scale structure as the goal rather than life."
  },
  {
    id: "life",
    title: "Life targets",
    description: "These options treat life itself as the goal, while still distinguishing sparse life from abundant life."
  },
  {
    id: "human",
    title: "Human or personal targets",
    description: "These options test whether persons like us look like the target, or whether the target still remains unclear."
  }
];

const routeWorldCueByRoute = {
  "design-only":
    "For Design only, the key beach comparison is between the actual universe and a designer who could be content with only a little life.",
  "life-purpose":
    "For Life purpose, the key beach comparison is between the actual universe and a designer strongly optimizing for abundant life.",
  "human-purpose":
    "For Human purpose, the key beach comparison is between the actual universe and a designer strongly aiming at humans or human-like persons.",
  "christian-purpose":
    "For Christian purpose, the key beach comparison is still the human-centered one. The beach test can pressure the human-target step, but it does not by itself test the later Christian bridge."
};

const goalNoteGuidanceByRoute = {
  "design-only": {
    label: "If design remains live, what target looks most plausible rather than merely possible?",
    help: "Name what in the observed universe points toward any specific target at all, or say clearly if the target still remains opaque."
  },
  "life-purpose": {
    label: "What makes life itself look like the target rather than order, sparse structure, or unknown ends?",
    help: "If life still does not stand out clearly as the goal, say that directly rather than borrowing a thicker conclusion."
  },
  "human-purpose": {
    label: "What makes humans or human-like persons look like the target rather than life in general or some other end?",
    help: "Name the feature of the observed universe that points beyond life in general. If that feature is weak, say so plainly."
  },
  "christian-purpose": {
    label: "What makes human or Christian purposes look like the target rather than some other end?",
    help: "Name what bridges the case from generic design or life-purpose into personal or Christian purpose. If that bridge is still thin, say so plainly."
  }
};

const presets = [
  {
    id: "naturalist-seeker",
    label: "Natural-emergence seeker",
    description: "Keeps selection effects, unknown physics, and target ambiguity heavily in view.",
    state: {
      route: "design-only",
      claim: "Fine-tuning may point to an interesting puzzle, but it does not yet clearly point to design.",
      commitments: {
        identityPull: 12,
        delegatedTrust: 18,
        symmetryWillingness: 86,
        mindChangeReadiness: 92,
        priorNote: "Most pressure comes from not wanting 'design' to become a default answer whenever a probability space feels surprising.",
        mindChangeNote: "A clearer probability measure plus a serious defeat of observation-selection would move the design step upward."
      },
      bridges: {
        "narrow-range": { status: "asserted", note: "Some constants do appear life-sensitive, but the target still needs a responsible measure." },
        "probability-measure": { status: "missing", note: "" },
        "observer-selection": { status: "substantiated", note: "Observers can only observe observer-permitting regions, so that explanatory work must be explicitly handled." },
        "impersonal-alternatives": { status: "asserted", note: "Impersonal competitors remain very live." },
        "design-step": { status: "missing", note: "" }
      },
      world: {
        actualUniverse: "A",
        naturalEmergence: "A",
        sparseDesigner: "A",
        lifeMaximizer: "C",
        humanCentered: "B",
        worldNote: "The actual cosmos feels much closer to one rare life pocket in a huge arena than to life-abundance."
      },
      goals: {
        orderElegance: 55,
        blackHolesStars: 52,
        sparseLife: 35,
        abundantLife: 18,
        humansPersons: 12,
        unknownEnds: 84,
        economyExpectation: 62,
        goalNote: "Even under design, humans do not obviously emerge as the target."
      }
    }
  },
  {
    id: "fair-minded-agnostic",
    label: "Fair-minded agnostic",
    description: "Allows a thin design possibility but resists loading life-purpose or human-purpose into it too quickly.",
    state: {
      route: "life-purpose",
      claim: "Fine-tuning may make some purposive calibration plausible, but it is not yet obvious that life itself is the intended target.",
      commitments: {
        identityPull: 26,
        delegatedTrust: 34,
        symmetryWillingness: 74,
        mindChangeReadiness: 76,
        priorNote: "The main pressure is the intuition that a life-friendly universe feels less accidental than a totally dead one.",
        mindChangeNote: "If the actual world shape kept looking like sparse local success rather than visible life-abundance, the life-purpose step would stay weak."
      },
      bridges: {
        "narrow-range": { status: "asserted", note: "The life-permitting window appears narrow, though the measure remains contested." },
        "probability-measure": { status: "asserted", note: "A probability story is being used, but not one I could defend confidently in detail." },
        "observer-selection": { status: "asserted", note: "Anthropic selection matters and cannot just be brushed aside." },
        "impersonal-alternatives": { status: "asserted", note: "Chance, necessity, and unknown-generation stories remain live." },
        "design-step": { status: "asserted", note: "Design feels somewhat live, but not stronger than all impersonal rivals." },
        "life-step": { status: "missing", note: "" }
      },
      world: {
        actualUniverse: "A",
        naturalEmergence: "A",
        sparseDesigner: "A",
        lifeMaximizer: "C",
        humanCentered: "B",
        worldNote: "The actual universe still looks sparse even if design remains a live option."
      },
      goals: {
        orderElegance: 48,
        blackHolesStars: 30,
        sparseLife: 46,
        abundantLife: 36,
        humansPersons: 28,
        unknownEnds: 70,
        economyExpectation: 64,
        goalNote: "I can imagine life as a target, but I cannot yet justify abundant-life or human-centered expectations from fine-tuning alone."
      }
    }
  },
  {
    id: "design-friendly-deist",
    label: "Design-friendly deist",
    description: "Willing to affirm purposive calibration and some life-directed preference, while staying cautious about human or Christian specificity.",
    state: {
      route: "human-purpose",
      claim: "Fine-tuning makes purposive calibration and some life-directed preference plausible, but I am not sure it reaches a human-centered endpoint.",
      commitments: {
        identityPull: 40,
        delegatedTrust: 42,
        symmetryWillingness: 62,
        mindChangeReadiness: 60,
        priorNote: "There is a real pull toward seeing life-permitting order as too suggestive to be accidental.",
        mindChangeNote: "A stronger anthropic or natural-generation account would lower the design and life-target steps."
      },
      bridges: {
        "narrow-range": { status: "substantiated", note: "I think the case that life-sensitive constants occupy a narrow window is genuinely strong." },
        "probability-measure": { status: "asserted", note: "The measure problem remains uncomfortable, but I still treat the narrowness as evidentially meaningful." },
        "observer-selection": { status: "asserted", note: "Selection effects matter, though I do not think they exhaust the puzzle." },
        "impersonal-alternatives": { status: "asserted", note: "Impersonal options remain possible, but I do not see them as decisive." },
        "design-step": { status: "substantiated", note: "Purposive calibration currently explains the narrowness better for me than brute accident alone." },
        "life-step": { status: "asserted", note: "Life seems like at least part of the point, but the actual cosmos is still sparse." },
        "human-step": { status: "missing", note: "" }
      },
      world: {
        actualUniverse: "A",
        naturalEmergence: "A",
        sparseDesigner: "A",
        lifeMaximizer: "B",
        humanCentered: "B",
        worldNote: "Even on design, the actual cosmos still does not look strongly life-maximizing."
      },
      goals: {
        orderElegance: 44,
        blackHolesStars: 22,
        sparseLife: 58,
        abundantLife: 40,
        humansPersons: 36,
        unknownEnds: 58,
        economyExpectation: 78,
        goalNote: "A designer could be content with a little life, but that economy premise does not by itself pick out humans."
      }
    }
  },
  {
    id: "christian-apologist",
    label: "Christian apologist",
    description: "Loads fine-tuning toward human and Christian purpose, so the later bridge pressure becomes much easier to see.",
    state: {
      route: "christian-purpose",
      claim: "The universe's fine-tuning points beyond generic design toward a God with human-related and ultimately Christian purposes.",
      commitments: {
        identityPull: 72,
        delegatedTrust: 66,
        symmetryWillingness: 38,
        mindChangeReadiness: 34,
        priorNote: "Fine-tuning is often treated as part of a larger cumulative case for God, meaning the pressure from that wider case can leak back into this argument.",
        mindChangeNote: "The conclusion would only really drop if several theistic arguments weakened together, not from fine-tuning pressure alone."
      },
      bridges: {
        "narrow-range": { status: "substantiated", note: "The constants appear finely balanced for life." },
        "probability-measure": { status: "asserted", note: "The measure problem is acknowledged but not treated as fatal." },
        "observer-selection": { status: "asserted", note: "Selection effects are real but thought insufficient." },
        "impersonal-alternatives": { status: "asserted", note: "Impersonal alternatives are considered weaker than design." },
        "design-step": { status: "substantiated", note: "Design seems like the best explanation available." },
        "life-step": { status: "substantiated", note: "Life appears to be part of the intended outcome." },
        "human-step": { status: "asserted", note: "Humans feel like the intended endpoint, though the world shape still creates pressure." },
        "theistic-step": { status: "asserted", note: "The argument is functioning inside a broader theistic and Christian framework." }
      },
      world: {
        actualUniverse: "A",
        naturalEmergence: "A",
        sparseDesigner: "A",
        lifeMaximizer: "B",
        humanCentered: "B",
        worldNote: "The actual universe is sparse, but that sparseness is interpreted as compatible with divine economy."
      },
      goals: {
        orderElegance: 28,
        blackHolesStars: 10,
        sparseLife: 36,
        abundantLife: 44,
        humansPersons: 84,
        unknownEnds: 16,
        economyExpectation: 82,
        goalNote: "The main pressure point here is whether divine economy plus sparse life really justifies jumping to human and Christian purpose."
      }
    }
  }
];

const els = {
  routeSelect: document.getElementById("routeSelect"),
  routeHelp: document.getElementById("routeHelp"),
  claimInput: document.getElementById("claimInput"),
  useRouteClaimButton: document.getElementById("useRouteClaimButton"),
  presetButtons: document.getElementById("presetButtons"),
  resetButton: document.getElementById("resetButton"),
  snapshotSlots: document.getElementById("snapshotSlots"),
  checklistGrid: document.getElementById("checklistGrid"),
  worldSelectGrid: document.getElementById("worldSelectGrid"),
  worldRouteCue: document.getElementById("worldRouteCue"),
  worldSummary: document.getElementById("worldSummary"),
  worldNote: document.getElementById("worldNote"),
  goalGrid: document.getElementById("goalGrid"),
  goalNote: document.getElementById("goalNote"),
  goalNoteLabel: document.getElementById("goalNoteLabel"),
  goalNoteHelp: document.getElementById("goalNoteHelp"),
  identityPull: document.getElementById("identityPull"),
  delegatedTrust: document.getElementById("delegatedTrust"),
  symmetryWillingness: document.getElementById("symmetryWillingness"),
  mindChangeReadiness: document.getElementById("mindChangeReadiness"),
  identityPullValue: document.getElementById("identityPullValue"),
  delegatedTrustValue: document.getElementById("delegatedTrustValue"),
  symmetryWillingnessValue: document.getElementById("symmetryWillingnessValue"),
  mindChangeReadinessValue: document.getElementById("mindChangeReadinessValue"),
  priorNote: document.getElementById("priorNote"),
  mindChangeNote: document.getElementById("mindChangeNote"),
  targetRouteValue: document.getElementById("targetRouteValue"),
  honestCeilingValue: document.getElementById("honestCeilingValue"),
  priorPressureValue: document.getElementById("priorPressureValue"),
  substantiatedValue: document.getElementById("substantiatedValue"),
  worldTensionValue: document.getElementById("worldTensionValue"),
  statusLabel: document.getElementById("statusLabel"),
  statusCopy: document.getElementById("statusCopy"),
  diagnosisTarget: document.getElementById("diagnosisTarget"),
  diagnosisCeiling: document.getElementById("diagnosisCeiling"),
  diagnosisTentative: document.getElementById("diagnosisTentative"),
  diagnosisTargetPressure: document.getElementById("diagnosisTargetPressure"),
  collapseList: document.getElementById("collapseList"),
  gradientTransferCopy: document.getElementById("gradientTransferCopy"),
  gradientFocusClaims: document.getElementById("gradientFocusClaims"),
  gradientLinks: document.querySelectorAll("[data-gradient-link]"),
  summaryOutput: document.getElementById("summaryOutput"),
  aiPromptOutput: document.getElementById("aiPromptOutput"),
  copySummaryButton: document.getElementById("copySummaryButton"),
  copyMarkdownButton: document.getElementById("copyMarkdownButton"),
  copyAiPromptButton: document.getElementById("copyAiPromptButton"),
  summaryCopyStatus: document.getElementById("summaryCopyStatus"),
  aiCopyStatus: document.getElementById("aiCopyStatus")
};

function clampScore(value, fallback = 0) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function validScenario(value) {
  return ["A", "B", "C"].includes(value) ? value : "";
}

function createDefaultState() {
  return {
    lastPresetId: "",
    route: "design-only",
    claim: routes[0].claim,
    commitments: {
      identityPull: 25,
      delegatedTrust: 25,
      symmetryWillingness: 70,
      mindChangeReadiness: 70,
      priorNote: "",
      mindChangeNote: ""
    },
    bridges: Object.fromEntries(
      bridgeDefinitions.map((bridge) => [bridge.id, { status: "missing", note: "" }])
    ),
    world: {
      actualUniverse: "",
      naturalEmergence: "",
      sparseDesigner: "",
      lifeMaximizer: "",
      humanCentered: "",
      worldNote: ""
    },
    goals: {
      orderElegance: 40,
      blackHolesStars: 20,
      sparseLife: 30,
      abundantLife: 30,
      humansPersons: 30,
      unknownEnds: 65,
      economyExpectation: 55,
      goalNote: ""
    }
  };
}

function createDefaultSnapshots() {
  return Array.from({ length: SNAPSHOT_SLOT_COUNT }, (_, index) => ({
    id: `slot-${index + 1}`,
    label: `Snapshot ${index + 1}`,
    savedAt: "",
    route: "",
    claim: "",
    status: "",
    data: null
  }));
}

function normalizeState(source) {
  const defaults = createDefaultState();
  const candidate = source && typeof source === "object" ? source : {};

  return {
    lastPresetId: presets.some((preset) => preset.id === candidate.lastPresetId)
      ? candidate.lastPresetId
      : defaults.lastPresetId,
    route: routes.some((route) => route.id === candidate.route) ? candidate.route : defaults.route,
    claim: typeof candidate.claim === "string" ? candidate.claim : defaults.claim,
    commitments: {
      identityPull: clampScore(candidate.commitments?.identityPull, defaults.commitments.identityPull),
      delegatedTrust: clampScore(candidate.commitments?.delegatedTrust, defaults.commitments.delegatedTrust),
      symmetryWillingness: clampScore(candidate.commitments?.symmetryWillingness, defaults.commitments.symmetryWillingness),
      mindChangeReadiness: clampScore(candidate.commitments?.mindChangeReadiness, defaults.commitments.mindChangeReadiness),
      priorNote: typeof candidate.commitments?.priorNote === "string" ? candidate.commitments.priorNote : defaults.commitments.priorNote,
      mindChangeNote: typeof candidate.commitments?.mindChangeNote === "string" ? candidate.commitments.mindChangeNote : defaults.commitments.mindChangeNote
    },
    bridges: Object.fromEntries(
      bridgeDefinitions.map((bridge) => {
        const current = candidate.bridges?.[bridge.id] || {};
        return [
          bridge.id,
          {
            status: statusOptions.some((option) => option.id === current.status) ? current.status : defaults.bridges[bridge.id].status,
            note: typeof current.note === "string" ? current.note : defaults.bridges[bridge.id].note
          }
        ];
      })
    ),
    world: {
      actualUniverse: validScenario(candidate.world?.actualUniverse),
      naturalEmergence: validScenario(candidate.world?.naturalEmergence),
      sparseDesigner: validScenario(candidate.world?.sparseDesigner),
      lifeMaximizer: validScenario(candidate.world?.lifeMaximizer),
      humanCentered: validScenario(candidate.world?.humanCentered),
      worldNote: typeof candidate.world?.worldNote === "string" ? candidate.world.worldNote : defaults.world.worldNote
    },
    goals: {
      orderElegance: clampScore(candidate.goals?.orderElegance, defaults.goals.orderElegance),
      blackHolesStars: clampScore(candidate.goals?.blackHolesStars, defaults.goals.blackHolesStars),
      sparseLife: clampScore(candidate.goals?.sparseLife, defaults.goals.sparseLife),
      abundantLife: clampScore(candidate.goals?.abundantLife, defaults.goals.abundantLife),
      humansPersons: clampScore(candidate.goals?.humansPersons, defaults.goals.humansPersons),
      unknownEnds: clampScore(candidate.goals?.unknownEnds, defaults.goals.unknownEnds),
      economyExpectation: clampScore(candidate.goals?.economyExpectation, defaults.goals.economyExpectation),
      goalNote: typeof candidate.goals?.goalNote === "string" ? candidate.goals.goalNote : defaults.goals.goalNote
    }
  };
}

function normalizeSnapshots(source) {
  const defaults = createDefaultSnapshots();
  const candidate = Array.isArray(source) ? source : [];

  return defaults.map((slot) => {
    const current = candidate.find((item) => item?.id === slot.id) || {};
    const hasData = current.data && typeof current.data === "object";
    const normalizedData = hasData ? normalizeState(current.data) : null;

    return {
      id: slot.id,
      label: slot.label,
      savedAt: typeof current.savedAt === "string" ? current.savedAt : "",
      route: normalizedData ? normalizedData.route : "",
      claim: typeof current.claim === "string" ? current.claim : normalizedData?.claim || "",
      status: typeof current.status === "string" ? current.status : "",
      data: normalizedData
    };
  });
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return createDefaultState();
  }
}

const state = loadState();

function loadSnapshots() {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
    if (!raw) return createDefaultSnapshots();
    return normalizeSnapshots(JSON.parse(raw));
  } catch {
    return createDefaultSnapshots();
  }
}

const snapshots = loadSnapshots();

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveSnapshots() {
  window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshots));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function routeById(id) {
  return routes.find((route) => route.id === id) || routes[0];
}

function snapshotById(snapshotId) {
  return snapshots.find((slot) => slot.id === snapshotId) || null;
}

function routeWorldCue() {
  return routeWorldCueByRoute[state.route] || routeWorldCueByRoute["design-only"];
}

function goalNoteGuidance() {
  return goalNoteGuidanceByRoute[state.route] || goalNoteGuidanceByRoute["design-only"];
}

function bridgeById(id) {
  return bridgeDefinitions.find((bridge) => bridge.id === id);
}

function noteIsPresent(bridgeId) {
  return Boolean((state.bridges[bridgeId]?.note || "").trim());
}

function bridgeWarningVisible(bridgeId) {
  return state.bridges[bridgeId]?.status === "substantiated" && !noteIsPresent(bridgeId);
}

function bridgeStrictReady(bridgeId) {
  return state.bridges[bridgeId]?.status === "substantiated" && noteIsPresent(bridgeId);
}

function bridgeTentativelyLive(bridgeId) {
  return statusRank[state.bridges[bridgeId]?.status] >= statusRank.asserted;
}

function requiredBridgeIds(routeId) {
  return routeRequirements[routeId] || routeRequirements["design-only"];
}

function countStrictBridges() {
  return bridgeDefinitions.filter((bridge) => bridgeStrictReady(bridge.id)).length;
}

function truncateText(value, maxLength = 120) {
  const text = String(value ?? "").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

function formatSavedAt(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}

function comparableStateSnapshot(source) {
  const normalized = normalizeState(source);
  return {
    ...normalized,
    lastPresetId: ""
  };
}

function hasMeaningfulWork() {
  return JSON.stringify(comparableStateSnapshot(state)) !== JSON.stringify(comparableStateSnapshot(createDefaultState()));
}

function strictCeilingId() {
  for (let index = routes.length - 1; index >= 0; index -= 1) {
    const route = routes[index];
    if (requiredBridgeIds(route.id).every(bridgeStrictReady)) return route.id;
  }
  return "below-design";
}

function tentativeCeilingId() {
  for (let index = routes.length - 1; index >= 0; index -= 1) {
    const route = routes[index];
    if (requiredBridgeIds(route.id).every(bridgeTentativelyLive)) return route.id;
  }
  return "below-design";
}

function ceilingLabel(ceilingId) {
  if (ceilingId === "below-design") return "Below design";
  return routeById(ceilingId).label;
}

function priorPressure() {
  const scores = [
    state.commitments.identityPull,
    state.commitments.delegatedTrust,
    100 - state.commitments.symmetryWillingness,
    100 - state.commitments.mindChangeReadiness
  ];
  return Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
}

function relevantWorldModelKey() {
  if (state.route === "design-only") return "sparseDesigner";
  if (state.route === "life-purpose") return "lifeMaximizer";
  return "humanCentered";
}

function worldMismatchScore() {
  const actual = state.world.actualUniverse;
  const expected = state.world[relevantWorldModelKey()];
  if (!actual || !expected) return null;
  return Math.abs(scenarioOrder[actual] - scenarioOrder[expected]) * 50;
}

function worldMismatchLabel(score) {
  if (score === null) return "Not set";
  if (score >= 100) return "High";
  if (score >= 50) return "Moderate";
  return "Low";
}

function targetPressure() {
  const humanBias = Math.max(
    state.goals.humansPersons - state.goals.unknownEnds,
    state.goals.humansPersons - state.goals.orderElegance,
    state.goals.humansPersons - state.goals.blackHolesStars
  );
  const routePenalty =
    state.route === "design-only"
      ? 0
      : state.route === "life-purpose"
        ? 10
        : state.route === "human-purpose"
          ? 20
          : 30;
  const bridgePenalty = bridgeStrictReady("human-step") ? 0 : 20;
  return Math.max(0, Math.min(100, humanBias + routePenalty + bridgePenalty));
}

function severityLabel(score) {
  if (score >= 75) return "High";
  if (score >= 45) return "Moderate";
  return "Low";
}

function buildFlags() {
  const flags = [];
  const currentRoute = routeById(state.route);
  const strictCeiling = strictCeilingId();
  const tentativeCeiling = tentativeCeilingId();
  const routeIndex = routes.findIndex((route) => route.id === state.route);
  const strictIndex = routes.findIndex((route) => route.id === strictCeiling);
  const mismatch = worldMismatchScore();
  const prior = priorPressure();
  const target = targetPressure();

  if (strictIndex < routeIndex) {
    flags.push({
      severity: 95,
      title: "Selected route outruns the current strict ceiling.",
      body: `The audit is aiming at ${currentRoute.label}, but the strongest fully supported ceiling is ${ceilingLabel(strictCeiling)}.`
    });
  }

  if (tentativeCeiling === "below-design") {
    flags.push({
      severity: 92,
      title: "The design step itself is not yet earned.",
      body: "At least one of the core entry bridges remains missing or only asserted: narrow range, probability measure, observer selection, impersonal alternatives, or the design step itself."
    });
  }

  requiredBridgeIds(state.route).forEach((bridgeId) => {
    const bridge = bridgeById(bridgeId);
    const current = state.bridges[bridgeId];
    if (current.status === "missing") {
      flags.push({
        severity: 88,
        title: `${bridge.title} is still missing.`,
        body: bridge.question
      });
    } else if (current.status === "asserted") {
      flags.push({
        severity: 66,
        title: `${bridge.title} is only asserted.`,
        body: `You have named the bridge, but the tool still needs the actual support for it: ${bridge.question}`
      });
    } else if (bridgeWarningVisible(bridgeId)) {
      flags.push({
        severity: 62,
        title: `${bridge.title} is marked substantiated without a support note.`,
        body: "If a bridge is really doing work, name what evidence, control, or argument is carrying it."
      });
    }
  });

  if (prior >= 65) {
    flags.push({
      severity: prior,
      title: "Prior-commitment pressure is high.",
      body: "Identity pull, delegated trust, or weak mind-change willingness may already be inflating the conclusion."
    });
  }

  if (mismatch !== null && mismatch >= 50) {
    flags.push({
      severity: 78 + Math.round(mismatch / 5),
      title: "The actual world shape does not look like the selected route would naturally predict.",
      body: `You mapped the actual universe to ${scenarioDetails[state.world.actualUniverse]}, but the route's relevant model maps to ${scenarioDetails[state.world[relevantWorldModelKey()]]}.`
    });
  }

  if (!bridgeStrictReady("observer-selection")) {
    flags.push({
      severity: 58,
      title: "Observer-selection pressure remains live.",
      body: "If observers can only observe observer-permitting regions, that explanatory work must be handled before design takes the whole burden."
    });
  }

  if (target >= 60) {
    flags.push({
      severity: target,
      title: "Human-target pressure is outrunning the visible bridge support.",
      body: "The goal sliders favor humans or persons strongly, but the human-target bridge remains weak or missing."
    });
  }

  if (
    state.goals.economyExpectation >= 70
    && routes.findIndex((route) => route.id === state.route) >= 1
  ) {
    flags.push({
      severity: 57,
      title: "The economy premise is doing work that may not uniquely support the selected conclusion.",
      body: "A designer's economy could fit sparse designer models as easily as life-abundant or human-centered ones. Economy alone is not a bridge to humans or Christianity."
    });
  }

  return flags.sort((a, b) => b.severity - a.severity);
}

function classifyAudit() {
  const strictCeiling = strictCeilingId();
  const tentativeCeiling = tentativeCeilingId();
  const routeIndex = routes.findIndex((route) => route.id === state.route);
  const strictIndex = routes.findIndex((route) => route.id === strictCeiling);
  const mismatch = worldMismatchScore();
  const prior = priorPressure();
  const flags = buildFlags();

  if (strictCeiling === "below-design") {
    return {
      status: "Bridge not yet earned",
      copy: "The current audit has not yet fully substantiated the move from fine-tuning to purposive calibration itself. Keep the conclusion thin until the entry bridges are stronger.",
      strictCeiling,
      tentativeCeiling,
      flags
    };
  }

  if (strictIndex < routeIndex) {
    return {
      status: "Selected target outruns support",
      copy: `The current route aims at ${routeById(state.route).label}, but the strongest fully supported ceiling is ${ceilingLabel(strictCeiling)}. The gap is bridge pressure, not merely disagreement.`,
      strictCeiling,
      tentativeCeiling,
      flags
    };
  }

  if (mismatch !== null && mismatch >= 50) {
    return {
      status: "World-shape mismatch",
      copy: "The actual universe has been mapped to a world-shape that does not look like the selected route's own expected target. That weakens the thicker interpretation even if thin design remains live.",
      strictCeiling,
      tentativeCeiling,
      flags
    };
  }

  if (prior >= 60) {
    return {
      status: "Prior pressure visible",
      copy: "The bridge work may be partly supported, but prior commitments are still doing noticeable work. Keep the conclusion narrow enough to stay honest about that pressure.",
      strictCeiling,
      tentativeCeiling,
      flags
    };
  }

  return {
    status: "Current route tentatively live",
    copy: "The selected route is at least roughly in line with the current bridge work. The remaining question is how stable that route stays once world-shape and goal-ambiguity pressure are kept fully visible.",
    strictCeiling,
    tentativeCeiling,
    flags
  };
}

function buildCollapseItems(diagnosis) {
  if (!diagnosis.flags.length) {
    return `<li><strong>No major pressure flags.</strong><p>The bridge work is currently quiet enough that the next step is mainly comparison and refinement, not obvious repair.</p></li>`;
  }

  return diagnosis.flags
    .slice(0, 8)
    .map(
      (flag) => `
        <li>
          <strong>${escapeHtml(flag.title)}</strong>
          <p>${escapeHtml(flag.body)}</p>
        </li>
      `
    )
    .join("");
}

function formatBridgeLine(bridgeId) {
  const bridge = bridgeById(bridgeId);
  const current = state.bridges[bridgeId];
  const note = current.note.trim() ? ` | Note: ${current.note.trim()}` : "";
  return `- ${bridge.title}: ${current.status}${bridgeWarningVisible(bridgeId) ? " (missing support note)" : ""}${note}`;
}

function gradientFocusClaims() {
  return routeById(state.route).focusClaims;
}

function buildTransferPayload() {
  const diagnosis = classifyAudit();
  return {
    source: "fine-tuning-bridge-audit",
    route: state.route,
    claim: state.claim.trim(),
    status: diagnosis.status,
    summary: diagnosis.copy,
    strictCeiling: diagnosis.strictCeiling,
    tentativeCeiling: diagnosis.tentativeCeiling,
    recommendedCategory: "Design Deism",
    recommendedClaimIds: gradientFocusClaims(),
    priorityFlags: diagnosis.flags.slice(0, 4).map((flag) => flag.title)
  };
}

function encodeStatePayload(payload) {
  return window.btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function buildGradientHref() {
  return `${THEISM_GRADIENT_BASE_URL}?state=${encodeURIComponent(encodeStatePayload(buildTransferPayload()))}`;
}

function buildSummary() {
  const diagnosis = classifyAudit();
  const mismatch = worldMismatchScore();
  const actual = state.world.actualUniverse ? scenarioDetails[state.world.actualUniverse] : "not set";
  const relevantWorld = state.world[relevantWorldModelKey()]
    ? scenarioDetails[state.world[relevantWorldModelKey()]]
    : "not set";

  const goalLines = goalDefinitions
    .map((goal) => `- ${goal.label}: ${state.goals[goal.id]}/100`)
    .join("\n");

  const worldLines = worldQuestions
    .map((question) => {
      const choice = state.world[question.id];
      return `- ${question.label} ${choice ? `=> ${scenarioDetails[choice]}` : "=> not set"}`;
    })
    .join("\n");

  return [
    "Fine-Tuning Bridge Audit",
    "",
    `Selected route: ${routeById(state.route).label}`,
    `Claim: ${state.claim.trim() || "No claim entered."}`,
    `Status: ${diagnosis.status}`,
    diagnosis.copy,
    "",
    `Strict honest ceiling: ${ceilingLabel(diagnosis.strictCeiling)}`,
    `Tentative ceiling: ${ceilingLabel(diagnosis.tentativeCeiling)}`,
    `Prior pressure: ${priorPressure()}/100`,
    `Substantiated bridges: ${countStrictBridges()}/${bridgeDefinitions.length}`,
    `World-shape tension: ${worldMismatchLabel(mismatch)}${mismatch === null ? "" : ` (${mismatch}/100)`}`,
    `Human-target pressure: ${targetPressure()}/100`,
    "",
    "Prior-commitment notes:",
    `- Identity pull: ${state.commitments.identityPull}/100`,
    `- Delegated trust: ${state.commitments.delegatedTrust}/100`,
    `- Symmetry willingness: ${state.commitments.symmetryWillingness}/100`,
    `- Mind-change willingness: ${state.commitments.mindChangeReadiness}/100`,
    `- Prior note: ${state.commitments.priorNote.trim() || "none"}`,
    `- Mind-change note: ${state.commitments.mindChangeNote.trim() || "none"}`,
    "",
    "Bridge ledger:",
    bridgeDefinitions.map((bridge) => formatBridgeLine(bridge.id)).join("\n"),
    "",
    "Beach/world-shape mapping:",
    worldLines,
    `- World note: ${state.world.worldNote.trim() || "none"}`,
    `- Actual universe: ${actual}`,
    `- Route-relevant expectation: ${relevantWorld}`,
    "",
    "Candidate goals:",
    goalLines,
    `- Goal note: ${state.goals.goalNote.trim() || "none"}`,
    "",
    "Main pressure points:",
    diagnosis.flags.length
      ? diagnosis.flags.slice(0, 6).map((flag) => `- ${flag.title} ${flag.body}`).join("\n")
      : "- No major pressure flags.",
    "",
    "Downstream Theism Gradient focus:",
    `- Recommended claim IDs: ${gradientFocusClaims().join(", ")}`,
    "- Recommended category: Design Deism"
  ].join("\n");
}

function buildMarkdownSummary() {
  const diagnosis = classifyAudit();
  const mismatch = worldMismatchScore();
  const actual = state.world.actualUniverse ? scenarioDetails[state.world.actualUniverse] : "not set";
  const relevantWorld = state.world[relevantWorldModelKey()]
    ? scenarioDetails[state.world[relevantWorldModelKey()]]
    : "not set";

  return [
    "# Fine-Tuning Bridge Audit",
    "",
    `- **Selected route:** ${routeById(state.route).label}`,
    `- **Claim:** ${state.claim.trim() || "No claim entered."}`,
    `- **Status:** ${diagnosis.status}`,
    `- **Strict honest ceiling:** ${ceilingLabel(diagnosis.strictCeiling)}`,
    `- **Tentative ceiling:** ${ceilingLabel(diagnosis.tentativeCeiling)}`,
    `- **Prior pressure:** ${priorPressure()}/100`,
    `- **Substantiated bridges:** ${countStrictBridges()}/${bridgeDefinitions.length}`,
    `- **World-shape tension:** ${worldMismatchLabel(mismatch)}${mismatch === null ? "" : ` (${mismatch}/100)`}`,
    `- **Human-target pressure:** ${targetPressure()}/100`,
    "",
    `> ${diagnosis.copy}`,
    "",
    "## Prior-Commitment Notes",
    "",
    `- Identity pull: ${state.commitments.identityPull}/100`,
    `- Delegated trust: ${state.commitments.delegatedTrust}/100`,
    `- Symmetry willingness: ${state.commitments.symmetryWillingness}/100`,
    `- Mind-change willingness: ${state.commitments.mindChangeReadiness}/100`,
    `- Prior note: ${state.commitments.priorNote.trim() || "none"}`,
    `- Mind-change note: ${state.commitments.mindChangeNote.trim() || "none"}`,
    "",
    "## Bridge Ledger",
    "",
    bridgeDefinitions.map((bridge) => formatBridgeLine(bridge.id)).join("\n"),
    "",
    "## Beach / World-Shape Mapping",
    "",
    worldQuestions
      .map((question) => {
        const choice = state.world[question.id];
        return `- ${question.label}: ${choice ? scenarioDetails[choice] : "not set"}`;
      })
      .join("\n"),
    `- World note: ${state.world.worldNote.trim() || "none"}`,
    `- Actual universe: ${actual}`,
    `- Route-relevant expectation: ${relevantWorld}`,
    "",
    "## Candidate Goals",
    "",
    goalDefinitions.map((goal) => `- ${goal.label}: ${state.goals[goal.id]}/100`).join("\n"),
    `- Goal note: ${state.goals.goalNote.trim() || "none"}`,
    "",
    "## Main Pressure Points",
    "",
    diagnosis.flags.length
      ? diagnosis.flags.slice(0, 6).map((flag) => `- **${flag.title}** ${flag.body}`).join("\n")
      : "- No major pressure flags.",
    "",
    "## Downstream Theism Gradient Focus",
    "",
    `- Recommended claim IDs: ${gradientFocusClaims().join(", ")}`,
    "- Recommended category: Design Deism"
  ].join("\n");
}

function buildAiPrompt() {
  const diagnosis = classifyAudit();
  return [
    "You are auditing a fine-tuning argument for hidden bridge inflation.",
    "",
    "Your job is not to affirm or deny the conclusion reflexively. Instead:",
    "1. Identify the current honest ceiling of the argument.",
    "2. Distinguish thin design from life-purpose, human-purpose, and Christian-purpose moves.",
    "3. Evaluate whether observer selection, impersonal alternatives, or target ambiguity are still doing major work.",
    "4. Use the beach analogy explicitly when discussing world-shape expectations.",
    "5. Name the strongest repair move that would most improve the argument without overclaiming.",
    "",
    `Current route: ${routeById(state.route).label}`,
    `Status: ${diagnosis.status}`,
    `Summary: ${diagnosis.copy}`,
    `Strict ceiling: ${ceilingLabel(diagnosis.strictCeiling)}`,
    `Tentative ceiling: ${ceilingLabel(diagnosis.tentativeCeiling)}`,
    `Prior pressure: ${priorPressure()}/100`,
    `World-shape tension: ${worldMismatchLabel(worldMismatchScore())}`,
    `Human-target pressure: ${targetPressure()}/100`,
    "",
    "Audit data:",
    buildSummary(),
    "",
    "Finish with:",
    "- the narrowest claim the current evidence seems to support",
    "- the strongest live alternative explanation",
    "- the bridge premise most in need of repair",
    "- one suggested follow-up question for the Theism Gradient claims " + gradientFocusClaims().join(", ")
  ].join("\n");
}

function updateRouteContextCopy() {
  els.routeHelp.textContent = routeById(state.route).help;
  els.worldRouteCue.textContent = routeWorldCue();

  const guidance = goalNoteGuidance();
  els.goalNoteLabel.textContent = guidance.label;
  els.goalNoteHelp.textContent = guidance.help;
}

function renderRouteOptions() {
  els.routeSelect.innerHTML = routes
    .map(
      (route) => `
        <option value="${escapeHtml(route.id)}" ${state.route === route.id ? "selected" : ""}>
          ${escapeHtml(route.label)}
        </option>
      `
    )
    .join("");
  els.routeHelp.textContent = routeById(state.route).help;
  els.claimInput.value = state.claim;
}

function renderPresets() {
  els.presetButtons.innerHTML = presets
    .map(
      (preset) => `
        <button class="moral-lens-button" type="button" data-preset="${escapeHtml(preset.id)}">
          <strong>${escapeHtml(state.lastPresetId === preset.id ? `◉ ${preset.label}` : preset.label)}</strong>
          <span>${escapeHtml(preset.description)}</span>
        </button>
      `
    )
    .join("");
}

function renderSnapshots() {
  els.snapshotSlots.innerHTML = snapshots
    .map((slot) => {
      const routeLabel = slot.data ? routeById(slot.route).label : "Empty slot";
      const claimPreview = slot.data
        ? truncateText(slot.claim || slot.data.claim || routeById(slot.route).claim, 128)
        : "No saved audit in this slot yet.";
      const savedMeta = slot.savedAt ? `Saved ${formatSavedAt(slot.savedAt)}` : "No snapshot saved yet.";
      const statusLabel = slot.status || (slot.data ? "Saved" : "Empty");

      return `
        <article class="fine-snapshot-card ${slot.data ? "is-filled" : "is-empty"}">
          <div class="fine-snapshot-head">
            <div>
              <p class="app-step">${escapeHtml(slot.label)}</p>
              <h3>${escapeHtml(routeLabel)}</h3>
            </div>
            <span class="fine-snapshot-status">${escapeHtml(statusLabel)}</span>
          </div>
          <p class="fine-snapshot-meta">${escapeHtml(savedMeta)}</p>
          <p class="fine-snapshot-claim">${escapeHtml(claimPreview)}</p>
          <div class="fine-action-row">
            <button class="ghost" type="button" data-snapshot-save="${escapeHtml(slot.id)}">Save Current</button>
            <button class="ghost" type="button" data-snapshot-load="${escapeHtml(slot.id)}" ${slot.data ? "" : "disabled"}>Load</button>
            <button class="ghost" type="button" data-snapshot-clear="${escapeHtml(slot.id)}" ${slot.data ? "" : "disabled"}>Clear</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderChecklist() {
  els.checklistGrid.innerHTML = bridgeDefinitions
    .map((bridge, index) => {
      const current = state.bridges[bridge.id];
      const warningVisible = bridgeWarningVisible(bridge.id);

      return `
        <article class="threshold-item-card fine-bridge-card ${warningVisible ? "needs-support-note-warning" : ""}" data-bridge-id="${escapeHtml(bridge.id)}">
          <div class="threshold-item-head">
            <div>
              <p class="app-step">Bridge ${index + 1}</p>
              <h3>${escapeHtml(bridge.title)}</h3>
            </div>
            <span class="threshold-collapse-tag">${escapeHtml(current.status)}</span>
          </div>
          <p class="threshold-question">${escapeHtml(bridge.question)}</p>
          <div class="fine-bridge-explainer">
            ${bridge.explanation
              .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
              .join("")}
          </div>
          <div class="segmented three" role="radiogroup" aria-label="${escapeHtml(bridge.title)} status">
            ${statusOptions
              .map(
                (option) => `
                  <input
                    id="${escapeHtml(`${bridge.id}-${option.id}`)}"
                    type="radio"
                    name="status-${escapeHtml(bridge.id)}"
                    value="${escapeHtml(option.id)}"
                    data-bridge-status="${escapeHtml(bridge.id)}"
                    ${current.status === option.id ? "checked" : ""}
                  >
                  <label for="${escapeHtml(`${bridge.id}-${option.id}`)}">${escapeHtml(option.label)}</label>
                `
              )
              .join("")}
          </div>
          <div class="field-group threshold-note-field">
            <label for="${escapeHtml(`note-${bridge.id}`)}">What support is actually doing the work here?</label>
            <textarea id="${escapeHtml(`note-${bridge.id}`)}" data-bridge-note="${escapeHtml(bridge.id)}" rows="3" aria-invalid="${warningVisible ? "true" : "false"}" placeholder="Name the evidence, controls, or argument rather than just repeating the conclusion.">${escapeHtml(current.note)}</textarea>
          </div>
          <p class="threshold-card-warning" ${warningVisible ? "" : "hidden"}>
            A bridge marked substantiated should say what evidence or control makes it more than an assertion.
          </p>
        </article>
      `;
    })
    .join("");
}

function renderWorldSelectors() {
  els.worldSelectGrid.innerHTML = worldQuestions
    .map(
      (question) => `
        <label class="field-group fine-world-select">
          <span class="field-label">${escapeHtml(question.label)}</span>
          <select data-world-select="${escapeHtml(question.id)}">
            ${scenarioOptions
              .map(
                (option) => `
                  <option value="${escapeHtml(option.id)}" ${state.world[question.id] === option.id ? "selected" : ""}>
                    ${escapeHtml(option.label)}
                  </option>
                `
              )
              .join("")}
          </select>
          <small>${escapeHtml(question.help)}</small>
        </label>
      `
    )
    .join("");
  els.worldNote.value = state.world.worldNote;
}

function renderGoals() {
  const goalsByGroup = Object.fromEntries(goalGroups.map((group) => [group.title, []]));
  goalDefinitions.forEach((goal) => {
    goalsByGroup[goal.group].push(goal);
  });

  els.goalGrid.innerHTML = goalGroups
    .map((group) => `
      <section class="fine-goal-group">
        <div class="fine-goal-group-head">
          <h3>${escapeHtml(group.title)}</h3>
          <p>${escapeHtml(group.description)}</p>
        </div>
        <div class="fine-goal-group-items">
          ${goalsByGroup[group.title]
            .map(
              (goal) => `
                <label class="field-group fine-goal-item">
                  <span class="fine-goal-top">
                    <span class="fine-goal-title">${escapeHtml(goal.label)}</span>
                    <strong class="fine-goal-score">${state.goals[goal.id]}</strong>
                  </span>
                  <span class="fine-goal-prompt">${escapeHtml(goal.prompt)}</span>
                  <input data-goal-id="${escapeHtml(goal.id)}" type="range" min="0" max="100" step="1" value="${state.goals[goal.id]}" aria-label="${escapeHtml(goal.label)}">
                  <span class="fine-goal-scale-text" aria-hidden="true">
                    <span>Less plausible target</span>
                    <span>More plausible target</span>
                  </span>
                  <small>${escapeHtml(goal.help)}</small>
                </label>
              `
            )
            .join("")}
        </div>
      </section>
    `)
    .join("");
  els.goalNote.value = state.goals.goalNote;
}

function updateSliderViews() {
  els.identityPull.value = state.commitments.identityPull;
  els.delegatedTrust.value = state.commitments.delegatedTrust;
  els.symmetryWillingness.value = state.commitments.symmetryWillingness;
  els.mindChangeReadiness.value = state.commitments.mindChangeReadiness;
  els.identityPullValue.textContent = String(state.commitments.identityPull);
  els.delegatedTrustValue.textContent = String(state.commitments.delegatedTrust);
  els.symmetryWillingnessValue.textContent = String(state.commitments.symmetryWillingness);
  els.mindChangeReadinessValue.textContent = String(state.commitments.mindChangeReadiness);
  els.priorNote.value = state.commitments.priorNote;
  els.mindChangeNote.value = state.commitments.mindChangeNote;
}

function updateCommitmentValueLabel(commitmentKey) {
  const valueMap = {
    identityPull: els.identityPullValue,
    delegatedTrust: els.delegatedTrustValue,
    symmetryWillingness: els.symmetryWillingnessValue,
    mindChangeReadiness: els.mindChangeReadinessValue
  };
  valueMap[commitmentKey].textContent = String(state.commitments[commitmentKey]);
}

function updateBridgeCardUi(bridgeId) {
  const card = els.checklistGrid.querySelector(`[data-bridge-id="${bridgeId}"]`);
  if (!card) return;

  const current = state.bridges[bridgeId];
  const warningVisible = bridgeWarningVisible(bridgeId);
  const statusTag = card.querySelector(".threshold-collapse-tag");
  const textarea = card.querySelector(`[data-bridge-note="${bridgeId}"]`);
  const warning = card.querySelector(".threshold-card-warning");

  statusTag.textContent = current.status;
  card.classList.toggle("needs-support-note-warning", warningVisible);
  textarea.setAttribute("aria-invalid", warningVisible ? "true" : "false");
  warning.hidden = !warningVisible;
}

function updateGoalCardUi(goalId) {
  const goalInput = els.goalGrid.querySelector(`[data-goal-id="${goalId}"]`);
  const score = goalInput?.closest(".fine-goal-item")?.querySelector(".fine-goal-score");
  if (score) score.textContent = String(state.goals[goalId]);
}

function refreshDerivedUi() {
  updateGradientLinks();
  updateDiagnosis();
  updateReports();
}

function assignState(nextState) {
  const normalized = normalizeState(nextState);
  state.lastPresetId = normalized.lastPresetId;
  state.route = normalized.route;
  state.claim = normalized.claim;
  state.commitments = normalized.commitments;
  state.bridges = normalized.bridges;
  state.world = normalized.world;
  state.goals = normalized.goals;
}

function updateGradientLinks() {
  const href = buildGradientHref();
  els.gradientLinks.forEach((link) => {
    link.href = href;
  });
  els.gradientTransferCopy.textContent = `Open the "Theism Gradient" tool with your current ${routeById(state.route).label.toLowerCase()} result attached. The handoff carries your honest ceiling, pressure summary, and the first fine-tuning claim IDs to inspect there.`;
  els.gradientFocusClaims.innerHTML = gradientFocusClaims()
    .map((claimId) => `<span class="fine-focus-chip">${escapeHtml(claimId)}</span>`)
    .join("");
}

function updateDiagnosis() {
  const diagnosis = classifyAudit();
  const mismatch = worldMismatchScore();

  els.targetRouteValue.textContent = routeById(state.route).label;
  els.honestCeilingValue.textContent = ceilingLabel(diagnosis.strictCeiling);
  els.priorPressureValue.textContent = String(priorPressure());
  els.substantiatedValue.textContent = `${countStrictBridges()} / ${bridgeDefinitions.length}`;
  els.worldTensionValue.textContent = worldMismatchLabel(mismatch);

  els.statusLabel.textContent = diagnosis.status;
  els.statusCopy.textContent = diagnosis.copy;
  els.diagnosisTarget.textContent = routeById(state.route).label;
  els.diagnosisCeiling.textContent = ceilingLabel(diagnosis.strictCeiling);
  els.diagnosisTentative.textContent = ceilingLabel(diagnosis.tentativeCeiling);
  els.diagnosisTargetPressure.textContent = `${targetPressure()} / 100 (${severityLabel(targetPressure())})`;
  els.collapseList.innerHTML = buildCollapseItems(diagnosis);

  const actual = state.world.actualUniverse ? scenarioDetails[state.world.actualUniverse] : "not set";
  const model = state.world[relevantWorldModelKey()]
    ? scenarioDetails[state.world[relevantWorldModelKey()]]
    : "not set";
  if (actual === "not set" || model === "not set") {
    els.worldSummary.textContent = "Choose one beach for the actual universe and one beach for the route-relevant comparison model. This box will then say whether those two look aligned or whether they pull apart.";
  } else if (actual === model) {
    els.worldSummary.textContent = `You said the actual universe looks like ${actual}. For ${routeById(state.route).label}, you also said the route-relevant model looks like ${model}. Those two match, so this comparison is not currently adding world-shape pressure against the route.`;
  } else {
    els.worldSummary.textContent = `You said the actual universe looks like ${actual}, but for ${routeById(state.route).label} you said the route-relevant model looks like ${model}. Because those two do not match, this comparison is creating world-shape pressure against the route.`;
  }
}

function updateReports() {
  els.summaryOutput.value = buildSummary();
  els.aiPromptOutput.value = buildAiPrompt();
}

function render() {
  renderRouteOptions();
  renderPresets();
  renderSnapshots();
  renderChecklist();
  renderWorldSelectors();
  renderGoals();
  updateSliderViews();
  updateRouteContextCopy();
  refreshDerivedUi();
}

function applyPreset(presetId) {
  const preset = presets.find((item) => item.id === presetId);
  if (!preset) return;
  if (
    hasMeaningfulWork()
    && !window.confirm(
      `Replace the current audit with the ${preset.label} preset?\n\nThis will also fill many of the settings, sliders, and degrees with values that reflect the general disposition of that preset persona.`
    )
  ) return;

  assignState({
    ...preset.state,
    lastPresetId: preset.id
  });
  saveState();
  render();
}

function resetState() {
  if (!window.confirm("Reset the claim, prior-commitment sliders, bridge checklist, world-shape mapping, and goal sliders?")) return;
  assignState(createDefaultState());
  saveState();
  render();
}

function saveSnapshotSlot(snapshotId) {
  const slot = snapshotById(snapshotId);
  if (!slot) return;
  if (slot.data && !window.confirm(`Overwrite ${slot.label} with the current audit?`)) return;

  const diagnosis = classifyAudit();
  slot.savedAt = new Date().toISOString();
  slot.route = state.route;
  slot.claim = state.claim.trim() || routeById(state.route).claim;
  slot.status = diagnosis.status;
  slot.data = normalizeState(state);
  saveSnapshots();
  renderSnapshots();
}

function loadSnapshotSlot(snapshotId) {
  const slot = snapshotById(snapshotId);
  if (!slot?.data) return;
  if (hasMeaningfulWork() && !window.confirm(`Load ${slot.label} and replace the current audit?`)) return;

  assignState(slot.data);
  saveState();
  render();
}

function clearSnapshotSlot(snapshotId) {
  const slot = snapshotById(snapshotId);
  if (!slot?.data) return;
  if (!window.confirm(`Clear ${slot.label}?`)) return;

  const defaults = createDefaultSnapshots().find((item) => item.id === snapshotId);
  Object.assign(slot, defaults);
  saveSnapshots();
  renderSnapshots();
}

async function copyText(text, statusEl, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    statusEl.textContent = successMessage;
  } catch {
    statusEl.textContent = "Copy failed. You can still copy from the text box.";
  }
}

function bindEvents() {
  els.routeSelect.addEventListener("change", (event) => {
    state.route = event.target.value;
    saveState();
    updateRouteContextCopy();
    refreshDerivedUi();
  });

  els.claimInput.addEventListener("input", (event) => {
    state.claim = event.target.value;
    saveState();
    updateGradientLinks();
    updateReports();
  });

  els.useRouteClaimButton.addEventListener("click", () => {
    state.claim = routeById(state.route).claim;
    saveState();
    els.claimInput.value = state.claim;
    updateGradientLinks();
    updateReports();
  });

  els.presetButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset]");
    if (!button) return;
    applyPreset(button.getAttribute("data-preset"));
  });

  els.resetButton.addEventListener("click", resetState);

  els.snapshotSlots.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-snapshot-save]");
    if (saveButton) {
      saveSnapshotSlot(saveButton.getAttribute("data-snapshot-save"));
      return;
    }

    const loadButton = event.target.closest("[data-snapshot-load]");
    if (loadButton) {
      loadSnapshotSlot(loadButton.getAttribute("data-snapshot-load"));
      return;
    }

    const clearButton = event.target.closest("[data-snapshot-clear]");
    if (clearButton) {
      clearSnapshotSlot(clearButton.getAttribute("data-snapshot-clear"));
    }
  });

  els.identityPull.addEventListener("input", (event) => {
    state.commitments.identityPull = clampScore(event.target.value);
    saveState();
    updateCommitmentValueLabel("identityPull");
    refreshDerivedUi();
  });
  els.delegatedTrust.addEventListener("input", (event) => {
    state.commitments.delegatedTrust = clampScore(event.target.value);
    saveState();
    updateCommitmentValueLabel("delegatedTrust");
    refreshDerivedUi();
  });
  els.symmetryWillingness.addEventListener("input", (event) => {
    state.commitments.symmetryWillingness = clampScore(event.target.value);
    saveState();
    updateCommitmentValueLabel("symmetryWillingness");
    refreshDerivedUi();
  });
  els.mindChangeReadiness.addEventListener("input", (event) => {
    state.commitments.mindChangeReadiness = clampScore(event.target.value);
    saveState();
    updateCommitmentValueLabel("mindChangeReadiness");
    refreshDerivedUi();
  });
  els.priorNote.addEventListener("input", (event) => {
    state.commitments.priorNote = event.target.value;
    saveState();
    updateReports();
  });
  els.mindChangeNote.addEventListener("input", (event) => {
    state.commitments.mindChangeNote = event.target.value;
    saveState();
    updateReports();
  });

  els.checklistGrid.addEventListener("change", (event) => {
    if (!event.target.matches("[data-bridge-status]")) return;
    const bridgeId = event.target.getAttribute("data-bridge-status");
    state.bridges[bridgeId].status = event.target.value;
    saveState();
    updateBridgeCardUi(bridgeId);
    refreshDerivedUi();
  });

  els.checklistGrid.addEventListener("input", (event) => {
    if (!event.target.matches("[data-bridge-note]")) return;
    const bridgeId = event.target.getAttribute("data-bridge-note");
    state.bridges[bridgeId].note = event.target.value;
    saveState();
    updateBridgeCardUi(bridgeId);
    refreshDerivedUi();
  });

  els.worldSelectGrid.addEventListener("change", (event) => {
    if (!event.target.matches("[data-world-select]")) return;
    const worldId = event.target.getAttribute("data-world-select");
    state.world[worldId] = validScenario(event.target.value);
    saveState();
    render();
  });

  els.worldNote.addEventListener("input", (event) => {
    state.world.worldNote = event.target.value;
    saveState();
    updateReports();
  });

  els.goalGrid.addEventListener("input", (event) => {
    if (!event.target.matches("[data-goal-id]")) return;
    const goalId = event.target.getAttribute("data-goal-id");
    state.goals[goalId] = clampScore(event.target.value);
    saveState();
    updateGoalCardUi(goalId);
    refreshDerivedUi();
  });

  els.goalNote.addEventListener("input", (event) => {
    state.goals.goalNote = event.target.value;
    saveState();
    updateReports();
  });

  els.copySummaryButton.addEventListener("click", async () => {
    await copyText(els.summaryOutput.value, els.summaryCopyStatus, "Bridge summary copied.");
  });

  els.copyMarkdownButton.addEventListener("click", async () => {
    await copyText(buildMarkdownSummary(), els.summaryCopyStatus, "Markdown summary copied.");
  });

  els.copyAiPromptButton.addEventListener("click", async () => {
    await copyText(els.aiPromptOutput.value, els.aiCopyStatus, "AI prompt copied.");
  });
}

render();
bindEvents();
