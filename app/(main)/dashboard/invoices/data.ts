import { and, or } from "@prisma/orm-postgres/orm-client";
import * as z from "zod";
import { db } from "@/lib/prisma/db";
import type { InvoiceStatus } from "@/lib/prisma/utility-types";

export const filtersSchema = z.array(
  z.discriminatedUnion("id", [
    z.object({
      id: z.literal("status"),
      value: z.array(z.enum(["paid", "pending"] satisfies InvoiceStatus[])),
    }),
    z.object({
      id: z.literal("customer_name"),
      value: z.string(),
    }),
    z.object({
      id: z.literal("customer_email"),
      value: z.string(),
    }),
    z.object({
      id: z.literal("amount"),
      value: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
      }),
    }),
  ]),
);

type TInvoiceFilters = z.infer<typeof filtersSchema>;

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
        case "amount":
          invoices = invoices.where((invoice) =>
            and(
              invoice.amount.gte(filter.value.min ?? 0),
              invoice.amount.lte(filter.value.max ?? Infinity),
            ),
          );
          break;
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
