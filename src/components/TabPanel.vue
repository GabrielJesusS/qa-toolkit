<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

interface Props {
  value: string | number
}

const props = defineProps<Props>()

const activeTab = inject<Ref<string | number | undefined>>('activeTab')

const isActive = computed(() => activeTab?.value === props.value)
</script>

<template>
  <div v-if="isActive" class="qtk:py-4">
    <slot />
  </div>
</template>
