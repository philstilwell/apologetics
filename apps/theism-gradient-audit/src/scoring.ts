export type ClaimCategory =
  | 'Minimal Deism'
  | 'Design Deism'
  | 'Personal Theism'
  | 'Interventionist Theism'
  | 'Specific Christian Theism';

export interface Claim {
  id: string;
  text: string;
  category: ClaimCategory;
  gradientPosition: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  dependencyIds: string[];
}

export interface UserClaimResponse {
  confidence: number;
  personalSubstantiation: number;
  note?: string;
}

export interface UserProfile {
  userId: string;
  responses: Record<string, UserClaimResponse>;
}

export interface DiagnosticAlert {
  type: 'gap' | 'dependency';
  severity: 'medium' | 'high';
  claim: Claim;
  value: number;
  message: string;
}

export const categories: ClaimCategory[] = [
  'Minimal Deism',
  'Design Deism',
  'Personal Theism',
  'Interventionist Theism',
  'Specific Christian Theism',
];

export function clampScore(value: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, numeric));
}

export function claimWeight(confidence: number, personalSubstantiation: number): number {
  const c = clampScore(confidence) / 100;
  const p = clampScore(personalSubstantiation) / 100;
  return Math.sqrt(c * p);
}

export function effectiveSupportScore(confidence: number, personalSubstantiation: number): number {
  return 100 * claimWeight(confidence, personalSubstantiation);
}

export function substantiationGap(confidence: number, personalSubstantiation: number): number {
  return Math.max(0, clampScore(confidence) - clampScore(personalSubstantiation));
}

export function categorySupportAverages(claims: Claim[], profile: UserProfile) {
  const buckets = new Map<ClaimCategory, { category: ClaimCategory; effectiveSupport: number; count: number }>(
    categories.map(category => [category, { category, effectiveSupport: 0, count: 0 }])
  );

  for (const claim of claims) {
    const response = profile.responses[claim.id];
    if (!response) continue;

    const current = buckets.get(claim.category) ?? { category: claim.category, effectiveSupport: 0, count: 0 };
    current.effectiveSupport += effectiveSupportScore(response.confidence, response.personalSubstantiation);
    current.count += 1;
    buckets.set(claim.category, current);
  }

  return Array.from(buckets.values()).map(values => ({
    ...values,
    effectiveSupport: values.count ? values.effectiveSupport / values.count : 0,
  }));
}

export function aggregateGradientPosition(claims: Claim[], profile: UserProfile): number | null {
  const ratedClaims = claims.filter(claim => profile.responses[claim.id]);
  if (!ratedClaims.length) return null;

  const supportByCategory = new Map<ClaimCategory, number>(
    categorySupportAverages(claims, profile).map(item => [item.category, item.effectiveSupport / 100])
  );
  const rightwardProgress = categories
    .slice(1)
    .reduce((sum, category) => sum + (supportByCategory.get(category) ?? 0), 0);

  return 1 + rightwardProgress;
}

export function evidentiallyWeightedTheismIndex(claims: Claim[], profile: UserProfile): number | null {
  const aggregate = aggregateGradientPosition(claims, profile);
  return aggregate === null ? null : ((aggregate - 1) / 4) * 100;
}

export function dependencyTension(claim: Claim, profile: UserProfile): number | null {
  const response = profile.responses[claim.id];
  if (!response || claim.dependencyIds.length === 0) return null;

  const prerequisiteScores = claim.dependencyIds.map(id => {
    const prerequisite = profile.responses[id];
    return prerequisite
      ? effectiveSupportScore(prerequisite.confidence, prerequisite.personalSubstantiation)
      : 0;
  });

  const claimSupport = effectiveSupportScore(response.confidence, response.personalSubstantiation);
  const prereqAvg = prerequisiteScores.reduce((sum, score) => sum + score, 0) / prerequisiteScores.length;
  return Math.max(0, claimSupport - prereqAvg);
}

export function averageSubstantiationGap(claims: Claim[], profile: UserProfile): number | null {
  const gaps: number[] = [];

  for (const claim of claims) {
    const response = profile.responses[claim.id];
    if (!response) continue;
    gaps.push(substantiationGap(response.confidence, response.personalSubstantiation));
  }

  return gaps.length === 0 ? null : gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
}

export function categoryAverages(claims: Claim[], profile: UserProfile) {
  const buckets = new Map<ClaimCategory, { confidence: number; personalSubstantiation: number; count: number }>(
    categories.map(category => [category, { confidence: 0, personalSubstantiation: 0, count: 0 }])
  );

  for (const claim of claims) {
    const response = profile.responses[claim.id];
    if (!response) continue;

    const current = buckets.get(claim.category) ?? { confidence: 0, personalSubstantiation: 0, count: 0 };
    current.confidence += clampScore(response.confidence);
    current.personalSubstantiation += clampScore(response.personalSubstantiation);
    current.count += 1;
    buckets.set(claim.category, current);
  }

  return Array.from(buckets.entries()).map(([category, values]) => ({
    category,
    confidence: values.count ? values.confidence / values.count : 0,
    personalSubstantiation: values.count ? values.personalSubstantiation / values.count : 0,
    count: values.count,
  }));
}

export function buildDiagnostics(claims: Claim[], profile: UserProfile): DiagnosticAlert[] {
  const alerts: DiagnosticAlert[] = [];

  for (const claim of claims) {
    const response = profile.responses[claim.id];
    if (!response) continue;

    const gap = substantiationGap(response.confidence, response.personalSubstantiation);
    if (gap >= 35 && response.confidence >= 55) {
      alerts.push({
        type: 'gap',
        severity: gap >= 55 ? 'high' : 'medium',
        claim,
        value: gap,
        message: `${claim.id} has ${Math.round(gap)} points more confidence than personal substantiation.`,
      });
    }

    const tension = dependencyTension(claim, profile);
    if (tension !== null && tension >= 25 && response.confidence >= 55) {
      alerts.push({
        type: 'dependency',
        severity: tension >= 45 ? 'high' : 'medium',
        claim,
        value: tension,
        message: `${claim.id} is ${Math.round(tension)} effective-support points above its prerequisite bridge claims.`,
      });
    }
  }

  return alerts.sort((a, b) => b.value - a.value).slice(0, 8);
}

export function profileSummary(claims: Claim[], profile: UserProfile): string {
  const aggregate = aggregateGradientPosition(claims, profile);
  const ewti = evidentiallyWeightedTheismIndex(claims, profile);
  const gap = averageSubstantiationGap(claims, profile);
  const rated = Object.values(profile.responses)
    .filter(response => response.confidence > 0 || response.personalSubstantiation > 0 || response.note)
    .length;

  if (!rated || aggregate === null) {
    return 'No claims have been rated yet. Start with the claims that feel most central, then use the diagnostics to find unsupported leaps.';
  }

  const positionText = aggregate < 1.8
    ? 'primarily minimal-deistic'
    : aggregate < 2.6
      ? 'deistic with design-oriented leanings'
      : aggregate < 3.4
        ? 'personal-theistic leaning'
        : aggregate < 4.3
          ? 'interventionist or revelatory'
          : 'strongly Christian-theistic';

  const gapText = (gap ?? 0) >= 30
    ? 'with a noticeable gap between confidence and personal substantiation'
    : (gap ?? 0) >= 15
      ? 'with some substantiation pressure points'
      : 'with confidence and personal substantiation fairly aligned';

  return `Your current profile is ${positionText}, ${gapText}. The evidentially weighted theism index is ${Math.round(ewti ?? 0)} across ${rated} rated claims.`;
}
