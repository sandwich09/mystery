import { createStaticReading, isStaticReadingReady, staticCategoryKeys, staticCategoryNames } from "../../lib/static-reading";

export const runtime = "nodejs";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";

const categoryNames = staticCategoryNames;
const fallbackCategoryKeys = staticCategoryKeys;

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
  const outputLanguage = {
    th: "Thai",
    en: "English",
    zh: "Simplified Chinese"
  }[language] || "Thai";

  const categoryList = fallbackCategoryKeys
    .map((key) => `${key}: ${categoryNames[key]?.[language] || key}`)
    .join(", ");

  return [
    "You are a warm, mysterious tarot reading narrator for a single-page web app.",
    `Write in ${outputLanguage}.`,
    "Return only strict JSON. No markdown, no code fence, no extra text.",
    "Keep the tone gentle, symbolic, grounded, and non-alarming.",
    "The story must be at least 600 characters. It may be longer when the atmosphere needs more room.",
    "For Thai output, use natural Thai spacing: no spaces inside normal Thai words, and only use spaces between clauses where they improve readability.",
    "You may use multiple paragraphs inside the JSON string by escaping line breaks.",
    "Do not make definitive medical, legal, investment, death, pregnancy, or disaster predictions.",
    "Do not mention that you are an AI.",
    "When naming the tarot card, always use the English card name exactly as provided.",
    "",
    "Input:",
    `Seeker name: ${seeker}`,
    `Draw sequence: ${sequence === 1 ? "main reading" : "near future, 7-14 days"}`,
    `English card name: ${card?.english || ""}`,
    `Local card nickname: ${card?.thai || ""}`,
    `Card essence: ${card?.essence || ""}`,
    `Card story seed: ${card?.story || ""}`,
    "",
    "Required JSON shape:",
    "{",
    '  "story": "an atmospheric tarot narrative of at least 600 characters",',
    '  "forecasts": [',
    '    { "key": "work", "text": "1-2 sentences" }',
    "  ]",
    "}",
    "",
    `Forecast keys and labels: ${categoryList}`,
    "Include exactly one forecast item for each key: work, money, luck, love, health, current."
  ].join("\n");
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

function normalizeReading(data, language) {
  if (!data || typeof data.story !== "string" || !Array.isArray(data.forecasts)) {
    throw new Error("Model JSON did not match the reading schema");
  }

  const forecastMap = new Map(
    data.forecasts
      .filter((item) => item && typeof item.key === "string" && typeof item.text === "string")
      .map((item) => [item.key, item.text.trim()])
  );

  return {
    story: data.story.trim(),
    forecasts: fallbackCategoryKeys.map((key) => ({
      key,
      label: categoryNames[key]?.[language] || key,
      text: forecastMap.get(key) || ""
    }))
  };
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
        maxOutputTokens: 1600,
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
      max_tokens: 1600,
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
      const reading = normalizeReading(parseJsonText(rawText), language);
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
