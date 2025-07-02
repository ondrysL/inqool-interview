import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { UserDataTable } from "@/components/user-table/user-data-table";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";

const usersSearchSchema = z.object({
  page: z.coerce.number().default(0),
  size: z.coerce.number().default(10),
});

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
  validateSearch: usersSearchSchema,
});

function RouteComponent() {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <UserDataTable></UserDataTable>
    </Suspense>
  );
}
