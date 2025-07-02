import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";

export const UserForm = () => {
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
        name="gender"
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
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      ></Controller>
      <Controller
        name="banned"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-bold">Banned status</p>
              <span className="text-sm text-muted-foreground">
                Toggle to ban this user
              </span>
            </div>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-5 cursor-pointer"
            />
          </div>
        )}
      />
    </div>
  );
};
