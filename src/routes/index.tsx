import type { User } from "@/api/generated";
import { DataTable } from "@/components/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserActionBar } from "@/components/user-table/user-action-bar";
import { NewUserForm } from "@/components/userForm/newUserForm";
import { UpdateUserForm } from "@/components/userForm/updateUserForm";
import { useUsers } from "@/features/users";
import { createFileRoute } from "@tanstack/react-router";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Suspense, useState } from "react";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
  },
  {
    header: "ID",
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Banned",
    accessorKey: "banned",
    cell: (info) => (info.getValue() ? "banned" : "not banned"),
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: (info) => info.getValue(),
  },
];

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [updateUser, setUpdateUser] = useState<(User & { id: string }) | null>(
    null,
  );

  const { data } = useUsers();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable
          table={table}
          actionBar={<UserActionBar<User & { id: string }> table={table} />}
        />
        <NewUserForm />
        {updateUser && (
          <UpdateUserForm
            key={updateUser.id}
            id={updateUser.id}
            defaultValues={updateUser}
            resetId={setUpdateUser}
          />
        )}
      </Suspense>
    </div>
  );
}
