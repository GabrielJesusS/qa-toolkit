import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { BaseMessage } from "@/schemas/base-message";
import { ProviderSetupSchema } from "@/schemas/provider-setup";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function ListProjectsHandler(message: unknown) {
  await parseAsync(BaseMessage, message);

  const providerSetup = await StorageController.get(
    StorageKeyEnum.PROVIDER_SETUP,
    ProviderSetupSchema
  );

  if (providerSetup.provider === "taiga") {
    const taigaService = new TaigaService();

    const projects = await taigaService.listProjects();

    return projects;
  }
}
