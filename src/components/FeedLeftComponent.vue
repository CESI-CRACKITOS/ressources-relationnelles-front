<template>
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
</template>

<script setup lang="ts">
import ButtonLink from '@/components/shared/buttons/ButtonLink.vue'
import IconButtonComponent from '@/components/shared/buttons/IconButtonComponent.vue'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user
</script>
