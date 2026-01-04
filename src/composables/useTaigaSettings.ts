import { inject } from "vue";
import { TaigaConfigCTXKey } from "@/contexts/TaigaConfigContext";

export const useTaigaSettings = () => {
  const taigaSettings = inject(TaigaConfigCTXKey);

  if (!taigaSettings) {
    throw new Error(
      "useTaigaSettings must be used within a TaigaSettingsProvider"
    );
  }

  return taigaSettings;
};
