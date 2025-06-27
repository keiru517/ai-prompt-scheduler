// config.ts
import { match } from "ts-pattern";
import { z } from "zod";

const WorldSchema = z.enum(["local", "dev", "prd"]);
export type World = z.infer<typeof WorldSchema>;

const EnvSchema = z.object({
  NEXT_PUBLIC_WORLD: WorldSchema,
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});
export type Env = z.infer<typeof EnvSchema>;

export interface AppConfig {
  appTitle: string;
  apiBaseUrl: string;
}

function generateAppConfig(): AppConfig {
  const env = EnvSchema.parse({
    NEXT_PUBLIC_WORLD: process.env.NEXT_PUBLIC_WORLD,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  return match(env.NEXT_PUBLIC_WORLD)
    .with("local", () => ({
      appTitle: "AI Prompt Scheduler local",
      apiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
    }))
    .with("dev", () => ({
      appTitle: "AI Prompt Scheduler",
      apiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
    }))
    .with("prd", () => ({
      appTitle: "AI Prompt Scheduler",
      apiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
    }))
    .exhaustive();
}

export const appConfig = generateAppConfig();
