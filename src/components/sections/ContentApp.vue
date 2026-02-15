<script setup lang="ts">
import { ref, Transition } from 'vue'
import Paper from '@/components/Paper.vue';
import IssueCreator from '@/components/sections/IssueCreator.vue';
import { useScreenshot } from '@/composables/useScreenshot';
import clsx from 'clsx';
import ContentButton from "@/components/ContentButton.vue";
import { useConfig } from '@/composables/useConfig';

const screenshot = useScreenshot()
const { config } = useConfig()
const isWorking = ref(false);

const toggle = async () => {
    if (screenshot.screenshotState.value === null) {
        await screenshot.takeScreenshot();

        isWorking.value = true;
        return
    }

    isWorking.value = false

    setTimeout(() => {
        if (!isWorking.value) {
            screenshot.clearScreenshot();
        }
    }, 300)
}

const onSuccess = () => {
    screenshot.clearScreenshot();
    isWorking.value = false;
}

</script>

<template>
    <div data-qtk-anchor v-if="config.setup && !!config.validSession" :class="clsx('qtk:fixed qtk:z-99999 qtk:gap-4 qtk:right-0 qtk:bottom-0 qtk:flex qtk:flex-col qtk:items-end qtk:m-5',
        screenshot.isTaking.value && 'qtk:opacity-0 qtk:pointer-events-none'
    )">
        <Transition mode="out-in" name="slide-fade">
            <div v-show="isWorking" class="qtk:max-w-sm qtk:overflow-hidden">
                <Paper class="qtk:w-sm">
                    <IssueCreator @success="onSuccess" v-if="screenshot.screenshotState.value !== null"
                        :screenshotData="screenshot.screenshotState.value" />
                </Paper>
            </div>
        </Transition>
        <ContentButton :aria-busy="screenshot.isLoading.value" :disabled="screenshot.isLoading.value" @click="toggle" />
    </div>
</template>