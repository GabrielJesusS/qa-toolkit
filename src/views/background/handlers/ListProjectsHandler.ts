import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { BaseMessage } from "@/schemas/base-message";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function ListProjectsHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  const appConfig = await StorageController.get(
    StorageKeyEnum.APP_CONFIG,
    AppConfigSchema
  );

  if (appConfig.provider === "taiga") {
    const taigaService = new TaigaService();

    const projects = await taigaService.listProjects();

    return projects;
  }
}
