export const StorageKeyEnum = {
  PROVIDER_SETUP: "provider-setup",
  TAIGA_AUTH: "taiga-auth",
  TAIGA_SETTINGS: "taiga-settings",
} as const;

export type StorageKeyEnum =
  (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
