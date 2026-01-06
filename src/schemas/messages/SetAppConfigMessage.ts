import * as v from "valibot";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { AppConfigSchema } from "../settings/app-config";

export const SetAppConfigMessage = v.object({
  type: v.literal(HandlerMapEnum.SET_APP_CONFIG),
  data: AppConfigSchema,
});

export type SetAppConfigMessage = v.InferOutput<typeof SetAppConfigMessage>;
