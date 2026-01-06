import { HTTPError } from "./HttpError";
import { HttpMethodsEnum } from "./HttpMethodsEnum";
import HttpStatusCode from "./HttpStatusCodeEnum";

type CustomHeaders =
  | {
      "Content-Type"?: string;
      Authorization?: string;
    }
  | Record<string, string>;

type HTTPClientCustomOptions = Omit<RequestInit, "headers" | "method"> & {
  headers?: CustomHeaders;
  method?: HttpMethodsEnum;
};

type HTTPClientExecutionReturn<T> = {
  data: T;
  status: HttpStatusCode;
};

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

const ERROR_STATUS_CODES = [
  HttpStatusCode.BAD_REQUEST,
  HttpStatusCode.UNAUTHORIZED,
  HttpStatusCode.FORBIDDEN,
  HttpStatusCode.NOT_FOUND,
  HttpStatusCode.METHOD_NOT_ALLOWED,
  HttpStatusCode.NOT_ACCEPTABLE,
  HttpStatusCode.CONFLICT,
  HttpStatusCode.UNPROCESSABLE_ENTITY,
  HttpStatusCode.TOO_MANY_REQUESTS,
  HttpStatusCode.INTERNAL_SERVER_ERROR,
];

function mountHeader(customHeader?: CustomHeaders) {
  const mountedHeaders = new Headers({ ...DEFAULT_HEADERS, ...customHeader });

  if (mountedHeaders.get("Content-Type") === "multipart/form-data") {
    mountedHeaders.delete("Content-Type");
  }

  return mountedHeaders;
}

async function parseResponse<T>(response: Response) {
  if (response.status === HttpStatusCode.NO_CONTENT) {
    return {} as T;
  }

  const parsedBody: T = await response.json();

  if (ERROR_STATUS_CODES.includes(response.status)) {
    throw new HTTPError(
      `HTTP Error: ${response.status}\n Message: ${JSON.stringify(parsedBody)}`,
      response.status
    );
  }

  return parsedBody;
}

export async function client<T>(
  url: string,
  options?: HTTPClientCustomOptions
): Promise<HTTPClientExecutionReturn<T>> {
  const headers = mountHeader(options?.headers);

  console.log(headers.get('Content-Type'));

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const parsedResponse = await parseResponse<T>(response);

  return { data: parsedResponse, status: response.status };
}
