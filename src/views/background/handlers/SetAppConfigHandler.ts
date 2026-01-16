import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { SetAppConfigMessage } from "@/schemas/messages/SetAppConfigMessage";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { parseAsync } from "valibot";

export async function SetAppConfigHandler(message: unknown) {
  const parsedMessage = await parseAsync(SetAppConfigMessage, message);

  try {
    const currentConfig = await StorageController.get(
      StorageKeyEnum.APP_CONFIG,
      AppConfigSchema
    );

    await StorageController.set(StorageKeyEnum.APP_CONFIG, {
      ...currentConfig,
      ...parsedMessage.data,
    });
  } catch (error) {
    await StorageController.set(StorageKeyEnum.APP_CONFIG, {
      ...parsedMessage.data,
    });
  }
}
