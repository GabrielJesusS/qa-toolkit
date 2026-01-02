export const HandlerMapEnum = {
  PROVIDER_SETUP_CHECK: "provider-setup-check",
  TAIGA_SIGN_IN: "taiga-sign-in",
  TAKE_SCREENSHOT: "take-screenshot",
  LIST_PROJECTS: "list-projects",
  CREATE_ISSUE: "create-issue",
} as const;

export type HandlerMapEnum =
  (typeof HandlerMapEnum)[keyof typeof HandlerMapEnum];
