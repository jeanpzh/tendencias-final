import { tool } from "ai";
import { z } from "zod";

const chartDataSchema = z.object({
  type: z.enum(["bar", "line", "pie", "area"]),
  title: z.string(),
  data: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    })
  ),
});

const tableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["text", "number", "badge", "date"]),
});

const tableRowSchema = z.record(z.string(), z.any());

const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "password", "number", "select", "textarea", "checkbox", "radio", "slider", "date"]),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
});

const dashboardKPISchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.string().optional(),
  trend: z.enum(["up", "down", "neutral"]).optional(),
});

const dashboardChartSchema = z.object({
  type: z.enum(["bar", "line", "pie", "area"]),
  title: z.string(),
  data: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    })
  ),
});

const dashboardTableSchema = z.object({
  title: z.string(),
  columns: z.array(tableColumnSchema),
  rows: z.array(tableRowSchema),
  searchable: z.boolean().optional(),
  sortable: z.boolean().optional(),
});

const kanbanColumnSchema = z.object({
  id: z.string(),
  title: z.string(),
  cards: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    })
  ),
});

const configItemSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["toggle", "select", "slider", "input", "color"]),
  value: z.any().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const tools = {
  render_chart: tool({
    description:
      "Renderiza un gráfico interactivo (bar, line, pie, area) con los datos proporcionados. Usa esta tool cuando el usuario pida visualizar datos, gráficas, charts, o estadísticas.",
    inputSchema: chartDataSchema,
    execute: async (args: z.infer<typeof chartDataSchema>) => args,
  }),

  render_table: tool({
    description:
      "Renderiza una tabla de datos con columnas configurables y posibilidad de filtros. Usa esta tool cuando necesites mostrar datos tabulares, listas de elementos con múltiples propiedades.",
    inputSchema: z.object({
      title: z.string(),
      columns: z.array(tableColumnSchema),
      rows: z.array(tableRowSchema),
      searchable: z.boolean().optional(),
      sortable: z.boolean().optional(),
    }),
    execute: async (args: any) => args,
  }),

  render_form: tool({
    description:
      "Renderiza un formulario interactivo con los campos especificados. Usa esta tool cuando el usuario pida crear un formulario, encuesta, registro, o necesita recolectar datos estructurados.",
    inputSchema: z.object({
      title: z.string(),
      description: z.string().optional(),
      fields: z.array(formFieldSchema),
      submitLabel: z.string().optional(),
    }),
    execute: async (args: any) => args,
  }),

  render_dashboard: tool({
    description:
      "Renderiza un mini-dashboard con KPIs, charts y tablas. Usa esta tool cuando el usuario pida un resumen, overview, dashboard, métricas, o visualización de datos. Puedes incluir múltiples charts y tablas en un solo dashboard.",
    inputSchema: z.object({
      title: z.string(),
      kpis: z.array(dashboardKPISchema).optional(),
      charts: z.array(dashboardChartSchema).optional(),
      tables: z.array(dashboardTableSchema).optional(),
    }),
    execute: async (args: any) => args,
  }),

  render_kanban: tool({
    description:
      "Renderiza un tablero kanban con columnas y tarjetas de tareas. Usa esta tool cuando el usuario pida gestionar tareas, organizar trabajo, crear un tablero de proyecto, o gestionar un flujo de trabajo.",
    inputSchema: z.object({
      title: z.string(),
      columns: z.array(kanbanColumnSchema),
    }),
    execute: async (args: any) => args,
  }),

  render_config: tool({
    description:
      "Renderiza un panel de configuración con controles interactivos (toggles, selects, sliders). Usa esta tool cuando el usuario pida configurar ajustes, preferencias, o opciones de un sistema.",
    inputSchema: z.object({
      title: z.string(),
      description: z.string().optional(),
      items: z.array(configItemSchema),
    }),
    execute: async (args: any) => args,
  }),

  render_code: tool({
    description:
      "Renderiza un bloque de código con syntax highlighting y copy to clipboard. Usa esta tool cuando el usuario pida código, snippets, ejemplos de programación.",
    inputSchema: z.object({
      language: z.string(),
      filename: z.string().optional(),
      code: z.string(),
    }),
    execute: async (args: any) => args,
  }),

  render_selector: tool({
    description:
      "Renderiza un selector visual de opciones con cards clickeables. Usa esta tool cuando el usuario necesite elegir entre varias opciones de forma visual, como categorías, planes, estilos.",
    inputSchema: z.object({
      title: z.string(),
      description: z.string().optional(),
      options: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          description: z.string().optional(),
          icon: z.string().optional(),
          selected: z.boolean().optional(),
        })
      ),
      multiSelect: z.boolean().optional(),
    }),
    execute: async (args: any) => args,
  }),

  render_slider: tool({
    description:
      "Renderiza un slider interactivo para seleccionar valores en un rango. Usa esta tool cuando el usuario necesite ajustar un valor numérico o porcentaje de forma visual.",
    inputSchema: z.object({
      label: z.string(),
      min: z.number(),
      max: z.number(),
      step: z.number().optional(),
      defaultValue: z.number().optional(),
      unit: z.string().optional(),
    }),
    execute: async (args: any) => args,
  }),
};

export type ToolName = keyof typeof tools;
