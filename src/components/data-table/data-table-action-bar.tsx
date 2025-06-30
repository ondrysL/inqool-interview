import { Trash2 } from "lucide-react";

export interface DataTableActionBarProps {
  count: number;
  deleteFn: () => void;
}

export const DataTableActionBar = ({
  count,
  deleteFn,
}: DataTableActionBarProps) => {
  if (count === 0) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 flex items-center gap-2 bg-primary text-white p-2">
      <div>
        <p className="text-sm">{count} Selected</p>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={deleteFn}>
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
};
