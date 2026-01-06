import { AppConfigSchema } from "@/schemas/settings/app-config";
import type { InjectionKey, Ref } from "vue";

export interface ConfigContext {
  config: Ref<AppConfigSchema>;
  resetSetup: () => void;
  setConfig: (
    newConfig:
      | AppConfigSchema
      | ((oldConfig: AppConfigSchema) => AppConfigSchema)
  ) => void;
}

export const ConfigCTXKey: InjectionKey<ConfigContext> =
  Symbol("qa-toolkit-config");
