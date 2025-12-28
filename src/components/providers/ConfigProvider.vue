<script setup lang="ts">
import { browserClient } from '@/core/BrowserClient';
import { HandlerMapEnum } from '@/core/enums/HandlerMapEnum';
import { onMounted, provide, ref } from 'vue';
import { ProviderSetupSchema } from '@/schemas/provider-setup';

const check = async () => {
    const result = await browserClient.sendMessage({
        type: HandlerMapEnum.PROVIDER_SETUP_CHECK,
    })

    return result as ProviderSetupSchema;
}

const providerSetup = ref<ProviderSetupSchema | null>(null);
const hasLoaded = ref(false);

onMounted(async () => {
    if (!hasLoaded.value) {
        providerSetup.value = await check();
        hasLoaded.value = true;
    }
})

provide('provider-setup', providerSetup);
provide('reset-setup', () => {
    providerSetup.value = { setup: false, provider: '' };
});

</script>

<template>
    <slot v-if="hasLoaded" />
    <div v-else>
        Loading...
    </div>
</template>