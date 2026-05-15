const STORAGE_KEY = "moral-system-threshold-v1";
const STRESS_TEST_BASE_URL = "../moral-system-stress-test/";
let importedFromStress = false;

const stressRouteMap = {
  "divine-command": "divine-command",
  scripture: "scripture",
  "god-nature": "god-nature",
  "holy-spirit": "holy-spirit",
  conscience: "conscience",
  "church-tradition": "church-tradition",
  "reason-natural-law": "natural-law",
  "harm-flourishing": "human-flourishing",
  hybrid: "hybrid"
};

const stressClaimPositionMap = {
  "divine-command": "divine-command",
  scripture: "scripture-authority",
  "god-nature": "god-nature",
  "holy-spirit": "scripture-spirit",
  conscience: "conscience",
  "church-tradition": "church-tradition",
  "reason-natural-law": "natural-law",
  "harm-flourishing": "flourishing-in-god"
};

const routes = [
  {
    id: "divine-command",
    label: "Divine command",
    help: "Treats God's commands as the primary route for moral obligation.",
    claim: "Christian morality is coherent because God's commands ground moral obligation."
  },
  {
    id: "scripture",
    label: "Scripture",
    help: "Treats scripture as the main public route for moral authority and guidance.",
    claim: "Christian morality is coherent because scripture reveals God's binding moral will."
  },
  {
    id: "god-nature",
    label: "God's nature",
    help: "Treats goodness as grounded in God's character rather than in command alone.",
    claim: "Christian morality is coherent because goodness is grounded in God's unchanging nature."
  },
  {
    id: "holy-spirit",
    label: "Holy Spirit",
    help: "Treats prayerful guidance, conviction, or spiritual prompting as central to moral access.",
    claim: "Christian morality is coherent because the Holy Spirit guides believers into God's moral will."
  },
  {
    id: "conscience",
    label: "Conscience",
    help: "Treats inner moral awareness or intuition as central to recognizing objective morality.",
    claim: "Christian morality is coherent because conscience recognizes objective moral truth."
  },
  {
    id: "church-tradition",
    label: "Church tradition",
    help: "Treats the church's historic teaching and communal interpretation as the main route.",
    claim: "Christian morality is coherent because the church's tradition authoritatively preserves moral truth."
  },
  {
    id: "reason-natural-law",
    label: "Reason / natural law",
    help: "Treats reason, purposes, nature, or natural law as the primary moral route.",
    claim: "Christian morality is coherent because reason can discern moral truths built into human nature and creation."
  },
  {
    id: "harm-flourishing",
    label: "Harm / flourishing",
    help: "Treats human flourishing, harm, or wellbeing as the main explanatory route.",
    claim: "Christian morality is coherent because God's design for human flourishing grounds moral truth."
  },
  {
    id: "hybrid",
    label: "Hybrid / mixed route",
    help: "Treats more than one route as load-bearing and wants the blend made explicit.",
    claim: "Christian morality is coherent because scripture, conscience, reason, and tradition together disclose moral truth."
  }
];

const elements = [
  {
    id: "moral-meaning",
    title: "Moral Meaning",
    shortLabel: "Meaning",
    description: "Defines what moral words mean before using them as if they already carry objective content.",
    question: "What do you mean by wrong, good, duty, and obligation?",
    collapse: "Vocabulary without content",
    collapseCopy: "Without this, the view uses moral language before saying what that language means.",
    collapseWhy:
      "The argument can keep using words like wrong, good, duty, and obligation while quietly shifting what those words mean from case to case.",
    collapseRepair:
      "Define the core moral terms and show how those definitions connect to the route you selected, so later claims are using stable content rather than borrowed rhetoric."
  },
  {
    id: "truth-ground",
    title: "Truth Maker",
    shortLabel: "Truth",
    description: "Explains whether moral claims can be true and what in reality makes them true.",
    question: "What makes a moral claim true beyond preference, power, or agreement?",
    collapse: "Preference or power",
    collapseCopy: "Without this, the view sounds moral but functions like approval, command, or social pressure.",
    collapseWhy:
      "A moral claim can sound objective while still operating only as endorsement, force, consensus, or emotional weight if nothing in reality has been named as its truth-maker.",
    collapseRepair:
      "Name what in reality makes the moral claim true and explain why that grounding does more than restate preference, command, or collective approval."
  },
  {
    id: "authority-check",
    title: "Authority Check",
    shortLabel: "Authority",
    description: "Explains how a claimed moral authority is recognized as morally trustworthy without circularity.",
    question: "Why trust the claimed moral authority as good before simply obeying it?",
    collapse: "Obedience without moral test",
    collapseCopy: "Without this, authority itself quietly becomes the definition of morality.",
    collapseWhy:
      "The system starts asking for obedience before it has shown why the authority counts as morally good, rather than merely powerful, inherited, or familiar.",
    collapseRepair:
      "Show how the authority is identified as morally trustworthy without using that same authority as the only proof that it is good."
  },
  {
    id: "moral-access",
    title: "Moral Access",
    shortLabel: "Access",
    description: "Gives accountable agents a usable method for knowing the standard and checking disputes.",
    question: "How can ordinary accountable people know the standard and resolve disagreement?",
    collapse: "Hidden standard",
    collapseCopy: "Without this, people can be judged by a moral standard they cannot reliably access.",
    collapseWhy:
      "The standard may be said to exist somewhere, but ordinary accountable agents still lack a clear public route for knowing it, applying it, and resolving serious disagreement.",
    collapseRepair:
      "Explain the access route, how conflicting interpretations are tested, and what counts as a misreading rather than a mere difference of preference."
  },
  {
    id: "binding-force",
    title: "Binding Force",
    shortLabel: "Binding",
    description: "Explains why the moral claim binds rather than merely advising, rewarding, or warning.",
    question: "Why ought anyone comply even when doing so is costly or unrewarded?",
    collapse: "Practical advice",
    collapseCopy: "Without this, the framework may be useful, but it does not yet explain obligation.",
    collapseWhy:
      "The framework may recommend, warn, reward, or threaten, but it still has not said why anyone is actually obligated rather than merely encouraged.",
    collapseRepair:
      "Show why the claim creates genuine duty even when desire, convenience, and reward all pull in the other direction."
  },
  {
    id: "case-guidance",
    title: "Case Guidance",
    shortLabel: "Cases",
    description: "Shows how the claimed system decides actual cases and ranks duties when they conflict.",
    question: "How does the system decide hard cases before the preferred answer is known?",
    collapse: "Abstraction without decisions",
    collapseCopy: "Without this, the view offers slogans or values but not an action-guiding system.",
    collapseWhy:
      "General values may be present, but the system still lacks a procedure for deciding concrete cases or ranking duties when those values collide.",
    collapseRepair:
      "Give a decision path, ordering principle, or conflict rule that can guide hard cases before the preferred answer is simply assumed."
  },
  {
    id: "consistent-scope",
    title: "Consistent Scope",
    shortLabel: "Scope",
    description: "States who is bound and applies the same standard to like cases across persons and times.",
    question: "Who is bound, and why are like cases treated alike across people, eras, and groups?",
    collapse: "Special pleading",
    collapseCopy: "Without this, exceptions can protect favored authorities, tribes, or historical moments.",
    collapseWhy:
      "The view can preserve its favored judgments by carving out exceptions for insiders, traditions, authorities, or eras without a stable rule for why those exceptions are allowed.",
    collapseRepair:
      "State who is bound and why like cases stay like across persons, cultures, and times rather than shifting with favored communities or moments."
  },
  {
    id: "correction",
    title: "Correction Method",
    shortLabel: "Repair",
    description: "Explains how mistaken moral interpretations are identified and revised without ad hoc convenience.",
    question: "How does the system detect and repair mistaken moral judgments?",
    collapse: "Ad hoc revision",
    collapseCopy: "Without this, every later change can simply be redescribed as correctness.",
    collapseWhy:
      "If no correction standard is named, any later revision can be framed as deeper insight, leaving no principled way to distinguish growth from convenient adjustment.",
    collapseRepair:
      "Name the correction mechanism, the standards it uses, and what would count as a genuine interpretive mistake rather than a preferred update."
  }
];

const statusOptions = [
  { id: "missing", label: "Missing" },
  { id: "asserted", label: "Asserted" },
  { id: "substantiated", label: "Substantiated" }
];

const statusRank = {
  missing: 0,
  asserted: 1,
  substantiated: 2
};

const els = {
  routeSelect: document.getElementById("routeSelect"),
  routeHelp: document.getElementById("routeHelp"),
  claimInput: document.getElementById("claimInput"),
  presetButtons: document.getElementById("presetButtons"),
  checklistGrid: document.getElementById("checklistGrid"),
  resetButton: document.getElementById("resetButton"),
  statusLabel: document.getElementById("statusLabel"),
  statusCopy: document.getElementById("statusCopy"),
  substantiatedCount: document.getElementById("substantiatedCount"),
  missingCount: document.getElementById("missingCount"),
  profileLabel: document.getElementById("profileLabel"),
  profileCopy: document.getElementById("profileCopy"),
  diagnosisHeading: document.getElementById("diagnosisHeading"),
  diagnosisText: document.getElementById("diagnosisText"),
  diagnosisRoute: document.getElementById("diagnosisRoute"),
  readinessLabel: document.getElementById("readinessLabel"),
  diagnosisMissing: document.getElementById("diagnosisMissing"),
  diagnosisAsserted: document.getElementById("diagnosisAsserted"),
  diagnosisSubstantiated: document.getElementById("diagnosisSubstantiated"),
  thresholdReadinessPlot: document.getElementById("thresholdReadinessPlot"),
  thresholdReadinessCopy: document.getElementById("thresholdReadinessCopy"),
  collapseList: document.getElementById("collapseList"),
  summaryOutput: document.getElementById("summaryOutput"),
  aiPromptOutput: document.getElementById("aiPromptOutput"),
  copySummaryButton: document.getElementById("copySummaryButton"),
  copyAiPromptButton: document.getElementById("copyAiPromptButton"),
  summaryCopyStatus: document.getElementById("summaryCopyStatus"),
  aiCopyStatus: document.getElementById("aiCopyStatus"),
  stressLinks: document.querySelectorAll("[data-stress-link]"),
  stressImportBanner: document.getElementById("stressImportBanner"),
  stressImportCopy: document.getElementById("stressImportCopy"),
  stressImportClaim: document.getElementById("stressImportClaim")
};

function createDefaultState() {
  return {
    route: "divine-command",
    claim: routes[0].claim,
    elements: Object.fromEntries(
      elements.map((element) => [element.id, { status: "missing", note: "" }])
    )
  };
}

function normalizeState(source) {
  const defaults = createDefaultState();
  if (!source || typeof source !== "object") return defaults;
  return {
    route: routes.some((route) => route.id === source.route) ? source.route : defaults.route,
    claim: typeof source.claim === "string" ? source.claim : defaults.claim,
    elements: Object.fromEntries(
      elements.map((element) => {
        const current = source.elements?.[element.id] || {};
        return [
          element.id,
          {
            status: statusRank[current.status] >= 0 ? current.status : "missing",
            note: typeof current.note === "string" ? current.note : ""
          }
        ];
      })
    )
  };
}

function loadState() {
  const fromLocation = loadStateFromLocation();
  if (fromLocation) {
    importedFromStress = true;
    const normalized = normalizeState(fromLocation);
    persistState(normalized);
    clearTransferredStateFromLocation();
    return normalized;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    return createDefaultState();
  }
}

const state = loadState();

function saveState() {
  persistState(state);
}

function persistState(snapshot) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function loadStateFromLocation() {
  const searchParams = new URLSearchParams(window.location.search);
  const queryState = searchParams.get("state");
  if (queryState) return decodeStatePayload(queryState);
  return loadStateFromHash();
}

function decodeStatePayloadBytes(encoded) {
  const normalized = encoded.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = window.atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function decodeStatePayload(encoded) {
  try {
    return decodeStatePayloadBytes(encoded);
  } catch {
    try {
      return JSON.parse(decodeURIComponent(escape(window.atob(encoded))));
    } catch {
      return null;
    }
  }
}

function loadStateFromHash() {
  if (!window.location.hash.startsWith("#state=")) return null;
  const encoded = window.location.hash.slice("#state=".length);
  return decodeStatePayload(encoded);
}

function clearTransferredStateFromLocation() {
  const url = new URL(window.location.href);
  let changed = false;
  if (url.searchParams.has("state")) {
    url.searchParams.delete("state");
    changed = true;
  }
  if (url.hash.startsWith("#state=")) {
    url.hash = "";
    changed = true;
  }
  if (!changed) return;
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function getRouteById(routeId) {
  return routes.find((route) => route.id === routeId) || routes[0];
}

function countStatuses() {
  return elements.reduce(
    (totals, element) => {
      const status = getEffectiveStatus(element.id);
      totals[status] += 1;
      return totals;
    },
    { missing: 0, asserted: 0, substantiated: 0 }
  );
}

function hasStatusAtLeast(elementId, target) {
  return statusRank[getEffectiveStatus(elementId)] >= statusRank[target];
}

function noteIsPresent(elementId) {
  return Boolean(state.elements[elementId].note.trim());
}

function selectedSubstantiationNeedsGrounding(elementId) {
  return state.elements[elementId].status === "substantiated" && !noteIsPresent(elementId);
}

function getEffectiveStatus(elementId) {
  if (selectedSubstantiationNeedsGrounding(elementId)) return "asserted";
  return state.elements[elementId].status;
}

function needsSubstantiationWarning(elementId) {
  return selectedSubstantiationNeedsGrounding(elementId);
}

function hasConfirmedSubstantiation(elementId) {
  return state.elements[elementId].status === "substantiated" && noteIsPresent(elementId);
}

function getReadiness(diagnosis) {
  if (diagnosis.status === "Threshold met") return "Yes";
  if (diagnosis.status === "Near threshold") return "Almost";
  return "Not yet";
}

function formatEffectiveStatusLabel(elementId) {
  if (selectedSubstantiationNeedsGrounding(elementId)) {
    return "Asserted (selected substantiated without grounding note)";
  }
  return formatStatusLabel(getEffectiveStatus(elementId));
}

function classifyThreshold(counts) {
  const route = getRouteById(state.route);
  const authorityRoutes = ["divine-command", "scripture", "god-nature", "church-tradition"];
  const innerRoutes = ["holy-spirit", "conscience"];
  const practicalRoutes = ["reason-natural-law", "harm-flourishing"];

  if (counts.substantiated === elements.length) {
    return {
      status: "Threshold met",
      profile: "Candidate moral system",
      summary:
        "Every mandatory component has at least some actual support on the page. The question is no longer whether you have a moral system at all, but whether that system survives the advanced stress test.",
      copy:
        "The threshold has been met. Move next to the advanced Moral System Stress Test, then follow the same architecture into concrete moral particulars."
    };
  }

  if (counts.substantiated + counts.asserted <= 3) {
    return {
      status: "Below threshold",
      profile: "Conclusions without architecture",
      summary:
        "There are moral conclusions or slogans here, but not yet enough architecture to count as a coherent moral system. The missing components are still doing too much hidden work.",
      copy:
        "This is too early for the advanced stress test. First supply the missing architecture instead of leaning on confidence, rhetoric, or familiarity."
    };
  }

  if (authorityRoutes.includes(route.id) && !hasStatusAtLeast("authority-check", "substantiated")) {
    return {
      status: "Below threshold",
      profile: "Rule source with hidden assumptions",
      summary:
        "A moral source has been named, but the account still has not clearly shown why that source counts as morally authoritative without circularity.",
      copy:
        "The page currently looks more like an obedience structure than a fully articulated moral system."
    };
  }

  if (innerRoutes.includes(route.id) && !hasStatusAtLeast("moral-access", "substantiated")) {
    return {
      status: "Below threshold",
      profile: "Intuition-led outlook",
      summary:
        "Private conviction or inner guidance is doing major work, but the method for public access, comparison, and disagreement resolution is still too thin.",
      copy:
        "The current form resembles an intuition set more than a publicly usable moral system."
    };
  }

  if (
    practicalRoutes.includes(route.id) &&
    (!hasStatusAtLeast("truth-ground", "substantiated") || !hasStatusAtLeast("binding-force", "substantiated"))
  ) {
    return {
      status: "Below threshold",
      profile: "Practical framework",
      summary:
        "The account may explain what helps humans flourish, but it still has not fully explained what makes moral claims true or why those claims bind as obligations.",
      copy:
        "The current structure still looks closer to strong advice than to a complete moral system."
    };
  }

  if (!hasStatusAtLeast("case-guidance", "substantiated")) {
    return {
      status: "Below threshold",
      profile: "Abstract value language",
      summary:
        "There is meaningful moral language here, but the account still does not clearly decide cases before the preferred conclusion is already in view.",
      copy:
        "Until the method can decide hard cases, the architecture remains incomplete."
    };
  }

  if (!hasStatusAtLeast("consistent-scope", "substantiated") || !hasStatusAtLeast("correction", "substantiated")) {
    return {
      status: "Near threshold",
      profile: "Local code under revision",
      summary:
        "A substantial architecture is visible, but it still lacks a stable way to define its scope or repair bad interpretations without special pleading.",
      copy:
        "You are close enough to continue to the advanced stress test, but the remaining gaps are structural, not cosmetic."
    };
  }

  return {
    status: "Near threshold",
    profile: "Partial moral architecture",
    summary:
      "Several required components are present, but one or more still remain asserted rather than fully substantiated. The shape of a system is visible without yet being complete.",
    copy:
      "Use the remaining thin components as your prep list before or during the advanced stress test."
  };
}

function renderRouteSelect() {
  els.routeSelect.innerHTML = routes
    .map((route) => `<option value="${route.id}">${route.label}</option>`)
    .join("");
  els.routeSelect.value = state.route;
}

function renderPresetButtons() {
  els.presetButtons.innerHTML = routes
    .map(
      (route) => `
        <button class="moral-lens-button" type="button" data-route-preset="${route.id}">
          <strong>${route.label}</strong>
          <span>${route.help}</span>
        </button>
      `
    )
    .join("");
}

function renderChecklist() {
  els.checklistGrid.innerHTML = elements
    .map((element) => {
      const current = state.elements[element.id];
      const warningVisible = needsSubstantiationWarning(element.id);
      const groundedSubstantiation = hasConfirmedSubstantiation(element.id);
      const cardClasses = [
        "threshold-item-card",
        groundedSubstantiation ? "is-supported-substantiated" : "",
        warningVisible ? "needs-support-note-warning" : ""
      ]
        .filter(Boolean)
        .join(" ");
      return `
        <article class="${cardClasses}" data-element-id="${element.id}">
          <div class="threshold-item-head">
            <div>
              <p class="app-step">${element.title}</p>
              <h3>${element.description}</h3>
            </div>
            <span class="threshold-collapse-tag">${element.collapse}</span>
          </div>
          <p class="threshold-question">${element.question}</p>
          <div class="segmented three threshold-status-control" role="radiogroup" aria-label="${element.title} status">
            ${statusOptions
              .map((option) => {
                const inputId = `${element.id}-${option.id}`;
                const checked = current.status === option.id ? "checked" : "";
                return `
                  <div>
                    <input id="${inputId}" type="radio" name="status-${element.id}" value="${option.id}" ${checked}>
                    <label for="${inputId}">${option.label}</label>
                  </div>
                `;
              })
              .join("")}
          </div>
          <div class="field-group threshold-note-field">
            <label for="note-${element.id}">What support is actually doing the work here?</label>
            <textarea id="note-${element.id}" data-note-id="${element.id}" rows="3" placeholder="Name the support, not just the conclusion." aria-invalid="${warningVisible ? "true" : "false"}">${escapeHtml(current.note)}</textarea>
          </div>
          <p class="threshold-card-warning" data-threshold-warning="${element.id}" aria-live="polite" ${warningVisible ? "" : "hidden"}>
            Add actual grounding in the support box. Until then, this component still counts as asserted.
          </p>
        </article>
      `;
    })
    .join("");
}

function syncChecklistVisualState() {
  elements.forEach((element) => {
    const card = els.checklistGrid.querySelector(`[data-element-id="${element.id}"]`);
    if (!card) return;

    const warningVisible = needsSubstantiationWarning(element.id);
    const groundedSubstantiation = hasConfirmedSubstantiation(element.id);
    const warning = card.querySelector(`[data-threshold-warning="${element.id}"]`);
    const textarea = card.querySelector(`textarea[data-note-id="${element.id}"]`);

    card.classList.toggle("is-supported-substantiated", groundedSubstantiation);
    card.classList.toggle("needs-support-note-warning", warningVisible);

    if (warning) {
      warning.hidden = !warningVisible;
    }

    if (textarea) {
      textarea.setAttribute("aria-invalid", warningVisible ? "true" : "false");
    }
  });
}

function formatRouteLabel() {
  return getRouteById(state.route).label;
}

function formatStatusLabel(statusId) {
  return statusOptions.find((option) => option.id === statusId)?.label || "Missing";
}

function buildCollapseItems() {
  return elements
    .filter((element) => getEffectiveStatus(element.id) !== "substantiated")
    .map((element) => {
      const current = state.elements[element.id];
      const note = current.note.trim();
      const statusLabel = getEffectiveStatus(element.id) === "asserted" ? "Asserted only" : "Missing";
      const groundingNote =
        selectedSubstantiationNeedsGrounding(element.id)
          ? " Selected substantiated, but it still counts as asserted until grounding is supplied."
          : "";
      const tooltipId = `threshold-collapse-tooltip-${element.id}`;
      return `
        <li class="threshold-collapse-item" tabindex="0" aria-describedby="${tooltipId}">
          <strong>${escapeHtml(element.title)}: ${escapeHtml(element.collapse)}</strong>
          <p>${escapeHtml(element.collapseCopy)} <em>${escapeHtml(statusLabel)}.</em>${groundingNote}${note ? ` Current note: ${escapeHtml(note)}` : ""}</p>
          <span class="section-tooltip threshold-collapse-tooltip" id="${tooltipId}" role="tooltip">
            <strong>${escapeHtml(element.title)}: ${escapeHtml(element.collapse)}</strong>
            <span class="tooltip-intro">${escapeHtml(element.collapseCopy)} Right now this component is ${escapeHtml(statusLabel.toLowerCase())}.${groundingNote}</span>
            <span class="tooltip-check-list">
              <span class="tooltip-check-item">
                <strong>Why this collapse appears</strong>
                <span>${escapeHtml(element.collapseWhy)}</span>
              </span>
              <span class="tooltip-check-item">
                <strong>What would repair it</strong>
                <span>${escapeHtml(element.collapseRepair)}</span>
              </span>
              <span class="tooltip-check-item">
                <strong>Question to press next</strong>
                <span>${escapeHtml(element.question)}</span>
              </span>
            </span>
            ${note ? `<span class="tooltip-coda">Current note: ${escapeHtml(note)}</span>` : ""}
          </span>
        </li>
      `;
    })
    .join("");
}

function buildSummary(counts, diagnosis) {
  const lines = [
    "# Crosshairs Moral System Threshold",
    "",
    `Claim route: ${formatRouteLabel()}`,
    `Claim: ${state.claim.trim() || "No claim entered."}`,
    "",
    `Threshold status: ${diagnosis.status}`,
    `Current shape: ${diagnosis.profile}`,
    `Ready for advanced stress test: ${getReadiness(diagnosis)}`,
    "",
    `Missing: ${counts.missing}`,
    `Asserted: ${counts.asserted}`,
    `Substantiated: ${counts.substantiated}`,
    "",
    diagnosis.summary,
    "",
    "Component ledger:"
  ];

  elements.forEach((element) => {
    const current = state.elements[element.id];
    const effectiveStatus = getEffectiveStatus(element.id);
    const effectiveLabel = formatStatusLabel(effectiveStatus).toLowerCase();
    const statusSuffix = selectedSubstantiationNeedsGrounding(element.id)
      ? " (selected substantiated without grounding note, so counted as asserted)"
      : "";
    lines.push(`- ${element.title}: ${effectiveLabel}${statusSuffix}`);
    if (effectiveStatus !== "substantiated") {
      lines.push(`  Collapse risk: ${element.collapse}`);
    }
    if (current.note.trim()) {
      lines.push(`  Note: ${current.note.trim()}`);
    }
  });

  lines.push("");
  lines.push("Recommended sequence:");
  lines.push("1. Use this threshold page to close the missing architecture.");
  lines.push("2. Move into Moral System Stress Test for the advanced system-level pressure test.");
  lines.push("3. Move into Moral Particulars Audit to see whether the system survives concrete cases.");

  return lines.join("\n");
}

function buildAiPrompt(counts, diagnosis) {
  const elementLines = elements
    .map((element) => {
      const current = state.elements[element.id];
      const effectiveStatus = getEffectiveStatus(element.id);
      return [
        `- ${element.title}: ${effectiveStatus}`,
        selectedSubstantiationNeedsGrounding(element.id)
          ? "  Status note: selected substantiated without a grounding note, so it still counts as asserted"
          : "",
        current.note.trim() ? `  Support note: ${current.note.trim()}` : "  Support note: none supplied",
        effectiveStatus === "substantiated" ? "" : `  Collapse label: ${element.collapse}`
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    "You are evaluating whether an alleged Christian moral system has even crossed the threshold into being a coherent moral system.",
    "",
    `Claim route: ${formatRouteLabel()}`,
    `Claim: ${state.claim.trim() || "No claim entered."}`,
    `Current diagnosis: ${diagnosis.profile}`,
    `Threshold status: ${diagnosis.status}`,
    `Counts: ${counts.substantiated} substantiated, ${counts.asserted} asserted, ${counts.missing} missing.`,
    "",
    "Mandatory components and current status:",
    elementLines,
    "",
    "Tasks:",
    "1. Say whether this currently looks more like a moral system, a rule source, an intuition set, a practical framework, or a cluster of conclusions.",
    "2. Identify the two most serious missing architectural components and explain why they matter.",
    "3. Explain whether the claim is ready for the advanced Moral System Stress Test, and why.",
    "4. Give the strongest plausible repair path for the current route without simply repeating the original claim.",
    "5. Name one short follow-up question for each missing or asserted-only component."
  ].join("\n");
}

function mapRouteToStressRoute(routeId) {
  return stressRouteMap[routeId] || "hybrid";
}

function buildStressTestState() {
  const primaryRoute = mapRouteToStressRoute(state.route);
  const selectedRoute = getRouteById(state.route);
  const claimPosition =
    state.claim.trim() === selectedRoute.claim ? stressClaimPositionMap[state.route] || "" : "";

  const stressState = {
    claim: state.claim.trim(),
    claimPosition,
    routes: {},
    strength: {},
    checks: {},
    notes: {}
  };

  elements.forEach((element) => {
    const current = state.elements[element.id];
    const effectiveStatus = getEffectiveStatus(element.id);
    if (effectiveStatus === "missing") return;
    stressState.routes[element.id] = primaryRoute;
    stressState.strength[element.id] = effectiveStatus === "substantiated" ? 3 : 1;
    if (current.note.trim()) {
      stressState.notes[element.id] = current.note.trim();
    }
  });

  return stressState;
}

function encodeStatePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function buildStressTestHref() {
  return `${STRESS_TEST_BASE_URL}?state=${encodeStatePayload(buildStressTestState())}`;
}

function updateStressLinks() {
  const href = buildStressTestHref();
  els.stressLinks.forEach((link) => {
    link.href = href;
  });
}

function renderStressImportNotice() {
  if (!els.stressImportBanner || !els.stressImportCopy || !els.stressImportClaim) return;
  if (!importedFromStress) {
    els.stressImportBanner.hidden = true;
    return;
  }

  const importedCount = elements.filter((element) => state.elements[element.id].status !== "missing").length;
  const claim = state.claim.trim();
  els.stressImportBanner.hidden = false;
  els.stressImportCopy.textContent = importedCount
    ? `This threshold checklist imported your current stress-test claim, ${importedCount} component${
        importedCount === 1 ? "" : "s"
      }, and any notes so you can tighten the preliminary architecture before pushing forward again.`
    : "This threshold checklist imported your current stress-test setup so you can revise the preliminary architecture before pushing forward again.";
  els.stressImportClaim.textContent = claim ? `Imported claim: ${claim}` : "";
}

function renderThresholdReadinessMap(readiness) {
  if (!els.thresholdReadinessPlot || !els.thresholdReadinessCopy) return;

  els.thresholdReadinessCopy.textContent = `${formatRouteLabel()} route · ${readiness} ready for Stress Test · click any lane to revise it.`;
  els.thresholdReadinessPlot.setAttribute(
    "aria-label",
    `${formatRouteLabel()} route. ${readiness} ready for Stress Test. Each lane shows whether a required component is missing, asserted, or substantiated.`
  );

  els.thresholdReadinessPlot.innerHTML = elements
    .map((element) => {
      const currentStatus = getEffectiveStatus(element.id);
      const statusLabel = formatEffectiveStatusLabel(element.id);
      const noteText = state.elements[element.id].note.trim()
        ? ` Support note: ${state.elements[element.id].note.trim()}`
        : "";
      return `
        <button
          type="button"
          class="threshold-readiness-column status-${currentStatus}"
          data-readiness-jump="${element.id}"
          title="${escapeHtml(`${element.title}: ${statusLabel}.${noteText}`)}"
          aria-label="${escapeHtml(`Jump to ${element.title}. Current status: ${statusLabel}.${noteText}`)}"
        >
          <span class="threshold-readiness-track" aria-hidden="true">
            <span class="threshold-readiness-state state-substantiated${currentStatus === "substantiated" ? " is-active" : ""}"></span>
            <span class="threshold-readiness-state state-asserted${currentStatus === "asserted" ? " is-active" : ""}"></span>
            <span class="threshold-readiness-state state-missing${currentStatus === "missing" ? " is-active" : ""}"></span>
          </span>
          <span class="threshold-readiness-label">${escapeHtml(element.shortLabel || element.title)}</span>
        </button>
      `;
    })
    .join("");
}

function jumpToChecklistElement(elementId) {
  const target = els.checklistGrid.querySelector(`[data-element-id="${elementId}"]`);
  if (!target) return;
  target.setAttribute("tabindex", "-1");
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
  target.focus({ preventScroll: true });
}

function updateOutputs() {
  const counts = countStatuses();
  const diagnosis = classifyThreshold(counts);
  const readiness = getReadiness(diagnosis);

  syncChecklistVisualState();
  els.statusLabel.textContent = diagnosis.status;
  els.statusCopy.textContent = diagnosis.copy;
  els.substantiatedCount.textContent = `${counts.substantiated} / ${elements.length}`;
  els.missingCount.textContent = String(counts.missing);
  els.profileLabel.textContent = diagnosis.profile;
  els.profileCopy.textContent = diagnosis.summary;
  els.routeHelp.textContent = getRouteById(state.route).help;
  els.diagnosisHeading.textContent = diagnosis.profile;
  els.diagnosisText.textContent = diagnosis.summary;
  els.diagnosisRoute.textContent = formatRouteLabel();
  els.readinessLabel.textContent = readiness;
  els.diagnosisMissing.textContent = String(counts.missing);
  els.diagnosisAsserted.textContent = String(counts.asserted);
  els.diagnosisSubstantiated.textContent = String(counts.substantiated);
  renderThresholdReadinessMap(readiness);
  els.collapseList.innerHTML =
    buildCollapseItems() ||
    `<li><strong>All eight components are substantiated.</strong><p>The threshold has been cleared. The main question now is whether the account survives the advanced system-level pressure test.</p></li>`;
  els.summaryOutput.value = buildSummary(counts, diagnosis);
  els.aiPromptOutput.value = buildAiPrompt(counts, diagnosis);
  updateStressLinks();
  renderStressImportNotice();
}

function syncFormValues() {
  els.routeSelect.value = state.route;
  els.claimInput.value = state.claim;
}

function attachEvents() {
  els.routeSelect.addEventListener("change", (event) => {
    state.route = event.target.value;
    saveState();
    updateOutputs();
  });

  els.claimInput.addEventListener("input", (event) => {
    state.claim = event.target.value;
    saveState();
    updateOutputs();
  });

  els.presetButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-route-preset]");
    if (!button) return;
    const route = getRouteById(button.getAttribute("data-route-preset"));
    state.route = route.id;
    if (!state.claim.trim() || window.confirm(`Replace the claim text with the ${route.label} starter claim?`)) {
      state.claim = route.claim;
    }
    saveState();
    syncFormValues();
    updateOutputs();
  });

  els.checklistGrid.addEventListener("change", (event) => {
    if (!event.target.matches('input[type="radio"][name^="status-"]')) return;
    const wrapper = event.target.closest("[data-element-id]");
    if (!wrapper) return;
    const elementId = wrapper.getAttribute("data-element-id");
    state.elements[elementId].status = event.target.value;
    saveState();
    updateOutputs();
  });

  els.checklistGrid.addEventListener("input", (event) => {
    if (!event.target.matches("textarea[data-note-id]")) return;
    const elementId = event.target.getAttribute("data-note-id");
    state.elements[elementId].note = event.target.value;
    saveState();
    updateOutputs();
  });

  els.thresholdReadinessPlot?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-readiness-jump]");
    if (!button) return;
    jumpToChecklistElement(button.getAttribute("data-readiness-jump"));
  });

  els.resetButton.addEventListener("click", () => {
    if (!window.confirm("Reset the route, claim, and every threshold checklist entry?")) return;
    const defaults = createDefaultState();
    state.route = defaults.route;
    state.claim = defaults.claim;
    state.elements = defaults.elements;
    saveState();
    syncFormValues();
    renderChecklist();
    updateOutputs();
  });

  els.copySummaryButton.addEventListener("click", async () => {
    await copyText(els.summaryOutput.value, els.summaryCopyStatus, "Threshold summary copied.");
  });

  els.copyAiPromptButton.addEventListener("click", async () => {
    await copyText(els.aiPromptOutput.value, els.aiCopyStatus, "AI prompt copied.");
  });
}

async function copyText(text, statusEl, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    statusEl.textContent = successMessage;
  } catch (error) {
    statusEl.textContent = "Copy failed. You can still copy from the text box.";
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function init() {
  renderRouteSelect();
  renderPresetButtons();
  renderChecklist();
  syncFormValues();
  updateOutputs();
  attachEvents();
}

init();
