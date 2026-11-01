"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import PasswordController from "@/components/password-controller";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signUp } from "../../actions";
import { signupSchema, type TSignup } from "../../types";

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmitHandler(data: TSignup) {
    const { success, error, errors } = await signUp(data);

    if (success) {
      toast.success("Signup successful! Please login to continue.");
      form.reset();
      router.push("/login");
      return;
    }

    if (error) {
      toast.error(error);
    }

    if (errors) {
      for (const [field, [message]] of Object.entries(errors)) {
        form.setError(field as keyof TSignup, {
          type: "server",
          message,
        });
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
      <FieldSet>
        <FieldLegend className="text-center mb-10">
          <h1 className="font-extrabold text-xl">SignUp</h1>
        </FieldLegend>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  disabled={field.disabled || isSubmitting}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="a@a.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  disabled={field.disabled || isSubmitting}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Jane Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <PasswordController
            name="password"
            label="Password"
            control={form.control}
            isSubmitting={isSubmitting}
          />

          <PasswordController
            name="confirmPassword"
            control={form.control}
            label="Confirm Password"
            isSubmitting={isSubmitting}
          />
        </FieldGroup>
      </FieldSet>

      <section className="flex gap-1 mt-4 justify-end">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Spinner />} Sign up
        </Button>
        <Button
          type="reset"
          variant="secondary"
          onClick={() => {
            form.reset();
          }}
        >
          Reset
        </Button>
      </section>
    </form>
  );
}
