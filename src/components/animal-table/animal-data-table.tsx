import { useAnimals } from "@/features/animals";
import { getAnimalColumns } from "@/hooks/get-animal-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableView } from "../data-table/data-table-view";
import { DataTable } from "../data-table/data-table";
import type { AnimalBase } from "@/features/animals/schemas";
import { AnimalActionBar } from "./animal-action-bar";
import { DataTableFilters } from "../data-table/data-table-filters";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DataTablePagination } from "../data-table/data-table-pagination";
import { NewAnimalForm } from "../animal-form/new-animal-form";
import { UpdateAnimalForm } from "../animal-form/update-animal-form";

export const AnimalDataTable = () => {
  const { data } = useAnimals();

  const {
    table,
    resetUpdateEntity,
    updateEntity,
    setUpdateEntity,
    newFormVisible,
    setNewFormVisible,
  } = useDataTable({
    data,
    getColumnsFn: getAnimalColumns,
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
          <span>Add New Animal</span>
        </Button>
      </div>

      {/* Table */}
      <DataTable
        table={table}
        actionBar={
          <AnimalActionBar<AnimalBase>
            table={table}
            editFn={setUpdateEntity}
            resetFn={resetUpdateEntity}
          />
        }
      />

      {/* Modal */}
      <NewAnimalForm
        isVisible={newFormVisible}
        resetFn={() => setNewFormVisible(false)}
      />

      {/* Modal */}
      <UpdateAnimalForm
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
