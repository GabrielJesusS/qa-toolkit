import * as v from "valibot";

export const ProviderSetupSchema = v.object({
  setup: v.boolean(),
  provider: v.string(),
});

export type ProviderSetupSchema = v.InferOutput<typeof ProviderSetupSchema>;