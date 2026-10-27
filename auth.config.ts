import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchUser } from "@/app/(auth)/data";
import { credentialsSchema } from "@/app/(auth)/types";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { success, data } = credentialsSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const user = await fetchUser(data.email, data.password);
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");
      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
