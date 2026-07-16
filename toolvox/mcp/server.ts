import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "toolvox",
  version: "1.0.0",
});

server.tool(
  "render_chart",
  "Renderiza un gráfico interactivo",
  {
    type: z.enum(["bar", "line", "pie", "area"]),
    title: z.string(),
    data: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
      })
    ),
  },
  async (args) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tool: "render_chart",
          args,
        }),
      },
    ],
  })
);

server.tool(
  "render_table",
  "Renderiza una tabla de datos",
  {
    title: z.string(),
    columns: z.array(
      z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(["text", "number", "badge", "date"]),
      })
    ),
    rows: z.array(z.record(z.string(), z.any())),
    searchable: z.boolean().optional(),
    sortable: z.boolean().optional(),
  },
  async (args) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tool: "render_table",
          args,
        }),
      },
    ],
  })
);

server.tool(
  "render_form",
  "Renderiza un formulario interactivo",
  {
    title: z.string(),
    description: z.string().optional(),
    fields: z.array(
      z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum([
          "text",
          "email",
          "password",
          "number",
          "select",
          "textarea",
          "checkbox",
          "radio",
          "slider",
          "date",
        ]),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        options: z
          .array(z.object({ label: z.string(), value: z.string() }))
          .optional(),
      })
    ),
    submitLabel: z.string().optional(),
  },
  async (args) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tool: "render_form",
          args,
        }),
      },
    ],
  })
);

server.tool(
  "render_dashboard",
  "Renderiza un mini-dashboard con KPIs",
  {
    title: z.string(),
    kpis: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
        trend: z.enum(["up", "down", "neutral"]).optional(),
      })
    ),
  },
  async (args) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tool: "render_dashboard",
          args,
        }),
      },
    ],
  })
);

server.tool(
  "render_code",
  "Renderiza un bloque de código",
  {
    language: z.string(),
    filename: z.string().optional(),
    code: z.string(),
  },
  async (args) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tool: "render_code",
          args,
        }),
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ToolVox MCP Server running on stdio");
}

main().catch(console.error);
