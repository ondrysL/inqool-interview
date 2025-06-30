import {
  UpdateUserSchema,
  useUpdateUser,
  type UpdateUser,
  type User,
} from "@/features/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UserForm } from "./userForm";

export interface UpdateUserFormProps {
  id: string;
  defaultValues: UpdateUser;
  resetId: (value: null | (User & { id: string })) => void;
}

export const UpdateUserForm = ({
  id,
  defaultValues,
  resetId,
}: UpdateUserFormProps) => {
  const methods = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const { mutate } = useUpdateUser(id);

  const onSubmit = async (data: UpdateUser) => {
    mutate(data);
    resetId(null);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <UserForm />
        <button type="submit">Create User</button>
      </form>
    </FormProvider>
  );
};
