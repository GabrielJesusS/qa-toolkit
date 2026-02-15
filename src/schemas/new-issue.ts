import * as v from "valibot";

export const NewIssueSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty("Title is required"),
    v.maxLength(255, "Title must be at most 255 characters"),
  ),
  project: v.pipe(v.string(), v.nonEmpty("Project is required")),
  description: v.pipe(
    v.string(),
    v.nonEmpty("Description is required"),
    v.maxLength(512, "Description must be at most 512 characters"),
  ),
  tags: v.array(v.string()),
  assigned: v.optional(v.number()),
});

export type NewIssueSchema = v.InferOutput<typeof NewIssueSchema>;
