"use client";

import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolRenderer } from "@/components/tools/tool-renderer";

interface MessageProps {
  message: any;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  const textParts = message.parts?.filter((p: any) => p.type === "text") || [];
  const textContent = textParts.map((p: any) => p.text).join("");

  // AI SDK v7: tool parts have type "tool-{toolName}" with input/output
  const toolParts = message.parts?.filter(
    (p: any) => p.type?.startsWith("tool-") && p.type !== "text"
  ) || [];

  // Skip empty messages
  if (!textContent && toolParts.length === 0) return null;

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-in-from-bottom",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background",
          isUser
            ? "bg-primary text-primary-foreground ring-primary/20"
            : "bg-muted text-muted-foreground ring-info/20"
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
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              isUser
                ? "bg-primary text-primary-foreground rounded-tr-sm"
                : "bg-card border border-border rounded-tl-sm"
            )}
          >
            <p className="whitespace-pre-wrap">{textContent}</p>
          </div>
        )}

        {toolParts.map((part: any, i: number) => {
          const toolName = part.toolName || part.type?.replace("tool-", "") || "";
          const args = part.input || part.args || {};
          const state = part.state === "result" || part.state === "output-available"
            ? "result"
            : part.state === "error"
            ? "error"
            : "call";
          const result = part.output || part.result;

          return (
            <div key={i} className="w-full">
              <ToolRenderer
                toolInvocation={{
                  toolName,
                  args,
                  state: state as "call" | "result" | "error",
                  result,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
