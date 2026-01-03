<script setup lang="ts">
import { useSnackbarProvider } from '@/composables/useSnackbarProvider';


useSnackbarProvider();

</script>

<template>
    <slot></slot>
</template>