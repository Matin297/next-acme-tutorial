import { db } from "@/lib/prisma/db";

export async function GET() {
  try {
    const customers = await db.orm.public.Customer.all();
    return Response.json({ customers });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
