<template>

  <div class="bg-white p-5 border border-gray-300 border-b-4 hover:cursor-pointer hover:bg-zinc-50 rounded-md"
       :class="[borderB]">
    <h2>{{ resource.title }}</h2>

    <LinkComponent :url="`/profile/${resource.user.id}`" :name="`${resource.user.firstname} ${resource.user.lastname}`" @click.stop/>
  </div>

</template>
<script setup>
import { defineProps } from 'vue'
import ResourceEntity from '@/composable/Entities/Resource'
import LinkComponent from '@/components/App/Shared/Links/LinkComponent.vue'
const props = defineProps({
  resource: {
    type: ResourceEntity,
    required: true
  }
})
let borderB = props.resource.isPublished ? 'border-b-green-500' : 'border-b-red-500'
</script>