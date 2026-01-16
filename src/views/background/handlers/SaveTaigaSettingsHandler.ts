import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { TaigaSettingsMessage } from "@/schemas/messages/TaigaSettingsMessage";
import { parseAsync } from "valibot";

export async function SaveTaigaSettingsHandler(message: unknown) {
  const parsedMessage = await parseAsync(TaigaSettingsMessage, message);

  await StorageController.set(
    StorageKeyEnum.TAIGA_SETTINGS,
    parsedMessage.data
  );
}
