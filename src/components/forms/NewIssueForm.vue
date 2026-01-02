<script setup lang="ts">
import Button from '../Button.vue';
import Input from '../Input.vue';
import Label from "../Label.vue";
import Helper from "../Helper.vue";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from "@vee-validate/valibot"
import { computed } from "vue";
import { NewIssueSchema } from '@/schemas/new-issue';
import ProjectSelector from '../ProjectSelector.vue';
import { browserClient } from '@/core/BrowserClient';
import { HandlerMapEnum } from '@/core/enums/HandlerMapEnum';

interface Props {
    screenshot: string;
    onSuccess?: () => void;
}

const props = defineProps<Props>();

const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(NewIssueSchema),
    initialValues: {
        title: '',
        project: '',
        description: '',
    }
});

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');
const { value: project } = useField<string>('project');


const onSubmit = handleSubmit(async values => {
    await browserClient.sendMessage({
        type: HandlerMapEnum.CREATE_ISSUE,
        data: {
            title: values.title,
            description: values.description,
            projectId: values.project,
            print: props.screenshot,
        },
    });

    props.onSuccess?.();
});

const hasTitleError = computed(() => !!errors?.value.title);
const hasDescriptionError = computed(() => !!errors?.value.description);


</script>


<template>
    <form @submit="onSubmit" class="qtk:space-y-4 qtk:max-w-2xs qtk:flex qtk:flex-col qtk:items-stretch qtk:w-full">
        <div>
            <Label for="issue-title" required>Title</Label>
            <Input id="issue-title" :error="hasTitleError" v-model="title" type="text" placeholder="Issue title" />
            <Helper :error="hasTitleError" v-if="hasTitleError">{{ errors.title }}</Helper>
        </div>

        <div>
            <Label for="issue-description" required>Description</Label>
            <Input id="issue-description" :error="hasDescriptionError" v-model="description" type="text"
                placeholder="Issue description" />
            <Helper :error="hasDescriptionError" v-if="hasDescriptionError">{{ errors.description }}</Helper>
        </div>

        <ProjectSelector v-model="project" />

        <Button :loading="isSubmitting" type="submit">
            Create issue
        </Button>
    </form>
</template>