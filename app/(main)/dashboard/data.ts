import { db } from "@/lib/prisma/db";

export async function fetchRevenue() {
  try {
    const data = db.orm.public.Revenue.select("month", "revenue").all();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export type TRevenues = Awaited<ReturnType<typeof fetchRevenue>>;

export async function fetchLatestInvoices(limit: number) {
  try {
    const data = await db.orm.public.Invoice.orderBy((invoice) =>
      invoice.date.desc(),
    )
      .limit(limit)
      .include("customer", (customer) =>
        customer.select("name", "imageUrl", "email"),
      )
      .select("amount", "id")
      .all();
    return {
      data,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Invloices data.");
  }
}

export type TLatestInvoices = Awaited<
  ReturnType<typeof fetchLatestInvoices>
>["data"];
