<template>
  <div
    class="flex flex-col gap-4 justify-between items-start max-xl:w-14 w-96 max-md:hidden px-8 border-r h-screen overflow-scroll"
  >
    <div class="flex gap-2 max-xl:items-center flex-col w-full">
      <img class="max-xl:hidden" src="../assets/logo.svg" alt="" />
      <ButtonLink -link-to="/feed" -button-label="Accueil" icon="fa-solid fa-house"></ButtonLink>

      <ButtonLink
        -link-to="/feed2"
        -button-label="Explorer"
        icon="fa-solid fa-magnifying-glass"
      ></ButtonLink>
      <ButtonLink
        -link-to="/notifications"
        -button-label="Notifications"
        icon="fa-solid fa-bell"
      ></ButtonLink>
      <ButtonLink :-link-to="'/profile/' + user.id" -button-label="Profile" icon="fa-solid fa-user">
      </ButtonLink>

      <button
        class="py-4 max-xl:w-12 rounded-full hover:bg-blue-300 bg-blue-200"
        @click="openModal"
      >
        <i class="fa-regular fa-paper-plane max-xl:block hidden"></i>
        <p class="max-xl:hidden">Poster</p>
      </button>
    </div>

    <div
      @click="openDropDown()"
      class="flex relative max-xl:flex-col flex-row items-center justify-between w-full mb-8 hover:bg-gray-200 rounded-full max-xl:p-0 px-4 py-2"
    >
      <div
        id="logOut"
        class="absolute w-full -top-10 left-0 hidden flex-col justify-center items-center"
      >
        <button @click="logOut()" class="w-full border flex items-center gap-3">
          <i class="fa-solid fa-sign-out"></i>
          <p>Deconnexion</p>
        </button>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <div class="flex gap-2 items-center">
        <div class="h-10 w-10 bg-amber-500 rounded-full"></div>
        <img src="" alt="" />
        <div class="max-xl:hidden">
          <p class="max-w-32 truncate">{{ user.lastname }}</p>
          <p class="max-w-32 truncate">{{ user.firstname }}</p>
        </div>
      </div>

      <div class="max-xl:hidden">
        <IconButtonComponent
          action=""
          :context-id="user.id"
          active="false"
          icon="fa-solid fa-ellipsis"
        >
        </IconButtonComponent>
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

const openModal = () => {
  const modal = document.getElementById('postModal')
  modal?.classList.toggle('hidden')
}
function openDropDown() {
  const dropDown = document.getElementById('logOut')
  dropDown?.classList.toggle('hidden')
  dropDown?.classList.toggle('flex')
}

function logOut() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.href = '/login'
}
</script>
