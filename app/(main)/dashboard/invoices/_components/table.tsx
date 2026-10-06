"use client";

import {
  type ColumnFiltersState,
  type PaginationState,
  useTable,
} from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useQueryState("q", {
    startTransition,
    shallow: false,
    defaultValue: "",
  });

  const [filters, setFilters] = useQueryState<ColumnFiltersState>(
    "filters",
    parseAsJson(invoiceFiltersSchema)
      .withDefault([])
      .withOptions({ startTransition }),
  );

  const [pagination, setPagination] = useQueryState<PaginationState>(
    "pagination",
    parseAsJson(paginationSchema)
      .withDefault({
        pageIndex: 0,
        pageSize: 5,
      })
      .withOptions({ startTransition }),
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
      globalFilter: query,
      columnFilters: filters,
      pagination: pagination,
    },
    onGlobalFilterChange: setQuery,
    onColumnFiltersChange: setFilters,
    onPaginationChange: setPagination,
  });

  return <DataTable table={table} isPending={isPending} />;
}
