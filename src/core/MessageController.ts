import { BaseMessage } from "@/schemas/base-message";
import { stringifyIssues } from "@/utils/stringifyIssues";
import { safeParse } from "valibot";

type RawMessage = unknown;

type Sender = chrome.runtime.MessageSender;

type ResponseSender = (response?: unknown) => void;

class MessageController {
  handlers = new Map<string, unknown>();

  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  async handleMessage(
    message: RawMessage,
    _: Sender,
    sendResponse: ResponseSender
  ) {
    const parsedMessage = safeParse(BaseMessage, message);

    if (!parsedMessage.success) {
      console.error("Invalid message received:", parsedMessage.issues);
      sendResponse({
        ok: false,
        error: `Invalid \n SendedData: ${JSON.stringify(
          message
        )} \n message format: ${stringifyIssues(parsedMessage.issues)}`,
      });
      return true;
    }

    sendResponse({
      ok: true,
      data: { x: 1 },
    });
  }
}

const messageController = new MessageController();

export default messageController;
