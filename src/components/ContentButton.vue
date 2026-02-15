<script setup lang="ts">
import { useConfig } from '@/composables/useConfig';
import Logo from "@/assets/logo.svg?component"
import Spinner from "@/assets/spinner.svg?component"
import clsx from 'clsx'
import { computed } from 'vue';

const { config } = useConfig();

const hasUrlTrack = computed(() => !!config.value.urlTrack);

const title = computed(() => `Take a screenshot ${hasUrlTrack.value ? `(Tracking: ${config.value.urlTrack})` : ''}`);

</script>


<template>
    <button :title="title" :class="clsx('qtk:bg-white qtk:group/btn qtk:relative qtk:text-primary qtk:disabled:cursor-not-allowed qtk:disabled:text-gray-400 qtk:size-fit qtk:block qtk:p-1 qtk:rounded-full qtk:shadow-lg qtk:focus:qtk:outline-none qtk:cursor-pointer',
        hasUrlTrack && 'qtk:after:size-8 qtk:after:pointer-events-none qtk:after:animate-ping qtk:after:block qtk:after:bg-red-500/50 qtk:after:absolute qtk:after:inset-0 qtk:after:rounded-full'
    )">
        <Logo
            :class="clsx('qtk:size-6 qtk:text-current qtk:group-aria-busy/btn:opacity-0', hasUrlTrack && 'qtk:text-red-500',)" />
        <Spinner
            :class="clsx('qtk:size-6 qtk:text-current qtk:group-aria-busy/btn:opacity-100 qtk:opacity-0 qtk:absolute qtk:inset-1 qtk:animate-spin')" />

    </button>
</template>