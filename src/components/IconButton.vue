<script setup lang="ts">
import clsx from "clsx";

type Props = {
    active?: boolean;
}

const _ = defineProps<Props>()

</script>

<template>
    <button v-bind="$attrs" type="button" :class="clsx('qtk:p-2 qtk:cursor-pointer qtk:rounded-full qtk:transition-all qtk:duration-75 qtk:ease-in', {
        'qtk:text-gray-400 qtk:bg-gray-100 qtk:hover:text-white qtk:hover:bg-primary qtk:active:bg-primary-dark qtk:active:text-white': !_.active,
        'qtk:text-white qtk:bg-red-500 qtk:hover:bg-red-600 qtk:active:bg-red-400 qtk:animate-pulse': _.active,
    })">
        <slot></slot>
    </button>
</template>