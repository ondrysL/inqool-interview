import type { Column } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, ChevronsUpDown, ChevronUp, X } from "lucide-react";

export interface DataTableColumnHeaderProps<T, S> {
  column: Column<T, S>;
  title: string;
}

export function DataTableColumnHeader<T, S>({
  column,
  title,
}: DataTableColumnHeaderProps<T, S>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {column.getCanSort() &&
          (column.getIsSorted() === "desc" ? (
            <ChevronDown className="size-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronsUpDown className="size-4" />
          ))}
        <span>{title}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={column.getIsSorted() === "asc"}
          onClick={() => column.toggleSorting(false)}
        >
          <ChevronUp className="size-4" />
          Ascending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={column.getIsSorted() === "desc"}
          onClick={() => column.toggleSorting(true)}
        >
          <ChevronDown className="size-4" />
          Descending
        </DropdownMenuCheckboxItem>

        {column.getIsSorted() && (
          <DropdownMenuCheckboxItem onClick={() => column.clearSorting()}>
            <X className="size-4" />
            Reset
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
