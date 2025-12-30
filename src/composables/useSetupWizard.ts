import { WizardCTXKey } from "@/contexts/WizardContext";
import { inject } from "vue";

export function useSetupWizard() {
  const wizardContext = inject(WizardCTXKey);

  if (!wizardContext) {
    throw new Error(
      "useSetupWizard must be used within a useSetupWizardProvider"
    );
  }

  return {
    wizardState: wizardContext.state,
    wizardActions: wizardContext.actions,
  };
}
