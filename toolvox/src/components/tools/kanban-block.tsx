"use client";

import { GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBlockProps {
  title: string;
  columns: KanbanColumn[];
}

export function KanbanBlock({ title, columns }: KanbanBlockProps) {
  const priorityVariant = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const columnColors: Record<string, string> = {
    todo: "border-t-blue-500",
    pendiente: "border-t-blue-500",
    "in-progress": "border-t-amber-500",
    "en-progreso": "border-t-amber-500",
    done: "border-t-emerald-500",
    completado: "border-t-emerald-500",
  };

  return (
    <Card className="animate-fade-in-up my-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((col) => (
            <div
              key={col.id}
              className={`flex-shrink-0 w-64 rounded-lg border border-t-2 bg-muted/30 p-3 ${
                columnColors[col.id] ?? columnColors[col.title.toLowerCase()] ?? "border-t-primary"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.title}
                </h4>
                <Badge variant="secondary" className="h-5 text-[10px] px-1.5">
                  {col.cards.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-md bg-card p-3 shadow-sm border cursor-grab hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-relaxed">
                        {card.title}
                      </p>
                      <GripVertical className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </div>
                    {card.description && (
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                        {card.description}
                      </p>
                    )}
                    {card.priority && (
                      <Badge
                        variant={priorityVariant(card.priority) as any}
                        className="mt-2 h-4 text-[10px] px-1"
                      >
                        {card.priority}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
