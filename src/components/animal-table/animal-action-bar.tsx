import { useDeleteAnimals } from "@/features/animals";
import type { Table } from "@tanstack/react-table";
import { DataTableActionBar } from "../data-table/data-table-action-bar";

export interface AnimalActionBarProps<T> {
  table: Table<T>;
  editFn: (animal: T) => void;
  resetFn: () => void;
}

export function AnimalActionBar<T>({
  table,
  editFn,
  resetFn,
}: AnimalActionBarProps<T>) {
  const { mutateAsyncToast } = useDeleteAnimals();

  const rows = table
    .getSelectedRowModel()
    .rows.map((row) => row.getValue("id"));

  return (
    <DataTableActionBar
      count={table.getSelectedRowModel().rows.length}
      deleteFn={async () => {
        await mutateAsyncToast(rows);
        table.resetRowSelection();
      }}
      resetSelectionFn={resetFn}
      editFn={() => editFn(table.getSelectedRowModel().rows[0].original)}
    />
  );
}
