import { streamText } from "ai";
import { DEFAULT_MODEL } from "@/lib/ai/models";
import { tools } from "@/lib/ai/tools";

export async function POST(req: Request) {
  const { messages: incomingMessages, systemPrompt } = await req.json();

  const result = streamText({
    model: DEFAULT_MODEL,
    system:
      systemPrompt ||
      "Eres un asistente inteligente que genera interfaces interactivas. Cuando el usuario pida algo que pueda representarse visualmente, usa las tools disponibles para renderizar componentes interactivos como charts, tablas, formularios, dashboards, kanban boards, configuraciones, o código. Responde siempre en español.",
    messages: incomingMessages,
    tools,
  });

  return result.toUIMessageStreamResponse();
}
