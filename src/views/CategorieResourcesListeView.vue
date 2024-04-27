<template>
  <div class="flex h-screen overflow-scroll flex-col">
    <div
      class="w-full flex flex-row justify-center items-center text-center relative text-xl py-4">
      <div class="absolute text-start w-full p-2" @click="back()"><i class="fa-solid fa-arrow-left"></i></div>
      <div>Ressources</div>
    </div>
    <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
  </div>
</template>

<script setup lang="ts">
import type ResourceEntity from '@/composable/Entities/Resource'
import { getResourcesFromCategoryId } from '@/composable/Utils/ResourcesUtils'
import router from '@/router'
import PostComponent from '@/components/PostComponent.vue'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  resources.value = await getResourcesFromCategoryId(router.currentRoute.value.params.id.toString())
})

onBeforeRouteUpdate(async () => {
  resources.value = await getResourcesFromCategoryId(router.currentRoute.value.params.id.toString())
})
</script>
