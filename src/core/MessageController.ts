import { BaseMessage } from "@/schemas/base-message";
import { stringifyIssues } from "@/utils/stringifyIssues";
import { safeParse } from "valibot";

type RawMessage = unknown;

type Sender = chrome.runtime.MessageSender;

type ResponseSender = (response?: unknown) => void;

type MessageHandler = (message: RawMessage, sender: Sender) => Promise<unknown>;

class MessageController {
  handlers = new Map<string, MessageHandler>();

  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  registerHandler(action: string, handler: MessageHandler) {
    this.handlers.set(action, handler);
  }

  async handleMessage(
    message: RawMessage,
    _: Sender,
    sendResponse: ResponseSender
  ) {
    try {
      const parsedMessage = safeParse(BaseMessage, message);

      if (!parsedMessage.success) {
        console.error("Invalid message received:", parsedMessage.issues);
        sendResponse({
          ok: false,
          error: `Invalid \n SendedData: ${JSON.stringify(
            message
          )} \n message format: ${stringifyIssues(parsedMessage.issues)}`,
        });
        return;
      }

      if (this.handlers.has(parsedMessage.output.type)) {
        const handler = this.handlers.get(parsedMessage.output.type)!;

        const result = await handler(message, _);

        sendResponse({
          ok: true,
          data: result,
        });

        return;
      }

      sendResponse({
        ok: false,
        error: `Invalid action: ${parsedMessage.output.type} - This action is not implemented yet or is not registered.`,
      });
    } catch (error) {
      console.error("Error processing message:", error);
      sendResponse({
        ok: false,
        error: `Error processing message: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }
}

const messageController = new MessageController();

export default messageController;
