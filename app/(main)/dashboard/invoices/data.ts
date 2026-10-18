import { and, or } from "@prisma/orm-postgres/orm-client";
import { endOfDay } from "date-fns";
import { cacheTag } from "next/cache";
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
        case "updatedAt": {
          const { from, to } = filter.value;
          invoices = invoices.where((invoice) =>
            to
              ? and(
                  invoice.updatedAt.gte(from.toTemporalInstant()),
                  invoice.updatedAt.lte(endOfDay(to).toTemporalInstant()),
                )
              : invoice.updatedAt.gte(from.toTemporalInstant()),
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
          (invoice) => invoice.updatedAt.desc(),
          (invoice) => invoice.id.desc(),
        ])
        .limit(pageSize)
        .offset(pageIndex * pageSize)
        .select("id", "amount", "date", "status", "updatedAt")
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
        updatedAt: invoice.updatedAt.toLocaleString(),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch invoices!");
  }
}

export type TInvoice = Awaited<ReturnType<typeof fetchInvoices>>;

export type TInvoiceData = TInvoice["data"][number];

export async function fetchInvoiceById(id: string) {
  "use cache";

  cacheTag(`invoice-${id}`);

  try {
    const invoice = await db.orm.public.Invoice.where({ id })
      .select("amount", "customerId", "date", "status", "id")
      .first();

    if (!invoice) {
      return null;
    }

    return {
      ...invoice,
      date: invoice?.date.toLocaleString(),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch the invoice.");
  }
}

export type TInvoiceById = Awaited<ReturnType<typeof fetchInvoiceById>>;

const customerOptions = db.raw.sql`
  SELECT
    "id" AS "value",
    "name" AS "label"
  FROM "customer"
`
  .returnsRow({
    value: db.sql.public.customer.columns.id,
    label: db.sql.public.customer.columns.name,
  })
  .build();

export async function fetchCustomerOptions() {
  "use cache";

  cacheTag("customers-options");

  try {
    const options = await db.runtime().query(customerOptions);
    return options;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch customer options!");
  }
}

export type TCustomers = Awaited<ReturnType<typeof fetchCustomerOptions>>;
