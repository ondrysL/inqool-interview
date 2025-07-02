import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

export const AnimalForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <label htmlFor="name" className="block font-bold">
          Name:
        </label>
        <Input
          type="text"
          className="w-full border border-border px-4 py-2 rounded-lg"
          {...register("name")}
          placeholder="Enter name of the user..."
        />
        {errors.name?.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message ?? ""}
          </p>
        )}
      </div>

      <Controller
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <div>
              <label htmlFor="gender" className="block font-bold">
                Gender:
              </label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      ></Controller>

      <div>
        <label htmlFor="Age" className="block font-bold">
          Age:
        </label>
        <Input
          type="number"
          className="w-full border border-border px-4 py-2 rounded-lg"
          {...register("age")}
          placeholder="Enter name of the user..."
        />
        {errors.age?.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.age.message ?? ""}
          </p>
        )}
      </div>
    </div>
  );
};
