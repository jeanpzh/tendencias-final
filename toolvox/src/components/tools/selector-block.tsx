"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SelectorOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  selected?: boolean;
}

interface SelectorBlockProps {
  title: string;
  description?: string;
  options: SelectorOption[];
  multiSelect?: boolean;
}

export function SelectorBlock({
  title,
  description,
  options,
  multiSelect = false,
}: SelectorBlockProps) {
  const [selected, setSelected] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    options.forEach((opt) => {
      if (opt.selected) initial.add(opt.id);
    });
    return initial;
  });

  const toggleOption = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiSelect) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Card className="animate-fade-in-up my-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all hover:shadow-md",
                selected.has(opt.id)
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {selected.has(opt.id) && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              {opt.icon && (
                <span className="text-2xl">{opt.icon}</span>
              )}
              <div>
                <p className="text-xs font-medium">{opt.label}</p>
                {opt.description && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {opt.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
