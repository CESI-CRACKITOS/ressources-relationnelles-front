<template>

  <a :href="`${url}`" class="text-blue-600 hover:underline">
    {{ name }}
  </a>

</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  url: String,
  name: String,
})
</script>