<script setup lang="ts">
import HomeSection from "./HomeSection.vue";
import SetupWizard from "./SetupWizard.vue";
import Success from "./Success.vue";
import TaigaSetup from "./TaigaSetup.vue";
</script>

<template>
    <SetupWizard>
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