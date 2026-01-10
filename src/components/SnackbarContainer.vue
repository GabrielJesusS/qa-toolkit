<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar';
import Toast from './Toast.vue';
import { computed } from 'vue';
import clsx from 'clsx';

type Props = {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    large?: boolean;
}

const { notifications } = useSnackbar();

const props = withDefaults(defineProps<Props>(), { position: 'bottom-right', large: false });

const classes = computed(() => clsx('qtk:z-99999999 qtk:fixed qtk:transform qtk:flex qtk:flex-col qtk:space-y-2', {
    'qtk:bottom-0 qtk:py-4 qtk:top-auto': props.position.startsWith('bottom'),
    'qtk:top-0 qtk:py-4 qtk:bottom-auto': props.position.startsWith('top'),
    'qtk:right-0 qtk:px-4 qtk:left-auto': props.position.endsWith('right'),
    'qtk:left-0 qtk:px-4 qtk:right-auto': props.position.endsWith('left'),
    'qtk:w-full': props.large,
}))

</script>

<template>
    <div :class="classes">
        <ul class="qtk:flex qtk:flex-col qtk:gap-1 qtk:w-full">
            <TransitionGroup name="slide-fade">
                <li v-for="notification in notifications" :key="notification.id">
                    <Toast :type="notification.type">
                        {{ notification.message }}
                    </Toast>
                </li>

            </TransitionGroup>
        </ul>
    </div>
</template>