import { ConfigCTXKey } from "@/contexts/ConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { parseAsync } from "valibot";
import { onMounted, provide, ref, watch } from "vue";

type SetterValue =
  | AppConfigSchema
  | ((oldConfig: AppConfigSchema) => AppConfigSchema);

const check = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_APP_CONFIG,
  });

  const parsed = await parseAsync(AppConfigSchema, result);

  return parsed;
};

export function useConfigProvider() {
  const hasLoaded = ref(false);

  const appConfig = ref<AppConfigSchema>({
    setup: false,
    sendNetwork: false,
    provider: "",
  });

  function setConfig(value: SetterValue) {
    if (typeof value === "function") {
      appConfig.value = value(appConfig.value);
      return;
    }

    appConfig.value = value;
  }

  function resetSetup() {
    setConfig({ setup: false, provider: "" });
  }

  watch(appConfig, async (newConfig) => {
    if (hasLoaded.value) {
      await browserClient.sendMessage({
        type: HandlerMapEnum.SET_APP_CONFIG,
        data: newConfig,
      });
      return;
    }

    hasLoaded.value = true;
  });

  onMounted(async () => {
    if (!hasLoaded.value) {
      appConfig.value = await check();
    }
  });

  provide(ConfigCTXKey, {
    config: appConfig,
    resetSetup,
    setConfig,
  });

  return {
    hasLoaded,
  };
}
