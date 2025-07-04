import { useUsers, type UserBase } from "@/features/users";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableView } from "../data-table/data-table-view";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../data-table/data-table";
import { UserActionBar } from "./user-action-bar";
import { getUserColumns } from "@/hooks/get-user-columns";
import { DataTablePagination } from "../data-table/data-table-pagination";
import { DataTableFilters } from "../data-table/data-table-filters";
import { NewUserForm } from "../user-form/new-user-form";
import { UpdateUserForm } from "../user-form/update-user-form";

export const UserDataTable = () => {
  const { data } = useUsers();

  const {
    table,
    resetUpdateEntity,
    updateEntity,
    setUpdateEntity,
    newFormVisible,
    setNewFormVisible,
  } = useDataTable({
    data,
    getColumnsFn: getUserColumns,
  });

  return (
    <div className="p-2 flex flex-col gap-y-4">
      {/* Control Menu */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2">
          <DataTableFilters table={table} />
          <DataTableView table={table} />
        </div>
        <Button variant="default" onClick={() => setNewFormVisible(true)}>
          <Plus />
          <span>Add New User</span>
        </Button>
      </div>

      {/* Table */}
      <DataTable
        table={table}
        actionBar={
          <UserActionBar<UserBase>
            table={table}
            editFn={setUpdateEntity}
            resetFn={resetUpdateEntity}
          />
        }
      />

      {/* Modal */}
      <NewUserForm
        isVisible={newFormVisible}
        resetFn={() => setNewFormVisible(false)}
      />

      {/* Modal */}
      <UpdateUserForm
        key={updateEntity?.id}
        id={updateEntity?.id ?? ""}
        defaultValues={updateEntity ?? {}}
        isVisible={updateEntity !== null}
        resetFn={resetUpdateEntity}
      />

      <DataTablePagination table={table} />
    </div>
  );
};
