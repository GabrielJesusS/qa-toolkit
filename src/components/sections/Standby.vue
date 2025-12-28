<script setup lang="ts">
import { ProviderSetupSchema } from '@/schemas/provider-setup';
import { inject } from 'vue';
import Button from '../Button.vue';

const providerSetup = inject<ProviderSetupSchema>('provider-setup');
const resetSetup = inject<() => void>('reset-setup');

</script>


<template>
    <section class="qtk:p-6 qtk:space-y-3">
        <h1 class="qtk:text-center">
            Data loaded successfully!
        </h1>
        <p>
            Provider: {{ providerSetup?.provider }}
        </p>
        <Button type="button" @click="resetSetup">
            Reset Setup
        </Button>
    </section>
</template>