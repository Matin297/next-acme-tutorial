"use server";

import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import * as z from "zod";
import * as auth from "@/auth";
import { isUniqueConstraintViolation } from "@/lib/error";
import { db } from "@/lib/prisma/db";
import { signupBaseSchema, type TCredentials, type TSignup } from "./types";

export async function authenticate(payload: TCredentials) {
  try {
    await auth.signIn("credentials", payload);
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signOut() {
  await auth.signOut({ redirectTo: "/login" });
}

export async function signUp(payload: TSignup) {
  const { success, data, error } = signupBaseSchema.safeParse(payload);

  if (!success) {
    return {
      success: false,
      errors: z.flattenError(error).fieldErrors,
    };
  }

  const { name, email, password } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.orm.public.User.create({
      email,
      name,
      password: hashedPassword,
    });
  } catch (error) {
    console.error(error);

    if (isUniqueConstraintViolation(error)) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    return {
      success: false,
      error: "Unable to create your account. Please try again.",
    };
  }

  return {
    success: true,
  };
}
