<template>

  <a :href="url" class="w-full">
    <div class="p-5 flex items-center justify-between border-b-4 border-violet-950 bg-neutral-100 w-full">
      <img :src="icon" alt="" class="h-16">
      <h3 class="text-xl text-center">
        {{ name }}
      </h3>
    </div>
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