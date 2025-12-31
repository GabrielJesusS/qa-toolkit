import type { InjectionKey, Ref } from "vue";

type WizardActions = {
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
  finishWizard: () => void;
};

type WizardState = {
  provider: string;
};

export interface WizardContext {
  state: Ref<WizardState>;
  actions: WizardActions;
}

export const WizardCTXKey: InjectionKey<WizardContext> =
  Symbol("wizard-context");
