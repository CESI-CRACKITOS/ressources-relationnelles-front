<template>
  <div class="flex flex-col h-full w-full overflow-auto">
    <div class="flex flex-col md:flex-row items-center justify-center gap-5 w-full p-5">
      <img :src="user.profilePicture" class="rounded-full w-36" alt="" />
      <div class="relative">
        <p>{{ user.firstname + ' ' + user.lastname }}</p>
        <span class="flex justify-between items-center w-full">
          <i class="fa-solid fa-calendar"></i>
          A rejoint le {{ formatDate(user.created_at) }}
        </span>
        <span class="flex justify-between items-center w-full">
          {{ user.relationNumber }} relations
          <div @click="open()">
            <i class="fas fa-ellipsis"></i>
          </div>
          <div :id="'postDropDown' + user.id" v-if="showListBtn" class="absolute right-0 top-5">
            <ul class="bg-white border rounded-md shadow-md">
              <li
                v-if="sessionUser.id == user.id"
                @click="OpenUpdateModal()"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Modifier
              </li>
              <li
                v-if="sessionUser.id == user.id"
                @click="OpenDeleteModal()"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Suprimer
              </li>
              <li
                v-if="sessionUser.id != user.id"
                @click="OpenReportModal()"
                class="py-2 px-4 hover:bg-gray-100"
              >
                Signaler
              </li>
            </ul>
          </div>
        </span>
        <ButtonComponent v-if="ShowEditButton"> Editer le profil</ButtonComponent>
        <ButtonComponent @click="AddRelationShip()" v-if="!ShowEditButton"
          >Ajouter une relation</ButtonComponent
        >
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
      v-if="showModal"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/composable/Utils/DateUtils'
import ButtonComponent from '@/components/Shared/buttons/ButtonComponent.vue'
import PostComponent from '@/components/PostComponent.vue'
import router from '@/router'

import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import { onMounted, ref } from 'vue'
import { getUserById, AddRelation } from '@/composable/Utils/UserUtils'
import { getResourcesByUserId, getLikedResourcesByUserId } from '@/composable/Utils/ResourcesUtils'
import type ResourceEntity from '@/composable/Entities/Resource'

import { onBeforeRouteUpdate } from 'vue-router'
const userState = useUserStore()
const sessionUser = userState.user
let user = sessionUser
let ShowEditButton = false
let resources = ref<ResourceEntity[]>([])
let idRouter = router.currentRoute.value.params.id
let showModal = ref(false)
let showListBtn = ref(false)
let modalToOpen = ref('')

let res = ref<any>('')
onMounted(async () => {
  if (idRouter != sessionUser.id) {
    ShowEditButton = true
  }
  user = await getUserById(idRouter)

  resources.value = await getResourcesByUserId(idRouter)
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
async function AddRelationShip() {
  res.value = await AddRelation(sessionUser.id, user.id, 1)
}

function userDropDown() {
  let dropDown = document.getElementById('userDropDown')
  if (dropDown?.classList.contains('hidden')) {
    dropDown?.classList.remove('hidden')
  } else {
    dropDown?.classList.add('hidden')
  }
}

function open() {
  showListBtn.value = !showListBtn.value

  showModal.value = true
}

function OpenReportModal() {
  if (modalToOpen.value == 'report') {
    modalToOpen.value = ''
  }
  modalToOpen.value = 'report'
}
async function OpenDeleteModal() {
  console.log('delete', showModal.value)
  modalToOpen.value = modalToOpen.value == 'delete' ? '' : 'delete'
}
function OpenUpdateModal() {
  if (modalToOpen.value == 'update') {
    modalToOpen.value = ''
  }
  modalToOpen.value = 'update'
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
