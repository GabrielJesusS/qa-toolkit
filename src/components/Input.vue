<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    id?: string
    name?: string
    error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    modelValue: '',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <input :id="props.id" :name="props.name" :type="props.type" :value="props.modelValue"
        :placeholder="props.placeholder" :disabled="props.disabled" :readonly="props.readonly" :class="clsx(
            'qtk:w-full qtk:px-3 qtk:py-2 qtk:border qtk:rounded-md qtk:text-sm',
            'qtk:transition-colors qtk:duration-200',
            'focus:qtk:outline-none focus:qtk:ring-2',
            {
                'qtk:border-red-500 focus:qtk:ring-red-500': props.error,
                'qtk:border-gray-300 focus:qtk:border-primary focus:qtk:ring-primary': !props.error,
                'qtk:bg-gray-100 qtk:cursor-not-allowed qtk:text-gray-500': props.disabled,
                'qtk:bg-white': !props.disabled,
            }
        )" @input="handleInput" />
</template>
