<template>
  <div class="flex bg-white p-3 border-b border-gray-200 gap-2">
    <div class="w-12">
      <img src="./1681453032243.jpg" class="rounded-lg" alt="" />
    </div>
    <div class="flex flex-col w-full gap-2">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-row gap-2 items-center">
          <h3>Téo T'A BUS HAUT</h3>
          <span class="text-xs h-fit">7s</span>
        </div>
        <i class="fas fa-ellipsis"></i>
      </div>
      <div>
        <p>
          {{ resource.title }}
        </p>
        <p v-for="content in resource.contents" :key="content.id">
          {{ content.text }}
        </p>
      </div>

      <div class="w-full flex flex-wrap">
        <div class="w-full h-56 flex items-center justify-center border rounded-xl">
          le gros jeu de débille
        </div>
      </div>
      <div>
        <div class="flex flex-row items-center justify-start gap-2">
          <IconButtonComponentVue
            icon="far fa-heart"
            action="like"
            :context-id="resource.id"
            active="true"
          />
          <IconButtonComponentVue
            icon="far fa-comment"
            action="comment"
            :context-id="resource.id"
            active="true"
          />
          <IconButtonComponentVue
            icon="fas fa-retweet"
            action="retweet"
            :context-id="resource.id"
            active="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import IconButtonComponentVue from './shared/buttons/IconButtonComponent.vue'
const props = defineProps({
  resource: {
    type: ResourceEntity,
    required: true
  }
})
</script>
