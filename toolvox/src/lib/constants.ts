export const DEMOS = [
  {
    id: "data-explorer",
    title: "Data Explorer",
    description: "Genera gráficas interactivas a partir de datos que le pidas",
    icon: "BarChart3",
    color: "from-violet-500 to-purple-600",
    prompt:
      "Eres un asistente de visualización de datos. Cuando el usuario pida datos o gráficas, genera el componente correspondiente usando la tool render_chart. Usa datos de ejemplo realistas. Ejemplos de uso: 'muéstrame ventas mensuales', 'gráfica de usuarios por región', 'comparativa de ingresos trimestrales'.",
    suggestions: [
      "Muéstrame una gráfica de ventas mensuales del 2024",
      "Genera un chart de usuarios activos por región",
      "Compara ingresos trimestrales con gráfica de barras",
      "Dame una gráfica de líneas de tráfico web semanal",
    ],
  },
  {
    id: "form-builder",
    title: "Form Builder",
    description: "Construye formularios interactivos en tiempo real",
    icon: "FileInput",
    color: "from-blue-500 to-cyan-500",
    prompt:
      "Eres un constructor de formularios. Cuando el usuario describa un formulario que necesita, genera los campos interactivos usando la tool render_form. Crea forms completos con validación. Ejemplos: 'formulario de registro', 'encuesta de satisfacción', 'form de contacto'.",
    suggestions: [
      "Crea un formulario de registro con nombre, email y contraseña",
      "Genera una encuesta de satisfacción con escala Likert",
      "Haz un formulario de contacto con nombre, email, teléfono y mensaje",
      "Dame un form de checkout con dirección, método de pago y resumen",
    ],
  },
  {
    id: "dashboard-builder",
    title: "Dashboard Builder",
    description: "Genera mini-dashboards con KPIs, tablas y charts",
    icon: "LayoutDashboard",
    color: "from-emerald-500 to-teal-500",
    prompt:
      "Eres un constructor de dashboards. Cuando el usuario pida un dashboard o resumen, genera KPIs, tablas con filtros y charts usando las tools render_dashboard, render_table y render_chart. Ejemplos: 'dashboard de ventas', 'resumen de métricas', 'panel de control'.",
    suggestions: [
      "Genera un dashboard de ventas con KPIs principales",
      "Crea un panel de métricas de marketing con charts",
      "Haz un dashboard de inventario con tabla y gráficas",
      "Dame un resumen ejecutivo con tendencias de crecimiento",
    ],
  },
  {
    id: "code-playground",
    title: "Code Playground",
    description: "Genera y muestra código con syntax highlighting",
    icon: "Code2",
    color: "from-amber-500 to-orange-500",
    prompt:
      "Eres un asistente de código. Cuando el usuario pida código, muéstralo usando la tool render_code con syntax highlighting. Puedes generar en cualquier lenguaje. Ejemplos: 'función de fibonacci', 'componente React', 'query SQL', 'script de Python'.",
    suggestions: [
      "Función de fibonacci en Python con memoización",
      "Componente React de un botón con variantes",
      "Query SQL para obtener top 10 clientes por ingresos",
      "Script de Node.js para consumir una API REST",
    ],
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description: "Gestiona tareas con paneles kanban y drag & drop",
    icon: "Kanban",
    color: "from-rose-500 to-pink-500",
    prompt:
      "Eres un gestor de tareas. Cuando el usuario pida crear, listar o gestionar tareas, genera paneles kanban interactivos usando la tool render_kanban. Incluye estados: pendiente, en progreso, completado. Ejemplos: 'tareas del sprint', 'proyecto de desarrollo', 'planificación de marketing'.",
    suggestions: [
      "Crea un tablero kanban para un sprint de desarrollo",
      "Organiza tareas de marketing en columnas por prioridad",
      "Haz un tablero de proyecto con tareas pendientes y completadas",
      "Gestiona un flujo de trabajo de contenido con estados",
    ],
  },
  {
    id: "config-panel",
    title: "Config Panel",
    description: "Genera paneles de configuración con toggles y selects",
    icon: "Settings2",
    color: "from-slate-500 to-gray-600",
    prompt:
      "Eres un generador de paneles de configuración. Cuando el usuario describa configuraciones, genera toggles, selects, sliders y otros controles usando la tool render_config. Hazlo interactivo. Ejemplos: 'configuración de tema', 'preferencias de notificaciones', 'ajustes de cuenta'.",
    suggestions: [
      "Genera un panel de configuración de tema (dark/light, idioma, fuente)",
      "Crea preferencias de notificaciones con toggles y selects",
      "Haz un panel de ajustes de cuenta con sliders de privacidad",
      "Dame configuración de audio con volumen, calidad y dispositivos",
    ],
  },
] as const;

export type DemoId = (typeof DEMOS)[number]["id"];
