import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RowData } from "@tanstack/react-table";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  type ColumnFilterProps,
  type FilterFormData,
  textFilterSchema,
} from "../types";

export default function TextForm<TData extends RowData>({
  column,
}: ColumnFilterProps<TData>) {
  const defaultValue = column.getFilterValue();

  const form = useForm<FilterFormData<"text">>({
    resolver: zodResolver(textFilterSchema),
    defaultValues: {
      value: typeof defaultValue === "string" ? defaultValue : "",
    },
  });

  function onSubmit(data: FilterFormData<"text">) {
    column.setFilterValue(data.value);
    column.table.resetPageIndex();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="search-input">Search</FieldLabel>
            <InputGroup className="max-w-xs">
              <InputGroupInput
                {...field}
                id="search-input"
                aria-invalid={fieldState.invalid}
                placeholder="Search column..."
                autoComplete="off"
              />
              <InputGroupAddon>
                <MagnifyingGlassIcon className="w-4" />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <section className="flex justify-end gap-2 mt-2">
        <Button size="xs" className="rounded-sm" type="submit">
          Apply
        </Button>
        <Button
          type="reset"
          size="xs"
          variant="outline"
          className="rounded-sm"
          onClick={() => {
            form.reset({ value: "" });
            column.setFilterValue(undefined);
            column.table.resetPageIndex();
          }}
        >
          Clear
        </Button>
      </section>
    </form>
  );
}
