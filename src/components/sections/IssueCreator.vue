<script setup lang="ts">
import { ScreenshotDataSchema } from '@/schemas/screenshot-data';
import NewIssueForm from '../forms/NewIssueForm.vue';
import TaigaSettingsProvider from '../providers/TaigaSettingsProvider.vue';

interface Props {
    screenshotData: ScreenshotDataSchema;
    onSuccess?: () => void;
}

const props = defineProps<Props>()

</script>


<template>
    <section class="qtk:flex qtk:flex-col qtk:gap-3 qtk:text-gray-900">
        <h2 class="qtk:font-bold qtk:text-lg qtk:leading-6">
            Create issue
        </h2>
        <img :src="props.screenshotData.screenshot" alt="Screenshot of the issue" class="qtk:w-full qtk:rounded-md" />
        <TaigaSettingsProvider>
            <NewIssueForm :screenshotData="props.screenshotData" :onSuccess="props.onSuccess" />
        </TaigaSettingsProvider>
    </section>
</template>