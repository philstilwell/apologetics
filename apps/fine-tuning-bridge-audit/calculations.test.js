const assert = require("node:assert/strict");
const calculations = require("./calculations.js");

assert.equal(
  calculations.calculatePriorPressure({
    identityPull: 0,
    delegatedTrust: 0,
    symmetryWillingness: 100,
    mindChangeReadiness: 100
  }),
  0,
  "prior pressure should bottom out when every resistance factor is minimal"
);

assert.equal(
  calculations.calculatePriorPressure({
    identityPull: 100,
    delegatedTrust: 100,
    symmetryWillingness: 0,
    mindChangeReadiness: 0
  }),
  100,
  "prior pressure should max out when every resistance factor is maximal"
);

assert.deepEqual(
  calculations.describeWorldMismatch("A", "C"),
  { score: 50, differingDimensions: ["abundance"] },
  "A and C should differ only on abundance"
);

assert.deepEqual(
  calculations.describeWorldMismatch("B", "C"),
  { score: 100, differingDimensions: ["searchSpace", "abundance"] },
  "B and C should differ on both search-space size and abundance"
);

assert.equal(
  calculations.calculateHumanTargetPressure({
    routeId: "life-purpose",
    strictCeilingId: "life-purpose",
    goals: {
      humansPersons: 20,
      orderElegance: 40,
      blackHolesStars: 35,
      sparseLife: 55,
      abundantLife: 60,
      unknownEnds: 50
    },
    humanBridge: { status: "missing", notePresent: false }
  }),
  0,
  "human-target pressure should stay at zero when there is no active human lean"
);

assert.equal(
  calculations.calculateHumanTargetPressure({
    routeId: "human-purpose",
    strictCeilingId: "below-design",
    goals: {
      humansPersons: 36,
      orderElegance: 44,
      blackHolesStars: 22,
      sparseLife: 58,
      abundantLife: 40,
      unknownEnds: 58
    },
    humanBridge: { status: "missing", notePresent: false }
  }),
  58,
  "the current human-purpose preset should show moderate human-target pressure"
);

assert.equal(
  calculations.calculateHumanTargetPressure({
    routeId: "human-purpose",
    strictCeilingId: "human-purpose",
    goals: {
      humansPersons: 36,
      orderElegance: 44,
      blackHolesStars: 22,
      sparseLife: 58,
      abundantLife: 40,
      unknownEnds: 58
    },
    humanBridge: { status: "substantiated", notePresent: true }
  }),
  0,
  "human-target pressure should drop away when the route is already earned and humans are not leading the targets"
);

console.log("fine-tuning calculations ok");
