"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Message } from "./message";
import { ChatInput } from "./chat-input";
import { DEMOS, type DemoId } from "@/lib/constants";

interface ChatPanelProps {
  demoId: string;
  systemPrompt: string;
}

export function ChatPanel({ demoId, systemPrompt }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chatId] = useState(() => `${demoId}-${Date.now()}`);

  const demo = DEMOS.find((d) => d.id === demoId as DemoId);
  const suggestions = demo?.suggestions ?? [];

  const { messages, sendMessage, status } = useChat({
    id: chatId,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message: string) => {
    await sendMessage(
      { text: message },
      { body: { systemPrompt, chatId } }
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden" ref={scrollRef}>
        <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 min-h-full">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                ¡Hola! Soy ToolVox
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Escribe lo que necesites y generaré componentes interactivos
                en tiempo real. Prueba una de estas sugerencias:
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="rounded-full border bg-muted/50 px-3 py-1.5 text-xs hover:bg-muted transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
      <ChatInput onSubmit={handleSend} isLoading={isLoading} />
    </div>
  );
}
