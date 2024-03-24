<template>
  <div>
    <PostComponent :key="resource.id" :resource="resource" />
    <div v-for="comment in resource.comments" :key="comment.id" class="flex bg-white p-3 border-b border-gray-200 gap-2">
      <div class="w-12">
        <img :src="comment.user.profilePicture? comment.user.profilePicture: '/img'" alt="">
      </div>
      <div>
        <div class="flex gap-4">
        <p>{{ comment.user.lastname }}</p>
        <p>{{ comment.user.firstname }}</p>
      </div>
      <p>{{ comment.content }}</p>
      </div>
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
