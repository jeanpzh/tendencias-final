"use client";

import * as React from "react";
import { Check, ChevronDown, Zap, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ModelInfo {
  id: string;
  name: string;
  free: boolean;
  contextLength: number;
  promptCost: number;
  completionCost: number;
}

const FALLBACK_MODELS: ModelInfo[] = [
  {
    id: "tencent/hy3:free",
    name: "Tencent Hy3",
    free: true,
    contextLength: 262144,
    promptCost: 0,
    completionCost: 0,
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Llama 3.3 70B",
    free: true,
    contextLength: 131072,
    promptCost: 0,
    completionCost: 0,
  },
  {
    id: "google/gemma-4-31b-it:free",
    name: "Gemma 4 31B",
    free: true,
    contextLength: 262144,
    promptCost: 0,
    completionCost: 0,
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen3 Coder",
    free: true,
    contextLength: 262144,
    promptCost: 0,
    completionCost: 0,
  },
];

function formatCost(cost: number): string {
  if (cost === 0) return "Gratis";
  if (cost < 0.01) return "<$0.01";
  return `$${cost.toFixed(2)}/1M`;
}

interface ModelSelectorProps {
  value: string;
  onValueChange: (modelId: string) => void;
  className?: string;
}

export function ModelSelector({ value, onValueChange, className }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [models] = React.useState<ModelInfo[]>(FALLBACK_MODELS);

  const selected = models.find((m) => m.id === value) || FALLBACK_MODELS[0];
  const freeModels = models.filter((m) => m.free);
  const paidModels = models.filter((m) => !m.free);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal justify-between min-w-[140px]",
            className
          )}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {selected?.free ? (
              <Zap className="h-3 w-3 text-success shrink-0" />
            ) : (
              <CreditCard className="h-3 w-3 text-warning shrink-0" />
            )}
            <span className="truncate">{selected?.name || "Modelo"}</span>
          </div>
          <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end" sideOffset={8}>
        <Command>
          <CommandInput placeholder="Buscar modelo..." className="h-9" />
          <CommandList className="max-h-[350px]">
            <CommandEmpty>No se encontró el modelo.</CommandEmpty>
            {freeModels.length > 0 && (
              <CommandGroup heading={`Gratuitos (${freeModels.length})`}>
                {freeModels.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={`${model.name} ${model.id}`}
                    onSelect={() => {
                      onValueChange(model.id);
                      setOpen(false);
                    }}
                    className="flex items-start gap-2 py-2"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        value === model.id ? "text-primary" : "text-transparent"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">{model.name}</span>
                        <Badge variant="success" className="text-[9px] px-1 py-0 h-4">
                          GRATIS
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 font-mono truncate">
                        {model.id}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {paidModels.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading={`De pago (${paidModels.length})`}>
                  {paidModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={`${model.name} ${model.id}`}
                      onSelect={() => {
                        onValueChange(model.id);
                        setOpen(false);
                      }}
                      className="flex items-start gap-2 py-2"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4 mt-0.5 shrink-0",
                          value === model.id ? "text-primary" : "text-transparent"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium">{model.name}</span>
                          <Badge variant="warning" className="text-[9px] px-1 py-0 h-4">
                            PAGO
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[11px] text-muted-foreground font-mono truncate">
                            {model.id}
                          </p>
                          <span className="text-[10px] text-muted-foreground/70 shrink-0">
                            {formatCost(model.promptCost)}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
