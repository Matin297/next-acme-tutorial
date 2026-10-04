import type { SearchParams } from "nuqs/server";
import { createLoader, parseAsJson, parseAsString } from "nuqs/server";
import { paginationSchema } from "@/components/data-table/types";
import SearchBox from "@/components/search-box";
import InvoicesTable from "./_components/table";
import { fetchInvoices } from "./data";
import { invoiceFiltersSchema } from "./types";

const loadSearchParams = createLoader({
  q: parseAsString.withDefault(""),
  pagination: parseAsJson(paginationSchema).withDefault({
    pageIndex: 0,
    pageSize: 5,
  }),
  filters: parseAsJson(invoiceFiltersSchema).withDefault([]),
});

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    filters,
    q: query,
    pagination: { pageIndex, pageSize },
  } = await loadSearchParams(searchParams);

  const { data, total } = await fetchInvoices({
    query,
    filters,
    pageSize,
    pageIndex,
  });

  return (
    <section className="space-y-4">
      <SearchBox />
      <InvoicesTable invoices={data} total={total} />
    </section>
  );
}
