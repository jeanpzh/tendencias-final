import { streamText } from "ai";
import { DEFAULT_MODEL } from "@/lib/ai/models";
import { tools } from "@/lib/ai/tools";
import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";

export async function POST(req: Request) {
  const { messages: incomingMessages, systemPrompt, chatId } = await req.json();

  const result = streamText({
    model: DEFAULT_MODEL,
    system:
      systemPrompt ||
      "Eres un asistente inteligente que genera interfaces interactivas. Cuando el usuario pida algo que pueda representarse visualmente, usa las tools disponibles para renderizar componentes interactivos como charts, tablas, formularios, dashboards, kanban boards, configuraciones, o código. Responde siempre en español.",
    messages: incomingMessages,
    tools,
  });

  if (db && chatId) {
    try {
      const userMsg = incomingMessages[incomingMessages.length - 1];
      if (userMsg) {
        await db.insert(messages).values({
          chatId,
          role: userMsg.role,
          content: typeof userMsg.content === "string" ? userMsg.content : "",
        });
      }
    } catch {}
  }

  return result.toUIMessageStreamResponse();
}
