"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type PasswordControllerProps<T extends FieldValues> = {
  isSubmitting: boolean;
  label: string;
} & Omit<ControllerProps<T>, "render">;

export default function PasswordController<T extends FieldValues>({
  label,
  isSubmitting,
  ...controllerProps
}: PasswordControllerProps<T>) {
  const id = useId();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              {...field}
              disabled={field.disabled || isSubmitting}
              aria-invalid={fieldState.invalid}
              id={id}
              type={passwordVisible ? "text" : "password"}
              placeholder="xxxxxx"
            />
            <InputGroupAddon align="inline-end">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full"
                disabled={field.disabled || isSubmitting}
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
