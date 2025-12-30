import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { TaigaSignInMessage } from "@/schemas/messages/TaigaSignInMessage";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function TaigaSignInHandler(message: unknown) {
  const parsedMessage = await parseAsync(TaigaSignInMessage, message);

  const taigaService = new TaigaService();

  const result = await taigaService.signIn(
    parsedMessage.data.email,
    parsedMessage.data.password
  );

  await chrome.storage.local.set({
    [TaigaService.tokenKey]: result.auth_token,
  });
  await chrome.storage.local.set({
    [TaigaService.refreshTokenKey]: result.refresh,
  });

  await chrome.storage.local.set({
    [StorageKeyEnum.PROVIDER_SETUP]: {
      provider: "taiga",
      setup: true,
    },
  });
}
