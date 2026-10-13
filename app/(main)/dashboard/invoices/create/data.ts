import { cacheTag } from "next/cache";
import { db } from "@/lib/prisma/db";

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
