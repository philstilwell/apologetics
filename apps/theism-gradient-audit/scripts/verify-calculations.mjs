import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  aggregateGradientPosition,
  averageSubstantiationGap,
  categories,
  categorySupportAverages,
  claimWeight,
  clampScore,
  dependencyTension,
  effectiveSupportScore,
  evidentiallyWeightedTheismIndex,
  substantiationGap
} from "../src/scoring.js";

const claims = JSON.parse(await readFile(new URL("../public/claims.json", import.meta.url), "utf8"));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));

function close(actual, expected, epsilon = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} was not within ${epsilon} of ${expected}`);
}

function profileFromCategoryScores(confidence, personalSubstantiation) {
  const responses = {};
  for (const claim of claims) {
    const index = claim.gradientPosition - 1;
    responses[claim.id] = {
      confidence: confidence[index],
      personalSubstantiation: personalSubstantiation[index],
      note: ""
    };
  }
  return { userId: "test", responses };
}

function profileFromResponses(entries) {
  return {
    userId: "test",
    responses: Object.fromEntries(
      Object.entries(entries).map(([id, response]) => [id, { note: "", ...response }])
    )
  };
}

const categoryCounts = new Map(categories.map((category) => [category, 0]));
for (const claim of claims) {
  assert.ok(claimById.has(claim.id), `missing own id ${claim.id}`);
  assert.ok(categories.includes(claim.category), `unexpected category for ${claim.id}`);
  assert.equal(claim.gradientPosition, categories.indexOf(claim.category) + 1, `${claim.id} category/position mismatch`);
  categoryCounts.set(claim.category, categoryCounts.get(claim.category) + 1);

  for (const dependencyId of claim.dependencyIds) {
    const dependency = claimById.get(dependencyId);
    assert.ok(dependency, `${claim.id} references missing dependency ${dependencyId}`);
    assert.ok(dependency.gradientPosition <= claim.gradientPosition, `${claim.id} depends on later claim ${dependencyId}`);
  }
}

assert.equal(claims.length, 50, "claim bank should contain 50 claims");
for (const category of categories) {
  assert.equal(categoryCounts.get(category), 10, `${category} should contain 10 claims`);
}

close(clampScore(-10), 0);
close(clampScore(120), 100);
close(claimWeight(100, 25), 0.5);
close(effectiveSupportScore(100, 25), 50);
close(substantiationGap(90, 40), 50);
close(substantiationGap(40, 90), 0);

const emptyProfile = { userId: "test", responses: {} };
assert.equal(aggregateGradientPosition(claims, emptyProfile), null);
assert.equal(evidentiallyWeightedTheismIndex(claims, emptyProfile), null);

const fullSupport = profileFromCategoryScores([100, 100, 100, 100, 100], [100, 100, 100, 100, 100]);
close(aggregateGradientPosition(claims, fullSupport), 5);
close(evidentiallyWeightedTheismIndex(claims, fullSupport), 100);
close(averageSubstantiationGap(claims, fullSupport), 0);
assert.deepEqual(
  categorySupportAverages(claims, fullSupport).map((item) => Math.round(item.effectiveSupport)),
  [100, 100, 100, 100, 100]
);

const minimalOnly = profileFromCategoryScores([100, 0, 0, 0, 0], [100, 0, 0, 0, 0]);
close(aggregateGradientPosition(claims, minimalOnly), 1);
close(evidentiallyWeightedTheismIndex(claims, minimalOnly), 0);

const halfRightward = profileFromCategoryScores([0, 50, 50, 50, 50], [0, 50, 50, 50, 50]);
close(aggregateGradientPosition(claims, halfRightward), 3);
close(evidentiallyWeightedTheismIndex(claims, halfRightward), 50);

const skepticalNaturalist = profileFromCategoryScores([35, 28, 22, 12, 8], [30, 24, 18, 10, 6]);
const minimalDeist = profileFromCategoryScores([78, 55, 28, 12, 8], [66, 42, 20, 8, 5]);
assert.ok(
  aggregateGradientPosition(claims, minimalDeist) > aggregateGradientPosition(claims, skepticalNaturalist),
  "minimal deist preset should land farther right than skeptical naturalist"
);

const [firstClaim, secondClaim] = claims;
const mixedGap = profileFromResponses({
  [firstClaim.id]: { confidence: 90, personalSubstantiation: 40 },
  [secondClaim.id]: { confidence: 40, personalSubstantiation: 90 }
});
close(averageSubstantiationGap(claims, mixedGap), 25);

const singleDependencyClaim = claims.find((claim) => claim.dependencyIds.length === 1);
assert.ok(singleDependencyClaim, "expected at least one single-dependency claim");
const [singleDependencyId] = singleDependencyClaim.dependencyIds;

const childOnly = profileFromResponses({
  [singleDependencyClaim.id]: { confidence: 90, personalSubstantiation: 90 }
});
close(dependencyTension(singleDependencyClaim, childOnly), 90);

const supportedDependency = profileFromResponses({
  [singleDependencyId]: { confidence: 90, personalSubstantiation: 90 },
  [singleDependencyClaim.id]: { confidence: 90, personalSubstantiation: 90 }
});
close(dependencyTension(singleDependencyClaim, supportedDependency), 0);

const weaklySubstantiatedDependency = profileFromResponses({
  [singleDependencyId]: { confidence: 90, personalSubstantiation: 10 },
  [singleDependencyClaim.id]: { confidence: 90, personalSubstantiation: 90 }
});
close(dependencyTension(singleDependencyClaim, weaklySubstantiatedDependency), 60);

console.log("Theism Gradient calculation checks passed.");
