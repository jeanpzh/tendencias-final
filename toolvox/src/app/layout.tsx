import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolVox - Generative UI con IA",
    template: "%s | ToolVox",
  },
  description:
    "ToolVox demuestra cómo la IA puede generar interfaces ricas e interactivas dentro de un chat. Charts, tablas, formularios, dashboards y más componentes generados por conversación.",
  keywords: [
    "generative UI",
    "inteligencia artificial",
    "chat",
    "componentes interactivos",
    "dashboards",
    "charts",
    "tablas",
    "formularios",
    "Next.js",
    "Vercel AI SDK",
    "OpenRouter",
  ],
  authors: [{ name: "ToolVox" }],
  creator: "ToolVox",
  metadataBase: new URL("https://toolvox.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://toolvox.vercel.app",
    title: "ToolVox - Generative UI con IA",
    description:
      "Componentes interactivos generados por IA dentro de un chat. Charts, tablas, formularios, dashboards, y más.",
    siteName: "ToolVox",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ToolVox - Generative UI Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolVox - Generative UI con IA",
    description:
      "Componentes interactivos generados por IA dentro de un chat.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="h-full bg-background text-foreground">
        <TooltipProvider delayDuration={150}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
