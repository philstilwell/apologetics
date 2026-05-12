import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/philstilwell/Documents/New project 3/apologetics";
const LASTMOD = "2026-05-11";
const SITE_URL = "https://xhairs.com/";
const SITE_NAME = "Crosshairs Audit Lab";
const PERSON_ID = `${SITE_URL}#phil-stilwell`;
const WEBSITE_ID = `${SITE_URL}#website`;
const GITHUB_URL = "https://github.com/philstilwell/apologetics";

const pages = [
  {
    file: "index.html",
    kind: "home",
    title: "Christian Apologetics Audit Tools | Crosshairs Audit Lab",
    description:
      "Explore interactive Christian apologetics audit tools for resurrection evidence, prayer claims, moral arguments, theism gradients, and belief overreach.",
    ogType: "website",
    url: SITE_URL,
    keywords: [
      "Christian apologetics",
      "apologetics tools",
      "resurrection evidence",
      "moral argument",
      "prayer claims",
      "belief audit",
    ],
    about: [
      "Christian apologetics",
      "epistemology",
      "resurrection evidence",
      "moral reasoning",
      "religious belief",
    ],
    faqContainerId: "hub-general-qa",
    itemList: [
      ["Inductive Symmetry Audit", "https://xhairs.com/apps/inductive-symmetry-audit/"],
      ["Deism-Theism Gradient Audit", "https://xhairs.com/apps/theism-gradient-audit/app.html"],
      ["Resurrection Evidence Audit", "https://xhairs.com/apps/resurrection-evidence-audit/"],
      ["Earthly Promise Test Field", "https://xhairs.com/apps/falsifiability-field/"],
      ["Moral System Stress Test", "https://xhairs.com/apps/moral-system-stress-test/"],
      ["Moral Particulars Audit", "https://xhairs.com/apps/moral-particulars-audit/"],
      ["Belief Overreach Audit", "https://xhairs.com/apps/belief-overreach-audit/"],
    ],
    sitemap: { changefreq: "weekly", priority: "1.0" },
  },
  {
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
  },
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
  },
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const sitemapPages = pages
  .filter((page) => page.kind === "home" || page.sitemap)
  .map((page) => ({
    url: page.url,
    changefreq: page.sitemap?.changefreq ?? "monthly",
    priority: page.sitemap?.priority ?? "0.8",
  }));

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function extractFaqEntries(html, containerId) {
  if (!containerId) {
    return [];
  }

  const marker = `id="${containerId}"`;
  const start = html.indexOf(marker);
  if (start === -1) {
    return [];
  }

  const sectionEnd = html.indexOf("</section>", start);
  const mainEnd = html.indexOf("</main>", start);
  const endCandidates = [sectionEnd, mainEnd].filter((index) => index !== -1);
  const end = endCandidates.length ? Math.min(...endCandidates) : html.length;
  const containerHtml = html.slice(start, end);
  const detailsBlocks =
    containerHtml.match(/<details\b(?:(?!<details\b)[\s\S])*?<\/details>/gi) || [];

  return detailsBlocks
    .map((block) => {
      const questionMatch = block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
      if (!questionMatch) {
        return null;
      }

      const headingMatch = questionMatch[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const question = stripHtml(headingMatch ? headingMatch[1] : questionMatch[1]);
      const answerHtml = block.replace(questionMatch[0], "");
      const answer = stripHtml(answerHtml);

      if (!question || !answer) {
        return null;
      }

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    })
    .filter(Boolean)
    .slice(0, 10);
}

function buildPageGraph(page, faqEntries) {
  const graph = [];
  const webpageId = `${page.url}#webpage`;
  const breadcrumbId = `${page.url}#breadcrumb`;
  const websiteEntity = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Explore interactive Christian apologetics audit tools for resurrection evidence, prayer claims, moral arguments, theism gradients, and belief overreach.",
    inLanguage: "en-US",
    publisher: {
      "@id": PERSON_ID,
    },
    sameAs: [GITHUB_URL],
  };
  const personEntity = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Phil Stilwell",
    url: `${SITE_URL}#author`,
    image: `${SITE_URL}assets/phil-hat.jpg`,
    sameAs: [GITHUB_URL],
    knowsAbout: [
      "Philosophy",
      "Epistemology",
      "Critical thinking",
      "Induction",
      "Credencing",
      "Christian apologetics",
    ],
  };

  if (page.kind === "home") {
    const itemListId = `${SITE_URL}#audit-list`;
    graph.push({
      ...websiteEntity,
      description: page.description,
      about: page.about,
      keywords: page.keywords.join(", "),
    });

    graph.push(personEntity);

    graph.push({
      "@type": "CollectionPage",
      "@id": webpageId,
      url: page.url,
      name: page.title,
      description: page.description,
      inLanguage: "en-US",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: page.about.map((name) => ({ "@type": "Thing", name })),
      keywords: page.keywords.join(", "),
      mainEntity: {
        "@id": itemListId,
      },
    });

    graph.push({
      "@type": "ItemList",
      "@id": itemListId,
      name: "Crosshairs Audit Lab tools",
      itemListElement: page.itemList.map(([name, url], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url,
      })),
    });
  } else {
    graph.push(websiteEntity);
    graph.push(personEntity);

    graph.push({
      "@type": "WebPage",
      "@id": webpageId,
      url: page.url,
      name: page.title,
      description: page.description,
      inLanguage: "en-US",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: page.about.map((name) => ({ "@type": "Thing", name })),
      keywords: page.keywords.join(", "),
      breadcrumb: {
        "@id": breadcrumbId,
      },
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.href
          ? new URL(crumb.href, page.url).toString()
          : page.url,
      })),
    });

    if (page.kind === "article") {
      graph.push({
        "@type": "Article",
        "@id": `${page.url}#article`,
        headline: page.title,
        name: page.name,
        url: page.url,
        description: page.description,
        inLanguage: "en-US",
        author: {
          "@id": PERSON_ID,
        },
        publisher: {
          "@id": PERSON_ID,
        },
        mainEntityOfPage: {
          "@id": webpageId,
        },
        about: page.about,
        keywords: page.keywords.join(", "),
      });
    } else if (page.kind === "collection") {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${page.url}#collection`,
        name: page.name,
        url: page.url,
        description: page.description,
        inLanguage: "en-US",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: page.about,
        keywords: page.keywords.join(", "),
        author: {
          "@id": PERSON_ID,
        },
      });
    } else {
      graph.push({
        "@type": "WebApplication",
        "@id": `${page.url}#app`,
        name: page.name,
        url: page.url,
        description: page.description,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript enabled",
        isAccessibleForFree: true,
        inLanguage: "en-US",
        author: {
          "@id": PERSON_ID,
        },
        about: page.about,
        keywords: page.keywords.join(", "),
        featureList: page.features,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      });
    }
  }

  if (faqEntries.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${page.url}#faq`,
      mainEntity: faqEntries,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function buildJsonLd(graph) {
  return `    <script type="application/ld+json">\n${JSON.stringify(graph, null, 2)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n")}\n    </script>`;
}

function buildMetaBlock(page) {
  const alternates =
    page.kind === "home"
      ? ""
      : `\n    <link rel="alternate" hreflang="en-US" href="${page.url}">\n    <link rel="alternate" hreflang="x-default" href="${page.url}">`;

  return `    <meta name="author" content="Phil Stilwell">\n    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n    <meta name="theme-color" content="${extractMetaContent(page, "theme-color")}">\n    <link rel="canonical" href="${page.url}">${alternates}\n    <meta property="og:site_name" content="${SITE_NAME}">\n    <meta property="og:type" content="${page.ogType}">\n    <meta property="og:locale" content="en_US">\n    <meta property="og:title" content="${page.title}">\n    <meta property="og:description" content="${page.description}">\n    <meta property="og:url" content="${page.url}">\n    <meta property="og:image" content="https://xhairs.com/assets/crosshairs-og.svg">\n    <meta property="og:image:alt" content="Crosshairs Audit Lab: belief under inspection.">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${page.title}">\n    <meta name="twitter:description" content="${page.description}">\n    <meta name="twitter:image" content="https://xhairs.com/assets/crosshairs-og.svg">`;
}

function extractMetaContent(page, name) {
  const html = read(page.file);
  const match = html.match(new RegExp(`<meta\\s+name="${escapeRegExp(name)}"\\s+content="([^"]*)"`, "i"));
  return match ? match[1] : "#111111";
}

function buildBreadcrumbHtml(page) {
  if (!page.breadcrumbs || !page.breadcrumbs.length) {
    return "";
  }

  const items = page.breadcrumbs
    .map((crumb, index) => {
      const isLast = index === page.breadcrumbs.length - 1;
      const content = crumb.href && !isLast
        ? `<a href="${crumb.href}">${crumb.name}</a>`
        : `<span aria-current="page">${crumb.name}</span>`;
      return `${index ? '<span aria-hidden="true">/</span>' : ""}${content}`;
    })
    .join("");

  return `\n    <nav class="seo-breadcrumbs" aria-label="Breadcrumb">\n      ${items}\n    </nav>`;
}

function buildRelatedHtml(page) {
  if (!page.related?.length) {
    return "";
  }

  const cards = page.related
    .map(
      (link) => `          <a class="seo-related-card" href="${link.href}">\n            <strong>${link.name}</strong>\n            <span>${link.summary}</span>\n          </a>`
    )
    .join("\n");

  return `

      <section class="seo-related" aria-labelledby="related-audits-title">
        <div class="seo-related-copy">
          <p class="eyebrow">Related audits</p>
          <h2 id="related-audits-title">Explore nearby pressure tests</h2>
          <p>
            Follow the same Christian claim into adjacent tools so the evidence, bridge premises,
            and confidence standards stay visible from more than one angle.
          </p>
        </div>
        <div class="seo-related-grid">
${cards}
        </div>
      </section>`;
}

function updateHead(html, page, jsonLd) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(
    /\n\s*<meta\s+name="description"[\s\S]*?content="[\s\S]*?"[\s\S]*?>/i,
    `\n    <meta\n      name="description"\n      content="${page.description}"\n    >`
  );

  const start = html.indexOf('<meta name="author" content=');
  const end = html.indexOf('<link rel="icon"', start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not replace meta block in ${page.file}`);
  }

  html =
    html.slice(0, start) +
    buildMetaBlock(page) +
    "\n" +
    html.slice(end);

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLd);
  html = html.replace(/\n\s+<meta name="author"/g, '\n    <meta name="author"');
  html = html.replace(/\n<link rel="icon"/g, '\n    <link rel="icon"');
  html = html.replace(/\n\s*<script type="application\/ld\+json">/g, '\n    <script type="application/ld+json">');

  return html;
}

function insertBreadcrumbs(html, page) {
  if (!page.breadcrumbs?.length || page.kind === "home" || html.includes('class="seo-breadcrumbs"')) {
    return html;
  }

  return html.replace("</header>\n\n    <main", `</header>${buildBreadcrumbHtml(page)}\n\n    <main`);
}

function insertRelatedLinks(html, page) {
  if (!page.related?.length || html.includes('class="seo-related"')) {
    return html;
  }

  return html.replace(/\n\s*<\/main>/i, `${buildRelatedHtml(page)}\n    </main>`);
}

function applyPage(page) {
  let html = read(page.file);
  const faqEntries = extractFaqEntries(html, page.faqContainerId);
  const jsonLd = buildJsonLd(buildPageGraph(page, faqEntries));

  html = updateHead(html, page, jsonLd);
  html = insertBreadcrumbs(html, page);
  html = insertRelatedLinks(html, page);

  write(page.file, html);
}

function writeSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages
    .map(
      (page) => `  <url>\n    <loc>${page.url}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
    )
    .join("\n")}\n</urlset>\n`;

  write("sitemap.xml", xml);
}

for (const page of pages) {
  applyPage(page);
}

writeSitemap();
