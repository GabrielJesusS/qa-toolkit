import { computed, ref } from "vue";

export function useStepper(maxSteps = 3, initialStep = 1) {
  const step = ref(initialStep);

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

  const resetStepper = () => {
    step.value = 1;
  };

  return {
    step,
    reachLimit,
    nextStep,
    prevStep,
    resetStepper,
    maxSteps,
  };
}
