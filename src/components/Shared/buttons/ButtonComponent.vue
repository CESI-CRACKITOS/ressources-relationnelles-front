<template>
  <button
    v-if="!props.Remplis"
    class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600 w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
  >
    <slot />
  </button>
  <button
    v-else
    class="flex items-center justify-center border border-indigo-600 px-4 py-2 w-full hover:bg-white bg-indigo-600 hover:text-indigo-600 text-white hover:cursor-pointer"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  Remplis: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
