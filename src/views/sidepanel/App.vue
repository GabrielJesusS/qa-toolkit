<script setup lang="ts">
import LoadingScreen from '@/components/LoadingScreen.vue';
import ConfigProvider from '@/components/providers/ConfigProvider.vue';
import TaigaSettingsProvider from '@/components/providers/TaigaSettingsProvider.vue';
import Home from '@/components/sections/Home.vue';
</script>

<template>
  <TaigaSettingsProvider>
    <ConfigProvider>
      <Home />
      <template v-slot:loading>
        <LoadingScreen />
      </template>
    </ConfigProvider>
  </TaigaSettingsProvider>
</template>
