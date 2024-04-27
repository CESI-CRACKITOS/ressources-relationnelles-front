<template>
  <RouterLink
    :to="linkTo"
    active-class="font-bold"
    class="text-xl overflow-hidden hover:bg-gray-200 py-4 rounded-full px-4"
  >
    <div class="flex gap-5 items-center w-full">
      <i v-if="icon" :class="icon"></i>
      <p class="hidden xl:block">{{ buttonLabel }}</p>
    </div>
  </RouterLink>
</template>

<script setup>

const props = defineProps({
  linkTo: String,
  buttonLabel: String,
  icon: String
})

</script>
