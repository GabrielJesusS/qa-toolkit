import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { BaseMessage } from "@/schemas/base-message";
import { ProviderSetupSchema } from "@/schemas/provider-setup";
import { parseAsync } from "valibot";

const FALLBACK = {
  setup: false,
  provider: "",
};

export async function ProviderSetupCheckHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  const result = await chrome.storage.local.get(StorageKeyEnum.PROVIDER_SETUP);

  if (!result[StorageKeyEnum.PROVIDER_SETUP]) {
    return FALLBACK;
  }

  const parsedData = await parseAsync(
    ProviderSetupSchema,
    result[StorageKeyEnum.PROVIDER_SETUP]
  );

  return parsedData;
}
