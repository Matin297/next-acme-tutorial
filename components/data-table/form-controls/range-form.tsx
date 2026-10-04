import { zodResolver } from "@hookform/resolvers/zod";
import type { RowData } from "@tanstack/react-table";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { formatNumber } from "@/lib/utils";
import {
  type ColumnFilterProps,
  rangeFilterFormSchema,
  type TRangeFilter,
} from "../types";

const DEFAULT: [number, number] = [0, 500_000];
const STEP = 1000;

export default function RangeForm<TData extends RowData>({
  column,
}: ColumnFilterProps<TData>) {
  const defaultValue = column.getFilterValue();

  const form = useForm<TRangeFilter>({
    resolver: zodResolver(rangeFilterFormSchema),
    defaultValues: {
      value: Array.isArray(defaultValue)
        ? (defaultValue as [number, number])
        : DEFAULT,
    },
  });

  function onSubmit(data: TRangeFilter) {
    column.setFilterValue(data.value);
    column.table.resetPageIndex();
  }

  function onClear() {
    form.reset({ value: DEFAULT });
    column.setFilterValue(undefined);
    column.table.resetPageIndex();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="range-input">Range</FieldLabel>
            <section className="relative pt-5">
              <span className="absolute left-0 top-0">
                {formatNumber(field.value[0])}
              </span>
              <Slider
                {...field}
                onValueChange={field.onChange}
                id="range-input"
                min={DEFAULT[0]}
                max={DEFAULT[1]}
                step={STEP}
                aria-invalid={fieldState.invalid}
              />
              <span className="absolute right-0 top-0">
                {formatNumber(field.value[1])}
              </span>
            </section>
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
          onClick={onClear}
        >
          Clear
        </Button>
      </section>
    </form>
  );
}
