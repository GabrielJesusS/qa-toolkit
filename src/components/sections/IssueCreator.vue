<script setup lang="ts">
import { ScreenshotDataSchema } from '@/schemas/screenshot-data';
import NewIssueForm from '../forms/NewIssueForm.vue';
import TaigaSettingsProvider from '../providers/TaigaSettingsProvider.vue';
import IssueImage from '../IssueImage.vue';

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
        <IssueImage :url="props.screenshotData.screenshot" />
        <TaigaSettingsProvider>
            <NewIssueForm :screenshotData="props.screenshotData" :onSuccess="props.onSuccess" />
        </TaigaSettingsProvider>
    </section>
</template>