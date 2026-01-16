<script setup lang="ts">
import { useListProjects } from '@/composables/useListProjects';
import Label from './Label.vue';
import Select from './Select.vue';


const { projects } = useListProjects();



</script>

<template>
    <div>
        <Label for="issue-project" required>Project</Label>
        <Select v-bind="$attrs" :options="projects.map(project => ({ label: project.name, value: project.id }))"
            id="issue-project" placeholder="Select a project"></Select>
        <!-- <Helper :error="hasTitleError" v-if="hasTitleError">{{ errors.title }}</Helper> -->
    </div>
</template>