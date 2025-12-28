<script setup lang="ts">
import { Transition } from 'vue';
import { useSetupWizardProvider } from '@/composables/useSetupWizardProvider';

const { step } = useSetupWizardProvider();

</script>

<template>
    <div class="qtk:flex qtk:items-start">
        <Transition name="slide-fade" mode="out-in">
            <slot :key="step" :name="`step-${step}`"></slot>
        </Transition>
    </div>
</template>