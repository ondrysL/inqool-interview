import { cn } from "@/lib/utils";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useState } from "react";

type BaseColumn<T> = {
  id: string;
  name: string;
  getValue: (item: T) => React.ReactNode;
};

type InputColumn = {
  input: "input";
};

type SelectColumn = {
  input: "select";
  options: { value: string; label: string }[];
};

type CheckboxColumn = {
  input: "checkbox";
};

export type Column<T> = BaseColumn<T> &
  (InputColumn | SelectColumn | CheckboxColumn);

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
};

function RenderInput<T extends FieldValues>({ data }: { data: Column<T> }) {
  const methods = useFormContext();

  switch (data.input) {
    case "input":
      return <input type="text" {...methods.register(data.id)} />;
    case "select":
      return (
        <Controller
          name={data.id}
          control={methods.control}
          render={({ field }) => {
            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {data.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      );
    case "checkbox":
      return <input type="checkbox" {...methods.register(data.id)} />;
  }
}

export function TableRowInput<T extends FieldValues>({
  data,
  columns,
  submit,
  className,
}: {
  data: T;
  columns: Column<T>[];
  submit: (data: T) => void;
  className?: string;
}) {
  const methods = useForm<T>({
    defaultValues: data as DefaultValues<T>,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} className={className}>
        {columns.map((col) => (
          <RenderInput<T> key={col.id} data={col} />
        ))}
      </form>
    </FormProvider>
  );
}

export function TableRow<T extends FieldValues>({
  data,
  columns,
  className,
  onClick,
}: {
  data: T;
  columns: Column<T>[];
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={cn("", className)} onClick={onClick}>
      {columns.map((col, i) => (
        <div
          className={cn("border-b border-gray-200 py-2 px-2", {
            "border-r": i !== columns.length - 1,
          })}
        >
          {col.getValue(data)}
        </div>
      ))}
    </div>
  );
}

export function Table<T extends FieldValues>({
  data,
  columns,
  className,
  headerClassName,
  rowClassName,
}: TableProps<T>) {
  const [id, setId] = useState(-1);

  return (
    <div
      className={cn(
        "border-1 border-gray-200 px-12 py-6 rounded-lg",
        className,
      )}
    >
      <div className={cn("border-b-gray-200 border-b-1", headerClassName)}>
        {columns.map((col, i) => (
          <div
            className={cn("py-2 px-2", {
              "border-r": i !== columns.length - 1,
            })}
          >
            <p>{col.name}</p>
          </div>
        ))}
      </div>
      {data.map((item, i) => {
        if (id === i) {
          return (
            <TableRowInput<T>
              data={item}
              columns={columns}
              submit={() => console.log("hey")}
              className={rowClassName}
            />
          );
        }

        return (
          <TableRow<T>
            data={item}
            columns={columns}
            className={rowClassName}
            onClick={() => setId(i)}
          />
        );
      })}
    </div>
  );
}
