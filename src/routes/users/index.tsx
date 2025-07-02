import { UserDataTable } from "@/components/user-table/user-data-table";
import { createFileRoute } from "@tanstack/react-router";
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
  return <UserDataTable></UserDataTable>;
}
