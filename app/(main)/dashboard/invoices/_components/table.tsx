"use client";

import {
  type ColumnFiltersState,
  type PaginationState,
  useTable,
} from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import DataTable, { features } from "@/components/data-table";
import { paginationSchema } from "@/components/data-table/types";
import type { TInvoice } from "../data";
import { invoiceFiltersSchema } from "../types";
import { columns } from "./columns-definition";

export default function InvoicesTable({
  invoices,
  total,
}: {
  invoices: TInvoice["data"];
  total: number;
}) {
  const [filters, setFilters] = useQueryState<ColumnFiltersState>(
    "filters",
    parseAsJson(invoiceFiltersSchema).withDefault([]),
  );

  const [pagination, setPagination] = useQueryState<PaginationState>(
    "pagination",
    parseAsJson(paginationSchema)
      .withDefault({
        pageIndex: 0,
        pageSize: 5,
      })
      .withOptions({ shallow: false }),
  );

  const table = useTable({
    features,
    columns,
    data: invoices,
    rowCount: total,
    getRowId: (originalRow) => originalRow.id,
    manualPagination: true,
    manualFiltering: true,
    state: {
      columnFilters: filters,
      pagination: pagination,
    },
    onColumnFiltersChange: setFilters,
    onPaginationChange: setPagination,
  });

  return <DataTable table={table} />;
}
