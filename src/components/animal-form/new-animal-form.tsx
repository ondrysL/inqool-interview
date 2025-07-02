import { useCreateAnimal } from "@/features/animals";
import {
  AnimalCreateSchema,
  type AnimalCreate,
} from "@/features/animals/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { AnimalForm } from "./animal-form";
import { Modal } from "../modal/modal";

export const NewAnimalForm = ({
  isVisible,
  resetFn,
}: {
  isVisible: boolean;
  resetFn: () => void;
}) => {
  const methods = useForm<AnimalCreate>({
    resolver: zodResolver(AnimalCreateSchema),
  });

  const { mutateAsyncToast } = useCreateAnimal();

  const onSubmit = async (data: AnimalCreate) => {
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
        <p className="text-muted-foreground">
          Add a new animal into the database
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <AnimalForm />
          <div className="flex gap-x-2 items-center">
            <Button variant="default" type="submit">
              Create Animal
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
