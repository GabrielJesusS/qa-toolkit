import { ConfigCTXKey } from "@/contexts/ConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { parseAsync } from "valibot";
import { onMounted, provide, ref } from "vue";

const check = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_APP_CONFIG,
  });

  const parsed = await parseAsync(AppConfigSchema, result);

  return parsed;
};

export function useConfigProvider() {
  const hasLoaded = ref(false);

  const appConfig = ref({
    setup: false,
    provider: "",
  });

  function resetSetup() {
    appConfig.value = { setup: false, provider: "" };
  }

  onMounted(async () => {
    if (!hasLoaded.value) {
      appConfig.value = await check();
      hasLoaded.value = true;
    }
  });

  appConfig;

  provide(ConfigCTXKey, {
    config: appConfig,
    resetSetup,
  });

  return {
    hasLoaded,
  };
}
