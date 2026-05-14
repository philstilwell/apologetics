const STORAGE_KEY = "moral-particulars-audit-v1";
let importedFromStress = false;

const issues = [
  {
    id: "1a",
    label: "1a",
    statement: "It would be immoral not to kill abortion doctors if it protected the unborn.",
    terrain: ["lethal force", "abortion", "duty conflicts"],
    tension: "Tests whether fetal-personhood commitments imply private lethal obligation, and what blocks that implication."
  },
  {
    id: "1b",
    label: "1b",
    statement: "It would be morally permissible to kill abortion doctors if it protected the unborn.",
    terrain: ["lethal force", "abortion", "permission"],
    tension: "Tests the distance between moral permission, moral obligation, vigilantism, and ordinary prohibitions on killing."
  },
  {
    id: "2",
    label: "2",
    statement: "It is immoral for divorced individuals to remarry.",
    terrain: ["marriage", "divorce", "sexual ethics"],
    tension: "Tests how texts, exceptions, covenant categories, and pastoral harm are weighted."
  },
  {
    id: "3",
    label: "3",
    statement: "It is immoral to have meals with apostates from Christianity.",
    terrain: ["fellowship", "apostasy", "community boundaries"],
    tension: "Tests the difference between moral contamination, church discipline, hospitality, and ordinary friendship."
  },
  {
    id: "4",
    label: "4",
    statement: "It is immoral to knowingly exceed speed limits.",
    terrain: ["law", "obedience", "ordinary conduct"],
    tension: "Tests whether civil law carries moral force even when the violation is common, minor, or socially tolerated."
  },
  {
    id: "5",
    label: "5",
    statement: "It is immoral for married couples to engage in oral or anal sex.",
    terrain: ["marriage", "sexual ethics", "body norms"],
    tension: "Tests how natural-law reasoning, consent, scriptural silence, tradition, and disgust responses are separated."
  },
  {
    id: "6",
    label: "6",
    statement: "It is immoral to practice circumcision or clitoridectomies.",
    terrain: ["body alteration", "children", "tradition"],
    tension: "Tests whether bundled practices are judged by the same principle or by different facts about harm, consent, covenant, and anatomy."
  },
  {
    id: "7",
    label: "7",
    statement: "It would be moral for a government to kill homosexuals for being homosexual.",
    terrain: ["state violence", "sexuality", "punishment"],
    tension: "Tests whether historical texts, civil law categories, and modern scope limits can be applied without special pleading."
  },
  {
    id: "8",
    label: "8",
    statement: "It is immoral to intentionally make someone believe you feel the opposite of what you actually feel about something.",
    terrain: ["deception", "emotion", "truth-telling"],
    tension: "Tests how deception, privacy, tact, safety, emotional labor, and truthfulness are ranked."
  },
  {
    id: "9",
    label: "9",
    statement: "It is immoral to spend this earthly life enjoying earthly pleasures when unGospelled unbelievers face eternity in Hell, when you will have eternity in Heaven to relax.",
    terrain: ["hell", "mission", "pleasure"],
    tension: "Tests whether eternal stakes imply maximal evangelistic sacrifice, and what principle permits ordinary enjoyment."
  },
  {
    id: "10",
    label: "10",
    statement: "It is immoral to fight for a country in a war merely for more territory.",
    terrain: ["war", "state loyalty", "territory"],
    tension: "Tests just-war reasoning, obedience to authority, loyalty, and the morality of aggression."
  },
  {
    id: "11",
    label: "11",
    statement: "It is immoral to divorce over a spouse merely romantically kissing another individual.",
    terrain: ["divorce", "betrayal", "marriage"],
    tension: "Tests how adultery, betrayal, covenant rupture, forgiveness, safety, and proportionality are defined."
  },
  {
    id: "12",
    label: "12",
    statement: "It is immoral not to send money to help someone you know who is starving to death.",
    terrain: ["aid", "property", "urgent need"],
    tension: "Tests whether proximity, ability, sacrifice, stewardship, and love of neighbor create a concrete duty."
  }
];

const stances = [
  { id: "strong-support", label: "Strongly support", short: "Support++", score: 2 },
  { id: "support", label: "Support", short: "Support", score: 1 },
  { id: "unsure", label: "Unsure", short: "Unsure", score: 0 },
  { id: "oppose", label: "Oppose", short: "Oppose", score: -1 },
  { id: "strong-oppose", label: "Strongly oppose", short: "Oppose++", score: -2 }
];

const grounders = [
  {
    id: "scripture",
    label: "Scripture",
    short: "Scripture",
    help: "Direct texts, canonical patterns, covenant distinctions, and interpretive rules."
  },
  {
    id: "gods-nature",
    label: "God's nature",
    short: "God's nature",
    help: "Claims about God's character as the standard for goodness."
  },
  {
    id: "divine-command",
    label: "Divine command",
    short: "Command",
    help: "A command or prohibition treated as binding because God has issued it."
  },
  {
    id: "holy-spirit",
    label: "Holy Spirit",
    short: "Spirit",
    help: "Prayerful discernment, conviction, guidance, or perceived spiritual prompting."
  },
  {
    id: "conscience",
    label: "Conscience",
    short: "Conscience",
    help: "Inner moral awareness, intuition, guilt, or felt recognition of right and wrong."
  },
  {
    id: "church-tradition",
    label: "Church tradition",
    short: "Tradition",
    help: "Historic teaching, denominational authority, creeds, catechisms, or inherited practice."
  },
  {
    id: "pastoral-authority",
    label: "Pastoral authority",
    short: "Pastors",
    help: "Trusted teachers, elders, pastors, apologists, or ministry communities."
  },
  {
    id: "reason-natural-law",
    label: "Reason / natural law",
    short: "Reason",
    help: "Moral reasoning about purposes, nature, consistency, rights, or duty."
  },
  {
    id: "love-neighbor",
    label: "Love of neighbor",
    short: "Love",
    help: "The great commandments, mercy, charity, care, and neighbor-protecting duties."
  },
  {
    id: "harm-flourishing",
    label: "Harm / flourishing",
    short: "Flourishing",
    help: "Likely effects on bodies, relationships, communities, dignity, and wellbeing."
  },
  {
    id: "social-norms",
    label: "Social norms",
    short: "Norms",
    help: "What one's family, church, political group, culture, or era treats as obvious."
  },
  {
    id: "consequences",
    label: "Consequences",
    short: "Consequences",
    help: "Expected outcomes, deterrence, slippery slopes, incentives, or social stability."
  }
];

const disagreementSources = [
  {
    id: "spiritual-rebellion",
    label: "Spiritual rebellion",
    short: "Rebellion",
    family: "soul",
    help: "The person resists God, truth, repentance, or moral accountability."
  },
  {
    id: "unredeemed-soul",
    label: "Unredeemed soul",
    short: "Unredeemed",
    family: "soul",
    help: "The disagreement is attributed to not being spiritually regenerated."
  },
  {
    id: "intellectual-confusion",
    label: "Intellectual confusion",
    short: "Confusion",
    family: "method",
    help: "The person is mistaken, unclear, inconsistent, or reasoning poorly."
  },
  {
    id: "unfamiliar-scripture",
    label: "Unfamiliarity with Scripture",
    short: "Scripture gap",
    family: "method",
    help: "The person does not know the relevant texts or canonical context."
  },
  {
    id: "bad-interpretation",
    label: "Bad interpretation",
    short: "Interpretation",
    family: "method",
    help: "The person knows the texts but applies a faulty hermeneutic."
  },
  {
    id: "different-facts",
    label: "Different factual beliefs",
    short: "Facts",
    family: "method",
    help: "The person accepts different empirical assumptions about harm, risk, consent, or consequences."
  },
  {
    id: "different-principle",
    label: "Different moral principle",
    short: "Principle",
    family: "method",
    help: "The person ranks duties, rights, mercy, justice, liberty, or authority differently."
  },
  {
    id: "cultural-conditioning",
    label: "Cultural conditioning",
    short: "Culture",
    family: "social",
    help: "The person's community, era, politics, or social incentives shape the judgment."
  },
  {
    id: "denominational-formation",
    label: "Denominational formation",
    short: "Denomination",
    family: "social",
    help: "The disagreement follows from church tradition, training, or institutional identity."
  },
  {
    id: "trauma-experience",
    label: "Personal experience",
    short: "Experience",
    family: "affective",
    help: "The person has lived experience, trauma, empathy, fear, or trust patterns that affect the case."
  },
  {
    id: "self-interest",
    label: "Self-interest or fear",
    short: "Interest",
    family: "affective",
    help: "The person has something to gain, avoid, protect, or signal."
  },
  {
    id: "compassion-emphasis",
    label: "Compassion emphasis",
    short: "Compassion",
    family: "affective",
    help: "The person gives mercy, care, harm reduction, or vulnerability more weight."
  }
];

const presets = [
  {
    id: "scripture-first",
    label: "Scripture-first",
    description: "Heavy scripture, command, tradition, and interpretation diagnosis.",
    grounders: {
      scripture: 9,
      "divine-command": 7,
      "church-tradition": 5,
      conscience: 3,
      "reason-natural-law": 4
    },
    disagreement: {
      "unfamiliar-scripture": 7,
      "bad-interpretation": 7,
      "intellectual-confusion": 5,
      "cultural-conditioning": 4
    }
  },
  {
    id: "spirit-conscience",
    label: "Spirit and conscience",
    description: "Emphasizes guidance, conviction, and inward moral awareness.",
    grounders: {
      "holy-spirit": 8,
      conscience: 8,
      scripture: 5,
      "love-neighbor": 5,
      "harm-flourishing": 4
    },
    disagreement: {
      "intellectual-confusion": 5,
      "spiritual-rebellion": 5,
      "unredeemed-soul": 4,
      "different-principle": 4
    }
  },
  {
    id: "natural-law-harm",
    label: "Reason and harm",
    description: "Weights consistency, natural law, neighbor love, and human effects.",
    grounders: {
      "reason-natural-law": 8,
      "harm-flourishing": 8,
      "love-neighbor": 7,
      conscience: 5,
      scripture: 4
    },
    disagreement: {
      "different-facts": 7,
      "different-principle": 7,
      "intellectual-confusion": 5,
      "cultural-conditioning": 5
    }
  },
  {
    id: "community-formed",
    label: "Community-formed",
    description: "Shows when the judgment is carried by inherited Christian norms.",
    grounders: {
      "social-norms": 8,
      "church-tradition": 7,
      "pastoral-authority": 7,
      scripture: 5,
      conscience: 4
    },
    disagreement: {
      "denominational-formation": 7,
      "cultural-conditioning": 7,
      "bad-interpretation": 4,
      "different-principle": 4
    }
  }
];

const qaItems = [
  {
    id: "purpose",
    category: "Purpose",
    question: "What is this Moral Particulars Audit trying to reveal?",
    answer: [
      "This tool is specifically about concrete moral particulars, not morality in the abstract. It asks the user to map their stance on 13 named statements, including cases about lethal force, remarriage, apostates, civil law, sexual conduct, bodily alteration, truthfulness, hell, war, divorce, and urgent aid.",
      "The tool does not try to settle the moral questions for the user. It asks the user to name what is doing the work when each concrete moral statement is supported, opposed, or treated as uncertain.",
      "The central output is a case-by-case map of dependencies: which judgments are carried by Scripture, conscience, Holy Spirit guidance, church tradition, social norms, reason, harm, love of neighbor, or consequences. Once several cases are mapped, the pattern checks ask whether similar cases are being treated by similar principles."
    ],
    bullets: [
      "Use it to expose hidden grounders.",
      "Use it to compare nearby cases.",
      "Use it to notice when disagreement is being diagnosed more severely than the evidence warrants."
    ]
  },
  {
    id: "not-permission",
    category: "Safety",
    question: "Does selecting support ever authorize violence or real-world action?",
    answer: [
      "No. The audit treats each statement as an object of moral reflection, not as a permission slip, strategy, instruction, or practical recommendation. This matters especially for the lethal-force and state-punishment cases.",
      "When a user supports a violent statement, the tool intentionally creates pressure for a limiting principle. It asks what authority, evidence threshold, legal boundary, and non-reciprocal rule would prevent the same reasoning from being used by rival groups or private actors."
    ],
    bullets: [
      "Do not use the page as planning guidance.",
      "Do use it to inspect whether a principle has dangerous implications.",
      "If a case concerns harm to persons, the audit should make the boundary more explicit, not less."
    ]
  },
  {
    id: "selected-case",
    category: "Workflow",
    question: "Why does selecting a moral particular matter so much?",
    answer: [
      "Every stance, grounder slider, disagreement rating, qualifier, and starter profile applies only to the currently selected case. The case list is the ledger. The editing panels are the workspace for whichever case is active.",
      "This prevents a common confusion: a user may be thinking about remarriage while accidentally changing the sliders for speed limits. The green, gold, and open status markers are meant to keep that per-case bookkeeping visible."
    ],
    bullets: [
      "Choose a case first.",
      "Set the stance as written.",
      "Add grounder and disagreement weights.",
      "Return to the case list to compare the resulting ledger."
    ]
  },
  {
    id: "as-written",
    category: "Judgment",
    question: "What does 'position on the statement as written' mean?",
    answer: [
      "The stance should initially answer the sentence on the card, not a revised version that already includes exceptions. If the statement is too broad, mark your stance on that broad statement and then put the needed distinctions in the qualifiers field.",
      "For example, a user might oppose a statement as written while adding that a narrower version could be defensible under specified covenant, authority, consent, harm, or factual assumptions. The split between stance and qualifiers helps show how much of the judgment depends on hidden amendments."
    ],
    bullets: [
      "Use the stance for the actual sentence.",
      "Use qualifiers for exceptions and narrowing conditions.",
      "Use pattern checks to see whether those exceptions are principled or ad hoc."
    ]
  },
  {
    id: "case-set",
    category: "Case Set",
    question: "Why does this tool use these particular 13 statements?",
    answer: [
      "The list is intentionally uneven and concrete. Some statements are about ordinary conduct, such as speeding or helping someone starving. Others are about severe or socially explosive cases, such as private killing, state execution, sexuality, and bodily alteration. That spread forces the user's moral method to operate across easy, hard, private, public, sexual, violent, and generosity cases.",
      "The point is not that all 13 cases are equally plausible, equally important, or equally settled. The point is that a moral grounding system often looks clearer in abstraction than it does when it must decide particulars with different emotional, social, textual, and factual pressures."
    ],
    bullets: [
      "The cases are pressure points, not a catechism.",
      "A user can oppose a statement while still learning what grounders carry that opposition.",
      "The most revealing patterns usually appear when several very different cases are mapped."
    ]
  },
  {
    id: "abortion-doctor-pair",
    category: "Case Set",
    question: "Why are 1a and 1b separated into obligation and permission?",
    answer: [
      "Case 1a says it would be immoral not to kill abortion doctors if doing so protected the unborn. Case 1b says it would be morally permissible to kill abortion doctors under that condition. Those are not identical claims. One is about obligation; the other is about permission.",
      "Separating them lets the ledger catch an important logical pressure. If someone says failing to kill would be immoral, then the tool asks how killing could fail to be at least permissible. If someone says killing is not permissible, the tool asks what blocks the move from fetal-personhood premises to private lethal action."
    ],
    bullets: [
      "Use 1a for duty language.",
      "Use 1b for permission language.",
      "Use qualifiers to name authority, legal, certainty, intention, and proportionality limits."
    ]
  },
  {
    id: "violent-particulars",
    category: "Case Set",
    question: "How should I treat the lethal-force and state-punishment cases?",
    answer: [
      "Cases 1a, 1b, and 7 are included because severe moral claims expose whether a user's principles have stable boundaries. They should be treated as diagnostic cases only. The tool is not asking anyone to act, plan, threaten, or infer permission outside the page.",
      "If a user supports one of these statements, the important next question is not merely which verse or intuition supports it. The important question is what limiting principle prevents the same structure from licensing rival groups, private actors, or governments to kill under their own contested moral premises."
    ],
    bullets: [
      "Name who has authority to use force.",
      "Name the evidence threshold required before force is even morally considered.",
      "Name why the same reasoning cannot be used symmetrically by opposing communities."
    ]
  },
  {
    id: "circumcision-clitoridectomy",
    category: "Case Set",
    question: "Why does the bodily-alteration case put circumcision and clitoridectomies together?",
    answer: [
      "Case 6 is designed to test whether the user is applying one principle or several different principles. A single broad principle might focus on children's consent, irreversible bodily alteration, covenantal identity, medical harm, sexual function, parental authority, or religious tradition. Different principles may separate the practices sharply.",
      "The tool is not assuming the two practices are morally identical. It asks the user to state whether they are being judged by the same rule or by different facts about anatomy, harm, cultural meaning, religious command, consent, and long-term effects."
    ],
    bullets: [
      "If the same rule covers both, state that rule clearly.",
      "If the cases differ, state the morally relevant difference.",
      "Avoid letting familiarity with one practice do the moral work silently."
    ]
  },
  {
    id: "sexual-particulars",
    category: "Case Set",
    question: "Why include sexual cases such as married sex acts and homosexual state punishment?",
    answer: [
      "Cases 5 and 7 test whether sexual morality is being grounded in Scripture, natural law, consent, disgust, tradition, harm, covenant categories, civil-law categories, or social identity. They also test whether a user separates private moral judgment from state coercion.",
      "A user might oppose a sexual act while also opposing criminal punishment, or might ground both in different routes. The point of the tool is to keep those distinctions visible instead of letting a single moral label carry every legal, pastoral, and relational conclusion."
    ],
    bullets: [
      "Separate moral wrongness from civil punishment.",
      "Separate consent, harm, nature, tradition, and textual authority.",
      "Use qualifiers when a stance depends on marriage, covenant, law, or pastoral context."
    ]
  },
  {
    id: "hell-pleasure-aid",
    category: "Case Set",
    question: "Why include the pleasure, Hell, and starvation-aid cases?",
    answer: [
      "Cases 9 and 12 test whether eternal stakes and urgent earthly need create maximal obligations. If unGospelled unbelievers face eternity in Hell, the tool asks what principle permits ordinary earthly enjoyment. If someone known to the user is starving, the tool asks what principle permits withholding aid.",
      "These cases are useful because many moral systems become strict about sexual or doctrinal cases but permissive about comfort, money, attention, and sacrifice. The audit invites the user to see whether love of neighbor, consequences, stewardship, mission, and personal enjoyment are being applied consistently."
    ],
    bullets: [
      "Name the threshold where need becomes obligation.",
      "Name what degree of sacrifice is required.",
      "Name what permits rest, enjoyment, and discretionary spending if the danger is treated as urgent."
    ]
  },
  {
    id: "ordinary-cases",
    category: "Case Set",
    question: "Why include ordinary cases like speeding, meals, kissing, and emotional misdirection?",
    answer: [
      "The ordinary cases keep the ledger from becoming only a set of culture-war questions. Speed limits, meals with apostates, romantic kissing, and making someone believe the opposite of what one feels test how the user handles common behavior, social trust, church boundaries, civil obedience, deception, and proportionality.",
      "These cases can reveal whether a grounder is being applied selectively. A user may be strict about obedience to authority in one domain but casual about civil law in another. A user may be strict about truthfulness in doctrine but permissive about emotional misdirection. The tool makes those differences visible."
    ],
    bullets: [
      "Map ordinary cases too, not only dramatic ones.",
      "Notice when social tolerance lowers a moral standard.",
      "Notice when a principle applied severely elsewhere becomes flexible in daily life."
    ]
  },
  {
    id: "grounder-weights",
    category: "Grounders",
    question: "How should I interpret the grounder sliders?",
    answer: [
      "A slider is not a vote total and not a claim that a grounder is objectively strong. It is the user's report of how much that grounder is carrying the user's current judgment.",
      "A high Scripture score means the judgment is being carried strongly by texts, canonical patterns, or interpretive rules. A high conscience score means inner moral recognition is doing visible work. A high social norms score means inherited community expectations are part of the load-bearing structure."
    ],
    bullets: [
      "Zero means the route is not doing real work for this case.",
      "A high number means the route would be hard to remove without changing the judgment.",
      "Ties are allowed when several routes genuinely share the load."
    ]
  },
  {
    id: "scripture-spirit",
    category: "Grounders",
    question: "How should Scripture and Holy Spirit guidance be handled when Christians disagree?",
    answer: [
      "The tool lets users name Scripture and Holy Spirit guidance as real grounders, but it also asks what happens when sincere Christians report incompatible readings or incompatible guidance. The pressure is methodological, not dismissive.",
      "If a private grounder decides the case, the useful follow-up is: what public rule distinguishes correct guidance from mistaken guidance? If a scriptural grounder decides the case, the useful follow-up is: what text and interpretive rule do the decisive work, and would the same rule decide nearby cases consistently?"
    ],
    bullets: [
      "Scripture-heavy answers should name texts and interpretive rules.",
      "Spirit-heavy answers should name how conflicts between reported guidance are resolved.",
      "Both can be used, but both become clearer when the conflict-resolution method is named."
    ]
  },
  {
    id: "social-norms",
    category: "Grounders",
    question: "Why include social norms if the user believes morality is objective?",
    answer: [
      "Including social norms does not imply that morality is merely social. It gives the user a way to mark when a judgment feels obvious partly because a family, church, denomination, political group, or era has trained that response.",
      "That distinction matters because a judgment can be true while still being socially reinforced. The audit asks whether the user can separate the objective reason offered for the judgment from the social environment that made the judgment feel immediate."
    ],
    bullets: [
      "High social-norm weight is not automatically bad.",
      "It does mean the case should be tested under a norm-reversal question.",
      "If the same judgment survives without social reinforcement, name the independent grounder that carries it."
    ]
  },
  {
    id: "disagreement-diagnosis",
    category: "Disagreement",
    question: "What are disagreement diagnoses for?",
    answer: [
      "They ask the user to say why someone would disagree with the user's stance. This is deliberately separate from the user's own grounders. A person might ground a judgment in Scripture while diagnosing dissent as confusion, rebellion, cultural formation, trauma, compassion emphasis, or different factual beliefs.",
      "The purpose is to make attribution visible. Some users may quickly explain disagreement as spiritual failure. Others may explain almost every disagreement as facts, interpretation, or social conditioning. The attribution balance shows whether the user is applying charity, severity, and epistemic humility consistently."
    ],
    bullets: [
      "A diagnosis is not proof about the other person's motives.",
      "It is a report of the explanation the user is tempted to give.",
      "Strong diagnoses should be paired with evidence that could change the diagnosis."
    ]
  },
  {
    id: "soul-diagnosis",
    category: "Disagreement",
    question: "Is it unfair to include spiritual rebellion and unredeemed soul?",
    answer: [
      "Those categories are included because many Christian moral disagreements are actually explained that way in real apologetic and pastoral contexts. Leaving them out would hide an important part of the moral ecology the tool is trying to map.",
      "But the audit treats those categories as high-stakes attributions. If they dominate, the tool asks what would count as a sincere, informed, non-rebellious disagreement. That question protects against turning every disagreement into a diagnosis that cannot be corrected by evidence, interpretation, or empathy."
    ],
    bullets: [
      "Use soul diagnoses only when they are genuinely part of your explanation.",
      "Do not use them as a shortcut around hard interpretive or factual disputes.",
      "If no evidence could move the diagnosis, the diagnosis itself needs scrutiny."
    ]
  },
  {
    id: "partial-vs-mapped",
    category: "Status",
    question: "What is the difference between Open, Partial, and Mapped?",
    answer: [
      "Open means the case has no visible input. Partial means the case has some input - a stance, notes, grounder weight, or disagreement weight - but not enough to count as fully mapped. Mapped means the case has a stance, at least one grounder weight, and at least one disagreement weight.",
      "The distinction exists because an isolated stance is not yet a moral map. The tool needs both the user's reason for the judgment and the user's explanation of disagreement before cross-case patterns become meaningful."
    ],
    bullets: [
      "Open: no input yet.",
      "Partial: started, but not fully interpretable.",
      "Mapped: ready to contribute to cross-case pattern checks."
    ]
  },
  {
    id: "pattern-checks",
    category: "Patterns",
    question: "How seriously should I take the consistency checks?",
    answer: [
      "A pattern card is a review priority, not a verdict. It says the ledger has detected a concentration, missing support structure, sharp stance combination, or risky implication that deserves a limiting principle.",
      "The strongest response is not to dismiss the card and not to obey it automatically. The strongest response is to compare nearby cases, state the rule that separates them, and revise the sliders or qualifiers if the first map was too quick."
    ],
    bullets: [
      "High pressure means the issue may change the moral map.",
      "Medium pressure means the ledger is not yet stable.",
      "Low pressure usually means one dependency is carrying a lot of work."
    ]
  },
  {
    id: "ai-prompt",
    category: "Export",
    question: "How should the AI stress-test prompt be used?",
    answer: [
      "The AI prompt exports the full allCaseInputs ledger, not just the selected case. That matters because the most useful critique often comes from cross-case comparison: the AI can see whether the same grounder, exception, or disagreement diagnosis is being applied consistently.",
      "The prompt asks for critique and for the strongest fair Christian repair attempt. That second part matters. The goal is not just to attack the map; it is to see whether the map can be repaired without hiding tensions, special pleading, or unexamined assumptions."
    ],
    bullets: [
      "Use the prompt after several cases are mapped.",
      "Ask for concrete contradictions and missing limiting principles.",
      "Do not treat the AI response as authority; treat it as a pressure test."
    ]
  },
  {
    id: "denomination",
    category: "Use Cases",
    question: "Can this be used by Christians from different traditions?",
    answer: [
      "Yes. The tool is not built around one denomination's moral theology. It is built around explicit grounders and explicit disagreement diagnoses. A Catholic, Reformed, Orthodox, Pentecostal, evangelical, progressive, or non-denominational user may weight the sliders very differently.",
      "That difference is part of the point. If two users reach opposite stances, the ledger can show whether the difference is mainly textual, traditional, pastoral, experiential, social, natural-law, harm-based, or rooted in different views of authority."
    ],
    bullets: [
      "Different traditions can use the same cases.",
      "Their slider maps will likely differ.",
      "Those differences become material for comparison rather than hidden background."
    ]
  }
];

function defaultIssueState() {
  return {
    stance: "",
    grounders: {},
    disagreement: {},
    notes: ""
  };
}

function defaultState() {
  return {
    selectedIssueId: issues[0].id,
    issueStates: Object.fromEntries(issues.map((issue) => [issue.id, defaultIssueState()])),
    reportMode: "all",
    pipelineContext: null
  };
}

let state = loadState();

const refs = {
  aiPrompt: document.querySelector("#aiPrompt"),
  attributionBoard: document.querySelector("#attributionBoard"),
  caseLedger: document.querySelector("#caseLedger"),
  caseNotes: document.querySelector("#caseNotes"),
  casePromptBoard: document.querySelector("#casePromptBoard"),
  clearCurrentButton: document.querySelector("#clearCurrentButton"),
  completedCases: document.querySelector("#completedCases"),
  copyAiPromptButton: document.querySelector("#copyAiPromptButton"),
  copyReportButton: document.querySelector("#copyReportButton"),
  copyStatus: document.querySelector("#copyStatus"),
  currentParticularCase: document.querySelector("#currentParticularCase"),
  currentParticularDisagreement: document.querySelector("#currentParticularDisagreement"),
  currentParticularGrounder: document.querySelector("#currentParticularGrounder"),
  currentParticularJudgment: document.querySelector("#currentParticularJudgment"),
  currentParticularStatement: document.querySelector("#currentParticularStatement"),
  currentParticularStatus: document.querySelector("#currentParticularStatus"),
  currentParticularStrip: document.querySelector("#currentParticularStrip"),
  currentJudgment: document.querySelector("#currentJudgment"),
  currentJudgmentNote: document.querySelector("#currentJudgmentNote"),
  disagreementIssueText: document.querySelector("#disagreementIssueText"),
  disagreementGrid: document.querySelector("#disagreementGrid"),
  disagreementLens: document.querySelector("#disagreementLens"),
  disagreementLensNote: document.querySelector("#disagreementLensNote"),
  finalReport: document.querySelector("#finalReport"),
  grounderConcentrationInsight: document.querySelector("#grounderConcentrationInsight"),
  grounderConcentrationLegend: document.querySelector("#grounderConcentrationLegend"),
  grounderConcentrationPlot: document.querySelector("#grounderConcentrationPlot"),
  grounderGrid: document.querySelector("#grounderGrid"),
  issueGrid: document.querySelector("#issueGrid"),
  leadGrounder: document.querySelector("#leadGrounder"),
  leadGrounderNote: document.querySelector("#leadGrounderNote"),
  ledgerPercent: document.querySelector("#ledgerPercent"),
  ledgerStatusBody: document.querySelector("#ledgerStatusBody"),
  opposeCount: document.querySelector("#opposeCount"),
  patternList: document.querySelector("#patternList"),
  presetButtons: document.querySelector("#presetButtons"),
  printReportButton: document.querySelector("#printReportButton"),
  qaAccordion: document.querySelector("#qaAccordion"),
  reportMode: document.querySelector("#reportMode"),
  resetButton: document.querySelector("#resetButton"),
  selectedIssueText: document.querySelector("#selectedIssueText"),
  stressImportBanner: document.querySelector("#stressImportBanner"),
  stressImportClaim: document.querySelector("#stressImportClaim"),
  stressImportCopy: document.querySelector("#stressImportCopy"),
  stanceGrid: document.querySelector("#stanceGrid"),
  supportCount: document.querySelector("#supportCount"),
  topGrounderList: document.querySelector("#topGrounderList"),
  unsureCount: document.querySelector("#unsureCount")
};

function loadState() {
  const fromLocation = loadStateFromLocation();
  if (fromLocation) {
    importedFromStress = true;
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

function normalizePipelineContext(source) {
  if (!source || typeof source !== "object") return null;
  const selectedRoutes = Array.isArray(source.selectedRoutes)
    ? source.selectedRoutes
        .map((item) => ({
          id: typeof item?.id === "string" ? item.id : "",
          label: typeof item?.label === "string" ? item.label : "",
          count: Math.max(0, Number(item?.count) || 0)
        }))
        .filter((item) => item.id && item.label)
    : [];
  const readyComponentIds = Array.isArray(source.readyComponentIds)
    ? source.readyComponentIds.filter((item) => typeof item === "string")
    : [];
  const readyComponentTitles = Array.isArray(source.readyComponentTitles)
    ? source.readyComponentTitles.filter((item) => typeof item === "string")
    : [];

  return {
    source: typeof source.source === "string" ? source.source : "moral-system-stress-test",
    claim: typeof source.claim === "string" ? source.claim : "",
    claimPosition: typeof source.claimPosition === "string" ? source.claimPosition : "",
    selectedRoutes,
    readyComponentIds,
    readyComponentTitles,
    noteCount: Math.max(0, Number(source.noteCount) || 0),
    completeness: Math.max(0, Number(source.completeness) || 0),
    boundaryRisk: Math.max(0, Number(source.boundaryRisk) || 0),
    matchedChallengeCount: Math.max(0, Number(source.matchedChallengeCount) || 0)
  };
}

function normalizeState(source) {
  const base = defaultState();
  if (!source || typeof source !== "object") return base;
  const selectedIssueId = issues.some((issue) => issue.id === source.selectedIssueId)
    ? source.selectedIssueId
    : base.selectedIssueId;
  const issueStates = Object.fromEntries(
    issues.map((issue) => {
      const saved = source.issueStates?.[issue.id] || {};
      const stance = stances.some((item) => item.id === saved.stance) ? saved.stance : "";
      return [
        issue.id,
        {
          ...defaultIssueState(),
          ...saved,
          stance,
          grounders: { ...(saved.grounders || {}) },
          disagreement: { ...(saved.disagreement || {}) },
          notes: typeof saved.notes === "string" ? saved.notes : ""
        }
      ];
    })
  );
  return {
    ...base,
    selectedIssueId,
    issueStates,
    reportMode: ["all", "patterns"].includes(source.reportMode) ? source.reportMode : "all",
    pipelineContext: normalizePipelineContext(source.pipelineContext)
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentIssue() {
  return issues.find((issue) => issue.id === state.selectedIssueId) || issues[0];
}

function currentData() {
  return state.issueStates[currentIssue().id];
}

function stanceById(id) {
  return stances.find((stance) => stance.id === id);
}

function sliderValue(group, id) {
  return Math.max(0, Math.min(10, Number(group?.[id]) || 0));
}

function hasAnyWeight(group) {
  return Object.values(group || {}).some((value) => Number(value) > 0);
}

function issueIsMapped(issueId) {
  const item = state.issueStates[issueId];
  return Boolean(stanceById(item?.stance) && hasAnyWeight(item.grounders) && hasAnyWeight(item.disagreement));
}

function issueHasAnyInput(issueId) {
  const item = state.issueStates[issueId];
  return Boolean(
    stanceById(item?.stance) ||
      hasAnyWeight(item?.grounders) ||
      hasAnyWeight(item?.disagreement) ||
      (item?.notes || "").trim()
  );
}

function issueStatus(issueId) {
  if (issueIsMapped(issueId)) {
    return { className: "mapped", label: "Mapped" };
  }
  if (issueHasAnyInput(issueId)) {
    return { className: "partial", label: "Partial" };
  }
  return { className: "", label: "Open" };
}

function topWeighted(defs, group, count = 3) {
  return defs
    .map((def) => ({ ...def, value: sliderValue(group, def.id) }))
    .filter((def) => def.value > 0)
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, count);
}

function sumWeights(defs, group, filter = () => true) {
  return defs
    .filter(filter)
    .reduce((total, def) => total + sliderValue(group, def.id), 0);
}

function labelForValue(value) {
  if (value >= 9) return "Decisive";
  if (value >= 7) return "Strong";
  if (value >= 4) return "Moderate";
  if (value >= 1) return "Light";
  return "None";
}

function disagreementProfile(issueState) {
  const soul = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "soul");
  const method = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "method");
  const social = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "social");
  const affective = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "affective");
  const total = soul + method + social + affective;
  let label = "Blank";
  let note = "No diagnosis weighted yet";
  if (total > 0) {
    const ordered = [
      { label: "Soul-coded", value: soul, note: "Spiritual or regeneration explanations dominate" },
      { label: "Method-heavy", value: method, note: "Reasoning, facts, or interpretation dominate" },
      { label: "Socially formed", value: social, note: "Community and culture explanations dominate" },
      { label: "Affective", value: affective, note: "Experience, fear, or compassion explanations dominate" }
    ].sort((a, b) => b.value - a.value);
    label = ordered[0].value === ordered[1]?.value ? "Mixed" : ordered[0].label;
    note = ordered[0].value === ordered[1]?.value ? "Several attribution families are close" : ordered[0].note;
  }
  return { soul, method, social, affective, total, label, note };
}

function render() {
  renderStressImportNotice();
  renderIssueGrid();
  renderPresetButtons();
  renderSelectedIssue();
  renderStances();
  renderSliders();
  renderLedger();
  renderAttributionBoard();
  renderPrompts();
  renderGrounderConcentrationMap();
  renderPatterns();
  renderReports();
  updateMetrics();
}

function renderStressImportNotice() {
  if (!refs.stressImportBanner || !refs.stressImportCopy || !refs.stressImportClaim) return;
  if (!importedFromStress) {
    refs.stressImportBanner.hidden = true;
    return;
  }

  const context = state.pipelineContext;
  const claim = context?.claim?.trim() || "";
  const routeCount = context?.selectedRoutes?.length || 0;
  const readyCount = context?.readyComponentTitles?.length || 0;
  const noteCount = context?.noteCount || 0;

  refs.stressImportBanner.hidden = false;
  refs.stressImportCopy.textContent = `This particulars audit imported your ${
    claim ? "stress-test claim, " : ""
  }${routeCount} active route${routeCount === 1 ? "" : "s"}, ${readyCount} ready component${
    readyCount === 1 ? "" : "s"
  }, and ${noteCount} note${noteCount === 1 ? "" : "s"} as case-level context for the ledger below.`;
  refs.stressImportClaim.textContent = claim ? `Imported claim: ${claim}` : "";
}

function renderIssueGrid() {
  refs.issueGrid.innerHTML = issues
    .map((issue) => {
      const item = state.issueStates[issue.id];
      const stance = stanceById(item.stance);
      const status = issueStatus(issue.id);
      const active = issue.id === state.selectedIssueId;
      return `
        <button
          class="particular-issue-card ${active ? "active" : ""} ${status.className}"
          type="button"
          data-issue="${escapeHtml(issue.id)}"
          aria-current="${active ? "true" : "false"}"
          aria-label="Case ${escapeHtml(issue.label)}: ${escapeHtml(issue.statement)} ${escapeHtml(stance?.short || "Unset")}, ${escapeHtml(status.label)}"
        >
          <span class="particular-issue-number">${escapeHtml(issue.label)}</span>
          <span class="particular-issue-body">
            <strong>${escapeHtml(issue.statement)}</strong>
            <small>${escapeHtml(stance?.short || "Unset")} - ${escapeHtml(status.label)}</small>
          </span>
          ${active ? '<span class="particular-marker particular-card-marker" aria-hidden="true"></span>' : ""}
        </button>
      `;
    })
    .join("");

  refs.issueGrid.querySelectorAll("[data-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedIssueId = button.dataset.issue;
      saveState();
      render();
      document.querySelector("#judgment-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderPresetButtons() {
  refs.presetButtons.innerHTML = presets
    .map(
      (preset) => `
        <button class="moral-lens-button" type="button" data-preset="${escapeHtml(preset.id)}">
          <strong>${escapeHtml(preset.label)}</strong>
          <span>${escapeHtml(preset.description)}</span>
        </button>
      `
    )
    .join("");

  refs.presetButtons.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presets.find((item) => item.id === button.dataset.preset);
      if (!preset) return;
      const item = currentData();
      item.grounders = { ...item.grounders, ...preset.grounders };
      item.disagreement = { ...item.disagreement, ...preset.disagreement };
      saveState();
      render();
    });
  });
}

function renderSelectedIssue() {
  const issue = currentIssue();
  refs.selectedIssueText.innerHTML = `
    <span class="particular-marker particular-marker-inline" aria-hidden="true"></span>
    <span class="particular-selected-label">Case ${escapeHtml(issue.label)}</span>
    ${escapeHtml(issue.statement)}
  `;
  refs.disagreementIssueText.innerHTML = `
    <span class="particular-marker particular-marker-inline" aria-hidden="true"></span>
    <span class="particular-selected-label">Case ${escapeHtml(issue.label)}</span>
    ${escapeHtml(issue.statement)}
  `;
  refs.caseNotes.value = currentData().notes || "";
}

function renderStances() {
  const item = currentData();
  refs.stanceGrid.innerHTML = stances
    .map(
      (stance) => `
        <label class="particular-stance-option">
          <input type="radio" name="stance" value="${escapeHtml(stance.id)}" ${item.stance === stance.id ? "checked" : ""}>
          <span>${escapeHtml(stance.label)}</span>
        </label>
      `
    )
    .join("");

  refs.stanceGrid.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      currentData().stance = input.value;
      saveState();
      render();
    });
  });
}

function sliderMarkup(kind, def, value) {
  return `
    <article class="particular-slider-card ${value > 0 ? "is-weighted" : ""}">
      <div class="particular-slider-head">
        <strong>${escapeHtml(def.label)}</strong>
        <span>${escapeHtml(labelForValue(value))} ${value}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value="${value}"
        data-kind="${escapeHtml(kind)}"
        data-slider="${escapeHtml(def.id)}"
        aria-label="${escapeHtml(def.label)} weight"
      >
      <p>${escapeHtml(def.help)}</p>
    </article>
  `;
}

function renderSliders() {
  const item = currentData();
  refs.grounderGrid.innerHTML = grounders
    .map((grounder) => sliderMarkup("grounder", grounder, sliderValue(item.grounders, grounder.id)))
    .join("");
  refs.disagreementGrid.innerHTML = disagreementSources
    .map((source) => sliderMarkup("disagreement", source, sliderValue(item.disagreement, source.id)))
    .join("");

  [...refs.grounderGrid.querySelectorAll("input"), ...refs.disagreementGrid.querySelectorAll("input")].forEach((input) => {
    input.addEventListener("input", () => {
      const itemData = currentData();
      const target = input.dataset.kind === "grounder" ? itemData.grounders : itemData.disagreement;
      const value = Number(input.value);
      target[input.dataset.slider] = value;
      const sliderCard = input.closest(".particular-slider-card");
      sliderCard?.classList.toggle("is-weighted", value > 0);
      const valueBadge = sliderCard?.querySelector(".particular-slider-head span");
      if (valueBadge) valueBadge.textContent = `${labelForValue(value)} ${value}/10`;
      saveState();
      renderIssueGrid();
      renderLedger();
      renderAttributionBoard();
      renderPrompts();
      renderGrounderConcentrationMap();
      renderPatterns();
      renderReports();
      updateMetrics();
    });
  });
}

function renderLedger() {
  const completed = issues.filter((issue) => issueIsMapped(issue.id)).length;
  const percent = Math.round((completed / issues.length) * 100);
  refs.ledgerPercent.textContent = `${percent}%`;
  refs.ledgerStatusBody.textContent =
    completed < 3
      ? "Map several cases before drawing cross-case conclusions."
      : "The ledger is now useful for spotting repeated grounders, special-case exceptions, and disagreement patterns.";

  refs.caseLedger.innerHTML = issues
    .map((issue) => {
      const item = state.issueStates[issue.id];
      const stance = stanceById(item.stance);
      const status = issueStatus(issue.id);
      const statusClass = status.className === "mapped" ? "ready" : status.className === "partial" ? "thin" : "";
      const top = topWeighted(grounders, item.grounders, 1)[0];
      const active = issue.id === state.selectedIssueId;
      return `
        <button
          class="component-status ledger-case ${statusClass} ${active ? "active" : ""}"
          type="button"
          data-ledger-issue="${escapeHtml(issue.id)}"
          aria-current="${active ? "true" : "false"}"
        >
          <span>${escapeHtml(issue.label)}. ${escapeHtml(stance?.short || "Unset")}</span>
          <strong>${escapeHtml(status.label)}</strong>
          <small>${escapeHtml(top ? `${top.short} ${top.value}/10` : "No lead grounder")}</small>
          ${active ? '<span class="particular-marker particular-ledger-marker" aria-hidden="true"></span>' : ""}
        </button>
      `;
    })
    .join("");

  refs.caseLedger.querySelectorAll("[data-ledger-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedIssueId = button.dataset.ledgerIssue;
      saveState();
      render();
      document.querySelector("#judgment-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const totals = grounders
    .map((grounder) => ({
      ...grounder,
      value: issues.reduce((total, issue) => total + sliderValue(state.issueStates[issue.id].grounders, grounder.id), 0)
    }))
    .filter((grounder) => grounder.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  refs.topGrounderList.innerHTML = `
    <p class="app-step">Most used grounders</p>
    ${
      totals.length
        ? totals.map((grounder) => `<article><strong>${escapeHtml(grounder.label)}</strong><span>${grounder.value}</span></article>`).join("")
        : "<article><strong>No grounders weighted yet</strong><span>0</span></article>"
    }
  `;
}

function updateMetrics() {
  const item = currentData();
  const completed = issues.filter((issue) => issueIsMapped(issue.id)).length;
  const stance = stanceById(item.stance);
  const topGrounder = topWeighted(grounders, item.grounders, 1)[0];
  const profile = disagreementProfile(item);
  const status = issueStatus(currentIssue().id);
  const supportCount = issues.filter((issue) => (stanceById(state.issueStates[issue.id].stance)?.score || 0) > 0).length;
  const opposeCount = issues.filter((issue) => (stanceById(state.issueStates[issue.id].stance)?.score || 0) < 0).length;
  const unsureCount = issues.filter((issue) => state.issueStates[issue.id].stance === "unsure").length;

  renderCurrentParticularSetting({ stance, topGrounder, profile, status });
  refs.completedCases.textContent = `${completed}/${issues.length}`;
  refs.currentJudgment.textContent = stance?.short || "Unset";
  refs.currentJudgmentNote.textContent = stance ? `Case ${currentIssue().label}` : "No stance selected";
  refs.leadGrounder.textContent = topGrounder?.short || "None";
  refs.leadGrounderNote.textContent = topGrounder ? `${topGrounder.label} is ${topGrounder.value}/10` : "No grounder weighted yet";
  refs.disagreementLens.textContent = profile.label;
  refs.disagreementLensNote.textContent = profile.note;
  refs.supportCount.textContent = supportCount;
  refs.opposeCount.textContent = opposeCount;
  refs.unsureCount.textContent = unsureCount;
}

function renderCurrentParticularSetting({ stance, topGrounder, profile, status } = {}) {
  if (
    !refs.currentParticularCase ||
    !refs.currentParticularStatement ||
    !refs.currentParticularJudgment ||
    !refs.currentParticularGrounder ||
    !refs.currentParticularDisagreement ||
    !refs.currentParticularStatus
  ) {
    return;
  }

  const issue = currentIssue();
  const item = currentData();
  const currentStance = stance || stanceById(item.stance);
  const currentTopGrounder = topGrounder || topWeighted(grounders, item.grounders, 1)[0];
  const currentProfile = profile || disagreementProfile(item);
  const currentStatus = status || issueStatus(issue.id);

  refs.currentParticularCase.textContent = `Case ${issue.label}`;
  refs.currentParticularStatement.textContent = issue.statement;
  refs.currentParticularJudgment.textContent = currentStance?.short || "Unset";
  refs.currentParticularGrounder.textContent = currentTopGrounder
    ? `${currentTopGrounder.short} ${currentTopGrounder.value}/10`
    : "None";
  refs.currentParticularDisagreement.textContent = currentProfile.label;
  refs.currentParticularStatus.textContent = currentStatus.label;
  if (refs.currentParticularStrip) {
    refs.currentParticularStrip.dataset.status = currentStatus.className || "open";
  }
}

function renderAttributionBoard() {
  const profile = disagreementProfile(currentData());
  const groups = [
    {
      id: "soul",
      label: "Soul diagnosis",
      value: profile.soul,
      help: "Disagreement is attributed to spiritual posture or condition: rebellion, resistance to God, or lack of regeneration."
    },
    {
      id: "method",
      label: "Method diagnosis",
      value: profile.method,
      help: "Disagreement is attributed to reasoning, information, interpretation, factual assumptions, or competing moral principles."
    },
    {
      id: "social",
      label: "Social diagnosis",
      value: profile.social,
      help: "Disagreement is attributed to formation by denomination, church culture, politics, family norms, era, or social incentives."
    },
    {
      id: "affective",
      label: "Affective diagnosis",
      value: profile.affective,
      help: "Disagreement is attributed to lived experience, trauma, fear, compassion, empathy, self-interest, or emotional salience."
    }
  ];

  refs.attributionBoard.innerHTML = groups
    .map((group) => {
      const width = profile.total ? Math.round((group.value / profile.total) * 100) : 0;
      const tooltipId = `attribution-${group.id}-help`;
      return `
        <article class="particular-balance-row">
          <div class="particular-balance-heading">
            <span class="particular-balance-title">
              <strong>${escapeHtml(group.label)}</strong>
              <button class="particular-balance-help" type="button" aria-label="Explain ${escapeHtml(group.label)}" aria-describedby="${tooltipId}">
                <span class="label-help-dot" aria-hidden="true">?</span>
                <span class="particular-balance-tooltip" id="${tooltipId}" role="tooltip">${escapeHtml(group.help)}</span>
              </button>
            </span>
            <span class="particular-balance-weight">${group.value} total weight</span>
          </div>
          <div class="particular-balance-track" aria-hidden="true">
            <span style="width: ${width}%"></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPrompts() {
  const prompts = promptsForIssue(currentIssue(), currentData());
  refs.casePromptBoard.innerHTML = prompts
    .map(
      (prompt) => `
        <article class="prompt-card">
          <strong>${escapeHtml(prompt.title)}</strong>
          <p>${escapeHtml(prompt.body)}</p>
        </article>
      `
    )
    .join("");
}

function promptsForIssue(issue, item) {
  const prompts = [
    {
      title: "Grounding clarity",
      body: "Which grounder would still carry the judgment if the others were removed?"
    }
  ];
  const top = topWeighted(grounders, item.grounders, 3);
  const profile = disagreementProfile(item);
  const stance = stanceById(item.stance);

  if (top.some((grounder) => grounder.id === "scripture")) {
    prompts.push({
      title: "Scripture check",
      body: "Which text and interpretive rule do the decisive work, and would the same rule decide a nearby case the same way?"
    });
  }
  if (top.some((grounder) => grounder.id === "holy-spirit")) {
    prompts.push({
      title: "Private guidance check",
      body: "If two sincere Christians report opposite guidance on this case, what public method resolves the conflict?"
    });
  }
  if (top.some((grounder) => grounder.id === "social-norms")) {
    prompts.push({
      title: "Norm reversal check",
      body: "Would the judgment feel equally obvious if your church, family, or political community normalized the opposite answer?"
    });
  }
  if (profile.soul >= profile.method + 6 && profile.soul >= 8) {
    prompts.push({
      title: "Soul diagnosis check",
      body: "What evidence would move the disagreement from spiritual diagnosis to honest interpretive or factual disagreement?"
    });
  }
  if (["1a", "1b", "7"].includes(issue.id) && stance?.score > 0) {
    prompts.push({
      title: "Lethal-force boundary",
      body: "What principle permits killing in this case without also licensing private violence, state cruelty, or rival groups using the same structure?"
    });
  }
  if (issue.id === "6") {
    prompts.push({
      title: "Bundled-practice check",
      body: "Are circumcision and clitoridectomy being judged by one shared principle, or do harm, consent, anatomy, and covenant status separate the cases?"
    });
  }
  if (issue.id === "9" && stance?.score < 0) {
    prompts.push({
      title: "Eternal-stakes check",
      body: "What principle permits ordinary pleasure if endless loss for the unevangelized is treated as a live moral emergency?"
    });
  }
  if (prompts.length < 4) {
    prompts.push({
      title: "Disagreement charity",
      body: "Can you state the strongest non-rebellious reason a sincere Christian might reach the opposite answer?"
    });
  }
  return prompts.slice(0, 5);
}

function renderQa() {
  refs.qaAccordion.innerHTML = qaItems
    .map((item, index) => {
      const bullets = item.bullets?.length
        ? `
          <ul>
            ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
          </ul>
        `
        : "";
      return `
        <details class="particular-qa-item" data-qa-item ${index === 0 ? "open" : ""}>
          <summary>
            <span class="particular-qa-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="particular-qa-heading">
              <span>${escapeHtml(item.category)}</span>
              <strong>${escapeHtml(item.question)}</strong>
            </span>
            <span class="particular-qa-icon" aria-hidden="true"></span>
          </summary>
          <div class="particular-qa-body">
            ${item.answer.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
            ${bullets}
          </div>
        </details>
      `;
    })
    .join("");

  refs.qaAccordion.querySelectorAll("[data-qa-item]").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      refs.qaAccordion.querySelectorAll("[data-qa-item]").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });
}

function mappedIssueEntries() {
  return issues
    .filter((issue) => issueIsMapped(issue.id))
    .map((issue) => ({
      issue,
      item: state.issueStates[issue.id]
    }));
}

function buildGrounderConcentrationRows() {
  const mappedEntries = mappedIssueEntries();
  const mappedCount = mappedEntries.length;
  return grounders.map((grounder, index) => {
    const caseWeights = mappedEntries
      .map(({ issue, item }) => ({
        issue,
        value: sliderValue(item.grounders, grounder.id)
      }))
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value || a.issue.label.localeCompare(b.issue.label));
    const total = caseWeights.reduce((sum, entry) => sum + entry.value, 0);
    const activeCount = caseWeights.length;
    const average = mappedCount ? total / mappedCount : 0;
    const topShare = total && caseWeights[0] ? caseWeights[0].value / total : 0;
    const concentrationCutoff = Math.max(1, Math.floor(mappedCount / 3));
    const concentrated =
      mappedCount >= 2 &&
      total >= 7 &&
      (activeCount <= concentrationCutoff || topShare >= 0.65);
    const distributed = mappedCount >= 3 && activeCount >= Math.ceil(mappedCount * 0.6);
    return {
      index,
      grounder,
      total,
      activeCount,
      average,
      topShare,
      concentrated,
      distributed,
      caseWeights
    };
  });
}

function formatConcentrationCaseList(caseWeights) {
  if (!caseWeights.length) return "No mapped cases weight this grounder.";
  const visible = caseWeights.slice(0, 4).map((entry) => `${entry.issue.label} ${entry.value}/10`);
  const remainder = caseWeights.length > visible.length ? ` +${caseWeights.length - visible.length} more` : "";
  return `${visible.join(", ")}${remainder}`;
}

function concentrationInsight(rows, mappedCount) {
  const weightedRows = rows
    .filter((row) => row.total > 0)
    .sort((a, b) => b.total - a.total || b.activeCount - a.activeCount || a.grounder.label.localeCompare(b.grounder.label));

  if (!mappedCount) {
    return "Map at least one case before reading dependence patterns; the graph uses only fully mapped cases.";
  }

  if (mappedCount === 1) {
    const top = weightedRows[0];
    return top
      ? `${top.grounder.label} is highest in the only mapped case, but concentration needs multiple cases before it becomes a pattern.`
      : "The single mapped case has no visible grounder weights yet.";
  }

  const concentrated = rows
    .filter((row) => row.concentrated)
    .sort((a, b) => b.total - a.total || b.topShare - a.topShare)[0];
  if (concentrated) {
    return `${concentrated.grounder.label} has ${concentrated.total} total weight but appears in ${concentrated.activeCount}/${mappedCount} mapped cases, so a headline dependency may be a case-specific spike.`;
  }

  const top = weightedRows[0];
  const broadest = weightedRows
    .slice()
    .sort((a, b) => b.activeCount - a.activeCount || b.total - a.total || a.grounder.label.localeCompare(b.grounder.label))[0];

  if (!top) {
    return "No grounder has weight in the mapped ledger yet.";
  }

  if (broadest && broadest.grounder.id !== top.grounder.id) {
    return `${top.grounder.label} has the highest total (${top.total}), while ${broadest.grounder.label} is broader across cases (${broadest.activeCount}/${mappedCount}).`;
  }

  return `${top.grounder.label} currently carries the largest cross-case load: ${top.total} total weight across ${top.activeCount}/${mappedCount} mapped cases.`;
}

function renderGrounderConcentrationMap() {
  if (!refs.grounderConcentrationPlot || !refs.grounderConcentrationLegend || !refs.grounderConcentrationInsight) return;

  const rows = buildGrounderConcentrationRows();
  const mappedCount = mappedIssueEntries().length;
  const laneWidth = 100 / grounders.length;
  const yTicks = [0, 2, 4, 6, 8, 10]
    .map(
      (tick) => `
        <span class="particular-concentration-y-tick" style="bottom: ${tick * 10}%">${tick}</span>
      `
    )
    .join("");
  const laneMarkup = rows
    .map(
      (row) => `
        <span
          class="particular-concentration-lane ${row.index % 2 ? "is-alt" : ""}"
          style="left: ${row.index * laneWidth}%; width: ${laneWidth}%"
          aria-hidden="true"
        ></span>
      `
    )
    .join("");
  const markMarkup = rows
    .filter((row) => row.total > 0)
    .map((row) => {
      const width = Math.min(6.8, laneWidth * 0.64);
      const left = row.index * laneWidth + laneWidth / 2 - width / 2;
      const bottom = Math.max(0, Math.min(100, row.average * 10));
      const height = Math.max(7, Math.min(25, 5 + row.activeCount * 4));
      const opacity = Math.max(0.46, Math.min(1, 0.5 + row.average / 12));
      const className = row.concentrated ? "is-concentrated" : row.distributed ? "is-distributed" : "";
      const caseList = formatConcentrationCaseList(row.caseWeights);
      const title = `${row.grounder.label}: ${row.total} total, ${row.average.toFixed(1)}/10 average, ${row.activeCount}/${mappedCount} mapped cases. ${caseList}`;
      return `
        <button
          class="particular-concentration-mark ${className}"
          type="button"
          data-grounder-map="${escapeHtml(row.grounder.id)}"
          style="left: ${left}%; bottom: ${bottom}%; width: ${width}%; height: ${height}px; opacity: ${opacity.toFixed(2)}"
          title="${escapeHtml(title)}"
          aria-label="${escapeHtml(title)}"
        ></button>
      `;
    })
    .join("");

  refs.grounderConcentrationPlot.innerHTML = `
    ${laneMarkup}
    ${yTicks}
    <span class="particular-concentration-axis particular-concentration-y-axis">Average weight</span>
    ${markMarkup}
    ${
      mappedCount
        ? ""
        : '<span class="particular-concentration-empty">Fully map a case to plot cross-case dependence. A mapped case needs a stance, one grounder weight, and one disagreement rating.</span>'
    }
  `;

  refs.grounderConcentrationInsight.textContent = concentrationInsight(rows, mappedCount);
  refs.grounderConcentrationLegend.innerHTML = rows
    .map((row) => {
      const className = row.concentrated ? "is-concentrated" : row.distributed ? "is-distributed" : "";
      const disabled = row.total > 0 ? "" : "disabled";
      const title = formatConcentrationCaseList(row.caseWeights);
      return `
        <button
          class="particular-concentration-legend-item ${row.total > 0 ? "has-weight" : ""} ${className}"
          type="button"
          data-grounder-map="${escapeHtml(row.grounder.id)}"
          ${disabled}
          title="${escapeHtml(title)}"
          aria-label="${escapeHtml(`${row.index + 1}. ${row.grounder.label}: ${row.activeCount}/${mappedCount || 0} mapped cases, ${row.average.toFixed(1)} average weight. ${title}`)}"
        >
          <strong>${row.index + 1}</strong>
          <em>${row.activeCount}/${mappedCount || 0}</em>
          <small>${row.average.toFixed(1)} AVG</small>
          <span>${escapeHtml(row.grounder.short)}</span>
        </button>
      `;
    })
    .join("");
}

function renderPatterns() {
  const patterns = buildPatterns();
  refs.patternList.innerHTML = patterns
    .map(
      (pattern, index) => {
        const pressureNote = {
          high: "High pressure: this pattern can change the moral map unless a clear limiting principle is supplied.",
          medium: "Medium pressure: this pattern is worth checking before treating the ledger as stable.",
          low: "Low pressure: this is mainly a dependency note, useful for seeing what is doing the most work."
        }[pattern.pressure] || "Review pressure: use this card to check whether the pattern is intentional.";
        return `
        <article class="challenge-card challenge-${escapeHtml(pattern.pressure)}">
          <div class="challenge-card-top">
            <span class="challenge-number">${index + 1}</span>
            <div class="challenge-title-block">
              <div class="challenge-meta">
                <span class="challenge-type">${escapeHtml(pattern.type)}</span>
                <span class="pressure ${escapeHtml(pattern.pressure)}">${escapeHtml(pattern.pressure)}</span>
              </div>
              <h3>${escapeHtml(pattern.title)}</h3>
              <p class="challenge-summary">${escapeHtml(pattern.summary)}</p>
            </div>
          </div>
          <div class="pattern-explanation-grid">
            <div>
              <span>Why this appeared</span>
              <p>${escapeHtml(pattern.basis || "The current case ledger crossed this check's trigger threshold.")}</p>
            </div>
            <div>
              <span>Pressure meaning</span>
              <p>${escapeHtml(pressureNote)}</p>
            </div>
            <div>
              <span>What to compare next</span>
              <p>${escapeHtml(pattern.nextStep || "Compare similar cases and decide whether the same grounder should carry the same kind of judgment.")}</p>
            </div>
          </div>
          <div class="challenge-counterfactual">
            <strong>${escapeHtml(pattern.check)}</strong>
            <p>${escapeHtml(pattern.question)}</p>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function buildPatterns() {
  const mapped = issues.filter((issue) => issueIsMapped(issue.id));
  const patterns = [];
  const totals = Object.fromEntries(grounders.map((grounder) => [grounder.id, 0]));
  const disagreementTotals = Object.fromEntries(disagreementSources.map((source) => [source.id, 0]));

  issues.forEach((issue) => {
    const item = state.issueStates[issue.id];
    grounders.forEach((grounder) => {
      totals[grounder.id] += sliderValue(item.grounders, grounder.id);
    });
    disagreementSources.forEach((source) => {
      disagreementTotals[source.id] += sliderValue(item.disagreement, source.id);
    });
  });

  if (mapped.length < 3) {
    patterns.push({
      type: "Coverage",
      pressure: "medium",
      title: "Thin sample",
      summary: "Fewer than three cases are fully mapped, so cross-case patterns may be accidental.",
      basis: `${mapped.length} of ${issues.length} cases are fully mapped. A case counts as mapped after it has a stance, at least one grounder weight, and at least one disagreement weight.`,
      check: "Map more cases before treating the ledger as stable.",
      question: "Would the same grounders carry judgments in easy, hard, private, public, sexual, violent, and generosity cases?",
      nextStep: "Complete several different kinds of cases before drawing a conclusion from the pattern list."
    });
  }

  const socialHeavy = issues.filter((issue) => sliderValue(state.issueStates[issue.id].grounders, "social-norms") >= 7);
  if (socialHeavy.length) {
    patterns.push({
      type: "Grounding",
      pressure: "high",
      title: "Social norms are doing visible work",
      summary: `${socialHeavy.map((issue) => issue.label).join(", ")} give social norms strong weight.`,
      basis: "At least one mapped case gives Social norms a weight of 7/10 or higher.",
      check: "Norm sensitivity test",
      question: "If the surrounding Christian culture changed, would the moral judgment survive by the same stated grounders?",
      nextStep: "Compare those cases with ones where Scripture, reason, conscience, or harm is supposed to carry the judgment without social reinforcement."
    });
  }

  const soulDominant = issues.filter((issue) => {
    const profile = disagreementProfile(state.issueStates[issue.id]);
    return profile.soul >= 10 && profile.soul > profile.method + profile.social + profile.affective;
  });
  if (soulDominant.length) {
    patterns.push({
      type: "Disagreement",
      pressure: "high",
      title: "Disagreement is being spiritualized",
      summary: `${soulDominant.map((issue) => issue.label).join(", ")} diagnose disagreement mainly through rebellion or regeneration categories.`,
      basis: "The soul-diagnosis total is at least 10 and greater than method, social, and affective explanations combined.",
      check: "Charity and falsifiability test",
      question: "What would count as a sincere, informed, non-rebellious disagreement on those cases?",
      nextStep: "Name what evidence would move the diagnosis from spiritual failure to interpretation, facts, experience, or principle."
    });
  }

  const support1a = stanceById(state.issueStates["1a"].stance)?.score || 0;
  const support1b = stanceById(state.issueStates["1b"].stance)?.score || 0;
  if (support1a > 0 && support1b < 0) {
    patterns.push({
      type: "Logic",
      pressure: "high",
      title: "Obligation without permission",
      summary: "Case 1a is supported while case 1b is opposed.",
      basis: "The ledger says it would be immoral not to kill abortion doctors, but also denies that killing them is morally permissible.",
      check: "Deontic consistency test",
      question: "If not killing abortion doctors would be immoral, how would killing them fail to be at least morally permissible?",
      nextStep: "Clarify whether the difference is obligation versus permission, certainty threshold, private authority, intended effect, or some other limiting rule."
    });
  }

  const lethalSupported = ["1a", "1b", "7"].filter((id) => (stanceById(state.issueStates[id].stance)?.score || 0) > 0);
  if (lethalSupported.length) {
    patterns.push({
      type: "Boundary",
      pressure: "high",
      title: "Lethal-force support needs a limiting rule",
      summary: `${lethalSupported.join(", ")} support statements involving killing.`,
      basis: "One or more statements involving killing has a supportive stance.",
      check: "Limiting-principle test",
      question: "What rule prevents the same reasoning from authorizing rival groups, private actors, or states to kill under their own contested moral premises?",
      nextStep: "State who has authority to use force, what evidence threshold is required, and why opposing moral communities cannot use the same structure."
    });
  }

  const dominantGrounder = grounders
    .map((grounder) => ({ ...grounder, value: totals[grounder.id] }))
    .sort((a, b) => b.value - a.value)[0];
  if (dominantGrounder?.value > 0) {
    patterns.push({
      type: "Dependency",
      pressure: dominantGrounder.value >= mapped.length * 7 ? "medium" : "low",
      title: `${dominantGrounder.label} is the dominant dependency`,
      summary: `${dominantGrounder.label} has ${dominantGrounder.value} total weight across the ledger.`,
      basis: `${dominantGrounder.label} has the largest combined slider total across all cases, mapped or partially mapped.`,
      check: "Dependency concentration test",
      question: "If this grounder were disputed, how many judgments would still be justified by independent routes?",
      nextStep: "Pick one case carried by this grounder and see whether another grounder can independently reach the same judgment."
    });
  }

  const unmappedWithStance = issues.filter((issue) => {
    const item = state.issueStates[issue.id];
    return item.stance && (!hasAnyWeight(item.grounders) || !hasAnyWeight(item.disagreement));
  });
  if (unmappedWithStance.length) {
    patterns.push({
      type: "Completeness",
      pressure: "medium",
      title: "Some stances have missing support structure",
      summary: `${unmappedWithStance.map((issue) => issue.label).join(", ")} have a judgment but lack grounder or disagreement weights.`,
      basis: "These cases have a stance selected, but the grounding or disagreement sliders have not both been filled in.",
      check: "Support completion test",
      question: "Is the judgment being asserted faster than its grounding and disagreement explanation can be named?",
      nextStep: "Add the missing weights or mark the case unsure until the support structure is clear."
    });
  }

  return patterns.slice(0, 8);
}

function renderReports() {
  refs.reportMode.value = state.reportMode;
  refs.finalReport.value = buildReport();
  refs.aiPrompt.value = buildAiPrompt();
}

function buildReport() {
  const mode = state.reportMode;
  if (mode === "patterns") return buildFullReportWithPatterns();
  return buildAllCasesReport();
}

function formatIssueSummary(issue) {
  const item = state.issueStates[issue.id];
  const stance = stanceById(item.stance)?.label || "Unset";
  const status = issueIsMapped(issue.id)
    ? "Mapped"
    : item.stance || hasAnyWeight(item.grounders) || hasAnyWeight(item.disagreement) || item.notes.trim()
      ? "Partial"
      : "No input";
  const grounderLines = grounders
    .map((grounder) => `  - ${grounder.label}: ${sliderValue(item.grounders, grounder.id)}/10`)
    .join("\n");
  const disagreementLines = disagreementSources
    .map((source) => `  - ${source.label} (${source.family}): ${sliderValue(item.disagreement, source.id)}/10`)
    .join("\n");
  return [
    `${issue.label}. ${issue.statement}`,
    `Input status: ${status}`,
    `Judgment: ${stance}`,
    "Grounder weights:",
    grounderLines,
    "Disagreement-diagnosis weights:",
    disagreementLines,
    `Qualifiers: ${item.notes.trim() || "None"}`
  ]
    .filter(Boolean)
    .join("\n");
}

function buildAllCasesReport() {
  const mapped = issues.filter((issue) => issueIsMapped(issue.id));
  const cases = issues.map((issue) => formatIssueSummary(issue)).join("\n\n---\n\n");
  const pipelineContext = state.pipelineContext
    ? [
        "Imported system context:",
        `Claim: ${state.pipelineContext.claim || "No claim transferred."}`,
        `Claim position: ${state.pipelineContext.claimPosition || "Not specified"}`,
        `Stress completeness: ${state.pipelineContext.completeness}%`,
        `Boundary risk: ${state.pipelineContext.boundaryRisk}`,
        `Matched challenges: ${state.pipelineContext.matchedChallengeCount}`,
        `Active routes: ${
          state.pipelineContext.selectedRoutes.length
            ? state.pipelineContext.selectedRoutes
                .map((route) => `${route.label} (${route.count})`)
                .join("; ")
            : "None transferred"
        }`,
        `Ready components: ${
          state.pipelineContext.readyComponentTitles.length
            ? state.pipelineContext.readyComponentTitles.join("; ")
            : "None transferred"
        }`,
        `Transferred notes: ${state.pipelineContext.noteCount}`,
        ""
      ]
    : [];
  return [
    "Moral Particulars Audit - Full Input Ledger",
    "",
    ...pipelineContext,
    `Mapped cases: ${mapped.length}/${issues.length}`,
    `Selected case: ${currentIssue().label}`,
    "",
    cases
  ].join("\n");
}

function buildPatternReportSection() {
  const patterns = buildPatterns()
    .map((pattern, index) => {
      return [
        `${index + 1}. ${pattern.title} [${pattern.pressure}]`,
        pattern.summary,
        `Why this appeared: ${pattern.basis || "The current ledger crossed this check's trigger threshold."}`,
        `Check: ${pattern.check}`,
        `Question: ${pattern.question}`,
        `Next comparison: ${pattern.nextStep || "Compare similar cases and decide whether the same grounder should carry the same kind of judgment."}`
      ].join("\n");
    })
    .join("\n\n");
  return [
    patterns || "No patterns yet."
  ].join("\n");
}

function buildFullReportWithPatterns() {
  return [
    buildAllCasesReport(),
    "",
    "===",
    "",
    "Cross-case Pattern Audit",
    "",
    buildPatternReportSection()
  ].join("\n");
}

function buildAiPrompt() {
  const allCaseInputs = issues.map((issue) => {
    const issueState = state.issueStates[issue.id];
    return {
      issue,
      input: {
        stance: issueState.stance,
        stanceLabel: stanceById(issueState.stance)?.label || "Unset",
        isMapped: issueIsMapped(issue.id),
        grounderWeights: grounders.map((grounder) => ({
          id: grounder.id,
          label: grounder.label,
          value: sliderValue(issueState.grounders, grounder.id)
        })),
        disagreementWeights: disagreementSources.map((source) => ({
          id: source.id,
          label: source.label,
          family: source.family,
          value: sliderValue(issueState.disagreement, source.id)
        })),
        notes: issueState.notes
      }
    };
  });
  const payload = {
    selectedIssueId: currentIssue().id,
    mappedCaseCount: issues.filter((issue) => issueIsMapped(issue.id)).length,
    totalCaseCount: issues.length,
    pipelineContext: state.pipelineContext,
    allCaseInputs,
    patterns: buildPatterns()
  };
  return [
    "You are stress-testing a Christian moral-particulars map. Do not merely restate the user's view.",
    "Use the full allCaseInputs ledger below, not only the currently selected issue.",
    "Identify the strongest grounding gaps, inconsistent case distinctions, missing limiting principles, and disagreement-diagnosis problems.",
    "For each critique, also give the strongest fair Christian repair attempt.",
    "",
    JSON.stringify(payload, null, 2)
  ].join("\n");
}

async function copyText(text, label) {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch {
    copied = false;
  }
  if (!copied) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.append(textarea);
    textarea.select();
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    textarea.remove();
  }
  refs.copyStatus.textContent = copied ? `${label} copied.` : `Could not copy ${label.toLowerCase()}.`;
}

function selectGrounderMapCase(grounderId) {
  const strongestCase = issues
    .map((issue) => ({
      issue,
      value: sliderValue(state.issueStates[issue.id].grounders, grounderId),
      mapped: issueIsMapped(issue.id)
    }))
    .filter((entry) => entry.mapped && entry.value > 0)
    .sort((a, b) => b.value - a.value || a.issue.label.localeCompare(b.issue.label))[0];

  if (!strongestCase) return;
  state.selectedIssueId = strongestCase.issue.id;
  saveState();
  render();
  document.querySelector("#judgment-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleGrounderMapClick(event) {
  const target = event.target.closest("[data-grounder-map]");
  if (!target) return;
  selectGrounderMapCase(target.dataset.grounderMap);
}

refs.grounderConcentrationPlot?.addEventListener("click", handleGrounderMapClick);
refs.grounderConcentrationLegend?.addEventListener("click", handleGrounderMapClick);

refs.caseNotes.addEventListener("input", () => {
  currentData().notes = refs.caseNotes.value;
  saveState();
  renderIssueGrid();
  renderLedger();
  renderCurrentParticularSetting();
  renderReports();
});

refs.reportMode.addEventListener("change", () => {
  state.reportMode = refs.reportMode.value;
  saveState();
  renderReports();
});

refs.copyReportButton.addEventListener("click", () => copyText(refs.finalReport.value, "Report"));
refs.copyAiPromptButton.addEventListener("click", () => copyText(refs.aiPrompt.value, "AI prompt"));
refs.printReportButton.addEventListener("click", () => window.print());

refs.clearCurrentButton.addEventListener("click", () => {
  state.issueStates[currentIssue().id] = defaultIssueState();
  saveState();
  render();
});

refs.resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset every moral-particulars entry?")) return;
  state = defaultState();
  saveState();
  render();
});

renderQa();
render();
