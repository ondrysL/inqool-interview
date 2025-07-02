import type { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export function DataTableFilters<T>({ table }: { table: Table<T> }) {
  const [name, setName] = useState("");

  return (
    <div className="flex gap-x-2 items-center">
      <Input
        type="text"
        placeholder="Filter by name..."
        className="border border-border px-2 rounded-md py-1 focus:outline-none focus:border-primary"
        onChange={(e) => {
          table.getColumn("name")?.setFilterValue(e.target.value);
          setName(e.target.value);
        }}
        value={name}
      />
      <Button
        variant="outline"
        onClick={() => {
          table.getColumn("name")?.setFilterValue("");
          setName("");
        }}
      >
        <SlidersHorizontal className="size-3" />
        <span>Reset</span>
      </Button>
    </div>
  );
}
