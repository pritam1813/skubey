import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_EXCHANGE_RATE_API_KEY: z.string(),
  NEXT_PUBLIC_EXCHANGE_RATE_BASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
