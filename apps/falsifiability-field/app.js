const icons = {
  prayer: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 11v9"></path>
      <path d="M16 11v9"></path>
      <path d="M8 13c-2-2-2.5-5-.5-7 2.5 1 3.5 3.5 3 6"></path>
      <path d="M16 13c2-2 2.5-5 .5-7-2.5 1-3.5 3.5-3 6"></path>
      <path d="M11 20h2"></path>
    </svg>
  `,
  healing: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16"></path>
      <path d="M4 12h16"></path>
      <path d="M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>
    </svg>
  `,
  future: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"></path>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M17 5l2-2"></path>
      <path d="M19 3v4h-4"></path>
    </svg>
  `,
  wisdom: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
      <path d="M8 14c-1.7-1.3-2.5-3-2.5-5a6.5 6.5 0 0 1 13 0c0 2-.8 3.7-2.5 5-.8.6-1 1.4-1 2H9c0-.6-.2-1.4-1-2z"></path>
    </svg>
  `,
  prosocial: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z"></path>
      <path d="M4 20h16"></path>
    </svg>
  `,
  protection: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z"></path>
      <path d="M9 12l2 2 4-5"></path>
    </svg>
  `,
  morbidity: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 12h-3l-2 6-4-12-2 6H4"></path>
      <path d="M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>
      <path d="M9 9h.01"></path>
      <path d="M15 9h.01"></path>
    </svg>
  `,
  longevity: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h10"></path>
      <path d="M7 21h10"></path>
      <path d="M8 3c0 5 8 5 8 9s-8 4-8 9"></path>
      <path d="M16 3c0 5-8 5-8 9s8 4 8 9"></path>
    </svg>
  `,
  provision: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21V9"></path>
      <path d="M12 9c-4 0-7 2.5-8 6 4 .2 7-1.2 8-6z"></path>
      <path d="M12 9c4 0 7 2.5 8 6-4 .2-7-1.2-8-6z"></path>
      <circle cx="12" cy="5" r="2"></circle>
    </svg>
  `,
};

const claims = [
  {
    id: "answered-prayer",
    title: "Answered prayer",
    short: "Prayer changes outcomes beyond ordinary timing, recovery, or coincidence.",
    promise: "God answers prayer in ways that produce better real-world outcomes than comparable non-prayer cases.",
    icon: "prayer",
    color: "#22577a",
    studies: [
      {
        id: "prayer-story",
        title: "A recovery story after prayer",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 8,
        detail: "One person gets better after people prayed.",
        move: "Barely moves the score because flu, pain, and many illnesses often improve anyway.",
      },
      {
        id: "prayer-log",
        title: "Prayer log with misses included",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 34,
        detail: "Write down requests, dates, expected outcomes, and every miss before checking later.",
        move: "Moves a little because the claim stops counting only the memorable hits.",
      },
      {
        id: "prayer-matched",
        title: "Matched requests with blind review",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 58,
        detail: "Compare similar requests, hide which cases received targeted prayer, and score outcomes with pre-set rules.",
        move: "Moves toward the benchmark because ordinary comparison starts to matter.",
      },
      {
        id: "prayer-hospital",
        title: "Small blinded hospital recovery pilot",
        tier: "Blinded pilot",
        effort: "Moderate",
        rigor: 76,
        detail: "Use medical records, matched patients, hidden prayer assignment, and outcomes chosen before the study starts.",
        move: "Moves right because the claim is exposed to public records and a fair comparison.",
      },
      {
        id: "prayer-terminal",
        title: "Triple-blind terminal diagnosis test",
        tier: "High-risk study",
        effort: "Demanding",
        rigor: 94,
        detail: "Use verified terminal diagnoses, hidden groups, independent clinicians, and rules set before prayer begins.",
        move: "Moves far right because a large miss would be hard to redescribe as a success.",
      },
    ],
  },
  {
    id: "divine-healing",
    title: "Divine healing",
    short: "God heals bodies in ways that should be visible in medical outcomes.",
    promise: "God heals some people in ways that should show up in diagnoses, records, timing, and recovery rates.",
    icon: "healing",
    color: "#4e7a3c",
    studies: [
      {
        id: "healing-testimony",
        title: "Healing testimony after treatment",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 10,
        detail: "A person improves after prayer while also receiving normal care.",
        move: "Barely moves the score because treatment, time, and misdiagnosis are still live.",
      },
      {
        id: "healing-records",
        title: "Before-and-after medical records",
        tier: "Documented case",
        effort: "Easy pilot",
        rigor: 42,
        detail: "Collect diagnosis, scans, treatment history, prayer timing, and later records for every submitted case.",
        move: "Moves some because the claim is no longer resting only on memory.",
      },
      {
        id: "healing-clinic",
        title: "Clinic pilot with objective outcomes",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 66,
        detail: "Track a clear condition, compare similar patients, and have clinicians score outcomes without knowing prayer status.",
        move: "Moves past the benchmark when misses are allowed to count.",
      },
      {
        id: "healing-terminal",
        title: "Verified terminal cancer study",
        tier: "High-risk study",
        effort: "Demanding",
        rigor: 93,
        detail: "Use confirmed terminal diagnoses, hidden assignment, independent review, and survival or remission rules set ahead of time.",
        move: "Moves far right because the claim is exposed to an outcome that ordinary medicine can verify.",
      },
    ],
  },
  {
    id: "future-knowledge",
    title: "Future knowledge",
    short: "God provides future information that people could not normally know.",
    promise: "God gives specific future knowledge that performs better than ordinary guessing, vague impressions, or hindsight.",
    icon: "future",
    color: "#8c3f2d",
    studies: [
      {
        id: "future-impressions",
        title: "Impressions interpreted afterward",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 10,
        detail: "A person remembers a feeling or phrase after an event happens.",
        move: "Barely moves the score because the target can be reshaped after the fact.",
      },
      {
        id: "future-timestamps",
        title: "Timestamped predictions",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 45,
        detail: "Write predictions before events happen, including dates, limits, and what would count as a miss.",
        move: "Moves some because hindsight is no longer doing all the work.",
      },
      {
        id: "future-registry",
        title: "Locked public prediction registry",
        tier: "Public pilot",
        effort: "Modest",
        rigor: 65,
        detail: "Submit predictions to a public log, score them with fixed rules, and include every forecast.",
        move: "Moves past the benchmark if vague or failed predictions are counted honestly.",
      },
      {
        id: "future-blind-judge",
        title: "Blind judging against controls",
        tier: "Strong study",
        effort: "Moderate",
        rigor: 84,
        detail: "Have judges compare dated forecasts with decoy forecasts and normal baseline predictions.",
        move: "Moves right because the claim has to beat controls, not just feel meaningful.",
      },
    ],
  },
  {
    id: "wisdom-insight",
    title: "Wisdom and insight",
    short: "God gives better guidance, judgment, or hidden insight than ordinary methods.",
    promise: "God provides believers with guidance or insight that improves decisions beyond ordinary reflection, advice, or luck.",
    icon: "wisdom",
    color: "#c2912c",
    studies: [
      {
        id: "wisdom-feeling",
        title: "Personal feeling of guidance",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 12,
        detail: "A person feels guided and later sees the choice as meaningful.",
        move: "Barely moves the score because meaning after the fact is easy to find.",
      },
      {
        id: "wisdom-log",
        title: "Guidance log with outcomes",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 36,
        detail: "Record the guidance before acting, then compare the outcome with clear alternatives.",
        move: "Moves a little because bad calls and neutral calls stay visible.",
      },
      {
        id: "wisdom-blind-advice",
        title: "Blind advice quality test",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 64,
        detail: "Compare guidance from believers, non-believers, and experts without judges knowing who gave which advice.",
        move: "Moves toward or past the benchmark because the guidance must outperform ordinary advice.",
      },
      {
        id: "wisdom-decision-trial",
        title: "Repeated decision forecast trial",
        tier: "Strong study",
        effort: "Moderate",
        rigor: 78,
        detail: "Use many decisions, public scoring, and clear success measures before the choices are made.",
        move: "Moves right because repeated outcomes reduce cherry-picking.",
      },
      {
        id: "wisdom-prediction-market",
        title: "Prediction-market calibration test",
        tier: "Public feedback",
        effort: "Modest",
        rigor: 82,
        detail: "Make timestamped forecasts from claimed guidance and compare them with public forecasting baselines such as Polymarket, plus ordinary expert or crowd forecasts.",
        move: "Moves right because the claimed insight has to beat a live public prediction baseline rather than private confidence.",
      },
    ],
  },
  {
    id: "prosocial-behavior",
    title: "Better behavior",
    short: "God transforms believers into more honest, generous, or less harmful people.",
    promise: "God makes believers measurably more pro-social than comparable people when behavior is checked beyond self-report.",
    icon: "prosocial",
    color: "#7a4f9f",
    studies: [
      {
        id: "behavior-testimony",
        title: "Changed-life stories",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 18,
        detail: "People describe how faith made them kinder or more honest.",
        move: "Barely moves the score because sincere stories can omit comparison and failures.",
      },
      {
        id: "behavior-log",
        title: "Service and harm log",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 38,
        detail: "Track concrete helpful acts, failures, repairs, and harms over time rather than only testimony.",
        move: "Moves a little because the claim now includes ordinary behavior records.",
      },
      {
        id: "behavior-matched",
        title: "Matched community comparison",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 65,
        detail: "Compare similar communities on concrete outcomes such as giving, abuse response, restitution, and honesty checks.",
        move: "Moves past the benchmark if uncomfortable outcomes are kept in the count.",
      },
      {
        id: "behavior-secular-comparison",
        title: "Christian vs secular community records",
        tier: "Public records comparison",
        effort: "Modest",
        rigor: 72,
        detail: "Compare heavily Christian communities with low-Christian or more secular communities, including Japanese comparison groups where relevant, using crime, divorce, obesity, and other public outcomes while controlling for age, income, urbanization, reporting rates, law, healthcare, and marriage patterns.",
        move: "Moves right because the claim must show up against ordinary society-level outcomes, not just in-group testimony.",
      },
      {
        id: "behavior-third-party",
        title: "Third-party behavior audit",
        tier: "Strong study",
        effort: "Moderate",
        rigor: 80,
        detail: "Use pre-set measures, outside records, and independent review rather than church self-description.",
        move: "Moves right because the claim is exposed to records outside the group.",
      },
    ],
  },
  {
    id: "divine-protection",
    title: "Divine protection",
    short: "God protects believers from danger, disaster, or harm in visible ways.",
    promise: "God protects believers in ways that should reduce real harms compared with similar people facing similar risks.",
    icon: "protection",
    color: "#2f6d67",
    studies: [
      {
        id: "protection-story",
        title: "Near-miss story",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 12,
        detail: "A person narrowly avoids harm and sees the timing as protection.",
        move: "Barely moves the score because near misses happen in every group.",
      },
      {
        id: "protection-log",
        title: "Incident log with comparison",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 46,
        detail: "Track incidents for prayed-for people and similar non-prayed-for cases over the same period.",
        move: "Moves some because it includes cases where protection did not appear.",
      },
      {
        id: "protection-records",
        title: "Records-based harm comparison",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 72,
        detail: "Use accident, medical, insurance, or workplace records with matched risk levels.",
        move: "Moves right because the claim faces ordinary public outcomes.",
      },
      {
        id: "protection-occupation",
        title: "High-risk occupation cohort",
        tier: "Strong study",
        effort: "Moderate",
        rigor: 86,
        detail: "Compare similar workers in high-risk roles with pre-set outcomes and independent record checks.",
        move: "Moves far right because protection should show up where harm is common enough to measure.",
      },
    ],
  },
  {
    id: "reduced-morbidity",
    title: "Reduced morbidity",
    short: "God's care reduces illness, severe disease, or early death in measurable ways.",
    promise: "In the spirit of 'His eye is on the sparrow,' God watches over believers in ways that should reduce serious illness, hospitalization, and death compared with similar people.",
    icon: "morbidity",
    color: "#3d6f8f",
    studies: [
      {
        id: "morbidity-survivor-story",
        title: "Survival story after illness",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 12,
        detail: "A believer survives a dangerous illness and the story is treated as protective care.",
        move: "Barely moves the score because survival stories do not show the uncounted severe cases.",
      },
      {
        id: "morbidity-church-log",
        title: "Church illness log with misses",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 38,
        detail: "Track infections, hospitalizations, recoveries, deaths, and unremarkable cases for the whole group.",
        move: "Moves a little because severe outcomes and misses are no longer invisible.",
      },
      {
        id: "morbidity-covid-local",
        title: "Matched COVID outcome review",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 66,
        detail: "Compare COVID infection, hospitalization, long COVID, and death among believers and similar non-believers while accounting for age, exposure, vaccination, care access, and region.",
        move: "Moves past the benchmark if the user agrees that worse or ordinary outcomes would count.",
      },
      {
        id: "morbidity-record-cohort",
        title: "Large health-record cohort",
        tier: "Strong study",
        effort: "Demanding",
        rigor: 84,
        detail: "Use de-identified health records, matched groups, pre-set morbidity outcomes, and outside review.",
        move: "Moves right because the claim faces broad medical data rather than selected testimony.",
      },
      {
        id: "morbidity-replicated-covid",
        title: "Replicated COVID morbidity study",
        tier: "Robust science",
        effort: "Demanding",
        rigor: 96,
        detail: "Run a preregistered, multi-region, replicated study on COVID hospitalization, death, and lasting illness using very large matched samples.",
        move: "Moves far right because the sparrow-style protection claim is exposed to public health outcomes at scale.",
      },
    ],
  },
  {
    id: "unexpected-longevity",
    title: "Unexpected longevity",
    short: "God gives unusually long life to believers or people who pray correctly.",
    promise: "God gives believers or faithful pray-ers measurably longer lives than comparable people.",
    icon: "longevity",
    color: "#6f5f19",
    studies: [
      {
        id: "longevity-story",
        title: "Old-age stories in the community",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 15,
        detail: "A group points to unusually old members as evidence of blessing.",
        move: "Barely moves the score because every large community has memorable old members.",
      },
      {
        id: "longevity-verified",
        title: "Verified ages in local churches",
        tier: "Basic records",
        effort: "Easy pilot",
        rigor: 42,
        detail: "Check birth records and include all eligible members, not only impressive examples.",
        move: "Moves some because ordinary documentation replaces community lore.",
      },
      {
        id: "longevity-registry",
        title: "Registry comparison by commitment",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 65,
        detail: "Compare verified ages by level of religious commitment while controlling for region, wealth, care, and lifestyle.",
        move: "Moves past the benchmark if all groups are counted fairly.",
      },
      {
        id: "longevity-150",
        title: "Verified 150-year public challenge",
        tier: "High-risk check",
        effort: "Demanding",
        rigor: 94,
        detail: "Invite documented cases of believers over 150, verify birth and identity records, and publish the full result.",
        move: "Moves far right because an extraordinary longevity promise becomes plainly checkable.",
      },
    ],
  },
  {
    id: "provision",
    title: "Providential help",
    short: "God provides money, opportunities, or resources in ways beyond coincidence.",
    promise: "God provides timely help that should appear more often for believers than for comparable people with similar needs.",
    icon: "provision",
    color: "#b36b2c",
    studies: [
      {
        id: "provision-story",
        title: "Just-in-time provision story",
        tier: "Anecdote",
        effort: "Easy",
        rigor: 14,
        detail: "A need is met soon after prayer or a faith decision.",
        move: "Barely moves the score because needs are often met by ordinary networks and timing.",
      },
      {
        id: "provision-log",
        title: "Need and request log",
        tier: "Basic log",
        effort: "Easy pilot",
        rigor: 40,
        detail: "Record needs, deadlines, requests, outcomes, and misses before help arrives.",
        move: "Moves a little because misses and ordinary help stay visible.",
      },
      {
        id: "provision-matched",
        title: "Matched hardship comparison",
        tier: "Controlled pilot",
        effort: "Modest",
        rigor: 60,
        detail: "Compare similar people facing similar needs, including community support and outside resources.",
        move: "Moves toward the benchmark because the claim must beat ordinary support networks.",
      },
      {
        id: "provision-blind",
        title: "Blinded outcome classification",
        tier: "Strong study",
        effort: "Moderate",
        rigor: 76,
        detail: "Have independent reviewers classify whether needs were met without knowing prayer or believer status.",
        move: "Moves right because the outcome is judged outside the story circle.",
      },
    ],
  },
];

const excuses = [
  {
    id: "no-testing",
    title: "God must not be tested",
    penalty: 32,
    detail: "This can make even simple checks off-limits after a concrete claim has been made.",
  },
  {
    id: "skeptics-block",
    title: "It fails around skeptics",
    penalty: 28,
    detail: "If scrutiny itself blocks the effect, public verification becomes almost impossible.",
  },
  {
    id: "weak-faith",
    title: "Failure means faith was too weak",
    penalty: 26,
    detail: "This shifts every miss back onto the patient, subject, or observer.",
  },
  {
    id: "no-is-answer",
    title: "No is still an answer",
    penalty: 24,
    detail: "This can make hit, miss, delay, and silence all count as confirmation.",
  },
  {
    id: "mysterious-timing",
    title: "God's timing is unknowable",
    penalty: 20,
    detail: "If no deadline can be set, the claim cannot clearly fail in time.",
  },
  {
    id: "after-sincerity",
    title: "Only sincere cases count later",
    penalty: 22,
    detail: "Judging sincerity after the outcome lets failures be removed from the sample.",
  },
  {
    id: "interference",
    title: "Spiritual interference blocked it",
    penalty: 18,
    detail: "A second invisible cause can explain away any negative result.",
  },
  {
    id: "ordinary-still-divine",
    title: "Ordinary outcomes are still divine",
    penalty: 18,
    detail: "This may be a devotional interpretation, but it stops the earthly effect from being distinguished.",
  },
];

const datasetSuggestions = {
  "answered-prayer": [
    "Timestamped prayer request logs with misses included.",
    "Hospital recovery records with hidden prayer assignment.",
    "Matched patient outcomes from comparable diagnoses and care settings.",
    "Independent clinician scoring of preregistered recovery endpoints.",
  ],
  "divine-healing": [
    "Before-and-after scans, labs, pathology, and diagnosis records.",
    "Condition-specific clinic registries with objective endpoints.",
    "Matched treatment histories and disease severity baselines.",
    "Independent medical review of claimed unusual recoveries.",
  ],
  "future-knowledge": [
    "Locked public prediction registries with timestamps.",
    "Forecast logs that include every miss and vague prediction.",
    "Blind judge comparisons against control forecasts.",
    "Public-event datasets with prewritten scoring rules.",
  ],
  "wisdom-insight": [
    "Decision logs with predeclared alternatives and outcomes.",
    "Blind advice-quality ratings from independent judges.",
    "Matched expert, believer, and non-believer guidance samples.",
    "Repeated forecast trials with public scoring.",
    "Prediction-market baselines such as Polymarket for calibration feedback.",
  ],
  "prosocial-behavior": [
    "Third-party behavior audits rather than self-report.",
    "Giving, volunteering, restitution, and harm-response records.",
    "Matched community comparisons by income, region, and age.",
    "Crime, divorce, and obesity statistics for Christian communities compared with low-Christian or secular communities.",
    "Japanese public records as one possible low-Christian-prevalence comparison baseline, with cultural and reporting controls.",
    "Independent safeguarding or misconduct-response datasets.",
  ],
  "divine-protection": [
    "Accident, workplace injury, insurance, and medical records.",
    "Matched exposure cohorts in high-risk occupations.",
    "Disaster or harm records with pre-set risk categories.",
    "Incident logs that include protected and unprotected outcomes.",
  ],
  "reduced-morbidity": [
    "COVID infection, hospitalization, death, and long-COVID statistics.",
    "Vaccination, age, exposure, region, and care-access controls.",
    "De-identified health-record cohorts matched by baseline risk.",
    "Multi-region public-health replication datasets.",
  ],
  "unexpected-longevity": [
    "Birth certificates, identity records, and death registries.",
    "Verified centenarian and supercentenarian databases.",
    "Church membership rolls linked to public age records.",
    "Matched longevity cohorts controlling for lifestyle and region.",
  ],
  provision: [
    "Need/request logs with dates, deadlines, and misses.",
    "Matched hardship cohorts with similar income and support networks.",
    "Independent classification of whether needs were actually met.",
    "Public benefit, debt, employment, or emergency-assistance records.",
  ],
};

const confounderSuggestions = {
  "answered-prayer": [
    "Natural recovery rates and regression to the mean.",
    "Treatment, care quality, diagnosis severity, and prior health.",
    "Selective memory of hits while ordinary misses disappear.",
    "Family support, wealth, insurance, and access to clinicians.",
  ],
  "divine-healing": [
    "Concurrent medical treatment, spontaneous remission, and misdiagnosis.",
    "Different baseline severity or disease stage across groups.",
    "Unverified testimony, missing scans, and changing endpoints.",
    "Survivorship bias when only dramatic recoveries are submitted.",
  ],
  "future-knowledge": [
    "Vague predictions that can fit many later events.",
    "Hindsight editing, private timestamps, and forgotten misses.",
    "Base rates, expert forecasts, and ordinary trend awareness.",
    "Multiple guesses where only the best hit is publicized.",
  ],
  "wisdom-insight": [
    "Expertise, education, coaching, and ordinary advice networks.",
    "Outcome hindsight that makes a decision feel guided afterward.",
    "Different risk tolerance, resources, or social support.",
    "Selection bias when only successful guidance stories are repeated.",
  ],
  "prosocial-behavior": [
    "Age, income, education, urbanization, reporting rates, and policing differences.",
    "Culture, law, family structure, healthcare access, and social safety nets.",
    "Self-report bias and pressure to protect the in-group.",
    "Different definitions of crime, divorce, obesity, abuse, or restitution.",
  ],
  "divine-protection": [
    "Different exposure levels, occupations, travel patterns, and risk choices.",
    "Safety training, equipment, insurance, and local infrastructure.",
    "Near-miss storytelling without counting comparable harms.",
    "Disaster location, timing, evacuation access, and reporting quality.",
  ],
  "reduced-morbidity": [
    "Age, vaccination, exposure, masking, occupation, and household density.",
    "Healthcare access, baseline risk, region, testing rates, and record quality.",
    "Different definitions of infection, hospitalization, death, and long COVID.",
    "Survivorship and participation bias in church or community samples.",
  ],
  "unexpected-longevity": [
    "Verified birth records, identity continuity, and age exaggeration.",
    "Lifestyle, wealth, region, diet, genetics, and healthcare access.",
    "Membership-roll survival bias and selective examples.",
    "Migration, record gaps, and different mortality baselines.",
  ],
  provision: [
    "Family, church, charity, public benefits, employment, and credit access.",
    "Vague deadlines or needs that can be reinterpreted after help arrives.",
    "Uncounted unmet needs and stories only from successful cases.",
    "Different baseline income, debt, social networks, and local opportunity.",
  ],
};

const claimPresets = [
  {
    id: "preset-healing",
    title: "Healing",
    description: "Medical improvement should exceed ordinary recovery, treatment, or misdiagnosis.",
    claimId: "divine-healing",
  },
  {
    id: "preset-protection",
    title: "Protection",
    description: "Believers should suffer fewer comparable harms, illnesses, or deaths.",
    claimId: "divine-protection",
  },
  {
    id: "preset-wisdom",
    title: "Wisdom",
    description: "Guidance should outperform ordinary advice, expertise, or public baselines.",
    claimId: "wisdom-insight",
  },
  {
    id: "preset-prophecy",
    title: "Prophecy",
    description: "Future claims should beat timestamped controls and ordinary forecasting.",
    claimId: "future-knowledge",
  },
  {
    id: "preset-morals",
    title: "Moral transformation",
    description: "Communities should show better behavior beyond self-report and in-group stories.",
    claimId: "prosocial-behavior",
  },
];

const sampleSizeOptions = {
  small: { label: "Under 25 cases", points: 4 },
  pilot: { label: "25-100 cases", points: 10 },
  large: { label: "100-1,000 cases", points: 20 },
  "very-large": { label: "1,000+ cases", points: 28 },
};

const blindingOptions = {
  open: { label: "Open review", points: 0 },
  "blind-review": { label: "Blind outcome review", points: 10 },
  "double-blind": { label: "Double blind", points: 16 },
  "triple-blind": { label: "Triple blind", points: 22 },
};

const replicationOptions = {
  single: { label: "Single site", points: 0 },
  "multi-site": { label: "Multi-site", points: 8 },
  independent: { label: "Independent replication", points: 14 },
};

function defaultCustomStudy(claim) {
  return {
    outcome: "",
    comparison: "",
    sampleSize: "pilot",
    blinding: "open",
    preregistered: false,
    replication: "single",
    missRule: "",
    title: `${claim.title} custom protocol`,
  };
}

function defaultOutcomeRules(claim) {
  return {
    forClaim: `A preregistered, measurable advantage for ${claim.title.toLowerCase()} over matched controls.`,
    againstClaim: "No advantage, worse outcomes, or only ordinary baseline results under the agreed rules.",
    neutral: "Ambiguous data, broken protocol, or a sample too small to distinguish the claim from chance.",
  };
}

function defaultMindChange(claim) {
  return `A fair, preregistered test showing no measurable advantage for ${claim.title.toLowerCase()} over matched comparison cases would lower my confidence in this earthly promise.`;
}

const state = Object.fromEntries(
  claims.map((claim) => [
    claim.id,
    {
      studyId: claim.studies[0].id,
      willingness: 35,
      failure: 25,
      excuses: new Set(),
      text: claim.promise,
      customStudy: defaultCustomStudy(claim),
      outcomeRules: defaultOutcomeRules(claim),
      mindChange: defaultMindChange(claim),
    },
  ]),
);

let selectedClaimId = claims[0].id;
let promptMode = "selected";
let allResultBuilt = false;
let copyPromptResetTimer;

const claimButtons = document.querySelector("#claim-buttons");
const presetGrid = document.querySelector("#preset-grid");
const studyGrid = document.querySelector("#study-grid");
const datasetList = document.querySelector("#dataset-list");
const datasetActivePromise = document.querySelector("#dataset-active-promise");
const confounderList = document.querySelector("#confounder-list");
const confounderActivePromise = document.querySelector("#confounder-active-promise");
const excuseGrid = document.querySelector("#excuse-grid");
const claimText = document.querySelector("#claim-text");
const willingnessRange = document.querySelector("#willingness-range");
const willingnessValue = document.querySelector("#willingness-value");
const failureRange = document.querySelector("#failure-range");
const failureValue = document.querySelector("#failure-value");
const customOutcome = document.querySelector("#custom-outcome");
const customComparison = document.querySelector("#custom-comparison");
const customSampleSize = document.querySelector("#custom-sample-size");
const customBlinding = document.querySelector("#custom-blinding");
const customPreregistered = document.querySelector("#custom-preregistered");
const customReplication = document.querySelector("#custom-replication");
const customMissRule = document.querySelector("#custom-miss-rule");
const customStudyScore = document.querySelector("#custom-study-score");
const useCustomStudyButton = document.querySelector("#use-custom-study");
const outcomeFor = document.querySelector("#outcome-for");
const outcomeAgainst = document.querySelector("#outcome-against");
const outcomeNeutral = document.querySelector("#outcome-neutral");
const mindChangeText = document.querySelector("#mind-change-text");
const mindChangeNote = document.querySelector("#mind-change-note");
const aiPromptOutput = document.querySelector("#ai-prompt-output");
const copyPromptButton = document.querySelector("#copy-ai-prompt");
const copyStatus = document.querySelector("#copy-status");
const copyPromptDefaultLabel = copyPromptButton?.textContent.trim() || "Copy prompt";
const useSelectedPromptButton = document.querySelector("#use-selected-prompt");
const aiPromptMode = document.querySelector("#ai-prompt-mode");
const buildAllResultButton = document.querySelector("#build-all-result");
const allPromisesResult = document.querySelector("#all-promises-result");
const allStanceTable = document.querySelector("#all-stance-table");
const promiseMap = document.querySelector("#promise-map");
const shareStateOutput = document.querySelector("#share-state-output");
const copyShareLinkButton = document.querySelector("#copy-share-link");
const exportJsonButton = document.querySelector("#export-json");
const loadJsonButton = document.querySelector("#load-json");
const shareStatus = document.querySelector("#share-status");
const reportOutput = document.querySelector("#report-output");
const copyReportButton = document.querySelector("#copy-report");
const printReportButton = document.querySelector("#print-report");
const reportStatus = document.querySelector("#report-status");
const activePromiseTitle = document.querySelector("#active-promise-title");
const activePromiseScore = document.querySelector("#active-promise-score");
const activePromiseDetail = document.querySelector("#active-promise-detail");
const activePromiseStudy = document.querySelector("#active-promise-study");
const activeStudyRigor = document.querySelector("#active-study-rigor");
const activeRunSetting = document.querySelector("#active-run-setting");
const activeFailureSetting = document.querySelector("#active-failure-setting");
const activeExcuseDrag = document.querySelector("#active-excuse-drag");
const personalLifeTitle = document.querySelector("#personal-life-title");
const personalLifeBody = document.querySelector("#personal-life-body");
const ledgerExcuses = document.querySelector("#ledger-excuses");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function getClaim(id = selectedClaimId) {
  return claims.find((claim) => claim.id === id);
}

function optionLabel(options, value) {
  return options[value]?.label || value;
}

function customStudyRigor(claim) {
  const custom = state[claim.id].customStudy;
  const hasOutcome = custom.outcome.trim().length > 0;
  const hasComparison = custom.comparison.trim().length > 0;
  const hasMissRule = custom.missRule.trim().length > 0;
  const score =
    14 +
    (hasOutcome ? 12 : 0) +
    (hasComparison ? 14 : 0) +
    (hasMissRule ? 12 : 0) +
    (sampleSizeOptions[custom.sampleSize]?.points || 0) +
    (blindingOptions[custom.blinding]?.points || 0) +
    (custom.preregistered ? 10 : 0) +
    (replicationOptions[custom.replication]?.points || 0);
  return Math.round(clamp(score, 18, 96));
}

function customStudyEffort(custom) {
  if (custom.sampleSize === "very-large" || custom.replication === "independent") {
    return "Demanding";
  }
  if (custom.sampleSize === "large" || custom.blinding === "double-blind" || custom.blinding === "triple-blind") {
    return "Moderate";
  }
  return "Easy pilot";
}

function buildCustomStudy(claim) {
  const custom = state[claim.id].customStudy;
  const outcome = custom.outcome.trim() || "Define a measurable outcome";
  const comparison = custom.comparison.trim() || "Name a matched comparison group";
  const missRule = custom.missRule.trim() || "Define what would count as a clean miss";
  const rigor = customStudyRigor(claim);

  return {
    id: "custom",
    title: custom.title || `${claim.title} custom protocol`,
    tier: "Custom protocol",
    effort: customStudyEffort(custom),
    rigor,
    detail: `Outcome: ${outcome}. Comparison: ${comparison}. Sample: ${optionLabel(sampleSizeOptions, custom.sampleSize)}. Blinding: ${optionLabel(blindingOptions, custom.blinding)}. Miss rule: ${missRule}.`,
    move:
      rigor >= 80
        ? "Moves right because the custom protocol has clear outcomes, controls, and public failure conditions."
        : "Moves as far as the custom protocol specifies outcomes, comparison, blinding, miss rules, and replication.",
  };
}

function getStudy(claim, studyId = state[claim.id].studyId) {
  if (studyId === "custom") {
    return buildCustomStudy(claim);
  }
  return claim.studies.find((study) => study.id === studyId) || claim.studies[0];
}

function excusePenaltyFor(claimId) {
  return [...state[claimId].excuses].reduce((total, excuseId) => {
    const excuse = excuses.find((item) => item.id === excuseId);
    return total + (excuse ? excuse.penalty : 0);
  }, 0);
}

function scoreClaim(claim) {
  const current = state[claim.id];
  const study = getStudy(claim);
  const willingnessFactor = current.willingness / 100;
  const failureFactor = current.failure / 100;
  const exposure =
    study.rigor *
    (0.18 + willingnessFactor * 0.82) *
    (0.2 + failureFactor * 0.8) *
    0.92;
  const score = 8 + exposure - excusePenaltyFor(claim.id);
  return Math.round(clamp(score, 3, 96));
}

function diagnosisFor(score) {
  if (score < 35) {
    return {
      title: "Protected from ordinary checks",
      body: "This claim is mostly being held away from tests that could make confidence go down.",
      label: "Protected",
      detail: "Protected from ordinary checks.",
    };
  }
  if (score < 50) {
    return {
      title: "Near the practical benchmark",
      body:
        "The claim has begun to face evidence, but a poor result can still be softened or avoided. The exact cutoff is somewhat arbitrary, so treat this as a useful warning zone rather than a hard boundary.",
      label: "Near benchmark",
      detail: "Some risk, not yet a clean test.",
    };
  }
  if (score < 72) {
    return {
      title: "Meaningfully testable",
      body: "The claim is being allowed to face a clear enough check that failure would matter.",
      label: "Testable",
      detail: "A fair miss would count.",
    };
  }
  return {
    title: "Exposed to clean disconfirmation",
    body: "The claim is far enough right that a strong negative result would be hard to redescribe as success.",
    label: "Far right",
    detail: "Public checks can bite.",
  };
}

const promiseMapLabels = {
  "answered-prayer": "Prayer",
  "divine-healing": "Healing",
  "future-knowledge": "Future",
  "wisdom-insight": "Wisdom",
  "prosocial-behavior": "Behavior",
  "divine-protection": "Protect",
  "reduced-morbidity": "Health",
  "unexpected-longevity": "Long life",
  "provision": "Help",
};

function personalLifeAssessment(score, current, excuseCount) {
  if (score >= 72 && current.failure >= 70 && excuseCount === 0) {
    return {
      title: "Personal and active in earthly life: exposed to public checks",
      body:
        "This stance treats the promise as a real-world claim about a personal God acting in earthly life. It allows a strong test to matter and does not preserve an easy escape if the result disappoints.",
    };
  }

  if (score >= 50 && current.failure >= 50) {
    return {
      title: "Personal and active in earthly life: partly exposed",
      body:
        "This stance partly treats the promise as an earthly action claim. It allows some public feedback, but the remaining limits or escape hatches still soften what a poor result would mean.",
    };
  }

  return {
    title: "Personal and active in earthly life: mostly protected",
    body:
      "This stance says the promise concerns earthly life, but it does not yet let earthly outcomes carry much force. Functionally, it protects the claim from the kind of feedback expected if a personal God were actively producing observable effects here.",
  };
}

function selectedExcuseDetails(claimId) {
  const current = state[claimId];
  return [...current.excuses]
    .map((id) => excuses.find((excuse) => excuse.id === id))
    .filter(Boolean);
}

function selectedExcuseSummary(claimId) {
  const activeExcuses = selectedExcuseDetails(claimId);
  if (activeExcuses.length === 0) {
    return "None selected";
  }
  return activeExcuses
    .map((excuse) => `${excuse.title} (${excuse.detail})`)
    .join("; ");
}

function outcomeRulesSummary(claimId) {
  const rules = state[claimId].outcomeRules;
  return `Counts for: ${rules.forClaim || "Not specified"}; counts against: ${rules.againstClaim || "Not specified"}; neutral: ${rules.neutral || "Not specified"}.`;
}

function datasetSummary(claimId) {
  return (datasetSuggestions[claimId] || []).join("; ");
}

function confounderSummary(claimId) {
  return (confounderSuggestions[claimId] || []).join("; ");
}

function claimSnapshotLine(claim) {
  const itemState = state[claim.id];
  const itemStudy = getStudy(claim);
  const itemScore = scoreClaim(claim);
  const itemDiagnosis = diagnosisFor(itemScore);
  const itemExcuses = selectedExcuseSummary(claim.id);
  return `- ${claim.title}: score ${itemScore}/100 (${itemDiagnosis.title}); study "${itemStudy.title}" (${itemStudy.tier}, rigor ${itemStudy.rigor}/100); willingness to run ${itemState.willingness}%; clean failure counts ${itemState.failure}%; what would change the user's mind: ${itemState.mindChange || "Not specified"}; escape hatches: ${itemExcuses}; outcome rules: ${outcomeRulesSummary(claim.id)}; dataset leads: ${datasetSummary(claim.id)}; confounders to control: ${confounderSummary(claim.id)}.`;
}

function allPromiseSnapshots() {
  return claims.map((item) => claimSnapshotLine(item)).join("\n");
}

function buildAllPromisesResult() {
  const snapshots = claims.map((claim) => {
    const score = scoreClaim(claim);
    return {
      claim,
      score,
      diagnosis: diagnosisFor(score),
      current: state[claim.id],
      study: getStudy(claim),
      excuseCount: state[claim.id].excuses.size,
    };
  });
  const farRight = snapshots.filter((item) => item.score >= 72).length;
  const partlyOpen = snapshots.filter((item) => item.score >= 50 && item.score < 72).length;
  const protectedCount = snapshots.length - farRight - partlyOpen;
  const totalExcuses = snapshots.reduce((total, item) => total + item.excuseCount, 0);
  const strongest = snapshots.reduce((best, item) => (item.score > best.score ? item : best), snapshots[0]);
  const weakest = snapshots.reduce((worst, item) => (item.score < worst.score ? item : worst), snapshots[0]);
  const average = Math.round(
    snapshots.reduce((total, item) => total + item.score, 0) / snapshots.length,
  );
  const overall =
    farRight >= 6 && totalExcuses === 0
      ? "Overall, the suite is broadly open to robust science."
      : protectedCount >= 5 || totalExcuses >= 6
        ? "Overall, the suite still functions mostly as protected rhetoric."
        : "Overall, the suite is mixed: some promises are allowed onto the field, while others remain protected.";

  return `${overall} Average field position: ${average}/100. ${farRight} promise${farRight === 1 ? "" : "s"} are exposed to clean disconfirmation, ${partlyOpen} are meaningfully or partly testable, and ${protectedCount} remain near the protected side. Strongest current stance: ${strongest.claim.title} at ${strongest.score}/100 using "${strongest.study.title}". Most protected stance: ${weakest.claim.title} at ${weakest.score}/100 using "${weakest.study.title}". Total active escape hatches across the suite: ${totalExcuses}.`;
}

function buildReportText() {
  const claim = getClaim();
  const current = state[claim.id];
  const study = getStudy(claim);
  const score = scoreClaim(claim);
  const diagnosis = diagnosisFor(score);
  const personalAssessment = personalLifeAssessment(score, current, current.excuses.size);
  const activeExcuses = selectedExcuseDetails(claim.id);
  const stanceRows = claims
    .map((item) => {
      const itemScore = scoreClaim(item);
      const itemStudy = getStudy(item);
      return `${item.title}: ${itemScore}/100; ${diagnosisFor(itemScore).label}; study: ${itemStudy.tier}; clean failure: ${state[item.id].failure}%; excuses: ${state[item.id].excuses.size}`;
    })
    .join("\n");

  return `Earthly Promise Test Field report

Active promise:
${claim.title}

Claim wording:
${current.text}

Current result:
${score}/100 - ${diagnosis.title}. ${diagnosis.body}

Personal-and-active-God question:
${personalAssessment.title}. ${personalAssessment.body}

Selected study:
${study.title} (${study.tier}, rigor ${study.rigor}/100, effort: ${study.effort})
${study.detail}

What result would change the user's mind:
${current.mindChange || "Not specified"}

Outcome rules:
${outcomeRulesSummary(claim.id)}

Dataset leads:
${datasetSummary(claim.id)}

Confounder checklist:
${confounderSummary(claim.id)}

Escape hatches:
${activeExcuses.length === 0 ? "None selected" : activeExcuses.map((excuse) => `${excuse.title}: ${excuse.detail}`).join("\n")}

Suite-wide result:
${buildAllPromisesResult()}

All-promise stance table:
${stanceRows}

Discussion questions:
1. Is the stated mind-change result specific enough to matter?
2. Which ordinary confounder most needs to be controlled?
3. Would a clean failure lower confidence, or would an escape hatch absorb it?
4. Does this stance fit a personal God acting in earthly life, or mostly protected interpretation?`;
}

function renderReport() {
  if (!reportOutput) {
    return;
  }

  const claim = getClaim();
  const current = state[claim.id];
  const study = getStudy(claim);
  const score = scoreClaim(claim);
  const diagnosis = diagnosisFor(score);
  const activeExcuses = selectedExcuseDetails(claim.id);
  const datasetItems = datasetSuggestions[claim.id] || [];
  const confounderItems = confounderSuggestions[claim.id] || [];

  reportOutput.innerHTML = `
    <article class="print-report-card">
      <header>
        <p>Earthly Promise Test Field</p>
        <h4>${escapeHtml(claim.title)} audit report</h4>
        <span>${score}/100 - ${escapeHtml(diagnosis.title)}</span>
      </header>
      <section>
        <h5>Claim wording</h5>
        <p>${escapeHtml(current.text)}</p>
      </section>
      <section>
        <h5>Study choice</h5>
        <p>${escapeHtml(study.title)} (${escapeHtml(study.tier)}, ${study.rigor}/100 rigor). ${escapeHtml(study.detail)}</p>
      </section>
      <section>
        <h5>What would change the user's mind?</h5>
        <p>${escapeHtml(current.mindChange || "Not specified")}</p>
      </section>
      <section>
        <h5>Outcome rules</h5>
        <p>${escapeHtml(outcomeRulesSummary(claim.id))}</p>
      </section>
      <section>
        <h5>Dataset leads</h5>
        <ul>${datasetItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h5>Confounders to control</h5>
        <ul>${confounderItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section>
        <h5>Escape hatches</h5>
        <p>${escapeHtml(activeExcuses.length === 0 ? "None selected" : activeExcuses.map((excuse) => excuse.title).join("; "))}</p>
      </section>
      <section>
        <h5>Suite-wide result</h5>
        <p>${escapeHtml(buildAllPromisesResult())}</p>
      </section>
      <section>
        <h5>Class discussion</h5>
        <ol>
          <li>Is the mind-change result specific enough to matter?</li>
          <li>Which ordinary confounder most needs to be controlled?</li>
          <li>Would a clean failure lower confidence, or would an escape hatch absorb it?</li>
          <li>Does this stance fit a personal God acting in earthly life?</li>
        </ol>
      </section>
    </article>
  `;
}

function buildSelectedAiPrompt() {
  const claim = getClaim();
  const current = state[claim.id];
  const study = getStudy(claim);
  const score = scoreClaim(claim);
  const diagnosis = diagnosisFor(score);
  const activeExcuses = selectedExcuseDetails(claim.id);
  const personalAssessment = personalLifeAssessment(score, current, activeExcuses.length);
  const allClaimSummary = allPromiseSnapshots();

  return `Please provide a comprehensive analysis of this falsifiability audit for an earthly God-claim. Do not assume the claim is true or false. Analyze whether the current posture actually exposes the claim to ordinary public verification, what would count as confirmation or disconfirmation, and where the claim is still being insulated from evidence.

Selected claim:
${claim.title}

Claim wording:
${current.text}

Selected study:
${study.title}

Study type and rigor:
${study.tier}; ${study.rigor}/100 rigor; effort level: ${study.effort}

Study description:
${study.detail}

Why this study moves the field:
${study.move}

Outcome rules set before looking:
${outcomeRulesSummary(claim.id)}

What result would change the user's mind:
${current.mindChange || "Not specified"}

Concrete dataset leads (candidate record sources, not evidence by themselves):
${datasetSummary(claim.id)}

Confounder checklist:
${confounderSummary(claim.id)}

User willingness settings:
- Willingness to run the selected test: ${current.willingness}%
- Willingness to let a clean failure count against the claim: ${current.failure}%

Selected escape hatches:
${activeExcuses.length === 0 ? "None selected" : activeExcuses.map((excuse) => `- ${excuse.title}: ${excuse.detail}`).join("\n")}

Current field result:
${score}/100, ${diagnosis.title}. ${diagnosis.body}

Personal-and-active-God question:
${personalAssessment.title}. ${personalAssessment.body}

All current claim snapshots:
${allClaimSummary}

Please give a comprehensive review that includes:
1. Whether the selected claim is currently falsifiable, partly falsifiable, or functionally protected from falsification.
2. Whether the selected study is a fair and feasible test of the claim, and what confounders or design weaknesses should be controlled.
3. What exact outcomes would count for the claim, against the claim, or as neutral, and whether the stated mind-change result is clear enough.
4. How the selected escape hatches affect falsifiability.
5. Whether the user's willingness settings are consistent with treating the claim as an empirical claim.
6. Whether the user's stance reflects the idea that this God is personal and active in the user's earthly life, or whether the stance retreats toward a protected, non-interventionist, or merely interpretive claim.
7. Stronger but still feasible study designs, including sample size, comparison group, blinding, preregistration, outcome rules, and replication suggestions.
8. A concise final judgment about whether this posture is open to robust science or mostly protected rhetoric.`;
}

function buildAllPromisesAiPrompt() {
  return `Please provide a comprehensive suite-wide analysis of this falsifiability audit for earthly God-claims. Do not assume any claim is true or false. Analyze whether the user's whole stance treats these promises as claims about a personal God acting in earthly life, or whether the stance protects them from ordinary public feedback.

Suite-wide result:
${buildAllPromisesResult()}

All promise snapshots:
${allPromiseSnapshots()}

Please give a comprehensive review that includes:
1. Which promises are most falsifiable, partly falsifiable, or functionally protected.
2. Whether the user's standards are consistent across promises.
3. Which selected studies are feasible and which need stronger controls.
4. Whether the outcome rules and mind-change commitments specify real wins, real losses, and neutral cases before results are known.
5. How the selected escape hatches change the whole suite's falsifiability.
6. Whether the total stance reflects belief in a personal God active in earthly life, or retreats toward protected interpretation.
7. Concrete dataset and study-design improvements for every promise, including which controls or comparisons would make each lead useful.
8. A concise final judgment about the overall posture: open to robust science, mixed, or mostly insulated.`;
}

function buildAiPrompt() {
  return promptMode === "all" ? buildAllPromisesAiPrompt() : buildSelectedAiPrompt();
}

function renderClaims() {
  claimButtons.innerHTML = "";

  claims.forEach((claim) => {
    const score = scoreClaim(claim);

    const button = document.createElement("button");
    button.type = "button";
    button.className = `claim-choice${claim.id === selectedClaimId ? " active" : ""}`;
    button.dataset.claimId = claim.id;
    button.setAttribute("aria-pressed", String(claim.id === selectedClaimId));
    button.style.setProperty("--claim-color", claim.color);
    button.innerHTML = `
      <span class="claim-choice-icon">${icons[claim.icon]}</span>
      <span>
        <strong>${escapeHtml(claim.title)}</strong>
        <span>${escapeHtml(claim.short)}</span>
      </span>
      <span class="claim-choice-score">${score}</span>
    `;
    button.addEventListener("click", () => selectClaim(claim.id));
    claimButtons.append(button);
  });
}

function renderPresets() {
  if (!presetGrid) {
    return;
  }

  presetGrid.innerHTML = "";
  claimPresets.forEach((preset) => {
    const targetClaim = getClaim(preset.claimId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preset-button${preset.claimId === selectedClaimId ? " active" : ""}`;
    button.setAttribute("aria-pressed", String(preset.claimId === selectedClaimId));
    button.style.setProperty("--claim-color", targetClaim.color);
    button.innerHTML = `
      <span class="preset-button-copy">
        <strong>${escapeHtml(preset.title)}</strong>
        <span>${escapeHtml(preset.description)}</span>
      </span>
    `;
    button.addEventListener("click", () => selectClaim(preset.claimId));
    presetGrid.append(button);
  });
}

function renderStudies() {
  const claim = getClaim();
  const current = state[claim.id];
  studyGrid.innerHTML = "";

  [...claim.studies, buildCustomStudy(claim)].forEach((study) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `study-card${study.id === current.studyId ? " active" : ""}${study.id === "custom" ? " custom-card" : ""}`;
    card.dataset.studyId = study.id;
    card.setAttribute("aria-pressed", String(study.id === current.studyId));
    card.style.setProperty("--claim-color", claim.color);
    card.innerHTML = `
      <span class="study-score">${study.rigor}/100</span>
      <strong>${escapeHtml(study.title)}</strong>
      <p>${escapeHtml(study.detail)}</p>
      <p>${escapeHtml(study.move)}</p>
      <small>${escapeHtml(study.tier)} - ${escapeHtml(study.effort)}</small>
    `;
    card.addEventListener("click", () => {
      state[claim.id].studyId = study.id;
      update();
    });
    studyGrid.append(card);
  });
}

function renderDatasets() {
  const claim = getClaim();
  datasetList.innerHTML = "";
  datasetActivePromise.textContent = claim.title;

  (datasetSuggestions[claim.id] || []).forEach((item) => {
    const pill = document.createElement("span");
    pill.textContent = item;
    datasetList.append(pill);
  });
}

function renderConfounders() {
  const claim = getClaim();
  if (!confounderList || !confounderActivePromise) {
    return;
  }

  confounderList.innerHTML = "";
  confounderActivePromise.textContent = claim.title;
  (confounderSuggestions[claim.id] || []).forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    confounderList.append(listItem);
  });
}

function renderExcuses() {
  const current = state[selectedClaimId];
  excuseGrid.innerHTML = "";

  excuses.forEach((excuse) => {
    const label = document.createElement("label");
    label.className = "excuse-option";
    label.innerHTML = `
      <input type="checkbox" value="${excuse.id}" ${current.excuses.has(excuse.id) ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(excuse.title)}</strong>
        <span>${escapeHtml(excuse.detail)}</span>
      </span>
    `;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) {
        current.excuses.add(excuse.id);
      } else {
        current.excuses.delete(excuse.id);
      }
      update();
    });
    excuseGrid.append(label);
  });
}

function updateControls() {
  const claim = getClaim();
  const current = state[claim.id];
  const custom = current.customStudy;
  const rules = current.outcomeRules;
  claimText.value = current.text;
  willingnessRange.value = String(current.willingness);
  failureRange.value = String(current.failure);
  willingnessValue.textContent = `${current.willingness}%`;
  failureValue.textContent = `${current.failure}%`;
  customOutcome.value = custom.outcome;
  customComparison.value = custom.comparison;
  customSampleSize.value = custom.sampleSize;
  customBlinding.value = custom.blinding;
  customPreregistered.checked = custom.preregistered;
  customReplication.value = custom.replication;
  customMissRule.value = custom.missRule;
  customStudyScore.textContent = `Custom rigor: ${customStudyRigor(claim)} / 100`;
  useCustomStudyButton.textContent = current.studyId === "custom" ? "Custom active" : "Use custom";
  outcomeFor.value = rules.forClaim;
  outcomeAgainst.value = rules.againstClaim;
  outcomeNeutral.value = rules.neutral;
  if (mindChangeText) {
    mindChangeText.value = current.mindChange || "";
  }
  if (mindChangeNote) {
    mindChangeNote.textContent =
      current.mindChange && current.mindChange.trim().length >= 35
        ? "This pre-commitment is now part of the report and AI prompt."
        : "Make the result specific enough that it cannot be moved after the outcome is known.";
  }
}

function warningForClaim(claim) {
  const current = state[claim.id];
  const activeExcuses = selectedExcuseDetails(claim.id);
  const penalty = excusePenaltyFor(claim.id);
  const excuseNames = activeExcuses.map((excuse) => excuse.title).join(", ");
  const noResultCanLose =
    activeExcuses.some((excuse) => ["no-is-answer", "ordinary-still-divine", "mysterious-timing"].includes(excuse.id)) &&
    current.failure < 45;

  if (activeExcuses.length === 0) {
    return { level: "none", text: "" };
  }

  if (penalty >= 70 || noResultCanLose) {
    return {
      level: "severe",
      text: `Severe warning: ${excuseNames} can make nearly every poor result compatible with the claim. At this point the promise may sound empirical while functioning as unfalsifiable.`,
    };
  }

  if (penalty >= 45 || current.failure < 35) {
    return {
      level: "high",
      text: `High warning: ${excuseNames} substantially weakens the test. A miss is being given less room to count than a hit.`,
    };
  }

  return {
    level: "moderate",
    text: `Warning: ${excuseNames} can make poor results harder to count. The more these responses are allowed, the less the claim is really on the field.`,
  };
}

function renderPromiseMap() {
  if (!promiseMap) {
    return;
  }

  const laneWidth = 100 / claims.length;
  const plottedClaims = claims.map((claim, index) => {
    const current = state[claim.id];
    const study = getStudy(claim);
    const score = scoreClaim(claim);
    const diagnosis = diagnosisFor(score);
    const excusePenalty = excusePenaltyFor(claim.id);
    const excuseCount = current.excuses.size;
    const x = index * laneWidth + laneWidth / 2;
    const size = Math.round(16 + (study.rigor / 100) * 24);
    const opacity = clamp(1 - excusePenalty / 88, 0.42, 1);
    const ringWidth = clamp(2 + excusePenalty / 9 + (score < 50 ? 1.2 : 0), 2, 10);
    const ringColor = excuseCount > 0 ? "#8c3f2d" : score >= 50 ? "#2d6a4f" : "#8b610f";

    return {
      claim,
      current,
      study,
      score,
      diagnosis,
      excuseCount,
      excusePenalty,
      x,
      size,
      opacity,
      ringWidth,
      ringColor,
    };
  });
  const thresholdCount = plottedClaims.filter((item) => item.score >= 50).length;
  const protectedCount = plottedClaims.length - thresholdCount;
  const excuseCount = plottedClaims.reduce((total, item) => total + item.excuseCount, 0);

  promiseMap.setAttribute(
    "aria-label",
    `Promise field map. ${thresholdCount} promises are at or beyond the falsifiability threshold, ${protectedCount} are protected, and ${excuseCount} escape hatches are active across the suite.`,
  );

  promiseMap.innerHTML = `
    <div class="promise-map-axis map-y-axis">Score 0-100</div>
    <div class="promise-map-axis map-x-axis">Promise lanes</div>
    <div class="promise-map-plot">
      ${claims
        .map(
          (claim, index) => `
            <span
              class="promise-map-lane${index % 2 ? " is-alt" : ""}"
              style="left:${index * laneWidth}%; width:${laneWidth}%"
              aria-hidden="true"
            ></span>
          `,
        )
        .join("")}
      ${[0, 25, 50, 75, 100]
        .map((value) => `<span class="promise-map-y-tick" style="bottom:${value}%">${value}</span>`)
        .join("")}
      <span class="promise-map-threshold" style="bottom:50%" aria-hidden="true">
        <span>Falsifiability threshold</span>
      </span>
      ${plottedClaims
        .map((item) => {
          const tooltipId = `promise-map-tip-${item.claim.id}`;
          const label = `${item.claim.title}: score ${item.score}/100, ${item.diagnosis.label}. Study: ${item.study.tier} at ${item.study.rigor}/100 rigor. Willingness: ${item.current.willingness}%. Clean failure: ${item.current.failure}%. Escape hatches: ${item.excuseCount}.`;
          return `
            <button
              type="button"
              class="promise-map-point${item.claim.id === selectedClaimId ? " active" : ""}${item.score > 70 ? " tooltip-below" : ""}"
              data-claim-id="${escapeHtml(item.claim.id)}"
              data-score="${item.score}"
              style="--x:${item.x}; --score:${item.score}; --size:${item.size}px; --alpha:${item.opacity.toFixed(2)}; --claim-color:${item.claim.color}; --ring-width:${item.ringWidth.toFixed(1)}px; --ring-color:${item.ringColor};"
              title="${escapeHtml(label)}"
              aria-label="${escapeHtml(`${label} Activate to edit this promise.`)}"
              aria-describedby="${tooltipId}"
            >
              <span class="promise-map-icon">${icons[item.claim.icon]}</span>
              <span class="promise-map-tooltip" id="${tooltipId}" role="tooltip">
                <strong>${escapeHtml(item.claim.title)}</strong>
                <span>${item.score}/100 · ${escapeHtml(item.diagnosis.label)}</span>
                <span>${escapeHtml(item.study.tier)} · ${item.study.rigor}/100 rigor</span>
                <span>${item.excuseCount ? `${item.excuseCount} escape ${item.excuseCount === 1 ? "hatch" : "hatches"} · ${item.excusePenalty} drag` : "No escape-hatch drag"}</span>
              </span>
            </button>
          `;
        })
        .join("")}
      ${plottedClaims
        .map(
          (item) => `
            <span class="promise-map-x-label" style="left:${item.x}%">
              ${escapeHtml(promiseMapLabels[item.claim.id] || item.claim.title)}
            </span>
          `,
        )
        .join("")}
    </div>
  `;

  promiseMap.querySelectorAll(".promise-map-point").forEach((point) => {
    point.addEventListener("click", () => {
      const claimId = point.dataset.claimId;
      selectClaim(claimId);
      window.requestAnimationFrame(() => {
        const motion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        document.querySelector("#claims")?.scrollIntoView({ behavior: motion, block: "start" });
        document.querySelector(`.claim-choice[data-claim-id="${claimId}"]`)?.focus({ preventScroll: true });
      });
    });
  });
}

function renderAllStanceTable() {
  allStanceTable.innerHTML = "";

  claims.forEach((claim) => {
    const current = state[claim.id];
    const study = getStudy(claim);
    const score = scoreClaim(claim);
    const diagnosis = diagnosisFor(score);
    const row = document.createElement("tr");
    row.className = score >= 50 ? "threshold-passed" : "";
    row.innerHTML = `
      <td>${escapeHtml(claim.title)}</td>
      <td>${score}/100</td>
      <td>${escapeHtml(study.tier)}</td>
      <td>${current.failure}%</td>
      <td>${current.excuses.size}</td>
      <td>${escapeHtml(diagnosis.label)}</td>
    `;
    allStanceTable.append(row);
  });
}

function serializeState() {
  return {
    version: 1,
    selectedClaimId,
    promptMode,
    claims: Object.fromEntries(
      claims.map((claim) => {
        const current = state[claim.id];
        return [
          claim.id,
          {
            studyId: current.studyId,
            willingness: current.willingness,
            failure: current.failure,
            excuses: [...current.excuses],
            text: current.text,
            customStudy: current.customStudy,
            outcomeRules: current.outcomeRules,
            mindChange: current.mindChange,
          },
        ];
      }),
    ),
  };
}

function encodeSharePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeSharePayload(encoded) {
  const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function shareLinkForState() {
  const url = new URL(window.location.href);
  url.hash = `state=${encodeSharePayload(serializeState())}`;
  return url.toString();
}

function applySerializedState(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Missing state object.");
  }

  claims.forEach((claim) => {
    const incoming = payload.claims?.[claim.id];
    if (!incoming) {
      return;
    }

    const current = state[claim.id];
    const validStudyIds = new Set([...claim.studies.map((study) => study.id), "custom"]);
    if (validStudyIds.has(incoming.studyId)) {
      current.studyId = incoming.studyId;
    }
    const incomingWillingness = Number(incoming.willingness);
    const incomingFailure = Number(incoming.failure);
    current.willingness = Number.isFinite(incomingWillingness)
      ? clamp(incomingWillingness, 0, 100)
      : current.willingness;
    current.failure = Number.isFinite(incomingFailure)
      ? clamp(incomingFailure, 0, 100)
      : current.failure;
    current.text = typeof incoming.text === "string" && incoming.text.trim() ? incoming.text : claim.promise;
    current.excuses = new Set(
      Array.isArray(incoming.excuses)
        ? incoming.excuses.filter((id) => excuses.some((excuse) => excuse.id === id))
        : [],
    );
    current.customStudy = {
      ...defaultCustomStudy(claim),
      ...(incoming.customStudy && typeof incoming.customStudy === "object" ? incoming.customStudy : {}),
    };
    if (!sampleSizeOptions[current.customStudy.sampleSize]) {
      current.customStudy.sampleSize = "pilot";
    }
    if (!blindingOptions[current.customStudy.blinding]) {
      current.customStudy.blinding = "open";
    }
    if (!replicationOptions[current.customStudy.replication]) {
      current.customStudy.replication = "single";
    }
    current.customStudy.preregistered = Boolean(current.customStudy.preregistered);
    ["outcome", "comparison", "missRule", "title"].forEach((key) => {
      if (typeof current.customStudy[key] !== "string") {
        current.customStudy[key] = defaultCustomStudy(claim)[key];
      }
    });
    current.outcomeRules = {
      ...defaultOutcomeRules(claim),
      ...(incoming.outcomeRules && typeof incoming.outcomeRules === "object" ? incoming.outcomeRules : {}),
    };
    ["forClaim", "againstClaim", "neutral"].forEach((key) => {
      if (typeof current.outcomeRules[key] !== "string") {
        current.outcomeRules[key] = defaultOutcomeRules(claim)[key];
      }
    });
    current.mindChange =
      typeof incoming.mindChange === "string" && incoming.mindChange.trim()
        ? incoming.mindChange
        : defaultMindChange(claim);
  });

  if (claims.some((claim) => claim.id === payload.selectedClaimId)) {
    selectedClaimId = payload.selectedClaimId;
  }
  promptMode = payload.promptMode === "all" ? "all" : "selected";
  allResultBuilt = promptMode === "all";
}

function loadStateFromHash() {
  if (!window.location.hash.startsWith("#state=")) {
    return;
  }

  try {
    applySerializedState(decodeSharePayload(window.location.hash.slice("#state=".length)));
  } catch {
    if (shareStatus) {
      shareStatus.textContent = "The state link could not be loaded.";
    }
  }
}

function updateMetrics() {
  const claim = getClaim();
  const current = state[claim.id];
  const study = getStudy(claim);
  const score = scoreClaim(claim);
  const diagnosis = diagnosisFor(score);
  const excuseCount = current.excuses.size;
  const excusePenalty = excusePenaltyFor(claim.id);
  const personalAssessment = personalLifeAssessment(score, current, excuseCount);

  document.querySelector("#metric-claim").textContent = claim.title;
  document.querySelector("#metric-claim-detail").textContent = claim.short;
  document.querySelector("#metric-test").textContent = study.tier;
  document.querySelector("#metric-test-detail").textContent = study.move;
  document.querySelector("#metric-excuses").textContent =
    excuseCount === 1 ? "1 active" : `${excuseCount} active`;
  document.querySelector("#metric-excuse-detail").textContent =
    excuseCount === 0
      ? "No protective responses selected."
      : `${excusePenalty} points of protection are pulling left.`;
  document.querySelector("#metric-position").textContent = diagnosis.label;
  document.querySelector("#metric-position-detail").textContent = diagnosis.detail;

  activePromiseTitle.textContent = claim.title;
  activePromiseScore.textContent = `${score} / 100`;
  activePromiseDetail.textContent = claim.short;
  activePromiseStudy.textContent = `Current test: ${study.tier}`;
  activeStudyRigor.textContent = `${study.rigor}/100`;
  activeRunSetting.textContent = `${current.willingness}%`;
  activeFailureSetting.textContent = `${current.failure}%`;
  activeExcuseDrag.textContent = excusePenalty === 0 ? "0" : `-${excusePenalty}`;

  document.querySelector("#diagnosis-title").textContent = diagnosis.title;
  document.querySelector("#diagnosis-body").textContent = diagnosis.body;
  personalLifeTitle.textContent = personalAssessment.title;
  personalLifeBody.textContent = personalAssessment.body;
  document.querySelector("#ledger-study").textContent = study.tier;
  document.querySelector("#ledger-willingness").textContent = `${current.willingness}%`;
  document.querySelector("#ledger-failure").textContent = `${current.failure}%`;
  ledgerExcuses.textContent = excusePenalty === 0 ? "0" : `-${excusePenalty}`;
  document.querySelector("#ledger-score").textContent = `${score} / 100`;

  const warning = document.querySelector("#excuse-warning");
  const warningState = warningForClaim(claim);
  warning.classList.remove("active", "high", "severe");
  if (warningState.level !== "none") {
    warning.classList.add("active");
    if (warningState.level !== "moderate") {
      warning.classList.add(warningState.level);
    }
    warning.textContent = warningState.text;
  } else {
    warning.textContent = "";
  }

  const excusePhrase =
    excuseCount === 0
      ? "with no escape hatches selected"
      : `while still allowing ${excuseCount} escape ${excuseCount === 1 ? "hatch" : "hatches"}`;
  document.querySelector("#audit-sentence").textContent =
    `For "${current.text}", you are allowing "${study.title}", with ${current.willingness}% willingness to run it and ${current.failure}% willingness to let a clean failure count, ${excusePhrase}. Current field position: ${score}/100, ${diagnosis.title.toLowerCase()}.`;

  if (aiPromptOutput) {
    aiPromptOutput.value = buildAiPrompt();
  }
  if (aiPromptMode) {
    aiPromptMode.textContent =
      promptMode === "all" ? "Prompt scope: All promises" : "Prompt scope: Active promise";
  }
  if (useSelectedPromptButton) {
    const selectedMode = promptMode === "selected";
    useSelectedPromptButton.textContent = selectedMode ? "Active promise in use" : "Use active promise";
    useSelectedPromptButton.disabled = selectedMode;
    useSelectedPromptButton.setAttribute("aria-pressed", selectedMode ? "true" : "false");
  }
  if (allPromisesResult) {
    allPromisesResult.textContent = allResultBuilt
      ? buildAllPromisesResult()
      : "Build a comprehensive result to review every promise at once.";
  }
  renderPromiseMap();
  renderAllStanceTable();
  renderReport();
  if (shareStateOutput) {
    shareStateOutput.value = JSON.stringify(serializeState(), null, 2);
  }
}

function selectClaim(claimId) {
  selectedClaimId = claimId;
  update();
}

function showPromptCopiedLabel() {
  if (!copyPromptButton) {
    return;
  }

  copyPromptButton.textContent = "Copied";
  window.clearTimeout(copyPromptResetTimer);
  copyPromptResetTimer = window.setTimeout(() => {
    copyPromptButton.textContent = copyPromptDefaultLabel;
  }, 5000);
}

function update() {
  updateControls();
  renderClaims();
  renderPresets();
  renderStudies();
  renderDatasets();
  renderConfounders();
  renderExcuses();
  updateMetrics();
}

claimText.addEventListener("input", (event) => {
  state[selectedClaimId].text = event.target.value.trim() || getClaim().promise;
  updateMetrics();
});

willingnessRange.addEventListener("input", (event) => {
  state[selectedClaimId].willingness = Number(event.target.value);
  update();
});

failureRange.addEventListener("input", (event) => {
  state[selectedClaimId].failure = Number(event.target.value);
  update();
});

customOutcome.addEventListener("input", (event) => {
  state[selectedClaimId].customStudy.outcome = event.target.value;
  update();
});

customComparison.addEventListener("input", (event) => {
  state[selectedClaimId].customStudy.comparison = event.target.value;
  update();
});

customSampleSize.addEventListener("change", (event) => {
  state[selectedClaimId].customStudy.sampleSize = event.target.value;
  update();
});

customBlinding.addEventListener("change", (event) => {
  state[selectedClaimId].customStudy.blinding = event.target.value;
  update();
});

customPreregistered.addEventListener("change", (event) => {
  state[selectedClaimId].customStudy.preregistered = event.target.checked;
  update();
});

customReplication.addEventListener("change", (event) => {
  state[selectedClaimId].customStudy.replication = event.target.value;
  update();
});

customMissRule.addEventListener("input", (event) => {
  state[selectedClaimId].customStudy.missRule = event.target.value;
  update();
});

useCustomStudyButton.addEventListener("click", () => {
  state[selectedClaimId].studyId = "custom";
  update();
});

outcomeFor.addEventListener("input", (event) => {
  state[selectedClaimId].outcomeRules.forClaim = event.target.value;
  updateMetrics();
});

outcomeAgainst.addEventListener("input", (event) => {
  state[selectedClaimId].outcomeRules.againstClaim = event.target.value;
  updateMetrics();
});

outcomeNeutral.addEventListener("input", (event) => {
  state[selectedClaimId].outcomeRules.neutral = event.target.value;
  updateMetrics();
});

mindChangeText?.addEventListener("input", (event) => {
  state[selectedClaimId].mindChange = event.target.value;
  if (mindChangeNote) {
    mindChangeNote.textContent =
      state[selectedClaimId].mindChange.trim().length >= 35
        ? "This pre-commitment is now part of the report and AI prompt."
        : "Make the result specific enough that it cannot be moved after the outcome is known.";
  }
  updateMetrics();
});

buildAllResultButton?.addEventListener("click", () => {
  promptMode = "all";
  allResultBuilt = true;
  updateMetrics();
});

useSelectedPromptButton?.addEventListener("click", () => {
  promptMode = "selected";
  updateMetrics();
});

copyPromptButton?.addEventListener("click", async () => {
  if (!aiPromptOutput || !copyStatus) {
    return;
  }

  try {
    await navigator.clipboard.writeText(aiPromptOutput.value);
    showPromptCopiedLabel();
    copyStatus.textContent = "Prompt copied.";
  } catch {
    aiPromptOutput.focus();
    aiPromptOutput.select();
    const copied = document.execCommand("copy");
    if (copied) {
      showPromptCopiedLabel();
    }
    copyStatus.textContent = copied ? "Prompt copied." : "Select the prompt text and copy it manually.";
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
});

copyReportButton?.addEventListener("click", async () => {
  if (!reportStatus) {
    return;
  }

  try {
    await navigator.clipboard.writeText(buildReportText());
    reportStatus.textContent = "Report copied.";
  } catch {
    reportStatus.textContent = "Copy failed. Select the report text or use Print.";
  }

  window.setTimeout(() => {
    reportStatus.textContent = "";
  }, 2200);
});

printReportButton?.addEventListener("click", () => {
  window.print();
});

copyShareLinkButton?.addEventListener("click", async () => {
  if (!shareStatus) {
    return;
  }

  try {
    await navigator.clipboard.writeText(shareLinkForState());
    shareStatus.textContent = "State link copied.";
  } catch {
    shareStatus.textContent = "Copy failed. Export JSON is still available.";
  }

  window.setTimeout(() => {
    shareStatus.textContent = "";
  }, 2200);
});

exportJsonButton?.addEventListener("click", () => {
  if (!shareStateOutput || !shareStatus) {
    return;
  }

  shareStateOutput.value = JSON.stringify(serializeState(), null, 2);
  shareStateOutput.focus();
  shareStateOutput.select();
  shareStatus.textContent = "JSON shown below. Copy it to save or share this audit state.";
});

loadJsonButton?.addEventListener("click", () => {
  if (!shareStateOutput || !shareStatus) {
    return;
  }

  try {
    applySerializedState(JSON.parse(shareStateOutput.value));
    shareStatus.textContent = "Saved JSON restored.";
    update();
  } catch {
    shareStatus.textContent = "Could not restore that JSON. Check that the full saved JSON is pasted below.";
  }
});

loadStateFromHash();
update();
