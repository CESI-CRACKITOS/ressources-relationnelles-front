<template>
  <RouterLink
    :to="LinkTo"
    active-class="font-bold"
    class="text-xl overflow-hidden hover:bg-gray-200 py-4 rounded-full px-4"
  >
    <div class="flex gap-5 items-center">
      <i v-if="props.icon" :class="props.icon"></i>
      <p class="max-xl:hidden">{{ props.ButtonLabel }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  LinkTo: string
  ButtonLabel: string
  icon?: string
}>()
</script>
