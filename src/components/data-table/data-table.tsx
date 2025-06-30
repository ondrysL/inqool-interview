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

export interface DataTableProps<T> {
  table: TableType<T>;
  actionBar?: React.ReactNode;
}

export function DataTable<T>({ table, actionBar }: DataTableProps<T>) {
  return (
    <>
      <div className="rounded-md border">
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
