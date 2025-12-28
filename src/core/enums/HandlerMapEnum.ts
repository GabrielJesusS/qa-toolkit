export const HandlerMapEnum = {
  PROVIDER_SETUP_CHECK: "provider-setup-check",
} as const;

export type HandlerMapEnum =
  (typeof HandlerMapEnum)[keyof typeof HandlerMapEnum];
