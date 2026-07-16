"use client";

import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolRenderer } from "@/components/tools/tool-renderer";

interface MessagePart {
  type: string;
  text?: string;
  toolInvocation?: {
    toolName: string;
    args: Record<string, any>;
    state: "call" | "result" | "error";
    result?: any;
  };
}

interface MessageProps {
  message: {
    id: string;
    role: "user" | "assistant" | "system";
    content?: string;
    parts?: MessagePart[];
    [key: string]: any;
  };
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  const textParts = message.parts?.filter((p) => p.type === "text") || [];
  const textContent = textParts.map((p: any) => p.text).join("");
  const toolParts = message.parts?.filter((p) => p.type === "tool-invocation") || [];

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[85%] min-w-0",
          isUser ? "items-end" : "items-start"
        )}
      >
        {textContent && (
          <div
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm leading-relaxed",
              isUser
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted rounded-bl-sm"
            )}
          >
            <p className="whitespace-pre-wrap">{textContent}</p>
          </div>
        )}

        {toolParts.map((part, i) =>
          part.toolInvocation ? (
            <ToolRenderer key={i} toolInvocation={part.toolInvocation} />
          ) : null
        )}
      </div>
    </div>
  );
}
