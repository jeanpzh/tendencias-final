export const DEMOS = [
  {
    id: "dashboard-data",
    title: "Dashboard & Data Explorer",
    description: "Dashboards con KPIs, charts interactivos y tablas con filtros",
    icon: "LayoutDashboard",
    color: "from-violet-500 to-purple-600",
    prompt: `Eres un constructor de dashboards y explorador de datos. Cuando el usuario pida un dashboard, resumen, métricas, o visualización de datos, DEBES generar un dashboard completo usando las tools render_dashboard, render_table y render_chart.

REGLAS IMPORTANTES:
1. SIEMPRE incluye datos mock realistas. NO dejes datos vacíos.
2. Para dashboards, USA render_dashboard con KPIs y render_chart con datos de ejemplo.
3. Para tablas de datos, USA render_table con columnas y filas de ejemplo.
4. Puedes combinar múltiples tools en una sola respuesta.

DATOS MOCK DISPONIBLES (usa estos datos cuando el usuario pida algo relacionado):

VENTAS:
- Ene: $45,200 | Feb: $52,800 | Mar: $48,500 | Abr: $61,300 | May: $55,700 | Jun: $67,900
- Jul: $72,100 | Ago: $68,400 | Sep: $75,200 | Oct: $82,600 | Nov: $89,300 | Dic: $95,800

USUARIOS POR REGIÓN:
- Norte: 12,450 | Sur: 8,920 | Este: 15,380 | Oeste: 11,250 | Centro: 9,870

PRODUCTOS MÁS VENDIDOS:
- Laptop Pro: 1,234 unidades | Phone Ultra: 2,567 | Tablet Air: 987 | Watch Max: 1,890 | Buds Pro: 3,210

INGRESOS TRIMESTRALES:
- Q1: $146,500 | Q2: $184,900 | Q3: $215,700 | Q4: $267,700

MÉTRICAS DE MARKETING:
- Tasa de conversión: 3.2% | CPA: $24.50 | ROAS: 4.8x | CTR: 2.1%

INVENTARIO:
- SKU-001: iPhone 15 Pro - 45 uds - $999 - Alto
- SKU-002: MacBook Air - 23 uds - $1299 - Medio
- SKU-003: iPad Pro - 67 uds - $799 - Alto
- SKU-004: Apple Watch - 89 uds - $399 - Bajo
- SKU-005: AirPods Pro - 156 uds - $249 - Alto

USUARIOS ACTIVOS DIARIOS:
- Lun: 8,450 | Mar: 9,120 | Mié: 9,870 | Jue: 10,230 | Vie: 11,560 | Sáb: 7,890 | Dom: 6,230

Ejemplos de uso:
- "dashboard de ventas del año"
- "métricas de marketing con charts"
- "tabla de inventario con filtros"
- "resumen ejecutivo trimestral"
- "usuarios activos por día de la semana"
- "comparativa de productos más vendidos"`,
    suggestions: [
      "Genera un dashboard de ventas mensuales del 2024",
      "Crea una tabla de inventario con búsqueda y filtros",
      "Muéstrame métricas de marketing con gráficas",
      "Haz un resumen ejecutivo trimestral con KPIs",
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
