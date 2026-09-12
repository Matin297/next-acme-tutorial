import { customers, invoices, revenue, users } from "../placeholder-data";
import { db } from "./db";

async function main() {
  await db.orm.public.User.createAll(users);
  await db.orm.public.Customer.createAll(customers);
  await db.orm.public.Revenue.createAll(revenue);
  await db.orm.public.Invoice.createAll(invoices);

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.runtime().close();
  });
