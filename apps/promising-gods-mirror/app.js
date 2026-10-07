const STORAGE_KEY = "promising-gods-mirror-v1";

const gods = [
  {
    id: "aurion",
    name: "Aurion",
    epithet: "Keeper of the Canopy",
    book: "Ledger of Aurion",
    accent: "#7a4d22",
    summary:
      "Aurion promises visible shelter: fewer calamities, steadier provision, and longer lives for those who keep his canopy-covenant.",
  },
  {
    id: "ilyra",
    name: "Ilyra",
    epithet: "Lady of the Wells",
    book: "Steps of Ilyra",
    accent: "#285d67",
    summary:
      "Ilyra promises intervention at the point of need: healed bodies, answered petitions, and wiser choices for devoted askers.",
  },
  {
    id: "vareth",
    name: "Vareth",
    epithet: "Witness of Embers",
    book: "Ember Testament",
    accent: "#8a3f34",
    summary:
      "Vareth promises visible distinction: foresight, cleaner conduct, and lighter disease burdens among the ember-marked community.",
  },
];

const collapseStages = [
  {
    id: "public-effect",
    short: "Public result is gone",
    title: "The real-world result is gone.",
    meaning:
      "The promised benefit no longer shows up better than ordinary life or matched comparison cases.",
    significance:
      "If you stop here, the verse has already failed as a real-world promise.",
  },
  {
    id: "defined-subgroup",
    short: "Only a smaller special group counts",
    title: "The promise now works only for a smaller special group.",
    meaning:
      "The original promise survives only after being narrowed to a more devout, more approved, or more sincere subgroup.",
    significance:
      "If a promise must shrink this much to survive, the original promise has already been weakened.",
  },
  {
    id: "hidden-conditions",
    short: "Misses are explained away afterward",
    title: "Misses are explained away afterward.",
    meaning:
      "Failures are dismissed by hidden sincerity, hidden sin, or mysterious timing discovered only after the bad result.",
    significance:
      "A promise that can explain away every miss is no longer taking real public risk.",
  },
  {
    id: "inward-comfort",
    short: "Now it means comfort instead",
    title: "The verse now means comfort instead of a real-world result.",
    meaning:
      "The public promise is gone. What remains is reassurance, inward presence, or symbolism.",
    significance:
      "If you stop here, the verse survives only as comfort, not as a testable public promise.",
  },
  {
    id: "never-public",
    short: "Nothing public was promised",
    title: "Nothing public was promised in the first place.",
    meaning:
      "The wording is kept only by denying that the verse ever made an earthly prediction.",
    significance:
      "This preserves the verse only by retreating from the original claim completely.",
  },
];

const promises = [
  {
    id: "aurion-protection",
    godId: "aurion",
    title: "Shielded from plague and violence",
    domain: "Protection / morbidity",
    verseRef: "Ledger of Aurion 12:4-5",
    verse:
      "Those who hang Aurion's seal in truth will not be settled on by pestilence, and the blade that finds the street will lose their scent.",
    claim:
      "Committed adherents should show measurably lower severe infection, violent injury, and early death than matched non-adherents.",
    test:
      "A 14-year matched cohort compared weekly temple-keepers, clergy households, and nearby non-adherents with the same age, income, and region.",
    result:
      "Hospitalization, violent-injury, sepsis, and early-death rates were statistically indistinguishable across groups, including the most devout subgroup.",
    requiredRetreat:
      "After a flat matched cohort like this, the verse survives only if it stops predicting a distinct public protection effect and is retold as reassurance or symbolic shelter.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "Matthew 10:29-31",
        note: "Often invoked through the 'sparrows' assurance as proof that God watches over and protects believers.",
        verse:
          "Are not two sparrows sold for a farthing? and one of them shall not fall on the ground without your Father. But the very hairs of your head are all numbered. Fear ye not therefore, ye are of more value than many sparrows.",
      },
      {
        ref: "Luke 10:19",
        note: "Often invoked as protection from hostile earthly harm.",
        verse:
          "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.",
      },
    ],
  },
  {
    id: "aurion-provision",
    godId: "aurion",
    title: "Seek first, and the jars will not fail",
    domain: "Provision",
    verseRef: "Ledger of Aurion 4:11",
    verse:
      "Seek first the breadth of Aurion's canopy, and your jars will not fail, nor will the winter table shame your children.",
    claim:
      "Devoted seekers should show lower food insecurity, rent default, and emergency-finance collapse than matched non-seekers.",
    test:
      "A 9-year hardship registry compared strict tithe-keepers, weekly temple-keepers, and matched neighbors through job loss, medical debt, and housing shocks.",
    result:
      "Eviction, arrears, food insecurity, and bankruptcy rates remained flat after controlling for region, income, and family size.",
    requiredRetreat:
      "To keep the verse alive after flat hardship outcomes, the promise has to become inward reassurance about being carried through scarcity rather than a public provision effect.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "Matthew 6:28-33",
        note: "Often invoked through the 'lilies of the field' teaching as a promise of provision for those who seek God's kingdom first.",
        verse:
          "And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these. Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith? Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things. But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      },
      {
        ref: "Philippians 4:19",
        note: "Often invoked as assurance that God will supply needs.",
        verse: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
      },
    ],
  },
  {
    id: "aurion-longevity",
    godId: "aurion",
    title: "Extra years upon the faithful",
    domain: "Longevity",
    verseRef: "Ledger of Aurion 19:2",
    verse:
      "Walk the long road of Aurion without turning, and he will lay years upon your head like a second crown.",
    claim:
      "Faithful adherents should live longer, after controls, than comparable non-adherents who share the same region and material conditions.",
    test:
      "An actuarial registry tracked 62,000 adherents and matched neighbors across several regions while controlling for smoking, alcohol, education, and income.",
    result:
      "The apparent raw gap vanished after lifestyle and class controls. No longevity advantage remained for the adherent subgroup.",
    requiredRetreat:
      "At this point the verse survives only if added years become metaphorical fullness, inward meaning, or future reward rather than earthly lifespan.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "1 Timothy 4:8",
        note: "Promises benefits of godliness in this life and the next. A claim of extra earthly years requires an additional interpretation; the verse does not explicitly promise a longer lifespan.",
        verse:
          "For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come.",
      },
    ],
  },
  {
    id: "ilyra-healing",
    godId: "ilyra",
    title: "Call the well-keepers, and the sick will rise",
    domain: "Healing",
    verseRef: "Steps of Ilyra 7:13-14",
    verse:
      "If the sick call the well-keepers, let them pour the bright water and speak her name, and Ilyra will raise them from their bed.",
    claim:
      "Ritually prayed-for adherents should recover measurably better than matched sick people receiving ordinary care without the rite.",
    test:
      "A consecutive case registry logged diagnoses, severity, prayer timing, treatment, and blinded outcome review for anointed adherents and matched controls.",
    result:
      "Remission, symptom scores, complications, and re-admission rates were indistinguishable after the registry included every submitted case.",
    requiredRetreat:
      "The verse stays alive only if healing stops meaning improved earthly medical outcomes and becomes spiritual strengthening, inward peace, or a story told around the misses.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "James 5:14-15",
        note: "Often invoked as a promise of healing after prayer by elders.",
        verse:
          "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.",
      },
    ],
  },
  {
    id: "ilyra-prayer",
    godId: "ilyra",
    title: "Ask in Ilyra's name, and the wells will pour",
    domain: "Answered prayer",
    verseRef: "Steps of Ilyra 3:8",
    verse:
      "Whatever you ask in Ilyra's name with an undivided mouth, the wells will pour it out and leave your hands full.",
    claim:
      "Devout petitioners should receive better real-world outcomes than matched non-petitioners facing the same kinds of needs.",
    test:
      "A preregistered blind request log tracked matched needs, deadlines, and outcomes while keeping every miss and comparing self-identified devout petitioners with controls.",
    result:
      "Across health, jobs, reconciliations, and money crises, the request group showed no measurable advantage, including the most committed prayer subgroup.",
    requiredRetreat:
      "To keep the verse alive after flat blinded request data, answered prayer has to become unseen companionship or a non-public inner response rather than the promised outward effect.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "Mark 11:24",
        note: "Often invoked as a promise that believing prayer receives what is asked.",
        verse:
          "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.",
      },
      {
        ref: "John 14:13-14",
        note: "Often invoked as a promise that requests in Jesus' name are granted.",
        verse:
          "And whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son. If ye shall ask any thing in my name, I will do it.",
      },
      {
        ref: "Matthew 7:7-11",
        note: "Often invoked as assurance that askers receive.",
        verse:
          "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened. Or what man is there of you, whom if his son ask bread, will he give him a stone? Or if he ask a fish, will he give him a serpent? If ye then, being evil, know how to give good gifts unto your children, how much more shall your Father which is in heaven give good things to them that ask him?",
      },
    ],
  },
  {
    id: "ilyra-wisdom",
    godId: "ilyra",
    title: "Ask, and wiser paths will be shown",
    domain: "Wisdom / guidance",
    verseRef: "Steps of Ilyra 11:6",
    verse:
      "If any pilgrim lacks counsel, let her ask at the seventh step, and Ilyra will show the wiser path under her feet.",
    claim:
      "Adherents who ask for divine guidance should make measurably better decisions or forecasts than matched non-adherents using ordinary reflection and advice.",
    test:
      "A blinded advice-quality and forecasting study compared veteran devotees, ordinary adherents, secular professionals, and crowd baselines on repeated real-world judgments.",
    result:
      "Calibration, forecast accuracy, and downstream decision success were no better for the guidance-seeking adherents than for the comparison groups.",
    requiredRetreat:
      "After repeated flat guidance outcomes, the verse survives only if 'shown the wiser path' means inner steadiness while choosing, not measurably wiser earthly judgment.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "James 1:5",
        note: "Often invoked as a promise that God gives wisdom to those who ask.",
        verse:
          "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
      },
      {
        ref: "John 14:26",
        note: "Often invoked as assurance that the Spirit teaches and reminds believers what they need to know.",
        verse:
          "But the Comforter, which is the Holy Ghost, whom the Father will send in my name, he shall teach you all things, and bring all things to your remembrance, whatsoever I have said unto you.",
      },
    ],
  },
  {
    id: "vareth-prophecy",
    godId: "vareth",
    title: "The ember-breathed will speak tomorrow",
    domain: "Future knowledge / prophecy",
    verseRef: "Ember Testament 5:9",
    verse:
      "When Vareth breathes on the marked, tomorrow will glow on their tongues before it arrives.",
    claim:
      "Spirit-led adherents should make timestamped predictions that beat baseline forecasting, vague impression controls, and chance.",
    test:
      "Elite adherents entered public, timestamped predictions into a locked registry with blind scoring against crowd forecasts and vague-future decoys.",
    result:
      "Specific-hit rates, calibration, and score-against-baseline were not better than comparison forecasts once every failed prediction stayed in the file.",
    requiredRetreat:
      "At that point prophecy can survive only if it stops meaning public foreknowledge and becomes inward impression, poetic resonance, or retrospective meaning-making.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "John 16:13",
        note: "Often invoked as guidance into truth and what is to come.",
        verse:
          "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come.",
      },
    ],
  },
  {
    id: "vareth-behavior",
    godId: "vareth",
    title: "Known in the gates by a cleaner life",
    domain: "Behavior / moral transformation",
    verseRef: "Ember Testament 14:3",
    verse:
      "Those marked by Vareth will be known in the gates by a cleaner life and a warmer hand than the people around them.",
    claim:
      "Adherents should show measurably better public behavior and neighbor-facing outcomes than matched non-adherents when self-report is removed.",
    test:
      "Independent auditors compared fraud findings, abuse reports, restitution patterns, neighbor ratings, and community-record outcomes across matched regions and demographics.",
    result:
      "No stable advantage appeared for the adherent communities once public records and third-party audits replaced self-description and in-group testimony.",
    requiredRetreat:
      "To preserve the verse, 'cleaner life' must become inward intention, hidden growth, or selective testimony rather than a distinct public behavioral pattern.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "John 13:35",
        note: "Often invoked as a public mark of believers' love.",
        verse:
          "By this shall all men know that ye are my disciples, if ye have love one to another.",
      },
      {
        ref: "2 Corinthians 5:17",
        note: "Often invoked as a promise of visible new life and transformed conduct in Christ.",
        verse:
          "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
      },
      {
        ref: "Galatians 5:22-23",
        note: "Often invoked as visible fruit expected in believers' lives.",
        verse:
          "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.",
      },
    ],
  },
  {
    id: "vareth-health",
    godId: "vareth",
    title: "Sickness taken from the ember-keepers",
    domain: "Reduced morbidity",
    verseRef: "Ember Testament 2:17",
    verse:
      "Vareth says, I will take the wasting fevers from among my ember-keepers and make their bodies lighter than the houses around them.",
    claim:
      "The adherent community should carry a measurably lower chronic-disease and morbidity burden than matched non-adherents.",
    test:
      "A large health-record cohort compared adherents, high-devotion adherents, and matched non-adherents on chronic disease, absenteeism, recurrent infection, and disability burden.",
    result:
      "Chronic disease, recurrent infection, absenteeism, and overall morbidity burden remained statistically indistinguishable across the matched groups.",
    requiredRetreat:
      "After a flat health-record cohort like this, the verse survives only if sickness removed means spiritual burden, inner endurance, or future hope rather than lighter earthly morbidity.",
    requiredStopIndex: 3,
    parallels: [
      {
        ref: "3 John 1:2",
        note: "Often invoked as a promise that believers should prosper and be in health.",
        verse:
          "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.",
      },
    ],
  },
];

const godById = new Map(gods.map((god) => [god.id, god]));
const promiseById = new Map(promises.map((promise) => [promise.id, promise]));

const refs = {
  godGrid: document.querySelector("#god-grid"),
  caseButtons: document.querySelector("#case-buttons"),
  progressCount: document.querySelector("#progress-count"),
  progressNote: document.querySelector("#progress-note"),
  activeSelectionTitle: document.querySelector("#active-selection-title"),
  activeSelectionDetail: document.querySelector("#active-selection-detail"),
  activeSelectionStopLineLabel: document.querySelector("#active-selection-stop-line-label"),
  activeSelectionDomain: document.querySelector("#active-selection-domain"),
  promiseTitle: document.querySelector("#promise-title"),
  promiseGodChip: document.querySelector("#promise-god-chip"),
  promiseDomainChip: document.querySelector("#promise-domain-chip"),
  promiseVerseRef: document.querySelector("#promise-verse-ref"),
  promiseVerseText: document.querySelector("#promise-verse-text"),
  promiseClaim: document.querySelector("#promise-claim"),
  promiseTest: document.querySelector("#promise-test"),
  promiseResult: document.querySelector("#promise-result"),
  promiseStopLineLabel: document.querySelector("#promise-stop-line-label"),
  promiseRequiredRetreat: document.querySelector("#promise-required-retreat"),
  collapseLadder: document.querySelector("#collapse-ladder"),
  verdictTitle: document.querySelector("#verdict-title"),
  verdictBody: document.querySelector("#verdict-body"),
  revealStatus: document.querySelector("#reveal-status"),
  summaryStrict: document.querySelector("#summary-strict"),
  summaryComfort: document.querySelector("#summary-comfort"),
  summaryNonpublic: document.querySelector("#summary-nonpublic"),
  summaryTitle: document.querySelector("#summary-title"),
  summaryBody: document.querySelector("#summary-body"),
  revealNextStep: document.querySelector("#reveal-next-step"),
  revealGrid: document.querySelector("#reveal-grid"),
  reportOutput: document.querySelector("#report-output"),
  reportStatus: document.querySelector("#report-status"),
  copyReport: document.querySelector("#copy-report"),
  printReport: document.querySelector("#print-report"),
};

function defaultState() {
  return {
    selectedPromiseId: promises[0].id,
    stopLines: {},
  };
}

function loadState() {
  const fallback = defaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    const selectedPromiseId = promiseById.has(parsed.selectedPromiseId)
      ? parsed.selectedPromiseId
      : fallback.selectedPromiseId;

    const stopLines = {};
    if (parsed.stopLines && typeof parsed.stopLines === "object") {
      promises.forEach((promise) => {
        const value = parsed.stopLines[promise.id];
        if (Number.isInteger(value) && value >= 0 && value < collapseStages.length) {
          stopLines[promise.id] = value;
        }
      });
    }

    return { selectedPromiseId, stopLines };
  } catch {
    return fallback;
  }
}

let state = loadState();

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function activePromise() {
  return promiseById.get(state.selectedPromiseId) || promises[0];
}

function selectPromise(promiseId) {
  if (!promiseById.has(promiseId) || state.selectedPromiseId === promiseId) {
    return;
  }

  state.selectedPromiseId = promiseId;
  persistState();
  renderAll();
}

function stopLineFor(promiseId) {
  return Number.isInteger(state.stopLines[promiseId]) ? state.stopLines[promiseId] : null;
}

function explanationPairHtml(meaning, significance, note = "") {
  const noteHtml = note
    ? `<p class="mirror-explain-note"><strong>Why this rung matters here:</strong> ${escapeHtml(note)}</p>`
    : "";

  return `
    <div class="mirror-explain-pair">
      <p><strong>Meaning:</strong> ${escapeHtml(meaning)}</p>
      <p><strong>Why it matters:</strong> ${escapeHtml(significance)}</p>
      ${noteHtml}
    </div>
  `;
}

function verdictFor(promise) {
  const selected = stopLineFor(promise.id);
  if (selected === null) {
    return {
      code: "pending",
      title: "Choose your stop line",
      meaning:
        "Pick the first rung where you think the verse stops functioning as a real-world promise.",
      significance:
        "That choice decides whether the verse fails, survives only as comfort, or is preserved only by denying that it made a public promise.",
    };
  }

  if (selected < promise.requiredStopIndex) {
    return {
      code: "strict",
      title: "Fails as a real promise",
      meaning:
        "By your own line, the verse already fails before the comfort-only fallback.",
      significance:
        "Because the measured public effect is flat, the verse cannot still count as a successful real-world promise.",
    };
  }

  if (selected === promise.requiredStopIndex) {
    return {
      code: "comfort",
      title: "Survives only as comfort",
      meaning:
        "By your line, the verse now survives only as reassurance, symbolism, or inward meaning.",
      significance:
        "That may preserve devotion, but it no longer preserves a testable public promise.",
    };
  }

  return {
    code: "nonpublic",
    title: "Now denied as a public promise",
    meaning:
      "By your line, the verse is preserved only by saying it never made a real-world promise in the first place.",
    significance:
      "That protects the wording only by retreating from the original public claim completely.",
  }
}

function completedCount() {
  return promises.filter((promise) => stopLineFor(promise.id) !== null).length;
}

function summaryCounts() {
  const counts = { strict: 0, comfort: 0, nonpublic: 0, pending: 0 };

  promises.forEach((promise) => {
    const verdict = verdictFor(promise);
    counts[verdict.code] += 1;
  });

  return counts;
}

function buildSummaryMessage() {
  const done = completedCount();
  const counts = summaryCounts();

  if (!done) {
    return {
      title: "No cases decided yet",
      body:
        "Choose where each fictive verse stops being a real-world promise. The three boxes above will then sort your decisions into failure, comfort-only survival, or retreating to the claim that no public promise was made.",
    };
  }

  if (done < promises.length) {
    return {
      title: `${done} of ${promises.length} cases decided`,
      body:
        `The three boxes above update as you judge each case. Finish all nine to unlock the Bible parallels and compare your line with familiar Christian promise language.`,
    };
  }

  if (counts.nonpublic === 0) {
    return {
      title: "Every case stops being a real promise",
      body:
        "Across all nine cases, the flat earthly results force each verse either to fail as a promise or to survive only as comfort. The reveal now asks whether the same line is kept when the verses are biblical.",
    };
  }

  if (counts.nonpublic <= 2) {
    return {
      title: "Most cases fail; a few are kept only by retreat",
      body:
        "Most of the fictive verses fail by your own line. The remaining cases are preserved only by retreating to the claim that no public promise was made in the first place.",
    };
  }

  return {
    title: "Several cases survive only by retreating from public promise language",
    body:
      "On your current lines, several fictive verses remain alive only because the original public promise is being withdrawn after the public result disappears.",
  };
}

function renderGodCards() {
  refs.godGrid.innerHTML = gods
    .map((god) => {
      const total = promises.filter((promise) => promise.godId === god.id).length;
      const done = promises.filter(
        (promise) => promise.godId === god.id && stopLineFor(promise.id) !== null
      ).length;

      return `
        <article class="mirror-god-card" style="--god-accent:${god.accent}">
          <p class="mirror-god-book">${escapeHtml(god.book)}</p>
          <h3>${escapeHtml(god.name)}</h3>
          <p class="mirror-god-epithet">${escapeHtml(god.epithet)}</p>
          <p>${escapeHtml(god.summary)}</p>
          <div class="mirror-god-meta">
            <span>${done}/${total} promises completed</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCaseButtons() {
  refs.caseButtons.innerHTML = gods
    .map((god) => {
      const items = promises
        .filter((promise) => promise.godId === god.id)
        .map((promise) => {
          const selected = promise.id === state.selectedPromiseId;
          const verdict = verdictFor(promise);
          const line = stopLineFor(promise.id);
          const statusLabel = line === null ? "Unset" : collapseStages[line].short;
          return `
            <button
              class="mirror-case-button${selected ? " active" : ""}"
              type="button"
              data-promise-id="${escapeHtml(promise.id)}"
              style="--case-accent:${god.accent}"
              aria-pressed="${selected ? "true" : "false"}"
            >
              <span class="mirror-case-title">${escapeHtml(promise.title)}</span>
              <span class="mirror-case-domain">${escapeHtml(promise.domain)}</span>
              <span class="mirror-case-status verdict-${escapeHtml(verdict.code)}">${escapeHtml(statusLabel)}</span>
            </button>
          `;
        })
        .join("");

      return `
        <section class="mirror-case-group">
          <div class="mirror-case-group-head">
            <strong>${escapeHtml(god.name)}</strong>
            <span>${escapeHtml(god.book)}</span>
          </div>
          <div class="mirror-case-group-buttons">
            ${items}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderActiveSelection() {
  const promise = activePromise();
  const god = godById.get(promise.godId);
  const selected = stopLineFor(promise.id);
  const verdict = verdictFor(promise);

  refs.activeSelectionTitle.textContent = `${god.name}: ${promise.title}`;
  refs.activeSelectionDetail.textContent =
    "This is the promise currently controlling the verse, the test, and the verdict. Your next step is to go to Step 3 and set the collapse line by choosing the first point where this promise stops being a real-world promise.";
  refs.activeSelectionStopLineLabel.textContent =
    selected === null ? "Unset" : collapseStages[selected].short;
  refs.activeSelectionStopLineLabel.className =
    `mirror-case-status mirror-active-selection-status verdict-${verdict.code}`;
  refs.activeSelectionDomain.textContent = promise.domain;
  refs.activeSelectionDomain.style.setProperty("--chip-accent", god.accent);
}

function renderActivePromise() {
  const promise = activePromise();
  const god = godById.get(promise.godId);
  const selected = stopLineFor(promise.id);
  const verdict = verdictFor(promise);

  refs.promiseTitle.textContent = promise.title;
  refs.promiseGodChip.textContent = god.name;
  refs.promiseGodChip.style.setProperty("--chip-accent", god.accent);
  refs.promiseDomainChip.textContent = promise.domain;
  refs.promiseVerseRef.textContent = promise.verseRef;
  refs.promiseVerseText.textContent = promise.verse;
  refs.promiseClaim.textContent = promise.claim;
  refs.promiseTest.textContent = promise.test;
  refs.promiseResult.textContent = promise.result;
  refs.promiseStopLineLabel.textContent =
    selected === null ? "Unset" : collapseStages[selected].short;
  refs.promiseStopLineLabel.className =
    `mirror-case-status mirror-required-retreat-status verdict-${verdict.code}`;
  refs.promiseRequiredRetreat.textContent = promise.requiredRetreat;
}

function renderCollapseLadder() {
  const promise = activePromise();
  const currentStop = stopLineFor(promise.id);

  refs.collapseLadder.innerHTML = collapseStages
    .map((stage, index) => {
      const checked = currentStop === index;
      const required = promise.requiredStopIndex === index;
      return `
        <label class="mirror-collapse-option${checked ? " active" : ""}${required ? " required" : ""}">
          <input
            type="radio"
            name="collapse-line"
            value="${index}"
            ${checked ? "checked" : ""}
          >
          <span class="mirror-collapse-rung">Rung ${index + 1}</span>
          <strong>${escapeHtml(stage.title)}</strong>
          ${explanationPairHtml(
            stage.meaning,
            stage.significance,
            required
              ? "This is the first point where the verse survives only by becoming comfort instead of keeping its original public promise."
              : ""
          )}
        </label>
      `;
    })
    .join("");

  refs.collapseLadder.querySelectorAll('input[name="collapse-line"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.stopLines[promise.id] = Number(input.value);
      persistState();
      renderAll();
    });
  });
}

function renderVerdict() {
  const promise = activePromise();
  const verdict = verdictFor(promise);

  refs.verdictTitle.textContent = verdict.title;
  refs.verdictBody.innerHTML = explanationPairHtml(verdict.meaning, verdict.significance);
  refs.verdictTitle.parentElement.className = `diagnosis-box mirror-verdict-box verdict-${verdict.code}`;
}

function revealCard(promise) {
  const god = godById.get(promise.godId);
  const selected = stopLineFor(promise.id);
  const verdict = verdictFor(promise);
  const stopLineText = selected === null ? "Not set" : collapseStages[selected].title;
  const parallels = promise.parallels
    .map(
      (item) =>
        `<article class="mirror-parallel-tag"><div class="mirror-parallel-head"><strong class="mirror-parallel-ref">${escapeHtml(item.ref)}</strong><span class="mirror-parallel-note">${escapeHtml(item.note)}</span></div><p class="mirror-parallel-verse">${escapeHtml(item.verse)}</p></article>`
    )
    .join("");

  return `
    <article class="mirror-reveal-card verdict-${escapeHtml(verdict.code)}" style="--case-accent:${god.accent}">
      <p class="mirror-card-label">${escapeHtml(god.name)} | ${escapeHtml(promise.domain)}</p>
      <h3>${escapeHtml(promise.title)}</h3>
      <p class="mirror-reveal-verse"><strong>${escapeHtml(promise.verseRef)}</strong> ${escapeHtml(promise.verse)}</p>
      <p class="mirror-reveal-line"><strong>Your stop line:</strong> ${escapeHtml(stopLineText)}</p>
      <p class="mirror-reveal-line"><strong>Needed retreat:</strong> ${escapeHtml(collapseStages[promise.requiredStopIndex].title)}</p>
      <div class="mirror-reveal-verdict">
        <strong>${escapeHtml(verdict.title)}</strong>
        ${explanationPairHtml(verdict.meaning, verdict.significance)}
      </div>
      <div class="mirror-parallel-tags">${parallels}</div>
    </article>
  `;
}

function reportParallelsText(parallels) {
  return parallels
    .map(
      (item) =>
        `- ${item.ref}: ${item.note}\n  Verse: ${item.verse}`
    )
    .join("\n");
}

function reportParallelsHtml(parallels) {
  return parallels
    .map(
      (item) => `
        <article class="mirror-report-parallel-item">
          <p><strong>${escapeHtml(item.ref)}</strong> ${escapeHtml(item.note)}</p>
          <p class="mirror-report-parallel-verse">${escapeHtml(item.verse)}</p>
        </article>
      `
    )
    .join("");
}

function buildReportText() {
  const summary = buildSummaryMessage();
  const counts = summaryCounts();
  const lines = [
    "Promising Gods Mirror report",
    "",
    `Completed cases: ${completedCount()} / ${promises.length}`,
    `Fails as a real promise: ${counts.strict}`,
    `Survives only as comfort: ${counts.comfort}`,
    `Now denied as a public promise: ${counts.nonpublic}`,
    "",
    summary.title,
    summary.body,
    "",
  ];

  promises.forEach((promise) => {
    const god = godById.get(promise.godId);
    const selected = stopLineFor(promise.id);
    const verdict = verdictFor(promise);
    lines.push(`${promise.title} (${god.name})`);
    lines.push(`Fictive verse: ${promise.verseRef} — ${promise.verse}`);
    lines.push(`Public claim: ${promise.claim}`);
    lines.push(`Ordinary earthly test: ${promise.test}`);
    lines.push(`Observed result: ${promise.result}`);
    lines.push(`Needed retreat: ${collapseStages[promise.requiredStopIndex].title}`);
    lines.push(
      `Your stop line: ${selected === null ? "Not set" : collapseStages[selected].title}`
    );
    lines.push(`Verdict: ${verdict.title}`);
    lines.push(`Meaning: ${verdict.meaning}`);
    lines.push(`Why it matters: ${verdict.significance}`);
    lines.push("Christian parallels:");
    lines.push(reportParallelsText(promise.parallels));
    lines.push("");
  });

  return lines.join("\n").trim();
}

function renderReport() {
  const summary = buildSummaryMessage();
  const counts = summaryCounts();

  const entries = promises
    .map((promise) => {
      const god = godById.get(promise.godId);
      const verdict = verdictFor(promise);
      const selected = stopLineFor(promise.id);
      return `
        <article class="mirror-report-entry verdict-${escapeHtml(verdict.code)}" style="--case-accent:${god.accent}">
          <h4>${escapeHtml(promise.title)}</h4>
          <p><strong>${escapeHtml(promise.verseRef)}</strong> ${escapeHtml(promise.verse)}</p>
          <p><strong>Your stop line:</strong> ${escapeHtml(
            selected === null ? "Not set" : collapseStages[selected].title
          )}</p>
          <div class="mirror-report-verdict">
            <p><strong>Verdict:</strong> ${escapeHtml(verdict.title)}</p>
            ${explanationPairHtml(verdict.meaning, verdict.significance)}
          </div>
          <div class="mirror-report-parallels">
            <p><strong>Christian parallels:</strong></p>
            <div class="mirror-report-parallel-list">
              ${reportParallelsHtml(promise.parallels)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  refs.reportOutput.innerHTML = `
    <div class="mirror-report-summary">
      <p><strong>Completed:</strong> ${completedCount()} / ${promises.length}</p>
      <p><strong>Fails as a real promise:</strong> ${counts.strict}</p>
      <p><strong>Survives only as comfort:</strong> ${counts.comfort}</p>
      <p><strong>Now denied as a public promise:</strong> ${counts.nonpublic}</p>
      <p><strong>${escapeHtml(summary.title)}</strong> ${escapeHtml(summary.body)}</p>
    </div>
    <div class="mirror-report-entries">
      ${entries}
    </div>
  `;
}

function renderReveal() {
  const done = completedCount();
  const counts = summaryCounts();
  const summary = buildSummaryMessage();

  refs.progressCount.textContent = `${done} / ${promises.length} complete`;
  refs.progressNote.textContent =
    done === promises.length
      ? "Reveal unlocked. Compare your decisions with the Bible parallels below."
      : "Choose one stop line for each promise to unlock the Bible parallels.";

  refs.summaryStrict.textContent = String(counts.strict);
  refs.summaryComfort.textContent = String(counts.comfort);
  refs.summaryNonpublic.textContent = String(counts.nonpublic);
  refs.summaryTitle.textContent = summary.title;
  refs.summaryBody.textContent = summary.body;

  if (done < promises.length) {
    refs.revealStatus.textContent =
      `Reveal is locked: decide ${promises.length - done} more case${promises.length - done === 1 ? "" : "s"} first.`;
    refs.revealNextStep.hidden = true;
    refs.revealGrid.hidden = true;
    refs.revealGrid.innerHTML = "";
    return;
  }

  refs.revealStatus.textContent =
    "Reveal unlocked: these Bible references are often invoked in the same promise-domains as the fictive verses above.";
  refs.revealNextStep.hidden = false;
  refs.revealGrid.hidden = false;
  refs.revealGrid.innerHTML = promises.map(revealCard).join("");
}

async function copyReport() {
  try {
    await navigator.clipboard.writeText(buildReportText());
    refs.reportStatus.textContent = "Report copied.";
  } catch {
    refs.reportStatus.textContent = "Clipboard copy failed.";
  }
}

function attachGlobalEvents() {
  refs.caseButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-promise-id]");
    if (!button || !refs.caseButtons.contains(button)) {
      return;
    }

    selectPromise(button.dataset.promiseId);
  });
  refs.copyReport.addEventListener("click", copyReport);
  refs.printReport.addEventListener("click", () => window.print());
}

function renderAll() {
  renderGodCards();
  renderCaseButtons();
  renderActiveSelection();
  renderActivePromise();
  renderCollapseLadder();
  renderVerdict();
  renderReveal();
  renderReport();
}

attachGlobalEvents();
renderAll();
