import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { StorageController } from "@/core/StorageController";
import { CreateIssueMessage } from "@/schemas/messages/CreateIssueMessage";
import { AppConfigSchema } from "@/schemas/settings/app-config";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function CreateIssueHandler(message: unknown) {
  const parsedMessage = await parseAsync(CreateIssueMessage, message);

  const appConfig = await StorageController.get(
    StorageKeyEnum.APP_CONFIG,
    AppConfigSchema
  );

  if (appConfig.provider === "taiga") {
    const taigaService = new TaigaService();

    await taigaService.createIssue({
      subject: parsedMessage.data.title,
      description: parsedMessage.data.description,
      project: parsedMessage.data.projectId,
      print: parsedMessage.data.print,
    });
  }
}
