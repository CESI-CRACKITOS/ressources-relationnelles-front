<template>
  <div class="flex justify-between">
    <div class="flex gap-2 items-center">
      <img class="h-10 w-10 rounded-full object-cover" :src="urlImage" alt="" />
      <div>
        <p>{{ props.lastname }}</p>
        <p>{{ props.firstname }}</p>
      </div>
    </div>
    <div>
      <button class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">Suivre</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  lastname: string
  firstname: string
  urlImage: string
}>()
</script>
