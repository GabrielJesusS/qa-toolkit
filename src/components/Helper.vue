<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
  error?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <p
    :class="clsx(
      'qtk:text-xs qtk:mt-1',
      {
        'qtk:text-red-600': props.error,
        'qtk:text-gray-500': !props.error,
      }
    )"
  >
    <slot />
  </p>
</template>
