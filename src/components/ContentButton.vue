<script setup lang="ts">
import { useConfig } from '@/composables/useConfig';
import Logo from "@/assets/logo.svg?component"
import clsx from 'clsx'

const { config } = useConfig();

</script>


<template>
    <button title="Take a screenshot"
        class="qtk:bg-white qtk:size-fit qtk:block qtk:p-1 qtk:rounded-full qtk:shadow-lg qtk:focus:qtk:outline-none qtk:cursor-pointer">
        <Logo
            :class="clsx('qtk:size-6 qtk:text-primary', !!config.urlTrack ? 'qtk:text-red-500' : 'qtk:text-primary')" />
    </button>
</template>