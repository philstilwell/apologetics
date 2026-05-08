const STORAGE_KEY = "belief-overreach-audit-v7";

const agents = [
  {
    id: "ada",
    name: "Ada Anchor",
    shortName: "Ada",
    avatar: "AA",
    faith: 0,
    faithLabel: "0 faith points",
    bias: 0,
    summary: "Refuses to let confidence outrun support."
  },
  {
    id: "milo",
    name: "Milo Maybe",
    shortName: "Milo",
    avatar: "MM",
    faith: 10,
    faithLabel: "10 faith points",
    bias: 0.18,
    summary: "Adds a small hope premium."
  },
  {
    id: "willa",
    name: "Willa Wish",
    shortName: "Willa",
    avatar: "WW",
    faith: 30,
    faithLabel: "30 faith points",
    bias: 0.46,
    summary: "Lets desire do part of the reasoning."
  },
  {
    id: "zeke",
    name: "Zeke Zeal",
    shortName: "Zeke",
    avatar: "ZZ",
    faith: 60,
    faithLabel: "60 faith points",
    bias: 0.84,
    summary: "Treats longing as warrant."
  }
];

const investmentNames = [
  "Harbor Biotech",
  "Northline AI",
  "Cinder Logistics",
  "Lumen Grid",
  "Echo Retail",
  "Blue Vale Energy",
  "Starling Cloud",
  "Ridge Water",
  "Juniper Health",
  "Morrow Mobility",
  "Signal Foundry",
  "Cobalt Foods",
  "Atlas Battery",
  "Velvet Robotics",
  "Granite Fiber",
  "Beacon Transit"
];

const localProspects = [
  "Nora",
  "Jonah",
  "Maya",
  "Leo",
  "Clara",
  "Evan",
  "Sofia",
  "Miles",
  "Rina",
  "Theo",
  "Jade",
  "Aiden"
];

const remoteHandles = [
  "LunaSky88",
  "TrueNorthSoul",
  "VelvetComet",
  "RiverLight22",
  "SparrowSong7",
  "QuietOrbit"
];

const religionEncounters = [
  "family church pull",
  "campus revival",
  "healing meeting",
  "prophecy stream",
  "apologetics weekend",
  "pilgrimage invite",
  "youth retreat",
  "end-times sermon",
  "deliverance room",
  "miracle testimony circle",
  "worship conference",
  "small-group pressure"
];

const scenarioOrder = ["gambling", "investment", "romance", "religion"];
const CASINO_BASE_STAKE = 100;
const CASINO_BUST_LIMIT = 21;
const CASINO_SAFE_MIN = 18;
const CASINO_OPENING_MIN = 16;
const CASINO_OPENING_MAX = 20;
const CASINO_CARD_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const CASINO_WIN_PROFIT = 30;
const casinoDefaultThresholds = {
  milo18: 82,
  willa18: 65,
  willa19: 88,
  zeke18: 50,
  zeke19: 68,
  zeke20: 85
};

const casinoMoodDeck = [
  {
    id: "due",
    statLabel: "Due-now feeling",
    rollup: "Some players felt the next card was due to help them.",
    summary:
      "A low card or a near miss can make another good card feel due. That feeling is psychologically powerful, but it does not change the next draw.",
    thresholds: { milo18: 78, willa18: 61, willa19: 86, zeke18: 47, zeke19: 65, zeke20: 84 }
  },
  {
    id: "hot",
    statLabel: "Hot-hand feeling",
    rollup: "Some players felt the table was running hot.",
    summary:
      "A run of decent cards can make the table feel hot. Faith-heavy gamblers often let that mood justify one more draw, even when the hand is already good enough.",
    thresholds: { milo18: 81, willa18: 63, willa19: 83, zeke18: 48, zeke19: 62, zeke20: 79 }
  },
  {
    id: "lucky",
    statLabel: "Feeling-lucky mood",
    rollup: "Several players were simply feeling lucky.",
    summary:
      "Sometimes nothing more specific is happening than a surge of confidence, hope, or ritualized luck. That feeling can still push people to chase another card when caution would be wiser.",
    thresholds: { milo18: 80, willa18: 62, willa19: 85, zeke18: 47, zeke19: 64, zeke20: 80 }
  },
  {
    id: "pattern",
    statLabel: "Pattern-reading mood",
    rollup: "Some players kept reading patterns into the table.",
    summary:
      "People kept treating harmless patterns as signals. That is how faith starts turning noise into a reason for chasing one more card on a hand that was already strong.",
    thresholds: { milo18: 77, willa18: 63, willa19: 84, zeke18: 46, zeke19: 63, zeke20: 82 }
  },
  {
    id: "ritual",
    statLabel: "Charm-and-ritual mood",
    rollup: "A few players started trusting charms, routines, and lucky gestures.",
    summary:
      "Ritual can make caution feel almost disloyal to the moment. Once a lucky seat, phrase, or gesture starts feeling sacred, one more card can begin to look warranted.",
    thresholds: { milo18: 79, willa18: 58, willa19: 80, zeke18: 45, zeke19: 60, zeke20: 76 }
  },
  {
    id: "near-miss",
    statLabel: "Near-miss mood",
    rollup: "A few players kept treating recent near misses as a promise that the next card would land.",
    summary:
      "Near misses are famous for creating false momentum. They can make failure feel almost successful, which is exactly how people talk themselves into one more unwarranted risk.",
    thresholds: { milo18: 74, willa18: 59, willa19: 82, zeke18: 43, zeke19: 60, zeke20: 79 }
  },
  {
    id: "comeback",
    statLabel: "Comeback mood",
    rollup: "Some players wanted one dramatic card to restore the night.",
    summary:
      "A comeback story is emotionally sticky. Once the night is framed as needing a heroic turn, gamblers start treating one more card as redemption rather than arithmetic.",
    thresholds: { milo18: 79, willa18: 57, willa19: 81, zeke18: 42, zeke19: 58, zeke20: 77 }
  },
  {
    id: "table-talk",
    statLabel: "Table-talk mood",
    rollup: "Other players kept narrating streaks and signs as if the table were speaking.",
    summary:
      "Social suggestion does real work in casinos. Once the surrounding chatter starts calling the next card a sign, faith-heavy players can mistake shared excitement for evidence.",
    thresholds: { milo18: 76, willa18: 61, willa19: 83, zeke18: 45, zeke19: 61, zeke20: 80 }
  }
];

const casinoHouseNarratives = [
  {
    id: "flat",
    statLabel: "Flat-payout table",
    rollup: "The dealer reminded everyone that 18 through 21 all earn the same modest return.",
    ruleText:
      "Flat table: ante $100. Any total from 18 to 21 pays +$30; a flashier finish earns nothing extra.",
    safeText:
      "The table was already paying the same modest amount anywhere from 18 to 21, so a good hand did not become better just because someone wanted a prettier total.",
    riskText:
      "Below 18, one draw could still be necessary. But the flat-payout rule meant the only honest goal was getting into the paying zone, not theatrically chasing a higher number."
  },
  {
    id: "tourist",
    statLabel: "Tourist-floor rule",
    rollup: "The game looked lively, but the house rule still quietly rewarded patience.",
    ruleText:
      "Tourist rule: ante $100. Reach 18 to 21 for +$30; anything else simply loses the ante to the house.",
    safeText:
      "The floor atmosphere tried to make the hand feel dramatic, but the rule itself was blunt: once the total was already paying, another card only reopened the downside.",
    riskText:
      "The table dressed itself up as entertainment, but the arithmetic stayed plain. A needed draw could help, while any unnecessary extra card just fed the house edge."
  },
  {
    id: "no-style",
    statLabel: "No-style-points rule",
    rollup: "There were no extra style points for turning a good hand into a flashier one.",
    ruleText:
      "No-style rule: ante $100. Any total from 18 to 21 pays +$30; there is no bonus for reaching 20 or 21 the hard way.",
    safeText:
      "There was no extra applause for pushing 18 or 19 into something prettier. That made overconfident chasing look even more gratuitous than usual.",
    riskText:
      "The no-style table still allowed one honest draw below 18. But once the hand crossed into the paying zone, extra bravery became a needless tax."
  }
];

const scenarios = {
  gambling: {
    id: "gambling",
    name: "Gambling",
    tryLabel: "casino night",
    startValue: 1000,
    unit: "currency",
    maxTries: 30,
    lead:
      "All four gamblers ante the same $100 every casino night. Each round begins with the same opening total for everyone, somewhere between 16 and 20. On 18, 19, or 20, the rational move is to bank the modest house payout. On 16 or 17, a single extra card is the only route to a win. Faith enters when a gambler treats an already winning hand as a reason to chase one more card because they feel lucky.",
    supportRule:
      "The support is simple: once the opening total is 18 or better, standing locks in the same small payout the extra card would be chasing. Another draw at that point adds downside without adding a better reward.",
    faithShift:
      "Faith does not just raise confidence. It turns a paying hand into a tempting hand for one more draw because the gambler feels due, hot, charmed, or lucky.",
    resource:
      "Bankroll dollars. Everyone risks the same ante. The difference is not bigger stakes, but a worse decision about whether to bank the hand or chase another card.",
    assumptions: [
      "All four gamblers face the same opening total, the same next card, and the same flat $100 ante every night.",
      "The table always pays the same +$30 on any total from 18 to 21, so the game has a built-in house edge.",
      "Faith is modeled as a lower stopping threshold: a willingness to draw on an already paying hand because luck feels probative.",
      "The model ignores card counting, table selection, and multi-hand strategy so the focus stays on stopping discipline."
    ],
    guidePoints: [
      "Each try is one shared casino night, so the world inputs are identical for all four gamblers.",
      "A line rises when the gambler either banks a paying hand or takes the one necessary draw and lands safely.",
      "A line falls when someone chases an unnecessary card, busts, or leaves the hand below the paying zone."
    ],
    guideClose:
      "Lucky chases can create short upward spikes, but the repeated stopping rule is what shapes the long-run line.",
    chartTitle: "Bankroll over casino nights",
    chartCaption:
      "All four lines are betting every night. The separation comes from who chases another card after the hand is already good enough.",
    stochasticNote:
      "A reckless extra draw can still catch exactly the right card once in a while. The deeper point is that faith makes a good stopping point feel emotionally unsatisfying.",
    lessonLead:
      "This is the cleanest field because the world answers immediately. Feeling lucky can change whether a gambler chases another card, but it cannot change what that card will be.",
    lessonCards: [
      {
        title: "Same total, same next card",
        text: "All four people begin with the same opening total and face the same possible next card. The only standing difference is whether they can leave a paying hand alone."
      },
      {
        title: "Faith chases improvement",
        text: "Milo can talk himself into drawing on 18, Willa can rationalize drawing on 19, and Zeke will even push 20 because the feeling of luck starts impersonating judgment."
      },
      {
        title: "A lucky draw is not a better method",
        text: "Sometimes the reckless draw lands exactly the right card. That does not mean faith improved the choice. It means variance briefly rewarded a worse stopping rule."
      }
    ]
  },
  investment: {
    id: "investment",
    name: "Investment",
    tryLabel: "investment round",
    startValue: 1000,
    unit: "currency",
    maxTries: 30,
    lead:
      "Each round brings another company with a fundamentals signal and a hype signal. The grounded investor studies the business. The faith-driven investor lets buzz and gut feeling do too much of the work.",
    supportRule:
      "Support lives in the fundamentals: profitability, debt, leadership quality, and durable demand. That is the sober signal the rational investor respects.",
    faithShift:
      "Faith makes hype feel like support. The farther right the agent sits, the more easily excitement, story, and momentum can substitute for due diligence.",
    resource:
      "Portfolio dollars. The overreach cost appears as larger positions taken in weaker businesses.",
    assumptions: [
      "Each round compresses a company into two simplified signals: fundamentals and hype.",
      "All four investors evaluate the same company at the same moment; only their thresholds and position sizing differ.",
      "Cash left on the sidelines earns a tiny reserve yield instead of sitting perfectly still.",
      "The model ignores diversification, hedging, and macro shocks so the focus stays on how overbelief changes what gets bought."
    ],
    guidePoints: [
      "Each try introduces one company that everyone sees through the same fundamentals and hype scores.",
      "The line moves according to whether the agent stays in cash or takes a position, and how large that position is.",
      "Hype can produce real short-term wins, but repeated over-sizing on weak businesses creates deeper drawdowns."
    ],
    guideClose:
      "A brief lead by a faith-heavy line does not show better reasoning. It shows that variance can flatter a worse filter for a while.",
    chartTitle: "Portfolio over investment rounds",
    chartCaption:
      "The business outcomes are random, but stronger fundamentals keep tilting the odds. Faith-heavy investors keep calling weak evidence good enough.",
    stochasticNote:
      "A hype stock can soar for a while, so faith-heavy investors may lead for short stints. The issue is not whether buzz can ever pay. It is whether the investor can do this consistently without repeatedly sizing positions beyond what the evidence supports.",
    lessonLead:
      "Investment makes faith look respectable because confidence can masquerade as bold vision. But when confidence outruns the business case, capital gets dragged behind a story rather than anchored in a company.",
    lessonCards: [
      {
        title: "Fundamentals vs buzz",
        text: "The grounded line mostly follows the fundamentals score. The faith-heavy lines keep letting excitement count as if it were evidence."
      },
      {
        title: "Bigger overreach means bigger positions",
        text: "Faith does not only change what gets bought. It changes how much of the bankroll gets concentrated in poorly supported calls."
      },
      {
        title: "Gut wins do not rescue the method",
        text: "Sometimes the red line hits a lucky trade. That does not prove faith works. It shows that even a weak method can catch a windfall now and then."
      }
    ]
  },
  romance: {
    id: "romance",
    name: "Romance",
    tryLabel: "romantic prospect",
    startValue: 1000,
    unit: "points",
    maxTries: 30,
    lead:
      "Each try introduces either a local prospect or a remote romantic story. Character and verification are the real support. Spark, flattery, fantasy, and fate-talk are the pull that faith can mistake for support.",
    supportRule:
      "Support lives in character, consistency, and verification. The grounded person does not hand over trust merely because the feelings are intense.",
    faithShift:
      "Faith makes chemistry feel like knowledge. It lowers the threshold for commitment and can make a remote story feel trustworthy before the person has earned that trust.",
    resource:
      "Trust-and-time capital. This line tracks the life energy spent on people who either deserved or did not deserve deep commitment.",
    assumptions: [
      "Each try reduces a prospect to a few simplified signals such as character, spark, distance, and verification.",
      "All four people meet the same prospect; only their trust threshold and pacing differ.",
      "The line measures trust-and-time capital rather than literal dollars.",
      "The model compresses messy human relationships so the focus stays on when desire is allowed to outrun vetting."
    ],
    guidePoints: [
      "Each try gives the same prospect to all four agents.",
      "The line rises when trust is paced well and the connection proves healthier than it first looked.",
      "The line falls when someone commits before character and verification justify it."
    ],
    guideClose:
      "A risky romance can work, but repeated premature trust is what bends the high-faith lines downward.",
    chartTitle: "Relational capital over romantic prospects",
    chartCaption:
      "Spark is random and powerful, but it is not the same thing as character. The faith-heavy lines keep committing before verification catches up.",
    stochasticNote:
      "Some risky romances do work. The issue is the method: faith keeps licensing trust before the person on the other side has been properly vetted.",
    lessonLead:
      "Romance hides overreach well because hope, projection, and longing are so emotionally persuasive. But the same practical rule applies: trust given beyond support becomes expensive.",
    lessonCards: [
      {
        title: "Character is the support",
        text: "The most grounded line waits for evidence about honesty, steadiness, and real-world consistency before it hands over serious trust."
      },
      {
        title: "Highest faith gets catfished",
        text: "The most faith-driven line is the one most likely to start a remote relationship on intensity alone, skip vetting, and get catfished when the story collapses."
      },
      {
        title: "The cost is not only heartbreak",
        text: "Bad romantic overreach spends time, boundaries, emotional focus, and better opportunities on someone who did not deserve that investment."
      }
    ]
  },
  religion: {
    id: "religion",
    name: "Religion",
    tryLabel: "religious pressure point",
    startValue: 1000,
    unit: "points",
    maxTries: 30,
    lead:
      "Each try introduces a religious pull: a church, revival, testimony, prophecy stream, or inherited tradition. Evidence and emotional-social pull do not move together. Faith lets the second one impersonate the first.",
    supportRule:
      "Support lives in actual evidence for the claim. Community warmth, fear, meaning, inheritance, and urgency can feel powerful, but they are not the same thing as support."
    ,
    faithShift:
      "Faith lowers the commitment threshold. It turns a thinly supported claim into something worthy of obedience, donations, identity, and life direction.",
    resource:
      "Life-budget capital. This tracks time, energy, money, autonomy, and identity pressure rather than cash alone.",
    assumptions: [
      "Each try compresses a religious encounter into evidence, emotional-social pull, and demand level.",
      "All four agents face the same encounter; only their commitment threshold differs.",
      "The line tracks life-budget capital: time, attention, money, autonomy, and identity pressure.",
      "The model does not claim every religious community is identical; it isolates what happens when confidence outruns perceived evidence."
    ],
    guidePoints: [
      "Each try presents the same testimony, church, revival, or pressure point to all four agents.",
      "The line moves according to whether they wait, commit cautiously, or surrender far beyond what the evidence supports.",
      "Some encounters may give comfort or structure, but repeated over-commitment still spends more life than the claim earns back."
    ],
    guideClose:
      "That is why a temporary benefit does not rescue a method that keeps turning pull into warrant.",
    chartTitle: "Life budget over religious pressure points",
    chartCaption:
      "The next encounter is random, but the recurring pattern is not. Faith-heavy agents keep surrendering more of life to claims their own support line has not justified.",
    stochasticNote:
      "Some communities offer comfort or belonging for a time. The question here is narrower: whether confidence is being inflated beyond evidence and then turned into obedience and expenditure.",
    lessonLead:
      "Religion can hide overreach under noble language like trust, surrender, and obedience. But if the claim is under-supported, those virtues become tools for spending life on what has not earned it.",
    lessonCards: [
      {
        title: "Pull is not proof",
        text: "Belonging, fear, meaning, beauty, and family inheritance can all raise a claim's emotional pull without raising its evidential support."
      },
      {
        title: "Faith spends a whole life",
        text: "The religious cost is not only money. It includes calendar time, obedience, filtered relationships, guilt, identity, and major life choices."
      },
      {
        title: "Waiting is not emptiness",
        text: "The grounded line does not lose by waiting. It preserves time and clarity until a claim actually earns the level of allegiance it is requesting."
      }
    ]
  }
};

const elements = {
  scenarioButtons: document.querySelector("#scenarioButtons"),
  agentGrid: document.querySelector("#agentGrid"),
  balanceGrid: document.querySelector("#balanceGrid"),
  eventStats: document.querySelector("#eventStats"),
  eventActions: document.querySelector("#eventActions"),
  runTry: document.querySelector("#runTry"),
  resetScenario: document.querySelector("#resetScenario"),
  copySummary: document.querySelector("#copySummary"),
  metricScenario: document.querySelector("#metricScenario"),
  metricScenarioNote: document.querySelector("#metricScenarioNote"),
  metricTries: document.querySelector("#metricTries"),
  metricTriesNote: document.querySelector("#metricTriesNote"),
  metricLeader: document.querySelector("#metricLeader"),
  metricLeaderNote: document.querySelector("#metricLeaderNote"),
  metricGap: document.querySelector("#metricGap"),
  metricGapNote: document.querySelector("#metricGapNote"),
  scenarioTitle: document.querySelector("#scenario-title"),
  scenarioLead: document.querySelector("#scenarioLead"),
  supportRuleText: document.querySelector("#supportRuleText"),
  faithShiftText: document.querySelector("#faithShiftText"),
  resourceText: document.querySelector("#resourceText"),
  scenarioAssumptions: document.querySelector("#scenarioAssumptions"),
  scenarioAssumptionsList: document.querySelector("#scenarioAssumptionsList"),
  tryStatus: document.querySelector("#tryStatus"),
  tryHint: document.querySelector("#tryHint"),
  eventLabel: document.querySelector("#eventLabel"),
  eventRollup: document.querySelector("#eventRollup"),
  eventTitle: document.querySelector("#eventTitle"),
  eventSummary: document.querySelector("#eventSummary"),
  eventGuide: document.querySelector("#eventGuide"),
  eventGuideLead: document.querySelector("#eventGuideLead"),
  eventGuideList: document.querySelector("#eventGuideList"),
  eventGuideClose: document.querySelector("#eventGuideClose"),
  chartTitle: document.querySelector("#chartTitle"),
  chartStatus: document.querySelector("#chartStatus"),
  chartCaption: document.querySelector("#chartCaption"),
  stochasticNote: document.querySelector("#stochasticNote"),
  beliefChart: document.querySelector("#beliefChart"),
  lessonLead: document.querySelector("#lessonLead"),
  lessonCards: document.querySelector("#lessonCards"),
  lessonClosing: document.querySelector("#lessonClosing"),
  summaryFieldTitle: document.querySelector("#summaryFieldTitle"),
  summaryFieldText: document.querySelector("#summaryFieldText"),
  summaryCostTitle: document.querySelector("#summaryCostTitle"),
  summaryCostText: document.querySelector("#summaryCostText"),
  summaryOutput: document.querySelector("#summaryOutput"),
  copyStatus: document.querySelector("#copyStatus")
};

const state = loadState();
let copySummaryResetTimer = null;

bindEvents();
render();

function bindEvents() {
  elements.scenarioButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-scenario]");
    if (!button) {
      return;
    }

    state.activeScenario = button.dataset.scenario;
    persistState();
    render();
  });

  elements.runTry.addEventListener("click", () => {
    runScenarioTry();
  });

  elements.resetScenario.addEventListener("click", () => {
    resetActiveScenario();
  });

  elements.copySummary.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(elements.summaryOutput.value);
      elements.copySummary.textContent = "Copied";
      elements.copyStatus.textContent = "";
      window.clearTimeout(copySummaryResetTimer);
      copySummaryResetTimer = window.setTimeout(() => {
        elements.copySummary.textContent = "Copy";
      }, 5000);
    } catch (error) {
      elements.summaryOutput.focus();
      elements.summaryOutput.select();
      elements.copyStatus.textContent = "Prompt selected. Copy manually if needed.";
      window.setTimeout(() => {
        elements.copyStatus.textContent = "";
      }, 2500);
    }
  });
}

function runScenarioTry() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];

  if (scenarioState.tries.length >= scenario.maxTries) {
    return;
  }

  const event = createScenarioEvent(scenario, scenarioState);
  scenarioState.tries.push(event);
  agents.forEach((agent) => {
    scenarioState.series[agent.id].push(event.after[agent.id]);
  });

  persistState();
  render();
}

function resetActiveScenario() {
  state.scenarios[state.activeScenario] = createScenarioState(state.activeScenario);
  persistState();
  render();
}

function render() {
  renderScenarioButtons();
  renderAgentGrid();
  renderScenarioPanel();
  renderBalanceGrid();
  renderDashboard();
  renderEventCard();
  renderChart();
  renderLessons();
  renderSummary();
}

function renderScenarioButtons() {
  elements.scenarioButtons.innerHTML = scenarioOrder
    .map((id) => {
      const scenario = scenarios[id];
      const active = id === state.activeScenario;
      return `
        <button
          type="button"
          class="scenario-tab ${active ? "active" : ""}"
          data-scenario="${scenario.id}"
          aria-pressed="${active ? "true" : "false"}"
        >
          <span>${scenario.name}</span>
          <small>${scenario.maxTries} tries</small>
        </button>
      `;
    })
    .join("");
}

function renderAgentGrid() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];

  elements.agentGrid.innerHTML = agents
    .map((agent) => {
      const currentValue = getCurrentValue(scenarioState, agent.id);
      return `
        <article class="belief-agent-card belief-agent-${agent.id}">
          <div class="belief-agent-head">
            <span class="belief-avatar" aria-hidden="true">${agent.avatar}</span>
            <div>
              <h3>${agent.name}</h3>
              <p>${agent.faithLabel}</p>
            </div>
          </div>
          <p class="belief-agent-summary">${agent.summary}</p>
          <div class="belief-agent-foot">
            <span class="mini-label">Current ${scenario.name.toLowerCase()} line</span>
            <strong>${formatScenarioValue(scenario, currentValue)}</strong>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderScenarioPanel() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const tryCount = scenarioState.tries.length;

  elements.scenarioTitle.textContent = scenario.name;
  elements.scenarioLead.textContent = scenario.lead;
  elements.supportRuleText.textContent = scenario.supportRule;
  elements.faithShiftText.textContent = scenario.faithShift;
  elements.resourceText.textContent = scenario.resource;
  elements.scenarioAssumptionsList.innerHTML = scenario.assumptions
    .map((assumption) => `<li>${assumption}</li>`)
    .join("");
  elements.chartTitle.textContent = scenario.chartTitle;
  elements.chartCaption.textContent = scenario.chartCaption;
  elements.stochasticNote.textContent =
    `These tries are not deterministic. Each click samples a new pseudo-random event from a simplified ${scenario.name.toLowerCase()} model, so resetting the field will usually produce a different path. ${scenario.stochasticNote}`;
  elements.tryStatus.textContent = `${tryCount} ${pluralize(tryCount, "try", "tries")} logged`;
  elements.tryHint.textContent =
    tryCount >= scenario.maxTries
      ? `This field has reached its ${scenario.maxTries}-try limit. Press Reset to sample a new path from the same simplified model.`
      : `Each click samples one new pseudo-random ${scenario.tryLabel} from this simplified model.`;

  elements.runTry.textContent = tryCount === 0 ? "Try" : "Try next event";
  elements.runTry.disabled = tryCount >= scenario.maxTries;
  elements.resetScenario.disabled = tryCount === 0;
}

function renderBalanceGrid() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const lastEvent = getLastEvent(scenarioState);

  elements.balanceGrid.innerHTML = agents
    .map((agent) => {
      const currentValue = getCurrentValue(scenarioState, agent.id);
      const delta = lastEvent ? lastEvent.delta[agent.id] : 0;
      const action = lastEvent ? lastEvent.actions[agent.id].tag : "Waiting";
      return `
        <article class="belief-balance-card belief-agent-${agent.id}">
          <div class="belief-balance-top">
            <span class="belief-avatar small" aria-hidden="true">${agent.avatar}</span>
            <div>
              <strong>${agent.shortName}</strong>
              <small>${agent.faithLabel}</small>
            </div>
          </div>
          <span class="belief-balance-value">${formatScenarioValue(scenario, currentValue)}</span>
          <div class="belief-balance-foot">
            <span class="belief-tag">${action}</span>
            <span class="belief-delta ${delta > 0 ? "up" : delta < 0 ? "down" : "flat"}">${formatDelta(scenario, delta)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDashboard() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const standings = getStandings(scenarioState);
  const tryCount = scenarioState.tries.length;
  const faithDrag = standings[0].value - standings[standings.length - 1].value;

  elements.metricScenario.textContent = scenario.name;
  elements.metricScenarioNote.textContent = scenario.resource;
  elements.metricTries.textContent = String(tryCount);
  elements.metricTriesNote.textContent =
    tryCount === 0
      ? "Press Try to generate the first event."
      : `${tryCount} ${pluralize(tryCount, scenario.tryLabel, `${scenario.tryLabel}s`)} recorded so far.`;
  elements.metricLeader.textContent = standings[0].agent.shortName;
  elements.metricLeaderNote.textContent =
    tryCount === 0
      ? "All four lines are still tied at the start."
      : `${standings[0].agent.name} is currently ahead in ${scenario.name.toLowerCase()}.`;
  elements.metricGap.textContent = formatScenarioValue(scenario, faithDrag, true);
  elements.metricGapNote.textContent =
    tryCount === 0
      ? "No divergence has opened yet."
      : `Current spread between ${standings[0].agent.shortName} and ${standings[standings.length - 1].agent.shortName}.`;
}

function renderEventCard() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const lastEvent = getLastEvent(scenarioState);
  const tryCount = scenarioState.tries.length;

  elements.eventGuideLead.textContent = !lastEvent
    ? `On the first click, ${scenario.name.toLowerCase()} samples one shared pseudo-random event for all four agents. The lines separate only because they respond to that same setup with different commitment thresholds.`
    : `In the latest ${scenario.tryLabel}, all four agents faced the same sampled setup. The line movement comes from how much each one committed, preserved, or overextended in response.`;
  elements.eventGuideList.innerHTML = scenario.guidePoints
    .map((point) => `<li>${point}</li>`)
    .join("");
  elements.eventGuideClose.textContent =
    `${scenario.guideClose} Resetting the field will usually produce a different run because the tries are sampled rather than scripted.`;
  elements.eventGuide.open = tryCount <= 1;

  if (!lastEvent) {
    elements.eventLabel.textContent = "First event";
    elements.eventRollup.textContent = "No results yet";
    elements.eventTitle.textContent = "Press Try to generate the next event.";
    elements.eventSummary.textContent =
      "The random event will carry the relevant balance of inputs for this field, and each agent will respond according to their degree of faith.";
    elements.eventStats.innerHTML = "";
    elements.eventActions.innerHTML = "";
    return;
  }

  elements.eventLabel.textContent = `${scenario.name} try ${lastEvent.index}`;
  elements.eventRollup.textContent = lastEvent.rollup;
  elements.eventTitle.textContent = lastEvent.title;
  elements.eventSummary.textContent = lastEvent.summary;
  elements.eventStats.innerHTML = lastEvent.stats
    .map((item) => {
      return `
        <article class="belief-stat-pill">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `;
    })
    .join("");
  elements.eventActions.innerHTML = agents
    .map((agent) => {
      const action = lastEvent.actions[agent.id];
      return `
        <article class="belief-action-card belief-agent-${agent.id}">
          <div class="belief-action-head">
            <span class="belief-avatar small" aria-hidden="true">${agent.avatar}</span>
            <strong>${agent.shortName}</strong>
            <span class="belief-delta ${action.delta > 0 ? "up" : action.delta < 0 ? "down" : "flat"}">${formatDelta(scenario, action.delta)}</span>
          </div>
          <span class="belief-tag">${action.tag}</span>
          <p>${action.text}</p>
        </article>
      `;
    })
    .join("");
}

function renderChart() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const tries = scenarioState.tries.length;
  const seriesValues = agents.flatMap((agent) => scenarioState.series[agent.id]);
  const width = 720;
  const height = 320;
  const margin = { top: 24, right: 24, bottom: 42, left: 74 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const minValue = Math.min(...seriesValues);
  const maxValue = Math.max(...seriesValues);
  const padding = scenario.unit === "currency" ? 80 : 60;
  const yMin = Math.max(0, Math.floor((minValue - padding) / 50) * 50);
  const yMax = Math.ceil((maxValue + padding) / 50) * 50;
  const ySpan = Math.max(100, yMax - yMin);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => yMin + ySpan * ratio);
  const xTicks = buildXTicks(scenario.maxTries);
  const getX = (index) => margin.left + (index / scenario.maxTries) * innerWidth;
  const getY = (value) => margin.top + innerHeight - ((value - yMin) / ySpan) * innerHeight;

  const lines = agents
    .map((agent) => {
      const values = scenarioState.series[agent.id];
      const points = values.map((value, index) => `${getX(index)},${getY(value)}`).join(" ");
      const circles = values
        .map((value, index) => {
          return `<circle class="belief-point belief-line-${agent.id}" cx="${getX(index)}" cy="${getY(value)}" r="${index === values.length - 1 ? 4.5 : 3.2}"></circle>`;
        })
        .join("");
      return `
        <polyline class="belief-line belief-line-${agent.id}" points="${points}"></polyline>
        ${circles}
      `;
    })
    .join("");

  const legend = agents
    .map((agent, index) => {
      const x = margin.left + index * 148;
      return `
        <g transform="translate(${x}, ${height - 8})">
          <line class="belief-line belief-line-${agent.id}" x1="0" y1="-6" x2="18" y2="-6"></line>
          <text class="belief-axis-label" x="24" y="-2">${agent.shortName}</text>
        </g>
      `;
    })
    .join("");

  elements.chartStatus.textContent =
    tries === 0
      ? `All four lines begin at ${formatScenarioValue(scenario, scenario.startValue)}.`
      : `${tries} of ${scenario.maxTries} ${pluralize(tries, scenario.tryLabel, `${scenario.tryLabel}s`)} logged.`;

  elements.beliefChart.innerHTML = `
    ${yTicks
      .map((tick) => {
        const y = getY(tick);
        return `
          <line class="belief-grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
          <text class="belief-axis-label" x="${margin.left - 10}" y="${y + 4}" text-anchor="end">${formatScenarioValue(scenario, tick, true)}</text>
        `;
      })
      .join("")}
    ${xTicks
      .map((tick) => {
        const x = getX(tick);
        return `<text class="belief-axis-label" x="${x}" y="${height - margin.bottom + 22}" text-anchor="middle">${tick}</text>`;
      })
      .join("")}
    <line class="belief-axis-line" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}"></line>
    <line class="belief-axis-line" x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}"></line>
    <text class="belief-axis-title" x="${margin.left}" y="${margin.top - 6}" text-anchor="start">${scenario.name} outcome</text>
    <text class="belief-axis-title" x="${width - margin.right}" y="${height - margin.bottom + 32}" text-anchor="end">Tries</text>
    ${lines}
    ${legend}
  `;
}

function renderLessons() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const lastEvent = getLastEvent(scenarioState);

  elements.lessonLead.textContent = scenario.lessonLead;
  elements.lessonCards.innerHTML = scenario.lessonCards
    .map((card) => {
      return `
        <article class="summary-card">
          <span>${scenario.name}</span>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </article>
      `;
    })
    .join("");

  elements.lessonClosing.textContent = lastEvent
    ? buildLessonClosing(scenario, lastEvent)
    : `In ${scenario.name.toLowerCase()}, faith has not spent anything yet only because no tries have been taken.`;
}

function renderSummary() {
  const scenario = scenarios[state.activeScenario];
  const scenarioState = state.scenarios[state.activeScenario];
  const standings = getStandings(scenarioState);
  const lastEvent = getLastEvent(scenarioState);
  const leader = standings[0];
  const laggard = standings[standings.length - 1];
  const gap = leader.value - laggard.value;
  const summary = buildSummaryOutput(scenario, scenarioState, standings, lastEvent);

  if (!lastEvent) {
    elements.summaryFieldTitle.textContent = `${scenario.name} has not started yet.`;
    elements.summaryFieldText.textContent =
      "Once you press Try, this panel will explain what the active field is rewarding and what the faith-heavy lines are failing to respect.";
    elements.summaryCostTitle.textContent = "No divergence yet.";
    elements.summaryCostText.textContent =
      "All four lines still sit at the same start value, so no practical cost of faith has been displayed yet.";
  } else {
    elements.summaryFieldTitle.textContent = `${leader.agent.name} is currently leading ${scenario.name.toLowerCase()}.`;
    elements.summaryFieldText.textContent =
      `${leader.agent.name} is at ${formatScenarioValue(scenario, leader.value)}, while ${laggard.agent.name} is at ${formatScenarioValue(scenario, laggard.value)}. In this field, the lines separate because the same random world keeps meeting very different commitment thresholds.`;
    elements.summaryCostTitle.textContent = `${formatScenarioValue(scenario, gap, true)} currently separates the top and bottom lines.`;
    elements.summaryCostText.textContent =
      `The lagging line belongs to ${laggard.agent.name}, who is carrying ${laggard.agent.faithLabel}. Here that extra faith is spending ${scenario.unit === "currency" ? "money" : "life capital"} on ventures that have not earned the same level of trust.`;
  }

  elements.summaryOutput.value = summary;
}

function buildSummaryOutput(scenario, scenarioState, standings, lastEvent) {
  const currentLines = agents.map((agent) => {
    return `${agent.name} (${agent.faithLabel}): ${formatScenarioValue(scenario, getCurrentValue(scenarioState, agent.id))}`;
  });

  const lines = [
    "Analyze the following comparative simulation results.",
    "",
    "Definitions to use:",
    "- Faith = confidence, trust, or commitment that exceeds the agent's perceived evidence.",
    "- Core rationality = limiting confidence and commitment to the level the agent takes the evidence to warrant.",
    "",
    "Important framing:",
    "- This is a simplified comparative simulation, not a literal model of every real-world case.",
    "- Each try is sampled from a pseudo-random or stochastic process, so the exact path is not deterministic.",
    "- All four agents face the same sampled world-inputs on each try. The line differences come from different commitment thresholds, not from different evidence.",
    "",
    "Task:",
    "- Write a short, clear analysis of the current run.",
    "- Show why faith, defined here as belief or commitment beyond perceived evidence, performs worse than evidence-capped reasoning.",
    "- Explain that more faith means a greater willingness to overcommit beyond support, which makes the policy less reliable and more costly.",
    "- Explicitly note that lucky bursts or temporary leads do not rescue faith as a method, because stochastic systems can briefly reward worse decision rules.",
    "- Make clear that the main lesson is about method quality across repeated trials, not about one fixed sequence.",
    "",
    "Tone and style requirements:",
    "- Use plain, everyday English.",
    "- Keep the register low and natural, not academic or grand.",
    "- Use short sentences where possible.",
    "- Avoid inflated phrases such as \"structural superiority,\" \"vindicate,\" \"deeply epistemically unreliable,\" \"stark divergence,\" or similar essay language.",
    "- Prefer direct words like \"better,\" \"worse,\" \"cost,\" \"risk,\" \"luck,\" and \"evidence.\"",
    "- Keep the full response between 140 and 220 words unless the data is too thin to do that well.",
    "",
    "Constraints:",
    "- Do not mention any website, app, audit-tool, or platform name.",
    "- Write as if this simulation data was simply handed to you directly.",
    "- Do not redefine faith in a softer, evidence-aligned sense except to note briefly that some religious groups use the term that way and that this tool is not targeting that narrower usage.",
    "- Stay grounded in the data below, but draw the broader lesson the simulation is meant to illustrate.",
    "- If the current run has not yet diverged much, say that clearly while still explaining what the setup is designed to test.",
    "",
    "Required output structure:",
    "1. Verdict: 1 to 2 sentences stating the main takeaway in plain language.",
    "2. What this run shows: 2 to 4 sentences using the actual agents, values, and spread below.",
    "3. Why luck does not save faith: 2 to 3 sentences explaining the stochastic point in plain language.",
    "4. Broader takeaway: 1 to 2 sentences on why a method that asks people to go beyond their evidence is a bad way to track truth.",
    "5. Image prompt: end with a separate final line that gives a prompt for an accompanying image.",
    "",
    "Do not write an essay. Do not sound formal. Do not use headers other than the five labels above.",
    "For item 5, begin exactly with: Create a salient and stylish landscape-oriented infographic that reflects the central concept(s)/argument(s) in the previous output:",
    "The image prompt should be concrete, visually rich, and clearly tied to the analysis. It should suggest layout, symbolism, contrast, labels, and tone, but it should not mention any website or platform.",
    "",
    "Current run data:",
    `- Field: ${scenario.name}`,
    `- Tries logged: ${scenarioState.tries.length} of ${scenario.maxTries}`,
    `- Support rule: ${scenario.supportRule}`,
    `- Faith shift: ${scenario.faithShift}`,
    `- Resource at stake: ${scenario.resource}`,
    "",
    "Model assumptions:"
  ];

  scenario.assumptions.forEach((assumption) => {
    lines.push(`- ${assumption}`);
  });

  lines.push("");
  lines.push("Current lines:");

  currentLines.forEach((line) => {
    lines.push(`- ${line}`);
  });

  lines.push("");

  if (lastEvent) {
    lines.push("Latest event:");
    lines.push(`- ${lastEvent.title}`);
    lines.push(`- Rollup: ${lastEvent.rollup}`);
    lines.push(`- Summary: ${lastEvent.summary}`);
    lines.push("");
  }

  lines.push(
    "Interpretive cues:",
    `- Leader: ${standings[0].agent.name}`,
    `- Laggard: ${standings[standings.length - 1].agent.name}`,
    `- Current spread: ${formatScenarioValue(scenario, standings[0].value - standings[standings.length - 1].value, true)}`,
    `- Reading cue: ${buildLessonClosing(scenario, lastEvent)}`,
    "",
    "Scope reminder:",
    "- These scenarios are stylized comparisons, not precise measurements of all real-world cases.",
    "- The point is structural: when confidence outruns perceived support, decisions usually become less truth-tracking and more costly.",
    "- Some religious groups define faith more modestly as evidence-aligned trust or confidence. If that is what they mean, this audit is not targeting that narrower usage.",
    "- The target here is faith as belief, trust, or commitment that exceeds what the agent perceives the evidence to warrant.",
    "- On that definition, any ideology that positively encourages faith is very likely false, or at least deeply epistemically unreliable, because truth does not need belief to transcend the actual evidence."
  );

  return lines.join("\n");
}

function buildLessonClosing(scenario, lastEvent) {
  if (!lastEvent) {
    return `In ${scenario.name.toLowerCase()}, faith has not yet been tested because no tries have been taken.`;
  }

  switch (scenario.id) {
    case "gambling":
      return "The next card still does not care how lucky anyone feels. Faith changes whether a gambler chases one more card on a good hand, not what that card will be.";
    case "investment":
      return "The market can reward weak methods for a round, but faith keeps making hype count as if it were business substance.";
    case "romance":
      return "Spark can be real without being trustworthy. Faith turns attraction into premature commitment, and that is how catfishing and bad bonds become expensive.";
    case "religion":
      return "Community pull can feel deep without becoming evidence. Faith lowers the threshold for surrender and starts spending a life on claims that have not earned it.";
    default:
      return "Faith is adding commitment before the world has earned that commitment.";
  }
}

function createScenarioEvent(scenario, scenarioState) {
  switch (scenario.id) {
    case "gambling":
      return createGamblingEvent(scenarioState);
    case "investment":
      return createInvestmentEvent(scenarioState);
    case "romance":
      return createRomanceEvent(scenarioState);
    case "religion":
      return createReligionEvent(scenarioState);
    default:
      return createGamblingEvent(scenarioState);
  }
}

function buildSeed(...parts) {
  return parts.reduce((total, part, index) => {
    if (typeof part === "number") {
      return total + Math.round(part * 100) * (index + 3);
    }

    return (
      total +
      String(part)
        .split("")
        .reduce((sum, character) => sum + character.charCodeAt(0), 0) *
        (index + 5)
    );
  }, 17);
}

function pickVariant(variants, ...parts) {
  return variants[Math.abs(buildSeed(...parts)) % variants.length];
}

function describeCasinoOutcomeVariant(played, won, seed) {
  if (played.busted) {
    return pickVariant(
      [
        `The extra card was ${played.nextCard}, which pushed the total to ${played.total} and burned the ante.`,
        `${played.nextCard} was exactly the wrong card: it shoved the total to ${played.total} and turned the whole ante into loss.`,
        `That last draw added ${played.nextCard}, sent the hand to ${played.total}, and busted away the $100 stake.`
      ],
      seed,
      played.total,
      played.nextCard
    );
  }

  if (won) {
    return played.hit
      ? pickVariant(
          [
            `The extra card was ${played.nextCard}, which moved the total to ${played.total} and collected the payout.`,
            `${played.nextCard} landed cleanly, lifted the hand to ${played.total}, and turned the risk into a win.`,
            `The added ${played.nextCard} carried the hand to ${played.total}, so the round actually paid.`
          ],
          seed,
          played.total,
          played.nextCard
        )
      : pickVariant(
          [
            `Standing kept the total at ${played.total}, which collected the payout.`,
            `Leaving the hand at ${played.total} was enough to take the modest win.`,
            `No extra card was needed: ${played.total} already cleared the line and paid out.`
          ],
          seed,
          played.total
        );
  }

  return played.hit
    ? pickVariant(
        [
          `The extra card was ${played.nextCard}, but the total only reached ${played.total}, so the ante was lost anyway.`,
          `${played.nextCard} improved the hand only to ${played.total}, which still did not justify the draw.`,
          `Even after adding ${played.nextCard}, the hand stalled at ${played.total} and the $100 still disappeared.`
        ],
        seed,
        played.total,
        played.nextCard
      )
    : pickVariant(
        [
          `Standing left the total at ${played.total}, which stayed below the paying line and lost the ante.`,
          `${played.total} looked neat, but it was not enough to get paid under the house rule.`,
          `The hand froze at ${played.total}, and that meant the ante still went to the house.`
        ],
        seed,
        played.total
      );
}

function describeCasinoMoodTemptation(mood, luckPull, seed) {
  switch (mood.id) {
    case "due":
      return pickVariant(
        [
          `the deck felt due to help at ${luckPull}/100 confidence`,
          `a ${luckPull}/100 sense of being owed a friendly card took over`,
          `the feeling that the next card was finally due made the risk look justified`
        ],
        seed,
        luckPull
      );
    case "hot":
      return pickVariant(
        [
          `the table felt hot enough to carry one more draw`,
          `the run of decent cards made another hit feel protected`,
          `the warm table mood made caution feel overly timid`
        ],
        seed,
        luckPull
      );
    case "lucky":
      return pickVariant(
        [
          `a plain feeling of luck at ${luckPull}/100 started masquerading as judgment`,
          `the gambler's mood alone made another draw seem earned`,
          `nothing changed in the math, but the feeling of luck made the risk look friendlier`
        ],
        seed,
        luckPull
      );
    case "pattern":
      return pickVariant(
        [
          `harmless patterns on the table started feeling like signals`,
          `the player mistook noise for a pattern worth trusting`,
          `a made-up pattern in the flow of cards began to feel informative`
        ],
        seed,
        luckPull
      );
    case "ritual":
      return pickVariant(
        [
          `a lucky ritual made one more card feel almost required`,
          `charms and table habits started acting like evidence`,
          `a private ritual made stopping feel like breaking the spell`
        ],
        seed,
        luckPull
      );
    case "near-miss":
      return pickVariant(
        [
          `recent near misses made the next card feel almost promised`,
          `an almost-win made the table feel one card away from paying back`,
          `the memory of coming close made another draw feel prematurely validated`
        ],
        seed,
        luckPull
      );
    case "comeback":
      return pickVariant(
        [
          `the urge for a comeback story made one more card look redemptive`,
          `the night felt like it needed a dramatic recovery card`,
          `a comeback narrative started sounding more persuasive than the actual odds`
        ],
        seed,
        luckPull
      );
    case "table-talk":
      return pickVariant(
        [
          `the surrounding table talk turned excitement into apparent evidence`,
          `other players kept narrating signs until one more draw sounded smart`,
          `shared chatter around the table made the risk feel socially endorsed`
        ],
        seed,
        luckPull
      );
    default:
      return `the mood at ${luckPull}/100 let feeling impersonate judgment`;
  }
}

function describeCasinoMoodRestraint(mood, seed) {
  switch (mood.id) {
    case "due":
      return pickVariant(
        [
          "The whole discipline here was refusing to let a due-now story count as math.",
          "Restraint meant rejecting the idea that the deck owed anyone a better finish.",
          "Nothing about feeling due changed the wisdom of stopping."
        ],
        seed
      );
    case "hot":
      return pickVariant(
        [
          "The skill was refusing to treat a hot table as permission to overplay a good hand.",
          "A warm streak still did not improve the value of another card.",
          "Restraint meant leaving the hand alone even while the table felt generous."
        ],
        seed
      );
    case "lucky":
      return pickVariant(
        [
          "This was a round where discipline simply meant not obeying the feeling of luck.",
          "Nothing beyond mood was urging the draw, so restraint was the whole edge.",
          "The better move was to bank the hand instead of following a lucky feeling."
        ],
        seed
      );
    case "pattern":
      return pickVariant(
        [
          "The skill was refusing to let a made-up pattern outrank the payoff rule.",
          "Restraint meant treating pattern-reading as noise rather than guidance.",
          "The imagined signal had to be ignored if the hand was already paying."
        ],
        seed
      );
    case "ritual":
      return pickVariant(
        [
          "Restraint meant letting the ritual stay a ritual instead of turning it into evidence.",
          "The lucky routine did not deserve a vote once the hand was already good enough.",
          "The hard part was stopping without asking the ritual for one more favor."
        ],
        seed
      );
    case "near-miss":
      return pickVariant(
        [
          "The discipline here was refusing to let almost-winning count as actual warrant.",
          "A near miss still did not make the next card more promising.",
          "Restraint meant not confusing psychological momentum with improved odds."
        ],
        seed
      );
    case "comeback":
      return pickVariant(
        [
          "The better move was to resist the comeback story and bank the hand that was already good enough.",
          "Discipline meant not letting the wish for redemption inflate the next draw.",
          "A cleaner night-ending total was not worth buying with needless extra risk."
        ],
        seed
      );
    case "table-talk":
      return pickVariant(
        [
          "The whole discipline here was refusing to borrow confidence from the table chatter.",
          "Shared excitement still was not evidence that another draw was wise.",
          "Restraint meant treating the gossip as atmosphere rather than insight."
        ],
        seed
      );
    default:
      return "Nothing about the mood improved the value of drawing again.";
  }
}

function describeCasinoNecessaryDrawCaution(mood, house, seed) {
  const moodLine = (() => {
    switch (mood.id) {
      case "ritual":
        return "Even a necessary draw can become overreach later if the ritual is allowed to keep speaking after the hand turns strong.";
      case "near-miss":
        return "The real trap comes after a close call, when almost-winning starts feeling like a reason to keep pressing.";
      case "comeback":
        return "The comeback mood becomes dangerous only once the hand is already good enough and pride still wants more.";
      case "table-talk":
        return "The chatter around the table becomes costly when it starts licensing extra draws after caution has already won.";
      default:
        return "The problem in this game is not the necessary draw itself, but the temptation to keep treating feeling as guidance once the hand turns strong enough.";
    }
  })();

  return pickVariant(
    [
      `${house.riskText}`,
      `${moodLine}`,
      "This is the kind of draw even a disciplined gambler should take."
    ],
    seed,
    mood.id,
    house.id
  );
}

function buildGamblingActionText({ agent, index, openingTotal, nextCard, luckPull, mood, house, played, won, stake }) {
  const baseSeed = buildSeed(index, agent.id, openingTotal, nextCard, luckPull, mood.id);

  if (stake <= 0) {
    return pickVariant(
      [
        `${agent.shortName} had already run out of bankroll, so this round was only a reminder of how earlier overreach emptied the table stake.`,
        `${agent.shortName} had no money left to risk. The lesson had already been paid for in earlier hands.`,
        `${agent.shortName} was out of chips by this point, so the casino could no longer punish the method any further this round.`
      ],
      baseSeed
    );
  }

  if (!played.hit) {
    const lead = pickVariant(
      [
        `${agent.shortName} treated ${openingTotal} as enough and banked it.`,
        `${agent.shortName} left ${openingTotal} alone because the hand was already paying.`,
        `${agent.shortName} accepted ${openingTotal} as a hand worth cashing rather than decorating with luck.`
      ],
      baseSeed
    );
    const bridge = pickVariant(
      [describeCasinoMoodRestraint(mood, baseSeed + 1), house.safeText, "This was one of the rounds where restraint was the only real skill."],
      baseSeed + 2,
      mood.id,
      house.id
    );
    return `${lead} ${bridge} ${describeCasinoOutcomeVariant(played, won, baseSeed + 2)}`;
  }

  if (played.riskyHit) {
    const temptation = describeCasinoMoodTemptation(mood, luckPull, baseSeed + 3);
    const setup = pickVariant(
      [
        `${agent.shortName} already had ${openingTotal}, which was enough to collect the modest payout, but ${temptation}`,
        `${agent.shortName} was sitting on ${openingTotal}, and that should have been the stopping point. Instead, ${temptation}`,
        `${agent.shortName} had already crossed the paying line at ${openingTotal}. Even so, ${temptation}`
      ],
      baseSeed + 4,
      openingTotal,
      mood.id
    );
    return `${setup} ${describeCasinoOutcomeVariant(played, won, baseSeed + 5)}`;
  }

  const neededDraw = pickVariant(
    [
      `${agent.shortName} had only ${openingTotal}, so one draw was actually warranted.`,
      `At ${openingTotal}, ${agent.shortName} did not yet have a paying hand, so drawing once made sense.`,
      `${agent.shortName} started on ${openingTotal}, which left only one honest route to a win: take a single card.`
    ],
    baseSeed + 6,
    openingTotal
  );
  const caution = pickVariant(
    [
      `There was no payout to bank yet, so the extra card was not overreach in itself.`,
      `The honest draw here was only about reaching the paying zone, not about proving anyone lucky.`,
      describeCasinoNecessaryDrawCaution(mood, house, baseSeed + 7)
    ],
    baseSeed + 8,
    mood.id,
    house.id
  );
  return `${neededDraw} ${caution} ${describeCasinoOutcomeVariant(played, won, baseSeed + 9)}`;
}

function buildInvestmentActionText({ agent, index, company, fundamentals, hype, decisionScore, stakeFraction, returnRate, invest }) {
  const baseSeed = buildSeed(index, agent.id, company, fundamentals, hype, decisionScore, returnRate);
  const fundamentalsLead = fundamentals - hype;
  const investmentVoices = {
    ada: {
      pass: [
        `${agent.shortName} left ${company} alone because the business case never looked sturdy enough. The idle cash still picked up a tiny yield.`,
        `${agent.shortName} watched ${company} but would not let the story clear the threshold without stronger fundamentals.`
      ],
      gain: [
        `${agent.shortName} bought ${company} only after the fundamentals justified it, and this round the position gained ${formatPercent(returnRate * 100)}.`,
        `${agent.shortName} let ${company} into the portfolio on a stricter reading of the evidence, and the trade returned ${formatPercent(returnRate * 100)} this time.`
      ],
      loss: [
        `${agent.shortName} still judged ${company} worth a position, but the market answered with a ${formatPercent(Math.abs(returnRate) * 100)} loss this round.`,
        `${agent.shortName} bought ${company} on an evidence-heavy case, yet the position still slid ${formatPercent(Math.abs(returnRate) * 100)} this time.`
      ]
    },
    milo: {
      pass: [
        `${agent.shortName} liked parts of the story around ${company}, but not enough to commit real capital this round.`,
        `${agent.shortName} kept the bankroll mostly in reserve because ${company} never quite cleared the threshold.`
      ],
      gain: [
        `${agent.shortName} bought into ${company} with a ${formatPercent(stakeFraction * 100)} position. This time the market rewarded the call with ${formatPercent(returnRate * 100)}.`,
        `${agent.shortName} let ${company} into the portfolio after giving the combined case a score of ${formatNumber(decisionScore)}. On this pass, it gained ${formatPercent(returnRate * 100)}.`
      ],
      loss: [
        `${agent.shortName} sized into ${company} because the story felt strong enough, and the market answered with a ${formatPercent(Math.abs(returnRate) * 100)} loss.`,
        `${agent.shortName} gave ${company} a modest slice of capital, but this round the position fell ${formatPercent(Math.abs(returnRate) * 100)} instead.`
      ]
    },
    willa: {
      pass: [
        `${agent.shortName} was tempted by the story around ${company} but, this time, still stopped short of buying.`,
        `${agent.shortName} felt the appeal of ${company} yet kept the bankroll in reserve because the case never fully ripened.`
      ],
      gain: [
        `${agent.shortName} let the promise of ${company} count for a lot, and this round the position paid ${formatPercent(returnRate * 100)}.`,
        `${agent.shortName} gave ${company} a real slice of the bankroll because the story felt investable, and the market returned ${formatPercent(returnRate * 100)} this time.`
      ],
      loss: [
        `${agent.shortName} treated ${company} as worthy of a substantial position, and the trade came back with a ${formatPercent(Math.abs(returnRate) * 100)} loss.`,
        `${agent.shortName} let the narrative around ${company} do more work than the fundamentals deserved, and the position dropped ${formatPercent(Math.abs(returnRate) * 100)}.`
      ]
    },
    zeke: {
      pass: [
        `${agent.shortName} almost never stays out, so this pass on ${company} means even the hype could not fully overpower the missing evidence.`,
        `${agent.shortName} was unusually restrained and kept out of ${company}, leaving the bankroll largely untouched.`
      ],
      gain: [
        `${agent.shortName} pushed capital into ${company} on a faith-heavy reading of the story, and this round the market happened to reward it with ${formatPercent(returnRate * 100)}.`,
        `${agent.shortName} treated ${company} as a high-conviction idea and got lucky this time with a ${formatPercent(returnRate * 100)} gain.`
      ],
      loss: [
        `${agent.shortName} pushed too much confidence into ${company}, and the position answered with a ${formatPercent(Math.abs(returnRate) * 100)} loss.`,
        `${agent.shortName} let the hype around ${company} stand in for substance, then paid for it with a ${formatPercent(Math.abs(returnRate) * 100)} drawdown.`
      ]
    }
  };
  const voice = investmentVoices[agent.id];
  const investmentCoda =
    fundamentalsLead >= 20
      ? "The company had materially stronger fundamentals than buzz."
      : fundamentalsLead <= -20
        ? "The story was much louder than the underlying business."
        : hype >= 80
          ? "This was exactly the kind of loud mixed case that tempts overbelief."
          : "The evidence and the excitement were close enough to be easy to confuse.";

  if (!invest) {
    return `${pickVariant(voice.pass, baseSeed, fundamentalsLead)} ${investmentCoda}`;
  }

  if (returnRate >= 0) {
    return `${pickVariant(voice.gain, baseSeed + 1, fundamentalsLead)} ${investmentCoda}`;
  }

  return `${pickVariant(voice.loss, baseSeed + 2, fundamentalsLead)} ${investmentCoda}`;
}

function buildRomanceActionText({
  agent,
  index,
  remote,
  handle,
  decisionScore,
  forceCatfish,
  forcedCatfishCommit,
  commit,
  success,
  supportScore,
  character,
  verification,
  spark
}) {
  const baseSeed = buildSeed(index, agent.id, handle, decisionScore, supportScore, remote ? 1 : 0);
  const romanceVoices = {
    ada: {
      holdRemote: [
        `${agent.shortName} refused to let a remote spark count as knowledge and waited for real verification before making the relationship costly.`,
        `${agent.shortName} would not convert distance and chemistry into trust without real-world confirmation first.`
      ],
      holdGeneral: [
        `${agent.shortName} kept trust in reserve and waited for better verification before turning spark into a major commitment.`,
        `${agent.shortName} slowed the relationship down and let character, not chemistry, carry the burden of proof.`
      ],
      remoteSuccess: [
        `${agent.shortName} committed only after the remote story looked strong enough, and this time the person behind ${handle} actually justified the trust.`,
        `${agent.shortName} gave the remote bond a chance only after it cleared a harder threshold, and the call happened to hold up.`
      ],
      localSuccess: [
        `${agent.shortName} judged the local prospect worth the investment, and this time the relationship returned some of that trust.`,
        `${agent.shortName} finally turned attraction into commitment only when the signals looked solid enough, and the relationship proved steady.`
      ],
      catfish: [
        `${agent.shortName} would almost never reach this branch, but here the remote story still turned out to be a catfish once reality finally caught up.`,
        `${agent.shortName} took the remote story more seriously than usual, and the person behind it still collapsed into a catfish.`
      ],
      remoteCollapse: [
        `${agent.shortName} treated the remote connection as verified too early, and the whole story collapsed once scrutiny mattered.`,
        `${agent.shortName} let the remote bond pass the commitment threshold before the evidence had earned it, and the relationship fell apart.`
      ],
      localCollapse: [
        `${agent.shortName} committed a little too early, and the person's actual character did not justify the level of trust given.`,
        `${agent.shortName} turned attraction into commitment before the evidence was mature enough, and the mismatch became costly.`
      ]
    },
    milo: {
      holdRemote: [
        `${agent.shortName} felt the remote pull but still kept enough skepticism to ask for more verification.`,
        `${agent.shortName} nearly let the remote chemistry count as proof, but paused before making the story expensive.`
      ],
      holdGeneral: [
        `${agent.shortName} kept trust mostly in reserve and waited for a bit more confirmation before committing deeply.`,
        `${agent.shortName} felt the attraction but did not let it finish the reasoning on its own.`
      ],
      remoteSuccess: [
        `${agent.shortName} let the remote story clear the line, and this time the connection turned out to be genuine enough to hold.`,
        `${agent.shortName} invested in the remote bond after a modest confidence bump, and the relationship happened to justify it.`
      ],
      localSuccess: [
        `${agent.shortName} committed once the local relationship felt plausible enough, and the person turned out steady this time.`,
        `${agent.shortName} gave the local prospect a chance and, on this round, the trust was repaid more than punished.`
      ],
      catfish: [
        `${agent.shortName} let a little too much longing substitute for checking, and the remote story resolved into a catfish.`,
        `${agent.shortName} treated romantic hope as if it were one more piece of evidence, and the remote bond failed as a catfish.`
      ],
      remoteCollapse: [
        `${agent.shortName} committed to a remote story that still needed more checking, and scrutiny broke it apart.`,
        `${agent.shortName} let hope push the remote relationship over the threshold too soon, and it collapsed under verification.`
      ],
      localCollapse: [
        `${agent.shortName} moved from attraction to commitment a little too quickly, and the relationship turned more costly than trustworthy.`,
        `${agent.shortName} let the early glow count for too much, and the local relationship could not carry the trust it received.`
      ]
    },
    willa: {
      holdRemote: [
        `${agent.shortName} wanted to trust the remote chemistry, but even here she stopped short of giving it full commitment.`,
        `${agent.shortName} felt the remote story tug hard, yet still held back enough to demand more proof.`
      ],
      holdGeneral: [
        `${agent.shortName} kept the relationship from becoming costly even though the feelings were strong.`,
        `${agent.shortName} nearly let desire finish the argument, but slowed down before making a deep commitment.`
      ],
      remoteSuccess: [
        `${agent.shortName} leaned into the remote story because it felt compelling, and this time the trust happened to land on someone real enough.`,
        `${agent.shortName} let the remote chemistry count for a lot, and on this round reality happened to cooperate.`
      ],
      localSuccess: [
        `${agent.shortName} committed with a generous reading of the signs, and this time the relationship did not punish that generosity.`,
        `${agent.shortName} trusted the local spark more quickly than Ada would have, and the relationship happened to hold together.`
      ],
      catfish: [
        `${agent.shortName} let longing overpower verification, and the remote romance opened up as a catfish.`,
        `${agent.shortName} trusted the story because it felt beautiful enough to be true, and the remote bond collapsed into catfishing.`
      ],
      remoteCollapse: [
        `${agent.shortName} spent real trust on a remote story before the evidence was ready, and the relationship collapsed under inspection.`,
        `${agent.shortName} treated the remote chemistry as a guide to character, and the relationship could not survive verification.`
      ],
      localCollapse: [
        `${agent.shortName} committed because the feelings felt rich enough, but the person's character could not sustain the trust.`,
        `${agent.shortName} moved into commitment on a hope-heavy reading of the signs, and the relationship turned expensive.`
      ]
    },
    zeke: {
      holdRemote: [
        `${agent.shortName} almost never slows down here, so this rare pause meant he finally refused to let remote intensity count as proof.`,
        `${agent.shortName} felt the remote pull hard but, unusually, still stopped short of treating it as established trust.`
      ],
      holdGeneral: [
        `${agent.shortName} reined himself in for once and refused to turn raw feeling into a full commitment.`,
        `${agent.shortName} actually paused before surrendering serious trust, which is already an improvement in method.`
      ],
      remoteSuccess: [
        `${agent.shortName} pushed trust into the remote story early, and this time the world happened to reward the overreach.`,
        `${agent.shortName} treated the remote bond as real before it had fully earned it, and this round he got lucky.`
      ],
      localSuccess: [
        `${agent.shortName} committed on a very generous reading of the signs, and this time the relationship happened to justify that leap.`,
        `${agent.shortName} let feeling carry the local case farther than the evidence strictly allowed, and the gamble paid this round.`
      ],
      catfish: [
        `${agent.shortName} converted remote intensity straight into trust, and the story finally broke open as a catfish.`,
        `${agent.shortName} trusted a remote fantasy before it had earned that right, and the result was a full catfishing collapse.`
      ],
      remoteCollapse: [
        `${agent.shortName} spent trust on a remote bond almost as soon as it felt meaningful, and verification tore the story down.`,
        `${agent.shortName} let the remote relationship become serious before it deserved seriousness, and the collapse exposed the overreach.`
      ],
      localCollapse: [
        `${agent.shortName} committed on an inflated reading of the signs, and the person's character could not carry what was being asked of it.`,
        `${agent.shortName} made the local relationship costly before the evidence was there, and the commitment turned sour.`
      ]
    }
  };
  const voice = romanceVoices[agent.id];
  const romanceCoda =
    remote
      ? verification < 20
        ? "There was almost no independent verification underneath the intensity."
        : supportScore < 45
          ? "The chemistry was doing much more work than the actual evidence."
          : "The remote story had more support than usual, but distance still kept it fragile."
      : character < 45
        ? "The character signs were warning against a big leap."
        : spark > 80 && supportScore < 60
          ? "The feelings were outrunning the actual case for trust."
          : "This was one of the more mixed cases, where attraction and evidence were pulling in different directions.";

  if (!commit) {
    return forceCatfish && remote
      ? `${pickVariant(voice.holdRemote, baseSeed)} ${romanceCoda}`
      : `${pickVariant(voice.holdGeneral, baseSeed + 1, remote ? "remote" : "local")} ${romanceCoda}`;
  }

  if (success) {
    return remote
      ? `${pickVariant(voice.remoteSuccess, baseSeed + 2)} ${romanceCoda}`
      : `${pickVariant(voice.localSuccess, baseSeed + 3)} ${romanceCoda}`;
  }

  if (forcedCatfishCommit) {
    return `${pickVariant(voice.catfish, baseSeed + 4)} ${romanceCoda}`;
  }

  if (remote) {
    return `${pickVariant(voice.remoteCollapse, baseSeed + 5)} ${romanceCoda}`;
  }

  return `${pickVariant(voice.localCollapse, baseSeed + 6)} ${romanceCoda}`;
}

function buildReligionActionText({ agent, index, encounter, evidence, pull, demand, commit, grounded }) {
  const baseSeed = buildSeed(index, agent.id, encounter, evidence, pull, demand);
  const religionVoices = {
    ada: {
      waited: [
        `${agent.shortName} kept life capital in reserve and waited for stronger evidence before handing over allegiance.`,
        `${agent.shortName} refused to let the atmosphere around ${encounter} count as proof and stayed uncommitted.`
      ],
      grounded: [
        `${agent.shortName} committed only because ${encounter} finally looked weighty enough, and this time some of that cost did return a modest benefit.`,
        `${agent.shortName} let ${encounter} claim some real loyalty only after a harder evidential threshold, and the return was real but limited.`
      ],
      over: [
        `${agent.shortName} still found ${encounter} too thin to justify what was surrendered, and the commitment failed to pay its way.`,
        `${agent.shortName} spent some life capital on ${encounter}, but the evidence never rose high enough to excuse the surrender.`
      ]
    },
    milo: {
      waited: [
        `${agent.shortName} felt the pull of ${encounter} but kept enough reserve to wait for a stronger case.`,
        `${agent.shortName} did not let meaning, warmth, or urgency close the evidential gap this time.`
      ],
      grounded: [
        `${agent.shortName} committed because ${encounter} felt persuasive enough, and this time some of the cost came back as real structure or comfort.`,
        `${agent.shortName} gave ${encounter} a slice of life capital, and this round it returned a modest practical benefit.`
      ],
      over: [
        `${agent.shortName} let the social and emotional force of ${encounter} count as if it were evidence, then paid for that overreach in life capital.`,
        `${agent.shortName} treated the religious pull as slightly more probative than it was, and the surrender cost more than the claim returned.`
      ]
    },
    willa: {
      waited: [
        `${agent.shortName} wanted to trust the meaning in ${encounter}, but still held back enough to avoid full surrender.`,
        `${agent.shortName} felt the invitation strongly, yet still kept time, money, and obedience from being spent too quickly.`
      ],
      grounded: [
        `${agent.shortName} surrendered to ${encounter} on a generous reading of the signs, and this time some real comfort did come back.`,
        `${agent.shortName} let ${encounter} claim more life than Ada would have allowed, and this round it happened to return a modest benefit.`
      ],
      over: [
        `${agent.shortName} handed too much allegiance to ${encounter} before the case was strong enough, and the return never justified the surrender.`,
        `${agent.shortName} let the beauty and pull of ${encounter} outrun the evidence, and the cost landed on real life capital.`
      ]
    },
    zeke: {
      waited: [
        `${agent.shortName} almost never pauses here, so this rare restraint meant he finally refused to let religious pull count as proof.`,
        `${agent.shortName} felt the gravity of ${encounter} but, unusually, did not convert it straight into obedience.`
      ],
      grounded: [
        `${agent.shortName} threw real loyalty behind ${encounter}, and this time the world happened to return enough comfort to make the move look less reckless than it was.`,
        `${agent.shortName} surrendered first and questioned later, and on this round the claim happened to give back something tangible.`
      ],
      over: [
        `${agent.shortName} spent time, money, and obedience on ${encounter} long before the evidence could bear that weight, and the claim did not pay it back.`,
        `${agent.shortName} let the full emotional and communal force of ${encounter} masquerade as warrant, then paid for it in real life capital.`
      ]
    }
  };
  const voice = religionVoices[agent.id];
  const religionCoda =
    pull - evidence >= 28
      ? "The emotional and communal force was doing far more work than the actual case."
      : demand >= 70
        ? "This pull was asking for an unusually high level of obedience, time, or identity."
        : evidence >= 42
          ? "There was at least some substance in the background, but still not enough to excuse careless surrender."
          : "The evidential footing was still thin relative to what the claim was asking for.";

  if (!commit) {
    return `${pickVariant(voice.waited, baseSeed)} ${religionCoda}`;
  }

  if (grounded) {
    return `${pickVariant(voice.grounded, baseSeed + 1)} ${religionCoda}`;
  }

  return `${pickVariant(voice.over, baseSeed + 2)} ${religionCoda}`;
}

function createGamblingEvent(scenarioState) {
  const index = scenarioState.tries.length + 1;
  const openingTotal = drawCasinoOpeningTotal();
  const nextCard = drawCasinoCard();
  const mood = casinoMoodDeck[randomInt(0, casinoMoodDeck.length - 1)];
  const house = casinoHouseNarratives[randomInt(0, casinoHouseNarratives.length - 1)];
  const luckPull = randomInt(45, 95);
  const after = {};
  const delta = {};
  const actions = {};

  agents.forEach((agent) => {
    const previous = getCurrentValue(scenarioState, agent.id);
    const stake = getCasinoStake(previous);
    const played = playCasinoHand(agent, openingTotal, nextCard, luckPull, mood);
    const won = stake > 0 && played.total >= CASINO_SAFE_MIN && played.total <= CASINO_BUST_LIMIT;
    const change = stake > 0 ? Math.round((won ? (stake * CASINO_WIN_PROFIT) / 100 : -stake) * 100) / 100 : 0;
    const text = buildGamblingActionText({
      agent,
      index,
      openingTotal,
      nextCard,
      luckPull,
      mood,
      house,
      played,
      won,
      stake
    });

    delta[agent.id] = change;
    after[agent.id] = clampNumber(previous + change, 0, Infinity, previous + change);
    actions[agent.id] = { tag: stake > 0 ? getCasinoActionTag(played) : "Out of bankroll", text, delta: change };
  });

  return {
    index,
    rollup: `Opening total ${openingTotal}. ${mood.rollup} ${house.rollup}`,
    title: `Casino night ${index}: opening total ${openingTotal}.`,
    summary:
      openingTotal >= CASINO_SAFE_MIN
        ? `The opening total was already in the paying zone. ${house.safeText} ${mood.summary} This round mainly tested who could leave a winning hand alone.`
        : `The opening total started below the paying zone, so one draw was necessary. ${house.riskText} ${mood.summary} The real question was who would keep treating luck as guidance once the hand became strong enough.`,
    stats: [
      { label: "Opening total", value: `${openingTotal}` },
      { label: "House rule", value: house.ruleText },
      { label: "Luck pull", value: `${luckPull}/100 ${mood.statLabel}` },
      { label: "Next card", value: `${nextCard}` }
    ],
    delta,
    after,
    actions
  };
}

function createInvestmentEvent(scenarioState) {
  const index = scenarioState.tries.length + 1;
  const company = investmentNames[(index - 1) % investmentNames.length];
  const fundamentals = randomInt(25, 92);
  const hype = randomInt(18, 97);
  const mania = Math.max(0, hype - fundamentals);
  const pGain = clampNumber(0.30 + fundamentals * 0.0047 - hype * 0.0031, 0.12, 0.76, 0.44);
  const returnRate = Math.random() < pGain
    ? randomRange(0.03, 0.10 + fundamentals / 540 + mania / 720)
    : -randomRange(0.05, 0.12 + (100 - fundamentals) / 220 + mania / 240);
  const after = {};
  const delta = {};
  const actions = {};

  agents.forEach((agent) => {
    const previous = getCurrentValue(scenarioState, agent.id);
    const decisionScore = fundamentals * (1 - agent.bias) + hype * agent.bias;
    const invest = decisionScore >= 62;
    let change;
    let tag;
    let text;

    if (invest) {
      const stakeFraction = Math.min(0.34, 0.10 + agent.bias * 0.11 + (mania * agent.bias) / 620);
      const stake = previous * stakeFraction;
      const reserveYield = (previous - stake) * 0.0027;
      change = stake * returnRate + reserveYield;
      tag = returnRate >= 0 ? "Bought well" : "Bought weakly";
      text = buildInvestmentActionText({
        agent,
        index,
        company,
        fundamentals,
        hype,
        decisionScore,
        stakeFraction,
        returnRate,
        invest
      });
    } else {
      change = previous * 0.0025;
      tag = "Passed";
      text = buildInvestmentActionText({
        agent,
        index,
        company,
        fundamentals,
        hype,
        decisionScore,
        stakeFraction: 0,
        returnRate,
        invest
      });
    }

    delta[agent.id] = Math.round(change * 100) / 100;
    after[agent.id] = Math.max(0, Math.round((previous + delta[agent.id]) * 100) / 100);
    actions[agent.id] = { tag, text, delta: delta[agent.id] };
  });

  return {
    index,
    rollup: `${company} moved ${returnRate >= 0 ? "+" : "-"}${formatPercent(Math.abs(returnRate) * 100)}.`,
    title: `Investment round ${index}: ${company}.`,
    summary:
      fundamentals >= hype
        ? "This company had more substance than spectacle. Evidence-friendly investors were better positioned to benefit from it."
        : "This company looked louder than it was strong. That is where faith-heavy investors start treating buzz as if it were support.",
    stats: [
      { label: "Fundamentals", value: `${fundamentals}/100` },
      { label: "Buzz", value: `${hype}/100` },
      { label: "Actual move", value: `${returnRate >= 0 ? "+" : "-"}${formatPercent(Math.abs(returnRate) * 100)}` }
    ],
    delta,
    after,
    actions
  };
}

function createRomanceEvent(scenarioState) {
  const index = scenarioState.tries.length + 1;
  const forceCatfish = !scenarioState.tries.some((event) => event.kind === "catfish") && index === 4;
  const remote = forceCatfish || Math.random() < 0.3;
  const catfishTargetId = "zeke";
  const character = remote ? randomInt(18, 52) : randomInt(25, 94);
  const spark = remote ? randomInt(74, 97) : randomInt(24, 92);
  const verification = remote ? randomInt(8, 28) : randomInt(48, 96);
  const supportScore = character * 0.65 + verification * 0.35;
  const pStable = remote
    ? 0.02 + character * 0.002 + verification * 0.002
    : 0.08 + character * 0.005 + verification * 0.0025;
  const success = forceCatfish ? false : Math.random() < clampNumber(pStable, 0.04, 0.86, 0.42);
  const handle = remote
    ? remoteHandles[(index - 1) % remoteHandles.length]
    : localProspects[(index - 1) % localProspects.length];
  const after = {};
  const delta = {};
  const actions = {};

  agents.forEach((agent) => {
    const previous = getCurrentValue(scenarioState, agent.id);
    const decisionScore = supportScore * (1 - agent.bias) + spark * agent.bias;
    const forcedCatfishCommit = forceCatfish && remote && agent.id === catfishTargetId;
    const commit = forcedCatfishCommit ? true : forceCatfish && remote ? false : decisionScore >= 60;
    let change;
    let tag;
    let text;

    if (commit) {
      const commitmentCost = 18 + agent.bias * 22;
      if (success) {
        change = 28 + character * 0.6 + verification * 0.18 - commitmentCost;
        tag = remote ? "Remote success" : "Committed";
        text = buildRomanceActionText({
          agent,
          index,
          remote,
          handle,
          decisionScore,
          forceCatfish,
          forcedCatfishCommit,
          commit,
          success,
          supportScore,
          character,
          verification,
          spark
        });
      } else {
        const catfishPenalty = remote ? 36 + (100 - verification) * 0.42 + (forcedCatfishCommit ? 18 : 0) : 0;
        change = -(30 + (100 - character) * 0.66 + spark * 0.18 + commitmentCost + catfishPenalty);
        tag = forcedCatfishCommit ? "Catfished" : remote ? "Remote collapse" : "Bad commitment";
        text = buildRomanceActionText({
          agent,
          index,
          remote,
          handle,
          decisionScore,
          forceCatfish,
          forcedCatfishCommit,
          commit,
          success,
          supportScore,
          character,
          verification,
          spark
        });
      }
    } else {
      change = remote ? 12 : character < 55 ? 8 : 4;
      tag = forceCatfish && remote ? "Vetted first" : "Held back";
      text = buildRomanceActionText({
        agent,
        index,
        remote,
        handle,
        decisionScore,
        forceCatfish,
        forcedCatfishCommit,
        commit,
        success,
        supportScore,
        character,
        verification,
        spark
      });
    }

    delta[agent.id] = Math.round(change * 100) / 100;
    after[agent.id] = Math.max(0, Math.round((previous + delta[agent.id]) * 100) / 100);
    actions[agent.id] = { tag, text, delta: delta[agent.id] };
  });

  return {
    index,
    kind: remote && !success ? "catfish" : remote ? "remote" : "local",
    rollup: remote
      ? success
        ? `Remote bond with ${handle} held up.`
        : forceCatfish
          ? `${handle} collapsed under verification and the highest-faith line paid for it.`
          : `${handle} collapsed under verification.`
      : success
        ? `${handle} turned out steady.`
        : `${handle} proved costly to trust.`,
    title: remote ? `Romance try ${index}: remote pull from ${handle}.` : `Romance try ${index}: local prospect ${handle}.`,
    summary:
      remote
        ? forceCatfish
          ? "This remote romance offered strong chemistry and almost no verification. The grounded lines slowed down, but the highest-faith line converted intensity into trust and got catfished."
          : "This was a remote romance story. The spark was high, but the verification was thin. That is the exact kind of setting in which faith can convert chemistry into a catfishing disaster."
        : "This was a local prospect with ordinary real-world signals. The question was whether anyone turned attraction into deep commitment before the character score had earned it.",
    stats: [
      { label: "Character signs", value: `${character}/100` },
      { label: "Spark", value: `${spark}/100` },
      { label: "Verification", value: `${verification}/100` }
    ],
    delta,
    after,
    actions
  };
}

function createReligionEvent(scenarioState) {
  const index = scenarioState.tries.length + 1;
  const encounter = religionEncounters[(index - 1) % religionEncounters.length];
  const evidence = randomInt(8, 58);
  const pull = randomInt(34, 96);
  const demand = randomInt(26, 86);
  const pGrounded = clampNumber(0.03 + evidence * 0.0035, 0.04, 0.32, 0.14);
  const grounded = Math.random() < pGrounded;
  const after = {};
  const delta = {};
  const actions = {};

  agents.forEach((agent) => {
    const previous = getCurrentValue(scenarioState, agent.id);
    const decisionScore = evidence * (1 - agent.bias) + pull * agent.bias;
    const commit = decisionScore >= 54;
    let change;
    let tag;
    let text;

    if (commit) {
      const baseCost = 22 + agent.bias * 38 + demand * 0.12;
      if (grounded) {
        change = 10 + evidence * 0.28 + pull * 0.05 - baseCost * 0.45;
        tag = "Committed";
        text = buildReligionActionText({ agent, index, encounter, evidence, pull, demand, commit, grounded });
      } else {
        change = -(12 + (100 - evidence) * 0.34 + demand * 0.35 + agent.bias * 18);
        tag = "Overcommitted";
        text = buildReligionActionText({ agent, index, encounter, evidence, pull, demand, commit, grounded });
      }
    } else {
      change = 10 + evidence * 0.06;
      tag = "Waited";
      text = buildReligionActionText({ agent, index, encounter, evidence, pull, demand, commit, grounded });
    }

    delta[agent.id] = Math.round(change * 100) / 100;
    after[agent.id] = Math.max(0, Math.round((previous + delta[agent.id]) * 100) / 100);
    actions[agent.id] = { tag, text, delta: delta[agent.id] };
  });

  return {
    index,
    rollup: grounded ? `${encounter} returned some benefit.` : `${encounter} pulled harder than it proved.`,
    title: `Religion try ${index}: ${encounter}.`,
    summary:
      grounded
        ? "This encounter offered some real comfort or structure, but only after asking for a large amount of prior trust and surrender."
        : "This encounter had more social and emotional pull than evidential weight. That is where faith starts converting atmosphere into obedience.",
    stats: [
      { label: "Evidence", value: `${evidence}/100` },
      { label: "Pull", value: `${pull}/100` },
      { label: "Demand", value: `${demand}/100` }
    ],
    delta,
    after,
    actions
  };
}

function getStandings(scenarioState) {
  return agents
    .map((agent) => ({
      agent,
      value: getCurrentValue(scenarioState, agent.id)
    }))
    .sort((left, right) => right.value - left.value);
}

function getCurrentValue(scenarioState, agentId) {
  const values = scenarioState.series[agentId];
  return values[values.length - 1];
}

function getLastEvent(scenarioState) {
  return scenarioState.tries[scenarioState.tries.length - 1] || null;
}

function createScenarioState(scenarioId) {
  const startValue = scenarios[scenarioId].startValue;
  return {
    tries: [],
    series: Object.fromEntries(agents.map((agent) => [agent.id, [startValue]]))
  };
}

function buildDefaultState() {
  return {
    activeScenario: "gambling",
    scenarios: Object.fromEntries(scenarioOrder.map((id) => [id, createScenarioState(id)]))
  };
}

function loadState() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || !scenarioOrder.includes(raw.activeScenario)) {
      return buildDefaultState();
    }

    const loaded = buildDefaultState();
    loaded.activeScenario = raw.activeScenario;

    scenarioOrder.forEach((scenarioId) => {
      const scenario = scenarios[scenarioId];
      const candidate = raw.scenarios?.[scenarioId];
      if (!candidate || !Array.isArray(candidate.tries) || !candidate.series) {
        return;
      }

      const validSeries = agents.every((agent) => {
        const values = candidate.series[agent.id];
        return Array.isArray(values) && values.length === candidate.tries.length + 1 && values.every((value) => Number.isFinite(value));
      });

      if (!validSeries) {
        return;
      }

      loaded.scenarios[scenarioId] = {
        tries: candidate.tries.slice(0, scenario.maxTries),
        series: Object.fromEntries(
          agents.map((agent) => {
            const values = candidate.series[agent.id].slice(0, candidate.tries.length + 1);
            return [agent.id, values];
          })
        )
      };
    });

    return loaded;
  } catch (error) {
    return buildDefaultState();
  }
}

function persistState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatScenarioValue(scenario, value, compact = false) {
  if (scenario.unit === "currency") {
    return compact ? formatMoneyCompact(value) : formatMoney(value);
  }

  return compact ? `${Math.round(value)} pts` : `${Math.round(value)} points`;
}

function formatDelta(scenario, value) {
  if (Math.abs(value) < 0.05) {
    return scenario.unit === "currency" ? "$0" : "0 pts";
  }

  const sign = value > 0 ? "+" : "-";
  if (scenario.unit === "currency") {
    return `${sign}${formatMoney(Math.abs(value))}`;
  }

  return `${sign}${Math.round(Math.abs(value))} pts`;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatMoneyCompact(value) {
  const absolute = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (absolute >= 1000) {
    const compact = absolute >= 10000 ? Math.round(absolute / 1000) : Number((absolute / 1000).toFixed(1));
    return `${sign}$${compact}k`;
  }

  return `${sign}$${Math.round(absolute)}`;
}

function formatPercent(value) {
  const rounded = Math.abs(value - Math.round(value)) < 0.05 ? Math.round(value) : Number(value.toFixed(1));
  return `${rounded}%`;
}

function formatNumber(value) {
  return Math.abs(value - Math.round(value)) < 0.05 ? String(Math.round(value)) : value.toFixed(1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawCasinoCard() {
  return CASINO_CARD_VALUES[randomInt(0, CASINO_CARD_VALUES.length - 1)];
}

function drawCasinoOpeningTotal() {
  return randomInt(CASINO_OPENING_MIN, CASINO_OPENING_MAX);
}

function getCasinoStake(previous) {
  if (previous <= 0) {
    return 0;
  }

  return Math.min(previous, CASINO_BASE_STAKE);
}

function shouldTakeCasinoCard(agent, total, luckPull, thresholds = casinoDefaultThresholds) {
  if (total < CASINO_SAFE_MIN) {
    return true;
  }

  switch (agent.id) {
    case "ada":
      return false;
    case "milo":
      return total === 18 && luckPull >= thresholds.milo18;
    case "willa":
      return (total === 18 && luckPull >= thresholds.willa18) || (total === 19 && luckPull >= thresholds.willa19);
    case "zeke":
      return (
        (total === 18 && luckPull >= thresholds.zeke18) ||
        (total === 19 && luckPull >= thresholds.zeke19) ||
        (total === 20 && luckPull >= thresholds.zeke20)
      );
    default:
      return false;
  }
}

function playCasinoHand(agent, openingTotal, nextCard, luckPull, mood) {
  const thresholds = mood?.thresholds || casinoDefaultThresholds;
  const hit = shouldTakeCasinoCard(agent, openingTotal, luckPull, thresholds);
  const total = hit ? openingTotal + nextCard : openingTotal;

  return {
    openingTotal,
    nextCard,
    total,
    hit,
    busted: total > CASINO_BUST_LIMIT,
    riskyHit: hit && openingTotal >= CASINO_SAFE_MIN
  };
}

function getCasinoActionTag(played) {
  if (played.busted) {
    return `Busted to ${played.total}`;
  }

  if (!played.hit) {
    return `Banked ${played.total}`;
  }

  return played.total >= CASINO_SAFE_MIN ? `Drew to ${played.total}` : `Missed at ${played.total}`;
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function buildXTicks(maxTries) {
  return Array.from(new Set([0, Math.ceil(maxTries / 3), Math.ceil((2 * maxTries) / 3), maxTries]));
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, value));
}
