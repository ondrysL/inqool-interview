import { Pencil, Trash2, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DeleteModal } from "../delete-modal/delete-modal";

export interface DataTableActionBarProps {
  count: number;
  deleteFn: () => void;
  resetSelectionFn: () => void;
  editFn: () => void;
}

export const DataTableActionBar = ({
  count,
  deleteFn,
  resetSelectionFn,
  editFn,
}: DataTableActionBarProps) => {
  if (count === 0) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 flex items-center gap-2 bg-primary text-white p-2 rounded-lg border-border border-1 py-2 px-4">
      <div className="flex items-center gap-x-2">
        <p className="text-sm">{count} Selected</p>
        <button
          className="flex items-center cursor-pointer"
          onClick={resetSelectionFn}
        >
          <X className="size-4"></X>
        </button>
      </div>

      <div className="h-4 w-[1px] bg-white"></div>

      <div className="flex gap-x-3">
        <div className="flex justify-center items-center">
          <DeleteModal
            title={`Delete ${count} row(s)?`}
            content="Are you sure? This action cannot be undone. This will permanently delete your account
        and remove your data from our servers."
            buttonText="Delete"
            deleteFn={deleteFn}
          >
            <Tooltip>
              <TooltipTrigger>
                <Trash2 className="size-4 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>Delete {count} rows.</TooltipContent>
            </Tooltip>
          </DeleteModal>
        </div>

        <div className="flex items-center gap-x-2 cursor-pointer">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => {
              if (count === 1) {
                editFn();
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger>
                <Pencil className="size-4 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                {count === 1
                  ? "Edit selected row."
                  : "Cannot edit more than one row."}
              </TooltipContent>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
};
