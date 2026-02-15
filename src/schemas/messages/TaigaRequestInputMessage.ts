import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import * as v from "valibot";

export const TaigaRequestInputMessage = v.object({
  type: v.picklist([
    HandlerMapEnum.GET_TAIGA_TAGS,
    HandlerMapEnum.GET_TAIGA_MEMBERS,
  ]),
  data: v.object({
    projectId: v.number(),
  }),
});

export type TaigaRequestInputMessage = v.InferOutput<
  typeof TaigaRequestInputMessage
>;
