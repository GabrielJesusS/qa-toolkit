<script setup lang="ts">
interface Props {
  for?: string
  required?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <label
    :for="props.for"
    class="qtk:block qtk:text-sm qtk:font-medium qtk:text-gray-700 qtk:mb-1"
  >
    <slot />
    <span v-if="props.required" class="qtk:text-red-500 qtk:ml-1">*</span>
  </label>
</template>
