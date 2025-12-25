<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
  modelValue?: boolean
  disabled?: boolean
  id?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <button
    :id="props.id"
    :disabled="props.disabled"
    type="button"
    role="switch"
    :aria-checked="props.modelValue"
    :class="clsx(
      'qtk:relative qtk:inline-flex qtk:h-6 qtk:w-11 qtk:items-center qtk:rounded-full',
      'qtk:transition-colors qtk:duration-200',
      'qtk:focus:outline-none qtk:focus:ring-2 qtk:focus:ring-primary qtk:focus:ring-offset-2',
      {
        'qtk:bg-primary': props.modelValue,
        'qtk:bg-gray-300': !props.modelValue,
        'qtk:opacity-50 qtk:cursor-not-allowed': props.disabled,
        'qtk:cursor-pointer': !props.disabled,
      }
    )"
    @click="toggle"
  >
    <span
      :class="clsx(
        'qtk:inline-block qtk:h-4 qtk:w-4 qtk:transform qtk:rounded-full qtk:bg-white',
        'qtk:transition-transform qtk:duration-200',
        {
          'qtk:translate-x-6': props.modelValue,
          'qtk:translate-x-1': !props.modelValue,
        }
      )"
    />
  </button>
</template>
