import * as v from "valibot";

export const AppConfigSchema = v.object({
  setup: v.boolean(),
  provider: v.string(),
});

export type AppConfigSchema = v.InferOutput<typeof AppConfigSchema>;
