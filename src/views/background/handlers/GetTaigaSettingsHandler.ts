import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { BaseMessage } from "@/schemas/base-message";
import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";
import { parseAsync } from "valibot";

export async function GetTaigaSettingsHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  const taigaSettings = await StorageController.get(
    StorageKeyEnum.TAIGA_SETTINGS,
    TaigaSettingsSchema
  );

  return taigaSettings;
}
