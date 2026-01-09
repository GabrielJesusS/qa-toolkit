import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";

const DEFAULT_SETTINGS: TaigaSettingsSchema = {
  defaultProjectId: "",
  defaultProjectName: "",
};

export async function GetTaigaSettingsHandler(message: unknown) {
  try {
    const taigaSettings = await StorageController.get(
      StorageKeyEnum.TAIGA_SETTINGS,
      TaigaSettingsSchema
    );

    return taigaSettings;
  } catch (error) {
    await StorageController.set(
      StorageKeyEnum.TAIGA_SETTINGS,
      structuredClone(DEFAULT_SETTINGS)
    );

    return structuredClone(DEFAULT_SETTINGS);
  }
}
