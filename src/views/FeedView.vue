<template>
  <div class="h-full overflow-hidden">
    <div v-if="resources.length" class="overflow-scroll h-full flex flex-col">
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
