import * as v from "valibot";

export const TaigaAuthSchema = v.object({
  token: v.string(),
  refresh: v.string(),
});

export type TaigaAuthSchema = v.InferOutput<typeof TaigaAuthSchema>;
