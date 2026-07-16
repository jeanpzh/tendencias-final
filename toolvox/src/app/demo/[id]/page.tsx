"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { DEMOS } from "@/lib/constants";
import { ChatPanel } from "@/components/chat/chat-panel";

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
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b shrink-0">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${demo.color} flex items-center justify-center`}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sm">{demo.title}</h1>
                <p className="text-[11px] text-muted-foreground">
                  {demo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Panel */}
      <div className="flex-1 overflow-hidden">
        <ChatPanel demoId={demo.id} systemPrompt={demo.prompt} />
      </div>
    </div>
  );
}
