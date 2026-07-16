"use client";

import { useState } from "react";
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

export function ConfigBlock({ title, description, items }: ConfigBlockProps) {
  const [config, setConfig] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    items.forEach((item) => {
      initial[item.name] = item.value ?? (item.type === "toggle" ? false : "");
    });
    return initial;
  });

  const handleChange = (name: string, value: any) => {
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="animate-fade-in-up my-3">
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
              className="flex items-center justify-between gap-4 py-2 border-b last:border-0"
            >
              <label className="text-xs font-medium">{item.label}</label>
              {item.type === "toggle" ? (
                <button
                  onClick={() => handleChange(item.name, !config[item.name])}
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
                  className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value)}
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
                    onChange={(e) => handleChange(item.name, Number(e.target.value))}
                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-xs font-mono w-8 text-right">
                    {config[item.name]}
                  </span>
                </div>
              ) : item.type === "color" ? (
                <input
                  type="color"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value)}
                  className="h-8 w-8 rounded-md border cursor-pointer"
                />
              ) : (
                <input
                  type="text"
                  value={config[item.name]}
                  onChange={(e) => handleChange(item.name, e.target.value)}
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
