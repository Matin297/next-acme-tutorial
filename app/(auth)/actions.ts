"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import type { TCredentials } from "./types";

export async function authenticate(payload: TCredentials) {
  try {
    await signIn("credentials", payload);
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
