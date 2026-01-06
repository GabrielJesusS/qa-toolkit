import { TaigaConfigCTXKey } from "@/contexts/TaigaConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";
import { safeParseAsync } from "valibot";
import { onMounted, provide, ref, watch } from "vue";

type SetterValue =
  | TaigaSettingsSchema
  | ((oldConfig: TaigaSettingsSchema) => TaigaSettingsSchema);

const getSettings = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_TAIGA_SETTINGS,
  });

  const parsed = await safeParseAsync(TaigaSettingsSchema, result);

  if (!parsed.success) {
    console.error("Failed to parse Taiga settings:", parsed.issues);
    return {
      defaultProjectId: "",
      defaultProjectName: "",
    };
  }

  return parsed.output;
};

export const useTaigaSettingsProvider = () => {
  const hasLoadedData = ref(false);

  const taigaSettings = ref<TaigaSettingsSchema>({
    defaultProjectId: "",
    defaultProjectName: "",
  });

  const setSettings = async (value: SetterValue) => {
    if (typeof value === "function") {
      taigaSettings.value = value(taigaSettings.value);
      return;
    }

    taigaSettings.value = value;
  };

  onMounted(async () => {
    if (!hasLoadedData.value) {
      taigaSettings.value = await getSettings();
    }

    chrome.storage.local.onChanged.addListener(async (content) => {
      if (content[StorageKeyEnum.TAIGA_SETTINGS]) {
        hasLoadedData.value = false;
        taigaSettings.value = await getSettings();
      }
    });
  });

  watch(taigaSettings, async (newSettings) => {
    if (hasLoadedData.value) {
      await browserClient.sendMessage({
        type: HandlerMapEnum.SAVE_TAIGA_SETTINGS,
        data: newSettings,
      });
      return;
    }

    hasLoadedData.value = true;
  });

  provide(TaigaConfigCTXKey, {
    settings: taigaSettings,
    setSettings,
  });

  return {
    taigaSettings,
  };
};
