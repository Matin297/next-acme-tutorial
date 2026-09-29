import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RowData } from "@tanstack/react-table";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  type ColumnFilterProps,
  dateRangeFilterSchema,
  type TDateRangeFilter,
} from "../types";

export default function DateForm<TData extends RowData>({
  column,
}: ColumnFilterProps<TData>) {
  const form = useForm<TDateRangeFilter>({
    resolver: zodResolver(dateRangeFilterSchema),
    defaultValues: dateRangeFilterSchema.parse({
      value: column.getFilterValue(),
    }),
  });

  function onSubmit(data: TDateRangeFilter) {
    column.setFilterValue(data.value);
    column.table.resetPageIndex();
  }

  function onClear() {
    form.reset(undefined);
    column.setFilterValue(undefined);
    column.table.resetPageIndex();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="value"
        control={form.control}
        render={({ field: { value, onChange }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="search-input">Date</FieldLabel>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal"
                  >
                    <CalendarDateRangeIcon />
                    {value?.from ? (
                      value.to ? (
                        <>
                          {format(value.from, "LLL dd, y")} -{" "}
                          {format(value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={value?.from}
                  selected={value}
                  onSelect={onChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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
