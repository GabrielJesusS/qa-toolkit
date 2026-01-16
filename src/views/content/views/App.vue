<script setup lang="ts">

import SnackbarContainer from "@/components/SnackbarContainer.vue";
import SnackbarProvider from "@/components/providers/SnackbarProvider.vue";
import ConfigProvider from "@/components/providers/ConfigProvider.vue";
import ContentApp from "@/components/sections/ContentApp.vue";

</script>

<template>
  <SnackbarProvider>
    <ConfigProvider>
      <ContentApp />
    </ConfigProvider>
    <SnackbarContainer />
  </SnackbarProvider>
</template>