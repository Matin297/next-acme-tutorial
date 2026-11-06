import * as z from "zod";

export const emailSchema = z.email().trim().toLowerCase();

export const credentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Must be at least 6 character"),
  callbackUrl: z.string().optional(),
});

export type TCredentials = z.infer<typeof credentialsSchema>;

export const signupBaseSchema = z.object({
  email: emailSchema,
  name: z.string().min(2, "Must be at least 2 characters").trim(),
  password: z
    .string()
    .min(8, "Must be at least 8 character")
    .regex(/[a-zA-Z]/, { error: "Must contain at least one letter." })
    .regex(/[0-9]/, { error: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    }),
});

export const signupSchema = signupBaseSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignup = z.infer<typeof signupSchema>;

export type AccountAvailabilityStatus =
  | "available"
  | "unavailable"
  | "invalid"
  | "rate_limited"
  | "error";
