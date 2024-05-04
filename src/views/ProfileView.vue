<template>
  <div class="flex flex-col h-full w-full overflow-auto">
    <div class="w-full flex flex-row justify-center items-center text-center relative text-xl p-4">
      <div class="absolute text-start w-full p-2" @click="back()">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div>Profil</div>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-center gap-5 w-full p-5">
      <img :src="user.profilePicture" class="rounded-full w-36" alt="" />
      <div class="relative">
        <p>{{ user.firstname + ' ' + user.lastname }}</p>
        <span class="flex items-center w-full">
          <i class="fa-solid fa-calendar me-2"></i>
          {{ formatDate(user.created_at) }}
        </span>
        <span class="flex justify-between items-center w-full">
          {{ user.relationNumber }} relations
          <div v-if="sessionUser.id != user.id" @click="userDropDown(user.id)">
            <i class="fas fa-ellipsis"></i>
          </div>
          <div :id="'userDropDown' + user.id" class="absolute hidden right-0 top-5">
            <ul class="bg-white border rounded-md shadow-md">
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
        <ButtonComponent v-if="ShowEditButton" @click="showEditModal = true">
          Editer le profil</ButtonComponent
        >
        <ButtonComponent @click="RelationModal = !RelationModal" v-if="ShowAddButton"
          >Ajouter une relation</ButtonComponent
        >
        <ButtonComponent @click="DeleteModal = !DeleteModal" v-if="ShowdeleteButton"
          >Supprimer une relation</ButtonComponent
        >
        <div
          v-if="ShowPendingButton"
          class="flex items-center cursor-not-allowed justify-center border border-indigo-600 px-4 py-2 text-indigo-600 w-full hover:bg-indigo-600 hover:text-white"
        >
          En atente
        </div>
        <ModalComponent
          modal-name="RelationType"
          :tabIndex="1"
          :libelle-modal="'Ajouter en Relation ' + user.firstname + ' ' + user.lastname"
          :is-hidden="RelationModal"
        >
          <div class="flex justify-between w-full gap-10 max-sm:flex-col">
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
            <div class="flex justify-between gap-2 w-full">
              <ButtonComponent :-remplis="true" @click="AddRelationShip()">
                Valider
              </ButtonComponent>

              <ButtonComponent @click="RelationModal = false"> Annuler </ButtonComponent>
            </div>
          </div>
        </ModalComponent>
        <ModalComponent
          :is-hidden="showEditModal"
          libelle-modal="Modifier votre profile"
          tab-index="2"
          modal-name="edit-profile-modal"
        >
          <UserEditModalContentComponent />
        </ModalComponent>
        <ModalComponent
          :is-hidden="DeleteModal"
          :libelle-modal="'Supprimer votre relation avec ' + user.firstname + ' ' + user.lastname"
          tab-index="2"
          modal-name="edit-profile-modal"
        >
          <div class="flex flex-col gap-5">
            <p>
              Êtes-vous sûr de vouloir supprimer
              <span class="font-bold">{{ user.firstname }} </span> de vos
              <span class="font-bold">{{ user.relation.typeName }} </span>?
            </p>
            <div class="flex justify-between w-full gap-10 max-sm:flex-col">
              <div class="flex justify-between gap-2 w-full">
                <ButtonComponent @click="removeRelationShip()"> Valider </ButtonComponent>

                <ButtonComponent @click="DeleteModal = false"> Annuler </ButtonComponent>
              </div>
            </div>
          </div>
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
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import PostComponent from '@/components/Shared/ResourceComponent.vue'
import router from '@/router'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import { onMounted, ref } from 'vue'
import { getUserById } from '@/composable/Utils/UserUtils'
import { AddRelation, getRelations, removeRelation } from '@/composable/Utils/RelationUtils'
import { getResourcesByUserId, getLikedResourcesByUserId } from '@/composable/Utils/ResourcesUtils'
import type ResourceEntity from '@/composable/Entities/Resource'
import RelationEntity from '@/composable/Entities/Relation'

import { onBeforeRouteUpdate } from 'vue-router'
import UserEditModalContentComponent from '@/components/App/User/UserEditModalContentComponent.vue'
import type UserEntity from '@/composable/Entities/User'
const userState = useUserStore()
const sessionUser = userState.user
let user = sessionUser
let ShowEditButton = ref(false)
let ShowAddButton = ref(false)
let ShowdeleteButton = ref(false)
let ShowPendingButton = ref(false)
let resources = ref<ResourceEntity[]>([])
let idRouter = Number(router.currentRoute.value.params.id)
let RelationModal = ref(false)
let DeleteModal = ref(false)
let show = ref(false)
let modalToOpen = ref('')
let typeRelation: RelationEntity[]
let res = ref<UserEntity>()
const showEditModal = ref(false)

onMounted(async () => {
  user = await getUserById(idRouter)

  resources.value = await getResourcesByUserId(idRouter)
  typeRelation = await getRelations()

  if (idRouter == sessionUser.id) {
    ShowEditButton.value = true
  } else if (user.relation.id) {
    if (user.relation.isPending) {
      ShowPendingButton.value = true
    } else {
      ShowdeleteButton.value = true
    }
  } else {
    ShowAddButton.value = true
  }
})

onBeforeRouteUpdate(async () => {
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
function back() {
  router.go(-1)
}

async function removeRelationShip() {
  await removeRelation(user.relation.id)
  DeleteModal.value = false
}
</script>
