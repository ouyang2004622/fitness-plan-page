# 私人 AI 健身计划

一个长期使用的个人健身网页应用，支持：

- 保存身高、体重、目标、训练水平、器械和伤病限制
- 管理今日食材
- 本地规则生成每日训练和饮食计划
- 使用 OpenAI API 生成个性化每日计划
- 打卡、保存历史、导出 JSON
- B 站动作视频入口，适合中国 IP 访问

## API Key 放哪里

不要把 API Key 写进前端源码，也不要提交到 GitHub。

当前 GitHub Pages 版本支持“本机 Key 模式”：打开网页后在设置里填入 Key，Key 只保存在浏览器 `localStorage`。

更推荐长期使用“服务端代理模式”：部署到 Vercel、Cloudflare Workers/Pages Functions 等平台，把 Key 设置成环境变量：

```text
OPENAI_API_KEY=你的key
OPENAI_MODEL=gpt-5.2
```

前端代理地址保持：

```text
/api/generate-plan
```

这样网页不会暴露 Key。

## 本地运行

直接打开 `index.html` 就可以使用静态功能。

如果要用本地服务器：

```bash
npm install
npm run start
```

## Vercel 部署

1. 导入这个仓库。
2. 在项目设置里添加 `OPENAI_API_KEY`。
3. 可选添加 `OPENAI_MODEL=gpt-5.2`。
4. 部署后在网页设置里选择“服务端代理模式”。

## GitHub Pages 注意

GitHub Pages 只能托管静态文件，不能运行 `api/generate-plan.js`。因此在 GitHub Pages 上使用 AI 时，需要选择“本机 Key 模式”；如果要完全隐藏 Key，请使用 Vercel/Cloudflare 等带函数的部署平台。
