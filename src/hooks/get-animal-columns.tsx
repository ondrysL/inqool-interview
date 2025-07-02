import { AnimalActionCell } from "@/components/animal-table/animal-action-cell";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnimalBase } from "@/features/animals/schemas";
import type { ColumnDef } from "@tanstack/react-table";

export const getAnimalColumns = (
  editStateFn: (value: AnimalBase) => void,
): ColumnDef<AnimalBase>[] => {
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
        <DataTableColumnHeader column={column} title="Type" />
      ),
      accessorKey: "type",
      cell: (info) => info.getValue(),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
      accessorKey: "age",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <AnimalActionCell
          animal={info.row.original}
          editStateFn={editStateFn}
        />
      ),
    },
  ];
};
