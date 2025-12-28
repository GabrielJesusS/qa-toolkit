export const StorageKeyEnum = {
  PROVIDER_SETUP: "provider-setup",
} as const;

export type StorageKeyEnum =
  (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
