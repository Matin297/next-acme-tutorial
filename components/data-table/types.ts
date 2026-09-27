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

export const textFilterSchema = z.object({
  value: z.string().min(1, { message: "Search query is required." }),
});

export type TTextFilter = z.infer<typeof textFilterSchema>;

export const rangeFilterSchema = z.object({
  value: z.tuple([z.number(), z.number()]).refine(([min, max]) => min <= max, {
    message: "Minimum must be less than or equal to maximum",
  }),
});

export type TRange = [number | undefined, number | undefined];
export type TRangeFilter = z.infer<typeof rangeFilterSchema>;

export const filtersSchema = z.array(
  z.object({
    id: z.string(),
    value: z.unknown(),
  }),
);

export const paginationSchema = z.object({
  pageIndex: z.number().min(0),
  pageSize: z.number().min(1),
});
