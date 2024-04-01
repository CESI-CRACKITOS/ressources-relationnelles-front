<template>
  <div class="flex flex-col w-full hover:bg-gray-300 px-4 py-1">
    <p class="text-sm text-gray-500">{{ TrendRanking }} - Tendance</p>
    <p class="font-semibold">{{ CategorieName }}</p>
    <p class="text-sm text-gray-500">{{ NumberOfPost }} de resources</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  TrendRanking: number
  CategorieName: string
  NumberOfPost: number
}>()
</script>
