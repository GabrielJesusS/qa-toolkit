import { inject, Ref } from "vue";

type WizardActions = {
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
};

type WizardState = {
  provider: string;
};

export function useSetupWizard() {
  const wizardActions = inject<WizardActions>("wizardActions");

  const wizardState = inject<Ref<WizardState>>("wizardState");

  return {
    wizardState,
    wizardActions,
  };
}
