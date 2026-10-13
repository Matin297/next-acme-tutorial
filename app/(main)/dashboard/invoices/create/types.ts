import * as z from "zod";
import type { InvoiceStatus } from "@/lib/prisma/utility-types";

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
