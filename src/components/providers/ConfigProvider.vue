<script setup lang="ts">
import { useConfigProvider } from '@/composables/useConfigProvider';
import { Transition } from 'vue';

const { hasLoaded } = useConfigProvider();

</script>

<template>
    <transition name="fade" mode="out-in">
        <slot v-if="hasLoaded" />
        <slot name="loading" v-else />
    </transition>
</template>