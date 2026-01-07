<script setup lang="ts">
import { computed, Transition } from 'vue'
import Paper from '@/components/Paper.vue';
import IssueCreator from '@/components/sections/IssueCreator.vue';
import { useScreenshot } from '@/composables/useScreenshot';
import clsx from 'clsx';
import SnackbarContainer from "@/components/SnackbarContainer.vue";
import SnackbarProvider from "@/components/providers/SnackbarProvider.vue";
import ConfigProvider from "@/components/providers/ConfigProvider.vue";
import ContentButton from "@/components/ContentButton.vue";

const screenshot = useScreenshot()

const toggle = () => {
  if (screenshot.screenshotState.value.image === null) {
    screenshot.takeScreenshot();
    return
  }

  screenshot.clearScreenshot();
}

const onSuccess = () => {
  screenshot.clearScreenshot();
}

const hasScreenshot = computed(() => {
  return !!screenshot.screenshotState.value.image;
});

</script>

<template>
  <SnackbarProvider>
    <ConfigProvider>
      <div data-qtk-anchor :class="clsx('qtk:fixed qtk:z-99999 qtk:gap-4 qtk:right-0 qtk:bottom-0 qtk:font-bold qtk:flex qtk:flex-col qtk:items-end qtk:m-5',
        {
          'qtk:opacity-0': !!screenshot.screenshotState.value.isLoading
        })">
        <Transition mode="out-in" name="slide-fade">
          <div v-show="hasScreenshot" class="qtk:transition-opacity qtk:duration-300 qtk:max-w-xs qtk:overflow-hidden"
            :class="hasScreenshot ? 'qtk:opacity-100' : 'qtk:opacity-0'">
            <Paper class="qtk:w-xs">
              <IssueCreator @success="onSuccess" v-if="hasScreenshot"
                :screenshot="screenshot.screenshotState.value.image ?? ''" />
            </Paper>
          </div>
        </Transition>
        <ContentButton @click="toggle" />
      </div>
    </ConfigProvider>
    <SnackbarContainer />
  </SnackbarProvider>
</template>