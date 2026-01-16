<script setup lang="ts">
import Button from "../Button.vue";
import { useConfig } from "@/composables/useConfig";
import Slider from "../Slider.vue";
import Label from "../Label.vue";
import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";

const { config, setConfig } = useConfig()

async function resetSetup() {
    await browserClient.sendMessage({
        type: HandlerMapEnum.RESET_APP
    })
}

</script>

<template>
    <div class="qtk:space-y-4">
        <div class="qtk:flex qtk:items-center qtk:gap-3">
            <Slider id="qtk-track-network" :model-value="config.sendNetwork ?? false"
                @update:model-value="newValue => setConfig(old => ({ ...old, sendNetwork: newValue }))" />
            <Label for="qtk-track-network">Track network requests</Label>
        </div>
        <Button variant="danger" @click="resetSetup" type="button">
            Restart Setup
        </Button>
    </div>
</template>