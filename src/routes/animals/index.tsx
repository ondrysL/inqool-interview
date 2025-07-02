import { AnimalDataTable } from "@/components/animal-table/animal-data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";

const usersSearchSchema = z.object({
  page: z.coerce.number().default(0),
  size: z.coerce.number().default(10),
});

export const Route = createFileRoute("/animals/")({
  component: RouteComponent,
  validateSearch: usersSearchSchema,
});

function RouteComponent() {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <AnimalDataTable></AnimalDataTable>
    </Suspense>
  );
}
