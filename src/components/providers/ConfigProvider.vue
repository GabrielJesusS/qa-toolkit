<script setup lang="ts">
import { useConfigProvider } from '@/composables/useConfigProvider';
import LoadingScreen from '../LoadingScreen.vue';
import { Transition } from 'vue';

const { hasLoaded } = useConfigProvider();

</script>

<template>
    <transition name="fade" mode="out-in">
        <slot v-if="hasLoaded" />
        <loading-screen v-else />
    </transition>
</template>