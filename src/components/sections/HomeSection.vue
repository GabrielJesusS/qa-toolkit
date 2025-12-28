<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import ProviderSelector from "../ProviderSelector.vue";
import Button from "../Button.vue";
import { inject, ref } from "vue";

type WizardActions = {
    nextStep: () => void,
    prevStep: () => void,
    resetWizard: () => void,
}

const provider = ref('');

const nextStep = inject<WizardActions>("wizardActions");

</script>

<template>
    <section class="qtk:py-20 qtk:px-5 md:qtk:px-20 lg:qtk:px-40 qtk:max-w-xl qtk:w-full qtk:mx-auto" id="home">
        <div class="qtk:text-center qtk:flex qtk:flex-col qtk:items-center qtk:mb-6 qtk:space-y-4">
            <Logo class="qtk:size-10 qtk:text-primary" />
            <h1 class="qtk:text-4xl md:qtk:text-5xl lg:qtk:text-6xl qtk:font-extrabold qtk:text-gray-900">
                Welcome to <span class="qtk:text-primary">QA Toolkit</span>
            </h1>
            <p class="qtk:text-lg md:qtk:text-xl qtk:text-gray-700">
                Your all-in-one solution for efficient quality assurance.
            </p>
        </div>
        <div class="qtk:text-lg md:qtk:text-xl qtk:text-gray-700 qtk:space-y-4 qtk:flex qtk:flex-col qtk:items-center">
            <p class="qtk:text-center">To start your journey, we need to setup your environment.</p>
            <h2 class="qtk:text-center">First - Select your provider:</h2>
            <ProviderSelector v-model="provider" />
            <Button @click="nextStep?.nextStep" type="button" :disabled="provider === ''">
                Get Started
            </Button>
        </div>
    </section>
</template>