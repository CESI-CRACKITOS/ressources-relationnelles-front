<template>

  <div class="flex flex-col bg-white max-h-[700px] max-w-[900px] overflow-y-auto rounded-md" :class="[border]">
    <div class="flex items-center justify-between p-5 bg-white sticky top-0">
      <div class="flex gap-1">
        <h1 class="text-xl">
          {{ resource.title }}
        </h1>
        <span class="flex items-center text-sm text-gray-600">
          {{ resource.timeFromPublish }}
        </span>
      </div>
      <LinkComponent :url="`/profile/${resource.user.id}`" :name="`${resource.user.firstname} ${resource.user.lastname}`" @click.stop/>
    </div>

    <div v-for="content in resource.contents" :content="content" :key="content.id" >
      <div class="border-b border-gray-300 p-5">
        <p class="text-lg">
          {{ content.text }}
        </p>
      </div>
    </div>

    <div class="flex justify-between p-5">

      <ButtonComponent btnStyle="primary" @click="acceptResource(resource.id)">
        Accepter
      </ButtonComponent>
      <ButtonComponent btnStyle="danger" @click="refuseResource(resource.id)">
        Rejeter
      </ButtonComponent>
    </div>
  </div>

</template>
<script setup>
import { defineProps } from 'vue'
import ResourceEntity from '@/composable/Entities/Resource'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { accept, refuse } from '@/composable/Utils/Admin/ResourceUtils.ts'
import LinkComponent from '@/components/App/Shared/Links/LinkComponent.vue'
const props = defineProps({
  resource: {
    type: ResourceEntity,
    required: true
  }
})
const acceptResource = async (id) => {
  await accept(id)
  window.location.reload()
}
const refuseResource = async (id) => {
  await refuse(id)
  window.location.reload()
}
let border = props.resource.isPublished ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'
</script>