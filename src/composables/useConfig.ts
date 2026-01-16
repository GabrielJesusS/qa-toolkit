import { inject } from "vue";
import { ConfigCTXKey } from "@/contexts/ConfigContext";

export function useConfig() {
  const config = inject(ConfigCTXKey);

  if (!config) {
    throw new Error("useConfig must be used within a useConfigProvider");
  }

  return config;
}
