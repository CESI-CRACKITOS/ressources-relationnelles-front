<template>
  <div class="flex flex-col h-full w-full overflow-auto">
    <div class="flex flex-col md:flex-row items-center justify-center gap-5 w-full p-5">
      <img :src="user.profilePicture" class="rounded-full w-36" alt="" />
      <div class="relative">
        <p>{{ user.firstname + ' ' + user.lastname }}</p>
        <span class="flex justify-between items-center w-full">
          <i class="fa-solid fa-calendar"></i>
          {{ formatDate(user.created_at) }}
        </span>
        <span class="flex justify-between items-center w-full">
          {{ user.relationNumber }} relations
          <div @click="userDropDown(user.id)">
            <i class="fas fa-ellipsis"></i>
          </div>
          <div :id="'userDropDown' + user.id" class="absolute hidden right-0 top-5">
            <ul class="bg-white border rounded-md shadow-md">
              <li
                v-if="sessionUser.id == user.id"
                @click="openModal('update')"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Modifier
              </li>
              <li
                v-if="sessionUser.id == user.id"
                @click="openModal('delete')"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Suprimer
              </li>
              <li
                v-if="sessionUser.id != user.id"
                @click="openModal('report')"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Signaler
              </li>
            </ul>
          </div>
        </span>
        <ButtonComponent v-if="!ShowEditButton" @click="showEditModal = true"> Editer le profil</ButtonComponent>
        <ButtonComponent @click="RelationModal = !RelationModal" v-if="ShowEditButton"
          >Ajouter une relation</ButtonComponent
        >
        <ModalComponent
          modal-name="RelationType"
          :tabIndex="1"
          :libelle-modal="'Ajouter en Relation ' + user.firstname + ' ' + user.lastname"
          :is-hidden="RelationModal"
        >
          <div class="flex justify-between w-full gap-10">
            <select
              class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2"
              v-model="checkedOne"
              required
            >
              <option disabled selected value="">Veuillez choisir un type de relation</option>
              <option v-for="relation in typeRelation" :key="relation.id" :value="relation.id">
                {{ relation.name }}
              </option>
            </select>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 bg-green-500 text-white rounded-md"
                @click="AddRelationShip()"
              >
                Valider
              </button>

              <button
                class="px-4 py-2 bg-red-500 text-white rounded-md"
                @click="RelationModal = false"
              >
                Annuler
              </button>
            </div>
          </div>
        </ModalComponent>
        <ModalComponent :is-hidden="showEditModal" libelle-modal="Modifier votre profile" tab-index="2" modal-name="edit-profile-modal">
          <UserEditModalContentComponent />
        </ModalComponent>
      </div>
    </div>

    <div class="w-full flex">
      <div
        class="w-1/2 flex flex-col justify-center items-center hover:bg-slate-300 text-center text-blue-700 cursor-pointer"
        @click="Display('post')"
        id="post"
      >
        <span class="p-2">Resource</span>
        <div class="h-1 w-10/12 rounded-full bg-blue-700"></div>
      </div>
      <div
        class="w-1/2 flex flex-col justify-center items-center hover:bg-slate-300 text-center cursor-pointer"
        @click="Display('like')"
        id="like"
      >
        <span class="p-2">J'aime</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
    </div>
    <div class="">
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
    <ListActionModalComponent
      -modal-type="user"
      :target-id="user.id"
      :modal-to-open="modalToOpen"
      v-if="show"
    ></ListActionModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/composable/Utils/DateUtils'
import ButtonComponent from '@/components/Shared/buttons/ButtonComponent.vue'
import PostComponent from '@/components/Resource/ResourceComponent.vue'
import router from '@/router'
import ModalComponent from '@/components/Shared/ModalComponent.vue'
import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import { onMounted, ref } from 'vue'
import { getUserById } from '@/composable/Utils/UserUtils'
import { AddRelation, getRelations } from '@/composable/Utils/RelationUtils'
import { getResourcesByUserId, getLikedResourcesByUserId } from '@/composable/Utils/ResourcesUtils'
import type ResourceEntity from '@/composable/Entities/Resource'
import RelationEntity from '@/composable/Entities/Relation'

import { onBeforeRouteUpdate } from 'vue-router'
import UserEditModalContentComponent from '@/components/User/UserEditModalContentComponent.vue'
const userState = useUserStore()
const sessionUser = userState.user
let user = sessionUser
let ShowEditButton = false
let resources = ref<ResourceEntity[]>([])
let idRouter = Number(router.currentRoute.value.params.id)
let RelationModal = ref(false)
let show = ref(false)
let modalToOpen = ref('')
let typeRelation: RelationEntity[]
let res = ref<any>('')
const showEditModal = ref(false);

onMounted(async () => {
  if (idRouter != sessionUser.id) {
    ShowEditButton = true
  }

  user = await getUserById(idRouter)

  resources.value = await getResourcesByUserId(idRouter)
  typeRelation = await getRelations()
})

onBeforeRouteUpdate(async () => {
  if (idRouter != sessionUser.id) {
    ShowEditButton = true
  }
  user = await getUserById(idRouter)

  resources.value = await getResourcesByUserId(idRouter)
})

async function Display(type: string) {
  switch (type) {
    case 'like':
      document.getElementById('like')?.classList.add('text-blue-700')
      document.getElementById('like')?.children[1].classList.add('bg-blue-700')
      document.getElementById('retweet')?.classList.remove('text-blue-700')
      document.getElementById('retweet')?.children[1].classList.remove('bg-blue-700')
      document.getElementById('post')?.classList.remove('text-blue-700')
      document.getElementById('post')?.children[1].classList.remove('bg-blue-700')

      resources.value = await getLikedResourcesByUserId(idRouter)
      break
    case 'post':
      document.getElementById('post')?.classList.add('text-blue-700')
      document.getElementById('post')?.children[1].classList.add('bg-blue-700')
      document.getElementById('like')?.classList.remove('text-blue-700')
      document.getElementById('like')?.children[1].classList.remove('bg-blue-700')
      document.getElementById('retweet')?.classList.remove('text-blue-700')
      document.getElementById('retweet')?.children[1].classList.remove('bg-blue-700')
      resources.value = await getResourcesByUserId(idRouter)
      break
    default:
      break
  }
}
let checkedOne = ref('')
async function AddRelationShip() {
  res.value = await AddRelation(sessionUser.id, user.id, checkedOne.value)
  RelationModal.value = false
}
function userDropDown(id: number) {
  show.value = true
  const dropDown = document.getElementById('userDropDown' + id)
  dropDown?.classList.toggle('hidden')
}

function openModal(type: string) {
  modalToOpen.value = type
}

let copied = ref(false)

function copyRegisterLink() {
  const registerUrl = `${window.location.origin}/home`
  navigator.clipboard
    .writeText(registerUrl)
    .then(() => {
      copied.value = true
    })
    .catch((err) => {
      console.error('Could not copy text: ', err)
    })
}
</script>
