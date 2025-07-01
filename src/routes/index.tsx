import type { User } from "@/api/generated";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableView } from "@/components/data-table/data-table-view";
import { DeleteModal } from "@/components/delete-modal/delete-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { UserActionBar } from "@/components/user-table/user-action-bar";
import { NewUserForm } from "@/components/userForm/newUserForm";
import { UpdateUserForm } from "@/components/userForm/updateUserForm";
import { useUsers } from "@/features/users";
import { useDataTable } from "@/hooks/use-data-table";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus } from "lucide-react";
import { Suspense, useState } from "react";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className=""
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    header: "Id",
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Banned" />
    ),
    accessorKey: "banned",
    cell: (info) => (info.getValue() ? "banned" : "not banned"),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    accessorKey: "gender",
    cell: (info) => info.getValue(),
  },
];

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useUsers();

  const [newFormVisible, setNewFormVisible] = useState(false);

  const { table, resetUpdateEntity, updateEntity, setUpdateEntity } =
    useDataTable({
      data,
      columns,
    });

  return (
    <div className="p-2 flex flex-col gap-y-4">
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filter by name..."
              className="border border-border px-2 rounded-md"
              onChange={(e) =>
                table.getColumn("name").setFilterValue(e.target.value)
              }
            />
            <DataTableView table={table} />
          </div>
          <Button variant="default" onClick={() => setNewFormVisible(true)}>
            <Plus />
            <span>Add New User</span>
          </Button>
        </div>
        <DataTable
          table={table}
          actionBar={
            <UserActionBar<User & { id: string }>
              table={table}
              editFn={setUpdateEntity}
              resetFn={resetUpdateEntity}
            />
          }
        />
        <NewUserForm
          isVisible={newFormVisible}
          resetFn={() => setNewFormVisible(false)}
        />
        <UpdateUserForm
          key={updateEntity?.id}
          id={updateEntity?.id ?? ""}
          defaultValues={updateEntity}
          isVisible={updateEntity !== null}
          resetFn={resetUpdateEntity}
        />
      </Suspense>
    </div>
  );
}
