<template>
  <RouterLink
    :to="{ name: 'categoryResourcesList', params: { id: id } }"
    class="flex flex-col w-full py-2 hover:font-bold"
  >
    <p class="text-sm text-gray-500">{{ TrendRanking }} - Tendance</p>
    <p class="font-semibold">{{ name }}</p>
    <p v-if="NumberOfPost" class="text-sm text-gray-500">{{ NumberOfPost }} ressource(s)</p>
  </RouterLink>
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
