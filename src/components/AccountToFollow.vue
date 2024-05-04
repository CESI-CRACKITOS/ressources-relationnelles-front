<template>
  <div class="flex justify-between items-center" :id="`suggestion-${props.user.id}`">
    <div class="flex gap-2 items-center">
      <a :href="`/profile/${props.user.id}`">
        <img class="h-10 w-10 rounded-full object-cover" :src="props.user.profilePicture" alt="" />
      </a>

      <div>
        <p class="max-w-80 truncate">{{ props.user.lastname }}</p>
        <p class="max-w-80 truncate">{{ props.user.firstname }}</p>
      </div>
    </div>
    <div>
      <a :href="`/profile/${props.user.id}`" class="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-black" >Profil
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserEntity from '@/composable/Entities/User'
import { AddRelation, removeRelation } from '@/composable/Utils/UserUtils'
import { useUserStore } from '@/stores/user'




const userState = useUserStore()
const user = userState.user

const props = defineProps<{
  user: UserEntity,
}>()

</script>
