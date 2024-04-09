<template>
  <div class="h-screen rounded max-w-xl overflow-scroll max-xl:mr-0">
    <PostComponent :key="resource.id" :resource="resource" />
    <div
      v-for="comment in resource.comments"
      :key="comment.id"
      class="flex bg-white p-3 border-b border-gray-200 gap-2"
    >
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import PostComponent from '@/components/PostComponent.vue'
import { getResourceById } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import router from '@/router'
import CommentComponent from '@/components/CommentComponent.vue'

let resource = ref<ResourceEntity[]>([])

let idResource = router.currentRoute.value.params.id
console.log(idResource)

onMounted(async () => {
  resource.value = await getResourceById(idResource)
  console.log(resource.value)
})
</script>
