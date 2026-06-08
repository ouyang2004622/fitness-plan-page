import { readFileSync } from "node:fs";

const files = ["index.html", "styles.css", "app.js", "api/generate-plan.js", "manifest.json", "sw.js"];
const missing = files.filter((file) => {
  try {
    readFileSync(file, "utf8");
    return false;
  } catch {
    return true;
  }
});

if (missing.length) {
  throw new Error(`Missing files: ${missing.join(", ")}`);
}

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");

const requiredHtml = [
  'id="aiPlanBtn"',
  'id="localPlanBtn"',
  'id="savePlanBtn"',
  'id="completeAllBtn"',
  'id="exportBtn"',
  'id="profileForm"',
  'id="foodInput"',
  'id="videoList"',
  'id="historyList"',
  'id="settingsDialog"',
  './app.js',
  './styles.css'
];

const requiredJs = [
  'fetch("https://api.openai.com/v1/responses"',
  "function generateAIPlan()",
  "function buildLocalPlan()",
  "function renderVideos",
  "function saveCurrentPlan",
  "function completeAll",
  "VIDEO_LIBRARY"
];

for (const needle of requiredHtml) {
  if (!html.includes(needle)) throw new Error(`index.html missing ${needle}`);
}

for (const needle of requiredJs) {
  if (!app.includes(needle)) throw new Error(`app.js missing ${needle}`);
}

console.log("App static checks passed.");
