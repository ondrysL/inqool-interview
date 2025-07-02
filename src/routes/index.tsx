import { UserDataTable } from "@/components/user-table/user-data-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <UserDataTable></UserDataTable>;
}
