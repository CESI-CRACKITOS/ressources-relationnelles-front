<template>
  <div class="flex w-full items-center justify-evenly border-t md:flex-col md:h-full md:w-fit md:items-start md:justify-start p-4 gap-1 xl:min-w-64">
    <ButtonLink linkTo="/feed" buttonLabel="Accueil" icon="fa-solid fa-thumbs-up" />
    <ButtonLink linkTo="/notifications" buttonLabel="Notifications" icon="fa-solid fa-bell" />
    <ButtonLink :linkTo="'/profile/' + user.id" buttonLabel="Profile" icon="fa-solid fa-user" />
    <ButtonLink linkTo="/logout" buttonLabel="Déconnexion" icon="fa-solid fa-right-from-bracket" @click="logOut()" />
    <button
      class="p-4 w-fit rounded-full hover:bg-blue-300 bg-blue-200 md:w-full"
      @click="openModal"
    >
      <i class="fa-regular fa-paper-plane block xl:hidden"></i>
      <p class="max-xl:hidden">Poster</p>
    </button>
  </div>

</template>

<script setup lang="ts">
import ButtonLink from '@/components/Shared/buttons/ButtonLink.vue'
import IconButtonComponent from '@/components/Shared/buttons/IconButtonComponent.vue'
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
