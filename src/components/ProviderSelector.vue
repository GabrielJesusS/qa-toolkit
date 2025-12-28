<script lang="ts">
import TaigaLogo from "@/assets/providers/TaigaLogo.png"
import JiraLogo from "@/assets/providers/JiraLogo.png"

export const PROVIDER_OPTIONS = Object.freeze([
    { label: 'Taiga', value: 'taiga', enabled: true, logo: TaigaLogo },
    { label: 'Jira', value: 'jira', enabled: false, logo: JiraLogo },
])
</script>

<script setup lang="ts">
import clsx from "clsx";

interface Props {
    modelValue?: string | number | boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: string | number | boolean]
}>()

</script>


<template>
    <div>
        <ul class="qtk:space-x-4 qtk:flex qtk:justify-center">
            <li v-for="option in PROVIDER_OPTIONS" :key="option.value">
                <label :class="clsx('qtk:flex qtk:items-center qtk:space-x-4 qtk:has-checked:ring-primary qtk:has-checked:ring-2 qtk:p-2 qtk:rounded-md qtk:relative qtk:transition-all qtk:duration-300', {
                    'qtk:opacity-50 qtk:cursor-not-allowed qtk:grayscale-100': !option.enabled,
                    'qtk:cursor-pointer': option.enabled
                })">
                    <input @change="() => emit('update:modelValue', option.value)"
                        class="qtk:opacity-0 qtk:absolute qtk:pointer-events-none qtk:inset-0" name="provider"
                        type="radio" :checked="props.modelValue === option.value" :value="option.value"
                        :disabled="!option.enabled" />
                    <img :src="option.logo" :alt="option.label + ' logo'" class="qtk:h-10" />
                </label>
            </li>
        </ul>
    </div>
</template>