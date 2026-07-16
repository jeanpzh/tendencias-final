"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { Message } from "./message";
import { ChatInput } from "./chat-input";
import { DEMOS, type DemoId } from "@/lib/constants";
import {
  saveChat,
  saveMessage,
  getMessagesByChat,
  getChatsByDemo,
  deleteChat,
  type StoredChat,
  type StoredMessage,
} from "@/lib/storage";

interface ChatPanelProps {
  demoId: string;
  systemPrompt: string;
}

export function ChatPanel({ demoId, systemPrompt }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chatId] = useState(() => `${demoId}-${Date.now()}`);
  const [chatHistory, setChatHistory] = useState<StoredChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [loadedMessages, setLoadedMessages] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const demo = DEMOS.find((d) => d.id === (demoId as DemoId));
  const suggestions = demo?.suggestions ?? [];

  const { messages, sendMessage, status, setMessages } = useChat({
    id: activeChatId || chatId,
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Load chat history on mount
  useEffect(() => {
    async function load() {
      try {
        const history = await getChatsByDemo(demoId);
        setChatHistory(history.sort((a, b) => b.updatedAt - a.updatedAt));
      } catch {}
      setIsLoaded(true);
    }
    load();
  }, [demoId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Save messages to IndexedDB when they change
  const persistMessages = useCallback(
    async (chatIdParam: string, msgs: any[]) => {
      try {
        for (const msg of msgs) {
          await saveMessage({
            id: msg.id,
            chatId: chatIdParam,
            role: msg.role,
            content: typeof msg.content === "string" ? msg.content : "",
            parts: msg.parts,
            createdAt: Date.now(),
          });
        }
      } catch {}
    },
    []
  );

  const handleSend = async (message: string) => {
    const currentChatId = activeChatId || chatId;

    // Create chat record on first message
    if (!activeChatId) {
      const chat: StoredChat = {
        id: chatId,
        demoId,
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await saveChat(chat);
      setActiveChatId(chatId);
      setChatHistory((prev) => [chat, ...prev]);
    }

    await sendMessage(
      { text: message },
      { body: { systemPrompt, chatId: currentChatId } }
    );
  };

  // Persist assistant messages after they complete
  useEffect(() => {
    if (messages.length > 0 && activeChatId) {
      persistMessages(activeChatId, messages);
    }
  }, [messages, activeChatId, persistMessages]);

  const loadChat = async (chat: StoredChat) => {
    setActiveChatId(chat.id);
    try {
      const storedMessages = await getMessagesByChat(chat.id);
      const uiMessages = storedMessages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        parts: m.parts,
      }));
      setMessages(uiMessages as any);
    } catch {
      setMessages([]);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
  };

  const handleDeleteChat = async (chat: StoredChat) => {
    try {
      await deleteChat(chat.id);
      setChatHistory((prev) => prev.filter((c) => c.id !== chat.id));
      if (activeChatId === chat.id) {
        setActiveChatId(null);
        setMessages([]);
      }
    } catch {}
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat history sidebar */}
      {chatHistory.length > 0 && (
        <div className="border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={handleNewChat}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              + Nueva conversación
            </button>
            <div className="flex-1 overflow-x-auto flex gap-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center gap-1 rounded-full border px-3 py-1 text-xs cursor-pointer shrink-0 transition-colors ${
                    activeChatId === chat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => loadChat(chat)}
                >
                  <span className="truncate max-w-[120px]">{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[10px] hover:text-destructive transition-opacity ml-1"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages area */}
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
