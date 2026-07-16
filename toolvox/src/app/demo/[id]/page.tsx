"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { DEMOS } from "@/lib/constants";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ModelSelector } from "@/components/model-selector";
import { ApiUsage } from "@/components/api-usage";
import { ThemeToggle } from "@/components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const demo = DEMOS.find((d) => d.id === id);

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Demo no encontrada</h1>
          <Link href="/" className="text-sm text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="h-dvh flex flex-col bg-background">
        <header className="h-12 sm:h-14 border-b shrink-0 bg-card/80 backdrop-blur-md flex items-center px-3 sm:px-4 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Link
              href="/"
              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${demo.color} flex items-center justify-center shadow-sm shrink-0`}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="font-semibold text-sm leading-tight truncate">{demo.title}</h1>
                <p className="text-[11px] text-muted-foreground leading-tight truncate">
                  {demo.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ApiUsage />
            <ThemeToggle />
            <ModelSelector value="tencent/hy3:free" onValueChange={() => {}} />
          </div>
        </header>

        <div className="flex-1 min-h-0">
          <ChatPanel demoId={demo.id} systemPrompt={demo.prompt} />
        </div>
      </div>
    </TooltipProvider>
  );
}
