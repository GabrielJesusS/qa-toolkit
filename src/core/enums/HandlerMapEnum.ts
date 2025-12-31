export const HandlerMapEnum = {
  PROVIDER_SETUP_CHECK: "provider-setup-check",
  TAIGA_SIGN_IN: "taiga-sign-in",
} as const;

export type HandlerMapEnum =
  (typeof HandlerMapEnum)[keyof typeof HandlerMapEnum];
