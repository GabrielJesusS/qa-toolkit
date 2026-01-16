import * as v from "valibot";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaSettingsSchema } from "../settings/taiga-settings";

export const TaigaSettingsMessage = v.object({
  type: v.literal(HandlerMapEnum.SAVE_TAIGA_SETTINGS),
  data: TaigaSettingsSchema,
});

export type TaigaSettingsMessage = v.InferOutput<typeof TaigaSettingsMessage>;
