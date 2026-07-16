"use client";

import * as React from "react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApiUsage({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] text-muted-foreground",
        className
      )}
    >
      <CreditCard className="h-3 w-3 shrink-0" />
      <span className="font-mono">Free tier</span>
    </div>
  );
}
