import * as z from "zod";

export const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Must be at least 6 character"),
  callbackUrl: z.string().optional(),
});

export type TCredentials = z.infer<typeof credentialsSchema>;

export const signupBaseSchema = z.object({
  email: z.email().trim(),
  name: z.string().min(2, "Must be at least 2 characters").trim(),
  password: z.string().min(6, "Must be at least 6 character"),
});

export const signupSchema = signupBaseSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignup = z.infer<typeof signupSchema>;
