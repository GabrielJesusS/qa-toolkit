import * as v from "valibot";

export const IssueResultSchema = v.object({
  url: v.pipe(v.string()),
});

export type IssueResultSchema = v.InferOutput<typeof IssueResultSchema>;
