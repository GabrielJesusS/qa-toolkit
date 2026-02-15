import * as v from "valibot";

export const TaigaTagsSchema = v.record(
  v.pipe(v.string()),
  v.nullable(v.pipe(v.string())),
);

export type TaigaTagsSchema = v.InferOutput<typeof TaigaTagsSchema>;
