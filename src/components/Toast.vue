<script setup lang="ts">
import clsx from 'clsx';

interface Props {
    type: "success" | "error" | "info" | "warning";
}

const props = withDefaults(defineProps<Props>(), {
    type: "info"
})

const variantClasses = {
    success: "qtk:bg-green-100 qtk:border-green-500 qtk:text-green-900",
    error: "qtk:bg-red-100 qtk:border-red-500 qtk:text-red-900",
    info: "qtk:bg-blue-100 qtk:border-blue-500 qtk:text-blue-900",
    warning: "qtk:bg-yellow-100 qtk:border-yellow-500 qtk:text-yellow-900",
}

</script>


<template>
    <div :class="clsx('qtk:py-2 qtk:border qtk:px-3 qtk:rounded-lg qtk:shadow qtk:font-semibold', variantClasses[props.type])">
        <slot></slot>
    </div>
</template>