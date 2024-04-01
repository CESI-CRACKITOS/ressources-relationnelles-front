<template>
  <div class="flex flex-row gap-3 w-full justify-center">
    <FeedLeftComponent />
    <div class="h-screen rounded max-w-xl border overflow-scroll">
      <!-- Rajouter ici la creation de poste pour computer view -->
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
    <FeedRightComponent />
  </div>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import { getResources } from '@/composable/Utils/ResourcesUtils'
import FeedLeftComponent from '@/components/FeedLeftComponent.vue'
import FeedRightComponent from '@/components/FeedRightComponent.vue'
import { onMounted, ref } from 'vue'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  resources.value = await getResources()
})
</script>
