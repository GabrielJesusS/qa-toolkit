<script setup lang="ts">
import Button from '../Button.vue';
import Input from '../Input.vue';
import Label from "../Label.vue";
import Helper from "../Helper.vue";
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from "@vee-validate/valibot"
import { computed } from "vue";
import { NewIssueSchema } from '@/schemas/new-issue';
import { sleep } from '@/utils/sleep';
import ProjectSelector from '../ProjectSelector.vue';


const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(NewIssueSchema),
    initialValues: {
        title: ''
    }
});

const { value: title } = useField<string>('title');

const onSubmit = handleSubmit(async values => {
    console.log(values);

    await sleep(2000);
});

const hasTitleError = computed(() => !!errors?.value.title);


</script>


<template>
    <form @submit="onSubmit" class="qtk:space-y-4 qtk:max-w-2xs qtk:flex qtk:flex-col qtk:items-stretch qtk:w-full">
        <div>
            <Label for="issue-title" required>Title</Label>
            <Input id="issue-title" :error="hasTitleError" v-model="title" type="text" placeholder="Issue title" />
            <Helper :error="hasTitleError" v-if="hasTitleError">{{ errors.title }}</Helper>
        </div>

        <ProjectSelector />

        <Button :loading="isSubmitting" type="submit">
            Create issue
        </Button>
    </form>
</template>