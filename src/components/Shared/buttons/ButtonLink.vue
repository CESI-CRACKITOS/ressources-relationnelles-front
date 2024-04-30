<template>
  <a :href="linkTo" :class="`text-xl text-slate-700 p-4 ${isActive ? 'text-indigo-600' : ''}`">
    <div class="flex gap-5 items-center w-full">
      <i v-if="icon" :class="icon"></i>
    </div>
  </a>
</template>

<script setup>

import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
  linkTo: String,
  buttonLabel: String,
  icon: String
})


const isActive = router.currentRoute.value.fullPath === props.linkTo;

</script>
