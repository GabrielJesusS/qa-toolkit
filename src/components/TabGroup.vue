<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface Props {
  modelValue?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const activeTab = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
})

const setActiveTab = (value: string | number) => {
  activeTab.value = value
  emit('update:modelValue', value)
}

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)
</script>

<template>
  <div class="qtk:w-full">
    <slot />
  </div>
</template>
