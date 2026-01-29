<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import Button from '../Button.vue';
import { useSetupWizard } from "@/composables/useSetupWizard";
import { useConfig } from "@/composables/useConfig";
import TaigaAuthForm from "../forms/TaigaAuthForm.vue";

const { wizardActions } = useSetupWizard();
const { setConfig } = useConfig();

const handleSuccess = () => {
    setConfig((old) => ({
        ...old,
        provider: 'taiga',
        validSession: true,
    }))

    wizardActions?.nextStep();
}


</script>

<template>
    <section class="qtk:py-20 qtk:px-5 md:qtk:px-20 lg:qtk:px-40 qtk:max-w-xl qtk:w-full qtk:mx-auto" id="home">
        <div class="qtk:text-center qtk:flex qtk:flex-col qtk:items-center qtk:mb-6 qtk:space-y-4">
            <Logo class="qtk:size-10 qtk:text-primary" />
        </div>
        <div class="qtk:text-lg md:qtk:text-xl qtk:text-gray-700 qtk:space-y-4 qtk:flex qtk:flex-col qtk:items-center">
            <h2 class="qtk:text-center">To setup taiga as your issue tracker, use your login credentials.</h2>
            <TaigaAuthForm @success="handleSuccess" />
            <Button @click="wizardActions?.prevStep" type="button" variant="ghost" size="sm">
                Back to Provider Selection
            </Button>
        </div>
    </section>
</template>