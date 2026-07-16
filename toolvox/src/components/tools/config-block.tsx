"use client";

import { useState, useCallback } from "react";
import { Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ConfigItem {
  name: string;
  label: string;
  type: "toggle" | "select" | "slider" | "input" | "color";
  value?: any;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

interface ConfigBlockProps {
  title: string;
  description?: string;
  items: ConfigItem[];
}

function isDarkModeName(name: string, label: string): boolean {
  const n = name.toLowerCase();
  const l = label.toLowerCase();
  return (
    n.includes("dark") || n.includes("oscuro") || n.includes("theme") || n.includes("modo") ||
    l.includes("dark") || l.includes("oscuro") || l.includes("modo")
  );
}

function isLightValue(value: any): boolean {
  if (typeof value === "boolean") return !value;
  if (typeof value === "string") {
    const v = value.toLowerCase();
    return v === "light" || v === "claro" || v === "clar" || v === "day" || v === "diurno";
  }
  return false;
}

function isDarkValue(value: any): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.toLowerCase();
    return v === "dark" || v === "oscuro" || v === "night" || v === "nocturno";
  }
  return false;
}

function applyConfigChange(name: string, value: any, label: string) {
  const root = document.documentElement;

  if (isDarkModeName(name, label)) {
    if (isDarkValue(value)) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (isLightValue(value)) {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    return;
  }

  const n = name.toLowerCase();
  const l = label.toLowerCase();

  if (n.includes("font") && (n.includes("size") || n.includes("tamano") || l.includes("tamaño") || l.includes("fuente"))) {
    root.style.fontSize = `${value}px`;
  } else if (n.includes("font") || l.includes("tipografia") || l.includes("fuente")) {
    root.style.setProperty("--font-sans", value);
  } else if (n.includes("color") || n.includes("accent") || l.includes("acento")) {
    root.style.setProperty("--primary", value);
  } else if (n.includes("contrast") || l.includes("contraste")) {
    if (value) root.classList.add("high-contrast");
    else root.classList.remove("high-contrast");
  } else if (n.includes("motion") || n.includes("animation") || l.includes("movimiento")) {
    if (value) root.classList.add("reduce-motion");
    else root.classList.remove("reduce-motion");
  } else if (n.includes("radius") || n.includes("round") || l.includes("redondead")) {
    root.style.setProperty("--radius", value ? "0.625rem" : "0rem");
  }
}

export function ConfigBlock({ title, description, items }: ConfigBlockProps) {
  const [config, setConfig] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    items.forEach((item) => {
      initial[item.name] = item.value ?? (item.type === "toggle" ? false : "");
    });
    return initial;
  });

  const handleChange = useCallback((name: string, value: any, label: string) => {
    setConfig((prev) => ({ ...prev, [name]: value }));
    applyConfigChange(name, value, label);
  }, []);

  return (
    <Card className="my-3">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0"
            >
              <label className="text-xs font-medium">{item.label}</label>
              {item.type === "toggle" ? (
                <button
                  onClick={() => handleChange(item.name, !config[item.name], item.label)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    config[item.name] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                      config[item.name] ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              ) : item.type === "select" ? (
                <select
                  className="flex h-8 rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value, item.label)}
                >
                  {item.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : item.type === "slider" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={item.min ?? 0}
                    max={item.max ?? 100}
                    value={config[item.name]}
                    onChange={(e) => handleChange(item.name, Number(e.target.value), item.label)}
                    className="w-24 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-mono w-8 text-right text-muted-foreground">
                    {config[item.name]}
                  </span>
                </div>
              ) : item.type === "color" ? (
                <input
                  type="color"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value, item.label)}
                  className="h-8 w-8 rounded-md border border-border cursor-pointer bg-transparent"
                />
              ) : (
                <input
                  type="text"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value, item.label)}
                  className="flex h-8 w-40 rounded-md border border-input bg-transparent px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
