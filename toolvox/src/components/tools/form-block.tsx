"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
}

interface FormBlockProps {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

export function FormBlock({
  title,
  description,
  fields,
  submitLabel = "Enviar",
}: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="animate-fade-in-up my-3">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Send className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="font-medium">Formulario enviado</p>
            <p className="text-xs text-muted-foreground">
              Gracias por completar el formulario.
            </p>
            <div className="mt-4 w-full text-left">
              <p className="text-xs font-medium mb-2">Datos enviados:</p>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in-up my-3">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1">
                {field.label}
                {field.required && (
                  <Badge variant="destructive" className="h-4 text-[10px] px-1">
                    *
                  </Badge>
                )}
              </label>
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "password" ||
              field.type === "number" ||
              field.type === "date" ? (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  placeholder={field.placeholder}
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">{field.placeholder ?? "Seleccionar..."}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[field.name] ?? false}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  {field.placeholder}
                </label>
              ) : field.type === "radio" ? (
                <div className="flex flex-wrap gap-3">
                  {field.options?.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={opt.value}
                        checked={formData[field.name] === opt.value}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="h-4 w-4"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              ) : field.type === "slider" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={field.min ?? 0}
                    max={field.max ?? 100}
                    step={field.step ?? 1}
                    value={formData[field.name] ?? field.min ?? 0}
                    onChange={(e) => handleChange(field.name, Number(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-mono w-10 text-right">
                    {formData[field.name] ?? field.min ?? 0}
                  </span>
                </div>
              ) : null}
            </div>
          ))}
          <Button type="submit" className="w-full" size="sm">
            <Send className="h-4 w-4 mr-2" />
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
