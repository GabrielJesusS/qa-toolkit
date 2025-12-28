<script setup lang="ts">
import ConfigProvider from '@/components/providers/ConfigProvider.vue';
import Home from '@/components/sections/Home.vue';
</script>

<template>
  <ConfigProvider>
    <Home />
  </ConfigProvider>
</template>
