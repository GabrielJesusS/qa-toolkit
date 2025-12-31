<script setup lang="ts">
import { useConfigProvider } from '@/composables/useConfigProvider';

const { hasLoaded } = useConfigProvider();

</script>

<template>
    <slot v-if="hasLoaded" />
    <div v-else>
        Loading...
    </div>
</template>