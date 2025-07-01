import type { User } from "@/features/users";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type TableOptions,
} from "@tanstack/react-table";
import { useState } from "react";

export function useDataTable<T>(
  props: Omit<
    TableOptions<T>,
    | "state"
    | "onSortingChange"
    | "onColumnFiltersChange"
    | "getCoreRowModel"
    | "getSortedRowModel"
    | "getFilteredRowModel"
  >,
) {
  const { data, columns, ...rest } = props;

  const [updateEntity, setUpdateEntity] = useState<T | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    ...rest,
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const resetUpdateEntity = () => {
    setUpdateEntity(null);
    table.resetRowSelection();
  };

  return { table, resetUpdateEntity, updateEntity, setUpdateEntity };
}
