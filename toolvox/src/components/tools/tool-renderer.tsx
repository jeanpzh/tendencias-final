"use client";

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

export function ToolRenderer({ toolInvocation }: ToolRendererProps) {
  const { toolName, args, state } = toolInvocation;

  if (state === "call") {
    return (
      <div className="my-3 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot"
            style={{ animationDelay: "0.16s" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot"
            style={{ animationDelay: "0.32s" }}
          />
        </div>
        Generando componente...
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
