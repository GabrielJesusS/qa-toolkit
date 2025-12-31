export const HandlerMapEnum = {
  PROVIDER_SETUP_CHECK: "provider-setup-check",
  TAIGA_SIGN_IN: "taiga-sign-in",
  TAKE_SCREENSHOT: "take-screenshot",
} as const;

export type HandlerMapEnum =
  (typeof HandlerMapEnum)[keyof typeof HandlerMapEnum];
