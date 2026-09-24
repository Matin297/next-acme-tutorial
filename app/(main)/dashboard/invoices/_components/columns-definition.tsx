import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import type { TFeatures } from "@/components/data-table/features";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber, getNameInitials } from "@/lib/utils";
import type { TInvoiceData } from "../data";
import StatusBadge from "./status-badge";

const columnHelper = createColumnHelper<TFeatures, TInvoiceData>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "row",
    header: "#",
    cell: ({ row }) => {
      const displayIndex = row.getDisplayIndex();
      return displayIndex === -1 ? "" : displayIndex + 1;
    },
  }),
  columnHelper.display({
    id: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <Avatar>
          <AvatarImage src={customer.imageUrl ?? ""} alt={customer.name} />
          <AvatarFallback>{getNameInitials(customer.name)}</AvatarFallback>
        </Avatar>
      );
    },
  }),
  columnHelper.accessor("customer.name", {
    header: "Name",
    meta: { filterVariant: "text" },
  }),
  columnHelper.accessor("customer.email", {
    header: "Email",
    meta: { filterVariant: "text" },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ getValue }) => <p>{formatNumber(getValue())}</p>,
    meta: {
      filterVariant: "range",
    },
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ getValue }) => format(new Date(getValue()), "dd/MM/yyyy"),
    meta: { filterVariant: "date" },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    meta: { filterVariant: "checkbox" },
  }),
]);
