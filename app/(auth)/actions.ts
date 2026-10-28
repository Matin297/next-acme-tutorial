"use server";

import { AuthError } from "next-auth";
import * as auth from "@/auth";
import type { TCredentials } from "./types";

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
