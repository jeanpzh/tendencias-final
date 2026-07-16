"use client";

import { Loader2 } from "lucide-react";
import { ChartBlock } from "./chart-block";
import { TableBlock } from "./table-block";
import { FormBlock } from "./form-block";
import { DashboardBlock } from "./dashboard-block";
import { KanbanBlock } from "./kanban-block";
import { ConfigBlock } from "./config-block";
import { CodeBlock } from "./code-block";
import { SelectorBlock } from "./selector-block";
import { SliderBlock } from "./slider-block";

interface ToolInvocation {
  toolName: string;
  args: Record<string, any>;
  state: "call" | "result" | "error";
  result?: any;
}

interface ToolRendererProps {
  toolInvocation: ToolInvocation;
}

const TOOL_LABELS: Record<string, string> = {
  render_chart: "gráfico",
  render_table: "tabla",
  render_form: "formulario",
  render_dashboard: "dashboard",
  render_kanban: "tablero kanban",
  render_config: "panel de config",
  render_code: "bloque de código",
  render_selector: "selector",
  render_slider: "slider",
};

export function ToolRenderer({ toolInvocation }: ToolRendererProps) {
  const { toolName, args, state } = toolInvocation;

  if (state === "call") {
    const label = TOOL_LABELS[toolName] || toolName;
    return (
      <div className="my-3 flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
        <span>
          Generando <span className="font-medium text-foreground">{label}</span>...
        </span>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="my-3 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-xs text-destructive">
        Error al generar el componente
      </div>
    );
  }

  const data = args;

  switch (toolName) {
    case "render_chart":
      return (
        <ChartBlock
          type={data.type}
          title={data.title}
          data={data.data}
        />
      );
    case "render_table":
      return (
        <TableBlock
          title={data.title}
          columns={data.columns}
          rows={data.rows}
          searchable={data.searchable}
          sortable={data.sortable}
        />
      );
    case "render_form":
      return (
        <FormBlock
          title={data.title}
          description={data.description}
          fields={data.fields}
          submitLabel={data.submitLabel}
        />
      );
    case "render_dashboard":
      return (
        <DashboardBlock
          title={data.title}
          kpis={data.kpis}
          charts={data.charts}
          tables={data.tables}
        />
      );
    case "render_kanban":
      return (
        <KanbanBlock
          title={data.title}
          columns={data.columns}
        />
      );
    case "render_config":
      return (
        <ConfigBlock
          title={data.title}
          description={data.description}
          items={data.items}
        />
      );
    case "render_code":
      return (
        <CodeBlock
          language={data.language}
          filename={data.filename}
          code={data.code}
        />
      );
    case "render_selector":
      return (
        <SelectorBlock
          title={data.title}
          description={data.description}
          options={data.options}
          multiSelect={data.multiSelect}
        />
      );
    case "render_slider":
      return (
        <SliderBlock
          label={data.label}
          min={data.min}
          max={data.max}
          step={data.step}
          defaultValue={data.defaultValue}
          unit={data.unit}
        />
      );
    default:
      return null;
  }
}
