export const StorageKeyEnum = {
  APP_CONFIG: "app-config",
  TAIGA_AUTH: "taiga-auth",
  TAIGA_SETTINGS: "taiga-settings",
} as const;

export type StorageKeyEnum =
  (typeof StorageKeyEnum)[keyof typeof StorageKeyEnum];
