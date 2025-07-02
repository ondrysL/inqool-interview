import { useDeleteUsers } from "@/features/users";
import { DataTableActionBar } from "../data-table/data-table-action-bar";
import type { Table } from "@tanstack/react-table";

export function UserActionBar<T extends { id: string }>({
  table,
  editFn,
  resetFn,
}: {
  table: Table<T>;
  editFn: (user: T) => void;
  resetFn: () => void;
}) {
  const { mutateAsyncToast } = useDeleteUsers();

  const rows = table.getSelectedRowModel().rows.map((row) => row.original.id);

  return (
    <div>
      <DataTableActionBar
        count={table.getSelectedRowModel().rows.length}
        deleteFn={async () => {
          await mutateAsyncToast(rows);
          table.resetRowSelection();
        }}
        resetSelectionFn={resetFn}
        editFn={() => editFn(table.getSelectedRowModel().rows[0].original)}
      />
    </div>
  );
}
