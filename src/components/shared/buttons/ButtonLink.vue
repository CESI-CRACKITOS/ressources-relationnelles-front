<template>
  <RouterLink :to="LinkTo" active-class="font-bold" class="text-xl overflow-hidden">
    <div class="flex gap-5 items-center">
      <i v-if="props.icon" :class="props.icon"></i>
      {{ props.ButtonLabel }}
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
