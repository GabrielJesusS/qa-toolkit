import { computed, ref } from "vue";

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
