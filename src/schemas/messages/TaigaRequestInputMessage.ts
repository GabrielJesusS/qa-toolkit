import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import * as v from "valibot";

export const TaigaRequestInputMessage = v.object({
  type: v.literal(HandlerMapEnum.GET_TAIGA_TAGS),
  data: v.object({
    projectId: v.number(),
  }),
});

export type TaigaRequestInputMessage = v.InferOutput<
  typeof TaigaRequestInputMessage
>;
