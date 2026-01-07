import { ScreenshotMessage } from "@/schemas/messages/ScreenshotMessage";
import { parseAsync } from "valibot";

export async function ScreenShotHandler(message: unknown) {
  await parseAsync(ScreenshotMessage, message);

  const screenshot = await chrome.tabs.captureVisibleTab({
    format: "jpeg",
    quality: 50,
  });

  return { screenshot };
}
