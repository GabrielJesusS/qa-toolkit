export const HandlerMapEnum = {
  PROVIDER_SETUP_CHECK: "provider-setup-check",
  TAIGA_SIGN_IN: "taiga-sign-in",
  TAKE_SCREENSHOT: "take-screenshot",
  LIST_PROJECTS: "list-projects",
  CREATE_ISSUE: "create-issue",
  SAVE_TAIGA_SETTINGS: "save-taiga-settings",
  GET_TAIGA_SETTINGS: "get-taiga-settings",
} as const;

export type HandlerMapEnum =
  (typeof HandlerMapEnum)[keyof typeof HandlerMapEnum];
