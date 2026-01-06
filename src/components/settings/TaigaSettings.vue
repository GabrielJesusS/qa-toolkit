<script setup lang="ts">
import { useTaigaSettings } from '@/composables/useTaigaSettings';
import { useListProjects } from '@/composables/useListProjects';
import Label from '../Label.vue';
import Select from '../Select.vue';
import Button from '../Button.vue';

const { settings, setSettings } = useTaigaSettings();
const { projects } = useListProjects();

const resetProject = () => {
    setSettings({
        defaultProjectId: '',
        defaultProjectName: '',
    });
}

const onProjectChange = (event: Event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const value = event.target.value;

    const name = projects.value.find(project => project.id === value)?.name || '';

    setSettings({
        defaultProjectId: value,
        defaultProjectName: name,
    });
}

</script>


<template>
    <div class="qtk:space-y-4">
        <div class="qtk:flex qtk:gap-2 qtk:items-end qtk:w-full">
            <div class="qtk:w-full">
                <Label for="issue-project">Select a default project</Label>
                <Select :value="settings.defaultProjectId" @change="onProjectChange" v-bind="$attrs"
                    :options="projects.map(project => ({ label: project.name, value: project.id }))" id="issue-project"
                    placeholder="Select a project"></Select>
            </div>
            <Button variant="danger" type="button" @click="resetProject">
                Reset
            </Button>
        </div>
    </div>
</template>