<script setup lang="ts">
import Logo from "@/assets/logo.svg?component"
import TabGroup from "../TabGroup.vue";
import Tab from "../Tab.vue";
import TabPanel from "../TabPanel.vue";
import { ref } from "vue";
import TaigaSettings from "../settings/TaigaSettings.vue";
import GeneralSettings from "../settings/GeneralSettings.vue";
import { useConfig } from "@/composables/useConfig";
import RevalidateSession from "./RevalidateSession.vue";

const activeTab = ref<string>('general');
const { config } = useConfig()


</script>


<template>
    <section v-if="config.validSession"
        class="qtk:p-5 qtk:max-w-xl qtk:w-full qtk:mx-auto qtk:h-screen qtk:justify-between qtk:flex qtk:flex-col"
        id="home">
        <div class="qtk:text-center qtk:flex qtk:items-center qtk:mb-6 qtk:space-x-1">
            <Logo class="qtk:size-8 qtk:text-primary" />
            <h1 class="qtk:text-2xl md:qtk:text-5xl lg:qtk:text-6xl qtk:font-extrabold qtk:text-gray-900">
                QA Toolkit Settings
            </h1>
        </div>
        <div class="qtk:grow">
            <TabGroup v-model="activeTab">
                <div class="qtk:flex qtk:border-b qtk:border-gray-200">
                    <Tab value="general">General</Tab>
                    <Tab value="taiga">Taiga Settings</Tab>
                </div>
                <TabPanel value="general">
                    <GeneralSettings />
                </TabPanel>
                <TabPanel value="taiga">
                    <TaigaSettings />
                </TabPanel>
            </TabGroup>
        </div>
    </section>
    <RevalidateSession v-else />
</template>