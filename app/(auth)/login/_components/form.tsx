"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { authenticate } from "../../actions";
import { credentialsSchema, type TCredentials } from "../../types";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const form = useForm<TCredentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      callbackUrl,
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TCredentials) {
    console.log(data);
    const result = await authenticate(data);
    if (result) {
      toast.error(result);
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("callbackUrl")} type="hidden" />
      <FieldSet>
        <FieldLegend className="text-center mb-10">
          <h1 className="font-extrabold text-xl">SignIn</h1>
        </FieldLegend>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email-credential">Email</FieldLabel>
                <Input
                  {...field}
                  disabled={field.disabled || isSubmitting}
                  id="email-credential"
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
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password-credential">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    disabled={field.disabled || isSubmitting}
                    aria-invalid={fieldState.invalid}
                    id="password-credential"
                    type={passwordVisible ? "text" : "password"}
                    placeholder={passwordVisible ? "12345" : "xxxxxx"}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setPasswordVisible((prev) => !prev)}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      disabled={field.disabled || isSubmitting}
                    >
                      {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <section className="flex gap-1 mt-4 justify-end">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Spinner />} Login
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
