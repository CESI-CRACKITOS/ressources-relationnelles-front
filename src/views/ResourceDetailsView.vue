<template>
  <div>
    <PostComponent :key="resource.id" :resource="resource" />
    <div v-for="comment in resource.comments" :key="comment.id">
      <p>{{ comment.id }}</p>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import PostComponent from '@/components/PostComponent.vue'
import { getResourceById } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import router from '@/router'

let resource = ref<ResourceEntity[]>([])

let idResource = router.currentRoute.value.params.id

onMounted(async () => {
  resource.value = await getResourceById(idResource)

  console.log(resource.value)
})
</script>
