import { TaigaRequestInputMessage } from "@/schemas/messages/TaigaRequestInputMessage";
import { TaigaService } from "@/services/TaigaService";
import { parseAsync } from "valibot";

export async function GetTaigaMembersHandler(message: unknown) {
  const parsedMessage = await parseAsync(TaigaRequestInputMessage, message);

  const taigaService = new TaigaService();

  const members = await taigaService.listMembers(parsedMessage.data.projectId);

  return members;
}
