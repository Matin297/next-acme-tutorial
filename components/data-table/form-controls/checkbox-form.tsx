import { zodResolver } from "@hookform/resolvers/zod";
import type { RowData } from "@tanstack/react-table";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  type ColumnFilterProps,
  checkboxFilterFormSchema,
  type TCheckboxFilter,
} from "../types";

export default function CheckboxForm<TData extends RowData>({
  column,
}: ColumnFilterProps<TData>) {
  const defaultValue = column.getFilterValue();
  const filterOptions = column.columnDef.meta?.filterOptions ?? [];

  const form = useForm<TCheckboxFilter>({
    resolver: zodResolver(checkboxFilterFormSchema),
    defaultValues: {
      value: Array.isArray(defaultValue) ? defaultValue : [],
    },
  });

  function onSubmit(data: TCheckboxFilter) {
    column.setFilterValue(data.value);
    column.table.resetPageIndex();
  }

  function onClear() {
    form.reset({ value: [] });
    column.setFilterValue(undefined);
    column.table.resetPageIndex();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend variant="label">Options</FieldLegend>
            <FieldGroup data-slot="checkbox-group">
              {filterOptions.map(({ label, value }) => (
                <Field
                  key={value}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={`filter-option-${value}`}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    checked={field.value.includes(value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...field.value, value]
                        : field.value.filter(
                            (fieldValue) => fieldValue !== value,
                          );
                      field.onChange(newValue);
                    }}
                  />
                  <FieldLabel htmlFor={`filter-option-${value}`}>
                    {label}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
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
          onClick={onClear}
        >
          Clear
        </Button>
      </section>
    </form>
  );
}
