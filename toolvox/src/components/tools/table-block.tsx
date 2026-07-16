"use client";

import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Column {
  key: string;
  label: string;
  type: "text" | "number" | "badge" | "date";
}

interface TableBlockProps {
  title: string;
  columns: Column[];
  rows: Record<string, any>[];
  searchable?: boolean;
  sortable?: boolean;
}

export function TableBlock({
  title,
  columns,
  rows,
  searchable = true,
  sortable = true,
}: TableBlockProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const dir = sortDir === "asc" ? 1 : -1;
    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * dir;
    }
    return String(aVal).localeCompare(String(bVal)) * dir;
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderBadgeVariant = (value: string) => {
    const lower = value.toLowerCase();
    if (lower.includes("active") || lower.includes("completado") || lower.includes("high"))
      return "success";
    if (lower.includes("pending") || lower.includes("pendiente") || lower.includes("medium"))
      return "warning";
    if (lower.includes("inactive") || lower.includes("baja") || lower.includes("low"))
      return "secondary";
    return "default";
  };

  return (
    <Card className="animate-fade-in-up my-3 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {sortedRows.length} registros
          </span>
        </div>
        {searchable && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-2 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortable && sortKey === col.key && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.type === "badge" ? (
                        <Badge variant={renderBadgeVariant(String(row[col.key]))}>
                          {String(row[col.key])}
                        </Badge>
                      ) : (
                        String(row[col.key] ?? "")
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
