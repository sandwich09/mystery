import {
  buildContextualTip,
  createStaticReading,
  getStaticCardText,
  isStaticReadingReady,
  staticCategoryKeys,
  staticCategoryNames
} from "../../lib/static-reading";

export const runtime = "nodejs";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";

const categoryNames = staticCategoryNames;
const fallbackCategoryKeys = staticCategoryKeys;
const languageSettings = {
  th: {
    outputLanguage: "Thai",
    opening: "Start the first paragraph in Thai as the exact English card name followed by ' คือเรื่องราวของ ...'. Do not wrap the card name in angle brackets or add a leading article.",
    scriptRule: "All user-facing JSON values must be Thai, except the exact English tarot card name and the seeker name if it uses another script. Do not write Chinese."
  },
  en: {
    outputLanguage: "English",
    opening: "Start the first paragraph as the exact English card name followed by ' is a story of ...'. Do not wrap the card name in angle brackets or add a leading article.",
    scriptRule: "All user-facing JSON values must be English, except the seeker name if it uses another script. Do not write Thai or Chinese."
  },
  zh: {
    outputLanguage: "Simplified Chinese",
    opening: "Start the first paragraph in Simplified Chinese as the exact English card name followed by '是关于……的故事。'. Do not wrap the card name in angle brackets or add a leading article.",
    scriptRule: "All user-facing JSON values must be Simplified Chinese, except the exact English tarot card name and the seeker name if it uses another script. Do not write Thai."
  }
};

function getProviderConfig() {
  return [
    {
      name: "gemini",
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
      call: callGemini
    },
    {
      name: "groq",
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
      call: callGroq
    }
  ].filter((provider) => provider.apiKey);
}

function buildPrompt({ card, seeker, sequence, language }) {
  const languageConfig = languageSettings[language] || languageSettings.th;
  const cardText = getStaticCardText(card, language);

  const categoryList = fallbackCategoryKeys
    .map((key) => `${key}: ${categoryNames[key]?.[language] || key}`)
    .join(", ");

  return [
    "You are a warm, mysterious tarot reading narrator for a single-page web app.",
    `Write in ${languageConfig.outputLanguage}.`,
    languageConfig.scriptRule,
    "Return only strict JSON. No markdown, no code fence, no extra text.",
    "Keep the tone gentle, symbolic, grounded, and non-alarming.",
    "The story field must be more than 400 visible characters, ideally 430-550 characters, split into 2-3 short paragraphs.",
    "Before returning JSON, count the story characters. If it is under 400 characters, expand it before you answer.",
    languageConfig.opening,
    "Only after the opening meaning paragraph, connect that meaning to the seeker and draw sequence.",
    "Do not start the story with the seeker entering, being called, opening a door, or drawing a card.",
    "For Thai output, use natural Thai spacing: no spaces inside normal Thai words, and only use spaces between clauses where they improve readability.",
    "If the seeker name uses another language or script, preserve the name exactly but keep the reading itself in the required output language.",
    "Use paragraph breaks inside the JSON string by escaping line breaks as \\n\\n.",
    "Add a tip field: one short encouraging sentence based on the same card and reading context.",
    "Keep tip gentle and brief: Thai under 90 characters, English under 18 words, Chinese under 28 characters.",
    "Do not make definitive medical, legal, investment, death, pregnancy, or disaster predictions.",
    "Do not mention that you are an AI.",
    "When naming the tarot card, always use the English card name exactly as provided.",
    "",
    "Input:",
    `Seeker name: ${seeker}`,
    `Draw sequence: ${sequence === 1 ? "main reading" : "near future, 7-14 days"}`,
    `English card name: ${card?.english || ""}`,
    `Localized card essence: ${cardText.essence || ""}`,
    `Localized card story seed: ${cardText.story || ""}`,
    "",
    "Required JSON shape:",
    "{",
    '  "story": "an atmospheric tarot narrative of more than 400 characters with paragraph breaks",',
    '  "tip": "one short encouraging sentence from this reading context",',
    '  "forecasts": [',
    '    { "key": "work", "text": "1-2 sentences" }',
    "  ]",
    "}",
    "",
    `Forecast keys and labels: ${categoryList}`,
    "Include exactly one forecast item for each key: work, money, luck, love, health, current."
  ].join("\n");
}

function countMatches(text, pattern) {
  return String(text || "").match(pattern)?.length || 0;
}

function getScriptCounts(text) {
  return {
    thai: countMatches(text, /[\u0E00-\u0E7F]/g),
    cjk: countMatches(text, /[\u3400-\u4DBF\u4E00-\u9FFF]/g),
    latin: countMatches(text, /[A-Za-z]/g)
  };
}

function isReadingLanguageAligned(reading, language) {
  const text = [
    reading.story,
    reading.tip,
    ...(Array.isArray(reading.forecasts) ? reading.forecasts.map((item) => item.text) : [])
  ].join(" ");
  const counts = getScriptCounts(text);

  if (language === "th") {
    return counts.thai >= 80 && counts.cjk < 20;
  }

  if (language === "zh") {
    return counts.cjk >= 100 && counts.thai < 20;
  }

  return counts.latin >= 120 && counts.thai < 20 && counts.cjk < 20;
}

function parseJsonText(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) {
    throw new Error("Empty model response");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Model response did not contain JSON");
    return JSON.parse(match[0]);
  }
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanModelText(text, card) {
  let cleaned = String(text || "").trim().replace(/^\s*<+\s*/, "");
  const cardName = String(card?.english || "").trim();

  if (!cardName) return cleaned;

  const escapedCardName = escapeRegExp(cardName);
  const articlePrefix = /^the\s/i.test(cardName) ? "" : "(?:The\\s+)?";
  const leadingCardPattern = new RegExp(`^${articlePrefix}${escapedCardName}\\s*>?`, "i");

  return cleaned.replace(leadingCardPattern, cardName);
}

function normalizeReading(data, language, card) {
  if (!data || typeof data.story !== "string" || !Array.isArray(data.forecasts)) {
    throw new Error("Model JSON did not match the reading schema");
  }

  const story = cleanModelText(data.story, card);
  const forecastMap = new Map(
    data.forecasts
      .filter((item) => item && typeof item.key === "string" && typeof item.text === "string")
      .map((item) => [item.key, cleanModelText(item.text, card)])
  );

  const forecasts = fallbackCategoryKeys.map((key) => ({
    key,
    label: categoryNames[key]?.[language] || key,
    text: forecastMap.get(key) || ""
  }));

  const reading = {
    story,
    tip: buildContextualTip({ card, language, story, forecasts, tip: cleanModelText(data.tip, card) }),
    forecasts
  };

  if (!isReadingLanguageAligned(reading, language)) {
    throw new Error(`Model response language did not match ${language}`);
  }

  return reading;
}

async function callGemini(provider, prompt) {
  const url = `${GEMINI_ENDPOINT}/${encodeURIComponent(provider.model)}:generateContent?key=${encodeURIComponent(provider.apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 1200,
        responseMimeType: "application/json"
      }
    })
  });

  const body = await response.text();
  if (!response.ok) {
    const error = new Error(`Gemini returned HTTP ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  const payload = JSON.parse(body);
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
}

async function callGroq(provider, prompt) {
  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.85,
      max_tokens: 1200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You write atmospheric tarot readings and return only valid JSON."
        },
        { role: "user", content: prompt }
      ]
    })
  });

  const body = await response.text();
  if (!response.ok) {
    const error = new Error(`Groq returned HTTP ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  const payload = JSON.parse(body);
  return payload.choices?.[0]?.message?.content || "";
}

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body" }, { status: 400 });
  }

  const language = ["th", "en", "zh"].includes(input.language) ? input.language : "th";
  const prompt = buildPrompt({ ...input, language });
  const providers = getProviderConfig();

  if (!providers.length) {
    if (isStaticReadingReady(language)) {
      return Response.json({
        ...createStaticReading({ ...input, language }),
        fallbackReason: "no-ai-provider-configured"
      });
    }

    return Response.json({ error: "No AI provider configured and static fallback is not ready for this language." }, { status: 503 });
  }

  const attempts = [];

  for (const provider of providers) {
    try {
      const rawText = await provider.call(provider, prompt);
      const reading = normalizeReading(parseJsonText(rawText), language, input.card);
      return Response.json({
        provider: provider.name,
        model: provider.model,
        ...reading
      });
    } catch (error) {
      attempts.push({
        provider: provider.name,
        status: error.status || null,
        message: error.message
      });
    }
  }

  if (isStaticReadingReady(language)) {
    return Response.json({
      ...createStaticReading({ ...input, language }),
      fallbackReason: "all-ai-providers-failed",
      attempts
    });
  }

  return Response.json({ error: "All configured AI providers failed.", attempts }, { status: 503 });
}
