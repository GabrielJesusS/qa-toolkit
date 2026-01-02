<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import { Transition } from 'vue'
import Paper from '@/components/Paper.vue';
import IssueCreator from '@/components/sections/IssueCreator.vue';
import { useScreenshot } from '@/composables/useScreenshot';
import clsx from 'clsx';

const screenshot = useScreenshot()

const toggle = () => {
  if (screenshot.screenshotState.value.image === null) {
    screenshot.takeScreenshot();
    return
  }

  screenshot.clearScreenshot();
}

</script>

<template>
  <div data-qtk-anchor :class="clsx('qtk:fixed qtk:z-100 qtk:gap-4 qtk:right-0 qtk:bottom-0 qtk:font-bold qtk:flex qtk:flex-col qtk:items-end qtk:m-5',
    {
      'qtk:opacity-0': !!screenshot.screenshotState.value.isLoading
    })">
    <Transition mode="out-in" name="slide-fade">
      <div v-show="!!screenshot.screenshotState.value.image"
        class="qtk:transition-opacity qtk:duration-300 qtk:max-w-xs qtk:overflow-hidden"
        :class="!!screenshot.screenshotState.value.image ? 'qtk:opacity-100' : 'qtk:opacity-0'">
        <Paper class="qtk:w-xs">
          <IssueCreator v-if="!!screenshot.screenshotState.value.image"
            :screenshot="screenshot.screenshotState.value.image" />
        </Paper>
      </div>
    </Transition>
    <button
      class="qtk:bg-white qtk:size-fit qtk:block qtk:p-1 qtk:rounded-full qtk:shadow-lg qtk:focus:qtk:outline-none qtk:cursor-pointer"
      @click="toggle()">
      <Logo class="qtk:size-6 qtk:text-primary" />
    </button>
  </div>
</template>