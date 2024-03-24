<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="h-screen rounded">
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import { getResources } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  resources.value = await getResources()
})
</script>
