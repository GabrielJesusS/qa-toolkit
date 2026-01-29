import * as v from "valibot";

export const AppConfigSchema = v.object({
  setup: v.boolean(),
  provider: v.string(),
  validSession: v.optional(v.boolean()),
  sendNetwork: v.optional(v.boolean()),
  urlTrack: v.optional(v.string()),
});

export type AppConfigSchema = v.InferOutput<typeof AppConfigSchema>;
