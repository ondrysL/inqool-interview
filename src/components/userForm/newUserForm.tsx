import { useCreateUser, UserSchema, type User } from "@/features/users";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForm } from "./userForm";

export const NewUserForm = () => {
  const methods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate } = useCreateUser();

  const onSubmit = async (data: User) => {
    mutate(data);
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
