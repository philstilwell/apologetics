const STORAGE_KEY = "belief-overreach-audit-v6";

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

const casinoMoodDeck = [
  {
    id: "due",
    statLabel: "Due-now feeling",
    rollup: "Some players felt the next card was due to help them.",
    summary:
      "A low card or a near miss can make another good card feel due. That feeling is psychologically powerful, but it does not change the next draw."
  },
  {
    id: "hot",
    statLabel: "Hot-hand feeling",
    rollup: "Some players felt the table was running hot.",
    summary:
      "A run of decent cards can make the table feel hot. Faith-heavy gamblers often let that mood justify one more draw, even when the hand is already good enough."
  },
  {
    id: "lucky",
    statLabel: "Feeling-lucky mood",
    rollup: "Several players were simply feeling lucky.",
    summary:
      "Sometimes nothing more specific is happening than a surge of confidence, hope, or ritualized luck. That feeling can still push people to chase another card when caution would be wiser."
  },
  {
    id: "pattern",
    statLabel: "Pattern-reading mood",
    rollup: "Some players kept reading patterns into the table.",
    summary:
      "People kept treating harmless patterns as signals. That is how faith starts turning noise into a reason for chasing one more card on a hand that was already strong."
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
    maxTries: 14,
    lead:
      "Each round brings another company with a fundamentals signal and a hype signal. The grounded investor studies the business. The faith-driven investor lets buzz and gut feeling do too much of the work.",
    supportRule:
      "Support lives in the fundamentals: profitability, debt, leadership quality, and durable demand. That is the sober signal the rational investor respects.",
    faithShift:
      "Faith makes hype feel like support. The farther right the agent sits, the more easily excitement, story, and momentum can substitute for due diligence.",
    resource:
      "Portfolio dollars. The overreach cost appears as larger positions taken in weaker businesses.",
    chartTitle: "Portfolio over investment rounds",
    chartCaption:
      "The business outcomes are random, but stronger fundamentals keep tilting the odds. Faith-heavy investors keep calling weak evidence good enough.",
    stochasticNote:
      "A hype stock can soar for a while. The issue is not whether buzz can ever pay. It is whether the investor is repeatedly sizing positions beyond what the evidence supports.",
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
    maxTries: 12,
    lead:
      "Each try introduces either a local prospect or a remote romantic story. Character and verification are the real support. Spark, flattery, fantasy, and fate-talk are the pull that faith can mistake for support.",
    supportRule:
      "Support lives in character, consistency, and verification. The grounded person does not hand over trust merely because the feelings are intense.",
    faithShift:
      "Faith makes chemistry feel like knowledge. It lowers the threshold for commitment and can make a remote story feel trustworthy before the person has earned that trust.",
    resource:
      "Trust-and-time capital. This line tracks the life energy spent on people who either deserved or did not deserve deep commitment.",
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
    maxTries: 12,
    lead:
      "Each try introduces a religious pull: a church, revival, testimony, prophecy stream, or inherited tradition. Evidence and emotional-social pull do not move together. Faith lets the second one impersonate the first.",
    supportRule:
      "Support lives in actual evidence for the claim. Community warmth, fear, meaning, inheritance, and urgency can feel powerful, but they are not the same thing as support."
    ,
    faithShift:
      "Faith lowers the commitment threshold. It turns a thinly supported claim into something worthy of obedience, donations, identity, and life direction.",
    resource:
      "Life-budget capital. This tracks time, energy, money, autonomy, and identity pressure rather than cash alone.",
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
  tryStatus: document.querySelector("#tryStatus"),
  tryHint: document.querySelector("#tryHint"),
  eventLabel: document.querySelector("#eventLabel"),
  eventRollup: document.querySelector("#eventRollup"),
  eventTitle: document.querySelector("#eventTitle"),
  eventSummary: document.querySelector("#eventSummary"),
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
      elements.copyStatus.textContent = "Summary copied.";
    } catch (error) {
      elements.summaryOutput.focus();
      elements.summaryOutput.select();
      elements.copyStatus.textContent = "Summary selected. Copy manually if needed.";
    }

    window.setTimeout(() => {
      elements.copyStatus.textContent = "";
    }, 1800);
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
  elements.chartTitle.textContent = scenario.chartTitle;
  elements.chartCaption.textContent = scenario.chartCaption;
  elements.stochasticNote.textContent = scenario.stochasticNote;
  elements.tryStatus.textContent = `${tryCount} ${pluralize(tryCount, "try", "tries")} logged`;
  elements.tryHint.textContent =
    tryCount >= scenario.maxTries
      ? `This field has reached its ${scenario.maxTries}-try limit. Press Try again to reset it.`
      : `Each click adds one more random ${scenario.tryLabel}.`;

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
  const lines = [
    "Belief Overreach Audit",
    "",
    `Field: ${scenario.name}`,
    `Tries logged: ${scenarioState.tries.length} of ${scenario.maxTries}`,
    `Support rule: ${scenario.supportRule}`,
    `Faith shift: ${scenario.faithShift}`,
    `Resource at stake: ${scenario.resource}`,
    ""
  ];

  agents.forEach((agent) => {
    lines.push(
      `${agent.name} (${agent.faithLabel}): ${formatScenarioValue(scenario, getCurrentValue(scenarioState, agent.id))}`
    );
  });

  lines.push("");

  if (lastEvent) {
    lines.push(`Latest try: ${lastEvent.title}`);
    lines.push(`Latest rollup: ${lastEvent.rollup}`);
    lines.push(`Latest summary: ${lastEvent.summary}`);
    lines.push("");
  }

  lines.push(
    `Leader: ${standings[0].agent.name}`,
    `Laggard: ${standings[standings.length - 1].agent.name}`,
    `Current spread: ${formatScenarioValue(scenario, standings[0].value - standings[standings.length - 1].value, true)}`,
    "",
    `Reading: ${buildLessonClosing(scenario, lastEvent)}`
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

function createGamblingEvent(scenarioState) {
  const index = scenarioState.tries.length + 1;
  const openingTotal = drawCasinoOpeningTotal();
  const nextCard = drawCasinoCard();
  const mood = casinoMoodDeck[randomInt(0, casinoMoodDeck.length - 1)];
  const luckPull = randomInt(45, 95);
  const after = {};
  const delta = {};
  const actions = {};

  agents.forEach((agent) => {
    const previous = getCurrentValue(scenarioState, agent.id);
    const stake = getCasinoStake(previous);
    const played = playCasinoHand(agent, openingTotal, nextCard, luckPull);
    const won = stake > 0 && played.total >= CASINO_SAFE_MIN && played.total <= CASINO_BUST_LIMIT;
    const change = stake > 0 ? Math.round((won ? (stake * CASINO_WIN_PROFIT) / 100 : -stake) * 100) / 100 : 0;
    let text;

    if (!played.hit) {
      text =
        openingTotal >= CASINO_SAFE_MIN
          ? `${agent.shortName} banked ${openingTotal} because it was already a paying hand. ${describeCasinoOutcome(played, won)}`
          : `${agent.shortName} froze on ${openingTotal} instead of taking the necessary draw. ${describeCasinoOutcome(played, won)}`
    } else if (played.riskyHit) {
      text = `${agent.shortName} already had ${openingTotal}, which was enough to collect the modest payout. But a ${luckPull}/100 ${mood.statLabel.toLowerCase()} made one more card feel worth it. ${describeCasinoOutcome(played, won)}`
    } else {
      text = `${agent.shortName} had only ${openingTotal}, so taking one card was the only route to a paying hand. ${describeCasinoOutcome(played, won)}`
    }

    delta[agent.id] = change;
    after[agent.id] = clampNumber(previous + change, 0, Infinity, previous + change);
    actions[agent.id] = { tag: getCasinoActionTag(played), text, delta: change };
  });

  return {
    index,
    rollup: `Opening total ${openingTotal}. ${mood.rollup}`,
    title: `Casino night ${index}: opening total ${openingTotal}.`,
    summary:
      openingTotal >= CASINO_SAFE_MIN
        ? `The opening total was already in the paying zone. ${mood.summary} This round mainly tested who could leave a winning hand alone.`
        : `The opening total started below the paying zone, so one draw was necessary. ${mood.summary} The real question was who would keep treating luck as guidance once the hand became strong enough.`,
    stats: [
      { label: "Opening total", value: `${openingTotal}` },
      { label: "House rule", value: `Ante $100. Hold on ${CASINO_SAFE_MIN} to 21 for +$${CASINO_WIN_PROFIT}; one extra card can still bust.` },
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
  const pGain = clampNumber(0.18 + fundamentals * 0.006, 0.18, 0.78, 0.45);
  const returnRate = Math.random() < pGain
    ? randomRange(0.05, 0.16 + fundamentals / 420)
    : -randomRange(0.05, 0.12 + (100 - fundamentals) / 220);
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
      const stakeFraction = 0.12 + agent.bias * 0.18;
      const stake = previous * stakeFraction;
      const reserveYield = (previous - stake) * 0.0025;
      change = stake * returnRate + reserveYield;
      tag = returnRate >= 0 ? "Bought well" : "Bought weakly";
      text =
        returnRate >= 0
          ? `${agent.shortName} bought ${formatPercent(stakeFraction * 100)} of the bankroll because the story cleared ${formatNumber(decisionScore)}. This round it paid ${formatPercent(returnRate * 100)}.`
          : `${agent.shortName} bought ${formatPercent(stakeFraction * 100)} of the bankroll because the story cleared ${formatNumber(decisionScore)}. This round it lost ${formatPercent(Math.abs(returnRate) * 100)}.`;
    } else {
      change = previous * 0.0025;
      tag = "Passed";
      text = `${agent.shortName} stayed in cash because the business case did not clear the threshold. The reserve still picked up a tiny yield.`;
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
        text = `${agent.shortName} committed because the story cleared ${formatNumber(decisionScore)}. This time the relationship held up and paid back some of that trust.`;
      } else {
        const catfishPenalty = remote ? 36 + (100 - verification) * 0.42 + (forcedCatfishCommit ? 18 : 0) : 0;
        change = -(30 + (100 - character) * 0.66 + spark * 0.18 + commitmentCost + catfishPenalty);
        tag = forcedCatfishCommit ? "Catfished" : remote ? "Remote collapse" : "Bad commitment";
        text = forcedCatfishCommit
          ? `${agent.shortName} started a remote relationship without vetting the person well enough, treated chemistry as trust, and got catfished when the story had to meet reality.`
          : remote
            ? `${agent.shortName} committed hard to a remote story before it had been properly verified, and the relationship collapsed under scrutiny.`
            : `${agent.shortName} committed before the person's character had earned that level of trust, and the relationship turned costly.`;
      }
    } else {
      change = remote ? 12 : character < 55 ? 8 : 4;
      tag = forceCatfish && remote ? "Vetted first" : "Held back";
      text = forceCatfish && remote
        ? `${agent.shortName} refused to let a remote spark count as knowledge and waited for real verification before making the relationship costly.`
        : `${agent.shortName} kept trust in reserve and waited for better verification before turning spark into a major commitment.`;
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
        text = `${agent.shortName} committed because the claim felt weighty enough. This time some of that commitment returned a modest payoff, but only after a real cost.`;
      } else {
        change = -(12 + (100 - evidence) * 0.34 + demand * 0.35 + agent.bias * 18);
        tag = "Overcommitted";
        text = `${agent.shortName} spent time, money, and obedience on a thinly supported religious pull. The claim did not cash out enough to justify what was surrendered.`;
      }
    } else {
      change = 10 + evidence * 0.06;
      tag = "Waited";
      text = `${agent.shortName} kept life capital in reserve and waited for stronger evidence before handing over allegiance.`;
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

function shouldTakeCasinoCard(agent, total, luckPull) {
  if (total < CASINO_SAFE_MIN) {
    return true;
  }

  switch (agent.id) {
    case "ada":
      return false;
    case "milo":
      return total === 18 && luckPull >= 82;
    case "willa":
      return (total === 18 && luckPull >= 65) || (total === 19 && luckPull >= 88);
    case "zeke":
      return (
        (total === 18 && luckPull >= 50) ||
        (total === 19 && luckPull >= 68) ||
        (total === 20 && luckPull >= 85)
      );
    default:
      return false;
  }
}

function playCasinoHand(agent, openingTotal, nextCard, luckPull) {
  const hit = shouldTakeCasinoCard(agent, openingTotal, luckPull);
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

function describeCasinoOutcome(played, won) {
  if (played.busted) {
    return `The extra card was ${played.nextCard}, which pushed the total to ${played.total} and burned the ante.`;
  }

  if (won) {
    return played.hit
      ? `The extra card was ${played.nextCard}, which moved the total to ${played.total} and collected the payout.`
      : `Standing kept the total at ${played.total}, which collected the payout.`;
  }

  return played.hit
    ? `The extra card was ${played.nextCard}, but the total only reached ${played.total}, so the ante was lost anyway.`
    : `Standing left the total at ${played.total}, which stayed below the paying line and lost the ante.`;
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
