<script setup lang="ts">
import NewIssueForm from '../forms/NewIssueForm.vue';
import ConfigProvider from '../providers/ConfigProvider.vue';
import TaigaSettingsProvider from '../providers/TaigaSettingsProvider.vue';


interface Props {
    screenshot: string;
    onSuccess?: () => void;
}

const props = defineProps<Props>()

</script>


<template>
    <section class="qtk:flex qtk:flex-col qtk:gap-3 qtk:text-gray-900">
        <h1 class="qtk:font-semibold">
            Create issue
        </h1>
        <img :src="props.screenshot" alt="Screenshot of the issue" class="qtk:w-full qtk:rounded-md" />
        <ConfigProvider>
            <TaigaSettingsProvider>
                <NewIssueForm :screenshot="props.screenshot" :onSuccess="props.onSuccess" />
            </TaigaSettingsProvider>
        </ConfigProvider>
    </section>
</template>