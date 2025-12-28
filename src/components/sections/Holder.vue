<script setup lang="ts">
import Standby from './Standby.vue';
import { inject } from 'vue';
import { ProviderSetupSchema } from '@/schemas/provider-setup';

const providerSetup = inject<ProviderSetupSchema>('provider-setup');

</script>

<template>
    <div v-if="!providerSetup?.setup">
        initial setup
    </div>
    <Standby v-if="!!providerSetup?.setup" />
</template>