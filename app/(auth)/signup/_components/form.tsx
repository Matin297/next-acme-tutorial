"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import PasswordController from "@/components/password-controller";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { signUp } from "../../actions";
import { signupSchema, type TSignup } from "../../types";
import { useAccountAvailability } from "../use-account-availability";

const FORM_ERROR_TYPES = {
  AVAILABILITY: "availability",
};

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

  const accountAvailability = useAccountAvailability({
    handleUnavailable: (message) => {
      form.setError("email", {
        message,
        type: FORM_ERROR_TYPES.AVAILABILITY,
      });
    },
    handleAvailable: () => {
      if (
        form.getFieldState("email").error?.type ===
        FORM_ERROR_TYPES.AVAILABILITY
      ) {
        form.clearErrors("email");
      }
    },
  });

  async function handlerFormSubmit(data: TSignup) {
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

  function handlerFormReset() {
    accountAvailability.reset();
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(handlerFormSubmit)}>
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
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      accountAvailability.handleChange(e.target.value);
                    }}
                    onBlur={() => {
                      field.onBlur();
                      accountAvailability.flush();
                    }}
                    disabled={field.disabled || isSubmitting}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="a@a.com"
                  />
                  <InputGroupAddon align="inline-end">
                    {accountAvailability.statusIcon}
                  </InputGroupAddon>
                </InputGroup>
                {accountAvailability.statusText && (
                  <FieldDescription aria-live="polite">
                    {accountAvailability.statusText}
                  </FieldDescription>
                )}
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
        <Button
          disabled={isSubmitting || accountAvailability.isPending}
          type="submit"
        >
          {isSubmitting && <Spinner />} Sign up
        </Button>
        <Button type="reset" variant="secondary" onClick={handlerFormReset}>
          Reset
        </Button>
      </section>
    </form>
  );
}
