import { createOpenAI } from "@ai-sdk/openai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

export const hy3 = openrouter.chat("tencent/hy3:free");

export const DEFAULT_MODEL = hy3;
