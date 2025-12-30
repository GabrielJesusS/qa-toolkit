<script setup lang="ts">
import Button from '../Button.vue';
import { useConfig } from '@/composables/useConfig';

const { config, resetSetup } = useConfig();

</script>


<template>
    <section class="qtk:p-6 qtk:space-y-3">
        <h1 class="qtk:text-center">
            Data loaded successfully!
        </h1>
        <p>
            Provider: {{ config?.provider }}
        </p>
        <Button type="button" @click="resetSetup">
            Reset Setup
        </Button>
    </section>
</template>