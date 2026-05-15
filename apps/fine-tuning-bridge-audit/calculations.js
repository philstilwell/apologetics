(function attachFineTuningCalculations(globalObject, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalObject.FineTuningCalculations = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function buildFineTuningCalculations() {
  const ROUTE_RANK = {
    "below-design": 0,
    "design-only": 1,
    "life-purpose": 2,
    "human-purpose": 3,
    "christian-purpose": 4
  };

  const SCENARIO_FEATURES = {
    A: { searchSpace: "massive", abundance: "rare" },
    B: { searchSpace: "tiny", abundance: "rare" },
    C: { searchSpace: "massive", abundance: "abundant" }
  };

  const HUMAN_ALTERNATIVE_GOALS = [
    "orderElegance",
    "blackHolesStars",
    "sparseLife",
    "abundantLife",
    "unknownEnds"
  ];

  function clampPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(100, Math.round(number)));
  }

  function routeRank(routeId) {
    return ROUTE_RANK[routeId] ?? ROUTE_RANK["below-design"];
  }

  function describePriorPressure(commitments = {}) {
    const components = {
      identityPull: clampPercent(commitments.identityPull),
      delegatedTrust: clampPercent(commitments.delegatedTrust),
      symmetryResistance: 100 - clampPercent(commitments.symmetryWillingness),
      mindChangeResistance: 100 - clampPercent(commitments.mindChangeReadiness)
    };

    const values = Object.values(components);
    const score = Math.round(values.reduce((sum, current) => sum + current, 0) / values.length);

    return { score, components };
  }

  function calculatePriorPressure(commitments = {}) {
    return describePriorPressure(commitments).score;
  }

  function describeWorldMismatch(actualScenario, expectedScenario) {
    const actual = SCENARIO_FEATURES[actualScenario];
    const expected = SCENARIO_FEATURES[expectedScenario];
    if (!actual || !expected) {
      return {
        score: null,
        differingDimensions: []
      };
    }

    const differingDimensions = [];
    if (actual.searchSpace !== expected.searchSpace) differingDimensions.push("searchSpace");
    if (actual.abundance !== expected.abundance) differingDimensions.push("abundance");

    return {
      score: differingDimensions.length * 50,
      differingDimensions
    };
  }

  function calculateWorldMismatch(actualScenario, expectedScenario) {
    return describeWorldMismatch(actualScenario, expectedScenario).score;
  }

  function worldMismatchLabel(score) {
    if (score === null) return "Not set";
    if (score >= 100) return "High";
    if (score >= 50) return "Moderate";
    return "Low";
  }

  function bridgeWeaknessPoints(humanBridge = {}) {
    const status = humanBridge.status || "missing";
    const notePresent = Boolean(humanBridge.notePresent);

    if (status === "substantiated" && notePresent) return 0;
    if (status === "substantiated") return 8;
    if (status === "asserted") return 18;
    return 30;
  }

  function describeHumanTargetPressure({
    routeId = "design-only",
    strictCeilingId = "below-design",
    goals = {},
    humanBridge = {}
  } = {}) {
    const humanGoal = clampPercent(goals.humansPersons);
    const strongestAlternative = Math.max(
      ...HUMAN_ALTERNATIVE_GOALS.map((goalId) => clampPercent(goals[goalId]))
    );
    const humanLead = Math.max(0, humanGoal - strongestAlternative);
    const humanGoalPull = Math.round(humanLead * 0.5);

    const selectedHumanRoute = routeRank(routeId) >= routeRank("human-purpose");
    const strictBelowHuman = routeRank(strictCeilingId) < routeRank("human-purpose");
    const humanLeanActive = selectedHumanRoute || humanLead > 0;

    const routeOverreachPull = selectedHumanRoute && strictBelowHuman ? 10 : 0;
    const ceilingGapPull = selectedHumanRoute && strictBelowHuman
      ? (routeRank("human-purpose") - routeRank(strictCeilingId)) * 6
      : 0;
    const bridgeWeaknessPull = humanLeanActive ? bridgeWeaknessPoints(humanBridge) : 0;

    const score = clampPercent(
      humanGoalPull + routeOverreachPull + ceilingGapPull + bridgeWeaknessPull
    );

    return {
      score,
      humanLeanActive,
      components: {
        humanLead,
        humanGoalPull,
        routeOverreachPull,
        ceilingGapPull,
        bridgeWeaknessPull
      }
    };
  }

  function calculateHumanTargetPressure(input = {}) {
    return describeHumanTargetPressure(input).score;
  }

  return {
    routeRank,
    clampPercent,
    describePriorPressure,
    calculatePriorPressure,
    describeWorldMismatch,
    calculateWorldMismatch,
    worldMismatchLabel,
    describeHumanTargetPressure,
    calculateHumanTargetPressure
  };
});
