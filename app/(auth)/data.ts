import bcrypt from "bcrypt";
import { db } from "@/lib/prisma/db";

export async function fetchUser(email: string, password: string) {
  try {
    const user = await db.orm.public.User.where({ email }).first();
    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;
    return user;
  } catch (error) {
    console.error("Authentication lookup failed:", error);

    throw new Error("Authentication failed", {
      cause: error,
    });
  }
}
