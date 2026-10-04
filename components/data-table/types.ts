import type { Column, RowData } from "@tanstack/react-table";
import * as z from "zod";
import type { TFeatures } from "./features";

export interface ColumnFilterProps<TData extends RowData> {
  column: Column<TFeatures, TData, unknown>;
}

export type TFilterVariant =
  | "text"
  | "range"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

type TFilterOption = { label: string; value: string };

export type DataTableColumnMeta =
  | {
      filterVariant: Extract<TFilterVariant, "checkbox" | "radio">;
      filterOptions: TFilterOption[];
    }
  | {
      filterVariant: Exclude<TFilterVariant, "checkbox" | "radio">;
      filterOptions?: never;
    };

export const textFilterValueSchema = z.string();
export const textFilterFormSchema = z.object({
  value: textFilterValueSchema.min(1, { message: "Search query is required." }),
});

export type TTextFilter = z.infer<typeof textFilterFormSchema>;

export const rangeFilterValueSchema = z.tuple([z.number(), z.number()]);
export const rangeFilterFormSchema = z.object({
  value: rangeFilterValueSchema,
});

export type TRange = [number | undefined, number | undefined];
export type TRangeFilter = z.infer<typeof rangeFilterFormSchema>;

export const dateRangeFilterValueSchema = z.object({
  from: z.coerce.date<Date>(),
  to: z.coerce.date<Date>().optional(),
});
export const dateRangeFilterFormSchema = z.object({
  value: dateRangeFilterValueSchema.optional(),
});

export type TDateRangeFilter = z.infer<typeof dateRangeFilterFormSchema>;

export const checkboxFilterValueSchema = <T extends z.ZodType>(
  optionSchema: T,
) => z.array(optionSchema);
export const checkboxFilterFormSchema = z.object({
  value: checkboxFilterValueSchema(z.string()).min(
    1,
    "Please select at least one filter option.",
  ),
});

export type TCheckboxFilter = z.infer<typeof checkboxFilterFormSchema>;

export const paginationSchema = z.object({
  pageIndex: z.number().min(0),
  pageSize: z.number().min(1),
});
