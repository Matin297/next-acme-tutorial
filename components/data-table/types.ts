import type { Column, RowData } from "@tanstack/react-table";
import * as z from "zod";
import type { TFeatures } from "./features";

export interface ColumnFilterProps<TData extends RowData> {
  column: Column<TFeatures, TData, unknown>;
}

export type FilterValueMap = {
  text: string;
  range: [number | undefined, number | undefined];
  select: string;
  radio: string;
  checkbox: string[];
  date: Date;
};

export type TFilterVariant = keyof FilterValueMap;

export type FilterValue<TVariant extends TFilterVariant> =
  FilterValueMap[TVariant];

export type FilterFormData<TVariant extends TFilterVariant> = {
  value: FilterValue<TVariant>;
};

export const textFilterSchema = z.object({
  value: z.string().min(1, { message: "Search query is required." }),
});

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
