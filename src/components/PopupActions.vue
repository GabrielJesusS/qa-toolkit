<script setup lang="ts">
import CogIcon from "@/assets/cog.svg?component";

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

</script>

<template>
    <div class="qtk:flex qtk:gap-4">
        <button @click="openSettings" type="button"
            class="qtk:p-2 qtk:bg-gray-100 qtk:rounded-full qtk:transition-all qtk:duration-75 qtk:ease-in qtk:text-gray-400 qtk:cursor-pointer qtk:active:bg-primary-dark qtk:active:text-white">
            <CogIcon class="qtk:size-6" />
        </button>
    </div>
</template>