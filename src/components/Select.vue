<script setup lang="ts">
import { clsx } from 'clsx'

interface Option {
    value: string | number
    label: string
    disabled?: boolean
}

interface Props {
    modelValue?: string | number
    options: Option[]
    placeholder?: string
    disabled?: boolean
    id?: string
    name?: string
    error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Selecione uma opção',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <select :id="props.id" :name="props.name" :value="props.modelValue" :disabled="props.disabled" :class="clsx(
        'qtk:w-full qtk:px-3 qtk:py-2 qtk:border qtk:rounded-md qtk:text-sm',
        'qtk:transition-colors qtk:duration-200',
        'focus:qtk:outline-none focus:qtk:ring-2',
        'qtk:appearance-none qtk:bg-no-repeat qtk:bg-right',
        {
            'qtk:border-red-500 focus:qtk:ring-red-500': props.error,
            'qtk:border-gray-300 focus:qtk:border-primary focus:qtk:ring-primary': !props.error,
            'qtk:bg-gray-100 qtk:cursor-not-allowed qtk:text-gray-500': props.disabled,
            'qtk:bg-white qtk:cursor-pointer': !props.disabled,
        }
    )" @change="handleChange">
        <option value="" disabled>{{ props.placeholder }}</option>
        <option v-for="option in props.options" :key="option.value" :value="option.value" :disabled="option.disabled">
            {{ option.label }}
        </option>
    </select>
</template>
