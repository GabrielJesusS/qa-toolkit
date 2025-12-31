<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import Button from "../Button.vue";
import { useConfig } from "@/composables/useConfig";

const { resetSetup } = useConfig()


</script>


<template>
    <section class="qtk:p-5 qtk:max-w-xl qtk:w-full qtk:mx-auto qtk:h-screen qtk:justify-between qtk:flex qtk:flex-col" id="home">
        <div class="qtk:text-center qtk:flex qtk:items-center qtk:mb-6 qtk:space-x-1">
            <Logo class="qtk:size-8 qtk:text-primary" />
            <h1 class="qtk:text-2xl md:qtk:text-5xl lg:qtk:text-6xl qtk:font-extrabold qtk:text-gray-900">
                QA Toolkit Settings
            </h1>
        </div>
        <div class="qtk:text-center qtk:flex qtk:items-center qtk:mb-6 qtk:space-x-1">
            <Button variant="danger" @click="resetSetup" type="button">
                Restart Setup
            </Button>
        </div>
    </section>
</template>