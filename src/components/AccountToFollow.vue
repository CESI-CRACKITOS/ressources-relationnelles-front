<template>
  <div class="flex justify-between" :id="`suggestion-${props.user.id}`">
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
      <button
        @click="follow"
        class="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-black"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserEntity from '@/composable/Entities/User'
import { AddRelation, removeRelation } from '@/composable/Utils/UserUtils'
import { useUserStore } from '@/stores/user'
import { defineEmits } from "vue";

const emit = defineEmits(['deleted'])

const userState = useUserStore()
const user = userState.user

const props = defineProps<{
  user: UserEntity,
}>()

const follow = async () => {
  const id = props.user.id

  await AddRelation(user.id.toString(), id, 1);

  const node = document.getElementById(`suggestion-${id}`)

  node?.remove();

  emit('deleted', props.user.id)

}
</script>
