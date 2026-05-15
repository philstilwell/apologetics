import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

import { ALL_PAGES } from "./tool-manifest.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = resolveRoot();

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

function routeForFile(file) {
  if (file === "index.html") {
    return "/";
  }

  if (file.endsWith("/index.html")) {
    return `/${file.slice(0, -"index.html".length)}`;
  }

  return `/${file}`;
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
  }[extension] || "application/octet-stream";
}

function createStaticServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    let relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");

    if (!relativePath) {
      relativePath = "index.html";
    } else if (relativePath.endsWith("/")) {
      relativePath += "index.html";
    }

    const filePath = path.resolve(ROOT, relativePath);
    if (!filePath.startsWith(ROOT)) {
      response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    if (stat.isDirectory()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "content-type": contentTypeFor(filePath) });
    fs.createReadStream(filePath).pipe(response);
  });
}

function verifyManifestCoverage() {
  const actualFiles = listHtmlFiles();
  const manifestFiles = ALL_PAGES.map((page) => page.file).sort();
  const missing = actualFiles.filter((file) => !manifestFiles.includes(file));
  const extra = manifestFiles.filter((file) => !actualFiles.includes(file));

  assert.deepEqual(
    { missing, extra },
    { missing: [], extra: [] },
    `Manifest/page mismatch.\nMissing from manifest: ${missing.join(", ") || "none"}\nExtra in manifest: ${extra.join(", ") || "none"}`
  );
}

async function verifyMoralParticularsCalculations(baseUrl, browser) {
  const page = await browser.newPage();
  const calculationState = {
    selectedIssueId: "1a",
    reportMode: "all",
    issueStates: {
      "1a": {
        stance: "oppose",
        grounders: { scripture: 9, "unknown-grounder": 10 },
        disagreement: { "different-facts": 4, "unknown-disagreement": 10 },
        notes: "",
      },
      "1b": {
        stance: "support",
        grounders: { "social-norms": 7 },
        disagreement: {},
        notes: "",
      },
      "2": {
        stance: "support",
        grounders: { "social-norms": 7 },
        disagreement: { "different-facts": 2 },
        notes: "",
      },
      "3": {
        stance: "oppose",
        grounders: { "unknown-grounder": 10 },
        disagreement: { "unknown-disagreement": 10 },
        notes: "",
      },
    },
  };

  try {
    await page.goto(`${baseUrl}/apps/moral-particulars-audit/`, { waitUntil: "load" });
    await page.evaluate((state) => {
      localStorage.setItem("moral-particulars-audit-v1", JSON.stringify(state));
    }, calculationState);
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(500);

    assert.equal(
      normalizeText(await page.locator("#completedCases").innerText()),
      "2/13",
      "Moral Particulars mapped-case count should require a valid stance, a known grounder weight, and a known disagreement weight."
    );

    const patternText = normalizeText(await page.locator("#patternList").innerText());
    assert.match(
      patternText,
      /2 give social norms strong weight/,
      "Social-norm pattern should be triggered by the fully mapped case."
    );
    assert.doesNotMatch(
      patternText,
      /1b,\s*2 give social norms strong weight/,
      "Social-norm pattern should not include partial cases in its mapped-case warning."
    );

    const coverageText = normalizeText(await page.locator("#grounderConcentrationCoverage").innerText());
    assert.match(
      coverageText,
      /Scripture 1\/2/,
      "Grounder coverage should use only the two fully mapped cases as the denominator."
    );
    assert.match(
      coverageText,
      /Norms 1\/2/,
      "Partial social-norm input should not inflate graph coverage."
    );
  } finally {
    await page.close();
  }
}

async function verifyMoralStressCalculations(baseUrl, browser) {
  const page = await browser.newPage();

  try {
    await page.goto(`${baseUrl}/apps/moral-system-stress-test/`, { waitUntil: "load" });
    await page.evaluate(() => {
      localStorage.removeItem("moral-system-stress-test-v3");
      state = defaultState();
      renderAll();
    });

    const empty = await page.evaluate(() => ({
      completeness: calculateCompleteness(),
      displayedCompleteness: document.querySelector("#completenessScore").textContent,
      boundaryRisk: calculateBoundaryRisk(),
      displayedBoundaryRisk: document.querySelector("#statusBoundaryRisk").textContent,
      matchedCount: getMatchedChallenges().length,
      topPressures: getMatchedChallenges().slice(0, 3).map((item) => item.id),
      handoffRisk: buildParticularsState().pipelineContext.boundaryRisk,
    }));
    assert.deepEqual(
      empty,
      {
        completeness: 0,
        displayedCompleteness: "0%",
        boundaryRisk: 5,
        displayedBoundaryRisk: "5",
        matchedCount: 4,
        topPressures: ["prior-assessment", "meaning-gap", "scripture-ambiguity"],
        handoffRisk: 5,
      },
      "Moral System Stress Test empty-state numbers should be stable and consistent across display and handoff."
    );

    const partial = await page.evaluate(() => {
      state = defaultState();
      const element = getElementById("moral-meaning");
      state.routes[element.id] = "natural-law";
      state.strength[element.id] = 3;
      state.checks[element.id] = Object.fromEntries(element.checks.map((check) => [check.id, true]));
      renderAll();
      return {
        componentScore: Math.round(elementScore(element.id) * 100),
        completeness: calculateCompleteness(),
        ready: elementIsReady(element.id),
        sufficiencyMatched: getMatchedChallenges().some((item) => item.id === "sufficiency-collapse"),
      };
    });
    assert.deepEqual(
      partial,
      {
        componentScore: 100,
        completeness: 13,
        ready: true,
        sufficiencyMatched: true,
      },
      "A single completed component should score fully while the overall system remains incomplete."
    );

    const complete = await page.evaluate(() => {
      state = defaultState();
      const routeCycle = ["divine-command", "human-flourishing", "natural-law", "scripture"];
      getCoreElements().forEach((element, index) => {
        state.routes[element.id] = routeCycle[index % routeCycle.length];
        state.strength[element.id] = 3;
        state.checks[element.id] = Object.fromEntries(element.checks.map((check) => [check.id, true]));
      });
      renderAll();
      return {
        completeness: calculateCompleteness(),
        readyCount: getCoreElements().filter((element) => elementIsReady(element.id)).length,
        sufficiencyMatched: getMatchedChallenges().some((item) => item.id === "sufficiency-collapse"),
        boundaryRisk: calculateBoundaryRisk(),
        handoffRisk: buildParticularsState().pipelineContext.boundaryRisk,
        displayedCompleteness: document.querySelector("#statusCompleteness").textContent,
      };
    });
    assert.deepEqual(
      complete,
      {
        completeness: 100,
        readyCount: 8,
        sufficiencyMatched: false,
        boundaryRisk: 0,
        handoffRisk: 0,
        displayedCompleteness: "100%",
      },
      "A fully covered moral system should reach 100%, clear sufficiency pressure, and export the same boundary risk shown in the ledger."
    );
  } finally {
    await page.close();
  }
}

async function listen(server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine smoke-test server address.");
  }

  return `http://127.0.0.1:${address.port}`;
}

async function run() {
  verifyManifestCoverage();

  const server = createStaticServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ headless: true });

  try {
    for (const pageDef of ALL_PAGES) {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on("pageerror", (error) => {
        pageErrors.push(error);
      });

      const response = await page.goto(`${baseUrl}${routeForFile(pageDef.file)}`, {
        waitUntil: "load",
      });
      assert(response, `No response returned for ${pageDef.file}`);
      assert.equal(response.status(), 200, `Expected 200 for ${pageDef.file}`);

      await page.locator("h1").first().waitFor();
      await page.locator(".small-screen-notice").waitFor({ state: "attached" });
      await page.waitForTimeout(500);

      const title = await page.title();
      assert.equal(title, pageDef.title, `Unexpected title for ${pageDef.file}`);

      const h1 = normalizeText(await page.locator("h1").first().innerText());
      assert.equal(h1, pageDef.expectedH1, `Unexpected h1 for ${pageDef.file}`);
      assert.equal(
        await page.locator(".small-screen-notice").isVisible(),
        false,
        `Small-screen notice should be hidden on desktop for ${pageDef.file}`
      );

      assert.equal(
        pageErrors.length,
        0,
        `pageerror on ${pageDef.file}: ${pageErrors.map((error) => error.message).join(" | ")}`
      );

      await page.close();

      const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const mobilePageErrors = [];
      mobilePage.on("pageerror", (error) => {
        mobilePageErrors.push(error);
      });

      const mobileResponse = await mobilePage.goto(`${baseUrl}${routeForFile(pageDef.file)}`, {
        waitUntil: "load",
      });
      assert(mobileResponse, `No mobile response returned for ${pageDef.file}`);
      assert.equal(mobileResponse.status(), 200, `Expected mobile 200 for ${pageDef.file}`);

      const notice = mobilePage.locator(".small-screen-notice");
      await notice.waitFor({ state: "visible" });

      const noticeText = normalizeText(await notice.innerText());
      assert.match(
        noticeText,
        /greater resolution/i,
        `Small-screen notice text missing expected warning for ${pageDef.file}`
      );
      assert.match(
        noticeText,
        /iPad-size screen or larger/i,
        `Small-screen notice text missing device guidance for ${pageDef.file}`
      );

      assert.equal(
        mobilePageErrors.length,
        0,
        `pageerror on mobile ${pageDef.file}: ${mobilePageErrors.map((error) => error.message).join(" | ")}`
      );

      await mobilePage.close();
      console.log(`PASS ${pageDef.file}`);
    }

    await verifyMoralParticularsCalculations(baseUrl, browser);
    console.log("PASS Moral Particulars calculation checks");
    await verifyMoralStressCalculations(baseUrl, browser);
    console.log("PASS Moral System Stress calculation checks");
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  console.log(`Smoke suite passed for ${ALL_PAGES.length} pages.`);
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
