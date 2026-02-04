<script setup lang="ts" generic="T = any">
import { ref, computed, watch, useTemplateRef } from 'vue'
import { clsx } from 'clsx'
import { onClickOutside } from '@vueuse/core'
import { useFloating, offset, flip, shift, size, autoUpdate } from '@floating-ui/vue'
import Input from './Input.vue';

interface Option<T = any> {
    value: T
    label: string
    disabled?: boolean
}

interface Props<T = any> {
    modelValue?: T | T[]
    options: Option<T>[]
    placeholder?: string
    multiple?: boolean
    disabled?: boolean
    searchable?: boolean
    error?: boolean
}

const props = withDefaults(defineProps<Props<T>>(), {
    placeholder: 'Selecione...',
    multiple: false,
    disabled: false,
    searchable: true,
    error: false
})

const emit = defineEmits<{
    'update:modelValue': [value: T | T[] | undefined]
}>()

// Estado
const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = useTemplateRef('triggerRef')
const wrapperRef = useTemplateRef('wrapperRef')
const dropdownRef = useTemplateRef('dropdownRef')

// Floating UI
const { floatingStyles } = useFloating(triggerRef, dropdownRef, {
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [
        offset(4),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        size({
            apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                    minWidth: `${rects.reference.width}px`
                })
            }
        })
    ],
    whileElementsMounted: autoUpdate
})

// Opções filtradas pela busca
const filteredOptions = computed(() => {
    if (!searchQuery.value.trim()) return props.options

    const query = searchQuery.value.toLowerCase()
    return props.options.filter(opt =>
        opt.label.toLowerCase().includes(query)
    )
})

// Verifica se valor está selecionado
const isSelected = (value: T): boolean => {
    if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value)
    }
    return props.modelValue === value
}

// Seleciona/deseleciona opção
const selectOption = (value: T) => {
    if (props.disabled) return

    if (props.multiple) {
        const current = Array.isArray(props.modelValue) ? props.modelValue : []
        const newValue = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]
        emit('update:modelValue', newValue as any)
    } else {
        emit('update:modelValue', value as any)
        close()
    }
}

// Texto de exibição no trigger
const displayText = computed(() => {
    if (props.multiple) {
        const selected = props.options.filter(opt => isSelected(opt.value))
        if (selected.length === 0) return ''
        if (selected.length === 1) return selected[0].label

        return new Intl.ListFormat().format(selected.map(opt => opt.label))
    }

    const selected = props.options.find(opt => opt.value === props.modelValue)
    return selected?.label || ''
})

// Tem seleção?
const hasSelection = computed(() => {
    if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.length > 0
    }
    return props.modelValue !== undefined && props.modelValue !== null
})

// Controle do dropdown
const toggle = () => {
    if (props.disabled) return
    isOpen.value = !isOpen.value
    if (!isOpen.value) searchQuery.value = ''
}

const close = () => {
    isOpen.value = false
    searchQuery.value = ''
}

const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        close()
        triggerRef.value?.focus();
    }
}

const clear = () => {
    emit('update:modelValue', props.multiple ? [] as any : undefined)
    searchQuery.value = ''
}

onClickOutside(wrapperRef, close, {
    ignore: [dropdownRef]
})

// Limpa busca ao fechar
watch(isOpen, (open) => {
    if (!open) searchQuery.value = ''
})
</script>

<template>
    <div ref="wrapperRef" class="qtk:relative qtk:w-full">
        <!-- Trigger -->
        <div ref="triggerRef" :class="clsx(
            'qtk:w-full qtk:border qtk:rounded-md qtk:text-sm',
            'qtk:cursor-pointer qtk:flex qtk:items-center qtk:justify-between',
            'qtk:transition-colors qtk:duration-200',
            'qtk:focus-within:outline-none qtk:focus-within:ring-2',
            {
                'qtk:border-red-500 qtk:focus-within:ring-red-500': error,
                'qtk:border-gray-300 qtk:focus-within:border-primary qtk:focus-within:ring-primary': !error,
                'qtk:bg-gray-100 qtk:cursor-not-allowed qtk:text-gray-500': disabled,
                'qtk:bg-white hover:qtk:border-gray-400': !disabled,
            }
        )" @click="toggle">
            <!-- Valor selecionado -->
            <span :class="clsx('qtk:flex-1 qtk:truncate qtk:px-3 qtk:py-2', {
                'qtk:text-gray-400': !hasSelection,
                'qtk:text-gray-900': hasSelection
            })">
                <slot name="selected" :value="displayText">
                    {{ displayText || placeholder }}
                </slot>
            </span>

            <!-- Ações -->
            <div class="qtk:flex qtk:items-center qtk:gap-1 qtk:shrink-0 qtk:px-3 qtk:py-2">
                <!-- Limpar -->
                <button v-if="hasSelection && !disabled" type="button" class="qtk:text-gray-400 hover:qtk:text-gray-600"
                    tabindex="-1" @click.stop="clear">
                    <svg class="qtk:w-4 qtk:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Chevron -->
                <svg :class="clsx(
                    'qtk:w-4 qtk:h-4 qtk:text-gray-500 qtk:transition-transform qtk:duration-200',
                    { 'qtk:rotate-180': isOpen }
                )" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <!-- Dropdown -->
        <Teleport to="body">
            <div v-if="isOpen" ref="dropdownRef" :style="{ ...floatingStyles, maxHeight: '300px' }"
                class="qtk:bg-white qtk:border qtk:border-gray-300 qtk:rounded-md qtk:shadow-2xl qtk:overflow-hidden qtk:z-99999 qtk:flex qtk:flex-col">
                <!-- Opções -->
                <div class="qtk:py-1 qtk:overflow-y-auto qtk:custom-scrollbar qtk:custom-scrollbar-primary">
                    <div v-for="option in filteredOptions" :key="String(option.value)" :class="clsx(
                        'qtk:px-3 qtk:py-2 qtk:flex qtk:items-center qtk:gap-2',
                        'qtk:transition-colors qtk:text-sm qtk:cursor-pointer',
                        {
                            'qtk:bg-primary-light/40': isSelected(option.value) && !option.disabled,
                            'qtk:hover:bg-primary-light/20': !option.disabled && !isSelected(option.value),
                            'qtk:opacity-50 qtk:cursor-not-allowed': option.disabled
                        }
                    )" @click="!option.disabled && selectOption(option.value)">

                        <!-- Slot para customização ou label padrão -->
                        <slot name="option" :option="option" :selected="isSelected(option.value)">
                            <span class="qtk:flex-1 qtk:text-slate-900">{{ option.label }}</span>
                            <!-- Checkmark para single -->
                            <svg v-if="isSelected(option.value)" class="qtk:w-4 qtk:h-4 qtk:text-primary qtk:shrink-0"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </slot>
                    </div>

                    <!-- Empty state -->
                    <div v-if="filteredOptions.length === 0"
                        class="qtk:px-3 qtk:py-8 qtk:text-center qtk:text-sm qtk:text-gray-500">
                        <slot name="empty">
                            Nenhum resultado encontrado
                        </slot>
                    </div>
                </div>
                <!-- Busca -->
                <div v-if="searchable" class="qtk:p-2 qtk:border-b qtk:border-gray-200 qtk:shrink-0 qtk:flex">
                    <Input autofocus v-model="searchQuery" @keydown="onKeydown" type="text" placeholder="Buscar..."
                        @click.stop />
                </div>


            </div>
        </Teleport>
    </div>
</template>
