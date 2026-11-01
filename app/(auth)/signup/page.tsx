import LinkButton from "@/components/link-button";
import SignupForm from "./_components/form";

export default function SignupPage() {
  return (
    <section>
      <SignupForm />
      <section className="flex items-center justify-center gap-1 mt-4">
        <p>Already have an account?</p>
        <LinkButton size="xs" href="/login">
          Log in
        </LinkButton>
      </section>
    </section>
  );
}
