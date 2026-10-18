import * as z from "zod";
import {
  dateRangeFilterValueSchema,
  rangeFilterValueSchema,
  textFilterValueSchema,
} from "@/components/data-table/types";
import type { InvoiceStatus } from "@/lib/prisma/utility-types";

export const invoiceFilterSchema = z.discriminatedUnion("id", [
  z.object({
    id: z.literal("status"),
    value: z.array(z.enum(["paid", "pending"] satisfies InvoiceStatus[])),
  }),
  z.object({
    id: z.literal("customer_name"),
    value: textFilterValueSchema,
  }),
  z.object({
    id: z.literal("customer_email"),
    value: textFilterValueSchema,
  }),
  z.object({
    id: z.literal("amount"),
    value: rangeFilterValueSchema,
  }),
  z.object({
    id: z.literal("date"),
    value: dateRangeFilterValueSchema,
  }),
  z.object({
    id: z.literal("updatedAt"),
    value: dateRangeFilterValueSchema,
  }),
]);

export const invoiceFiltersSchema = z.array(z.any()).transform((filters) =>
  filters.flatMap((filter) => {
    const result = invoiceFilterSchema.safeParse(filter);
    return result.success ? [result.data] : [];
  }),
);

export type TInvoiceFilters = z.output<typeof invoiceFiltersSchema>;

export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  amount: z.coerce
    .number<number>()
    .int("Amount should be an integer")
    .positive("Amount must be greater than 0"),
  status: z.enum(["paid", "pending"] as InvoiceStatus[]),
  date: z.date("Invalid date"),
});

export type TCreateInvoice = z.infer<typeof createInvoiceSchema>;
