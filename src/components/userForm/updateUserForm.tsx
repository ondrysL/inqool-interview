import {
  UpdateUserSchema,
  useUpdateUser,
  type UpdateUser,
} from "@/features/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UserForm } from "./userForm";
import { Modal } from "../modal/modal";
import { Button } from "../ui/button";

export interface UpdateUserFormProps {
  id: string;
  defaultValues: UpdateUser;
  isVisible: boolean;
  resetFn: () => void;
}

export const UpdateUserForm = ({
  id,
  defaultValues,
  isVisible,
  resetFn,
}: UpdateUserFormProps) => {
  const methods = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const { mutateAsyncToast } = useUpdateUser(id);

  const onSubmit = async (data: UpdateUser) => {
    mutateAsyncToast(data);
    resetFn();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal isOpen={isVisible} onClose={resetFn}>
      <div>
        <h1 className="font-bold text-xl">Add New User</h1>
        <p className="text-muted-foreground">
          Update user into the database
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <UserForm />
          <div className="flex gap-x-2 items-center">
            <Button variant="default" type="submit">
              Update User
            </Button>
            <Button variant="outline" type="button" onClick={resetFn}>
              Close
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
