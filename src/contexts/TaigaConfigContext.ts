import { TaigaSettingsSchema } from "@/schemas/settings/taiga-settings";
import type { InjectionKey, Ref } from "vue";

export interface TaigaConfigContext {
  settings: Ref<TaigaSettingsSchema>;
  setSettings: (settings: TaigaSettingsSchema) => Promise<void>;
}

export const TaigaConfigCTXKey: InjectionKey<TaigaConfigContext> =
  Symbol("taiga-config");
