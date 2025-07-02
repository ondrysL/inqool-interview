import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";
import type { Table as TableType } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export interface DataTableProps<T> {
  table: TableType<T>;
  actionBar?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  table,
  actionBar,
  className = "",
}: DataTableProps<T>) {
  return (
    <>
      <div
        className={cn(
          "rounded-md border bg-background text-primary",
          className,
        )}
      >
        <Table className="table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((header) => (
                  <TableHead>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {actionBar}
      </div>
    </>
  );
}
