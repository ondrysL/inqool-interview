import { useDeleteUsers } from "@/features/users";
import { DataTableActionBar } from "../data-table/data-table-action-bar";
import type { Table } from "@tanstack/react-table";

export function UserActionBar<T>({ table }: { table: Table<T> }) {
  const { mutateAsync } = useDeleteUsers();

  const rows = table
    .getSelectedRowModel()
    .rows.map((row) => row.getValue("id"));

  return (
    <DataTableActionBar
      count={table.getSelectedRowModel().rows.length}
      deleteFn={async () => {
        await mutateAsync(rows);
        table.resetRowSelection();
      }}
    />
  );
}
