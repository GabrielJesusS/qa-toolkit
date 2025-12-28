<script setup lang="ts">
import HomeSection from "./HomeSection.vue";
import SetupWizard from "./SetupWizard.vue";
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
    </SetupWizard>
</template>