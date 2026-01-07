import { ConfigCTXKey } from "@/contexts/ConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { parseAsync } from "valibot";
import { onMounted, provide, ref, watch } from "vue";

type SetterValue =
  | AppConfigSchema
  | ((oldConfig: AppConfigSchema) => AppConfigSchema);

const getAppConfig = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_APP_CONFIG,
  });

  const parsed = await parseAsync(AppConfigSchema, result);

  return parsed;
};

export function useConfigProvider() {
  const isLoading = ref(true);

  const hasLoadedData = ref(false);

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
    setConfig({ setup: false, provider: "", sendNetwork: false, urlTrack: "" });
  }

  watch(appConfig, async (newConfig) => {
    if (hasLoadedData.value) {
      await browserClient.sendMessage({
        type: HandlerMapEnum.SET_APP_CONFIG,
        data: newConfig,
      });
      return;
    }

    hasLoadedData.value = true;
  });

  onMounted(async () => {
    if (!hasLoadedData.value) {
      appConfig.value = await getAppConfig();
      isLoading.value = false;
    }

    chrome.storage.local.onChanged.addListener(async (content) => {
      if (typeof content[StorageKeyEnum.APP_CONFIG] !== "undefined") {
        hasLoadedData.value = false;
        appConfig.value = await getAppConfig();
      }
    });
  });

  provide(ConfigCTXKey, {
    config: appConfig,
    resetSetup,
    setConfig,
  });

  return {
    isLoading,
  };
}
