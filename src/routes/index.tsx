import type { User } from "@/api/generated";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table/table";
import { useUsers } from "@/features/users";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: users } = useUsers();

  return (
    <div className="p-2">
      <Table<User>
        data={users}
        columns={[
          {
            id: "id",
            name: "ID",
            getValue: (user) => user.id,
            input: "input",
          },
          {
            id: "name",
            name: "Name",
            getValue: (user) => <p>{user.name}</p>,
            input: "input",
          },
          {
            id: "isBanned",
            name: "Banned",
            getValue: (user) => (
              <Badge
                text={user.banned ? "Yes" : "No"}
                className={cn("bg-green-300", { "bg-red-400": user.banned })}
              />
            ),
            input: "checkbox",
          },
          {
            id: "gender",
            name: "Gender",
            getValue: (user) => <p>{user.gender}</p>,
            input: "select",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
          },
        ]}
        className="flex flex-col"
        headerClassName="grid grid-cols-4"
        rowClassName="grid grid-cols-4"
      />
    </div>
  );
}
