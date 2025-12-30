import { ConfigCTXKey } from "@/contexts/ConfigContext";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { ProviderSetupSchema } from "@/schemas/provider-setup";
import { parseAsync } from "valibot";
import { onMounted, provide, ref } from "vue";

const check = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.PROVIDER_SETUP_CHECK,
  });

  const parsed = await parseAsync(ProviderSetupSchema, result);

  return parsed;
};

export function useConfigProvider() {
  const hasLoaded = ref(false);

  const providerSetup = ref({
    setup: false,
    provider: "",
  });

  function resetSetup() {
    providerSetup.value = { setup: false, provider: "" };
  }

  onMounted(async () => {
    if (!hasLoaded.value) {
      providerSetup.value = await check();
      hasLoaded.value = true;
    }
  });

  providerSetup;

  provide(ConfigCTXKey, {
    config: providerSetup,
    resetSetup,
  });

  return {
    hasLoaded,
  };
}
