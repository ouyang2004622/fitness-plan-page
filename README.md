# 私人 AI 健身计划

一个长期使用的个人健身网页应用，支持：

- 保存身高、体重、目标、训练水平、器械和伤病限制
- 管理今日食材
- 本地规则生成每日训练和饮食计划
- 通过后端接口调用 DeepSeek API 生成个性化每日计划
- 打卡、保存历史、导出 JSON
- B 站动作视频入口，适合中国 IP 访问

## DeepSeek API Key 放哪里

前端不保存 Key，也不直接调用 DeepSeek。AI 生成只请求：

```text
/api/generate-plan
```

把 Key 放到后端部署平台的环境变量：

```text
DEEPSEEK_API_KEY=你的key
DEEPSEEK_MODEL=deepseek-v4-flash
```

可选：

```text
DEEPSEEK_API_BASE_URL=https://api.deepseek.com/chat/completions
```

如果你想用更强模型，可以把模型改成：

```text
DEEPSEEK_MODEL=deepseek-v4-pro
```

## 本地运行

静态功能可以直接打开 `index.html`。

如果要用本地服务器：

```bash
npm install
npm run start
```

本地调用 AI 时，需要用支持 serverless/API route 的环境运行 `api/generate-plan.js`，或者把前端设置里的后端接口改成你的真实接口地址。

## Vercel 部署

1. 导入这个仓库。
2. 在项目设置里添加 `DEEPSEEK_API_KEY`。
3. 可选添加 `DEEPSEEK_MODEL=deepseek-v4-flash`。
4. 部署后前端保持默认接口 `/api/generate-plan` 即可。

## GitHub Pages 注意

GitHub Pages 只能托管静态文件，不能运行 `api/generate-plan.js`。因此 GitHub Pages 版本可以使用本地规则计划，但 AI 生成需要部署到 Vercel、Cloudflare Pages Functions、Netlify Functions 或你自己的后端服务。
