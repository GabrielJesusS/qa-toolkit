<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    rows?: number
    id?: string
    name?: string
    error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    rows: 4,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <textarea :id="props.id" :name="props.name" :value="props.modelValue" :placeholder="props.placeholder" :disabled="props.disabled"
        :readonly="props.readonly" :rows="props.rows" :class="clsx(
            'qtk:w-full qtk:px-3 qtk:py-2 qtk:border qtk:rounded-md qtk:text-sm',
            'qtk:transition-colors qtk:duration-200 qtk:resize-y',
            'qtk:focus:outline-none qtk:focus:ring-2',
            {
                'qtk:border-red-500 qtk:focus:ring-red-500': props.error,
                'qtk:border-gray-300 qtk:focus:border-primary qtk:focus:ring-primary': !props.error,
                'qtk:bg-gray-100 qtk:cursor-not-allowed qtk:text-gray-500': props.disabled,
                'qtk:bg-white': !props.disabled,
            }
        )" @input="handleInput"></textarea>
</template>
