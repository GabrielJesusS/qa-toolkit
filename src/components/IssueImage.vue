<script setup lang="ts">
const props = defineProps<{
    url: string
}>();
</script>

<template>
    <div class="qtk:bg-primary/10 qtk:rounded-md qtk:aspect-video qtk:w-full">
        <img :src="props.url" alt="Screenshot of the issue"
            class="qtk:w-full qtk:aspect-video qtk:object-contain qtk:rounded-md" />
    </div>
</template>