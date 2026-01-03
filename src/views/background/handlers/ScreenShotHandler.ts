import { ScreenshotMessage } from "@/schemas/messages/ScreenshotMessage";
import { parseAsync } from "valibot";

export async function ScreenShotHandler(message: unknown) {
  await parseAsync(ScreenshotMessage, message);

  const screenshot = await chrome.tabs.captureVisibleTab({ format: "png" });

  return { screenshot };
}
