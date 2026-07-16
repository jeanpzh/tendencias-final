"use client";

import { useState, useCallback } from "react";
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

export function KanbanBlock({ title, columns: initialColumns }: KanbanBlockProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; fromColumnId: string } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const priorityVariant = (priority?: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
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

  const handleDragStart = useCallback((card: KanbanCard, fromColumnId: string) => {
    setDraggedCard({ card, fromColumnId });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedCard) return;
    if (draggedCard.fromColumnId === toColumnId) {
      setDraggedCard(null);
      return;
    }

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({ ...col, cards: [...col.cards] }));

      const fromCol = newColumns.find((c) => c.id === draggedCard.fromColumnId);
      const toCol = newColumns.find((c) => c.id === toColumnId);

      if (!fromCol || !toCol) return prev;

      const cardIndex = fromCol.cards.findIndex((c) => c.id === draggedCard.card.id);
      if (cardIndex === -1) return prev;

      const [movedCard] = fromCol.cards.splice(cardIndex, 1);
      toCol.cards.push(movedCard);

      return newColumns;
    });

    setDraggedCard(null);
  }, [draggedCard]);

  const handleDragEnd = useCallback(() => {
    setDraggedCard(null);
    setDragOverColumn(null);
  }, []);

  return (
    <Card className="my-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {columns.map((col) => (
            <div
              key={col.id}
              className={`flex-shrink-0 w-64 rounded-lg border-2 bg-muted/30 p-3 transition-colors ${
                columnColors[col.id] ?? columnColors[col.title.toLowerCase()] ?? "border-t-primary"
              } ${dragOverColumn === col.id ? "bg-primary/5 border-primary/30" : ""}`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.title}
                </h4>
                <Badge variant="secondary" className="h-5 text-[10px] px-1.5">
                  {col.cards.length}
                </Badge>
              </div>
              <div className="space-y-2 min-h-[40px]">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(card, col.id)}
                    onDragEnd={handleDragEnd}
                    className={`rounded-md bg-card p-3 shadow-sm border cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
                      draggedCard?.card.id === card.id ? "opacity-50 scale-95" : ""
                    }`}
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
