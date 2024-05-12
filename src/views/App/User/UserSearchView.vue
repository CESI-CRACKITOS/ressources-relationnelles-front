<template>
  <div class="flex h-screen overflow-scroll flex-col p-5 gap-2">
    <div
      v-for="user in users"
      :key="user.id"
      class="flex justify-between items-center border-b py-2"
    >
      <div class="flex items-center gap-2">
        <a :href="`/profile/${user.id}`">
          <img class="h-10 w-10 rounded-full object-cover" :src="user.profilePicture" alt="" />
        </a>
        <div cl>
          <p class="max-w-80 truncate">{{ user.lastname }}</p>
          <p class="max-w-80 truncate">{{ user.firstname }}</p>
        </div>
      </div>
      <a
        :href="`/profile/${user.id}`"
        class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600 w-fit hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
      >
        Consulter le profile
      </a>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { searchUsers } from '@/composable/Utils/UserUtils.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = ref([])

onMounted(async () => {
  users.value = await searchUsers(router.currentRoute.value.params.query)
})
</script>
