"use client";

import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";
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
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
}

interface FormBlockProps {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

function validateField(field: FormField, value: any): string | null {
  if (field.required && (!value || String(value).trim() === "")) {
    return `${field.label} es requerido`;
  }

  if (value && field.pattern) {
    const regex = new RegExp(field.pattern);
    if (!regex.test(String(value))) {
      if (field.name.toLowerCase().includes("dni")) {
        return "DNI debe tener exactamente 8 dígitos numéricos";
      }
      return `Formato no válido`;
    }
  }

  if (value && field.minLength && String(value).length < field.minLength) {
    return `Mínimo ${field.minLength} caracteres`;
  }

  if (value && field.maxLength && String(value).length > field.maxLength) {
    return `Máximo ${field.maxLength} caracteres`;
  }

  if (value && field.min !== undefined && Number(value) < field.min) {
    return `Valor mínimo: ${field.min}`;
  }

  if (value && field.max !== undefined && Number(value) > field.max) {
    return `Valor máximo: ${field.max}`;
  }

  return null;
}

export function FormBlock({
  title,
  description,
  fields,
  submitLabel = "Enviar",
}: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const error = validateField(field, value);
        setErrors((prev) => {
          const next = { ...prev };
          if (error) next[name] = error;
          else delete next[name];
          return next;
        });
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const field = fields.find((f) => f.name === name);
    if (field) {
      const error = validateField(field, formData[name]);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[name] = error;
        else delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Record<string, boolean> = {};
    const newErrors: Record<string, string> = {};
    let hasError = false;

    fields.forEach((field) => {
      allTouched[field.name] = true;
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasError = true;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    if (!hasError) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <Card className="my-3">
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
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto font-mono">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-3">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {fields.map((field) => {
            const error = touched[field.name] ? errors[field.name] : null;
            return (
              <div key={field.name} className="space-y-1.5">
                <label className="text-xs font-medium flex items-center gap-1">
                  {field.label}
                  {field.required && (
                    <span className="text-destructive text-[10px]">*</span>
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
                    onBlur={() => handleBlur(field.name)}
                    pattern={field.pattern}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    min={field.min}
                    max={field.max}
                    className={error ? "border-destructive" : ""}
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    placeholder={field.placeholder}
                    value={formData[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={() => handleBlur(field.name)}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    className={error ? "border-destructive" : ""}
                  />
                ) : field.type === "select" ? (
                  <select
                    className={`flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${error ? "border-destructive" : "border-input"}`}
                    value={formData[field.name] ?? ""}
                    onChange={(e) => {
                      handleChange(field.name, e.target.value);
                      handleBlur(field.name);
                    }}
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
                      onChange={(e) => {
                        handleChange(field.name, e.target.checked);
                        handleBlur(field.name);
                      }}
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
                          onChange={(e) => {
                            handleChange(field.name, e.target.value);
                            handleBlur(field.name);
                          }}
                          className="h-4 w-4 accent-primary"
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
                    <span className="text-xs font-mono w-10 text-right text-muted-foreground">
                      {formData[field.name] ?? field.min ?? 0}
                    </span>
                  </div>
                ) : null}
                {error && (
                  <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </p>
                )}
              </div>
            );
          })}
          <Button type="submit" className="w-full" size="sm">
            <Send className="h-4 w-4 mr-2" />
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
