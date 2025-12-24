<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    size: 'md',
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event)
    }
}

const variantClasses = {
    primary: 'qtk:bg-primary qtk:text-white hover:qtk:bg-primary-dark focus:qtk:ring-primary',
    secondary: 'qtk:bg-gray-600 qtk:text-white hover:qtk:bg-gray-700 focus:qtk:ring-gray-500',
    danger: 'qtk:bg-red-600 qtk:text-white hover:qtk:bg-red-700 focus:qtk:ring-red-500',
    ghost: 'qtk:bg-transparent qtk:text-gray-700 hover:qtk:bg-gray-100 focus:qtk:ring-gray-500',
}

const sizeClasses = {
    sm: 'qtk:px-3 qtk:py-1.5 qtk:text-xs',
    md: 'qtk:px-4 qtk:py-2 qtk:text-sm',
    lg: 'qtk:px-6 qtk:py-3 qtk:text-base',
}
</script>

<template>
    <button :type="props.type" :disabled="props.disabled || props.loading" :class="clsx(
        'qtk:inline-flex qtk:items-center qtk:justify-center qtk:font-medium qtk:rounded-md',
        'qtk:transition-colors qtk:duration-200',
        'focus:qtk:outline-none focus:qtk:ring-2 focus:qtk:ring-offset-2',
        variantClasses[props.variant],
        sizeClasses[props.size],
        {
            'qtk:opacity-50 qtk:cursor-not-allowed': props.disabled || props.loading,
        }
    )" @click="handleClick">
        <span v-if="props.loading" class="qtk:mr-2">
            <svg class="qtk:animate-spin qtk:h-4 qtk:w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="qtk:opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="qtk:opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </span>
        <slot />
    </button>
</template>
