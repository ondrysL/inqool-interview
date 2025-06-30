import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

export const UserForm = () => {
  const { register, control } = useFormContext();

  return (
    <div>
      <input type="text" {...register("name")} placeholder="idkss" />
      <Controller
        name="gender"
        control={control}
        render={({ field }) => {
          return (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      ></Controller>
      <Controller
        name="banned"
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
    </div>
  );
};
