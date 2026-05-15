const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const APP_PATH = `${__dirname}/app.js`;
const APP_CODE =
  fs.readFileSync(APP_PATH, "utf8") +
  `\n;globalThis.__beliefAudit = {
    agents,
    scenarios,
    createScenarioState,
    createScenarioEvent,
    computeInvestmentExpectedReturnRate,
    computeInvestmentPerceivedExpectedReturnRate,
    computeRomanceSuccessProbability,
    computeReligionGroundedProbability,
    buildYAxisScale
  };`;

function makeElement() {
  return {
    hidden: false,
    open: false,
    textContent: "",
    innerHTML: "",
    value: "",
    dataset: {},
    style: { setProperty() {} },
    className: "",
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    setAttribute() {},
    querySelector() { return makeElement(); },
    querySelectorAll() { return []; },
    closest() { return null; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 0, height: 0 }; },
    focus() {},
    select() {}
  };
}

function makeSandbox() {
  const elements = new Map();
  const getElement = (selector) => {
    if (!elements.has(selector)) {
      elements.set(selector, makeElement());
    }
    return elements.get(selector);
  };
  const localStorageStore = new Map();
  const mathObject = Object.create(Math);
  const sandbox = {
    console,
    Math: mathObject,
    Intl,
    JSON,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Date,
    parseInt,
    parseFloat,
    isNaN,
    setTimeout,
    clearTimeout,
    navigator: { clipboard: { writeText: async () => {} } },
    location: { href: "file:///belief-overreach-audit/index.html", hash: "" },
    history: { replaceState() {} },
    document: {
      body: { classList: { add() {}, remove() {}, toggle() {} } },
      querySelector(selector) { return getElement(selector); },
      querySelectorAll() { return []; },
      createElement() { return makeElement(); },
      addEventListener() {}
    },
    window: {
      addEventListener() {},
      removeEventListener() {},
      localStorage: {
        getItem(key) { return localStorageStore.has(key) ? localStorageStore.get(key) : null; },
        setItem(key, value) { localStorageStore.set(key, String(value)); },
        removeItem(key) { localStorageStore.delete(key); }
      },
      location: { href: "file:///belief-overreach-audit/index.html", hash: "" },
      history: { replaceState() {} }
    }
  };

  sandbox.window.document = sandbox.document;
  sandbox.global = sandbox;
  sandbox.globalThis = sandbox;
  return sandbox;
}

function mulberry32(seed) {
  return function nextRandom() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function loadAudit(seed = 1) {
  const sandbox = makeSandbox();
  vm.createContext(sandbox);
  vm.runInContext(APP_CODE, sandbox, { filename: APP_PATH });
  sandbox.Math.random = mulberry32(seed);
  sandbox.window.Math = sandbox.Math;
  return sandbox.__beliefAudit;
}

function simulateScenario(audit, scenarioId) {
  const scenario = audit.scenarios[scenarioId];
  const state = audit.createScenarioState(scenarioId);

  while (state.tries.length < scenario.maxTries) {
    const event = audit.createScenarioEvent(scenario, state);
    state.tries.push(event);
    audit.agents.forEach((agent) => {
      state.series[agent.id].push(event.after[agent.id]);
    });
  }

  return Object.fromEntries(
    audit.agents.map((agent) => [agent.id, state.series[agent.id][state.series[agent.id].length - 1]])
  );
}

function averageScenarioResults(scenarioId, runs) {
  const totals = { ada: 0, milo: 0, willa: 0, zeke: 0 };

  for (let seed = 1; seed <= runs; seed += 1) {
    const audit = loadAudit(seed);
    const result = simulateScenario(audit, scenarioId);
    Object.keys(totals).forEach((agentId) => {
      totals[agentId] += result[agentId];
    });
  }

  return Object.fromEntries(
    Object.entries(totals).map(([agentId, total]) => [agentId, total / runs])
  );
}

const audit = loadAudit(7);

assert(
  audit.computeInvestmentExpectedReturnRate(78, 32) >
    audit.computeInvestmentExpectedReturnRate(42, 32),
  "investment expected return should rise when fundamentals improve at the same hype level"
);

assert(
  audit.computeInvestmentExpectedReturnRate(58, 84) <
    audit.computeInvestmentExpectedReturnRate(58, 28),
  "investment expected return should fall when hype outruns the same fundamentals"
);

assert(
  audit.computeInvestmentPerceivedExpectedReturnRate({ bias: 0.6 }, 42, 90) >
    audit.computeInvestmentExpectedReturnRate(42, 90),
  "faith-heavy investors should perceive a better edge than the underlying expected return warrants"
);

assert(
  audit.computeRomanceSuccessProbability(true, 60) <
    audit.computeRomanceSuccessProbability(false, 60),
  "remote romance should remain less reliable than local romance at the same support score"
);

assert(
  audit.computeReligionGroundedProbability(52) >
    audit.computeReligionGroundedProbability(18),
  "religion grounded probability should increase with evidence"
);

const currencyScale = audit.buildYAxisScale(812, 1264, "currency");
assert(
  currencyScale.min <= 812 &&
    currencyScale.max >= 1264 &&
    currencyScale.ticks.length >= 4 &&
    currencyScale.ticks[1] - currencyScale.ticks[0] === 200,
  "currency chart scaling should use clean 200-unit steps that cover the displayed values"
);

const pointScale = audit.buildYAxisScale(98, 244, "points");
assert(
  pointScale.min === 0 &&
    pointScale.max >= 244 &&
    pointScale.ticks.length >= 4 &&
    pointScale.ticks[1] - pointScale.ticks[0] === 100,
  "point chart scaling should stay readable, start from zero, and use 100-point steps"
);

const runCount = 1500;
const scenarioIds = ["gambling", "investment", "romance", "religion"];
const averagesByScenario = Object.fromEntries(
  scenarioIds.map((scenarioId) => [scenarioId, averageScenarioResults(scenarioId, runCount)])
);

scenarioIds.forEach((scenarioId) => {
  const averages = averagesByScenario[scenarioId];
  assert(
    averages.ada > averages.milo &&
      averages.milo > averages.willa &&
      averages.willa > averages.zeke,
    `${scenarioId} should preserve the long-run ordering ada > milo > willa > zeke`
  );
});

assert(
  averagesByScenario.gambling.ada - averagesByScenario.gambling.zeke > 800,
  "gambling should heavily punish the most faith-driven strategy over 30 nights"
);

assert(
  averagesByScenario.investment.zeke < 1000,
  "investment should leave the most hype-driven investor below the starting bankroll on average"
);

assert(
  averagesByScenario.religion.ada - averagesByScenario.religion.zeke > 150,
  "religion should show a sizable life-budget gap between zero-faith and highest-faith strategies"
);

console.log("belief overreach calculations ok");
