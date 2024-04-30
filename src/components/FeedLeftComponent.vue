<template>
  <div
    class="flex w-full items-center justify-evenly h-fit border-t md:flex-col md:h-full md:w-fit md:items-start md:justify-start p-4 gap-1 bg-slate-50"
  >
    <ButtonLink linkTo="/feed" buttonLabel="Accueil" icon="fa-solid fa-thumbs-up" />
    <ButtonLink linkTo="/notifications" buttonLabel="Notifications" icon="fa-solid fa-bell" />
    <ButtonLink :linkTo="'/profile/' + user.id" buttonLabel="Profile" icon="fa-solid fa-user" />
    <ButtonLink
      linkTo="/logout"
      buttonLabel="Déconnexion"
      icon="fa-solid fa-right-from-bracket"
      @click="logOut()"
    />

    <button class="flex items-center justify-center border border-indigo-600 px-4 py-2
      rounded-full bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700" @click="openModal">
      <i class="fa-regular fa-paper-plane"></i>
    </button>
    <PostModalComponent :openModal="openModal" class="" />
  </div>
</template>

<script setup lang="ts">
import ButtonLink from '@/components/Shared/buttons/ButtonLink.vue'
import { useUserStore } from '@/stores/user'
import PostModalComponent from '@/components/PostModalComponent.vue'

const userState = useUserStore()
const user = userState.user

const openModal = () => {
  const modal = document.getElementById('postModal')
  modal?.classList.toggle('hidden')
}

function logOut() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.href = '/login'
}
</script>
