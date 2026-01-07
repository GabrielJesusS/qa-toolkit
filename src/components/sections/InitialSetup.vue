<script setup lang="ts">
import { useConfig } from "@/composables/useConfig";
import HomeSection from "./HomeSection.vue";
import SetupWizard from "./SetupWizard.vue";
import Success from "./Success.vue";
import TaigaSetup from "./TaigaSetup.vue";
import { computed } from 'vue';

const { config } = useConfig()

const computedCurrentStep = computed(() => {
    if (config.value.provider) return 3;

    return 1
})

</script>


<template>
    <SetupWizard :initial-step="computedCurrentStep">
        <template v-slot:step-1>
            <HomeSection />
        </template>
        <template v-slot:step-2>
            <TaigaSetup />
        </template>
        <template v-slot:step-3>
            <Success />
        </template>
    </SetupWizard>
</template>