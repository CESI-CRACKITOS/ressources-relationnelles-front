<template>
  <div class="flex flex-row gap-3 w-full justify-center">
    <div class="flex flex-col gap-4 justify-between items-start w-64">
      <div class="flex gap-8 flex-col w-full">
        <img src="../assets/logo.svg" alt="" />
        <ButtonLink -link-to="/feed" -button-label="Accueil" icon="fa-solid fa-house"></ButtonLink>

        <ButtonLink
          -link-to="/profil"
          -button-label="Explorer"
          icon="fa-solid fa-magnifying-glass"
        ></ButtonLink>
        <button class="py-4 px-20 rounded-full hover:bg-blue-300 bg-blue-200">Poster</button>
      </div>
      <div
        class="flex flex-row items-center justify-between w-full mb-8 hover:bg-gray-200 rounded-full px-4 py-2"
      >
        <div class="flex gap-2 items-center">
          <div class="h-10 w-10 bg-amber-500 rounded-full"></div>
          <img src="" alt="" />
          <div>
            <p>{{ user.lastname }}</p>
            <p>{{ user.firstname }}</p>
          </div>
        </div>

        <div>
          <IconButtonComponent
            action=""
            :context-id="user.id"
            active="false"
            icon="fa-solid fa-ellipsis"
          ></IconButtonComponent>
        </div>
      </div>
    </div>
    <div class="h-screen rounded max-w-xl border overflow-scroll">
      <!-- Rajouter ici la creation de poste pour computer view -->
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
    <div class="flex flex-col gap-4 justify-between items-start w-64">
      <h1 class="text-2xl font-bold">Feed</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import ButtonLink from '@/components/shared/buttons/ButtonLink.vue'
import IconButtonComponent from '@/components/shared/buttons/IconButtonComponent.vue'
import { getResources } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'

import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user
console.log(user)

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  resources.value = await getResources()
})
</script>
