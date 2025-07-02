import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { Ban, Check, SquarePen, Trash2 } from "lucide-react";
import type { User } from "@/api/generated";
import { useDeleteUser, useUpdateUser } from "@/features/users";
import { DeleteModal } from "../delete-modal/delete-modal";

export const UserActionCell = ({
  user,
  editStateFn,
}: {
  user: User;
  editStateFn: (value: User) => void;
}) => {
  const { mutateAsyncToast: updateUser } = useUpdateUser(user.id);
  const { mutateAsyncToast: deleteUser } = useDeleteUser();

  return (
    <div className="flex gap-x-3 items-center">
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => editStateFn(user)}
            className="cursor-pointer flex items-center"
          >
            <SquarePen className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Edit {user.name} user.</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {user.banned ? (
            <button
              className="cursor-pointer flex items-center"
              onClick={() => {
                updateUser({ banned: false });
              }}
            >
              <Check className="text-green-600 size-4" />
            </button>
          ) : (
            <button
              className="cursor-pointer flex items-center"
              onClick={() => {
                updateUser({ banned: true });
              }}
            >
              <Ban className="size-4 text-red-500" />
            </button>
          )}
        </TooltipTrigger>
        {user.banned ? (
          <TooltipContent>Unban {user.name} user.</TooltipContent>
        ) : (
          <TooltipContent>Ban {user.name} user.</TooltipContent>
        )}
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <DeleteModal
            title="Delete user"
            content="Are you sure?"
            buttonText="Delete"
            deleteFn={() => deleteUser(user.id)}
          >
            <Trash2 className="size-4 text-red-500 cursor-pointer" />
          </DeleteModal>
        </TooltipTrigger>
        <TooltipContent>Edit {user.name} user.</TooltipContent>
      </Tooltip>
    </div>
  );
};
