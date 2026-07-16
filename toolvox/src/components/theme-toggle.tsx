"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("dark");
      root.classList.add("light");
      setDark(false);
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      setDark(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
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
