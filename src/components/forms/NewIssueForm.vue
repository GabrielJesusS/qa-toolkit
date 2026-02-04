<script setup lang="ts">
import Button from '../Button.vue';
import Input from '../Input.vue';
import Label from "../Label.vue";
import Helper from "../Helper.vue";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from "@vee-validate/valibot"
import { computed, h, watch } from "vue";
import { NewIssueSchema } from '@/schemas/new-issue';
import ProjectSelector from '../ProjectSelector.vue';
import { browserClient } from '@/core/BrowserClient';
import { HandlerMapEnum } from '@/core/enums/HandlerMapEnum';
import { useSnackbar } from '@/composables/useSnackbar';
import Textarea from '../Textarea.vue';
import { useTaigaSettings } from '@/composables/useTaigaSettings';
import { useConfig } from '@/composables/useConfig';
import { ScreenshotDataSchema } from '../../schemas/screenshot-data';
import { safeParseAsync } from 'valibot';
import { IssueResultSchema } from '@/schemas/issue-result';
import IssueFeedback from '../IssueFeedback.vue';
import { useTaigaTags } from '@/composables/useTaigaTags';
import Combobox from '../Combobox.vue';

interface Props {
    screenshotData: ScreenshotDataSchema;
    onSuccess?: () => void;
}

const props = defineProps<Props>();

const { config } = useConfig();
const { settings } = useTaigaSettings();

const isTaigaProvider = computed(() => config.value.provider === "taiga");

const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(NewIssueSchema),
    initialValues: {
        title: '',
        project: isTaigaProvider.value ? settings.value.defaultProjectId : '',
        description: '',
    }
});

const { notify } = useSnackbar()

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');
const { value: project, setValue } = useField<string>('project');
const { value: tags } = useField<string[]>('tags');
const { tagsOptions } = useTaigaTags(project)

const mappedTagsOptions = computed(() => {
    return tagsOptions.value.map(tag => ({
        label: tag.name,
        value: tag.value,
    }))
})

watch(settings, () => {
    setValue(settings.value.defaultProjectId)
})


const onSubmit = handleSubmit(async values => {
    try {
        const result = await browserClient.sendMessage({
            type: HandlerMapEnum.CREATE_ISSUE,
            data: {
                title: values.title,
                description: values.description,
                projectId: values.project,
                print: props.screenshotData.screenshot,
                href: props.screenshotData.location,
                tags: values.tags,
            },
        });

        const parsedResult = await safeParseAsync(IssueResultSchema, result)

        if (!parsedResult.success) {
            notify('Issue created successfully', 'success', 3000);
            return
        }

        notify(h(IssueFeedback, { url: parsedResult.output.url }), 'success', 6000);
        props.onSuccess?.();
    } catch (error) {
        notify('Failed to create issue, please try again.', 'error');
    }
});

const hasTitleError = computed(() => !!errors?.value.title);
const hasDescriptionError = computed(() => !!errors?.value.description);

</script>


<template>
    <form @submit="onSubmit" class="qtk:space-y-4 qtk:max-w-2xs qtk:flex qtk:flex-col qtk:items-stretch qtk:w-full">
        <div>
            <Label for="issue-title" required>Title</Label>
            <Input :maxlength="255" id="issue-title" :error="hasTitleError" v-model="title" type="text"
                placeholder="Issue title" />
            <Helper :error="hasTitleError" v-if="hasTitleError">{{ errors.title }}</Helper>
        </div>

        <div>
            <Label for="issue-description" required>Description</Label>
            <Textarea :maxlength="512" id="issue-description" :error="hasDescriptionError" v-model="description"
                type="text" placeholder="Issue description" />
            <Helper :error="hasDescriptionError" v-if="hasDescriptionError">{{ errors.description }}</Helper>
        </div>
        <ProjectSelector v-model="project" v-show="!settings.defaultProjectId" />
        <div v-if="!!project">
            <Label for="issue-tags">Tags</Label>
            <Combobox v-model="tags" :options="mappedTagsOptions" multiple />
        </div>
        <Button :loading="isSubmitting" type="submit">
            Create issue
        </Button>
    </form>
</template>