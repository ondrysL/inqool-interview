import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { SquarePen, Trash2 } from "lucide-react";
import { DeleteModal } from "../delete-modal/delete-modal";
import { useDeleteAnimal } from "@/features/animals";
import type { AnimalBase } from "@/features/animals/schemas";

export const AnimalActionCell = ({
  animal,
  editStateFn,
}: {
  animal: AnimalBase;
  editStateFn: (value: AnimalBase) => void;
}) => {
  const { mutateAsyncToast: deleteAnimal } = useDeleteAnimal();

  return (
    <div className="flex gap-x-3 items-center">
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => editStateFn(animal)}
            className="cursor-pointer flex items-center"
          >
            <SquarePen className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Edit {animal.name} user.</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <DeleteModal
            title="Delete user"
            content="Are you sure?"
            buttonText="Delete"
            deleteFn={() => deleteAnimal(animal.id)}
          >
            <Trash2 className="size-4 text-red-500 cursor-pointer" />
          </DeleteModal>
        </TooltipTrigger>
        <TooltipContent>Edit {animal.name} user.</TooltipContent>
      </Tooltip>
    </div>
  );
};
