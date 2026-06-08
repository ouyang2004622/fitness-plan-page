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

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).send("Method Not Allowed");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
    return;
  }

  try {
    const { context } = request.body || {};
    if (!context) {
      response.status(400).json({ error: "Missing context." });
      return;
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.2",
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

    if (!aiResponse.ok) {
      const detail = await aiResponse.text();
      response.status(aiResponse.status).send(detail);
      return;
    }

    const data = await aiResponse.json();
    const text = extractResponseText(data);
    response.status(200).json(JSON.parse(text));
  } catch (error) {
    response.status(500).json({ error: error.message || "Failed to generate plan." });
  }
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
  return chunks.join("").trim();
}
