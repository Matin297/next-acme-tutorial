import * as z from "zod";

export const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Must be at least 6 character"),
  callbackUrl: z.string().optional(),
});

export type TCredentials = z.infer<typeof credentialsSchema>;
