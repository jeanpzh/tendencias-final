"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Loader2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  isLoading,
  placeholder = "Escribe un mensaje...",
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm p-4 shrink-0">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none rounded-xl border bg-muted/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring max-h-[160px] placeholder:text-muted-foreground"
        />
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() && !isLoading}
          size="icon"
          className="h-11 w-11 shrink-0 rounded-xl"
        >
          {isLoading ? (
            <Square className="h-4 w-4" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground/50 text-center mt-2 hidden sm:block">
        Enter para enviar · Shift+Enter para nueva línea
      </p>
    </div>
  );
}
