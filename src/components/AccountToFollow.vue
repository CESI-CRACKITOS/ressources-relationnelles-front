<template>
  <div class="flex justify-between">
    <div class="flex gap-2 items-center">
      <img class="h-10 w-10 rounded-full object-cover" :src="props.user.profilePicture" alt="" />
      <div>
        <p>{{ props.user.lastname }}</p>
        <p>{{ props.user.firstname }}</p>
      </div>
    </div>
    <div>
      <button
        @click="toggleFollow"
        :class="{
          'bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800': !isFollowing,
          'bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black': isFollowing
        }"
      >
        {{ isFollowing ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserEntity from '@/composable/Entities/User'
import { AddRelation, removeRelation } from '@/composable/Utils/UserUtils'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user

const props = defineProps<{
  user: UserEntity
}>()

const isFollowing = ref(false)

const toggleFollow = async () => {
  const id = props.user.id
  console.log(isFollowing.value)

  if (isFollowing.value) {
    //await removeRelation(id.toString())
  } else {
    await AddRelation(id.toString(), user.id.toString(), '1')
  }
  isFollowing.value = !isFollowing.value
}
</script>
