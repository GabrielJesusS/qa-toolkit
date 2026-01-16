<script setup lang="ts">
import { clsx } from 'clsx'
import { computed, inject, type Ref } from 'vue'

interface Props {
  value: string | number
  disabled?: boolean
}

const props = defineProps<Props>()

const activeTab = inject<Ref<string | number | undefined>>('activeTab')
const setActiveTab = inject<(value: string | number) => void>('setActiveTab')

const isActive = computed(() => activeTab?.value === props.value)

const handleClick = () => {
  if (!props.disabled && setActiveTab) {
    setActiveTab(props.value)
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    :class="clsx(
      'qtk:px-4 qtk:py-2 qtk:text-sm qtk:font-medium qtk:border-b-2 qtk:transition-colors qtk:duration-200',
      'qtk:focus:outline-none',
      {
        'qtk:border-primary qtk:text-primary': isActive,
        'qtk:border-transparent qtk:text-gray-600 qtk:hover:text-gray-800 qtk:hover:border-gray-300': !isActive && !props.disabled,
        'qtk:opacity-50 qtk:cursor-not-allowed qtk:text-gray-400': props.disabled,
        'qtk:cursor-pointer': !props.disabled,
      }
    )"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
