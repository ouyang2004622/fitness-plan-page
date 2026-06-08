const DEEPSEEK_ENDPOINT = process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).send("Method Not Allowed");
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    response.status(500).json({
      error: "DEEPSEEK_API_KEY is not configured on the server."
    });
    return;
  }

  try {
    const { context, model } = request.body || {};
    if (!context) {
      response.status(400).json({ error: "Missing context." });
      return;
    }

    const deepseekResponse = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: [
              "你是一个严谨的私人健身和饮食计划助手。",
              "根据用户资料、器械、已有食材和最近历史，为今天生成可执行计划。",
              "动作安排必须适合家庭哑铃和瑜伽垫训练；饮食必须按时间段安排；采购清单要补齐缺失营养。",
              "视频必须从用户提供的 availableVideos 中选择 videoId，不要编造视频链接。",
              "不要给医学诊断。出现疼痛、眩晕或胸闷时提醒停止训练并咨询专业人士。",
              "只返回一个 JSON 对象，不要 Markdown，不要代码块。JSON 字段必须完整。"
            ].join("\n")
          },
          {
            role: "user",
            content: JSON.stringify({
              instruction: "生成今天的个性化健身和饮食计划，返回 JSON。",
              schema: expectedShape(),
              context
            })
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
        max_tokens: 3500
      })
    });

    if (!deepseekResponse.ok) {
      const detail = await deepseekResponse.text();
      response.status(deepseekResponse.status).send(detail);
      return;
    }

    const data = await deepseekResponse.json();
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) {
      response.status(502).json({ error: "DeepSeek response was empty." });
      return;
    }

    const plan = JSON.parse(stripCodeFence(raw));
    response.status(200).json({
      ...plan,
      source: plan.source || "DeepSeek计划"
    });
  } catch (error) {
    response.status(500).json({
      error: error.message || "Failed to generate plan with DeepSeek."
    });
  }
}

function stripCodeFence(value) {
  return String(value)
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function expectedShape() {
  return {
    title: "string",
    summary: "string",
    source: "DeepSeek计划",
    targets: {
      protein: "string",
      water: "string",
      steps: "string",
      calories: "string"
    },
    training: {
      focus: "string",
      duration: "string",
      intensity: "string",
      warmup: ["string"],
      exercises: [
        {
          id: "string",
          name: "string",
          sets: "string",
          reps: "string",
          rest: "string",
          cues: ["string"],
          videoId: "one of context.availableVideos[].id"
        }
      ],
      finisher: ["string"],
      cooldown: ["string"]
    },
    meals: [
      {
        time: "HH:mm",
        title: "string",
        foods: "string",
        prep: "string",
        protein: "string"
      }
    ],
    shopping: [
      {
        category: "string",
        items: ["string"],
        reason: "string"
      }
    ],
    notes: ["string"]
  };
}
