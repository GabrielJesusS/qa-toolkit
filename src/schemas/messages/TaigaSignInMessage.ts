import * as v from "valibot";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaLoginSchema } from "../taiga-login";

export const TaigaSignInMessage = v.object({
  type: v.literal(HandlerMapEnum.TAIGA_SIGN_IN),
  data: TaigaLoginSchema,
});

export type TaigaSignInMessage = v.InferOutput<typeof TaigaSignInMessage>;
