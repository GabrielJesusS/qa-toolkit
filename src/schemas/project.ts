import * as v from "valibot";

export const ProjectSchema = v.object({
  id: v.string(),
  name: v.string(),
});

export const ProjectsSchema = v.array(ProjectSchema);

export type ProjectSchema = v.InferOutput<typeof ProjectSchema>;

export type ProjectsSchema = v.InferOutput<typeof ProjectsSchema>;
