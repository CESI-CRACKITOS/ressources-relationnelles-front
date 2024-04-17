<template>
  <div class="flex h-screen overflow-scroll flex-col">
    <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
  </div>
</template>

<script setup lang="ts">
import type ResourceEntity from '@/composable/Entities/Resource'
import { getResourcesFromCategoryId } from '@/composable/Utils/ResourcesUtils'
import router from '@/router'
import PostComponent from '@/components/PostComponent.vue'
import { onMounted, ref } from 'vue'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  resources.value = await getResourcesFromCategoryId(router.currentRoute.value.params.id.toString())
  console.log(resources)
})
</script>
