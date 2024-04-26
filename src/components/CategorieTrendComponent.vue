<template>
  <a :href="`/category/${id}`"
    class="flex flex-col w-full hover:bg-gray-300 px-4 py-1"
  >
    <p class="text-sm text-gray-500">{{ TrendRanking }} - Tendance</p>
    <p class="font-semibold">{{ name }}</p>
    <p v-if="NumberOfPost" class="text-sm text-gray-500">{{ NumberOfPost }} ressource(s)</p>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { RouterLink } from 'vue-router'
const props = defineProps<{
  TrendRanking: number
  name: string
  NumberOfPost: number
  id: number
}>()
</script>
