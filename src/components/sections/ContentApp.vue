<script setup lang="ts">
import { computed, Transition } from 'vue'
import Paper from '@/components/Paper.vue';
import IssueCreator from '@/components/sections/IssueCreator.vue';
import { useScreenshot } from '@/composables/useScreenshot';
import clsx from 'clsx';
import ContentButton from "@/components/ContentButton.vue";
import { useConfig } from '@/composables/useConfig';

const screenshot = useScreenshot()
const { config } = useConfig()

const toggle = () => {
    if (screenshot.screenshotState.value === null) {
        screenshot.takeScreenshot();
        return
    }

    screenshot.clearScreenshot();
}

const onSuccess = () => {
    screenshot.clearScreenshot();
}

const hasScreenshot = computed(() => {
    return screenshot.screenshotState.value !== null
});

</script>

<template>
    <div data-qtk-anchor v-if="config.setup && !!config.validSession" :class="clsx('qtk:fixed qtk:z-99999 qtk:gap-4 qtk:right-0 qtk:bottom-0 qtk:flex qtk:flex-col qtk:items-end qtk:m-5',
        {
            'qtk:opacity-0 qtk:pointer-events-none': !!screenshot.isLoading.value
        })">
        <Transition mode="out-in" name="slide-fade">
            <div v-show="hasScreenshot" class="qtk:transition-opacity qtk:duration-300 qtk:max-w-sm qtk:overflow-hidden"
                :class="hasScreenshot ? 'qtk:opacity-100' : 'qtk:opacity-0'">
                <Paper class="qtk:w-sm">
                    <IssueCreator @success="onSuccess" v-if="screenshot.screenshotState.value !== null"
                        :screenshotData="screenshot.screenshotState.value" />
                </Paper>
            </div>
        </Transition>
        <ContentButton @click="toggle" />
    </div>
</template>