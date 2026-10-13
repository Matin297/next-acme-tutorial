import { cacheTag } from "next/cache";
import { db } from "@/lib/prisma/db";

export async function fetchRevenue() {
  "use cache";

  cacheTag("revenue");

  try {
    const data = await db.orm.public.Revenue.select("month", "revenue").all();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export type TRevenues = Awaited<ReturnType<typeof fetchRevenue>>;

export async function fetchLatestInvoices(limit: number) {
  "use cache";

  cacheTag("latest-invoices");

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
    throw new Error("Failed to fetch Invoices data.");
  }
}

export async function fetchDashboardStats() {
  "use cache";

  cacheTag("dashboard-stats");

  try {
    const invoicesStatsQuery = db.orm.public.Invoice.groupBy(
      "status",
    ).aggregate((invoices) => ({
      amount: invoices.sum("amount"),
      count: invoices.count(),
    }));

    const customersStatsQuery = await db.orm.public.Customer.aggregate(
      (customers) => ({ total: customers.count() }),
    );

    const [invoicesStats, customersStats] = await Promise.all([
      invoicesStatsQuery,
      customersStatsQuery,
    ]);

    return {
      invoices: {
        total: invoicesStats.reduce((count, stat) => count + stat.count, 0),
        collected:
          invoicesStats.find(({ status }) => status === "paid")?.amount ?? 0,
        pending:
          invoicesStats.find(({ status }) => status === "pending")?.amount ?? 0,
      },
      customers: {
        total: customersStats.total,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dashboard stats.");
  }
}
