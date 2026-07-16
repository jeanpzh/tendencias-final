"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SliderBlockProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
}

export function SliderBlock({
  label,
  min,
  max,
  step = 1,
  defaultValue,
  unit = "",
}: SliderBlockProps) {
  const [value, setValue] = useState(defaultValue ?? min);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <Card className="animate-fade-in-up my-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <span className="text-lg font-bold text-primary">
            {value}
            {unit}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>
              {min}
              {unit}
            </span>
            <span>
              {max}
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
