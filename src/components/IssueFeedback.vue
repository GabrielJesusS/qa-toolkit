<script setup lang="ts">

import Link from "@/assets/link.svg?component";

type Props = {
    url: string;
}

const props = defineProps<Props>();

</script>

<template>
    <span class="qtk:text-current">
        The issue has been created successfully.
        <a :href="props.url" target="_blank" rel="noopener noreferrer"
            class="qtk:visited:text-current qtk:inline-flex qtk:gap-1 qtk:items-center qtk:text-current qtk:font-bold qtk:underline">
            Click to preview
            <Link class="qtk:size-4 qtk:text-current" />
        </a>
    </span>
</template>