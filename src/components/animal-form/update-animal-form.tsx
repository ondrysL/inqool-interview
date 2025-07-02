import { useUpdateAnimal } from "@/features/animals";
import {
  AnimalUpdateSchema,
  type AnimalUpdate,
} from "@/features/animals/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { AnimalForm } from "./animal-form";
import { Button } from "../ui/button";
import { Modal } from "../modal/modal";

export interface UpdateAnimalFormProps {
  id: string;
  defaultValues: AnimalUpdate;
  isVisible: boolean;
  resetFn: () => void;
}

export const UpdateAnimalForm = ({
  id,
  defaultValues,
  isVisible,
  resetFn,
}: UpdateAnimalFormProps) => {
  const methods = useForm<AnimalUpdate>({
    resolver: zodResolver(AnimalUpdateSchema),
    defaultValues,
  });

  const { mutateAsyncToast } = useUpdateAnimal(id);

  const onSubmit = async (data: AnimalUpdate) => {
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
        <p className="text-muted-foreground">Update user into the database</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <AnimalForm />
          <div className="flex gap-x-2 items-center">
            <Button variant="default" type="submit">
              Update Animal
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
