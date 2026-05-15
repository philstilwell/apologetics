import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_PAGES,
  CLOUDFLARE_ANALYTICS_SNIPPET,
  GITHUB_URL,
  HOME_PAGE,
  HUB_CATALOG_INTRO,
  HUB_PATHWAYS,
  HUB_PATHWAYS_INTRO,
  LASTMOD,
  PERSON_ID,
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

  return `    <meta name="author" content="Phil Stilwell">\n    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">\n    <meta name="theme-color" content="${extractMetaContent(page.file, "theme-color")}">\n    <link rel="canonical" href="${page.url}">${alternates}\n    <meta property="og:site_name" content="${SITE_NAME}">\n    <meta property="og:type" content="${page.ogType}">\n    <meta property="og:locale" content="en_US">\n    <meta property="og:title" content="${page.title}">\n    <meta property="og:description" content="${page.description}">\n    <meta property="og:url" content="${page.url}">\n    <meta property="og:image" content="https://xhairs.com/assets/crosshairs-og.svg">\n    <meta property="og:image:alt" content="Crosshairs Audit Lab: belief under inspection.">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${page.title}">\n    <meta name="twitter:description" content="${page.description}">\n    <meta name="twitter:image" content="https://xhairs.com/assets/crosshairs-og.svg">`;
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
  if (!page.related?.length || html.includes('class="seo-related"')) {
    return html;
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

function renderCardLink(action) {
  const classes = ["card-link"];

  if (action.secondary) {
    classes.push("secondary-link");
  }

  if (action.compact) {
    classes.push("compact-link");
  }

  return `<a class="${classes.join(" ")}" href="${action.href}">${action.label}</a>`;
}

function renderCardActionRow(actions, className) {
  if (!actions.length) {
    return "";
  }

  return `                <div class="${className}">\n${actions
    .map((action) => `                  ${renderCardLink(action)}`)
    .join("\n")}\n                </div>`;
}

function renderHubCard(tool) {
  const { hub } = tool;
  const tags = hub.tags
    .map((tag) => `                  <span>${tag}</span>`)
    .join("\n");
  const mainActions = hub.actions.filter((action) => action.row !== "docs");
  const docActions = hub.actions.filter((action) => action.row === "docs");
  const actionRows = [renderCardActionRow(mainActions, "card-actions-main"), renderCardActionRow(docActions, "card-actions-docs")]
    .filter(Boolean)
    .join("\n");
  const actions = `              <div class="card-actions">\n${actionRows}\n              </div>`;
  const note = hub.note
    ? `\n                <p class="card-note">\n                  ${hub.note}\n                </p>`
    : "";

  return `            <article class="app-card ${hub.cardClass}">\n              <div>\n                <p class="card-kicker">${hub.kicker}</p>\n                <div class="difficulty-tags" aria-label="Ease of use">\n${tags}\n                </div>\n                <h3>${tool.name}</h3>\n                <p>\n                  ${hub.summary}\n                </p>${note}\n              </div>\n${actions}\n            </article>`;
}

function renderHubPathway(pathway) {
  const steps = pathway.steps
    .map((step) => {
      const tool = toolById.get(step.toolId);
      if (!tool) {
        throw new Error(`Unknown tool id in pathway: ${step.toolId}`);
      }

      const href = tool.hub.actions[0].href;
      return `            <li>\n              <div>\n                <strong><a href="${href}">${tool.name}</a></strong>\n                <span>${step.detail}</span>\n              </div>\n            </li>`;
    })
    .join("\n");

  return `          <article class="hub-pathway ${pathway.className}">\n            <p class="card-kicker">${pathway.kicker}</p>\n            <h3>${pathway.title}</h3>\n            <p>${pathway.summary}</p>\n            <ol class="hub-pathway-steps">\n${steps}\n            </ol>\n          </article>`;
}

function renderHubCatalog() {
  const pathways = HUB_PATHWAYS.map(renderHubPathway).join("\n\n");
  const cards = TOOLS.map(renderHubCard).join("\n\n");

  return `          <p class="section-note">\n            ${HUB_CATALOG_INTRO.note}\n          </p>\n\n          <div class="hub-catalog-intro">\n            <p class="eyebrow">${HUB_PATHWAYS_INTRO.eyebrow}</p>\n            <h3 id="pathways-title">${HUB_PATHWAYS_INTRO.title}</h3>\n            <p>\n              ${HUB_PATHWAYS_INTRO.copy}\n            </p>\n          </div>\n\n          <div class="hub-pathways" aria-labelledby="pathways-title">\n${pathways}\n          </div>\n\n          <div class="hub-catalog-intro">\n            <p class="eyebrow">${HUB_CATALOG_INTRO.eyebrow}</p>\n            <h3>${HUB_CATALOG_INTRO.title}</h3>\n            <p>\n              ${HUB_CATALOG_INTRO.copy}\n            </p>\n          </div>\n\n          <div class="app-grid">\n${cards}\n          </div>`;
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
  const html = read("index.html");
  const updated = replaceGeneratedBlock(html, "hub-catalog", renderHubCatalog());
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

for (const page of ALL_PAGES) {
  applyPage(page);
}

updateHubCatalog();
updateReadme();
writeSitemap();
ensureCloudflareAnalyticsOnAllHtmlFiles();
