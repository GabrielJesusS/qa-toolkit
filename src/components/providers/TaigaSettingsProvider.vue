<script setup lang="ts">
import { useTaigaSettingsProvider } from '@/composables/useTaigaSettingsProvider';

useTaigaSettingsProvider();

</script>

<template>
    <slot />
</template>