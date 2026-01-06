<script setup lang="ts">

import Logo from "@/assets/logo.svg?component"
import PopupActions from "@/components/PopupActions.vue";

</script>

<template>
  <div class="qtk:bg-white qtk:w-xs qtk:p-4 qtk:flex qtk:flex-col qtk:gap-4">
    <div class="qtk:flex qtk:gap-2 qtk:items-center">
      <Logo class="qtk:size-8 qtk:text-primary" />
      <h1 class="qtk:text-xl md:qtk:text-5xl lg:qtk:text-6xl qtk:font-extrabold qtk:text-primary">
        QA Toolkit
      </h1>
    </div>
    <PopupActions />
  </div>
</template>