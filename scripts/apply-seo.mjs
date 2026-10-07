import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_PAGES,
  CLOUDFLARE_ANALYTICS_SNIPPET,
  GITHUB_URL,
  HOME_PAGE,
  LASTMOD,
  MODULES,
  MODULE_GROUPS,
  PERSON_ID,
  PROMISES,
  SITE_NAME,
  SITE_URL,
  TOOLS,
  WEBSITE_ID,
} from "./tool-manifest.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = resolveRoot();
const toolById = new Map(TOOLS.map((tool) => [tool.id, tool]));
const sitemapPages = ALL_PAGES
  .filter((page) => page.kind === "home" || page.sitemap)
  .map((page) => ({
    url: page.url,
    changefreq: page.sitemap?.changefreq ?? "monthly",
    priority: page.sitemap?.priority ?? "0.8",
  }));

function resolveRoot() {
  const candidates = [process.cwd(), path.resolve(SCRIPT_DIR, "..")];
  return candidates.find(isRepoRoot) || path.resolve(SCRIPT_DIR, "..");
}

function isRepoRoot(candidate) {
  return [
    "package.json",
    "README.md",
    "index.html",
    "apps",
    "scripts",
  ].every((entry) => fs.existsSync(path.join(candidate, entry)));
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content);
}

function listHtmlFiles(relativeDir = ".") {
  const absoluteDir = path.join(ROOT, relativeDir);
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  const htmlFiles = [];

  for (const entry of entries) {
    const childRelativePath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        continue;
      }

      htmlFiles.push(...listHtmlFiles(childRelativePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(childRelativePath.replace(/^\.\//, ""));
    }
  }

  return htmlFiles.sort();
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

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function buildHomeItemList() {
  return TOOLS.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: tool.primaryPage.url,
  }));
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
    description: HOME_PAGE.description,
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
      itemListElement: buildHomeItemList(),
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

function extractMetaContent(relativePath, name) {
  const html = read(relativePath);
  const match = html.match(new RegExp(`<meta\\s+name="${escapeRegExp(name)}"\\s+content="([^"]*)"`, "i"));
  return match ? match[1] : "#111111";
}

function buildMetaBlock(page) {
  const alternates =
    page.kind === "home"
      ? ""
      : `\n    <link rel="alternate" hreflang="en-US" href="${page.url}">\n    <link rel="alternate" hreflang="x-default" href="${page.url}">`;

  return `    <meta name="author" content="Phil Stilwell">\n    <meta name="robots" content="${page.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}">\n    <meta name="theme-color" content="${extractMetaContent(page.file, "theme-color")}">\n    <link rel="canonical" href="${page.url}">${alternates}\n    <meta property="og:site_name" content="${SITE_NAME}">\n    <meta property="og:type" content="${page.ogType}">\n    <meta property="og:locale" content="en_US">\n    <meta property="og:title" content="${page.title}">\n    <meta property="og:description" content="${page.description}">\n    <meta property="og:url" content="${page.url}">\n    <meta property="og:image" content="https://xhairs.com/assets/crosshairs-og.svg">\n    <meta property="og:image:alt" content="Crosshairs Audit Lab: belief under inspection.">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${page.title}">\n    <meta name="twitter:description" content="${page.description}">\n    <meta name="twitter:image" content="https://xhairs.com/assets/crosshairs-og.svg">`;
}

function buildBreadcrumbHtml(page) {
  if (!page.breadcrumbs || !page.breadcrumbs.length) {
    return "";
  }

  const items = page.breadcrumbs
    .map((crumb, index) => {
      const isLast = index === page.breadcrumbs.length - 1;
      const content =
        crumb.href && !isLast
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

  return `\n\n      <section class="seo-related" aria-labelledby="related-audits-title">\n        <div class="seo-related-copy">\n          <p class="eyebrow">Related audits</p>\n          <h2 id="related-audits-title">Explore nearby pressure tests</h2>\n          <p>\n            Follow the same Christian claim into adjacent tools so the evidence, bridge premises,\n            and confidence standards stay visible from more than one angle.\n          </p>\n        </div>\n        <div class="seo-related-grid">\n${cards}\n        </div>\n      </section>`;
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
  if (!page.related?.length) {
    return html;
  }

  if (html.includes('class="seo-related"')) {
    return html.replace(/\n\s*<section class="seo-related"[\s\S]*?<\/section>/i, buildRelatedHtml(page));
  }

  return html.replace(/\n\s*<\/main>/i, `${buildRelatedHtml(page)}\n    </main>`);
}

function ensureCloudflareAnalytics(html) {
  if (html.includes(CLOUDFLARE_ANALYTICS_SNIPPET)) {
    return html;
  }

  return html.replace(/<\/head>/i, `    ${CLOUDFLARE_ANALYTICS_SNIPPET}\n  </head>`);
}

function applyPage(page) {
  let html = read(page.file);
  const faqEntries = extractFaqEntries(html, page.faqContainerId);
  const jsonLd = buildJsonLd(buildPageGraph(page, faqEntries));

  html = updateHead(html, page, jsonLd);
  html = insertBreadcrumbs(html, page);
  html = insertRelatedLinks(html, page);
  html = ensureCloudflareAnalytics(html);
  if (page.kind !== "home" && !page.landingStyle) {
    const themeHref = path.relative(path.dirname(page.file), "assets/site-theme.css").split(path.sep).join("/") + "?v=20261007";
    const themeLink = `<link rel="stylesheet" href="${themeHref}" data-crosshairs-theme>`;
    if (html.includes("data-crosshairs-theme")) {
      html = html.replace(/<link[^>]*data-crosshairs-theme[^>]*>/, themeLink);
    } else {
      html = html.replace("</head>", `  ${themeLink}\n  </head>`);
    }
  }

  const tool = TOOLS.find(tool => tool.primaryPage.file === page.file);
  if (tool) html = applyModuleGuide(html, tool);
  if (page.kind === "home" || MODULES[tool?.id] || page.file === "apps/falsifiability-field/legacy.html") {
    const prefix = page.kind === "home" ? "./" : "../../";
    html = html.replace(/\s*<link[^>]*data-ai-style[^>]*>/g, "").replace(/\s*<script[^>]*data-ai-script[^>]*><\/script>/g, "");
    html = html.replace(/  <\/head>/, `    <link rel="stylesheet" href="${prefix}assets/ai-assessment.css?v=20261007-ready" data-ai-style>\n    <script src="${prefix}scripts/ai-assessment.js?v=20261007-ready-copy" data-ai-script></script>\n  </head>`);
  }
  write(page.file, html);
}

function replaceGeneratedBlock(content, key, replacement) {
  const startMarker = `<!-- GENERATED:${key}:start -->`;
  const endMarker = `<!-- GENERATED:${key}:end -->`;
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`
  );

  if (!pattern.test(content)) {
    throw new Error(`Missing generated block markers for ${key}`);
  }

  return content.replace(pattern, `${startMarker}\n${replacement}\n${endMarker}`);
}

function renderHubCatalog() {
  const groups = MODULE_GROUPS.map(group => `<section class="module-group" aria-labelledby="group-${group.id}">
    <div class="module-group-heading"><h3 id="group-${group.id}">${escapeHtml(group.name)}</h3><p>${escapeHtml(group.description)}</p></div>
    <div class="module-grid">${TOOLS.filter(tool => MODULES[tool.id]?.group === group.id).map(tool => {
      const m = MODULES[tool.id];
      return `<article class="module-card library-item">
        <span class="module-category">${escapeHtml(m.label)}</span>
        <h4><a href="${tool.hub.actions[0].href}">${escapeHtml(m.question)}</a></h4>
        <p>${escapeHtml(m.summary)}</p>
        <a class="module-open" href="${tool.hub.actions[0].href}">Explore this module <span aria-hidden="true">↗</span></a>
        <details class="module-card-details"><summary>What you will get · guides</summary><p>${escapeHtml(m.outcome)}</p><small>${escapeHtml(tool.name)}</small><div class="library-links">${tool.hub.actions.slice(1).map(action => `<a href="${action.href}">${escapeHtml(action.label)}</a>`).join("")}</div></details>
      </article>`;
    }).join("\n")}</div></section>`).join("\n");
  const promise = toolById.get("falsifiability-field");
  return `<div class="module-route-note"><strong>Choose the question you want to face.</strong><p>Each module has three guided stages, explanations when you need them, and access to the full analysis. You can start anywhere; the morality modules work best in order.</p></div>${groups}
    <article class="promise-library-note library-item"><h3>The promise audit is already on this page.</h3><p>Read the promise, name a fair test, and see what remains. The earlier Promise Test Field is retained for saved work.</p><div class="library-links">${promise.hub.actions.map(action => `<a href="${action.href}">${escapeHtml(action.label)}</a>`).join("")}</div></article>`;
}

function applyModuleGuide(html, tool) {
  const m = MODULES[tool.id];
  if (!m) return html;
  html = html.replace(/\s*<!-- GENERATED:module-guide:start -->[\s\S]*?<!-- GENERATED:module-guide:end -->/, "");
  // Preserve the original introduction as optional background, with only one page h1.
  html = html.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/, '<h2$1 data-original-title>$2</h2>');
  html = html.replace(/<body([^>]*)>/, (match, attrs) => `<body${attrs.replace(/ data-guided-module="[^"]*"/, "")} data-guided-module="${tool.id}">`);
  const intro = `
      <!-- GENERATED:module-guide:start -->
      <section class="module-intro" aria-labelledby="module-title">
        <a class="module-backlink" href="../../#apps">← Explore the other modules</a>
        <p class="eyebrow">${escapeHtml(m.label)} / CROSSHAIRS</p>
        <h1 id="module-title">${escapeHtml(tool.primaryPage.expectedH1)}</h1>
        <p class="module-question">${escapeHtml(m.question)}</p>
        <p class="module-description">${escapeHtml(m.intro)}</p>
        <details class="module-purpose"><summary>What this module can tell you</summary><p>${escapeHtml(m.outcome)}</p><p>${escapeHtml(m.note)}</p></details>
      </section>
      <nav class="module-step-nav" aria-label="Module stages">${m.steps.map((step, i) => `<a href="${step.target}" data-module-step="${i}"><span>0${i + 1}</span><strong>${escapeHtml(step.label)}</strong></a>`).join("")}</nav>
      <div class="module-stage-heading" id="module-stage-heading" tabindex="-1"><p class="eyebrow" id="module-stage-count">STAGE 1 OF 3</p><h2 id="module-stage-title">${escapeHtml(m.steps[0].label)}</h2><p id="module-stage-hint">${escapeHtml(m.steps[0].hint)}</p><button class="module-view-toggle" type="button" aria-pressed="false" hidden>Show all sections</button><p class="module-input-note">State your own position. Example settings are not commitments you have made.</p></div>
      <!-- GENERATED:module-guide:end -->`;
  html = html.replace(/<main\b[^>]*>/, match => match + intro);
  html = html.replace(/<nav class="top-nav"[^>]*>[\s\S]*?<\/nav>/, '<nav class="top-nav" aria-label="Primary"><a class="hub-link" href="../../#promises">The promises</a><a class="hub-link" href="../../#apps">Other modules</a></nav>');
  const assets = `<link rel="stylesheet" href="../../assets/module-guide.css?v=20261007-modules" data-module-style>
    <script type="module" src="../../scripts/module-guide.mjs?v=20261007-ai" data-module-script></script>`;
  html = html.replace(/\s*<link[^>]*data-module-style[^>]*>/g, "").replace(/\s*<script[^>]*data-module-script[^>]*><\/script>/g, "");
  html = html.replace(/  <\/head>/, `    ${assets}
  </head>`);
  html = html.replace(/small-screen-notice.js\?v=[^"]+/, 'small-screen-notice.js?v=20261007-modules');
  return html;
}

function renderPromiseCards() {
  return PROMISES.map((promise, index) => `          <article class="promise-card" id="promise-${promise.id}">
            <a class="promise-card-link" href="#promise-${promise.id}" data-promise="${promise.id}" aria-label="${escapeHtml(promise.name)}: state your belief">
              <img class="promise-card-icon" src="./assets/promises/${promise.id}.webp" width="88" height="88" alt="" decoding="async">
              <div class="promise-card-copy"><span class="card-index">${String(index + 1).padStart(2, "0")} / ${escapeHtml(promise.cardRef || promise.ref)}</span><h3>${escapeHtml(promise.name)}</h3><span class="card-tagline">${escapeHtml(promise.short)}</span><span class="card-status"></span></div><span class="card-arrow" aria-hidden="true">↗</span>
            </a>
            <div class="tip-wrap"><button class="tip-button" type="button" aria-label="About ${escapeHtml(promise.name)}" aria-expanded="false" aria-controls="tip-${promise.id}" aria-describedby="tip-${promise.id}">i</button><div class="tip-content" role="tooltip" id="tip-${promise.id}"><strong>YOUR COMMITMENT</strong>${escapeHtml(promise.hint)}</div></div>
            <noscript>${(promise.passages || [promise]).map(passage => `<p>${escapeHtml(passage.verse)} <a href="https://www.biblegateway.com/passage/?search=${encodeURIComponent(passage.contextRef)}&amp;version=KJV">${escapeHtml(passage.ref)}: read in context</a>.</p>`).join("")}</noscript>
          </article>`).join("\n");
}

function parseGentleNudges() {
  const markdown = read("apologist-question-writeups.md").replace(/\r\n/g, "\n");
  const sections = markdown
    .split(/\n## /)
    .slice(1)
    .map((section) => {
      const normalized = `## ${section}`.trim();
      const lines = normalized.split("\n");
      const title = lines[0].replace(/^##\s+/, "").trim();
      const body = lines.slice(1).join("\n").trim();
      const linkMatch = body.match(/Tool link:\s+\[([^\]]+)\]\(([^)]+)\)\s*$/m);

      if (!title || !linkMatch) {
        return null;
      }

      const introMatch = body.match(/^([\s\S]*?)\n\n1\.\s+/);
      const intro = (introMatch?.[1] || "").trim();
      const questions = [...body.matchAll(/^\d+\.\s+(.+)$/gm)].map((match) => match[1].trim());
      const focusMatch = intro.match(/^This write-up focuses on ([^.]+)\.\s*/i);
      const focus = focusMatch ? focusMatch[1].trim() : "";
      const introBody = focusMatch ? intro.slice(focusMatch[0].length).trim() : intro;

      return {
        title,
        focus,
        intro: introBody,
        questions,
        linkLabel: linkMatch[1].trim(),
        href: linkMatch[2].trim(),
      };
    })
    .filter(Boolean);

  if (!sections.length) {
    throw new Error("No gentle nudge sections found in apologist-question-writeups.md");
  }

  return sections;
}

function renderHubGentleNudges() {
  const nudges = parseGentleNudges();
  return `<section class="extended-prompts landing-container" aria-label="Discussion prompts"><details><summary>More questions for a deeper conversation</summary><div>${nudges.map((nudge) => `<article><h3>${escapeHtml(nudge.title)}</h3><p>${escapeHtml(nudge.intro)}</p><ol>${nudge.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol><a href="${escapeHtml(nudge.href)}">Open this audit ↗</a></article>`).join("\n")}</div></details></section>`;
}

function renderReadmeApps() {
  return TOOLS.map((tool) => `- ${tool.name}: ${tool.readmeDescription}`).join("\n");
}

function renderReadmePaths() {
  const localBase = "http://localhost:8080";
  const entries = [
    `- Hub: \`${localBase}/\``,
    ...TOOLS.map((tool) => `- ${tool.name}: \`${localBase}${tool.previewPath}\``),
  ];

  return entries.join("\n");
}

function updateHubCatalog() {
  const html = replaceGeneratedBlock(read("index.html"), "promise-cards", renderPromiseCards());
  const updated = replaceGeneratedBlock(html, "hub-catalog", renderHubCatalog());
  write("index.html", updated);
}

function updateHubGentleNudges() {
  const html = read("index.html");
  const updated = replaceGeneratedBlock(html, "hub-gentle-nudges", renderHubGentleNudges());
  write("index.html", updated);
}

function updateReadme() {
  let readme = read("README.md");
  readme = replaceGeneratedBlock(readme, "readme-apps", renderReadmeApps());
  readme = replaceGeneratedBlock(readme, "readme-paths", renderReadmePaths());
  write("README.md", readme);
}

function ensureCloudflareAnalyticsOnAllHtmlFiles() {
  for (const file of listHtmlFiles()) {
    const html = read(file);
    const updatedHtml = ensureCloudflareAnalytics(html);

    if (updatedHtml !== html) {
      write(file, updatedHtml);
    }
  }
}

function writeSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages
    .map(
      (page) => `  <url>\n    <loc>${page.url}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
    )
    .join("\n")}\n</urlset>\n`;
  write("sitemap.xml", xml);
}

updateHubCatalog();
updateHubGentleNudges();

for (const page of ALL_PAGES) {
  applyPage(page);
}
updateReadme();
writeSitemap();
ensureCloudflareAnalyticsOnAllHtmlFiles();
