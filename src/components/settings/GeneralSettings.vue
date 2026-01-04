<script setup lang="ts">
import Button from "../Button.vue";
import { useConfig } from "@/composables/useConfig";

const { resetSetup } = useConfig()

</script>

<template>
    <div>
        <Button variant="danger" @click="resetSetup" type="button">
            Restart Setup
        </Button>
    </div>
</template>