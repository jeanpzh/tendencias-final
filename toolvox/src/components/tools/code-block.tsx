"use client";

import { useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CodeBlockProps {
  language: string;
  filename?: string;
  code: string;
}

export function CodeBlock({ language, filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageColors: Record<string, string> = {
    javascript: "bg-yellow-500/15 text-yellow-600",
    typescript: "bg-blue-500/15 text-blue-600",
    python: "bg-green-500/15 text-green-600",
    html: "bg-orange-500/15 text-orange-600",
    css: "bg-purple-500/15 text-purple-600",
    json: "bg-gray-500/15 text-gray-600",
    bash: "bg-gray-500/15 text-gray-600",
    sql: "bg-cyan-500/15 text-cyan-600",
  };

  return (
    <Card className="animate-fade-in-up my-3 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">
              {filename ?? "Código"}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={`text-[10px] ${languageColors[language] ?? ""}`}
            >
              {language}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="overflow-x-auto bg-zinc-950 text-zinc-50 p-4 text-xs leading-relaxed">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
