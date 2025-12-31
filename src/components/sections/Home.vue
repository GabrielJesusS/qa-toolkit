<script setup lang="ts">
import Standby from './Standby.vue';
import InitialSetup from './InitialSetup.vue';
import { useConfig } from '@/composables/useConfig';

const { config } = useConfig()

</script>

<template>
    <div class="qtk:max-h-screen qtk:overflow-hidden">
        <Transition name="slide-fade" mode="out-in">
            <Standby v-if="!!config?.setup" />
            <InitialSetup v-else />
        </Transition>
    </div>
</template>