<template>
  <div class="flex flex-col px-2 gap-5">
    <div class="flex justify-center">
      <img src="" class="rounded-full w-6/12" alt="" />
    </div>
    <div class="flex flex-col w-full gap-5">
      <div class="flex flex-col gap-5 justify-around md:flex-row">
        <div class="h-36 w-36 bg-amber-500 rounded-full"></div>
        <div class="flex flex-col gap-1.5 md:justify-center">
          <div>
            <h3 class="text-lg">{{ user.firstname + ' ' + user.lastname }}</h3>
            <p class="text-gray-600 text-xs">
              <i class="fa-solid fa-calendar"></i> A rejoint le {{ formatDate(user.created_at) }}
            </p>
          </div>
          <div class="">
            <p class="text-gray-600">
              <span class="text-black">{{ user.relationNumber }}</span> Relation
            </p>
          </div>
          <ButtonComponent :hidden="ShowEditButton" class="w-full"
            >Editer le profil</ButtonComponent
          >
          <ButtonComponent
            @click="AddRelationShip()"
            :hidden="!ShowEditButton"
            class="w-full"
            :v-if="res.message == 'OK'"
            >Ajouter une relation</ButtonComponent
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="w-full flex">
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center text-blue-700"
        @click="Display('post')"
        id="post"
      >
        <span class="p-2">Resource</span>
        <div class="h-1 w-10/12 rounded-full bg-blue-700"></div>
      </div>
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center"
        @click="Display('like')"
        id="like"
      >
        <span class="p-2">J'aime</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center"
        @click="Display('retweet')"
        id="retweet"
      >
        <span class="p-2">Repartagé</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/composable/Utils/DateUtils'
import ButtonComponent from '@/components/shared/buttons/ButtonComponent.vue'
import PostComponent from '@/components/PostComponent.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { getUserById, AddRelation } from '@/composable/Utils/UserUtils'
import { getResourcesByUserId, getLikedResourcesByUserId } from '@/composable/Utils/ResourcesUtils'

const userState = useUserStore()
const sessionUser = userState.user
let user = sessionUser
let ShowEditButton = false
let resources = ref([])
let idRouter = router.currentRoute.value.params.id.toString()

let res = ref<any>('')
onMounted(async () => {
  if (idRouter != sessionUser.id) {
    ShowEditButton = true
  }
  user = await getUserById(idRouter)
  console.log(user)

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
    case 'retweet':
      document.getElementById('retweet')?.classList.add('text-blue-700')
      document.getElementById('retweet')?.children[1].classList.add('bg-blue-700')
      document.getElementById('like')?.classList.remove('text-blue-700')
      document.getElementById('like')?.children[1].classList.remove('bg-blue-700')
      document.getElementById('post')?.classList.remove('text-blue-700')
      document.getElementById('post')?.children[1].classList.remove('bg-blue-700')
      break
    default:
      break
  }
}
async function AddRelationShip() {
  res.value = await AddRelation(sessionUser.id, user.id, 1)
}
</script>
