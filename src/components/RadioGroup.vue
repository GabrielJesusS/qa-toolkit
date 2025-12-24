<script setup lang="ts">
import { computed, provide } from 'vue'
import { clsx } from 'clsx'

interface Props {
    modelValue?: string | number | boolean
    name?: string
    direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'vertical',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number | boolean]
}>()

const updateValue = (value: string | number | boolean) => {
    emit('update:modelValue', value)
}

provide('radioGroupValue', computed(() => props.modelValue))
provide('radioGroupName', props.name)
provide('updateRadioGroupValue', updateValue)
</script>

<template>
    <div :class="clsx(
        'qtk:flex qtk:gap-4',
        {
            'qtk:flex-row': props.direction === 'horizontal',
            'qtk:flex-col': props.direction === 'vertical',
        }
    )"
    ]" role="radiogroup">
        <slot />
    </div>
</template>
