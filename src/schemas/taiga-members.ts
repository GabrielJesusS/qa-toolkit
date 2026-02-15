import * as v from "valibot";

export const TaigaMembersSchema = v.array(
  v.object({
    id: v.number(),
    full_name: v.string(),
  }),
);

export type TaigaMembersSchema = v.InferOutput<typeof TaigaMembersSchema>;
