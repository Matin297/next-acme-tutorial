import { Suspense } from "react";
import LinkButton from "@/components/link-button";
import LoginForm from "./_components/form";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
      <section className="flex items-center justify-center gap-1 mt-4">
        <p>Don't have an account?</p>
        <LinkButton size="xs" href="/signup">
          Sign up
        </LinkButton>
      </section>
    </Suspense>
  );
}
