import { HTTPError } from "@/core/HttpClient/HttpError";

export function handleRequestError(error: unknown, wrapMessage?: string) {
  if (error instanceof HTTPError) {
    return error;
  }

  let message = "An unknown error occurred during the request";

  if (wrapMessage) {
    message = wrapMessage;
  }

  throw new Error(`${message} : ${error}`);
}
