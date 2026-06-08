import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const server = spawn("python", ["-m", "http.server", "4173", "--bind", "127.0.0.1"], {
  stdio: "ignore"
});

try {
  await wait(1200);
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("http://127.0.0.1:4173/index.html", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "设置" }).click();
  await page.getByRole("button", { name: "保存设置" }).click();
  await page.getByRole("button", { name: "资料", exact: true }).click();
  await page.getByLabel("体重 斤").fill("140");
  await page.getByRole("button", { name: "保存资料" }).click();
  await page.getByRole("button", { name: "食材", exact: true }).click();
  await page.getByPlaceholder("输入食材，如：米饭").fill("米饭");
  await page.getByRole("button", { name: "添加" }).click();
  await page.getByRole("button", { name: "今日", exact: true }).click();
  await page.getByRole("button", { name: "本地生成" }).click();
  await page.locator(".check-item input").first().check();
  await page.getByRole("button", { name: "视频", exact: true }).click();
  await page.getByRole("button", { name: "胸肩" }).click();

  mkdirSync("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/mobile-ui.png", fullPage: true });

  const videoCount = await page.locator(".video-item").count();
  const title = await page.locator("#planTitle").textContent();
  await browser.close();

  if (errors.length) throw new Error(errors.join("\n"));
  if (!videoCount) throw new Error("Video filter produced no items.");
  if (!title?.trim()) throw new Error("Plan title is empty.");
  console.log("UI verification passed. Screenshot: artifacts/mobile-ui.png");
} finally {
  server.kill();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
