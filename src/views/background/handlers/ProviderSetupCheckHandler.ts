import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { BaseMessage } from "@/schemas/base-message";
import { ProviderSetupSchema } from "@/schemas/provider-setup";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

const FALLBACK = {
  setup: false,
  provider: "",
};

export async function ProviderSetupCheckHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  try {
    const providerSetup = await StorageController.get(
      StorageKeyEnum.PROVIDER_SETUP,
      ProviderSetupSchema
    );

    if (providerSetup.provider === "taiga") {
      const taigaService = new TaigaService();

      const result = await taigaService.checkLogin();

      if (!result) {
        await StorageController.remove(StorageKeyEnum.PROVIDER_SETUP);
        return FALLBACK;
      }
    }

    return providerSetup;
  } catch (error) {
    console.error("Provider setup check failed:", error);

    return FALLBACK;
  }
}
