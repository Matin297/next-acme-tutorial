import { PencilIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import type { TFeatures } from "@/components/data-table/features";
import LinkButton from "@/components/link-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { INVOICE_STATUS_OPTIONS } from "@/lib/prisma/utility-types";
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
    cell: ({ getValue }) => format(new Date(getValue()), "LLL dd, y"),
    meta: { filterVariant: "date" },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: ({ getValue }) => format(new Date(getValue()), "LLL dd, y"),
    meta: { filterVariant: "date" },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    meta: {
      filterVariant: "checkbox",
      filterOptions: INVOICE_STATUS_OPTIONS,
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <section>
        <LinkButton
          className="rounded-full"
          variant="outline"
          size="icon"
          href={`/dashboard/invoices/${row.original.id}/edit`}
        >
          <PencilIcon />
        </LinkButton>
      </section>
    ),
  }),
]);
