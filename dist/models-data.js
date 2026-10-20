// Public catalog data only. Never store API keys here.
window.MODEL_ATLAS_DATA = {
  "schemaVersion": 1,
  "records": [
    {
      "key": "gemini-flash",
      "name": "Gemini 3.8 Flash",
      "provider": "Google",
      "id": "gemini-3.8-flash",
      "type": "free",
      "quota": "免费 API 档",
      "note": "适合试做多模态和通用工具；实际调用额度看项目。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "Standard 档输入 / 输出免费；定价页也列出免费上下文缓存。搜索 Grounding 不在免费 API 档；RPM、TPM、每日额度以 AI Studio 项目为准。",
      "expiry": "当前免费档；未确认永久有效。",
      "data": "免费档数据可用于改进产品。",
      "conditions": "地区、账号资格、绑卡要求及商用条款需在官方平台逐项确认。",
      "source": "https://ai.google.dev/gemini-api/docs/pricing",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "gemini-lite",
      "name": "Gemini 3.5 Flash-Lite",
      "provider": "Google",
      "id": "gemini-3.5-flash-lite",
      "type": "free",
      "quota": "免费 API 档",
      "note": "可尝试翻译、文本整理和轻量工具。",
      "uses": [
        "写作",
        "翻译",
        "编程"
      ],
      "limits": "Standard 档输入 / 输出免费；上下文缓存及搜索 Grounding 不在该免费 API 档。具体速率和每日限额看 AI Studio。",
      "expiry": "当前免费档；政策可能变化。",
      "data": "免费档数据可用于改进产品。",
      "conditions": "账号、地区和商用要求以官方条款为准，绑卡要求未单独确认。",
      "source": "https://ai.google.dev/gemini-api/docs/pricing",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "groq-120",
      "name": "GPT-OSS 120B",
      "provider": "Groq",
      "id": "openai/gpt-oss-120b",
      "type": "free",
      "quota": "1,000 次 / 日",
      "note": "这是 Groq 托管的开放模型，不是 OpenAI 旗舰 API 免费。",
      "uses": [
        "编程",
        "写作",
        "翻译"
      ],
      "limits": "官方免费档示例：30 RPM、1,000 RPD、8,000 TPM、200,000 TPD。任一阈值先到即限流；账号可能有例外。",
      "expiry": "当前免费计划，未确认永久。",
      "data": "数据保留、训练及商用条款本期未逐项核实。",
      "conditions": "需 Groq 账号与 API Key。地区和绑卡条件请核对官方平台。",
      "source": "https://console.groq.com/docs/rate-limits",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "groq-qwen",
      "name": "Qwen 3.8 27B",
      "provider": "Groq",
      "id": "qwen/qwen3.8-27b",
      "type": "free",
      "quota": "20 万 token / 日",
      "note": "先核对限流，再用于自己的小规模实验。",
      "uses": [
        "编程",
        "写作",
        "翻译"
      ],
      "limits": "官方免费档示例：30 RPM、1,000 RPD、8,000 TPM、200,000 TPD，均可能限制调用；以账号为准。",
      "expiry": "当前免费计划，未确认永久。",
      "data": "数据训练、保留和商用条件未逐项核实。",
      "conditions": "需要 Groq API Key；不代表 Qwen 官方 API 同样免费。地区和绑卡未确认。",
      "source": "https://console.groq.com/docs/rate-limits",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "cloudflare",
      "name": "Workers AI",
      "provider": "Cloudflare",
      "id": null,
      "type": "free",
      "quota": "10,000 Neurons / 日",
      "note": "平台计算额度，不是 10,000 token；部分模型仅付费可用。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "每日 10,000 Neurons，北京时间 08:00 重置。免费计划超限会报错；付费计划超额按 $0.011 / 1,000 Neurons 计费。不同模型消耗不同，不代表所有模型均免费或支持所有用途。",
      "expiry": "每日额度；政策可能变化。",
      "data": "具体模型许可证、训练与保留条款需另查。",
      "conditions": "官方列出的 Kimi K2.6 / K2.7 Code、GLM-5.2 / 5.3 / 5.3 Flash、DeepSeek V4 Flash 0731 / V4.1 Flash 1017 / V4 Pro 0813 需要 Workers Paid 或 AI Gateway 预付积分。其他账号、地区和绑卡条件未逐项确认。",
      "source": "https://developers.cloudflare.com/workers-ai/platform/pricing/",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "bailian",
      "name": "百炼 · Qwen 等模型",
      "provider": "阿里云",
      "id": null,
      "type": "trial",
      "quota": "通常每模型 100 万 token",
      "note": "新人试用，有效期 90 天；仅北京地域适用。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "每模型通常 100 万 Token，输入和输出共用。不同模型及快照额度独立；主账号与 RAM 子账号共享。仅抵扣实时推理，不抵扣 Batch、调优、部署或存储费用。",
      "expiry": "自开通 / 发布 / 申请通过较晚日期起 90 天。",
      "data": "各模型商用、训练和数据保留政策需另查。",
      "conditions": "仅华北2（北京）适用。通用 API Key 才能消耗此额度；Token Plan / Coding Plan 专属 Key 不适用。已认证用户耗尽后可能转付费，可开启“用完即停”。具体模型 ID、资格与余量需在控制台确认。",
      "source": "https://help.aliyun.com/zh/model-studio/new-free-quota",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "openrouter",
      "name": "免费模型目录",
      "provider": "OpenRouter",
      "id": "openrouter/free",
      "type": "free",
      "quota": "额度以账号为准",
      "note": "自动选择可用免费模型，供应能力与模型可能变化。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "官方限额表关键数值仍未完整读取，不沿用旧数字。可用 GET /api/v1/key 的 free_model_daily_requests 查看每日已用、上限和剩余次数；不能将此接口当作每分钟限额。模型能力随路由而变。",
      "expiry": "免费模型和供应能力可能调整或移除。",
      "data": "由具体模型及提供商决定，需查看各项数据政策。",
      "conditions": "需要 API Key。核对免费路由、模型可用性、账号余额及条件；绑卡、地区和商用未逐项确认。",
      "source": "https://openrouter.ai/docs/api_reference/limits",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "mistral",
      "name": "Labs 实验模型",
      "provider": "Mistral",
      "id": null,
      "type": "free",
      "quota": "实验阶段免费",
      "note": "只针对 labs- 前缀模型，不能推广到所有 Mistral API。",
      "uses": [
        "编程",
        "写作",
        "翻译"
      ],
      "limits": "实际可用名单、模型 ID 和调用限额需核对 Studio；不推荐用于生产。",
      "expiry": "实验模型可随时更新，非永久免费承诺。",
      "data": "Labs 模型不支持退出数据收集。",
      "conditions": "以实际模型能力、地区及条款为准。绑卡和商用条件未确认。",
      "source": "https://docs.mistral.ai/inference/model-lifecycle",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "argon",
      "name": "Gemini 4 Argon",
      "provider": "Google",
      "id": "gemini-4-argon",
      "type": "unknown",
      "quota": "不在免费 API 档",
      "note": "不要把 AI Studio 或网页体验当成免费 API。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "官方定价页注明不提供 Free Tier；付费额度另看项目。",
      "expiry": "不适用。",
      "data": "付费档按当前官方数据政策执行。",
      "conditions": "使用前核对价格、账号与地区资格。",
      "source": "https://ai.google.dev/gemini-api/docs/pricing",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "openai",
      "name": "OpenAI 生成模型 API",
      "provider": "OpenAI",
      "id": null,
      "type": "unknown",
      "quota": "未确认普遍持续免费额度",
      "note": "API 独立定价，聊天订阅不代表所有 API 调用免费。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "以具体模型官方定价和账号限额为准；本条为厂商入口。",
      "expiry": "赠金资格和期限未确认。",
      "data": "需核对所用产品的数据政策。",
      "conditions": "模型 ID、绑卡、地区与商用要求需逐项确认。",
      "source": "https://developers.openai.com/api/docs/pricing",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "claude",
      "name": "Claude API",
      "provider": "Anthropic",
      "id": null,
      "type": "unknown",
      "quota": "按量计费",
      "note": "未确认面向所有人的持续免费生成额度。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "查看具体模型价格和账号级速率限制。",
      "expiry": "赠金条件和有效期未确认。",
      "data": "具体数据条款需核对。",
      "conditions": "不要将网页免费档当作免费 API。具体模型 ID、地区、绑卡和商用要求另查。",
      "source": "https://platform.claude.com/docs/en/about-claude/pricing",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "kimi",
      "name": "Kimi API",
      "provider": "Moonshot / Kimi",
      "id": null,
      "type": "unknown",
      "quota": "API 独立计价",
      "note": "普遍赠金金额和有效期尚未确认。",
      "uses": [
        "编程",
        "写作",
        "翻译"
      ],
      "limits": "官方说明 API 按量计费，不提供订阅制方案；与 Kimi 会员、Kimi Code 区分。具体模型价格和账号限速需另查，未确认普遍免费额度。",
      "expiry": "未确认。",
      "data": "数据训练、保留和商用条款未逐项核实。",
      "conditions": "本条为厂商入口，具体模型 ID、地区及注册条件需确认。",
      "source": "https://platform.kimi.com/docs/pricing/chat",
      "checkedAt": "2026-10-21"
    },
    {
      "key": "hf",
      "name": "Inference Providers",
      "provider": "Hugging Face",
      "id": null,
      "type": "unknown",
      "quota": "免费账号无月度赠金",
      "note": "PRO 每月 2 美元属于付费订阅权益。",
      "uses": [
        "编程",
        "写作",
        "翻译",
        "图片理解"
      ],
      "limits": "当前页面显示 Free Users: None；不要照用搜索缓存中的旧 0.10 美元赠金。",
      "expiry": "付费权益与账号当前计划相关。",
      "data": "由模型、提供商及账户政策决定。",
      "conditions": "本条为平台目录，不代表每个模型均有相同能力；地区、绑卡与商用需核对。",
      "source": "https://huggingface.co/docs/inference-providers/pricing",
      "checkedAt": "2026-10-21"
    }
  ]
};
