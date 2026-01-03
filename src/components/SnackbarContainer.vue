<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar';
import Toast from './Toast.vue';

const { notifications } = useSnackbar();

</script>


<template>
    <div
        class="qtk:z-99999999 qtk:fixed qtk:bottom-4 qtk:right-4 qtk:transform qtk:-translate-x-1/2 qtk:flex qtk:flex-col qtk:space-y-2">
        <ul class="qtk:flex qtk:flex-col qtk:gap-1">
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