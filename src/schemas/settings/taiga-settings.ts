import * as v from "valibot";

export const TaigaSettingsSchema = v.object({
  defaultProjectId: v.pipe(v.string(), v.trim()),
  defaultProjectName: v.pipe(v.string(), v.trim()),
});

export type TaigaSettingsSchema = v.InferOutput<typeof TaigaSettingsSchema>;
