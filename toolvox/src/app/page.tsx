"use client";

import Link from "next/link";
import {
  FileInput,
  LayoutDashboard,
  Kanban,
  Settings2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DEMOS } from "@/lib/constants";

const iconMap = {
  FileInput,
  LayoutDashboard,
  Kanban,
  Settings2,
  Sparkles,
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ToolVox",
    url: "https://toolvox.vercel.app",
    description:
      "Componentes interactivos generados por IA dentro de un chat. Charts, tablas, formularios, dashboards, y más.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ToolVox</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Generative UI Demo
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium mb-6">
          <Sparkles className="h-3 w-3 text-violet-500" />
          Powered by AI + Generative UI
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Componentes interactivos
          <br />
          <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
            generados por conversación
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ToolVox demuestra cómo la IA puede generar interfaces ricas y
          interactivas dentro de un chat. No solo texto — charts, tablas,
          formularios, dashboards, y más.
        </p>
      </section>

      {/* Demo Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMOS.map((demo) => {
            const Icon = iconMap[demo.icon as keyof typeof iconMap];
            return (
              <Link key={demo.id} href={`/demo/${demo.id}`}>
                <div className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer h-full">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{demo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {demo.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary">
                    Probar demo
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-xs text-muted-foreground">
          ToolVox — Generative UI Demo con Next.js, Vercel AI SDK y OpenRouter
        </div>
      </footer>
    </div>
  );
}
