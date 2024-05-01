<template>
  <div class="flex flex-col h-full w-full">
    <div class="w-full flex flex-row justify-center items-center text-center relative text-xl p-4">
      <div class="absolute text-start w-full p-2" @click="back()">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div>Notifications</div>
    </div>

    <div v-for="pendingRelation in pendingRelations" :key="pendingRelation.id" class="px-5">
      <div class="flex flex-col sm:flex-row gap-5 items-center justify-between">
        <div class="flex flex-row items-center">
          <img :src="pendingRelation.user.profilePicture" class="w-10 h-10 rounded-full" />
          <div class="flex flex-col ml-2">
            <span class="font-bold"
              >{{ pendingRelation.user.firstname }}
              <span class="text-gray-500">{{ pendingRelation.user.lastname }}</span>
            </span>
            <span class="text-sm text-gray-500">{{
              formatDate(pendingRelation.user.created_at)
            }}</span>
          </div>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <button
            @click="acceptRelation(pendingRelation.id)"
            class="flex items-center justify-center px-4 py-2 w-full bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700"
          >
            Accepter
          </button>
          <button
            @click="refuseRelation(pendingRelation.id)"
            class="flex items-center justify-center px-4 py-2 w-full bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
          >
            Décliner
          </button>
        </div>
      </div>
      <hr class="my-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PendingRelationEntity from '@/composable/Entities/PendingRelation'

import {
  getPendingRelation,
  acceptPendingRelation,
  refusePendingRelation
} from '@/composable/Utils/UserUtils'
import { onMounted, ref } from 'vue'
import { formatDate } from '@/composable/Utils/DateUtils'
import router from '@/router'

let pendingRelations = ref<PendingRelationEntity[]>([])
onMounted(async () => {
  pendingRelations.value = await getPendingRelation()
})

function acceptRelation(id: number) {
  acceptPendingRelation(id)

  pendingRelations.value = pendingRelations.value.filter(
    (pendingRelation) => pendingRelation.id !== id
  )
}

function refuseRelation(id: number) {
  refusePendingRelation(id)

  pendingRelations.value = pendingRelations.value.filter(
    (pendingRelation) => pendingRelation.id !== id
  )
}
function back() {
  router.go(-1)
}
</script>
