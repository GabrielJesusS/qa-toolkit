import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { CreateIssueMessage } from "@/schemas/messages/CreateIssueMessage";
import { ProviderSetupSchema } from "@/schemas/provider-setup";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function CreateIssueHandler(message: unknown) {
  const parsedMessage = await parseAsync(CreateIssueMessage, message);

  const providerSetup = await StorageController.get(
    StorageKeyEnum.PROVIDER_SETUP,
    ProviderSetupSchema
  );

  if (providerSetup.provider === "taiga") {
    const taigaService = new TaigaService();

    await taigaService.createIssue({
      subject: parsedMessage.data.title,
      description: parsedMessage.data.description,
      project: parsedMessage.data.projectId,
      print: parsedMessage.data.print,
    });
  }
}
