const STORAGE_KEY = "moral-particulars-audit-v1";

const issues = [
  {
    id: "1a",
    label: "1a",
    statement: "It would be immoral not to kill abortion doctors if it protected the unborn.",
    terrain: ["lethal force", "abortion", "duty conflicts"],
    tension: "Tests whether fetal-personhood commitments imply private lethal obligation, and what blocks that implication."
  },
  {
    id: "1b",
    label: "1b",
    statement: "It would be morally permissible to kill abortion doctors if it protected the unborn.",
    terrain: ["lethal force", "abortion", "permission"],
    tension: "Tests the distance between moral permission, moral obligation, vigilantism, and ordinary prohibitions on killing."
  },
  {
    id: "2",
    label: "2",
    statement: "It is immoral for divorced individuals to remarry.",
    terrain: ["marriage", "divorce", "sexual ethics"],
    tension: "Tests how texts, exceptions, covenant categories, and pastoral harm are weighted."
  },
  {
    id: "3",
    label: "3",
    statement: "It is immoral to have meals with apostates from Christianity.",
    terrain: ["fellowship", "apostasy", "community boundaries"],
    tension: "Tests the difference between moral contamination, church discipline, hospitality, and ordinary friendship."
  },
  {
    id: "4",
    label: "4",
    statement: "It is immoral to knowingly exceed speed limits.",
    terrain: ["law", "obedience", "ordinary conduct"],
    tension: "Tests whether civil law carries moral force even when the violation is common, minor, or socially tolerated."
  },
  {
    id: "5",
    label: "5",
    statement: "It is immoral for married couples to engage in oral or anal sex.",
    terrain: ["marriage", "sexual ethics", "body norms"],
    tension: "Tests how natural-law reasoning, consent, scriptural silence, tradition, and disgust responses are separated."
  },
  {
    id: "6",
    label: "6",
    statement: "It is immoral to practice circumcision or clitoridectomies.",
    terrain: ["body alteration", "children", "tradition"],
    tension: "Tests whether bundled practices are judged by the same principle or by different facts about harm, consent, covenant, and anatomy."
  },
  {
    id: "7",
    label: "7",
    statement: "It would be moral for a government to kill homosexuals for being homosexual.",
    terrain: ["state violence", "sexuality", "punishment"],
    tension: "Tests whether historical texts, civil law categories, and modern scope limits can be applied without special pleading."
  },
  {
    id: "8",
    label: "8",
    statement: "It is immoral to intentionally make someone believe you feel the opposite of what you actually feel about something.",
    terrain: ["deception", "emotion", "truth-telling"],
    tension: "Tests how deception, privacy, tact, safety, emotional labor, and truthfulness are ranked."
  },
  {
    id: "9",
    label: "9",
    statement: "It is immoral to spend this earthly life enjoying earthly pleasures when unGospelled unbelievers face eternity in Hell, when you will have eternity in Heaven to relax.",
    terrain: ["hell", "mission", "pleasure"],
    tension: "Tests whether eternal stakes imply maximal evangelistic sacrifice, and what principle permits ordinary enjoyment."
  },
  {
    id: "10",
    label: "10",
    statement: "It is immoral to fight for a country in a war merely for more territory.",
    terrain: ["war", "state loyalty", "territory"],
    tension: "Tests just-war reasoning, obedience to authority, loyalty, and the morality of aggression."
  },
  {
    id: "11",
    label: "11",
    statement: "It is immoral to divorce over a spouse merely romantically kissing another individual.",
    terrain: ["divorce", "betrayal", "marriage"],
    tension: "Tests how adultery, betrayal, covenant rupture, forgiveness, safety, and proportionality are defined."
  },
  {
    id: "12",
    label: "12",
    statement: "It is immoral not to send money to help someone you know who is starving to death.",
    terrain: ["aid", "property", "urgent need"],
    tension: "Tests whether proximity, ability, sacrifice, stewardship, and love of neighbor create a concrete duty."
  }
];

const stances = [
  { id: "strong-support", label: "Strongly support", short: "Support++", score: 2 },
  { id: "support", label: "Support", short: "Support", score: 1 },
  { id: "unsure", label: "Unsure", short: "Unsure", score: 0 },
  { id: "oppose", label: "Oppose", short: "Oppose", score: -1 },
  { id: "strong-oppose", label: "Strongly oppose", short: "Oppose++", score: -2 }
];

const grounders = [
  {
    id: "scripture",
    label: "Scripture",
    short: "Scripture",
    help: "Direct texts, canonical patterns, covenant distinctions, and interpretive rules."
  },
  {
    id: "gods-nature",
    label: "God's nature",
    short: "God's nature",
    help: "Claims about God's character as the standard for goodness."
  },
  {
    id: "divine-command",
    label: "Divine command",
    short: "Command",
    help: "A command or prohibition treated as binding because God has issued it."
  },
  {
    id: "holy-spirit",
    label: "Holy Spirit",
    short: "Spirit",
    help: "Prayerful discernment, conviction, guidance, or perceived spiritual prompting."
  },
  {
    id: "conscience",
    label: "Conscience",
    short: "Conscience",
    help: "Inner moral awareness, intuition, guilt, or felt recognition of right and wrong."
  },
  {
    id: "church-tradition",
    label: "Church tradition",
    short: "Tradition",
    help: "Historic teaching, denominational authority, creeds, catechisms, or inherited practice."
  },
  {
    id: "pastoral-authority",
    label: "Pastoral authority",
    short: "Pastors",
    help: "Trusted teachers, elders, pastors, apologists, or ministry communities."
  },
  {
    id: "reason-natural-law",
    label: "Reason / natural law",
    short: "Reason",
    help: "Moral reasoning about purposes, nature, consistency, rights, or duty."
  },
  {
    id: "love-neighbor",
    label: "Love of neighbor",
    short: "Love",
    help: "The great commandments, mercy, charity, care, and neighbor-protecting duties."
  },
  {
    id: "harm-flourishing",
    label: "Harm / flourishing",
    short: "Flourishing",
    help: "Likely effects on bodies, relationships, communities, dignity, and wellbeing."
  },
  {
    id: "social-norms",
    label: "Social norms",
    short: "Norms",
    help: "What one's family, church, political group, culture, or era treats as obvious."
  },
  {
    id: "consequences",
    label: "Consequences",
    short: "Consequences",
    help: "Expected outcomes, deterrence, slippery slopes, incentives, or social stability."
  }
];

const disagreementSources = [
  {
    id: "spiritual-rebellion",
    label: "Spiritual rebellion",
    short: "Rebellion",
    family: "soul",
    help: "The person resists God, truth, repentance, or moral accountability."
  },
  {
    id: "unredeemed-soul",
    label: "Unredeemed soul",
    short: "Unredeemed",
    family: "soul",
    help: "The disagreement is attributed to not being spiritually regenerated."
  },
  {
    id: "intellectual-confusion",
    label: "Intellectual confusion",
    short: "Confusion",
    family: "method",
    help: "The person is mistaken, unclear, inconsistent, or reasoning poorly."
  },
  {
    id: "unfamiliar-scripture",
    label: "Unfamiliarity with Scripture",
    short: "Scripture gap",
    family: "method",
    help: "The person does not know the relevant texts or canonical context."
  },
  {
    id: "bad-interpretation",
    label: "Bad interpretation",
    short: "Interpretation",
    family: "method",
    help: "The person knows the texts but applies a faulty hermeneutic."
  },
  {
    id: "different-facts",
    label: "Different factual beliefs",
    short: "Facts",
    family: "method",
    help: "The person accepts different empirical assumptions about harm, risk, consent, or consequences."
  },
  {
    id: "different-principle",
    label: "Different moral principle",
    short: "Principle",
    family: "method",
    help: "The person ranks duties, rights, mercy, justice, liberty, or authority differently."
  },
  {
    id: "cultural-conditioning",
    label: "Cultural conditioning",
    short: "Culture",
    family: "social",
    help: "The person's community, era, politics, or social incentives shape the judgment."
  },
  {
    id: "denominational-formation",
    label: "Denominational formation",
    short: "Denomination",
    family: "social",
    help: "The disagreement follows from church tradition, training, or institutional identity."
  },
  {
    id: "trauma-experience",
    label: "Personal experience",
    short: "Experience",
    family: "affective",
    help: "The person has lived experience, trauma, empathy, fear, or trust patterns that affect the case."
  },
  {
    id: "self-interest",
    label: "Self-interest or fear",
    short: "Interest",
    family: "affective",
    help: "The person has something to gain, avoid, protect, or signal."
  },
  {
    id: "compassion-emphasis",
    label: "Compassion emphasis",
    short: "Compassion",
    family: "affective",
    help: "The person gives mercy, care, harm reduction, or vulnerability more weight."
  }
];

const presets = [
  {
    id: "scripture-first",
    label: "Scripture-first",
    description: "Heavy scripture, command, tradition, and interpretation diagnosis.",
    grounders: {
      scripture: 9,
      "divine-command": 7,
      "church-tradition": 5,
      conscience: 3,
      "reason-natural-law": 4
    },
    disagreement: {
      "unfamiliar-scripture": 7,
      "bad-interpretation": 7,
      "intellectual-confusion": 5,
      "cultural-conditioning": 4
    }
  },
  {
    id: "spirit-conscience",
    label: "Spirit and conscience",
    description: "Emphasizes guidance, conviction, and inward moral awareness.",
    grounders: {
      "holy-spirit": 8,
      conscience: 8,
      scripture: 5,
      "love-neighbor": 5,
      "harm-flourishing": 4
    },
    disagreement: {
      "intellectual-confusion": 5,
      "spiritual-rebellion": 5,
      "unredeemed-soul": 4,
      "different-principle": 4
    }
  },
  {
    id: "natural-law-harm",
    label: "Reason and harm",
    description: "Weights consistency, natural law, neighbor love, and human effects.",
    grounders: {
      "reason-natural-law": 8,
      "harm-flourishing": 8,
      "love-neighbor": 7,
      conscience: 5,
      scripture: 4
    },
    disagreement: {
      "different-facts": 7,
      "different-principle": 7,
      "intellectual-confusion": 5,
      "cultural-conditioning": 5
    }
  },
  {
    id: "community-formed",
    label: "Community-formed",
    description: "Shows when the judgment is carried by inherited Christian norms.",
    grounders: {
      "social-norms": 8,
      "church-tradition": 7,
      "pastoral-authority": 7,
      scripture: 5,
      conscience: 4
    },
    disagreement: {
      "denominational-formation": 7,
      "cultural-conditioning": 7,
      "bad-interpretation": 4,
      "different-principle": 4
    }
  }
];

function defaultIssueState() {
  return {
    stance: "",
    grounders: {},
    disagreement: {},
    notes: ""
  };
}

function defaultState() {
  return {
    selectedIssueId: issues[0].id,
    issueStates: Object.fromEntries(issues.map((issue) => [issue.id, defaultIssueState()])),
    reportMode: "current"
  };
}

let state = loadState();

const refs = {
  aiPrompt: document.querySelector("#aiPrompt"),
  attributionBoard: document.querySelector("#attributionBoard"),
  caseLedger: document.querySelector("#caseLedger"),
  caseNotes: document.querySelector("#caseNotes"),
  casePromptBoard: document.querySelector("#casePromptBoard"),
  clearCurrentButton: document.querySelector("#clearCurrentButton"),
  completedCases: document.querySelector("#completedCases"),
  copyAiPromptButton: document.querySelector("#copyAiPromptButton"),
  copyReportButton: document.querySelector("#copyReportButton"),
  copyStatus: document.querySelector("#copyStatus"),
  currentJudgment: document.querySelector("#currentJudgment"),
  currentJudgmentNote: document.querySelector("#currentJudgmentNote"),
  disagreementGrid: document.querySelector("#disagreementGrid"),
  disagreementLens: document.querySelector("#disagreementLens"),
  disagreementLensNote: document.querySelector("#disagreementLensNote"),
  finalReport: document.querySelector("#finalReport"),
  grounderGrid: document.querySelector("#grounderGrid"),
  issueGrid: document.querySelector("#issueGrid"),
  leadGrounder: document.querySelector("#leadGrounder"),
  leadGrounderNote: document.querySelector("#leadGrounderNote"),
  ledgerPercent: document.querySelector("#ledgerPercent"),
  ledgerStatusBody: document.querySelector("#ledgerStatusBody"),
  opposeCount: document.querySelector("#opposeCount"),
  patternList: document.querySelector("#patternList"),
  presetButtons: document.querySelector("#presetButtons"),
  printReportButton: document.querySelector("#printReportButton"),
  reportMode: document.querySelector("#reportMode"),
  resetButton: document.querySelector("#resetButton"),
  selectedIssueText: document.querySelector("#selectedIssueText"),
  stanceGrid: document.querySelector("#stanceGrid"),
  supportCount: document.querySelector("#supportCount"),
  topGrounderList: document.querySelector("#topGrounderList"),
  unsureCount: document.querySelector("#unsureCount")
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normalizeState(stored);
  } catch {
    return defaultState();
  }
}

function normalizeState(source) {
  const base = defaultState();
  if (!source || typeof source !== "object") return base;
  const selectedIssueId = issues.some((issue) => issue.id === source.selectedIssueId)
    ? source.selectedIssueId
    : base.selectedIssueId;
  const issueStates = Object.fromEntries(
    issues.map((issue) => {
      const saved = source.issueStates?.[issue.id] || {};
      return [
        issue.id,
        {
          ...defaultIssueState(),
          ...saved,
          grounders: { ...(saved.grounders || {}) },
          disagreement: { ...(saved.disagreement || {}) },
          notes: typeof saved.notes === "string" ? saved.notes : ""
        }
      ];
    })
  );
  return {
    ...base,
    selectedIssueId,
    issueStates,
    reportMode: ["current", "all", "patterns"].includes(source.reportMode) ? source.reportMode : "current"
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentIssue() {
  return issues.find((issue) => issue.id === state.selectedIssueId) || issues[0];
}

function currentData() {
  return state.issueStates[currentIssue().id];
}

function stanceById(id) {
  return stances.find((stance) => stance.id === id);
}

function sliderValue(group, id) {
  return Math.max(0, Math.min(10, Number(group?.[id]) || 0));
}

function hasAnyWeight(group) {
  return Object.values(group || {}).some((value) => Number(value) > 0);
}

function issueIsMapped(issueId) {
  const item = state.issueStates[issueId];
  return Boolean(item?.stance && hasAnyWeight(item.grounders) && hasAnyWeight(item.disagreement));
}

function topWeighted(defs, group, count = 3) {
  return defs
    .map((def) => ({ ...def, value: sliderValue(group, def.id) }))
    .filter((def) => def.value > 0)
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, count);
}

function sumWeights(defs, group, filter = () => true) {
  return defs
    .filter(filter)
    .reduce((total, def) => total + sliderValue(group, def.id), 0);
}

function labelForValue(value) {
  if (value >= 9) return "Decisive";
  if (value >= 7) return "Strong";
  if (value >= 4) return "Moderate";
  if (value >= 1) return "Light";
  return "None";
}

function disagreementProfile(issueState) {
  const soul = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "soul");
  const method = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "method");
  const social = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "social");
  const affective = sumWeights(disagreementSources, issueState.disagreement, (source) => source.family === "affective");
  const total = soul + method + social + affective;
  let label = "Blank";
  let note = "No diagnosis weighted yet";
  if (total > 0) {
    const ordered = [
      { label: "Soul-coded", value: soul, note: "Spiritual or regeneration explanations dominate" },
      { label: "Method-heavy", value: method, note: "Reasoning, facts, or interpretation dominate" },
      { label: "Socially formed", value: social, note: "Community and culture explanations dominate" },
      { label: "Affective", value: affective, note: "Experience, fear, or compassion explanations dominate" }
    ].sort((a, b) => b.value - a.value);
    label = ordered[0].value === ordered[1]?.value ? "Mixed" : ordered[0].label;
    note = ordered[0].value === ordered[1]?.value ? "Several attribution families are close" : ordered[0].note;
  }
  return { soul, method, social, affective, total, label, note };
}

function render() {
  renderIssueGrid();
  renderPresetButtons();
  renderSelectedIssue();
  renderStances();
  renderSliders();
  renderLedger();
  renderAttributionBoard();
  renderPrompts();
  renderPatterns();
  renderReports();
  updateMetrics();
}

function renderIssueGrid() {
  refs.issueGrid.innerHTML = issues
    .map((issue) => {
      const item = state.issueStates[issue.id];
      const stance = stanceById(item.stance);
      const mapped = issueIsMapped(issue.id);
      const active = issue.id === state.selectedIssueId;
      return `
        <button class="particular-issue-card ${active ? "active" : ""} ${mapped ? "mapped" : ""}" type="button" data-issue="${escapeHtml(issue.id)}">
          <span class="particular-issue-number">${escapeHtml(issue.label)}</span>
          <span class="particular-issue-body">
            <strong>${escapeHtml(issue.statement)}</strong>
            <small>${escapeHtml(stance?.short || "Unset")} - ${mapped ? "mapped" : "open"}</small>
          </span>
        </button>
      `;
    })
    .join("");

  refs.issueGrid.querySelectorAll("[data-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedIssueId = button.dataset.issue;
      saveState();
      render();
      document.querySelector("#judgment-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderPresetButtons() {
  refs.presetButtons.innerHTML = presets
    .map(
      (preset) => `
        <button class="moral-lens-button" type="button" data-preset="${escapeHtml(preset.id)}">
          <strong>${escapeHtml(preset.label)}</strong>
          <span>${escapeHtml(preset.description)}</span>
        </button>
      `
    )
    .join("");

  refs.presetButtons.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = presets.find((item) => item.id === button.dataset.preset);
      if (!preset) return;
      const item = currentData();
      item.grounders = { ...item.grounders, ...preset.grounders };
      item.disagreement = { ...item.disagreement, ...preset.disagreement };
      saveState();
      render();
    });
  });
}

function renderSelectedIssue() {
  const issue = currentIssue();
  refs.selectedIssueText.innerHTML = `
    <span class="particular-selected-label">Case ${escapeHtml(issue.label)}</span>
    ${escapeHtml(issue.statement)}
  `;
  refs.caseNotes.value = currentData().notes || "";
}

function renderStances() {
  const item = currentData();
  refs.stanceGrid.innerHTML = stances
    .map(
      (stance) => `
        <label class="particular-stance-option">
          <input type="radio" name="stance" value="${escapeHtml(stance.id)}" ${item.stance === stance.id ? "checked" : ""}>
          <span>${escapeHtml(stance.label)}</span>
        </label>
      `
    )
    .join("");

  refs.stanceGrid.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      currentData().stance = input.value;
      saveState();
      render();
    });
  });
}

function sliderMarkup(kind, def, value) {
  return `
    <article class="particular-slider-card">
      <div class="particular-slider-head">
        <strong>${escapeHtml(def.label)}</strong>
        <span>${escapeHtml(labelForValue(value))} ${value}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value="${value}"
        data-kind="${escapeHtml(kind)}"
        data-slider="${escapeHtml(def.id)}"
        aria-label="${escapeHtml(def.label)} weight"
      >
      <p>${escapeHtml(def.help)}</p>
    </article>
  `;
}

function renderSliders() {
  const item = currentData();
  refs.grounderGrid.innerHTML = grounders
    .map((grounder) => sliderMarkup("grounder", grounder, sliderValue(item.grounders, grounder.id)))
    .join("");
  refs.disagreementGrid.innerHTML = disagreementSources
    .map((source) => sliderMarkup("disagreement", source, sliderValue(item.disagreement, source.id)))
    .join("");

  [...refs.grounderGrid.querySelectorAll("input"), ...refs.disagreementGrid.querySelectorAll("input")].forEach((input) => {
    input.addEventListener("input", () => {
      const itemData = currentData();
      const target = input.dataset.kind === "grounder" ? itemData.grounders : itemData.disagreement;
      const value = Number(input.value);
      target[input.dataset.slider] = value;
      const valueBadge = input.closest(".particular-slider-card")?.querySelector(".particular-slider-head span");
      if (valueBadge) valueBadge.textContent = `${labelForValue(value)} ${value}/10`;
      saveState();
      renderLedger();
      renderAttributionBoard();
      renderPrompts();
      renderPatterns();
      renderReports();
      updateMetrics();
    });
  });
}

function renderLedger() {
  const completed = issues.filter((issue) => issueIsMapped(issue.id)).length;
  const percent = Math.round((completed / issues.length) * 100);
  refs.ledgerPercent.textContent = `${percent}%`;
  refs.ledgerStatusBody.textContent =
    completed < 3
      ? "Map several cases before drawing cross-case conclusions."
      : "The ledger is now useful for spotting repeated grounders, special-case exceptions, and disagreement patterns.";

  refs.caseLedger.innerHTML = issues
    .map((issue) => {
      const item = state.issueStates[issue.id];
      const stance = stanceById(item.stance);
      const statusClass = issueIsMapped(issue.id) ? "ready" : item.stance || hasAnyWeight(item.grounders) ? "thin" : "";
      const top = topWeighted(grounders, item.grounders, 1)[0];
      return `
        <button class="component-status ledger-case ${statusClass}" type="button" data-ledger-issue="${escapeHtml(issue.id)}">
          <span>${escapeHtml(issue.label)}. ${escapeHtml(stance?.short || "Unset")}</span>
          <strong>${issueIsMapped(issue.id) ? "mapped" : "open"}</strong>
          <small>${escapeHtml(top ? `${top.short} ${top.value}/10` : "No lead grounder")}</small>
        </button>
      `;
    })
    .join("");

  refs.caseLedger.querySelectorAll("[data-ledger-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedIssueId = button.dataset.ledgerIssue;
      saveState();
      render();
      document.querySelector("#judgment-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const totals = grounders
    .map((grounder) => ({
      ...grounder,
      value: issues.reduce((total, issue) => total + sliderValue(state.issueStates[issue.id].grounders, grounder.id), 0)
    }))
    .filter((grounder) => grounder.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  refs.topGrounderList.innerHTML = `
    <p class="app-step">Most used grounders</p>
    ${
      totals.length
        ? totals.map((grounder) => `<article><strong>${escapeHtml(grounder.label)}</strong><span>${grounder.value}</span></article>`).join("")
        : "<article><strong>No grounders weighted yet</strong><span>0</span></article>"
    }
  `;
}

function updateMetrics() {
  const item = currentData();
  const completed = issues.filter((issue) => issueIsMapped(issue.id)).length;
  const stance = stanceById(item.stance);
  const topGrounder = topWeighted(grounders, item.grounders, 1)[0];
  const profile = disagreementProfile(item);
  const supportCount = issues.filter((issue) => (stanceById(state.issueStates[issue.id].stance)?.score || 0) > 0).length;
  const opposeCount = issues.filter((issue) => (stanceById(state.issueStates[issue.id].stance)?.score || 0) < 0).length;
  const unsureCount = issues.filter((issue) => state.issueStates[issue.id].stance === "unsure").length;

  refs.completedCases.textContent = `${completed}/${issues.length}`;
  refs.currentJudgment.textContent = stance?.short || "Unset";
  refs.currentJudgmentNote.textContent = stance ? `Case ${currentIssue().label}` : "No stance selected";
  refs.leadGrounder.textContent = topGrounder?.short || "None";
  refs.leadGrounderNote.textContent = topGrounder ? `${topGrounder.label} is ${topGrounder.value}/10` : "No grounder weighted yet";
  refs.disagreementLens.textContent = profile.label;
  refs.disagreementLensNote.textContent = profile.note;
  refs.supportCount.textContent = supportCount;
  refs.opposeCount.textContent = opposeCount;
  refs.unsureCount.textContent = unsureCount;
}

function renderAttributionBoard() {
  const profile = disagreementProfile(currentData());
  const groups = [
    { label: "Soul diagnosis", value: profile.soul },
    { label: "Method diagnosis", value: profile.method },
    { label: "Social diagnosis", value: profile.social },
    { label: "Affective diagnosis", value: profile.affective }
  ];

  refs.attributionBoard.innerHTML = groups
    .map((group) => {
      const width = profile.total ? Math.round((group.value / profile.total) * 100) : 0;
      return `
        <article class="particular-balance-row">
          <div>
            <strong>${escapeHtml(group.label)}</strong>
            <span>${group.value} total weight</span>
          </div>
          <div class="particular-balance-track" aria-hidden="true">
            <span style="width: ${width}%"></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPrompts() {
  const prompts = promptsForIssue(currentIssue(), currentData());
  refs.casePromptBoard.innerHTML = prompts
    .map(
      (prompt) => `
        <article class="prompt-card">
          <strong>${escapeHtml(prompt.title)}</strong>
          <p>${escapeHtml(prompt.body)}</p>
        </article>
      `
    )
    .join("");
}

function promptsForIssue(issue, item) {
  const prompts = [
    {
      title: "Grounding clarity",
      body: "Which grounder would still carry the judgment if the others were removed?"
    }
  ];
  const top = topWeighted(grounders, item.grounders, 3);
  const profile = disagreementProfile(item);
  const stance = stanceById(item.stance);

  if (top.some((grounder) => grounder.id === "scripture")) {
    prompts.push({
      title: "Scripture check",
      body: "Which text and interpretive rule do the decisive work, and would the same rule decide a nearby case the same way?"
    });
  }
  if (top.some((grounder) => grounder.id === "holy-spirit")) {
    prompts.push({
      title: "Private guidance check",
      body: "If two sincere Christians report opposite guidance on this case, what public method resolves the conflict?"
    });
  }
  if (top.some((grounder) => grounder.id === "social-norms")) {
    prompts.push({
      title: "Norm reversal check",
      body: "Would the judgment feel equally obvious if your church, family, or political community normalized the opposite answer?"
    });
  }
  if (profile.soul >= profile.method + 6 && profile.soul >= 8) {
    prompts.push({
      title: "Soul diagnosis check",
      body: "What evidence would move the disagreement from spiritual diagnosis to honest interpretive or factual disagreement?"
    });
  }
  if (["1a", "1b", "7"].includes(issue.id) && stance?.score > 0) {
    prompts.push({
      title: "Lethal-force boundary",
      body: "What principle permits killing in this case without also licensing private violence, state cruelty, or rival groups using the same structure?"
    });
  }
  if (issue.id === "6") {
    prompts.push({
      title: "Bundled-practice check",
      body: "Are circumcision and clitoridectomy being judged by one shared principle, or do harm, consent, anatomy, and covenant status separate the cases?"
    });
  }
  if (issue.id === "9" && stance?.score < 0) {
    prompts.push({
      title: "Eternal-stakes check",
      body: "What principle permits ordinary pleasure if endless loss for the unevangelized is treated as a live moral emergency?"
    });
  }
  if (prompts.length < 4) {
    prompts.push({
      title: "Disagreement charity",
      body: "Can you state the strongest non-rebellious reason a sincere Christian might reach the opposite answer?"
    });
  }
  return prompts.slice(0, 5);
}

function renderPatterns() {
  const patterns = buildPatterns();
  refs.patternList.innerHTML = patterns
    .map(
      (pattern, index) => `
        <article class="challenge-card challenge-${escapeHtml(pattern.pressure)}">
          <div class="challenge-card-top">
            <span class="challenge-number">${index + 1}</span>
            <div class="challenge-title-block">
              <div class="challenge-meta">
                <span class="challenge-type">${escapeHtml(pattern.type)}</span>
                <span class="pressure ${escapeHtml(pattern.pressure)}">${escapeHtml(pattern.pressure)}</span>
              </div>
              <h3>${escapeHtml(pattern.title)}</h3>
              <p class="challenge-summary">${escapeHtml(pattern.summary)}</p>
            </div>
          </div>
          <div class="challenge-counterfactual">
            <strong>${escapeHtml(pattern.check)}</strong>
            <p>${escapeHtml(pattern.question)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function buildPatterns() {
  const mapped = issues.filter((issue) => issueIsMapped(issue.id));
  const patterns = [];
  const totals = Object.fromEntries(grounders.map((grounder) => [grounder.id, 0]));
  const disagreementTotals = Object.fromEntries(disagreementSources.map((source) => [source.id, 0]));

  issues.forEach((issue) => {
    const item = state.issueStates[issue.id];
    grounders.forEach((grounder) => {
      totals[grounder.id] += sliderValue(item.grounders, grounder.id);
    });
    disagreementSources.forEach((source) => {
      disagreementTotals[source.id] += sliderValue(item.disagreement, source.id);
    });
  });

  if (mapped.length < 3) {
    patterns.push({
      type: "Coverage",
      pressure: "medium",
      title: "Thin sample",
      summary: "Fewer than three cases are fully mapped, so cross-case patterns may be accidental.",
      check: "Map more cases before treating the ledger as stable.",
      question: "Would the same grounders carry judgments in easy, hard, private, public, sexual, violent, and generosity cases?"
    });
  }

  const socialHeavy = issues.filter((issue) => sliderValue(state.issueStates[issue.id].grounders, "social-norms") >= 7);
  if (socialHeavy.length) {
    patterns.push({
      type: "Grounding",
      pressure: "high",
      title: "Social norms are doing visible work",
      summary: `${socialHeavy.map((issue) => issue.label).join(", ")} give social norms strong weight.`,
      check: "Norm sensitivity test",
      question: "If the surrounding Christian culture changed, would the moral judgment survive by the same stated grounders?"
    });
  }

  const soulDominant = issues.filter((issue) => {
    const profile = disagreementProfile(state.issueStates[issue.id]);
    return profile.soul >= 10 && profile.soul > profile.method + profile.social + profile.affective;
  });
  if (soulDominant.length) {
    patterns.push({
      type: "Disagreement",
      pressure: "high",
      title: "Disagreement is being spiritualized",
      summary: `${soulDominant.map((issue) => issue.label).join(", ")} diagnose disagreement mainly through rebellion or regeneration categories.`,
      check: "Charity and falsifiability test",
      question: "What would count as a sincere, informed, non-rebellious disagreement on those cases?"
    });
  }

  const support1a = stanceById(state.issueStates["1a"].stance)?.score || 0;
  const support1b = stanceById(state.issueStates["1b"].stance)?.score || 0;
  if (support1a > 0 && support1b < 0) {
    patterns.push({
      type: "Logic",
      pressure: "high",
      title: "Obligation without permission",
      summary: "Case 1a is supported while case 1b is opposed.",
      check: "Deontic consistency test",
      question: "If not killing abortion doctors would be immoral, how would killing them fail to be at least morally permissible?"
    });
  }

  const lethalSupported = ["1a", "1b", "7"].filter((id) => (stanceById(state.issueStates[id].stance)?.score || 0) > 0);
  if (lethalSupported.length) {
    patterns.push({
      type: "Boundary",
      pressure: "high",
      title: "Lethal-force support needs a limiting rule",
      summary: `${lethalSupported.join(", ")} support statements involving killing.`,
      check: "Limiting-principle test",
      question: "What rule prevents the same reasoning from authorizing rival groups, private actors, or states to kill under their own contested moral premises?"
    });
  }

  const dominantGrounder = grounders
    .map((grounder) => ({ ...grounder, value: totals[grounder.id] }))
    .sort((a, b) => b.value - a.value)[0];
  if (dominantGrounder?.value > 0) {
    patterns.push({
      type: "Dependency",
      pressure: dominantGrounder.value >= mapped.length * 7 ? "medium" : "low",
      title: `${dominantGrounder.label} is the dominant dependency`,
      summary: `${dominantGrounder.label} has ${dominantGrounder.value} total weight across the ledger.`,
      check: "Dependency concentration test",
      question: "If this grounder were disputed, how many judgments would still be justified by independent routes?"
    });
  }

  const unmappedWithStance = issues.filter((issue) => {
    const item = state.issueStates[issue.id];
    return item.stance && (!hasAnyWeight(item.grounders) || !hasAnyWeight(item.disagreement));
  });
  if (unmappedWithStance.length) {
    patterns.push({
      type: "Completeness",
      pressure: "medium",
      title: "Some stances have missing support structure",
      summary: `${unmappedWithStance.map((issue) => issue.label).join(", ")} have a judgment but lack grounder or disagreement weights.`,
      check: "Support completion test",
      question: "Is the judgment being asserted faster than its grounding and disagreement explanation can be named?"
    });
  }

  return patterns.slice(0, 8);
}

function renderReports() {
  refs.reportMode.value = state.reportMode;
  refs.finalReport.value = buildReport();
  refs.aiPrompt.value = buildAiPrompt();
}

function buildReport() {
  const mode = state.reportMode;
  if (mode === "patterns") return buildPatternReport();
  if (mode === "all") return buildAllCasesReport();
  return buildCurrentCaseReport();
}

function formatIssueSummary(issue) {
  const item = state.issueStates[issue.id];
  const stance = stanceById(item.stance)?.label || "Unset";
  const topGrounders = topWeighted(grounders, item.grounders, 4)
    .map((grounder) => `${grounder.label} ${grounder.value}/10`)
    .join("; ") || "None";
  const topDisagreement = topWeighted(disagreementSources, item.disagreement, 4)
    .map((source) => `${source.label} ${source.value}/10`)
    .join("; ") || "None";
  return [
    `${issue.label}. ${issue.statement}`,
    `Judgment: ${stance}`,
    `Lead grounders: ${topGrounders}`,
    `Disagreement diagnosis: ${topDisagreement}`,
    item.notes.trim() ? `Qualifiers: ${item.notes.trim()}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCurrentCaseReport() {
  const issue = currentIssue();
  const item = currentData();
  const prompts = promptsForIssue(issue, item).map((prompt) => `- ${prompt.title}: ${prompt.body}`).join("\n");
  return [
    "Moral Particulars Audit - Current Case",
    "",
    formatIssueSummary(issue),
    "",
    `Case tension: ${issue.tension}`,
    "",
    "Pressure prompts:",
    prompts
  ].join("\n");
}

function buildAllCasesReport() {
  const mapped = issues.filter((issue) => issueIsMapped(issue.id));
  const cases = (mapped.length ? mapped : issues)
    .map((issue) => formatIssueSummary(issue))
    .join("\n\n---\n\n");
  return [
    "Moral Particulars Audit - Case Ledger",
    "",
    `Mapped cases: ${mapped.length}/${issues.length}`,
    "",
    cases
  ].join("\n");
}

function buildPatternReport() {
  const patterns = buildPatterns()
    .map((pattern, index) => `${index + 1}. ${pattern.title} [${pattern.pressure}]\n${pattern.summary}\nCheck: ${pattern.check}\nQuestion: ${pattern.question}`)
    .join("\n\n");
  return [
    "Moral Particulars Audit - Pattern Report",
    "",
    `Mapped cases: ${issues.filter((issue) => issueIsMapped(issue.id)).length}/${issues.length}`,
    "",
    patterns || "No patterns yet."
  ].join("\n");
}

function buildAiPrompt() {
  const payload = {
    selectedIssue: currentIssue(),
    selectedIssueState: currentData(),
    mappedCases: issues
      .filter((issue) => issueIsMapped(issue.id))
      .map((issue) => ({
        issue,
        state: state.issueStates[issue.id]
      })),
    patterns: buildPatterns()
  };
  return [
    "You are stress-testing a Christian moral-particulars map. Do not merely restate the user's view.",
    "Identify the strongest grounding gaps, inconsistent case distinctions, missing limiting principles, and disagreement-diagnosis problems.",
    "For each critique, also give the strongest fair Christian repair attempt.",
    "",
    JSON.stringify(payload, null, 2)
  ].join("\n");
}

async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    refs.copyStatus.textContent = `${label} copied.`;
  } catch {
    refs.copyStatus.textContent = `Could not copy ${label.toLowerCase()}.`;
  }
}

refs.caseNotes.addEventListener("input", () => {
  currentData().notes = refs.caseNotes.value;
  saveState();
  renderReports();
});

refs.reportMode.addEventListener("change", () => {
  state.reportMode = refs.reportMode.value;
  saveState();
  renderReports();
});

refs.copyReportButton.addEventListener("click", () => copyText(refs.finalReport.value, "Report"));
refs.copyAiPromptButton.addEventListener("click", () => copyText(refs.aiPrompt.value, "AI prompt"));
refs.printReportButton.addEventListener("click", () => window.print());

refs.clearCurrentButton.addEventListener("click", () => {
  state.issueStates[currentIssue().id] = defaultIssueState();
  saveState();
  render();
});

refs.resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset every moral-particulars entry?")) return;
  state = defaultState();
  saveState();
  render();
});

render();
