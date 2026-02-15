import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { ScreenshotSchema } from "@/schemas/screenshot";
import { sleep } from "@/utils/sleep";
import { parseAsync } from "valibot";
import { ref } from "vue";
import { useSnackbar } from "./useSnackbar";
import { ScreenshotDataSchema } from "@/schemas/screenshot-data";

type ScreenshotState = ScreenshotDataSchema | null;

export function useScreenshot() {
  const { notify } = useSnackbar();

  const screenshotState = ref<ScreenshotState>(null);

  const isLoading = ref<boolean>(false);

  const isTaking = ref<boolean>(false);

  async function takeScreenshot() {
    try {
      isLoading.value = true;

      await sleep(500);

      isTaking.value = true;

      const result = await browserClient.sendMessage({
        type: HandlerMapEnum.TAKE_SCREENSHOT,
        data: {},
      });

      await sleep(100);

      isTaking.value = false;

      await sleep(200);

      const parsed = await parseAsync(ScreenshotSchema, result);

      screenshotState.value = {
        location: window.location.href,
        screenshot: parsed.screenshot,
      };
    } catch (error) {
      notify("Failed to take screenshot.", "error");
    } finally {
      isLoading.value = false;
      isTaking.value = false;
    }
  }

  async function clearScreenshot() {
    screenshotState.value = null;
  }

  return {
    screenshotState,
    isLoading,
    isTaking,
    takeScreenshot,
    clearScreenshot,
  };
}
