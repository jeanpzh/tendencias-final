"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPI {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface DashboardBlockProps {
  title: string;
  kpis: KPI[];
}

export function DashboardBlock({ title, kpis }: DashboardBlockProps) {
  const trendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const trendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-emerald-500";
      case "down":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="animate-fade-in-up my-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="space-y-1 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <div className="flex items-baseline justify-between">
                <p className="text-xl font-bold tracking-tight">{kpi.value}</p>
                {kpi.trend && (
                  <div className={`flex items-center gap-1 text-xs ${trendColor(kpi.trend)}`}>
                    {trendIcon(kpi.trend)}
                    <span>{kpi.change}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
