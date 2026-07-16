"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { dark, setDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark(!dark)}
      className={`h-8 w-8 ${className}`}
      title={dark ? "Modo claro" : "Modo oscuro"}
    >
      {dark ? (
        <Sun className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
