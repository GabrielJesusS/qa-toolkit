<script setup lang="ts">
import { useTaigaSettings } from '@/composables/useTaigaSettings';
import { useListProjects } from '@/composables/useListProjects';
import Label from '../Label.vue';
import Select from '../Select.vue';
import Button from '../Button.vue';

const { settings, setSettings } = useTaigaSettings();
const { projects } = useListProjects();

const resetProject = () => {
    settings.value.defaultProjectId = '';
    settings.value.defaultProjectName = '';
    setSettings(settings.value);
}



const onProjectChange = (event: Event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const value = event.target.value;
    settings.value.defaultProjectId = value;
    const name = projects.value.find(project => project.id === value)?.name || '';
    settings.value.defaultProjectName = name;
    setSettings(settings.value);
}


</script>


<template>
    <div class="qtk:space-y-4">
        <div class="qtk:flex qtk:gap-4 qtk:items-end">
            <div>
                <Label for="issue-project">Select a default project</Label>
                <Select :value="settings.defaultProjectId" @change="onProjectChange" v-bind="$attrs"
                    :options="projects.map(project => ({ label: project.name, value: project.id }))" id="issue-project"
                    placeholder="Select a project"></Select>
            </div>
            <Button type="button" @click="resetProject">
                Reset
            </Button>
        </div>
    </div>
</template>