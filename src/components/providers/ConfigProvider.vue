<script setup lang="ts">
import { useConfigProvider } from '@/composables/useConfigProvider';
import { Transition } from 'vue';

type Props = {
    lazy?: boolean;
}

const { isLoading } = useConfigProvider();

const props = defineProps<Props>();

</script>

<template>
    <transition name="fade" mode="out-in">
        <slot name="loading" v-if="isLoading && props.lazy" />
        <slot v-else />
    </transition>
</template>