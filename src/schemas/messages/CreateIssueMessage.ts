import * as v from "valibot";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";

export const CreateIssueMessage = v.object({
  type: v.literal(HandlerMapEnum.CREATE_ISSUE),
  data: v.object({
    title: v.string(),
    description: v.string(),
    projectId: v.string(),
    print: v.string(),
    href: v.string(),
    tags: v.optional(v.array(v.string())),
  }),
});

export type CreateIssueMessage = v.InferOutput<typeof CreateIssueMessage>;
