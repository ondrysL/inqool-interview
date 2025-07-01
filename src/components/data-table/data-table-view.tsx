import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { Table } from "@tanstack/react-table";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function DataTableView<T>({ table }: { table: Table<T> }) {
  const columns = useMemo(() => {
    return table.getAllColumns().filter((column) => column.getCanHide());
  }, [table]);

  console.log(columns);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Toggle columns"
            role="combobox"
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Settings2 />
            View
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search columns..." />
            <CommandList>
              <CommandEmpty>No columns found.</CommandEmpty>
              {columns.map((column) => {
                return (
                  <CommandItem
                    key={column.id}
                    value={column.id}
                    onSelect={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                  >
                    <span className="truncate">{column.id}</span>
                    <Check
                      className={cn(
                        "ml-auto size-4 shrink-0",
                        column.getIsVisible() ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
