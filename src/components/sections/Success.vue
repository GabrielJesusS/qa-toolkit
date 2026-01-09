<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import Button from "../Button.vue";
import { useSetupWizard } from "@/composables/useSetupWizard";
import { useConfig } from "@/composables/useConfig";

const { wizardActions } = useSetupWizard();
const { setConfig } = useConfig();

const onFinish = () => {
    wizardActions.finishWizard();
    setConfig((old) => ({
        ...old, setup: true
    }))
}

</script>

<template>
    <section class="qtk:py-20 qtk:px-5 md:qtk:px-20 lg:qtk:px-40 qtk:max-w-xl qtk:w-full qtk:mx-auto" id="home">
        <div class="qtk:text-center qtk:flex qtk:flex-col qtk:items-center qtk:mb-6 qtk:space-y-4">
            <Logo class="qtk:size-10 qtk:text-primary" />
            <h1 class="qtk:text-4xl md:qtk:text-5xl lg:qtk:text-6xl qtk:font-extrabold qtk:text-gray-900">
                All set up! It's time to get started <span class="qtk:text-primary">QA Toolkit</span>
            </h1>
        </div>
        <div class="qtk:text-lg md:qtk:text-xl qtk:text-gray-700 qtk:space-y-4 qtk:flex qtk:flex-col qtk:items-center">
            <p class="qtk:text-center">You can configure some settings below:</p>

            <p class="qtk:text-center">
                <small>
                    You can change these settings later in the application settings.
                </small>
            </p>
            <Button @click="onFinish" type="button">
                I'm ready to go!
            </Button>
        </div>
    </section>
</template>