const STORAGE = {
  profile: "fitness.profile.v2",
  foods: "fitness.foods.v2",
  settings: "fitness.aiSettings.v2",
  apiKey: "fitness.openaiKey.v2",
  history: "fitness.planHistory.v2",
  completion: "fitness.completion.v2"
};

const DEFAULT_PROFILE = {
  name: "欧鸡",
  height: 175,
  weightJin: 140,
  goal: "recomp",
  level: "beginner",
  time: "45-60",
  equipment: "哑铃、瑜伽垫",
  injury: "无"
};

const DEFAULT_FOODS = ["牛排", "鸡蛋", "虾仁", "橄榄油"];
const QUICK_FOODS = ["米饭", "燕麦", "红薯", "西兰花", "菠菜", "香蕉", "苹果", "无糖酸奶", "低脂牛奶", "鸡胸肉", "豆腐"];

const VIDEO_LIBRARY = [
  {
    id: "squat",
    title: "哑铃深蹲 / 酒杯深蹲动作教学",
    tag: "下肢",
    note: "学习下蹲路径、膝盖方向和核心稳定。",
    url: "https://search.bilibili.com/all?keyword=%E5%93%91%E9%93%83%E9%85%92%E6%9D%AF%E6%B7%B1%E8%B9%B2%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  },
  {
    id: "rdl",
    title: "哑铃罗马尼亚硬拉教学",
    tag: "后链",
    note: "重点看髋铰链、背部中立和大腿后侧发力。",
    url: "https://search.bilibili.com/all?keyword=%E5%93%91%E9%93%83%E7%BD%97%E9%A9%AC%E5%B0%BC%E4%BA%9A%E7%A1%AC%E6%8B%89%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  },
  {
    id: "floor-press",
    title: "哑铃地板卧推教学",
    tag: "胸肩",
    note: "地板卧推更适合家里练，注意肘部角度和肩胛控制。",
    url: "https://search.bilibili.com/all?keyword=%E5%93%91%E9%93%83%E5%9C%B0%E6%9D%BF%E5%8D%A7%E6%8E%A8%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  },
  {
    id: "row",
    title: "单臂哑铃划船教学",
    tag: "背部",
    note: "重点是肩胛先动、手肘向后拉，不要耸肩。",
    url: "https://search.bilibili.com/all?keyword=%E5%8D%95%E8%87%82%E5%93%91%E9%93%83%E5%88%92%E8%88%B9%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  },
  {
    id: "shoulder-press",
    title: "哑铃肩推动作教学",
    tag: "胸肩",
    note: "看肋骨下沉、手腕堆叠和避免后仰借力。",
    url: "https://search.bilibili.com/all?keyword=%E5%93%91%E9%93%83%E8%82%A9%E6%8E%A8%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  },
  {
    id: "plank",
    title: "平板支撑正确做法",
    tag: "核心",
    note: "腰不要塌，臀部不要翘，先追求稳定呼吸。",
    url: "https://search.bilibili.com/all?keyword=%E5%B9%B3%E6%9D%BF%E6%94%AF%E6%92%91%20%E6%AD%A3%E7%A1%AE%E5%81%9A%E6%B3%95"
  },
  {
    id: "full-body",
    title: "新手哑铃全身训练跟练",
    tag: "跟练",
    note: "时间紧时用跟练替代主训练，先熟悉节奏。",
    url: "https://search.bilibili.com/all?keyword=%E6%96%B0%E6%89%8B%20%E5%93%91%E9%93%83%20%E5%85%A8%E8%BA%AB%E8%AE%AD%E7%BB%83%2020%E5%88%86%E9%92%9F"
  },
  {
    id: "mountain-climber",
    title: "登山跑动作教学",
    tag: "燃脂",
    note: "燃脂收尾用，动作稳定比速度更重要。",
    url: "https://search.bilibili.com/all?keyword=%E7%99%BB%E5%B1%B1%E8%B7%91%20%E5%8A%A8%E4%BD%9C%E6%95%99%E5%AD%A6"
  }
];

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "source", "targets", "training", "meals", "shopping", "notes"],
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    source: { type: "string" },
    targets: {
      type: "object",
      additionalProperties: false,
      required: ["protein", "water", "steps", "calories"],
      properties: {
        protein: { type: "string" },
        water: { type: "string" },
        steps: { type: "string" },
        calories: { type: "string" }
      }
    },
    training: {
      type: "object",
      additionalProperties: false,
      required: ["focus", "duration", "intensity", "warmup", "exercises", "finisher", "cooldown"],
      properties: {
        focus: { type: "string" },
        duration: { type: "string" },
        intensity: { type: "string" },
        warmup: { type: "array", items: { type: "string" } },
        exercises: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["id", "name", "sets", "reps", "rest", "cues", "videoId"],
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              sets: { type: "string" },
              reps: { type: "string" },
              rest: { type: "string" },
              cues: { type: "array", items: { type: "string" } },
              videoId: { type: "string" }
            }
          }
        },
        finisher: { type: "array", items: { type: "string" } },
        cooldown: { type: "array", items: { type: "string" } }
      }
    },
    meals: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["time", "title", "foods", "prep", "protein"],
        properties: {
          time: { type: "string" },
          title: { type: "string" },
          foods: { type: "string" },
          prep: { type: "string" },
          protein: { type: "string" }
        }
      }
    },
    shopping: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "items", "reason"],
        properties: {
          category: { type: "string" },
          items: { type: "array", items: { type: "string" } },
          reason: { type: "string" }
        }
      }
    },
    notes: { type: "array", items: { type: "string" } }
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let profile = loadJSON(STORAGE.profile, DEFAULT_PROFILE);
let foods = loadJSON(STORAGE.foods, DEFAULT_FOODS);
let settings = loadJSON(STORAGE.settings, {
  apiMode: "browser",
  model: "gpt-5.2",
  proxyUrl: "/api/generate-plan"
});
let apiKey = localStorage.getItem(STORAGE.apiKey) || "";
let history = loadJSON(STORAGE.history, []);
let completions = loadJSON(STORAGE.completion, {});
let selectedVideoTag = "全部";
let currentPlan = buildLocalPlan();

const els = {
  todayLabel: $("#todayLabel"),
  dashboardSummary: $("#dashboardSummary"),
  weightMetric: $("#weightMetric"),
  bmiMetric: $("#bmiMetric"),
  proteinMetric: $("#proteinMetric"),
  durationMetric: $("#durationMetric"),
  planTitle: $("#planTitle"),
  planSummary: $("#planSummary"),
  planSource: $("#planSource"),
  trainingTag: $("#trainingTag"),
  dietTag: $("#dietTag"),
  trainingPlan: $("#trainingPlan"),
  mealPlan: $("#mealPlan"),
  shoppingList: $("#shoppingList"),
  checklist: $("#checklist"),
  completionTag: $("#completionTag"),
  historyList: $("#historyList"),
  foodChips: $("#foodChips"),
  quickFoods: $("#quickFoods"),
  videoFilter: $("#videoFilter"),
  videoList: $("#videoList"),
  toast: $("#toast"),
  settingsDialog: $("#settingsDialog")
};

init();

function init() {
  setTodayLabel();
  syncFormFromState();
  wireEvents();
  renderAll();
  registerServiceWorker();
}

function wireEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.getElementById(tab.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    profile = collectProfile();
    saveJSON(STORAGE.profile, profile);
    currentPlan = buildLocalPlan();
    clearTodayCompletions();
    renderAll();
    toast("资料已保存，计划已按新资料刷新。");
  });

  $("#resetProfileBtn").addEventListener("click", () => {
    profile = { ...DEFAULT_PROFILE };
    foods = [...DEFAULT_FOODS];
    saveJSON(STORAGE.profile, profile);
    saveJSON(STORAGE.foods, foods);
    currentPlan = buildLocalPlan();
    clearTodayCompletions();
    syncFormFromState();
    renderAll();
    toast("已恢复默认资料。");
  });

  $("#localPlanBtn").addEventListener("click", () => {
    profile = collectProfile();
    saveJSON(STORAGE.profile, profile);
    currentPlan = buildLocalPlan();
    clearTodayCompletions();
    renderAll();
    toast("已生成本地规则计划。");
  });

  $("#aiPlanBtn").addEventListener("click", generateAIPlan);
  $("#savePlanBtn").addEventListener("click", saveCurrentPlan);
  $("#completeAllBtn").addEventListener("click", completeAll);
  $("#exportBtn").addEventListener("click", exportCurrentPlan);
  $("#clearHistoryBtn").addEventListener("click", clearHistory);

  $("#addFoodBtn").addEventListener("click", () => addFood($("#foodInput").value));
  $("#foodInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFood(event.currentTarget.value);
    }
  });

  $("#openSettingsBtn").addEventListener("click", () => {
    syncSettingsForm();
    els.settingsDialog.showModal();
  });

  $("#saveAiSettingsBtn").addEventListener("click", () => {
    settings = {
      apiMode: $("#apiModeInput").value,
      model: $("#modelInput").value.trim() || "gpt-5.2",
      proxyUrl: $("#proxyInput").value.trim() || "/api/generate-plan"
    };
    apiKey = $("#apiKeyInput").value.trim();
    saveJSON(STORAGE.settings, settings);
    if (apiKey) localStorage.setItem(STORAGE.apiKey, apiKey);
    els.settingsDialog.close();
    toast("AI 设置已保存。");
  });

  $("#clearApiKeyBtn").addEventListener("click", () => {
    apiKey = "";
    localStorage.removeItem(STORAGE.apiKey);
    $("#apiKeyInput").value = "";
    toast("本机保存的 API Key 已清除。");
  });
}

function setTodayLabel() {
  const now = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  els.todayLabel.textContent = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${weekdays[now.getDay()]}`;
}

function syncFormFromState() {
  $("#nameInput").value = profile.name;
  $("#heightInput").value = profile.height;
  $("#weightInput").value = profile.weightJin;
  $("#goalInput").value = profile.goal;
  $("#levelInput").value = profile.level;
  $("#timeInput").value = profile.time;
  $("#equipmentInput").value = profile.equipment;
  $("#injuryInput").value = profile.injury;
  syncSettingsForm();
}

function syncSettingsForm() {
  $("#apiModeInput").value = settings.apiMode;
  $("#modelInput").value = settings.model || "gpt-5.2";
  $("#proxyInput").value = settings.proxyUrl || "/api/generate-plan";
  $("#apiKeyInput").value = apiKey;
}

function collectProfile() {
  return {
    name: $("#nameInput").value.trim() || "我",
    height: clamp(Number($("#heightInput").value), 120, 230, 175),
    weightJin: clamp(Number($("#weightInput").value), 60, 360, 140),
    goal: $("#goalInput").value,
    level: $("#levelInput").value,
    time: $("#timeInput").value,
    equipment: $("#equipmentInput").value.trim() || "哑铃、瑜伽垫",
    injury: $("#injuryInput").value.trim() || "无"
  };
}

function renderAll() {
  renderMetrics();
  renderPlan(currentPlan);
  renderFoods();
  renderVideos();
  renderHistory();
}

function renderMetrics() {
  const metrics = calculateMetrics(profile);
  els.dashboardSummary.textContent = `${profile.height}cm｜${profile.weightJin}斤｜${goalLabel(profile.goal)}｜${profile.equipment}`;
  els.weightMetric.textContent = `${formatNumber(metrics.weightKg)}kg`;
  els.bmiMetric.textContent = metrics.bmi.toFixed(1);
  els.proteinMetric.textContent = `${metrics.proteinLow}-${metrics.proteinHigh}g`;
  els.durationMetric.textContent = `${profile.time}分`;
}

function renderPlan(plan) {
  const metrics = calculateMetrics(profile);
  els.planTitle.textContent = plan.title;
  els.planSummary.textContent = plan.summary;
  els.planSource.textContent = plan.source || "本地计划";
  els.trainingTag.textContent = plan.training.duration;
  els.dietTag.textContent = `${metrics.proteinLow}-${metrics.proteinHigh}g蛋白`;

  els.trainingPlan.innerHTML = `
    <div class="exercise-list">
      ${renderWarmup(plan.training)}
      ${plan.training.exercises.map(renderExercise).join("")}
      ${renderSimpleBlock("燃脂收尾", plan.training.finisher)}
      ${renderSimpleBlock("放松拉伸", plan.training.cooldown)}
    </div>
  `;

  els.mealPlan.innerHTML = `
    <div class="meal-list">
      ${plan.meals.map(renderMeal).join("")}
    </div>
  `;

  els.shoppingList.innerHTML = plan.shopping.map((group) => `
    <li>
      <strong>${escapeHTML(group.category)}</strong>
      <span>${escapeHTML(group.items.join("、"))}<br><span class="muted">${escapeHTML(group.reason)}</span></span>
    </li>
  `).join("");

  renderChecklist(plan);
}

function renderWarmup(training) {
  return `
    <div class="exercise-item">
      <div class="exercise-top">
        <h4>热身</h4>
        <span class="exercise-dose">${escapeHTML(training.intensity)}</span>
      </div>
      <ul class="cue-list">
        ${training.warmup.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderExercise(exercise) {
  const video = VIDEO_LIBRARY.find((item) => item.id === exercise.videoId) || VIDEO_LIBRARY[0];
  return `
    <div class="exercise-item">
      <div class="exercise-top">
        <h4>${escapeHTML(exercise.name)}</h4>
        <span class="exercise-dose">${escapeHTML(exercise.sets)} × ${escapeHTML(exercise.reps)}</span>
      </div>
      <p>休息 ${escapeHTML(exercise.rest)}</p>
      <ul class="cue-list">
        ${exercise.cues.map((cue) => `<li>${escapeHTML(cue)}</li>`).join("")}
      </ul>
      <div class="inline-actions">
        <a href="${video.url}" target="_blank" rel="noreferrer">打开B站视频</a>
        <button type="button" data-video-id="${video.id}">在动作库定位</button>
      </div>
    </div>
  `;
}

function renderSimpleBlock(title, items) {
  if (!items?.length) return "";
  return `
    <div class="exercise-item">
      <div class="exercise-top">
        <h4>${escapeHTML(title)}</h4>
      </div>
      <ul class="cue-list">
        ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderMeal(meal) {
  return `
    <div class="meal-item">
      <div class="meal-top">
        <h4>${escapeHTML(meal.title)}</h4>
        <span class="meal-time">${escapeHTML(meal.time)}</span>
      </div>
      <p>${escapeHTML(meal.foods)}</p>
      <div class="meal-meta">
        <span>${escapeHTML(meal.protein)}</span>
        <span>${escapeHTML(meal.prep)}</span>
      </div>
    </div>
  `;
}

function renderChecklist(plan) {
  const dateKey = getDateKey();
  const planChecks = [
    ...plan.training.exercises.map((exercise) => ({
      id: `exercise:${exercise.id}`,
      title: exercise.name,
      note: `${exercise.sets} × ${exercise.reps}`
    })),
    ...plan.meals.map((meal) => ({
      id: `meal:${meal.time}`,
      title: meal.title,
      note: meal.foods
    })),
    { id: "water", title: `喝水 ${plan.targets.water}`, note: "分散到全天，不要训练后一口气猛灌。" },
    { id: "steps", title: `步数 ${plan.targets.steps}`, note: "训练日也保留低强度活动。" }
  ];

  completions[dateKey] = completions[dateKey] || {};
  els.checklist.innerHTML = planChecks.map((item) => `
    <label class="check-item">
      <input type="checkbox" data-check-id="${escapeHTML(item.id)}" ${completions[dateKey][item.id] ? "checked" : ""} />
      <strong>${escapeHTML(item.title)}<span>${escapeHTML(item.note)}</span></strong>
    </label>
  `).join("");

  els.checklist.querySelectorAll("input[type='checkbox']").forEach((box) => {
    box.addEventListener("change", () => {
      completions[dateKey][box.dataset.checkId] = box.checked;
      saveJSON(STORAGE.completion, completions);
      updateCompletion(planChecks);
    });
  });

  els.trainingPlan.querySelectorAll("[data-video-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedVideoTag = "全部";
      renderVideos(button.dataset.videoId);
      document.getElementById("videos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  updateCompletion(planChecks);
}

function updateCompletion(items) {
  const today = completions[getDateKey()] || {};
  const total = items.length || 1;
  const done = items.filter((item) => today[item.id]).length;
  els.completionTag.textContent = `${Math.round((done / total) * 100)}%`;
}

function renderFoods() {
  els.foodChips.innerHTML = foods.map((food) => `
    <span class="chip">${escapeHTML(food)} <button type="button" aria-label="删除${escapeHTML(food)}" data-remove-food="${escapeHTML(food)}">×</button></span>
  `).join("");

  els.foodChips.querySelectorAll("[data-remove-food]").forEach((button) => {
    button.addEventListener("click", () => {
      foods = foods.filter((food) => food !== button.dataset.removeFood);
      saveJSON(STORAGE.foods, foods);
      currentPlan = buildLocalPlan();
      renderAll();
      toast("食材已移除，计划已刷新。");
    });
  });

  els.quickFoods.innerHTML = QUICK_FOODS.map((food) => `
    <button class="filter-chip" type="button" data-quick-food="${escapeHTML(food)}">+ ${escapeHTML(food)}</button>
  `).join("");

  els.quickFoods.querySelectorAll("[data-quick-food]").forEach((button) => {
    button.addEventListener("click", () => addFood(button.dataset.quickFood));
  });
}

function renderVideos(focusId = "") {
  const tags = ["全部", ...new Set(VIDEO_LIBRARY.map((video) => video.tag))];
  els.videoFilter.innerHTML = tags.map((tag) => `
    <button class="filter-chip ${tag === selectedVideoTag ? "is-active" : ""}" type="button" data-video-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>
  `).join("");

  els.videoFilter.querySelectorAll("[data-video-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedVideoTag = button.dataset.videoTag;
      renderVideos();
    });
  });

  const videos = selectedVideoTag === "全部"
    ? VIDEO_LIBRARY
    : VIDEO_LIBRARY.filter((video) => video.tag === selectedVideoTag);

  els.videoList.innerHTML = videos.map((video) => `
    <div class="video-item" id="video-${escapeHTML(video.id)}">
      <div class="video-top">
        <h4>${escapeHTML(video.title)}</h4>
        <a href="${video.url}" target="_blank" rel="noreferrer">打开</a>
      </div>
      <p>${escapeHTML(video.note)}</p>
      <span class="video-source">Bilibili</span>
    </div>
  `).join("");

  if (focusId) {
    requestAnimationFrame(() => {
      const target = document.getElementById(`video-${focusId}`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.animate([{ outlineColor: "#2563eb" }, { outlineColor: "transparent" }], {
        duration: 1200,
        iterations: 1
      });
    });
  }
}

function renderHistory() {
  if (!history.length) {
    els.historyList.innerHTML = `<div class="empty-state">还没有保存过计划。生成后点“保存今日计划”，这里会保留长期记录。</div>`;
    return;
  }

  els.historyList.innerHTML = history.slice().reverse().map((item) => `
    <div class="history-item">
      <div class="history-top">
        <strong>${escapeHTML(item.date)}｜${escapeHTML(item.plan.title)}</strong>
        <span class="status-pill">${escapeHTML(item.plan.source || "本地")}</span>
      </div>
      <p>${escapeHTML(item.plan.summary)}</p>
      <div class="history-actions">
        <button type="button" data-load-history="${escapeHTML(item.id)}">载入</button>
        <button type="button" data-delete-history="${escapeHTML(item.id)}">删除</button>
      </div>
    </div>
  `).join("");

  els.historyList.querySelectorAll("[data-load-history]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = history.find((entry) => entry.id === button.dataset.loadHistory);
      if (!item) return;
      currentPlan = item.plan;
      renderAll();
      document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("已载入历史计划。");
    });
  });

  els.historyList.querySelectorAll("[data-delete-history]").forEach((button) => {
    button.addEventListener("click", () => {
      history = history.filter((entry) => entry.id !== button.dataset.deleteHistory);
      saveJSON(STORAGE.history, history);
      renderHistory();
      toast("历史计划已删除。");
    });
  });
}

async function generateAIPlan() {
  profile = collectProfile();
  saveJSON(STORAGE.profile, profile);

  if (settings.apiMode === "browser" && !apiKey) {
    syncSettingsForm();
    els.settingsDialog.showModal();
    toast("先在设置里保存 OpenAI API Key，或使用本地生成。");
    return;
  }

  setLoading(true);
  try {
    const plan = await requestAIPlan();
    currentPlan = normalizePlan(plan, "AI计划");
    clearTodayCompletions();
    renderAll();
    toast("AI 已生成今日计划。");
  } catch (error) {
    console.error(error);
    currentPlan = buildLocalPlan();
    renderAll();
    toast(`AI 调用失败，已切回本地计划：${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function requestAIPlan() {
  const context = {
    date: getDateKey(),
    profile,
    foods,
    availableVideos: VIDEO_LIBRARY.map(({ id, title, tag, url }) => ({ id, title, tag, url })),
    recentPlans: history.slice(-5).map((item) => ({
      date: item.date,
      title: item.plan.title,
      focus: item.plan.training?.focus
    })),
    requirements: [
      "只安排哑铃和瑜伽垫能完成的动作",
      "饮食必须按时间段安排",
      "用中文输出",
      "视频必须引用 availableVideos 里的 videoId",
      "目标是减脂增肌，保持小热量缺口和足量蛋白",
      "避免医疗承诺；如有伤痛，降低强度并提醒停止"
    ]
  };

  if (settings.apiMode === "proxy") {
    const response = await fetch(settings.proxyUrl || "/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context })
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: settings.model || "gpt-5.2",
      instructions: [
        "你是一个严谨的私人健身和饮食计划助手。",
        "根据用户资料、器械、已有食材和最近历史，为今天生成可执行计划。",
        "动作安排要适合家庭哑铃训练；饮食要分时间段；采购清单要补齐缺失营养。",
        "不要给医学诊断。出现疼痛、眩晕、胸闷时提醒停止训练并咨询专业人士。",
        "严格返回符合 JSON Schema 的 JSON，不要 Markdown。"
      ].join("\n"),
      input: JSON.stringify(context),
      text: {
        format: {
          type: "json_schema",
          name: "daily_fitness_plan",
          strict: true,
          schema: PLAN_SCHEMA
        }
      },
      max_output_tokens: 3500
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = extractResponseText(data);
  return JSON.parse(text);
}

function extractResponseText(data) {
  if (data.output_text) return data.output_text;
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" || content.type === "text") {
        chunks.push(content.text);
      }
    }
  }
  const text = chunks.join("").trim();
  if (!text) throw new Error("AI 响应为空。");
  return text;
}

function buildLocalPlan() {
  const metrics = calculateMetrics(profile);
  const template = trainingTemplate();
  const hasSteak = hasFood(["牛排", "牛肉"]);
  const hasEgg = hasFood(["鸡蛋", "蛋"]);
  const hasShrimp = hasFood(["虾仁", "虾"]);
  const hasCarb = hasFood(["米饭", "燕麦", "红薯", "土豆", "面包", "香蕉"]);
  const hasVeg = hasFood(["西兰花", "菠菜", "生菜", "番茄", "黄瓜", "蔬菜"]);
  const hasDairy = hasFood(["牛奶", "酸奶", "豆浆"]);

  return normalizePlan({
    title: `${template.focus} + 高蛋白控热量`,
    summary: `按 ${formatNumber(metrics.weightKg)}kg 体重安排 ${metrics.proteinLow}-${metrics.proteinHigh}g 蛋白。训练用哑铃和瑜伽垫完成，饮食优先使用你已有的 ${foods.join("、")}。`,
    source: "本地计划",
    targets: {
      protein: `${metrics.proteinLow}-${metrics.proteinHigh}g`,
      water: "2-3L",
      steps: "6000-9000步",
      calories: profile.goal === "muscle" ? "轻微盈余，别暴食" : "轻微缺口，保留训练碳水"
    },
    training: template,
    meals: [
      {
        time: "08:00",
        title: "早餐",
        foods: `${hasEgg ? "鸡蛋2个" : "无糖酸奶/低脂牛奶"} + ${hasCarb ? "燕麦或全麦主食" : "建议购买燕麦50g"} + 1份水果。`,
        prep: "10分钟内完成",
        protein: "约25-35g蛋白"
      },
      {
        time: "12:30",
        title: "午餐",
        foods: `${hasSteak ? "牛排150-200g" : "鸡胸肉或鱼肉180g"} + ${hasCarb ? "米饭1碗/红薯250g" : "建议购买米饭或红薯"} + ${hasVeg ? "蔬菜300g" : "建议购买西兰花/菠菜300g"} + 橄榄油5-8g。`,
        prep: "少油煎/烤/水煮",
        protein: "约40-50g蛋白"
      },
      {
        time: "16:30",
        title: "训练前加餐",
        foods: `${hasCarb ? "香蕉1根或全麦面包1片" : "建议买香蕉；临时可吃1个鸡蛋"}，配300-500ml水。`,
        prep: "训练前30-90分钟",
        protein: "约6-12g蛋白"
      },
      {
        time: "19:30",
        title: "训练后晚餐",
        foods: `${hasShrimp ? "虾仁180-220g" : "鱼肉/豆腐/鸡胸肉180-220g"} + ${hasEgg ? "鸡蛋1个" : "豆腐或牛奶补蛋白"} + 米饭半碗到1碗 + 蔬菜300g。`,
        prep: "训练后2小时内",
        protein: "约45-55g蛋白"
      },
      {
        time: "22:30",
        title: "睡前可选",
        foods: hasDairy ? "无糖酸奶/牛奶/豆浆，饿了再吃。" : "建议购买无糖酸奶或低脂牛奶；不饿可以跳过。",
        prep: "补足蛋白用",
        protein: "约10-18g蛋白"
      }
    ],
    shopping: buildShopping(hasCarb, hasVeg, hasDairy),
    notes: [
      "每组最后2-3次吃力但动作不变形，保持RPE 7左右。",
      "同重量能完成上限次数，下次每只哑铃加1-2kg或多做1-2次。",
      "如果出现关节刺痛、眩晕或胸闷，立刻停止训练。"
    ]
  }, "本地计划");
}

function trainingTemplate() {
  const day = new Date().getDay();
  const easy = profile.level === "beginner";
  const duration = `${profile.time}分钟`;
  const intensity = easy ? "RPE 7" : profile.level === "regular" ? "RPE 8" : "RPE 8-9";

  const base = {
    focus: "全身力量 A",
    duration,
    intensity,
    warmup: [
      "开合跳或原地高抬腿60秒",
      "肩绕环和髋绕环各60秒",
      "徒手深蹲2组×12次",
      "猫牛式和死虫激活2分钟"
    ],
    exercises: [
      ex("squat", "哑铃深蹲", "4", "10-12", "75-90秒", ["脚与肩同宽，膝盖跟脚尖同方向。", "下蹲吸气，站起呼气，核心收紧。"], "squat"),
      ex("rdl", "哑铃罗马尼亚硬拉", "4", "10-12", "75-90秒", ["膝盖微屈，髋部向后推。", "背部保持中立，感受大腿后侧和臀部。"], "rdl"),
      ex("floor-press", "哑铃地板卧推", "4", "10-12", "75秒", ["肩胛轻微后收，肘部约45度。", "上臂触地后推起，不要耸肩。"], "floor-press"),
      ex("row", "单臂哑铃划船", "每侧4", "10-12", "60-75秒", ["先收肩胛，再把手肘往后拉。", "顶峰停1秒，身体别旋转。"], "row"),
      ex("shoulder", "哑铃肩推", "3", "8-12", "60-75秒", ["肋骨下沉，手腕在肘上方。", "不要后仰借力，动作慢一点。"], "shoulder-press"),
      ex("plank", "平板支撑", "3", "30-60秒", "45秒", ["肘在肩下，夹紧臀部。", "腰不要塌，能说短句但不能松散。"], "plank")
    ],
    finisher: [
      "登山跑30秒 + 休息30秒",
      "徒手深蹲30秒 + 休息30秒",
      "循环4轮；状态一般时取消收尾"
    ],
    cooldown: [
      "股四头肌、臀部、大腿后侧各30秒",
      "胸肩拉伸2分钟",
      "慢走或鼻吸口呼2分钟"
    ]
  };

  if (day === 2 || day === 4 || day === 0) {
    return {
      ...base,
      focus: day === 0 ? "主动恢复" : "低强度有氧 + 灵活性",
      exercises: [
        ex("walk", "快走或原地踏步", "1", "30-45分钟", "按需", ["能说完整句子，不追求喘。", "训练日以恢复为主。"], "full-body"),
        ex("mobility", "髋部和胸椎灵活性", "2", "每项45秒", "30秒", ["动作慢，找紧张点。", "不要用疼痛换幅度。"], "plank"),
        ex("core", "死虫 + 侧平板", "3", "每侧8-10次/30秒", "45秒", ["腰背贴地或保持直线。", "稳定比速度重要。"], "plank")
      ],
      finisher: ["今天不做高强度燃脂，保留恢复。"]
    };
  }

  if (day === 3 || day === 6) {
    return {
      ...base,
      focus: day === 3 ? "全身力量 B" : "燃脂 + 核心",
      exercises: [
        ex("split-squat", "哑铃分腿蹲", "每侧3", "8-10", "75秒", ["前脚踩稳，身体微前倾。", "膝盖跟脚尖同方向。"], "squat"),
        ex("glute-bridge", "哑铃臀桥", "4", "12-15", "60秒", ["骨盆微后倾，顶峰夹臀。", "不要用腰顶。"], "rdl"),
        ex("push-up", "俯卧撑或跪姿俯卧撑", "3", "8-12", "60秒", ["身体成一直线。", "如果肩不舒服，改地板卧推。"], "floor-press"),
        ex("row", "单臂哑铃划船", "每侧4", "10-12", "60秒", ["背部发力，手腕放松。", "避免耸肩。"], "row"),
        ex("plank", "侧平板 + 平板支撑", "3", "每侧30秒", "45秒", ["身体侧面成一直线。", "保持呼吸。"], "plank")
      ],
      finisher: [
        "哑铃摆动或徒手深蹲30秒",
        "登山跑30秒",
        "休息60秒，循环3-4轮"
      ]
    };
  }

  return base;
}

function ex(id, name, sets, reps, rest, cues, videoId) {
  return { id, name, sets, reps, rest, cues, videoId };
}

function buildShopping(hasCarb, hasVeg, hasDairy) {
  const groups = [];
  if (!hasCarb) {
    groups.push({
      category: "主食",
      items: ["燕麦", "米饭/糙米", "红薯", "土豆", "全麦面包"],
      reason: "训练前后需要碳水支持力量表现和恢复。"
    });
  }
  if (!hasVeg) {
    groups.push({
      category: "蔬菜",
      items: ["西兰花", "菠菜", "生菜", "番茄", "黄瓜"],
      reason: "补纤维、钾和饱腹感，帮助控制热量。"
    });
  }
  groups.push({
    category: "水果",
    items: ["香蕉", "苹果", "橙子", "蓝莓"],
    reason: "香蕉适合训练前，苹果和橙子适合日常加餐。"
  });
  if (!hasDairy) {
    groups.push({
      category: "蛋白",
      items: ["无糖酸奶", "低脂牛奶", "鸡胸肉", "鱼肉", "豆腐"],
      reason: "避免只靠牛排和虾仁，方便长期坚持。"
    });
  }
  groups.push({
    category: "调味",
    items: ["黑胡椒", "低钠酱油", "蒜", "辣椒粉", "醋"],
    reason: "减少高糖高油酱料，让减脂更稳。"
  });
  return groups;
}

function normalizePlan(plan, fallbackSource) {
  const local = buildFallbackSkeleton();
  const normalized = {
    ...local,
    ...plan,
    source: plan.source || fallbackSource || local.source,
    targets: { ...local.targets, ...(plan.targets || {}) },
    training: { ...local.training, ...(plan.training || {}) },
    meals: Array.isArray(plan.meals) && plan.meals.length ? plan.meals : local.meals,
    shopping: Array.isArray(plan.shopping) && plan.shopping.length ? plan.shopping : local.shopping,
    notes: Array.isArray(plan.notes) ? plan.notes : local.notes
  };
  normalized.training.exercises = Array.isArray(normalized.training.exercises)
    ? normalized.training.exercises.map((item, index) => ({
      id: item.id || `exercise-${index}`,
      name: item.name || "训练动作",
      sets: item.sets || "3",
      reps: item.reps || "10-12",
      rest: item.rest || "60秒",
      cues: Array.isArray(item.cues) ? item.cues : ["保持动作稳定。"],
      videoId: VIDEO_LIBRARY.some((video) => video.id === item.videoId) ? item.videoId : "full-body"
    }))
    : local.training.exercises;
  return normalized;
}

function buildFallbackSkeleton() {
  const metrics = calculateMetrics(profile);
  return {
    title: "今日训练与饮食",
    summary: "根据当前资料生成的长期可执行计划。",
    source: "本地计划",
    targets: {
      protein: `${metrics.proteinLow}-${metrics.proteinHigh}g`,
      water: "2-3L",
      steps: "6000-9000步",
      calories: "轻微热量缺口"
    },
    training: {
      focus: "全身力量",
      duration: `${profile.time}分钟`,
      intensity: "RPE 7",
      warmup: ["动态热身8分钟"],
      exercises: [],
      finisher: ["状态好时做8分钟燃脂收尾"],
      cooldown: ["拉伸5分钟"]
    },
    meals: [],
    shopping: [],
    notes: []
  };
}

function saveCurrentPlan() {
  const date = getDateKey();
  const item = {
    id: `${date}-${Date.now()}`,
    date,
    profile: { ...profile },
    foods: [...foods],
    plan: currentPlan
  };
  history = history.filter((entry) => entry.date !== date);
  history.push(item);
  saveJSON(STORAGE.history, history);
  renderHistory();
  toast("今日计划已保存到历史。");
}

function completeAll() {
  const dateKey = getDateKey();
  completions[dateKey] = completions[dateKey] || {};
  els.checklist.querySelectorAll("input[type='checkbox']").forEach((box) => {
    box.checked = true;
    completions[dateKey][box.dataset.checkId] = true;
  });
  saveJSON(STORAGE.completion, completions);
  renderChecklist(currentPlan);
  toast("今日训练和饮食打卡已全部完成。");
}

function clearTodayCompletions() {
  delete completions[getDateKey()];
  saveJSON(STORAGE.completion, completions);
}

function exportCurrentPlan() {
  const payload = JSON.stringify({
    exportedAt: new Date().toISOString(),
    profile,
    foods,
    plan: currentPlan,
    completion: completions[getDateKey()] || {}
  }, null, 2);
  const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fitness-plan-${getDateKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("计划 JSON 已导出。");
}

function clearHistory() {
  if (!history.length) {
    toast("历史本来就是空的。");
    return;
  }
  if (!confirm("确定清空所有历史计划吗？")) return;
  history = [];
  saveJSON(STORAGE.history, history);
  renderHistory();
  toast("历史计划已清空。");
}

function addFood(raw) {
  const food = raw.trim().replace(/[，,。.;；]/g, "");
  if (!food) return;
  if (!foods.includes(food)) foods.push(food);
  saveJSON(STORAGE.foods, foods);
  $("#foodInput").value = "";
  currentPlan = buildLocalPlan();
  renderAll();
  toast(`已添加食材：${food}`);
}

function hasFood(words) {
  return foods.some((food) => words.some((word) => food.includes(word)));
}

function calculateMetrics(currentProfile) {
  const weightKg = currentProfile.weightJin / 2;
  const bmi = weightKg / ((currentProfile.height / 100) ** 2);
  const proteinLow = Math.round(weightKg * 1.6);
  const proteinHigh = Math.round(weightKg * 2);
  return { weightKg, bmi, proteinLow, proteinHigh };
}

function goalLabel(goal) {
  if (goal === "fat-loss") return "优先减脂";
  if (goal === "muscle") return "优先增肌";
  return "减脂增肌";
}

function setLoading(isLoading) {
  $("#aiPlanBtn").disabled = isLoading;
  $("#aiPlanBtn").textContent = isLoading ? "AI生成中..." : "AI 生成";
  $("#localPlanBtn").disabled = isLoading;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.remove("is-visible"), 3600);
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function clamp(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
