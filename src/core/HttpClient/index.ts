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

const PENDING_REQUESTS = new Map<string, Promise<unknown>>();

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

function getRequestKey(url: string, options?: RequestInit) {
  return `${url}:${JSON.stringify(options)}`;
}

async function dedupedFetch<T>(url: string, options?: HTTPClientCustomOptions) {
  const key = getRequestKey(url, options);

  const headers = mountHeader(options?.headers);

  if (PENDING_REQUESTS.has(key)) {
    return PENDING_REQUESTS.get(key) as Promise<HTTPClientExecutionReturn<T>>;
  }

  const fetchPromise = fetch(url, { ...options, headers })
    .then(async (response) => ({
      data: await parseResponse<T>(response),
      status: response.status,
    }))
    .finally(() => {
      PENDING_REQUESTS.delete(key);
    });

  PENDING_REQUESTS.set(key, fetchPromise);

  return fetchPromise as Promise<HTTPClientExecutionReturn<T>>;
}

export async function client<T>(
  url: string,
  options?: HTTPClientCustomOptions
): Promise<HTTPClientExecutionReturn<T>> {
  return dedupedFetch<T>(url, options);
}
