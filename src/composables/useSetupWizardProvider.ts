import { provide, ref } from "vue";
import { useStepper } from "./useStepper";
import { WizardCTXKey } from "@/contexts/WizardContext";

type UseSetupWizardParams = {
  initialStep?: number;
};

export function useSetupWizardProvider(params: UseSetupWizardParams = {}) {
  const { nextStep, prevStep, resetStepper, step } = useStepper(3, params.initialStep || 1);

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
