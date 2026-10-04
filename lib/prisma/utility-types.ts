import type { FieldOutputTypes } from "./contract";

export type InvoiceStatus = FieldOutputTypes["public"]["Invoice"]["status"];
export const INVOICE_STATUS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
};
export const INVOICE_STATUS_FILTER = Object.entries(INVOICE_STATUS).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
