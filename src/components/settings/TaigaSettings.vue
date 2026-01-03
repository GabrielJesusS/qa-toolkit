<script setup lang="ts">
import { useTaigaSettings } from '@/composables/useTaigaSettings';
import ProjectSelector from '../ProjectSelector.vue';
import { useListProjects } from '@/composables/useListProjects';

const { settings, setSettings } = useTaigaSettings();
const { projects } = useListProjects();



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
        <ProjectSelector :value="settings.defaultProjectId" @change="onProjectChange" />
    </div>
</template>