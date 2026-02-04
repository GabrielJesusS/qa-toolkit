import { StorageKeyEnum } from "@/core/enums/StorageKeyEnum";
import { ExtensionWorker } from "@/core/ExtensionWorker";
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

  const locale = chrome.i18n.getUILanguage();

  if (appConfig.provider === "taiga") {
    const taigaService = new TaigaService();

    const trackInfo = appConfig.sendNetwork
      ? ExtensionWorker.getTrackedRequests()
      : undefined;

    const taigaIssue = await taigaService.createIssue({
      subject: parsedMessage.data.title,
      description: parsedMessage.data.description,
      project: parsedMessage.data.projectId,
      print: parsedMessage.data.print,
      trackInfo: trackInfo,
      locale: locale,
      href: parsedMessage.data.href,
      tags: parsedMessage.data.tags,
    });

    return {
      url: taigaIssue.url,
    };
  }
}
