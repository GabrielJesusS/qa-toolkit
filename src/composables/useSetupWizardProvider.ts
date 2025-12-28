import { provide, ref } from "vue";
import { useStepper } from "./useStepper";

type WizardState = {
  provider: string;
};

export function useSetupWizardProvider() {
  const { nextStep, prevStep, resetWizard, step } = useStepper();

  const wizardState = ref<WizardState>({
    provider: "",
  });

  provide("wizardActions", {
    nextStep,
    prevStep,
    resetWizard,
  });

  provide("wizardState", wizardState);

  return {
    step,
  };
}
