<script setup lang="ts">
import Logo from '@/assets/crx.svg'
import HelloWorld from '@/components/HelloWorld.vue';
import { ref } from 'vue'

const show = ref(false)
const toggle = () => show.value = !show.value
</script>

<template>
  <div class="qtk:fixed qtk:z-100 qtk:right-0 qtk:bottom-0 qtk:font-bold qtk:flex qtk:items-end qtk:m-5">
    <div v-show="show" class="qtk:bg-white qtk:p-1 qtk:transition-opacity qtk:duration-300 " :class="show ? 'qtk:opacity-100' : 'qtk:opacity-0'">
      <HelloWorld />
    </div>
    <button class="toggle-button qtk:flex qtk:bg-purple-400 qtk:justify-center qtk:size-10 qtk:cursor-pointer" @click="toggle()">
      <img :src="Logo" alt="CRXJS logo" class="button-icon">
    </button>
  </div>
</template>

<!-- <style scoped>
.popup-container {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1.25rem;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  font-family: ui-sans-serif, system-ui, sans-serif;
  user-select: none;
  line-height: 1em;
}

.popup-content {
  background-color: white;
  color: #1f2937;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: max-content;
  height: min-content;
  padding: 0.5rem 1rem;
  margin: auto 0.5rem 0 0;
  transition: opacity 300ms;
}

.toggle-button {
  display: flex;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  border: none;
  background-color: #288cd7;
}

.toggle-button:hover {
  background-color: #1e6aa3;
}

.button-icon {
  padding: 4px;
}
</style> -->
