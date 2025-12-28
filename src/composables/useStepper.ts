import { computed, provide, ref } from "vue";

export function useStepper(maxSteps = 3) {
  const step = ref(1);

  const reachLimit = computed(() => ({
    end: step.value >= maxSteps,
    start: step.value <= 1,
  }));

  const nextStep = () => {
    step.value++;
  };

  const prevStep = () => {
    step.value--;
  };

  const resetWizard = () => {
    step.value = 1;
  };

  provide("stepperActions", {
    nextStep,
    prevStep,
    resetWizard,
  });

  provide("stepperState", {
    step,
    reachLimit,
    maxSteps,
  });

  return {
    step,
    reachLimit,
    nextStep,
    prevStep,
    resetWizard,
    maxSteps,
  };
}
