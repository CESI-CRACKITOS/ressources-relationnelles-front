<template>

  <a :href="url" class="flex items-center justify-center border border-indigo-600 px-4 py-2
    text-indigo-600 w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer text-2xl">
      {{ name }}
  </a>

</template>
<script setup>

import { defineProps } from 'vue';

defineProps({
  url: String,
  name: String,
  icon: String,
})

</script>