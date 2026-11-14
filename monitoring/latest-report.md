# 官方来源检查报告

检查时间（UTC）：2026-11-14T08:58:36.303Z

**这不是政策核查结论。页面变化可能来自导航、日期或改版；页面未变化也不保证模型政策正确。**

本次不修改网站中的模型、免费额度、状态或 checkedAt。首次运行只建立网页指纹，不能回溯过去的变化。动态网页可能无法完整读取，失败时保留旧指纹，不将失败当成政策未变化。

## 检查失败，无法判断
- 来源：https://ai.google.dev/gemini-api/docs/pricing
- 关联资料：gemini-flash、gemini-lite、argon
- 原因：TOO_LITTLE_TEXT

## 页面文本未变化
- 来源：https://console.groq.com/docs/rate-limits
- 关联资料：groq-120、groq-qwen

## 页面文本有变化，待核实
- 来源：https://developers.cloudflare.com/workers-ai/platform/pricing/
- 关联资料：cloudflare

## 页面文本有变化，待核实
- 来源：https://help.aliyun.com/zh/model-studio/new-free-quota
- 关联资料：bailian

## 页面文本有变化，待核实
- 来源：https://openrouter.ai/docs/api_reference/limits
- 关联资料：openrouter

## 页面文本有变化，待核实
- 来源：https://docs.mistral.ai/inference/model-lifecycle
- 关联资料：mistral

## 页面文本有变化，待核实
- 来源：https://developers.openai.com/api/docs/pricing
- 关联资料：openai

## 页面文本有变化，待核实
- 来源：https://platform.claude.com/docs/en/about-claude/pricing
- 关联资料：claude

## 页面文本有变化，待核实
- 来源：https://platform.kimi.com/docs/pricing/chat
- 关联资料：kimi

## 页面文本有变化，待核实
- 来源：https://huggingface.co/docs/inference-providers/pricing
- 关联资料：hf

## 审核时做什么

1. 优先打开“页面文本有变化”的官方链接，检查模型名称、额度、期限和地区等条款。
2. 需要改政策时，另行修改 dist/models-data.js，填写证据，重新核查后才更新那条 checkedAt。
3. 合并这份报告只表示接受新的网页对照指纹；不会自动更新模型政策。失败项在访问恢复前仍不能判断。
4. 无变化时不产生新的审核申请；相同失败在首次提醒后保留在每次运行摘要中。
