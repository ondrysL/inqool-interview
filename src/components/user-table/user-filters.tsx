import type { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";


export function UserFilters<T>({ table }: { table: Table<T> }) {
  return (
    <div className="flex gap-x-2 items-center">
      <input
        type="text"
        placeholder="Filter by name..."
        className="border border-border px-2 rounded-md py-1"
      />
      <Button
        variant="outline"
        onClick={() => {
        }}
      >
        <SlidersHorizontal className="size-3" />
        <span>Reset</span>
      </Button>
    </div>
  );
}
