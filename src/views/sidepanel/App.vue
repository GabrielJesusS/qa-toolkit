<script setup lang="ts">
import LoadingScreen from '@/components/LoadingScreen.vue';
import ConfigProvider from '@/components/providers/ConfigProvider.vue';
import SnackbarProvider from '@/components/providers/SnackbarProvider.vue';
import TaigaSettingsProvider from '@/components/providers/TaigaSettingsProvider.vue';
import Home from '@/components/sections/Home.vue';
import SnackbarContainer from '@/components/SnackbarContainer.vue';
</script>

<template>
  <SnackbarProvider>
    <TaigaSettingsProvider>
      <ConfigProvider lazy>
        <Home />
        <template v-slot:loading>
          <LoadingScreen />
        </template>
      </ConfigProvider>
    </TaigaSettingsProvider>
    <SnackbarContainer />
  </SnackbarProvider>
</template>
