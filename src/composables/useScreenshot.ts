import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { ScreenshotSchema } from "@/schemas/screenshot";
import { sleep } from "@/utils/sleep";
import { parseAsync } from "valibot";
import { ref } from "vue";
import { useSnackbar } from "./useSnackbar";

type ScreenshotState = {
  image: string | null;
  isLoading: boolean;
};

export function useScreenshot() {
  const { notify } = useSnackbar();

  const screenshotState = ref<ScreenshotState>({
    image: null,
    isLoading: false,
  });

  async function takeScreenshot() {
    try {
      screenshotState.value.isLoading = true;

      await sleep(500);

      const result = await browserClient.sendMessage({
        type: HandlerMapEnum.TAKE_SCREENSHOT,
        data: {},
      });

      await sleep(500);

      const parsed = await parseAsync(ScreenshotSchema, result);

      screenshotState.value.image = parsed.screenshot;
    } catch (error) {
      notify("Failed to take screenshot.", "error");
    } finally {
      screenshotState.value.isLoading = false;
    }
  }

  async function clearScreenshot() {
    screenshotState.value.image = null;
  }

  return {
    screenshotState,
    takeScreenshot,
    clearScreenshot,
  };
}
