import * as v from "valibot";

export const BaseMessage = v.object({
  type: v.string(),
  data: v.optional(v.unknown()),
});

export type BaseMessage = v.InferOutput<typeof BaseMessage>;
