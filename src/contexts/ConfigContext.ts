import type { InjectionKey, Ref } from "vue";

type QAToolkitConfig = {
  provider: string;
  setup: boolean;
};

export interface ConfigContext {
  config: Ref<QAToolkitConfig>;
  resetSetup: () => void;
}

export const ConfigCTXKey: InjectionKey<ConfigContext> =
  Symbol("qa-toolkit-config");
