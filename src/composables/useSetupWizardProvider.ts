import { provide, ref } from "vue";
import { useStepper } from "./useStepper";
import { WizardCTXKey } from "@/contexts/WizardContext";

export function useSetupWizardProvider() {
  const { nextStep, prevStep, resetStepper, step } = useStepper();

  const wizardState = ref({
    provider: "",
    finished: false,
  });

  const resetWizard = () => {
    resetStepper();
    wizardState.value = {
      provider: "",
      finished: false,
    };
  };

  const finishWizard = () => {
    wizardState.value = {
      ...wizardState.value,
      finished: true,
    };
  };

  provide(WizardCTXKey, {
    state: wizardState,
    actions: {
      nextStep,
      prevStep,
      resetWizard,
      finishWizard,
    },
  });

  return {
    step,
  };
}
