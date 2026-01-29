import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { BaseMessage } from "@/schemas/base-message";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

const DEFAULT_SETTINGS: AppConfigSchema = {
  setup: false,
  provider: "",
};

export async function GetAppConfigHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  try {
    const appConfig = await StorageController.get(
      StorageKeyEnum.APP_CONFIG,
      AppConfigSchema,
    );

    if (appConfig.provider === "taiga") {
      const taigaService = new TaigaService();

      const result = await taigaService.checkLogin();

      return {
        ...DEFAULT_SETTINGS,
        ...appConfig,
        validSession: result === "active",
        setup: result !== "invalid" && result !== "inactive",
      };
    }

    return { ...DEFAULT_SETTINGS, ...appConfig };
  } catch (error) {
    await StorageController.set(
      StorageKeyEnum.APP_CONFIG,
      structuredClone(DEFAULT_SETTINGS),
    );

    return structuredClone(DEFAULT_SETTINGS);
  }
}
