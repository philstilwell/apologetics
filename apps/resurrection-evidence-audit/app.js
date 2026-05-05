const claimPresets = [
  {
    id: "resurrection",
    title: "Jesus bodily resurrected",
    claim:
      "Jesus was bodily raised by the Christian God, and the Gospel resurrection traditions reliably point to that event.",
    prior: {
      general: 20,
      targeting: 1,
      actType: 0.5,
      unknownReserve: 10,
    },
    evidence: [
      {
        id: "crucifixion",
        title: "Crucifixion",
        type: "background",
        note: "This establishes the setting, but it is expected whether or not a resurrection happened.",
        pTrue: 95,
        pAlt: 90,
        weight: 100,
      },
      {
        id: "appearances",
        title: "Post-mortem appearance reports",
        type: "testimony",
        note: "This is a major pressure point. The comparison side must include grief visions, memory, rumor, and communal reinforcement.",
        pTrue: 90,
        pAlt: 20,
        weight: 55,
      },
      {
        id: "conversions",
        title: "Conversions and costly commitment",
        type: "testimony",
        note: "Sincerity can show that people truly believed, but sincere belief is not the same as event accuracy.",
        pTrue: 70,
        pAlt: 10,
        weight: 70,
      },
      {
        id: "empty-tomb",
        title: "Empty tomb tradition",
        type: "literary",
        note: "The comparison side includes mislocation, reburial, theological story-shaping, and later development.",
        pTrue: 60,
        pAlt: 20,
        weight: 60,
      },
      {
        id: "movement-growth",
        title: "Early creed and movement growth",
        type: "social",
        note: "Growth, slogans, and community persistence can happen in sincere movements even when the central interpretation is mistaken.",
        pTrue: 65,
        pAlt: 45,
        weight: 50,
      },
    ],
  },
  {
    id: "car-crash-demon",
    title: "Teaching parallel: demon turned the wheel",
    claim:
      "A car crashed because a demon physically turned the steering wheel, rather than because of standard causes such as mechanical failure, swerving to avoid an animal, falling asleep, distraction, or road conditions.",
    prior: {
      general: 12,
      targeting: 0.6,
      actType: 0.15,
      unknownReserve: 20,
    },
    claimCopy:
      "Use this teaching example to compare a specific non-material claim with standard crash explanations. The point is to see why a dramatic explanation must do more than say, 'the cause is unclear.'",
    startingCopy:
      "Before counting crash details or testimony, ask how plausible this exact kind of cause is. The sliders translate probability notation into direct questions.",
    startingHelpOne:
      "These sliders ask what the demon-wheel claim should receive before the crash evidence is added. A broad belief in spiritual beings does not automatically make this exact crash demon-caused.",
    generalPriorLabel: "How open are you to demon action in general?",
    generalPriorHelper:
      "Higher means you already consider demon action in the physical world plausible.",
    targetingPenaltyLabel: "How much of that openness applies to this exact crash?",
    targetingPenaltyHelper:
      "Lower means the claim is very specific: this demon, this car, this road, this moment.",
    actTypeRateLabel: "How common is this kind of demon-caused event?",
    actTypeRateHelper:
      "Lower means demon-caused steering is rare even before this crash is considered.",
    unknownReserveHelper:
      "Higher means you are preserving room for mechanical, driver, road, animal, or unknown causes.",
    unknownNotesLabel: "What ordinary crash explanations might still be missing?",
    unknownNotesPlaceholder:
      "Example: intermittent steering fault, tire defect, medication, glare, road debris, panic reaction, incomplete inspection, or a cause no one has identified yet.",
    alternativeTitle: "Teaching parallel: test the demon-wheel claim",
    alternativeCopy:
      "The crash is real, but the cause is disputed. This preset asks whether the evidence selects a demon rather than standard crash causes.",
    alternativeLabel: "Competing crash explanations",
    alternativesHelpTitle: "Why the crash alternatives matter",
    alternativesHelpOne:
      "The alternative is not simply 'the driver lied.' A driver can be sincere and still misinterpret a sudden crash caused by steering failure, a tire problem, an animal, fatigue, distraction, or the road.",
    alternativesHelpTwo:
      "Mark a crash explanation as strong when it fits the details. Treat it as ruled out only when the evidence actually rules it out, not because it makes the demon claim harder to defend.",
    alternativeReportLabel: "Ordinary crash-explanation strength",
    trueEvidenceHelper:
      "Set this high only if the evidence would be expected if a demon really turned the wheel.",
    altEvidenceHelper:
      "Set this high if mechanical failure, an animal swerve, sleep, distraction, or road conditions could still account for it.",
    weightEvidenceHelper:
      "Set this lower when details come from the same person, same memory, same camera angle, or same investigation.",
    startingPointKind: "specific demon-wheel claim",
    borrowingTitle: "The claim may borrow too much from general supernatural openness",
    borrowingBody:
      "Being open to spirits or demons in general is not the same as support for this demon, this road, this moment, and this physical steering claim.",
    suppressedPathName: "standard crash path",
    alternativeStrongTitle: "Ordinary crash explanations remain strong",
    alternativeStrongBody:
      "The selected crash features still fit mechanical failure, animal avoidance, fatigue, distraction, or road conditions better than the demon-turning-the-wheel claim.",
    comparisonRepairBody:
      "Check steering and tires, road evidence, animal signs, fatigue, distraction, phone data, and witness timing before treating a demon as the best explanation.",
    overlapRepairBody:
      "Reduce independence for details that come from the same driver, witness conversation, camera angle, police report, or repair inspection.",
    specificityRepairBody:
      "Separate general openness to non-material causes from this demon, this car, this road, this moment, and this physical steering claim.",
    aiAuditLine:
      "You are auditing a non-material claim using a car-crash teaching parallel for accessible probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
    aiCheckHint:
      "Checks to apply: inflated baseline confidence, specificity cost, suppressed standard crash causes, false independence, sincere testimony vs event cause, transfer from an unexplained crash to a demon cause, truncated alternatives, missing unknown reserve, neutral evidence, and fragility.",
    reportTitle: "# Crosshairs Teaching Parallel Audit",
    evidence: [
      {
        id: "crash-happened",
        title: "The crash happened",
        type: "background",
        note: "The crash itself is expected under both a demon claim and standard crash explanations; it does not distinguish between them.",
        pTrue: 98,
        pAlt: 98,
        weight: 100,
      },
      {
        id: "sudden-swerve",
        title: "Sudden wheel movement",
        type: "event detail",
        note: "A sudden turn fits the demon story, but it also fits a driver swerving, a steering problem, a tire problem, or a startled correction.",
        pTrue: 85,
        pAlt: 75,
        weight: 75,
      },
      {
        id: "driver-reports-force",
        title: "Driver says the wheel was pulled",
        type: "testimony",
        note: "The driver may be sincere, but shock and memory can transform 'I lost control' into 'something grabbed the wheel.'",
        pTrue: 80,
        pAlt: 35,
        weight: 55,
      },
      {
        id: "no-obvious-cause",
        title: "No obvious cause at first",
        type: "unknowns",
        note: "Not seeing a cause right away is not the same as ruling out mechanical failure, fatigue, animal avoidance, distraction, or road conditions.",
        pTrue: 65,
        pAlt: 60,
        weight: 70,
      },
      {
        id: "prior-demon-belief",
        title: "Demon explanation appears quickly",
        type: "social",
        note: "A community may quickly interpret an unclear event through its existing beliefs. That can explain the label without establishing the cause.",
        pTrue: 70,
        pAlt: 75,
        weight: 40,
      },
    ],
  },
  {
    id: "modern-miracle",
    title: "Modern miracle report",
    claim:
      "A reported modern miracle is best explained as a supernatural intervention by the Christian God.",
    prior: {
      general: 18,
      targeting: 4,
      actType: 1.5,
      unknownReserve: 12,
    },
    alternativeTitle: "Keep modern miracle alternatives visible",
    alternativeCopy:
      "A striking report may still fit ordinary recovery, diagnostic uncertainty, memory, selection effects, timing coincidence, or an unexplained but not-yet-attributed cause.",
    alternativeLabel: "Modern miracle alternative strength",
    alternativesHelpTitle: "Why modern miracle alternatives matter",
    alternativesHelpOne:
      "The alternative is not simply 'the witness lied.' Honest people can report a real improvement while the cause remains ordinary, uncertain, selectively reported, or misattributed.",
    alternativesHelpTwo:
      "Treat an alternative as weak only when the records, timing, base rates, and missing-case problem have been handled directly.",
    alternativeReportLabel: "Modern miracle alternative strength",
    suppressedPathName: "non-miracle path",
    alternativeStrongTitle: "Modern miracle alternatives remain strong",
    alternativeStrongBody:
      "The selected medical, reporting, timing, and attribution alternatives still fit the miracle report without requiring the specific supernatural conclusion.",
    comparisonRepairBody:
      "Add base rates, diagnostic uncertainty, natural recovery, treatment effects, selective reporting, unreported misses, timing coincidence, and unknowns before judging how surprising the evidence is without a miracle.",
    overlapRepairBody:
      "Reduce independence for reports that come from the same witness network, church community, medical summary, media story, or retelling chain.",
    specificityRepairBody:
      "Separate a generally unusual event from this intervention, this deity, this timing, this purpose, and this doctrinal interpretation.",
    evidence: [
      {
        id: "testimony",
        title: "Witness testimony",
        type: "testimony",
        note: "Confidence, sincerity, and event accuracy need to be separated.",
        pTrue: 85,
        pAlt: 25,
        weight: 70,
      },
      {
        id: "medical",
        title: "Medical or external record",
        type: "public",
        note: "Independent documentation matters, but an unexplained recovery is not automatically a specific Christian intervention.",
        pTrue: 75,
        pAlt: 35,
        weight: 85,
      },
      {
        id: "specific-prayer",
        title: "Specific prayer timing",
        type: "timing",
        note: "Timing evidence should include selection effects, unreported misses, and how wide the target was.",
        pTrue: 70,
        pAlt: 30,
        weight: 65,
      },
      {
        id: "attribution",
        title: "Christian attribution",
        type: "specificity",
        note: "Moving from an unusual event to a specific deity or doctrine adds an additional burden.",
        pTrue: 80,
        pAlt: 55,
        weight: 50,
      },
    ],
  },
  {
    id: "prayer-answer",
    title: "Answered prayer",
    claim:
      "A specific positive outcome occurred because God answered Christian prayer.",
    prior: {
      general: 15,
      targeting: 6,
      actType: 2,
      unknownReserve: 15,
    },
    alternativeTitle: "Keep answered-prayer alternatives visible",
    alternativeCopy:
      "A desired outcome can occur after prayer because of base rates, ordinary causes, broad target framing, selective memory, unreported misses, or later interpretation.",
    alternativeLabel: "Answered-prayer alternative strength",
    alternativesHelpTitle: "Why answered-prayer alternatives matter",
    alternativesHelpOne:
      "The alternative is not simply 'nothing happened.' The outcome may be real while the causal story remains ordinary, uncertain, or shaped by how the request was remembered.",
    alternativesHelpTwo:
      "Treat prayer as strongly supported only when misses, base rates, timing flexibility, ordinary causes, and interpretation after the fact have been handled fairly.",
    alternativeReportLabel: "Answered-prayer alternative strength",
    suppressedPathName: "ordinary-outcome path",
    alternativeStrongTitle: "Answered-prayer alternatives remain strong",
    alternativeStrongBody:
      "The selected ordinary-outcome, timing, memory, and selection alternatives still fit the prayer report without requiring divine causation.",
    comparisonRepairBody:
      "Add base rates, unreported misses, ordinary causes, timing flexibility, broad or vague requests, community reinforcement, retrospective fitting, and unknowns before treating prayer as the best explanation.",
    overlapRepairBody:
      "Reduce independence for reports that come from the same person, prayer group, church network, testimony setting, or retelling chain.",
    specificityRepairBody:
      "Separate general belief that God may answer prayer from this request, this timing, this outcome, this interpretation, and this causal claim.",
    evidence: [
      {
        id: "desired-outcome",
        title: "Desired outcome occurred",
        type: "outcome",
        note: "The ordinary probability of the outcome matters before prayer is treated as the explanation.",
        pTrue: 70,
        pAlt: 45,
        weight: 80,
      },
      {
        id: "specific-request",
        title: "Specific request matched outcome",
        type: "timing",
        note: "Specific matches matter more when misses, base rates, and search width are visible.",
        pTrue: 75,
        pAlt: 35,
        weight: 70,
      },
      {
        id: "community-confidence",
        title: "Community confidence",
        type: "social",
        note: "Shared confidence can stabilize an interpretation without adding much event-level discrimination.",
        pTrue: 80,
        pAlt: 60,
        weight: 45,
      },
      {
        id: "no-clear-alternative",
        title: "No clear alternative named",
        type: "unknowns",
        note: "Failing to name an alternative is not the same as eliminating the comparison side.",
        pTrue: 70,
        pAlt: 50,
        weight: 55,
      },
    ],
  },
];

const posturePresets = {
  generous: {
    prior: {
      general: 55,
      targeting: 18,
      actType: 8,
      unknownReserve: 2,
    },
    evidence: {
      pTrueBoost: 1.12,
      pAltFactor: 0.18,
      weightFloor: 88,
    },
  },
  corrected: {
    evidence: {
      pTrueBoost: 1,
      pAltFactor: 1,
      weightFloor: null,
    },
  },
};

const resurrectionAlternativeFeatures = [
  {
    id: "decades-late",
    title: "Decades-late composition",
    ratio: 3,
    note: "Later narrative crystallization is easier to understand if memory and tradition developed after the crisis.",
    detail:
      "Later composition gives memory, preaching needs, and community interpretation time to shape the story. That does not prove invention. It does mean the audit should ask whether each detail is early, independent reporting or later community interpretation.",
  },
  {
    id: "scripture-wrap",
    title: "Scriptural fulfillment framing",
    ratio: 3,
    note: "Heavy fulfillment framing is expected when a community rereads defeat as vindication.",
    detail:
      "When a story is strongly framed as fulfillment of scripture, the wording may reflect theological interpretation as much as memory. The key question is whether fulfillment language is independent evidence for the event or evidence that later believers interpreted the event through scripture.",
  },
  {
    id: "grief-visions",
    title: "Grief-aligned appearances",
    ratio: 2.5,
    note: "Bereavement experiences and visionary interpretation are ordinary human mechanisms.",
    detail:
      "Bereavement and crisis experiences can feel vivid and real. This alternative matters because sincere appearance reports can arise without fraud and without a bodily resurrection. If the evidence is mainly testimony to experiences, the audit should not treat sincerity as the same thing as event accuracy.",
  },
  {
    id: "communal-reinforcement",
    title: "Communal reinforcement",
    ratio: 2,
    note: "Tight groups can harmonize and intensify meaning without deliberate fraud.",
    detail:
      "A close community can stabilize one interpretation through worship, repetition, and shared expectation. That can make a belief stronger without making the original event more likely. The audit should ask whether repeated agreement comes from independent checks or from one community reinforcing the same interpretation.",
  },
  {
    id: "physicalization",
    title: "Increasing physical detail",
    ratio: 2.5,
    note: "A movement toward concrete apologetic detail fits developing tradition.",
    detail:
      "As debates develop, traditions can gain concrete details that answer objections. More physical detail may reflect apologetic development rather than independent confirmation. The audit should ask whether the added detail comes from new evidence or from later storytelling that answers doubts.",
  },
  {
    id: "thin-corroboration",
    title: "Thin outside confirmation",
    ratio: 2,
    note: "Limited public confirmation is more expected when the claim grows inside a proclamation stream.",
    detail:
      "If a public miracle occurred, outside confirmation would be expected to some degree. Thin external support does not disprove the claim, but it keeps the alternative explanation alive. The audit should ask what neutral observers, public records, or independent sources would be expected if the event happened as described.",
  },
  {
    id: "early-creed",
    title: "Early creed slogans",
    ratio: 0.8,
    note: "Early summaries can favor reportage somewhat, but they are still insider proclamation.",
    detail:
      "Early summaries are relevant because they reduce the time available for later invention. They still need care because slogans can preserve proclamation without preserving independent detail. The audit should separate early belief from early, checkable evidence for the exact event.",
  },
  {
    id: "transformation",
    title: "Follower transformation",
    ratio: 2,
    note: "Renewed zeal after disconfirmation is historically familiar and does not settle truth by itself.",
    detail:
      "Changed lives can show sincere conviction and social impact. They do not by themselves show that the central interpretation of the experience was correct. The audit should ask whether transformation supports the event itself or mainly supports the followers' confidence.",
  },
  {
    id: "source-dependence",
    title: "Source dependence",
    ratio: 1.5,
    note: "Shared sources reduce the force of apparent multiplicity.",
    detail:
      "Multiple texts may not mean multiple independent sources if they share traditions, wording, communities, or theological aims. The audit should lower the independence of evidence when later reports may be drawing from the same memory stream or source tradition.",
  },
  {
    id: "no-conspiracy",
    title: "No conspiracy required",
    ratio: 1.3,
    note: "Sincere meaning-making avoids the false choice between miracle and deliberate lie.",
    detail:
      "The alternative does not require a deliberate fraud. Sincere interpretation, memory, and group reinforcement can explain confidence without a planned deception. The audit should avoid the false choice that the witnesses were either perfectly accurate or intentionally lying.",
  },
];

const crashAlternativeFeatures = [
  {
    id: "mechanical-failure",
    title: "Mechanical failure",
    ratio: 4,
    note: "A steering, tire, brake, suspension, or warning-light problem can cause a sudden loss of control.",
    detail:
      "A fault in steering, tires, brakes, suspension, or electronics can create a sudden loss of control. This alternative should stay live until inspection evidence rules it out. A demon claim needs more than a damaged car and frightened testimony; it needs evidence that points away from ordinary failure.",
  },
  {
    id: "animal-swerve",
    title: "Swerving to miss an animal",
    ratio: 3,
    note: "A sudden steering move is common when a driver reacts to a deer, dog, or other animal near the road.",
    detail:
      "Drivers often react before they can clearly identify what entered the road. A sudden swerve can fit animal avoidance even without perfect memory afterward. The audit should ask whether road marks, witness statements, or the driver's reaction pattern fit an ordinary evasive move.",
  },
  {
    id: "falling-asleep",
    title: "Falling asleep or microsleep",
    ratio: 3.5,
    note: "Fatigue can cause lane drift, late correction, and a crash without much braking or clear memory.",
    detail:
      "Fatigue and microsleep can cause drift, delayed correction, and patchy recall. This can make the driver's later explanation sincere but mistaken. The audit should ask about time of day, sleep history, braking evidence, and whether the crash pattern fits a lapse in awareness.",
  },
  {
    id: "driver-distraction",
    title: "Driver distraction",
    ratio: 2.5,
    note: "A phone, passenger, dashboard control, or momentary attention lapse can explain delayed reaction.",
    detail:
      "Attention lapses from a phone, passenger, dashboard control, or outside stimulus can explain delayed response without requiring a non-material cause. The audit should ask whether the driver had any ordinary reason not to notice the danger until too late.",
  },
  {
    id: "road-conditions",
    title: "Road or weather conditions",
    ratio: 2,
    note: "Wet pavement, gravel, ice, a curve, or poor visibility can make ordinary control loss more likely.",
    detail:
      "Wet pavement, gravel, ice, curves, glare, or poor visibility can make ordinary loss of control more likely. The audit should ask whether the road environment made a normal mistake or skid more expected before reaching for a non-material explanation.",
  },
  {
    id: "stress-memory",
    title: "Stress-shaped memory",
    ratio: 2.5,
    note: "After a frightening crash, a sincere driver may remember force, grabbing, or pulling more vividly than the mechanics of the event.",
    detail:
      "After a frightening crash, memory may emphasize force or being pulled. This matters because the driver can be honest while the interpretation becomes less reliable. The audit should separate what the driver experienced from what actually caused the wheel to turn.",
  },
  {
    id: "demon-specificity",
    title: "Extra specificity of the demon claim",
    ratio: 3,
    note: "Moving from 'the cause is unclear' to 'a demon turned the wheel' adds a very specific claim that needs its own support.",
    detail:
      "The step from 'the cause is unclear' to 'a demon turned the wheel' is a large interpretive jump. The specific demon claim needs evidence beyond the absence of an obvious cause. The audit should ask what would distinguish a demon from mechanical failure, fatigue, distraction, or unknown ordinary causes.",
  },
];

const modernMiracleAlternativeFeatures = [
  {
    id: "ordinary-recovery",
    title: "Ordinary recovery or fluctuation",
    ratio: 3.5,
    note: "Some conditions improve, fluctuate, remit, or respond to treatment without needing a miracle explanation.",
    detail:
      "A recovery can be real and still have an ordinary medical pathway. The audit should ask about the condition's natural history, treatment, regression to the mean, delayed improvement, and whether similar recoveries occur without the religious context.",
  },
  {
    id: "diagnostic-uncertainty",
    title: "Diagnostic uncertainty",
    ratio: 3,
    note: "Initial reports may overstate certainty about diagnosis, prognosis, timing, or what changed.",
    detail:
      "Medical language can sound more exact than the evidence allows. The audit should ask whether the diagnosis was confirmed, whether records are complete, and whether the alleged change is measured or mainly described by memory.",
  },
  {
    id: "selective-reporting",
    title: "Selective reporting",
    ratio: 3,
    note: "Successful stories travel farther than misses, ambiguous cases, and similar non-miracle recoveries.",
    detail:
      "A community may remember the striking positive case while forgetting prayers that were followed by ordinary outcomes or no improvement. The audit should ask what comparison pool is visible and what cases are missing.",
  },
  {
    id: "testimony-memory",
    title: "Testimony and memory shaping",
    ratio: 2.5,
    note: "Sincere witnesses can simplify timelines, intensify details, or retell the case through later meaning.",
    detail:
      "Witness confidence matters, but memory can change as a story is repeated. The audit should separate honest experience from accurate sequence, exact medical fact, and correct causal interpretation.",
  },
  {
    id: "timing-coincidence",
    title: "Timing coincidence",
    ratio: 2.5,
    note: "Prayer or ritual may happen near an improvement without causing the improvement.",
    detail:
      "When many people pray over time, some prayer will occur near an improvement by chance. The audit should ask how wide the timing window is and whether similar timing is counted when no improvement follows.",
  },
  {
    id: "attribution-specificity",
    title: "Specific Christian attribution",
    ratio: 2,
    note: "Moving from unusual recovery to a specific divine cause adds a further claim.",
    detail:
      "Even if the event remains partly unexplained, the step to 'therefore the Christian God did this' needs its own support. The audit should ask what distinguishes that conclusion from unknown natural causes or other possible interpretations.",
  },
];

const prayerAlternativeFeatures = [
  {
    id: "ordinary-outcome-rate",
    title: "Ordinary outcome rate",
    ratio: 3.2,
    note: "Desired outcomes sometimes occur without prayer being the cause.",
    detail:
      "Before treating prayer as causal, the audit should ask how often the outcome happens anyway. A low-visibility base rate can make ordinary events feel more evidential than they are.",
  },
  {
    id: "unreported-misses",
    title: "Unreported misses",
    ratio: 3,
    note: "Answered-prayer stories often leave out prayers followed by no clear answer.",
    detail:
      "If only hits are remembered, the evidence pool is distorted. The audit should ask how many similar prayers were made, how many did not receive the desired outcome, and whether those misses are counted with the same care.",
  },
  {
    id: "broad-request-window",
    title: "Broad request or timing window",
    ratio: 2.4,
    note: "A request can be flexible enough that many outcomes later look like a match.",
    detail:
      "The wider the request and timing window, the easier it is to find a fit afterward. The audit should ask whether the expected outcome was specific, measurable, and time-bounded before the result occurred.",
  },
  {
    id: "ordinary-causes",
    title: "Ordinary causes of the outcome",
    ratio: 2.8,
    note: "Other people, planning, treatment, luck, or background processes may explain the result.",
    detail:
      "A good outcome may have ordinary causal contributors. The audit should ask what practical actions, medical factors, social help, prior trends, or chance processes were already in motion.",
  },
  {
    id: "retrospective-fitting",
    title: "Retrospective fitting",
    ratio: 2.3,
    note: "After a good outcome, people may reinterpret the original request to fit what happened.",
    detail:
      "Meaning can be found after the fact. The audit should ask what the request meant before the outcome and whether a different result would also have been interpreted as an answer.",
  },
  {
    id: "community-reinforcement-prayer",
    title: "Community reinforcement",
    ratio: 2,
    note: "A group can stabilize the prayer interpretation through testimony, worship, and repetition.",
    detail:
      "Shared celebration can strengthen confidence without adding independent causal evidence. The audit should ask whether the claim rests on separate checks or on one community repeating a preferred interpretation.",
  },
];

const defaultPresetText = {
  reportTitle: "# Crosshairs Resurrection Evidence Audit",
  claimCopy:
    "Start with the exact claim. A modest claim requires less support; a highly specific miracle claim carries a heavier burden.",
  startingCopy:
    "Before counting testimony or stories, ask how plausible this specific kind of event is. The sliders translate formal probability ideas into direct questions.",
  startingHelpTitle: "How to calibrate these sliders",
  startingHelpOne:
    "These sliders ask what the claim should receive before the specific evidence is added. A broad belief that God may exist does not automatically make one exact miracle likely.",
  startingHelpTwo:
    "Adjust them deliberately. If you raise one slider, identify what fact justifies the higher number. If the reason is only 'I already believe this,' the slider may be too generous.",
  generalPriorLabel: "How open are you to divine action in general?",
  generalPriorHelper:
    "Higher means you already consider divine action in the world broadly plausible.",
  targetingPenaltyLabel: "How much of that openness applies to this exact claim?",
  targetingPenaltyHelper:
    "Lower means the claim is very specific: this person, this time, this purpose.",
  actTypeRateLabel: "How common is this kind of event?",
  actTypeRateHelper:
    "Lower means events like this are rare even before this case is considered.",
  unknownReserveLabel: "How much room remains for unconceived explanations?",
  unknownReserveHelper:
    "Higher means you are preserving room for missing causes, incomplete records, or explanations you may not have considered yet.",
  unknownNotesLabel: "What might be missing from the comparison side?",
  unknownNotesPlaceholder:
    "Example: missing records, ordinary causes not listed, mistaken timing, social pressure, source dependence, selection effects, or mechanisms we have not yet imagined.",
  alternativeTitle: "Keep serious alternatives visible",
  alternativeCopy:
    "The alternative is not merely 'they lied.' It can include grief, dissonance, memory, scriptural rereading, and community reinforcement.",
  alternativeLabel: "Alternative pathway strength",
  alternativesHelpTitle: "Why the alternative pathway matters",
  alternativesHelpOne:
    "The alternative is not simply 'everyone lied.' People can be sincere and still interpret events through grief, group pressure, memory, scripture, or later storytelling.",
  alternativesHelpTwo:
    "Mark a pathway as strong when it clearly fits the evidence. Treat it as ruled out only when you have a reason, not just because it makes the miracle claim harder to defend.",
  alternativeReportLabel: "Sincere meaning-making pathway strength",
  trueEvidenceHelper:
    "Set this high only if the evidence would be expected under the miracle claim.",
  altEvidenceHelper:
    "Set this high if ordinary causes, memory, grief, rumor, or story growth could also account for it.",
  weightEvidenceHelper:
    "Set this lower when sources share the same people, texts, memories, or community.",
  startingPointKind: "specific miracle",
  borrowingTitle: "The claim may borrow too much from generic theism",
  borrowingBody:
    "Belief that God might exist is not the same as support for this person, this event, this purpose, and this doctrine.",
  suppressedPathName: "non-miracle path",
  alternativeStrongTitle: "Sincere meaning-making remains a strong alternative",
  alternativeStrongBody:
    "The selected psychology and tradition-development features strongly fit a sincere post-crisis interpretation pathway.",
  comparisonRepairBody:
    "Add grief visions, rumor growth, memory distortion, literary development, social reinforcement, selection effects, and unknowns before judging how surprising the evidence is without a miracle.",
  overlapRepairBody:
    "Reduce independence for sources or traditions that share a community, text, memory stream, or apologetic purpose.",
  specificityRepairBody:
    "Separate general openness to God from this person, this time, this kind of act, and this Christian interpretation.",
  aiAuditLine:
    "You are auditing a Christian evidential claim for accessible probabilistic rigor. Do not merely affirm or deny the claim. Stress-test the model.",
  aiCheckHint:
    "Checks to apply: inflated baseline confidence, specificity cost, suppressed alternatives, false independence, sincerity vs event accuracy, transfer from ordinary details to miracle truth, truncated alternatives, missing unknown reserve, neutral evidence, and fragility.",
};

const state = {
  presetId: claimPresets[0].id,
  evidence: [],
  featureWeights: new Map(resurrectionAlternativeFeatures.map((feature) => [feature.id, 1])),
};

const els = {
  preset: document.querySelector("#claim-preset"),
  claim: document.querySelector("#claim-text"),
  claimCopy: document.querySelector("#claim-copy"),
  startingCopy: document.querySelector("#starting-copy"),
  startingHelpTitle: document.querySelector("#starting-help-title"),
  startingHelpOne: document.querySelector("#starting-help-one"),
  startingHelpTwo: document.querySelector("#starting-help-two"),
  generalPrior: document.querySelector("#general-prior"),
  generalPriorLabel: document.querySelector("#general-prior-label"),
  generalPriorHelper: document.querySelector("#general-prior-helper"),
  targetingPenalty: document.querySelector("#targeting-penalty"),
  targetingPenaltyLabel: document.querySelector("#targeting-penalty-label"),
  targetingPenaltyHelper: document.querySelector("#targeting-penalty-helper"),
  actTypeRate: document.querySelector("#act-type-rate"),
  actTypeRateLabel: document.querySelector("#act-type-rate-label"),
  actTypeRateHelper: document.querySelector("#act-type-rate-helper"),
  unknownReserve: document.querySelector("#unknown-reserve"),
  unknownReserveLabel: document.querySelector("#unknown-reserve-label"),
  unknownReserveHelper: document.querySelector("#unknown-reserve-helper"),
  unknownNotes: document.querySelector("#unknown-notes"),
  unknownNotesLabel: document.querySelector("#unknown-notes-label"),
  ledgerList: document.querySelector("#ledger-list"),
  featureGrid: document.querySelector("#feature-grid"),
  loadGenerous: document.querySelector("#load-generous"),
  loadCorrected: document.querySelector("#load-corrected"),
  loadTeachingParallel: document.querySelector("#load-teaching-parallel"),
  resetCurrent: document.querySelector("#reset-current"),
  startingConfidence: document.querySelector("#starting-confidence"),
  evidenceAdded: document.querySelector("#evidence-added"),
  updatedConfidence: document.querySelector("#updated-confidence"),
  updatedConfidenceNote: document.querySelector("#updated-confidence-note"),
  neededForHigh: document.querySelector("#needed-for-high"),
  neededForHighNote: document.querySelector("#needed-for-high-note"),
  topDriver: document.querySelector("#top-driver"),
  alternativeTitle: document.querySelector("#alternatives-title"),
  alternativeCopy: document.querySelector("#alternatives-copy"),
  alternativeStrengthLabel: document.querySelector("#alternative-strength-label"),
  alternativeStrength: document.querySelector("#alternative-strength"),
  alternativesHelpTitle: document.querySelector("#alternatives-help-title"),
  alternativesHelpOne: document.querySelector("#alternatives-help-one"),
  alternativesHelpTwo: document.querySelector("#alternatives-help-two"),
  resultCopy: document.querySelector("#result-copy"),
  auditScore: document.querySelector("#audit-score"),
  auditSummary: document.querySelector("#audit-summary"),
  scoreRing: document.querySelector("#score-ring"),
  floatingAuditScore: document.querySelector("#floating-audit-score"),
  floatingScoreRing: document.querySelector("#floating-score-ring"),
  unknownReserveRingNote: document.querySelector("#unknown-reserve-ring-note"),
  credenceDonut: document.querySelector("#credence-donut"),
  credenceClaimValue: document.querySelector("#credence-claim-value"),
  credenceClaimLabel: document.querySelector("#credence-claim-label"),
  credenceMaterialLabel: document.querySelector("#credence-material-label"),
  credenceUnknownLabel: document.querySelector("#credence-unknown-label"),
  floatingCredenceDonut: document.querySelector("#floating-credence-donut"),
  floatingCredenceClaim: document.querySelector("#floating-credence-claim"),
  floatingCredenceMaterial: document.querySelector("#floating-credence-material"),
  floatingCredenceUnknown: document.querySelector("#floating-credence-unknown"),
  pitfallList: document.querySelector("#pitfall-list"),
  repairList: document.querySelector("#repair-list"),
  mathStarting: document.querySelector("#math-starting"),
  mathUpdated: document.querySelector("#math-updated"),
  mathBf: document.querySelector("#math-bf"),
  mathOdds: document.querySelector("#math-odds"),
  mathLogBf: document.querySelector("#math-log-bf"),
  mathRequired50: document.querySelector("#math-required-50"),
  mathRequired90: document.querySelector("#math-required-90"),
  finalReport: document.querySelector("#final-report"),
  aiPrompt: document.querySelector("#ai-prompt"),
  copyReport: document.querySelector("#copy-report"),
  copyAiPrompt: document.querySelector("#copy-ai-prompt"),
};

init();

function init() {
  buildPresetSelect();
  bindEvents();
  loadPreset(getInitialPresetId());
}

function buildPresetSelect() {
  els.preset.innerHTML = claimPresets
    .map((preset) => `<option value="${preset.id}">${escapeHtml(preset.title)}</option>`)
    .join("");
}

function getInitialPresetId() {
  const requestedPreset = new URLSearchParams(window.location.search).get("preset");
  return claimPresets.some((preset) => preset.id === requestedPreset)
    ? requestedPreset
    : state.presetId;
}

function bindEvents() {
  els.preset.addEventListener("change", () => loadPreset(els.preset.value));
  els.claim.addEventListener("input", render);
  els.unknownNotes.addEventListener("input", render);

  [els.generalPrior, els.targetingPenalty, els.actTypeRate, els.unknownReserve].forEach((input) => {
    input.addEventListener("input", render);
  });

  els.loadGenerous.addEventListener("click", () => applyPosture("generous"));
  els.loadCorrected.addEventListener("click", () => applyPosture("corrected"));
  els.loadTeachingParallel.addEventListener("click", () => loadPreset("car-crash-demon"));
  els.resetCurrent.addEventListener("click", () => loadPreset(state.presetId));
  els.copyReport.addEventListener("click", () => copyText(els.finalReport.value, els.copyReport));
  els.copyAiPrompt.addEventListener("click", () => copyText(els.aiPrompt.value, els.copyAiPrompt));
}

function getPresetById(presetId) {
  return claimPresets.find((item) => item.id === presetId) || claimPresets[0];
}

function getCurrentPreset() {
  return getPresetById(state.presetId);
}

function getPresetMeta(preset = getCurrentPreset()) {
  return {
    ...defaultPresetText,
    ...preset,
  };
}

function getAlternativesForPreset(preset = getCurrentPreset()) {
  switch (preset.id) {
    case "car-crash-demon":
      return crashAlternativeFeatures;
    case "modern-miracle":
      return modernMiracleAlternativeFeatures;
    case "prayer-answer":
      return prayerAlternativeFeatures;
    default:
      return resurrectionAlternativeFeatures;
  }
}

function getCurrentAlternatives() {
  return getAlternativesForPreset();
}

function loadPreset(presetId) {
  const preset = getPresetById(presetId);
  state.presetId = preset.id;
  state.evidence = preset.evidence.map((item) => ({ ...item }));
  state.featureWeights = new Map(getAlternativesForPreset(preset).map((feature) => [feature.id, 1]));

  els.preset.value = preset.id;
  els.claim.value = preset.claim;
  els.generalPrior.value = String(preset.prior.general);
  els.targetingPenalty.value = String(preset.prior.targeting);
  els.actTypeRate.value = String(preset.prior.actType);
  els.unknownReserve.value = String(preset.prior.unknownReserve);
  els.unknownNotes.value = preset.unknownNotes || "";

  renderPresetText(preset);
  renderLedger();
  renderFeatures();
  render();
}

function applyPosture(kind) {
  const posture = posturePresets[kind];
  const preset = getCurrentPreset();
  const prior = kind === "corrected" ? preset.prior : posture.prior;

  els.generalPrior.value = String(prior.general);
  els.targetingPenalty.value = String(prior.targeting);
  els.actTypeRate.value = String(prior.actType);
  els.unknownReserve.value = String(prior.unknownReserve);

  state.evidence = preset.evidence.map((item) => ({
    ...item,
    pTrue: clamp(item.pTrue * posture.evidence.pTrueBoost, 1, 99.9),
    pAlt: clamp(item.pAlt * posture.evidence.pAltFactor, 0.01, 99.9),
    weight: posture.evidence.weightFloor ? Math.max(item.weight, posture.evidence.weightFloor) : item.weight,
  }));

  renderLedger();
  render();
}

function renderPresetText(preset) {
  const meta = getPresetMeta(preset);
  setText(els.claimCopy, meta.claimCopy);
  setText(els.startingCopy, meta.startingCopy);
  setText(els.startingHelpTitle, meta.startingHelpTitle);
  setText(els.startingHelpOne, meta.startingHelpOne);
  setText(els.startingHelpTwo, meta.startingHelpTwo);
  setText(els.generalPriorLabel, meta.generalPriorLabel);
  setText(els.generalPriorHelper, meta.generalPriorHelper);
  setText(els.targetingPenaltyLabel, meta.targetingPenaltyLabel);
  setText(els.targetingPenaltyHelper, meta.targetingPenaltyHelper);
  setText(els.actTypeRateLabel, meta.actTypeRateLabel);
  setText(els.actTypeRateHelper, meta.actTypeRateHelper);
  setText(els.unknownReserveLabel, meta.unknownReserveLabel);
  setText(els.unknownReserveHelper, meta.unknownReserveHelper);
  setText(els.unknownNotesLabel, meta.unknownNotesLabel);
  els.unknownNotes.placeholder = meta.unknownNotesPlaceholder;
  setText(els.alternativeTitle, meta.alternativeTitle);
  setText(els.alternativeCopy, meta.alternativeCopy);
  setText(els.alternativeStrengthLabel, meta.alternativeLabel);
  setText(els.alternativesHelpTitle, meta.alternativesHelpTitle);
  setText(els.alternativesHelpOne, meta.alternativesHelpOne);
  setText(els.alternativesHelpTwo, meta.alternativesHelpTwo);
}

function renderLedger() {
  els.ledgerList.innerHTML = state.evidence.map(renderEvidenceCard).join("");
  state.evidence.forEach((item) => {
    ["pTrue", "pAlt", "weight"].forEach((key) => {
      const input = document.querySelector(`#${item.id}-${key}`);
      input.addEventListener("input", () => {
        item[key] = Number(input.value);
        render();
      });
    });
  });
}

function renderEvidenceCard(item) {
  const meta = getPresetMeta();

  return `
    <article class="ledger-card plain-evidence-card" data-evidence-id="${item.id}">
      <header>
        <div>
          <p class="app-step">${escapeHtml(item.type)}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
        </div>
        <div class="ledger-live" id="${item.id}-live">
          <span>Evidence lift</span>
          <strong>1x</strong>
        </div>
      </header>

      <div class="ledger-controls plain-evidence-controls">
        ${renderRange({
          id: item.id,
          key: "pTrue",
          label: "How expected is this if the claim is true?",
          helper: meta.trueEvidenceHelper,
          value: item.pTrue,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "pAlt",
          label: "How expected is this if the claim is false?",
          helper: meta.altEvidenceHelper,
          value: item.pAlt,
          min: 0.01,
          max: 99.9,
          step: 0.01,
        })}
        ${renderRange({
          id: item.id,
          key: "weight",
          label: "How independent is this evidence item?",
          helper: meta.weightEvidenceHelper,
          value: item.weight,
          min: 10,
          max: 100,
          step: 1,
        })}
      </div>
    </article>
  `;
}

function renderRange({ id, key, label, helper, value, min, max, step }) {
  return `
    <div class="range-row compact plain-range">
      <div class="range-top">
        <label for="${id}-${key}">${escapeHtml(label)}</label>
        <span class="range-value" id="${id}-${key}-value">${formatPercentWithRatio(value / 100)}</span>
      </div>
      <p>${escapeHtml(helper)}</p>
      <input id="${id}-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
    </div>
  `;
}

function renderFeatures() {
  const alternativeFeatures = getCurrentAlternatives();

  els.featureGrid.innerHTML = alternativeFeatures
    .map((feature) => {
      const current = String(state.featureWeights.get(feature.id) ?? 1);
      const detail = feature.detail || feature.note;
      const options = [
        ["0", "Set aside"],
        ["0.5", "Some"],
        ["1", "Strong"],
      ]
        .map(
          ([value, label]) => `
            <span>
              <input
                id="feature-${feature.id}-${value}"
                type="radio"
                name="feature-${feature.id}"
                value="${value}"
                ${value === current ? "checked" : ""}
              >
              <label for="feature-${feature.id}-${value}">${label}</label>
            </span>
          `,
        )
        .join("");

      return `
        <article class="feature-card plain-feature-card">
          <div>
            <div class="feature-title-wrap">
              <h3 tabindex="0" aria-describedby="feature-${feature.id}-detail">
                ${escapeHtml(feature.title)}
                <span class="feature-help-indicator" aria-hidden="true">?</span>
              </h3>
              <div class="feature-tooltip" id="feature-${feature.id}-detail" role="tooltip">
                ${escapeHtml(detail)}
              </div>
            </div>
            <p>${escapeHtml(feature.note)}</p>
            <details class="feature-detail-panel">
              <summary>Deeper explanation</summary>
              <p>${escapeHtml(detail)}</p>
            </details>
          </div>
          <div class="feature-bottom">
            <span>Alternative fit: ${formatLift(feature.ratio)}</span>
            <div class="segmented three">${options}</div>
          </div>
        </article>
      `;
    })
    .join("");

  alternativeFeatures.forEach((feature) => {
    document.querySelectorAll(`[name="feature-${feature.id}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        state.featureWeights.set(feature.id, Number(input.value));
        render();
      });
    });
  });
}

function render() {
  const assessment = assess();
  renderSliderLabels();
  renderEvidenceLive(assessment);
  renderResultStrip(assessment);
  renderWarnings(assessment);
  els.finalReport.value = buildReport(assessment);
  els.aiPrompt.value = buildAiPrompt(assessment);
}

function renderSliderLabels() {
  setPercentLabel("general-prior", Number(els.generalPrior.value) / 100);
  setPercentLabel("targeting-penalty", Number(els.targetingPenalty.value) / 100);
  setPercentLabel("act-type-rate", Number(els.actTypeRate.value) / 100);
  setPercentLabel("unknown-reserve", Number(els.unknownReserve.value) / 100);
}

function renderEvidenceLive(assessment) {
  assessment.items.forEach((item) => {
    setPercentLabel(`${item.id}-pTrue`, item.pTrue / 100);
    setPercentLabel(`${item.id}-pAlt`, item.pAlt / 100);
    setPercentLabel(`${item.id}-weight`, item.weight / 100);
    const live = document.querySelector(`#${item.id}-live`);
    if (!live) return;
    live.querySelector("strong").textContent = formatLift(item.adjustedBf);
    live.querySelector("span").textContent = `${formatPercentWithRatio(item.share)} of evidence added`;
  });
}

function renderResultStrip(assessment) {
  const scoreColor = getScoreColor(assessment.auditPressure);
  const shortfallText = assessment.shortfall90 > 1
    ? formatLift(assessment.shortfall90)
    : "Enough";

  els.startingConfidence.textContent = formatPercentWithRatio(assessment.prior);
  els.evidenceAdded.textContent = formatLift(assessment.totalBf);
  els.updatedConfidence.textContent = formatPercentWithRatio(assessment.posterior);
  els.updatedConfidenceNote.textContent = "The result after the current evidence assumptions";
  els.neededForHigh.textContent = shortfallText;
  els.neededForHighNote.textContent = assessment.shortfall90 > 1
    ? "more evidence lift needed to reach 90% (about 9 in 10)"
    : "the current assumptions already reach 90% (about 9 in 10)";
  els.topDriver.textContent = assessment.topDriver
    ? `Most of the movement: ${assessment.topDriver.title}`
    : "No main evidence driver yet";
  els.alternativeStrength.textContent = formatLift(assessment.alternativeBf);
  els.auditScore.textContent = String(assessment.auditPressure);
  els.auditSummary.textContent = summarizePressure(assessment.auditPressure);
  els.resultCopy.textContent = buildPressureCopy(assessment);
  renderPressureRing(els.scoreRing, assessment, scoreColor);
  els.floatingAuditScore.textContent = String(assessment.auditPressure);
  els.unknownReserveRingNote.textContent = `Unknown reserve ${formatPercent(assessment.priorParts.unknownReserve)}`;
  renderPressureRing(els.floatingScoreRing, assessment, scoreColor, { includeUnknown: false });
  renderCredenceMix(assessment);

  els.mathStarting.textContent = formatPercentWithRatio(assessment.prior);
  els.mathUpdated.textContent = formatPercentWithRatio(assessment.posterior);
  els.mathBf.textContent = formatLift(assessment.totalBf);
  els.mathOdds.textContent = formatOdds(assessment.posteriorOdds);
  els.mathLogBf.textContent = `log lift ${assessment.totalLogBf.toFixed(2)}`;
  els.mathRequired50.textContent = formatLift(assessment.required[50]);
  els.mathRequired90.textContent = formatLift(assessment.required[90]);
}

function renderPressureRing(ring, assessment, scoreColor, options = {}) {
  const includeUnknown = options.includeUnknown ?? true;
  const unknownSlice = includeUnknown ? assessment.priorParts.unknownReserve * 100 : 0;
  const scoreEnd = clamp(unknownSlice + assessment.auditPressure, unknownSlice, 100);
  ring.setAttribute(
    "aria-label",
    includeUnknown
      ? `Audit pressure ${assessment.auditPressure} out of 100. Black slice: unknown reserve ${formatPercent(assessment.priorParts.unknownReserve)}.`
      : `Audit pressure ${assessment.auditPressure} out of 100.`,
  );
  ring.parentElement.style.setProperty("--score-color", scoreColor);
  ring.style.setProperty("--score", `${assessment.auditPressure}%`);
  ring.style.setProperty("--unknown-slice", `${unknownSlice}%`);
  ring.style.setProperty("--score-end", `${scoreEnd}%`);
  ring.style.setProperty("--score-color", scoreColor);
}

function renderCredenceMix(assessment) {
  const displayUnknown = getCosmeticUnknownCredence(assessment.credenceMix.unknown);
  const displayClaim = Math.min(assessment.credenceMix.claim, 1 - displayUnknown);
  const displayMaterial = Math.max(0, 1 - displayUnknown - displayClaim);
  const claimPct = displayClaim * 100;
  const materialEnd = (displayClaim + displayMaterial) * 100;
  const unknownLabel = formatCosmeticUnknownCredence(assessment.credenceMix.unknown);
  els.credenceDonut.style.setProperty("--claim-slice", `${claimPct}%`);
  els.credenceDonut.style.setProperty("--material-end", `${materialEnd}%`);
  els.credenceDonut.setAttribute(
    "aria-label",
    `Cause credence mix. Selected immaterial claim ${formatPercent(assessment.credenceMix.claim)}. Conceived material alternatives ${formatPercent(assessment.credenceMix.material)}. Unconceived causes ${unknownLabel}.`,
  );
  els.credenceClaimValue.textContent = formatPercent(assessment.credenceMix.claim);
  els.credenceClaimLabel.textContent = formatPercent(assessment.credenceMix.claim);
  els.credenceMaterialLabel.textContent = formatPercent(assessment.credenceMix.material);
  els.credenceUnknownLabel.textContent = unknownLabel;
  els.floatingCredenceDonut.style.setProperty("--claim-slice", `${claimPct}%`);
  els.floatingCredenceDonut.style.setProperty("--material-end", `${materialEnd}%`);
  els.floatingCredenceDonut.setAttribute(
    "aria-label",
    `Cause credence mix. Selected immaterial claim ${formatPercent(assessment.credenceMix.claim)}. Conceived material alternatives ${formatPercent(assessment.credenceMix.material)}. Unconceived causes ${unknownLabel}.`,
  );
  els.floatingCredenceClaim.textContent = formatPercent(assessment.credenceMix.claim);
  els.floatingCredenceMaterial.textContent = formatPercent(assessment.credenceMix.material);
  els.floatingCredenceUnknown.textContent = unknownLabel;
}

function renderWarnings(assessment) {
  els.pitfallList.innerHTML = assessment.flags
    .map((flag) => `<li><strong>${escapeHtml(flag.title)}:</strong> ${escapeHtml(flag.body)}</li>`)
    .join("");

  els.repairList.innerHTML = assessment.repairs
    .map((repair) => `<article class="repair-card"><strong>${escapeHtml(repair.title)}</strong><br>${escapeHtml(repair.body)}</article>`)
    .join("");
}

function assess() {
  const preset = getCurrentPreset();
  const meta = getPresetMeta(preset);
  const priorParts = {
    general: Number(els.generalPrior.value) / 100,
    targeting: Number(els.targetingPenalty.value) / 100,
    actType: Number(els.actTypeRate.value) / 100,
    unknownReserve: Number(els.unknownReserve.value) / 100,
  };
  const unreservedPrior = clamp(
    priorParts.general * priorParts.targeting * priorParts.actType,
    0.000000000001,
    0.999999,
  );
  const prior = clamp(unreservedPrior * (1 - priorParts.unknownReserve), 0.000000000001, 0.999999);
  const unknownReserveDiscount = Math.max(0, unreservedPrior - prior);
  const priorOdds = prior / (1 - prior);

  const rawItems = state.evidence.map((item) => {
    const pTrue = clamp(item.pTrue / 100, 0.0001, 0.9999);
    const pAlt = clamp(item.pAlt / 100, 0.0001, 0.9999);
    const independence = item.weight / 100;
    const rawBf = pTrue / pAlt;
    const rawLogBf = Math.log(rawBf);
    const adjustedLogBf = rawLogBf * independence;
    const adjustedBf = Math.exp(adjustedLogBf);

    return {
      ...item,
      pTrue: item.pTrue,
      pAlt: item.pAlt,
      weight: item.weight,
      rawBf,
      rawLogBf,
      adjustedLogBf,
      adjustedBf,
      share: 0,
    };
  });

  const totalLogBf = rawItems.reduce((sum, item) => sum + item.adjustedLogBf, 0);
  const totalBf = Math.exp(totalLogBf);
  const posteriorOdds = priorOdds * totalBf;
  const posterior = posteriorOdds / (1 + posteriorOdds);
  const credenceMix = calculateCredenceMix(posterior, priorParts.unknownReserve);
  const positiveLog = rawItems.reduce((sum, item) => sum + Math.max(0, item.adjustedLogBf), 0);
  const items = rawItems.map((item) => ({
    ...item,
    share: positiveLog > 0 ? Math.max(0, item.adjustedLogBf) / positiveLog : 0,
  }));
  const topDriver = [...items].sort((a, b) => b.share - a.share)[0];
  const required = {
    50: requiredBfForTarget(priorOdds, 0.5),
    90: requiredBfForTarget(priorOdds, 0.9),
    99: requiredBfForTarget(priorOdds, 0.99),
  };
  const shortfall90 = required[90] / Math.max(totalBf, 0.000000000001);
  const alternativeBf = calculateAlternativeBf();
  const flags = buildFlags({
    preset,
    meta,
    prior,
    priorParts,
    items,
    topDriver,
    alternativeBf,
    totalBf,
    required,
    shortfall90,
    unknownNotes: els.unknownNotes.value.trim(),
  });
  const repairs = buildRepairs(flags, meta);
  const auditPressure = calculateAuditPressure(flags, shortfall90, topDriver, priorParts);

  return {
    preset,
    meta,
    claim: els.claim.value.trim(),
    unknownNotes: els.unknownNotes.value.trim(),
    unreservedPrior,
    unknownReserveDiscount,
    prior,
    priorParts,
    priorOdds,
    items,
    totalLogBf,
    totalBf,
    posterior,
    credenceMix,
    posteriorOdds,
    required,
    shortfall90,
    topDriver,
    alternativeBf,
    flags,
    repairs,
    auditPressure,
  };
}

function buildFlags(context) {
  const meta = context.meta;
  const flags = [];
  const suppressed = context.items.filter((item) => item.pAlt < 3 && item.pTrue > 50);
  const highDependence = context.items.filter(
    (item) => ["testimony", "literary", "social"].includes(item.type) && item.weight > 82,
  );
  const neutralRows = context.items.filter((item) => item.rawBf >= 0.8 && item.rawBf <= 1.25);
  const sincerityRows = context.items.filter(
    (item) => item.type === "testimony" && item.adjustedBf > 5,
  );

  if (context.prior > 0.01) {
    flags.push({
      title: "The baseline may be too high",
      body: `This ${meta.startingPointKind} begins above 1% before the evidence is counted. That may be reasonable only if the specificity and event-type assumptions can be defended.`,
      weight: 16,
    });
  }

  if (context.priorParts.general > 0.45 && context.priorParts.targeting > 0.1) {
    flags.push({
      title: meta.borrowingTitle,
      body: meta.borrowingBody,
      weight: 16,
    });
  }

  if (context.priorParts.unknownReserve < 0.05) {
    flags.push({
      title: "Too little room for unconceived explanations",
      body: "The audit leaves very little space for unmodeled mechanisms, selection effects, mistaken memory, missing records, or explanations that have not yet been considered.",
      weight: 15,
    });
  } else if (context.priorParts.unknownReserve < 0.1 && !context.unknownNotes) {
    flags.push({
      title: "Unconceived explanations are not named",
      body: "The reserve is modest, and the notes field does not name what might still be missing from the comparison side.",
      weight: 8,
    });
  }

  if (suppressed.length > 0) {
    flags.push({
      title: "Alternative explanations are treated as almost impossible",
      body: `${suppressed.length} evidence item${suppressed.length === 1 ? "" : "s"} place the ${meta.suppressedPathName} below 3%, which can make the evidence appear stronger than it is.`,
      weight: 18,
    });
  }

  if (highDependence.length > 0) {
    flags.push({
      title: "Related evidence may be counted as separate",
      body: `${highDependence.length} testimony, story, or social item${highDependence.length === 1 ? "" : "s"} are treated as highly independent even though source overlap may be significant.`,
      weight: 14,
    });
  }

  if (sincerityRows.length > 0) {
    flags.push({
      title: "Sincerity is doing too much work",
      body: "Some testimony is adding a large lift. Separate honest belief, genuine experience, accurate interpretation, and the event actually occurring.",
      weight: 12,
    });
  }

  if (neutralRows.length > 0) {
    flags.push({
      title: "Some evidence barely distinguishes the claim",
      body: `${neutralRows.length} item${neutralRows.length === 1 ? " is" : "s are"} close to neutral. That evidence may belong in the account, but it should not be presented as strong confirmation.`,
      weight: 8,
    });
  }

  if (context.topDriver && context.topDriver.share > 0.55) {
    flags.push({
      title: "One evidence item is carrying the case",
      body: `${context.topDriver.title} supplies more than half of the positive movement, so the result is fragile around that single judgment.`,
      weight: 14,
    });
  }

  if (context.shortfall90 > 1000) {
    flags.push({
      title: "The evidence is still far short of high confidence",
      body: "The current evidence would need more than a thousand times additional lift to reach 90% confidence from the entered baseline.",
      weight: 16,
    });
  }

  if (context.alternativeBf > 100) {
    flags.push({
      title: meta.alternativeStrongTitle,
      body: meta.alternativeStrongBody,
      weight: 10,
    });
  }

  if (flags.length === 0) {
    flags.push({
      title: "No major structural warnings",
      body: "The current model avoids the most obvious reasoning traps. The remaining question is whether each slider value can be defended.",
      weight: 2,
    });
  }

  return flags;
}

function buildRepairs(flags, meta) {
  const titles = new Set(flags.map((flag) => flag.title));
  const repairs = [];

  if (
    titles.has("Alternative explanations are treated as almost impossible") ||
    titles.has(meta.alternativeStrongTitle)
  ) {
    repairs.push({
      title: "Rebuild the comparison side",
      body: meta.comparisonRepairBody,
    });
  }

  if (titles.has("Related evidence may be counted as separate") || titles.has("One evidence item is carrying the case")) {
    repairs.push({
      title: "Lower overlap-sensitive evidence",
      body: meta.overlapRepairBody,
    });
  }

  if (titles.has("The baseline may be too high") || titles.has(meta.borrowingTitle)) {
    repairs.push({
      title: "Show the full specificity chain",
      body: meta.specificityRepairBody,
    });
  }

  if (titles.has("Sincerity is doing too much work")) {
    repairs.push({
      title: "Separate belief from event truth",
      body: "Ask what sincerity proves, then separately ask whether the experience was interpreted correctly and whether the event occurred.",
    });
  }

  if (
    titles.has("Too little room for unconceived explanations") ||
    titles.has("Unconceived explanations are not named")
  ) {
    repairs.push({
      title: "Add an unknowns reserve",
      body: "Name what could still be missing, then leave some probability room for unlisted causes, incomplete records, selection effects, mistaken assumptions, and ordinary mechanisms not yet considered.",
    });
  }

  if (titles.has("The evidence is still far short of high confidence")) {
    repairs.push({
      title: "State the burden plainly",
      body: "Before calling the case strong, report how much additional evidence lift is needed to reach high confidence.",
    });
  }

  if (repairs.length === 0) {
    repairs.push({
      title: "Keep the assumptions visible",
      body: "Export the report and ask whether a fair critic could change any one slider without undermining the conclusion.",
    });
  }

  return repairs;
}

function calculateAuditPressure(flags, shortfall90, topDriver, priorParts) {
  const flagScore = flags.reduce((sum, flag) => sum + flag.weight, 0);
  const shortfallScore = clamp(Math.log10(Math.max(shortfall90, 1)) * 9, 0, 26);
  const driverScore = topDriver ? clamp((topDriver.share - 0.35) * 48, 0, 18) : 0;
  const reserveScore = priorParts.unknownReserve < 0.05 ? 12 : priorParts.unknownReserve < 0.1 ? 6 : 0;
  return Math.round(clamp(flagScore + shortfallScore + driverScore + reserveScore, 0, 100));
}

function calculateAlternativeBf() {
  return getCurrentAlternatives().reduce((product, feature) => {
    const weight = state.featureWeights.get(feature.id) ?? 1;
    return product * Math.pow(feature.ratio, weight);
  }, 1);
}

const MIN_UNKNOWN_DISPLAY_CREDENCE = 0.000001; // 0.0001%

function calculateCredenceMix(selectedClaim, unknownReserve) {
  const claim = clamp(selectedClaim, 0, 1);
  const remainder = 1 - claim;
  const unknown = remainder * clamp(unknownReserve, 0, 1);
  const material = Math.max(0, remainder - unknown);
  return {
    claim,
    material,
    unknown,
  };
}

function requiredBfForTarget(priorOdds, target) {
  const targetOdds = target / (1 - target);
  return targetOdds / priorOdds;
}

function setPercentLabel(id, value) {
  const label = document.querySelector(`#${id}-value`);
  if (label) label.textContent = formatPercentWithRatio(value);
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function summarizePressure(score) {
  if (score >= 75) return "Severe audit pressure";
  if (score >= 50) return "High audit pressure";
  if (score >= 25) return "Moderate audit pressure";
  return "Low audit pressure";
}

function buildPressureCopy(assessment) {
  if (assessment.auditPressure >= 75) {
    return "The case currently depends on fragile or under-defended assumptions. A confident conclusion would need stronger alternative-side analysis, overlap correction, and a clearer evidence burden.";
  }

  if (assessment.auditPressure >= 50) {
    return "Several assumptions are carrying more weight than they currently justify. The conclusion should be softened unless the warnings can be answered.";
  }

  if (assessment.auditPressure >= 25) {
    return "The structure is partly disciplined, but some assumptions still deserve scrutiny before the claim is treated as well substantiated.";
  }

  return "The model is structurally modest. The remaining question is whether the entered judgments are independently defensible.";
}

function buildReport(assessment) {
  const lines = [
    assessment.meta.reportTitle,
    "",
    `Claim: ${assessment.claim || "Not supplied"}`,
    "",
    "## Accessible Result",
    `Baseline confidence: ${formatPercentWithRatio(assessment.prior)}`,
    `Evidence added: ${formatLift(assessment.totalBf)}`,
    `Revised confidence: ${formatPercentWithRatio(assessment.posterior)}`,
    `More evidence needed for 90% (about 9 in 10) confidence: ${assessment.shortfall90 > 1 ? formatLift(assessment.shortfall90) : "none under current inputs"}`,
    `Biggest mover: ${assessment.topDriver ? assessment.topDriver.title : "None"} (${formatPercentWithRatio(assessment.topDriver?.share || 0)} of positive movement)`,
    `${assessment.meta.alternativeReportLabel}: ${formatLift(assessment.alternativeBf)}`,
    `Audit pressure: ${assessment.auditPressure}/100 (${summarizePressure(assessment.auditPressure)})`,
    `Cause credence mix: selected immaterial claim ${formatPercentWithRatio(assessment.credenceMix.claim)}, conceived material alternatives ${formatPercentWithRatio(assessment.credenceMix.material)}, unconceived causes ${formatPercentWithRatio(assessment.credenceMix.unknown)}`,
    "",
    "## Baseline Assumptions",
    `${assessment.meta.generalPriorLabel}: ${formatPercentWithRatio(assessment.priorParts.general)}`,
    `${assessment.meta.targetingPenaltyLabel}: ${formatPercentWithRatio(assessment.priorParts.targeting)}`,
    `${assessment.meta.actTypeRateLabel}: ${formatPercentWithRatio(assessment.priorParts.actType)}`,
    `Baseline before unknown reserve: ${formatPercentWithRatio(assessment.unreservedPrior)}`,
    `Room left for unconceived explanations: ${formatPercentWithRatio(assessment.priorParts.unknownReserve)}`,
    `Baseline confidence removed by this reserve: ${formatPercentWithRatio(assessment.unknownReserveDiscount)}`,
    `Baseline after unconceived-explanation reserve: ${formatPercentWithRatio(assessment.prior)}`,
    "",
    "## Unconceived Explanations Reserve",
    `Reserved room for missing material or immaterial explanations: ${formatPercentWithRatio(assessment.priorParts.unknownReserve)}`,
    `User notes on what may be missing: ${assessment.unknownNotes || "None entered."}`,
    "",
    "## Cause Credence Mix",
    "Calculation: selected claim = revised confidence; the remaining probability is split between conceived material alternatives and the unconceived reserve.",
    `Selected immaterial claim: ${formatPercentWithRatio(assessment.credenceMix.claim)}`,
    `Conceived material alternatives: ${formatPercentWithRatio(assessment.credenceMix.material)}`,
    `Unconceived causes: ${formatPercentWithRatio(assessment.credenceMix.unknown)}`,
    "",
    "## Evidence Questions",
    ...assessment.items.map(
      (item) =>
        `- ${item.title}: expected if true ${formatPercentWithRatio(item.pTrue / 100)}, expected if false ${formatPercentWithRatio(item.pAlt / 100)}, independent ${formatPercentWithRatio(item.weight / 100)}, evidence lift ${formatLift(item.adjustedBf)}.`,
    ),
    "",
    "## Warnings",
    ...assessment.flags.map((flag) => `- ${flag.title}: ${flag.body}`),
    "",
    "## Repair Moves",
    ...assessment.repairs.map((repair) => `- ${repair.title}: ${repair.body}`),
    "",
    "## Math Details",
    `Formal prior / baseline confidence: ${formatPercentWithRatio(assessment.prior)}`,
    `Formal posterior / revised confidence: ${formatPercentWithRatio(assessment.posterior)}`,
    `Bayes factor / evidence lift: ${formatFactor(assessment.totalBf)}`,
    `Log evidence lift: ${assessment.totalLogBf.toFixed(2)}`,
    `Posterior odds: ${formatOdds(assessment.posteriorOdds)}`,
    `Lift needed for 50%: ${formatLift(assessment.required[50])}`,
    `Lift needed for 90%: ${formatLift(assessment.required[90])}`,
    `Lift needed for 99%: ${formatLift(assessment.required[99])}`,
  ];

  return lines.join("\n");
}

function buildAiPrompt(assessment) {
  return [
    assessment.meta.aiAuditLine,
    "",
    "Use accessible terms first:",
    "- Baseline confidence = prior.",
    "- Revised confidence = posterior.",
    "- Evidence lift = Bayes factor.",
    "- 'How expected is this if true?' = P(E|H).",
    "- 'How expected is this if false?' = P(E|not-H).",
    "- Independent evidence = dependence correction.",
    "- Room for other explanations = unknown reserve.",
    "",
    assessment.meta.aiCheckHint,
    "",
    buildReport(assessment),
    "",
    "Challenge possible irrational stances, blunders, or oversights in the user's reasoning calculus:",
    "- Look for motivated reasoning, special pleading, confirmation bias, or protecting a conclusion by lowering rival explanations without a clear reason.",
    "- Check for base-rate neglect, missing alternatives, false independence, sincerity treated as accuracy, and leaps from 'unexplained' to a specific miracle claim.",
    "- Name any modeling blunder directly: double counting, tiny 'expected if false' values, unjustified starting confidence, overconfident independence, or ignored unknown reserve.",
    "- Pay special attention to unconceived explanations: missing ordinary causes, missing records, unknown mechanisms, selection effects, and material or immaterial explanations the user did not name.",
    "- Be direct but fair. Critique the reasoning and the numbers, not the person's intelligence or character.",
    "",
    "Questions to answer:",
    "1. Which assumption is doing the most work?",
    "2. Which 'expected if false' values are too low, if any?",
    "3. Which evidence items should be lowered for overlap or dependence?",
    "4. What revised confidence range results under stricter audit settings and believer-friendly settings?",
    "5. What claim would be proportionate to the evidence actually entered?",
  ].join("\n");
}

async function copyText(text, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch (error) {
    button.textContent = "Copy failed";
  }

  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function formatPercent(value) {
  if (value === 0) return "0%";
  const percent = value * 100;
  if (percent < 0.000001) return "less than 0.000001%";
  if (percent < 0.01) return `${trimNumber(percent, 5)}%`;
  if (percent < 0.1) return `${trimNumber(percent, 3)}%`;
  return `${trimNumber(percent, 1)}%`;
}

function formatPercentWithRatio(value) {
  return `${formatPercent(value)} (${formatProbabilityRatio(value)})`;
}

function getCosmeticUnknownCredence(value) {
  return Math.max(clamp(value, 0, 1), MIN_UNKNOWN_DISPLAY_CREDENCE);
}

function formatCosmeticUnknownCredence(value) {
  return formatPercent(getCosmeticUnknownCredence(value));
}

function formatProbabilityRatio(value) {
  const probability = clamp(value, 0, 1);

  if (probability === 0) return "none";
  if (probability === 1) return "all";

  if (probability < 0.01) {
    return `about 1 in ${formatOneInCount(1 / probability)}`;
  }

  const denominator = probability >= 0.99 ? 1000 : 100;
  const numerator = Math.max(1, Math.min(denominator - 1, Math.round(probability * denominator)));
  const divisor = gcd(numerator, denominator);
  const reducedNumerator = numerator / divisor;
  const reducedDenominator = denominator / divisor;

  if (denominator === 100 && reducedDenominator > 20) {
    return `about ${numerator} in ${denominator}`;
  }

  return `about ${reducedNumerator} in ${reducedDenominator}`;
}

function formatFactor(value) {
  if (!Number.isFinite(value)) return "infinite";
  if (value === 0) return "0";
  if (value < 0.001) return "less than 0.001";
  if (value >= 1000000000000) return formatLargeFactor(value);
  if (value >= 100000) return (Math.round(value / 1000) * 1000).toLocaleString();
  if (value >= 1000) return Math.round(value).toLocaleString();
  if (value >= 100) return trimNumber(value, 1);
  if (value >= 10) return trimNumber(value, 2);
  return trimNumber(value, 2);
}

function formatLift(value) {
  return `${formatFactor(value)}x`;
}

function formatOdds(odds) {
  if (!Number.isFinite(odds)) return "infinite";
  if (odds >= 1) return `${formatFactor(odds)}:1`;
  return `1:${formatFactor(1 / odds)}`;
}

function formatOneInCount(value) {
  if (!Number.isFinite(value)) return "many";
  if (value >= 100000) return (Math.round(value / 1000) * 1000).toLocaleString();
  return Math.max(1, Math.round(value)).toLocaleString();
}

function getScoreColor(score) {
  if (score >= 75) return "#5b1705";
  if (score >= 50) return "#8a4b18";
  if (score >= 25) return "#66752c";
  return "#1f5a3a";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function trimNumber(value, digits) {
  return value
    .toFixed(digits)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
}

function gcd(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);

  while (right) {
    const next = left % right;
    left = right;
    right = next;
  }

  return left || 1;
}

function formatLargeFactor(value) {
  const units = [
    [1000000000000000, "quadrillion"],
    [1000000000000, "trillion"],
  ];
  const [divisor, label] = units.find(([unit]) => value >= unit);
  const scaled = value / divisor;
  return `${trimNumber(scaled, scaled >= 100 ? 0 : 1)} ${label}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
