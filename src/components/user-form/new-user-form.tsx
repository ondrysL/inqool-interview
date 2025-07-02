import { useCreateUser, UserCreateSchema, type UserCreate } from "@/features/users";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../modal/modal";
import { Button } from "../ui/button";
import { UserForm } from "./user-form";

export const NewUserForm = ({
  isVisible,
  resetFn,
}: {
  isVisible: boolean;
  resetFn: () => void;
}) => {
  const methods = useForm<UserCreate>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      gender: "other",
      banned: false,
    },
  });

  const { mutateAsyncToast } = useCreateUser();

  const onSubmit = async (data: UserCreate) => {
    mutateAsyncToast(data);
    resetFn();
    methods.reset();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal isOpen={isVisible} onClose={resetFn}>
      <div>
        <h1 className="font-bold text-xl">Add New User</h1>
        <p className="text-muted-foreground">Add a new user into the database</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <UserForm />
          <div className="flex gap-x-2 items-center">
            <Button variant="default" type="submit">
              Create User
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
