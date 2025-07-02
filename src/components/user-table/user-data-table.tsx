import { useUsers, type User } from "@/features/users";
import { useDataTable } from "@/hooks/use-data-table";
import { Suspense, useMemo, useState } from "react";
import { DataTableView } from "../data-table/data-table-view";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../data-table/data-table";
import { UserActionBar } from "./user-action-bar";
import { NewUserForm } from "../userForm/newUserForm";
import { UpdateUserForm } from "../userForm/updateUserForm";
import { getUserColumns } from "@/hooks/use-get-user-columns";

export const UserDataTable = () => {
  const { data } = useUsers();

  const [newFormVisible, setNewFormVisible] = useState(false);

  const columns = useMemo(() => getUserColumns(), []);

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
                table.getColumn("name")?.setFilterValue(e.target.value)
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
};
