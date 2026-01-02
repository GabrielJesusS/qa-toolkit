import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { TaigaSignInMessage } from "@/schemas/messages/TaigaSignInMessage";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function TaigaSignInHandler(message: unknown) {
  const parsedMessage = await parseAsync(TaigaSignInMessage, message);

  const taigaService = new TaigaService();

  await taigaService.signIn(
    parsedMessage.data.email,
    parsedMessage.data.password
  );

  await StorageController.set(StorageKeyEnum.PROVIDER_SETUP, {
    provider: "taiga",
    setup: true,
  });
}
