<script setup lang="ts">
import ConfigProvider from '@/components/providers/ConfigProvider.vue';
import TaigaSettingsProvider from '@/components/providers/TaigaSettingsProvider.vue';
import Home from '@/components/sections/Home.vue';
</script>

<template>
  <TaigaSettingsProvider>
    <ConfigProvider>
      <Home />
    </ConfigProvider>
  </TaigaSettingsProvider>
</template>
