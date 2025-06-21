import { useCreateUser, useDeleteUser, UserSchema } from "@/features/users";
import { useUsers } from "@/features/users/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: users } = useUsers();
  const { mutateAsync } = useDeleteUser();
  const { mutateAsync: createUser } = useCreateUser();

  const { handleSubmit, register, formState, control } = useForm({
    resolver: zodResolver(UserSchema),
  });

  return (
    <div className="p-2">
      {users.map((user) => (
        <div key={user.id} className="flex gap-x-2">
          <h1>{user.name}</h1>
          <p>{user.banned ? "banned" : "not banned"}</p>
          <p>{user.gender}</p>
          <button
            className="bg-red-200 p-2 cursor-pointer"
            onClick={() => mutateAsync(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <h1>{users.length}</h1>
      <form
        className="mb-12"
        onSubmit={handleSubmit(async (data) => {
          console.log("hey");
          createUser(data);
        })}
      >
        <input {...register("name")} type="text" placeholder="name" />
        <button type="submit" className="cursor-pointer bg-red-200">
          Submit
        </button>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="banned"
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        {formState.isSubmitting && <p>Loading...</p>}
        {formState.errors.banned && <p>{formState.errors.banned.message}</p>}
      </form>
    </div>
  );
}
