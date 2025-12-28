<script setup lang="ts">
import Standby from './Standby.vue';
import { inject } from 'vue';
import { ProviderSetupSchema } from '@/schemas/provider-setup';
import InitialSetup from './InitialSetup.vue';

const providerSetup = inject<ProviderSetupSchema>('provider-setup');

</script>

<template>
    <InitialSetup v-if="!providerSetup?.setup" />
    <Standby v-if="!!providerSetup?.setup" />
</template>