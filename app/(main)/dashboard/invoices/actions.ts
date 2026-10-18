"use server";

import { updateTag } from "next/cache";
import * as z from "zod";
import { db } from "@/lib/prisma/db";
import { createInvoiceSchema, type TCreateInvoice } from "./types";

export async function createInvoice(payload: TCreateInvoice) {
  const { success, data, error } = createInvoiceSchema.safeParse(payload);

  if (!success) {
    return {
      success: false,
      errors: z.flattenError(error).fieldErrors,
    };
  }

  try {
    await db.orm.public.Invoice.create({
      ...data,
      date: data.date.toTemporalInstant(),
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to create the invoice. Try again later.",
    };
  }

  updateTag("latest-invoices");
  updateTag("dashboard-stats");

  return {
    success: true,
  };
}

export async function editInvoice(id: string, payload: TCreateInvoice) {
  const { success, data, error } = createInvoiceSchema.safeParse(payload);

  if (!success) {
    return {
      success: false,
      errors: z.flattenError(error).fieldErrors,
    };
  }

  try {
    await db.orm.public.Invoice.where({ id }).update({
      ...data,
      date: data.date.toTemporalInstant(),
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update the invoice. Try again please.",
    };
  }

  updateTag("latest-invoices");
  updateTag(`invoice-${id}`);

  return {
    success: true,
  };
}

export async function deleteInvoice(id: string) {
  try {
    await db.orm.public.Invoice.where({ id }).delete();
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete the invoice",
    };
  }

  updateTag("latest-invoices");
  updateTag("dashboard-stats");

  return {
    success: true,
  };
}
