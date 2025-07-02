import { useRouter, useSearch } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type TableOptions,
} from "@tanstack/react-table";
import { useState } from "react";

export interface UseDataTableProps<T>
  extends Omit<
    TableOptions<T>,
    | "state"
    | "onSortingChange"
    | "onColumnFiltersChange"
    | "getCoreRowModel"
    | "getSortedRowModel"
    | "getFilteredRowModel"
    | "columns"
  > {
  getColumnsFn: (editStateFn: (value: T) => void) => ColumnDef<T>[];
}

export function useDataTable<T>(props: UseDataTableProps<T>) {
  const { data, ...rest } = props;

  const [newFormVisible, setNewFormVisible] = useState(false);
  const [updateEntity, setUpdateEntity] = useState<T | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const router = useRouter();
  const search = useSearch({ strict: false });

  const [pagination, setPagination] = useState({
    pageIndex: search.page ?? 0,
    pageSize: search.size ?? 10,
  });

  const columns = props.getColumnsFn(setUpdateEntity);

  const table = useReactTable({
    ...rest,
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);

      router.navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          page: newPagination.pageIndex,
          size: newPagination.pageSize,
        }),
      });
    },
  });

  const resetUpdateEntity = () => {
    setUpdateEntity(null);
    table.resetRowSelection();
  };

  return {
    table,
    resetUpdateEntity,
    updateEntity,
    setUpdateEntity,
    newFormVisible,
    setNewFormVisible,
  };
}
