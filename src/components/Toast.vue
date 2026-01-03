<script setup lang="ts">
import clsx from 'clsx';

interface Props {
    type: "success" | "error" | "info";
}

const props = withDefaults(defineProps<Props>(), {
    type: "info"
})

const variantClasses = {
    success: "qtk:bg-green-600",
    error: "qtk:bg-red-600",
    info: "qtk:bg-blue-600"
}

</script>


<template>
    <div :class="clsx('qtk:py-2 qtk:px-3 qtk:rounded-lg qtk:shadow qtk:text-white qtk:font-semibold', variantClasses[props.type])">
        <slot></slot>
    </div>
</template>