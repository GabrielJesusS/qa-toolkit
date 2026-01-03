import * as v from "valibot";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";

export const ScreenshotMessage = v.object({
  type: v.literal(HandlerMapEnum.TAKE_SCREENSHOT),
  // For future crop implementation
  data: v.object({}),

  // TODO: Implement options like full page, delay, etc.
});

export type ScreenshotMessage = v.InferOutput<typeof ScreenshotMessage>;
