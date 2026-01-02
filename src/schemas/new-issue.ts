import * as v from "valibot";

export const NewIssueSchema = v.object({
  title: v.string(),
});

export type NewIssueSchema = v.InferOutput<typeof NewIssueSchema>;
