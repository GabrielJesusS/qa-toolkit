<script setup lang="ts">
import CogIcon from "@/assets/cog.svg?component";
import Capture from "@/assets/capture.svg?component";
import { useConfig } from "@/composables/useConfig";
import clsx from "clsx";
import IconButton from "./IconButton.vue";
import { getURLDomain } from "@/utils/url";

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

    const TRACK_URL = getURLDomain(tab.url)

    if (!TRACK_URL) return

    setConfig(old => ({ ...old, urlTrack: TRACK_URL }))
}

</script>

<template>
    <div
        :class="clsx('qtk:flex qtk:gap-4 qtk:items-center', config.setup ? ' qtk:justify-between' : ' qtk:justify-end')">
        <div v-if="config.setup" class="qtk:flex qtk:gap-4 qtk:items-center">
            <IconButton :active="!!config.urlTrack" @click="toggleURLCapture">
                <Capture class="qtk:size-6" />
            </IconButton>
        </div>
        <div v-else class="qtk:grow">
            <span class="qtk:text-gray-500 qtk:text-sm">Please complete the setup first -></span>
        </div>
        <IconButton @click="openSettings">
            <CogIcon class="qtk:size-6" />
        </IconButton>
    </div>
</template>