import { and, or } from "@prisma/orm-postgres/orm-client";
import { endOfDay } from "date-fns";
import { db } from "@/lib/prisma/db";
import type { TInvoiceFilters } from "./types";

export async function fetchInvoices({
  pageIndex,
  pageSize,
  query,
  filters,
}: {
  pageIndex: number;
  pageSize: number;
  query: string;
  filters: TInvoiceFilters;
}) {
  query = query.trim();
  try {
    let invoices = db.orm.public.Invoice;

    if (query) {
      invoices = invoices.where((invoice) =>
        or(
          invoice.customer.some((customer) =>
            customer.email.ilike(`%${query}%`),
          ),
          invoice.customer.some((customer) =>
            customer.name.ilike(`%${query}%`),
          ),
          invoice.status.ilike(`%${query}%`),
        ),
      );
    }

    for (const filter of filters) {
      switch (filter.id) {
        case "date": {
          const { from, to } = filter.value;
          invoices = invoices.where((invoice) =>
            to
              ? and(
                  invoice.date.gte(from.toTemporalInstant()),
                  invoice.date.lte(endOfDay(to).toTemporalInstant()),
                )
              : invoice.date.gte(from.toTemporalInstant()),
          );
          break;
        }
        case "amount": {
          const [min, max] = filter.value;
          invoices = invoices.where((invoice) =>
            and(invoice.amount.gte(min), invoice.amount.lte(max)),
          );
          break;
        }
        case "status":
          invoices = invoices.where((invoice) =>
            invoice.status.in(filter.value),
          );
          break;

        case "customer_name":
          invoices = invoices.where((invoice) =>
            invoice.customer.some((customer) =>
              customer.name.ilike(`%${filter.value}%`),
            ),
          );
          break;

        case "customer_email":
          invoices = invoices.where((invoice) =>
            invoice.customer.some((customer) =>
              customer.email.ilike(`%${filter.value}%`),
            ),
          );
          break;
      }
    }

    const [data, { total }] = await Promise.all([
      invoices
        .orderBy([
          (invoice) => invoice.createdAt.desc(),
          (invoice) => invoice.id.desc(),
        ])
        .limit(pageSize)
        .offset(pageIndex * pageSize)
        .select("id", "amount", "date", "status")
        .include("customer", (customer) =>
          customer.select("name", "email", "imageUrl"),
        )
        .all(),
      invoices.aggregate((a) => ({ total: a.count() })),
    ]);

    return {
      total,
      data: data.map((invoice) => ({
        ...invoice,
        date: invoice.date.toLocaleString(),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch invoices!");
  }
}

export type TInvoice = Awaited<ReturnType<typeof fetchInvoices>>;

export type TInvoiceData = TInvoice["data"][number];
