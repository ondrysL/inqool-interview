import {
  useCreateUser,
  useDeleteUser,
  UserSchema,
  useUpdateUser,
} from "@/features/users";
import { useUsers } from "@/features/users/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import type { User } from "@/api/generated";

export const Route = createFileRoute("/")({
  component: Index,
});

const UserUpdate = ({
  user,
  resetId,
}: {
  user: User;
  resetId: (id: null) => void;
}) => {
  const { handleSubmit, control, register } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name,
      gender: user.gender,
      banned: user.banned,
    },
  });

  const { mutateAsync: updateUser } = useUpdateUser(user.id);

  return (
    <form
      className="flex"
      onSubmit={handleSubmit(async (data) => {
        updateUser(data);
        resetId(null);
      })}
    >
      <input type="text" {...register("name")} />
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
      <button type="submit">Submit</button>
    </form>
  );
};

function Index() {
  const { data: users } = useUsers();
  const { mutateAsync } = useDeleteUser();
  const { mutateAsync: createUser } = useCreateUser();

  const { handleSubmit, register, formState, control } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const [updateId, setUpdateId] = useState<string | null>(null);

  return (
    <div className="p-2">
      {users.map((user) =>
        updateId === user.id ? (
          <UserUpdate key={user.id} user={user} resetId={setUpdateId} />
        ) : (
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
            <button
              className="bg-amber-200 p-2 cursor-pointer"
              onClick={() => setUpdateId(user.id)}
            >
              Edit
            </button>
          </div>
        ),
      )}
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
      <DevTool control={control} />
    </div>
  );
}
