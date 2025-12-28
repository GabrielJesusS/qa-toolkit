import * as v from "valibot";

export const BaseResponse = v.object({
  ok: v.boolean(),
  error: v.optional(v.string()),
  data: v.optional(v.unknown()),
});

export type BaseResponse = v.InferOutput<typeof BaseResponse>;

