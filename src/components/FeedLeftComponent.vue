<template>
  <div
    class="flex w-full items-center justify-evenly h-fit border-t md:flex-col md:h-full md:w-fit md:items-start md:justify-start p-4 gap-1 bg-slate-50"
  >
    <ButtonLink linkTo="/feed" buttonLabel="Accueil" icon="fa-solid fa-house-chimney" />
    <ButtonLink linkTo="/notifications" buttonLabel="Notifications" icon="fa-solid fa-bell" />
    <ButtonLink :linkTo="'/profile/' + user.id" buttonLabel="Profile" icon="fa-solid fa-user" />
    <ButtonLink linkTo="/category" buttonLabel="Category" icon="fa-solid fa-list" />
    <ButtonLink
      linkTo="/logout"
      buttonLabel="Déconnexion"
      icon="fa-solid fa-right-from-bracket"
      @click="logOut()"
    />
    <ButtonLink
      linkTo="/admin/resources"
      buttonLabel="Admin mode"
      icon="fa-solid fa-user-tie"
      v-if="user.isAdmin"
    />

    <button class="flex items-center justify-center border border-indigo-600 px-4 py-2
      rounded-full bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700" @click="openModal">
      <i class="fa-regular fa-paper-plane"></i>
    </button>
    <ModalComponent :is-hidden="modalShown" libelle-modal="Créer une ressource" :tab-index="1" modal-name="create-resource">
      <ResourceModalContent @closeModal="modalShown = false" />
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonLink from '@/components/App/Shared/buttons/ButtonLink.vue'
import { useUserStore } from '@/stores/user'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import { ref } from 'vue'
import ResourceModalContent from '@/components/App/Resource/ResourceModalContent.vue'

const userState = useUserStore()
const user = userState.user
const modalShown = ref(false);

const openModal = () => {
  modalShown.value = !modalShown.value
}

function logOut() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.href = '/login'
}
</script>
