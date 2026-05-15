export const LASTMOD = "2026-05-15";
export const SITE_URL = "https://xhairs.com/";
export const SITE_NAME = "Crosshairs Audit Lab";
export const PERSON_ID = `${SITE_URL}#phil-stilwell`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const GITHUB_URL = "https://github.com/philstilwell/apologetics";
export const CLOUDFLARE_ANALYTICS_SNIPPET =
  `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' ` +
  `data-cf-beacon='{"token": "108b2e39d7a948c0b35d5ad64c7fe042"}'></script><!-- End Cloudflare Web Analytics -->`;

function docAction(href, label) {
  return {
    href,
    label: `${label} PDF`,
    secondary: true,
    compact: true,
    row: "docs",
  };
}

const manualPdf = (href) => docAction(href, "Manual");
const curriculumPdf = (href) => docAction(href, "Curriculum");

export const HOME_PAGE = {
  file: "index.html",
  kind: "home",
  title: "Christian Apologetics Audit Tools | Crosshairs Audit Lab",
  description:
    "Explore interactive Christian apologetics audit tools for fine-tuning, resurrection evidence, prayer claims, moral arguments, theism gradients, and belief overreach.",
  ogType: "website",
  url: SITE_URL,
  keywords: [
    "Christian apologetics",
    "apologetics tools",
    "fine-tuning audit",
    "resurrection evidence",
    "moral argument",
    "prayer claims",
    "belief audit",
  ],
  about: [
    "Christian apologetics",
    "epistemology",
    "fine-tuning argument",
    "resurrection evidence",
    "moral reasoning",
    "religious belief",
  ],
  faqContainerId: "hub-general-qa",
  sitemap: { changefreq: "weekly", priority: "1.0" },
  expectedH1: "Crosshairs Audit Lab",
};

export const TOOLS = [
  {
    id: "belief-overreach-audit",
    name: "Belief Overreach Audit",
    previewPath: "/apps/belief-overreach-audit/",
    readmeDescription:
      "a fair-die calibration drill and transfer audit for showing how confidence can outrun perceived evidence and create unsupported commitments.",
    hub: {
      cardClass: "hub-card-overreach",
      kicker: "Live audit",
      tags: ["Quick start", "Beginner"],
      summary:
        "Uses a fair-die calibration drill, a bridge metaphor, and a ruin simulator to show what happens when confidence outruns the support a claim is perceived to have.",
      actions: [
        { href: "./apps/belief-overreach-audit/", label: "Run overreach audit" },
        manualPdf("./assets/manuals/belief-overreach-audit-manual-v2.pdf"),
        curriculumPdf("./assets/manuals/belief-overreach-audit-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/belief-overreach-audit/index.html",
      kind: "app",
      title: "Belief Overreach Audit | Faith vs Evidence Simulator",
      description:
        "Compare faith and evidence across gambling, investing, romance, and religion to see how overconfidence can outrun warranted belief.",
      ogType: "website",
      url: "https://xhairs.com/apps/belief-overreach-audit/",
      name: "Belief Overreach Audit",
      keywords: [
        "faith vs evidence",
        "belief overreach",
        "Christian apologetics",
        "confidence and substantiation",
        "epistemic risk",
      ],
      about: [
        "Christian apologetics",
        "epistemology",
        "faith and evidence",
        "belief calibration",
      ],
      features: [
        "Compare four epistemic agents across religion and other stochastic domains",
        "Watch how confidence above support changes practical outcomes over repeated trials",
        "Use a simulator that makes overcommitment and ruin pressure visible",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Belief Overreach Audit" },
      ],
      related: [
        {
          href: "../theism-gradient-audit/app.html",
          name: "Deism-Theism Gradient Audit",
          summary:
            "Compare simulation-based overreach with a claim-by-claim map of Christian substantiation.",
        },
        {
          href: "../inductive-symmetry-audit/",
          name: "Inductive Symmetry Audit",
          summary:
            "Check whether favored beliefs are also being protected by asymmetric reasoning standards.",
        },
        {
          href: "../resurrection-evidence-audit/",
          name: "Resurrection Evidence Audit",
          summary:
            "Apply the same confidence-versus-support discipline to miracle and resurrection claims.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Belief Overreach Audit",
    },
    supportPages: [],
  },
  {
    id: "fine-tuning-bridge-audit",
    name: "Fine-Tuning Bridge Audit",
    previewPath: "/apps/fine-tuning-bridge-audit/",
    readmeDescription:
      "an upstream bridge audit for checking whether fine-tuning really licenses design, life-purpose, human-purpose, or thicker theistic conclusions.",
    hub: {
      cardClass: "hub-card-fine-tuning",
      kicker: "Preliminary to Theism Gradient",
      tags: ["Moderate", "Before gradient"],
      summary:
        "Audits the bridge from fine-tuning to design, life-purpose, human-purpose, and theism by separating life-permitting from life-abundant conclusions and checking whether prior commitments, beach-analogy expectations, and target ambiguity are doing hidden work.",
      note:
        "Preliminary: use this before Deism-Theism Gradient whenever fine-tuning is part of the route into design or theism.",
      actions: [
        { href: "./apps/fine-tuning-bridge-audit/", label: "Run bridge audit" },
        manualPdf("./assets/manuals/fine-tuning-bridge-audit-manual.pdf"),
        curriculumPdf("./assets/curricula/fine-tuning-bridge-audit-curriculum.pdf"),
        {
          href: "./apps/theism-gradient-audit/app.html",
          label: "Next: Theism Gradient",
          secondary: true,
        },
      ],
    },
    primaryPage: {
      file: "apps/fine-tuning-bridge-audit/index.html",
      kind: "app",
      title: "Fine-Tuning Bridge Audit | Prior Christian Apologetics Tool",
      description:
        "Audit the bridge from fine-tuning to design, life-purpose, human-purpose, and theism by checking prior commitments, world-shape expectations, and target ambiguity.",
      ogType: "website",
      url: "https://xhairs.com/apps/fine-tuning-bridge-audit/",
      name: "Fine-Tuning Bridge Audit",
      keywords: [
        "fine-tuning audit",
        "design argument",
        "life-permitting universe",
        "anthropic reasoning",
        "Christian apologetics",
      ],
      about: [
        "fine-tuning argument",
        "Christian apologetics",
        "anthropic reasoning",
        "teleology",
      ],
      features: [
        "Check prior-commitment pressure before loading apologetic conclusions into fine-tuning",
        "Audit the bridge from purposive calibration to life-purpose, human-purpose, and theism",
        "Compare world-shape expectations using the beach analogy and target-ambiguity sliders",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Fine-Tuning Bridge Audit" },
      ],
      related: [
        {
          href: "../theism-gradient-audit/app.html",
          name: "Theism Gradient",
          summary:
            "Carry the current bridge audit into the wider deism-to-Christian-theism assessment.",
        },
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "Test whether desire, hope, or identity are quietly inflating the conclusion's confidence.",
        },
        {
          href: "../inductive-symmetry-audit/",
          name: "Inductive Symmetry Audit",
          summary:
            "Check whether the fine-tuning reasoning keeps the same evidential standard when the conclusion changes direction.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Fine-Tuning Bridge Audit",
    },
    supportPages: [],
  },
  {
    id: "falsifiability-field",
    name: "Earthly Promise Test Field",
    previewPath: "/apps/falsifiability-field/",
    readmeDescription:
      "a verification-willingness tool for testing whether earthly God-claims are exposed to ordinary checks or protected by escape hatches.",
    hub: {
      cardClass: "hub-card-promise",
      kicker: "Live audit",
      tags: ["Easy", "Concrete claims"],
      summary:
        "Maps claims about prayer, healing, protection, future knowledge, wisdom, behavior, morbidity, and longevity onto a live field to show whether they are open to robust testing or insulated by excuses.",
      actions: [
        { href: "./apps/falsifiability-field/", label: "Open field" },
        manualPdf("./output/pdf/earthly-promise-test-field-manual.pdf"),
        curriculumPdf("./output/pdf/earthly-promise-test-field-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/falsifiability-field/index.html",
      kind: "app",
      title: "Earthly Promise Test Field | Prayer Claim Audit",
      description:
        "Test prayer, healing, protection, wisdom, prophecy, and other Christian promise claims to see whether they stay open to ordinary verification.",
      ogType: "website",
      url: "https://xhairs.com/apps/falsifiability-field/",
      name: "Earthly Promise Test Field",
      keywords: [
        "prayer claims",
        "healing claims",
        "Christian apologetics",
        "falsifiability",
        "religious verification",
      ],
      about: [
        "Christian apologetics",
        "prayer",
        "healing",
        "falsifiability",
        "religious claims",
      ],
      features: [
        "Test whether earthly divine promises remain open to public checks",
        "Compare study strength, escape hatches, and mind-change commitments",
        "Map how claims move between protected and testable positions",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Earthly Promise Test Field" },
      ],
      related: [
        {
          href: "../resurrection-evidence-audit/",
          name: "Resurrection Evidence Audit",
          summary:
            "Compare earthly promise claims with a dedicated tool for miracle and resurrection evidence.",
        },
        {
          href: "../theism-gradient-audit/app.html",
          name: "Deism-Theism Gradient Audit",
          summary:
            "See how prayer and healing claims fit inside a wider Christian substantiation profile.",
        },
        {
          href: "../inductive-symmetry-audit/",
          name: "Inductive Symmetry Audit",
          summary:
            "Check whether your standard for religious promise claims matches the standard used elsewhere.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Earthly Promise Test Field",
    },
    supportPages: [],
  },
  {
    id: "inductive-symmetry-audit",
    name: "Inductive Symmetry Audit",
    previewPath: "/apps/inductive-symmetry-audit/",
    readmeDescription:
      "an interactive diagnostic for spotting cherry-picked inductive standards in apologetic arguments.",
    hub: {
      cardClass: "hub-card-induction",
      kicker: "Live audit",
      tags: ["Moderate", "Argument pattern"],
      summary:
        "Tests whether an apologetic argument accepts one inductive pattern while dismissing relevantly similar patterns that count against the same conclusion.",
      actions: [
        { href: "./apps/inductive-symmetry-audit/", label: "Run audit" },
        {
          href: "./apps/inductive-symmetry-audit/theory.html",
          label: "Theory notes",
          secondary: true,
        },
        manualPdf("./assets/manuals/inductive-symmetry-audit-manual.pdf"),
        curriculumPdf("./assets/manuals/inductive-symmetry-audit-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/inductive-symmetry-audit/index.html",
      kind: "app",
      title: "Inductive Symmetry Audit | Christian Apologetics Tool",
      description:
        "Test whether Christian apologetics arguments apply one inductive standard to favored evidence and a different standard to rival explanations or counterexamples.",
      ogType: "website",
      url: "https://xhairs.com/apps/inductive-symmetry-audit/",
      name: "Inductive Symmetry Audit",
      keywords: [
        "inductive symmetry",
        "Christian apologetics",
        "evidence standards",
        "special pleading",
        "religious arguments",
      ],
      about: [
        "Christian apologetics",
        "inductive reasoning",
        "evidential symmetry",
        "special pleading",
      ],
      features: [
        "Compare apologetic arguments with structurally similar counter-patterns",
        "Surface modal smuggling, scope drift, and specificity inflation",
        "Review stance maps, examples, and audit guidance",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Inductive Symmetry Audit" },
      ],
      related: [
        {
          href: "./theory.html",
          name: "Inductive Symmetry Theory Notes",
          summary:
            "Read the concepts behind modal smuggling, scope drift, specificity inflation, and fair inductive comparison.",
        },
        {
          href: "../resurrection-evidence-audit/",
          name: "Resurrection Evidence Audit",
          summary:
            "Pressure-test miracle and resurrection arguments with priors, alternatives, and dependence checks.",
        },
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "See how confidence can outrun support across religion and other real-world decision domains.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa",
      expectedH1: "Inductive Symmetry Audit",
    },
    supportPages: [
      {
        file: "apps/inductive-symmetry-audit/theory.html",
        kind: "article",
        title: "Inductive Symmetry Theory Notes | Christian Apologetics",
        description:
          "Read the theory behind the Inductive Symmetry Audit, including modal smuggling, scope drift, specificity inflation, and fair inductive comparison.",
        ogType: "article",
        url: "https://xhairs.com/apps/inductive-symmetry-audit/theory.html",
        name: "Inductive Symmetry Theory Notes",
        keywords: [
          "inductive symmetry theory",
          "Christian apologetics",
          "modal smuggling",
          "scope drift",
          "specificity inflation",
        ],
        about: [
          "Christian apologetics",
          "inductive reasoning",
          "argument analysis",
        ],
        breadcrumbs: [
          { name: SITE_NAME, href: "../../" },
          { name: "Inductive Symmetry Audit", href: "./" },
          { name: "Theory Notes" },
        ],
        related: [
          {
            href: "./",
            name: "Run the Inductive Symmetry Audit",
            summary:
              "Apply the theory directly to Christian apologetics arguments and comparison cases.",
          },
          {
            href: "../belief-overreach-audit/",
            name: "Belief Overreach Audit",
            summary:
              "Pair the inductive model with a simulator focused on confidence outrunning support.",
          },
          {
            href: "../theism-gradient-audit/app.html",
            name: "Deism-Theism Gradient Audit",
            summary:
              "Track where Christian claims gain specificity faster than personal substantiation keeps pace.",
          },
        ],
        sitemap: { changefreq: "monthly", priority: "0.6" },
        expectedH1: "Inductive symmetry, not mere disagreement.",
      },
    ],
  },
  {
    id: "resurrection-evidence-audit",
    name: "Resurrection Evidence Audit",
    previewPath: "/apps/resurrection-evidence-audit/",
    readmeDescription:
      "a Bayesian self-audit for resurrection and miracle claims, including explicit priors, likelihoods, dependence weights, required Bayes factors, pitfall flags, and a postdiction comparator.",
    hub: {
      cardClass: "hub-card-resurrection",
      kicker: "Live audit",
      tags: ["Moderate", "Evidence weighing"],
      summary:
        "Tests resurrection and miracle claims with accessible baseline confidence, evidence comparisons, independence checks, alternative explanations, and a live audit-pressure score.",
      actions: [
        { href: "./apps/resurrection-evidence-audit/", label: "Run audit" },
        manualPdf("./assets/manuals/resurrection-evidence-audit-manual.pdf"),
        curriculumPdf("./assets/manuals/resurrection-evidence-audit-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/resurrection-evidence-audit/index.html",
      kind: "app",
      title: "Resurrection Evidence Audit | Christian Apologetics Tool",
      description:
        "Audit resurrection, miracle, and answered-prayer arguments with priors, evidence comparisons, source dependence checks, and alternative explanations.",
      ogType: "website",
      url: "https://xhairs.com/apps/resurrection-evidence-audit/",
      name: "Resurrection Evidence Audit",
      keywords: [
        "resurrection evidence",
        "Christian apologetics",
        "miracle claims",
        "Bayesian reasoning",
        "historical evidence",
      ],
      about: [
        "Christian apologetics",
        "resurrection",
        "miracle claims",
        "Bayesian reasoning",
      ],
      features: [
        "Compare priors, likelihoods, and alternatives for resurrection claims",
        "Stress-test miracle evidence with source dependence and pressure checks",
        "Generate summaries that keep assumptions explicit",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Resurrection Evidence Audit" },
      ],
      related: [
        {
          href: "../falsifiability-field/",
          name: "Earthly Promise Test Field",
          summary:
            "Check whether miracle, healing, and prayer claims are actually exposed to ordinary tests.",
        },
        {
          href: "../inductive-symmetry-audit/",
          name: "Inductive Symmetry Audit",
          summary:
            "See whether the same evidential standards are applied to favored and rival miracle claims.",
        },
        {
          href: "../theism-gradient-audit/app.html",
          name: "Deism-Theism Gradient Audit",
          summary:
            "Place resurrection conclusions inside a broader map of Christian claim substantiation.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Resurrection Evidence Audit",
    },
    supportPages: [],
  },
  {
    id: "moral-system-threshold",
    name: "Moral System Threshold",
    previewPath: "/apps/moral-system-threshold/",
    readmeDescription:
      "a preliminary checklist for deciding whether a claimed Christian morality has enough architecture to count as a moral system at all.",
    hub: {
      cardClass: "hub-card-threshold",
      kicker: "Preliminary checklist",
      tags: ["Intro", "Start here"],
      summary:
        "A short intake checklist that asks whether an alleged Christian moral system has actually supplied the minimum architecture of a moral system, or whether it is still functioning as a rule source, intuition set, or practical framework.",
      note: "Preliminary: use this before the advanced Moral System Stress Test.",
      actions: [
        { href: "./apps/moral-system-threshold/", label: "Run threshold check" },
        manualPdf("./assets/manuals/moral-system-threshold-manual-v2.pdf"),
        curriculumPdf("./assets/curricula/moral-system-threshold-curriculum-v2.pdf"),
        {
          href: "./apps/moral-system-stress-test/",
          label: "Next: stress test",
          secondary: true,
        },
      ],
    },
    primaryPage: {
      file: "apps/moral-system-threshold/index.html",
      kind: "app",
      title: "Moral System Threshold | Preliminary Morality Checklist",
      description:
        "Run a preliminary checklist to see whether an alleged Christian moral system has the minimum architecture to count as a coherent moral system at all.",
      ogType: "website",
      url: "https://xhairs.com/apps/moral-system-threshold/",
      name: "Moral System Threshold",
      keywords: [
        "Christian morality",
        "objective morality",
        "moral system",
        "preliminary checklist",
        "apologetics",
      ],
      about: [
        "Christian apologetics",
        "objective morality",
        "moral coherence",
        "divine command theory",
      ],
      features: [
        "Classify whether the user currently has a moral system, a rule source, an intuition set, or a practical framework",
        "Check the eight mandatory components needed for moral coherence",
        "Prepare the user for the advanced Moral System Stress Test and the Moral Particulars Audit",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Moral System Threshold" },
      ],
      related: [
        {
          href: "../moral-system-stress-test/",
          name: "Moral System Stress Test",
          summary:
            "Continue from the threshold checklist into a full system-level pressure test once the architecture is visible.",
        },
        {
          href: "../moral-particulars-audit/",
          name: "Moral Particulars Audit",
          summary:
            "Push the same moral architecture into concrete cases and disagreement patterns.",
        },
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "Compare moral certainty with a broader simulator of confidence getting ahead of support.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Moral System Threshold",
    },
    supportPages: [],
  },
  {
    id: "moral-system-stress-test",
    name: "Moral System Stress Test",
    previewPath: "/apps/moral-system-stress-test/",
    readmeDescription:
      "a coherence audit for testing whether Christian moral claims supply an actual moral system or collapse into emotion, obedience, practical advice, or vague guidance.",
    hub: {
      cardClass: "hub-card-morality",
      kicker: "Advanced follow-up",
      tags: ["Advanced", "System-level"],
      summary:
        "Takes the threshold result into a fuller system-level pressure test, asking whether Christian morality survives counterfactuals, authority checks, disagreement strain, and collapse risks.",
      note: "Continues where Moral System Threshold leaves off.",
      actions: [
        { href: "./apps/moral-system-stress-test/", label: "Run stress test" },
        {
          href: "./apps/moral-system-threshold/",
          label: "Start with threshold",
          secondary: true,
        },
        manualPdf("./output/pdf/moral-system-stress-test-manual.pdf"),
        curriculumPdf("./output/pdf/moral-system-stress-test-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/moral-system-stress-test/index.html",
      kind: "app",
      title: "Moral System Stress Test | Christian Morality Audit",
      description:
        "Test whether Christian moral arguments yield a workable moral system with truth-makers, obligations, authority, and clear action guidance.",
      ogType: "website",
      url: "https://xhairs.com/apps/moral-system-stress-test/",
      name: "Moral System Stress Test",
      keywords: [
        "Christian morality",
        "moral argument",
        "divine command",
        "objective morality",
        "Christian apologetics",
      ],
      about: [
        "Christian apologetics",
        "moral philosophy",
        "divine command theory",
        "objective morality",
      ],
      features: [
        "Test whether Christian moral claims form a coherent moral system",
        "Probe truth-makers, obligations, authority, and action guidance",
        "Compare the moral system with counterfactual and disagreement pressure",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Moral System Stress Test" },
      ],
      related: [
        {
          href: "../moral-particulars-audit/",
          name: "Moral Particulars Audit",
          summary:
            "Move from system-level moral theory to concrete Christian ethics cases and disagreement patterns.",
        },
        {
          href: "../theism-gradient-audit/app.html",
          name: "Deism-Theism Gradient Audit",
          summary:
            "See how moral claims interact with a wider map of Christian substantiation and bridge pressure.",
        },
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "Compare moral certainty with a simulator focused on confidence that outruns support.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Moral System Stress Test",
    },
    supportPages: [],
  },
  {
    id: "moral-particulars-audit",
    name: "Moral Particulars Audit",
    previewPath: "/apps/moral-particulars-audit/",
    readmeDescription:
      "a case-level audit for mapping concrete Christian moral judgments to their grounders and disagreement diagnoses.",
    hub: {
      cardClass: "hub-card-particulars",
      kicker: "Concrete follow-up",
      tags: ["Intermediate", "Case map"],
      summary:
        "Pushes the larger moral system into concrete Christian moral judgments, then compares those grounders with how disagreement is explained across severe, ordinary, sexual, civic, and generosity cases.",
      actions: [
        { href: "./apps/moral-particulars-audit/", label: "Run particulars audit" },
        manualPdf("./assets/manuals/moral-particulars-audit-manual-v2.pdf"),
        curriculumPdf("./assets/curricula/moral-particulars-audit-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/moral-particulars-audit/index.html",
      kind: "app",
      title: "Moral Particulars Audit | Christian Ethics Tool",
      description:
        "Map concrete Christian ethics judgments to scripture, conscience, community, and Spirit-based grounders, then compare how disagreement is explained.",
      ogType: "website",
      url: "https://xhairs.com/apps/moral-particulars-audit/",
      name: "Moral Particulars Audit",
      keywords: [
        "Christian ethics",
        "moral particulars",
        "scripture and conscience",
        "Christian apologetics",
        "moral disagreement",
      ],
      about: [
        "Christian apologetics",
        "Christian ethics",
        "moral disagreement",
        "scripture",
        "conscience",
      ],
      features: [
        "Map moral judgments to scripture, conscience, Spirit, and community grounders",
        "Compare severity, weight, and disagreement explanations across case types",
        "Spot where confidence outruns the stated moral basis",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Moral Particulars Audit" },
      ],
      related: [
        {
          href: "../moral-system-stress-test/",
          name: "Moral System Stress Test",
          summary:
            "Step back from case-level ethics and ask whether the larger moral system holds together.",
        },
        {
          href: "../theism-gradient-audit/app.html",
          name: "Deism-Theism Gradient Audit",
          summary:
            "Compare moral case judgments with the broader profile of Christian claim substantiation.",
        },
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "See how confidence can get ahead of support across ethics, religion, and everyday risk.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-step",
      expectedH1: "Moral Particulars Audit",
    },
    supportPages: [],
  },
  {
    id: "theism-gradient-audit",
    name: "Deism-Theism Gradient Audit",
    previewPath: "/apps/theism-gradient-audit/app.html",
    readmeDescription:
      "a Christianity-focused assessment of confidence, substantiation gaps, dependency tensions, and bridge claims across 50 graded claims.",
    hub: {
      cardClass: "hub-card-theism",
      kicker: "Layered follow-up",
      tags: ["Most layered", "50 claims"],
      summary:
        "Rates 50 Christianity-focused claims across a deism-to-Christian-theism gradient, then surfaces substantiation gaps, dependency tensions, category profiles, and an AI-ready report.",
      note:
        "Best used after Fine-Tuning Bridge Audit when design, life-purpose, or human-purpose claims are part of the case.",
      actions: [
        { href: "./apps/theism-gradient-audit/app.html", label: "Run assessment" },
        {
          href: "./apps/fine-tuning-bridge-audit/",
          label: "Start with fine-tuning",
          secondary: true,
        },
        manualPdf("./apps/theism-gradient-audit/docs/deism-theism-gradient-audit-manual.pdf"),
        curriculumPdf("./apps/theism-gradient-audit/docs/deism-theism-gradient-audit-curriculum.pdf"),
      ],
    },
    primaryPage: {
      file: "apps/theism-gradient-audit/app.html",
      kind: "app",
      title: "Deism-Theism Gradient Audit | Christian Apologetics Tool",
      description:
        "Rate 50 Christian apologetics claims across a deism-to-Christian-theism gradient, then inspect substantiation gaps, bridge claims, and dependency tension.",
      ogType: "website",
      url: "https://xhairs.com/apps/theism-gradient-audit/app.html",
      name: "Deism-Theism Gradient Audit",
      keywords: [
        "deism theism gradient",
        "Christian apologetics",
        "belief substantiation",
        "bridge claims",
        "dependency tension",
      ],
      about: [
        "Christian apologetics",
        "deism",
        "theism",
        "religious belief",
        "epistemology",
      ],
      features: [
        "Rate 50 claims across a deism-to-Christian-theism gradient",
        "Compare confidence with personal substantiation",
        "Inspect category profiles, bridge claims, and dependency tension",
      ],
      breadcrumbs: [
        { name: SITE_NAME, href: "../../" },
        { name: "Theism Gradient Audit", href: "./" },
        { name: "Interactive App" },
      ],
      related: [
        {
          href: "../belief-overreach-audit/",
          name: "Belief Overreach Audit",
          summary:
            "Compare claim-level gradients with a simulator of overconfident commitments in practice.",
        },
        {
          href: "../resurrection-evidence-audit/",
          name: "Resurrection Evidence Audit",
          summary:
            "Drill into miracle and resurrection evidence after mapping your wider theism profile.",
        },
        {
          href: "../moral-system-stress-test/",
          name: "Moral System Stress Test",
          summary:
            "Test whether the moral commitments in your profile cash out as a workable moral system.",
        },
      ],
      sitemap: { changefreq: "monthly", priority: "0.8" },
      faqContainerId: "qa-title",
      expectedH1: "Theism Gradient",
    },
    supportPages: [
      {
        file: "apps/theism-gradient-audit/index.html",
        kind: "collection",
        title: "Theism Gradient Audit | Christian Apologetics Claims Tool",
        description:
          "Start the Theism Gradient Audit to rate 50 Christian claims by confidence, personal substantiation, and dependency tension across a deism-to-theism spectrum.",
        ogType: "website",
        url: "https://xhairs.com/apps/theism-gradient-audit/",
        name: "Theism Gradient Audit",
        keywords: [
          "theism gradient",
          "Christian apologetics",
          "belief substantiation",
          "dependency tension",
          "deism to theism",
        ],
        about: [
          "Christian apologetics",
          "religious belief",
          "deism",
          "theism",
          "epistemology",
        ],
        breadcrumbs: [
          { name: SITE_NAME, href: "../../" },
          { name: "Theism Gradient Audit" },
        ],
        related: [
          {
            href: "./app.html",
            name: "Open the Deism-Theism Gradient App",
            summary:
              "Work through all 50 claims, compare category profiles, and inspect substantiation gaps.",
          },
          {
            href: "../belief-overreach-audit/",
            name: "Belief Overreach Audit",
            summary:
              "Compare the gradient results with a simulator focused on faith outrunning evidence.",
          },
          {
            href: "../resurrection-evidence-audit/",
            name: "Resurrection Evidence Audit",
            summary:
              "Zoom in on miracle and resurrection claims after mapping the wider theism profile.",
          },
        ],
        sitemap: { changefreq: "monthly", priority: "0.6" },
        expectedH1: "Theism Gradient",
      },
    ],
  },
];

export const HUB_PATHWAYS = [
  {
    id: "calibration",
    className: "hub-pathway-calibration",
    kicker: "Pathway 01",
    title: "Start with confidence calibration",
    summary:
      "Use this route when the first concern is that certainty, commitment, or practical risk seems to be outpacing the support the claim can carry.",
    steps: [
      {
        toolId: "belief-overreach-audit",
        detail: "Quickly calibrate what it looks like when confidence outruns perceived evidence.",
      },
      {
        toolId: "theism-gradient-audit",
        detail: "Map where Christian claims gain specificity faster than personal substantiation keeps pace.",
      },
      {
        toolId: "resurrection-evidence-audit",
        detail: "Finish by drilling into miracle and resurrection claims with explicit priors and alternatives.",
      },
    ],
  },
  {
    id: "fine-tuning",
    className: "hub-pathway-fine-tuning",
    kicker: "Pathway 02",
    title: "Trace the fine-tuning bridge first",
    summary:
      "Use this route when fine-tuning is being asked to carry more than a thin design hunch and the argument is already leaning toward life-purpose, human-purpose, or theism.",
    steps: [
      {
        toolId: "fine-tuning-bridge-audit",
        detail: "Separate life-permitting conditions from the thicker bridge work often smuggled into design and theism claims.",
      },
      {
        toolId: "theism-gradient-audit",
        detail: "Carry the bridge result into the larger claim-by-claim gradient instead of letting later claims borrow unsupported fine-tuning confidence.",
      },
      {
        toolId: "inductive-symmetry-audit",
        detail: "Check whether the fine-tuning reasoning keeps the same evidential standard when rival explanations or targets are on the table.",
      },
    ],
  },
  {
    id: "public-evidence",
    className: "hub-pathway-evidence",
    kicker: "Pathway 03",
    title: "Test public-facing evidence claims",
    summary:
      "Use this route when a claim is being presented as a worldly fact that should stay open to ordinary checks, comparisons, and rival explanations.",
    steps: [
      {
        toolId: "falsifiability-field",
        detail: "Check whether prayer, healing, and protection claims stay exposed to straightforward verification.",
      },
      {
        toolId: "resurrection-evidence-audit",
        detail: "Pressure-test miracle arguments with source dependence, alternative stories, and required Bayes factors.",
      },
      {
        toolId: "inductive-symmetry-audit",
        detail: "Ask whether the same evidential standard is still being applied when the conclusion turns uncomfortable.",
      },
    ],
  },
  {
    id: "morality",
    className: "hub-pathway-morality",
    kicker: "Pathway 04",
    title: "Build the morality sequence explicitly",
    summary:
      "Use this route when the dispute is moral. The sequence now moves step by step from minimum architecture to system pressure to concrete case handling.",
    steps: [
      {
        toolId: "moral-system-threshold",
        detail: "Start here and check whether there is a full moral system at all rather than a rule source or intuition set.",
      },
      {
        toolId: "moral-system-stress-test",
        detail: "Carry the threshold output into the deeper system-level pressure test.",
      },
      {
        toolId: "moral-particulars-audit",
        detail: "Push the same moral architecture into concrete Christian ethics cases and disagreement patterns.",
      },
    ],
  },
];

export const HUB_PATHWAYS_INTRO = {
  eyebrow: "Pathways",
  title: "Choose a guided route",
  copy:
    "New users can begin with the sequence that matches the actual pressure point under debate instead of guessing from a flat grid.",
};

export const HUB_CATALOG_INTRO = {
  note:
    "Start with a pathway if you want guidance, then browse the full catalog below when you want to jump straight to a specific pressure point. If design or theism is being argued through fine-tuning, begin with the Fine-Tuning Bridge Audit before opening the wider gradient.",
  eyebrow: "Full catalog",
  title: "Browse every audit directly",
  copy:
    "The same tools are still available individually. They stay ordered from the quickest entry point to the most layered assessment, with difficulty tags showing how much setup or conceptual load each audit asks you to carry.",
};

export const ALL_PAGES = [
  HOME_PAGE,
  ...TOOLS.flatMap((tool) => [tool.primaryPage, ...tool.supportPages]),
];
