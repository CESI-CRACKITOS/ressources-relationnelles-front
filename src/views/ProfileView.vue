<template>
  <div class="flex flex-col w-full px-2 gap-5">
    <div class="flex justify-center">
      <img src="../feed/1681453032243.jpg" class="rounded-full w-6/12" alt="" />
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
          <div class="flex gap-5 md:justify-center">
            <p class="text-gray-600"><span class="text-black">123</span> Relation</p>
            <p class="text-gray-600"><span class="text-black">123</span> Abonnements</p>
          </div>
          <ButtonComponent class="w-full">Editer le profil</ButtonComponent>
        </div>
      </div>
    </div>
    <hr />
    <div class="w-full flex">
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center text-blue-700"
      >
        <span class="p-2">Post</span>
        <div class="h-1 w-10/12 rounded-full bg-blue-700"></div>
      </div>
      <div class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center">
        <span class="p-2">J'aime</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
      <div class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center">
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
import { getUserById } from '@/composable/Utils/UserUtils'
import { getResourcesByUserId } from '@/composable/Utils/ResourcesUtils'

const userState = useUserStore()
const sessionUser = userState.user
let user = sessionUser
let ShowEditButton = true
let resources = ref([])
onMounted(async () => {
  let idRouter = router.currentRoute.value.params.id

  // if (idRouter != sessionUser.id) {
  //   user = await getUserById(idRouter)
  //   ShowEditButton = false
  // }
  resources.value = await getResourcesByUserId(idRouter)
  console.log(resources)
})
</script>
