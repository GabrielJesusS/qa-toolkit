import { TaigaRequestInputMessage } from "@/schemas/messages/TaigaRequestInputMessage";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function GetTaigaTagsHandler(message: unknown) {
  const parsedMessage = await parseAsync(TaigaRequestInputMessage, message);

  const taigaService = new TaigaService();

  const tags = await taigaService.getTags(parsedMessage.data.projectId);

  return tags;
}
