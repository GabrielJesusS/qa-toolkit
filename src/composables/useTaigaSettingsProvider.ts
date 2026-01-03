import { TaigaConfigCTXKey } from "@/contexts/TaigaConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";
import { safeParseAsync } from "valibot";
import { onMounted, provide, ref } from "vue";

const getSettings = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_TAIGA_SETTINGS,
  });

  const parsed = await safeParseAsync(TaigaSettingsSchema, result);

  if (!parsed.success) {
    console.error("Failed to parse Taiga settings:", parsed.issues);
    return null;
  }

  return parsed.output;
};

const setSettings = async (settings: TaigaSettingsSchema) => {
  await browserClient.sendMessage({
    type: HandlerMapEnum.SAVE_TAIGA_SETTINGS,
    data: settings,
  });
};

export const useTaigaSettingsProvider = () => {
  const taigaSettings = ref<TaigaSettingsSchema>({
    defaultProjectId: "",
    defaultProjectName: "",
  });

  onMounted(async () => {
    const result = await getSettings();

    if (result) {
      taigaSettings.value = result;
    }
  });

  provide(TaigaConfigCTXKey, {
    settings: taigaSettings,
    setSettings,
  });

  return {
    taigaSettings,
  };
};
