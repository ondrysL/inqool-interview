import type { User } from "@/api/generated";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { UserActionCell } from "@/components/user-table/user-action-cell";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const getUserColumns = (
  editStateFn: (value: User) => void,
): ColumnDef<User>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5 cursor-pointer"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="cursor-pointer"
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
      cell: (info) => (
        <span
          className={cn(
            "px-2 py-1 rounded-md text-white",
            info.getValue() ? "bg-red-400" : "bg-green-500",
          )}
        >
          {info.getValue() ? "Banned" : "Not banned"}
        </span>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      accessorKey: "gender",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <UserActionCell user={info.row.original} editStateFn={editStateFn} />
      ),
    },
  ];
};
