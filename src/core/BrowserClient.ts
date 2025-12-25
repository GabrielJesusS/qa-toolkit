import { BaseMessage } from "@/schemas/base-message";
import { BaseResponse } from "@/schemas/base-response";
import { stringifyIssues } from "@/utils/stringifyIssues";
import { safeParse } from "valibot";

class BrowserClient {
  public sendMessage<T extends BaseMessage>(data: T) {
    return new Promise<BaseResponse["data"]>((resolve, reject) => {
      chrome.runtime.sendMessage(data, (response) => {
        const parsedResponse = safeParse(BaseResponse, response);

        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }

        if (!parsedResponse.success) {
          reject(
            new Error(
              `Response validation failed: ${stringifyIssues(
                parsedResponse.issues
              )}`
            )
          );
          return;
        }

        const responseData = parsedResponse.output;

        if (!responseData?.ok) {
          reject(responseData?.error);
          return;
        }

        resolve(responseData.data);
      });
    });
  }
}

export const browserClient = new BrowserClient();
