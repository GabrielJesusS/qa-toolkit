export type TaigaServiceErrorType =
  | "SIGN_IN"
  | "REVALIDATE_TOKEN"
  | "UNAVAILABLE"
  | "INIT_ISSUE"
  | "CREATE_ATTACHMENT"
  | "INSERT_DESCRIPTION"
  | "CREATE_ISSUE"
  | "CHECK_LOGIN"
  | "LIST_PROJECTS"
  | "GET_TAGS"
  | "GET_MEMBERS"
  | "GENERIC";

export class TaigaServiceError extends Error {
  type: TaigaServiceErrorType;
  originalError?: unknown;

  constructor(
    message?: string,
    type: TaigaServiceErrorType = "GENERIC",
    originalError?: unknown
  ) {
    super(message);
    this.type = type;
    this.originalError = originalError;
    this.name = "TaigaServiceError";
  }
}
