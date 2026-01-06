<script setup lang="ts">
import CogIcon from "@/assets/cog.svg?component";
import Capture from "@/assets/capture.svg?component";
import { useConfig } from "@/composables/useConfig";
import clsx from "clsx";

const { setConfig, config } = useConfig()


async function openSettings() {
    const currentTab = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });


    if (currentTab.length === 0) return;

    const tab = currentTab[0];

    if (!tab.id) return;


    await chrome.sidePanel.open({
        tabId: tab.id,
    });
}

async function toggleURLCapture() {
    if (config.value.urlTrack) {
        setConfig(old => ({ ...old, urlTrack: '' }))
        return;
    }

    const currentTab = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    if (currentTab.length === 0) return;

    const tab = currentTab[0];

    if (!tab.id) return;

    const TRACK_URL = tab.url?.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/igm)?.[0];

    if (!TRACK_URL) return

    setConfig(old => ({ ...old, urlTrack: TRACK_URL }))
}

</script>

<template>
    <div class="qtk:flex qtk:gap-4 qtk:items-center qtk:justify-between">
        <div class="qtk:flex qtk:gap-4 qtk:items-center">
            <button @click="toggleURLCapture" type="button"
                :class="clsx('qtk:p-2 qtk:rounded-full qtk:transition-all qtk:duration-75 qtk:ease-in qtk:cursor-pointer qtk:active:bg-primary-dark qtk:active:text-white', config.urlTrack ? 'qtk:bg-red-600 qtk:text-white qtk:animate-pulse' : 'qtk:bg-gray-100 qtk:text-gray-400')">
                <Capture class="qtk:size-6" />
            </button>
        </div>
        <button @click="openSettings" type="button"
            class="qtk:p-2 qtk:bg-gray-100 qtk:rounded-full qtk:transition-all qtk:duration-75 qtk:ease-in qtk:text-gray-400 qtk:cursor-pointer qtk:active:bg-primary-dark qtk:active:text-white">
            <CogIcon class="qtk:size-6" />
        </button>
    </div>
</template>