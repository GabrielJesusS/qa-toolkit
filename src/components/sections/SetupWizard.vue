<script setup lang="ts">
import { computed, provide, ref, Transition } from 'vue';

const step = ref(1);

const setupSettings = ref({
    provider: '',
})

const reachLimit = computed(() => ({
    end: step.value >= totalSteps,
    start: step.value <= 1,
}));

const nextStep = () => {
    step.value++
}

const prevStep = () => {
    step.value--
}

const resetWizard = () => {
    step.value = 1
}

const totalSteps = 3;

provide('wizardActions', {
    nextStep,
    prevStep,
    resetWizard
});

provide("wizardState", {
    step,
    reachLimit,
    totalSteps,
})

provide('wizardSettings', setupSettings);

</script>



<template>
    <div class="qtk:flex qtk:items-start">
        <Transition name="slide-fade" mode="out-in">
            <slot v-if="step === 1" name="step-1"></slot>
            <slot v-else-if="step === 2" name="step-2"></slot>
            <slot v-else-if="step === 3" name="step-3"></slot>
        </Transition>
    </div>
</template>