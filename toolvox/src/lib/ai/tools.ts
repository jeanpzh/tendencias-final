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
  pattern: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
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
  // ── Action tools (perform real changes) ──────────────────────────
  set_theme: tool({
    description:
      "Cambia el tema de la interfaz entre modo oscuro y claro. Úsala cuando el usuario pida cambiar el tema, poner modo oscuro/claro, o cambiar la apariencia.",
    inputSchema: z.object({
      mode: z.enum(["dark", "light"]),
    }),
    execute: async (args) => ({
      action: "set_theme" as const,
      ...args,
    }),
  }),

  set_font_size: tool({
    description:
      "Cambia el tamaño de fuente de la interfaz. Úsala cuando el usuario pida cambiar el tamaño de texto, hacer la letra más grande/pequeña.",
    inputSchema: z.object({
      size: z.number().min(10).max(32),
    }),
    execute: async (args) => ({
      action: "set_font_size" as const,
      ...args,
    }),
  }),

  set_font: tool({
    description:
      "Cambia la tipografía/fuente de la interfaz. Úsala cuando el usuario pida cambiar la fuente, tipografía, o estilo de letra.",
    inputSchema: z.object({
      family: z.string(),
    }),
    execute: async (args) => ({
      action: "set_font" as const,
      ...args,
    }),
  }),

  set_accent_color: tool({
    description:
      "Cambia el color primario/acento de la interfaz. Úsala cuando el usuario pida cambiar el color principal, el color de acento, o el tema de color.",
    inputSchema: z.object({
      color: z.string().describe("Color en formato hex, rgb, o nombre CSS"),
    }),
    execute: async (args) => ({
      action: "set_accent_color" as const,
      ...args,
    }),
  }),

  // ── Render tools (show UI components) ────────────────────────────
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
      "Renderiza un formulario interactivo con validaciones. Soporta: required, pattern (regex), minLength, maxLength, min, max. Usa esta tool para formularios, encuestas, registros. Para DNI peruano usa pattern='^\\d{8}$'.",
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
      "Renderiza un mini-dashboard con KPIs, charts y tablas. Usa esta tool cuando el usuario pida un resumen, overview, dashboard, métricas, o visualización de datos.",
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
      "Renderiza un tablero kanban con columnas y tarjetas arrastrables. Los usuarios pueden mover tarjetas entre columnas haciendo drag and drop.",
    inputSchema: z.object({
      title: z.string(),
      columns: z.array(kanbanColumnSchema),
    }),
    execute: async (args: any) => args,
  }),

  render_config: tool({
    description:
      "Renderiza un panel de configuración con controles interactivos. Para que los controles afecten la interfaz real, usa names: darkMode (toggle), fontSize (slider), fontFamily (select), accentColor (color picker).",
    inputSchema: z.object({
      title: z.string(),
      description: z.string().optional(),
      items: z.array(configItemSchema),
    }),
    execute: async (args: any) => args,
  }),

  render_code: tool({
    description:
      "Renderiza un bloque de código con syntax highlighting y copy to clipboard.",
    inputSchema: z.object({
      language: z.string(),
      filename: z.string().optional(),
      code: z.string(),
    }),
    execute: async (args: any) => args,
  }),

  render_selector: tool({
    description:
      "Renderiza un selector visual de opciones con cards clickeables.",
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
      "Renderiza un slider interactivo para seleccionar valores en un rango.",
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
