import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";
import type { InjectionKey, Ref } from "vue";

type SetterValue =
  | TaigaSettingsSchema
  | ((oldConfig: TaigaSettingsSchema) => TaigaSettingsSchema);

export interface TaigaConfigContext {
  settings: Ref<TaigaSettingsSchema>;
  setSettings: (settings: SetterValue) => Promise<void>;
}

export const TaigaConfigCTXKey: InjectionKey<TaigaConfigContext> =
  Symbol("taiga-config");
