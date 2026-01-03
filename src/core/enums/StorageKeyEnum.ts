export const StorageKeyEnum = {
  PROVIDER_SETUP: "provider-setup",
  TAIGA_AUTH: "taiga-auth",
} as const;

export type StorageKeyEnum =
  (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
