<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue?: string | number | boolean
    value: string | number | boolean
    name?: string
    id?: string
    disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: string | number | boolean]
}>()

const handleChange = () => {
    if (!props.disabled) {
        emit('update:modelValue', props.value)
    }
}

const isChecked = computed(() => props.modelValue === props.value)

</script>

<template>
    <div class="qtk:inline-flex qtk:items-center">
        <input :id="props.id" :name="props.name" type="radio" :value="props.value" :checked="isChecked" :disabled="props.disabled"
            class="qtk:w-4 qtk:h-4 qtk:text-primary qtk:border-gray-300 focus:qtk:ring-2 focus:qtk:ring-primary qtk:cursor-pointer disabled:qtk:cursor-not-allowed disabled:qtk:opacity-50"
            @change="handleChange" />
    </div>
</template>
