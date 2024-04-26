<template>
  <div
    class="flex-col gap-4 items-start h-screen px-4 min-w-72"
  >
    <form class="max-w-md mx-auto w-full pt-2">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >Search</label
      >
      <div class="relative w-full">
        <input
          type="search"
          id="default-search"
          class="block w-full p-3 ps-12 text-gray-900 rounded-full bg-gray-100"
          placeholder="Chercher"
          required
        />
        <button
          type="submit"
          class="absolute start-2.5 bottom-1.5 font-medium rounded-lg text-sm px-4 py-2 text-gray-400"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>

    <div class="bg-gray-100 w-full rounded-3xl p-4" id="suggestions" v-if="users.length > 0">
      <h2 class="text-xl text-black font-bold pb-4">Suggestions</h2>
      <AccountToFollow v-for="user in users" :key="user.id" :user="user" @deleted="(id) => deleteUser(id)" />
    </div>

    <div
      v-if="router.currentRoute.value.name != 'CategoryList'"
      class="bg-gray-100 w-full rounded-3xl"
    >
      <h2 class="text-xl text-black font-bold p-4 pb-4">Catégories Tendances</h2>
      <CategorieTrendComponentVue
        v-for="trend in Trend"
        :key="trend.name"
        :name="trend.name"
        :NumberOfPost="trend.numberOfPost"
        :TrendRanking="trend.rank"
        :id="trend.id"
      ></CategorieTrendComponentVue>

      <RouterLink
        to="/category"
        class="text-blue-500 flex w-full hover:bg-gray-300 px-4 py-4 rounded-b-3xl"
      >
        Voir plus
      </RouterLink>
    </div>
    <div class="flex flex-wrap gap-2 p-4">
      <RouterLink to="/tos" class="text-sm text-gray-500 hover:underline" target="_blank">Conditions d'utilisation</RouterLink>
      <RouterLink to="/privacy" class="text-sm text-gray-500 hover:underline" target="_blank">Politique de Confidentialité</RouterLink>
      <RouterLink to="/cookie" class="text-sm text-gray-500 hover:underline" target="_blank">Politique relative aux cookies</RouterLink>
      <RouterLink to="/accessibility" class="text-sm text-gray-500 hover:underline" target="_blank">Accessibilité</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountToFollow from '@/components/AccountToFollow.vue'
import CategorieTrendComponentVue from './CategorieTrendComponent.vue'
import { RouterLink } from 'vue-router'
import { getTendencies } from '@/composable/Utils/CategoryUtils'
import { onMounted, ref } from 'vue'
import UserEntity from '@/composable/Entities/User'
import CategoryEntity from '@/composable/Entities/Category'
import router from '@/router'
import { getSuggestedUsers } from '@/composable/Utils/UserUtils'

let users = ref<UserEntity[]>([])
let Trend = ref<CategoryEntity[]>([])
onMounted(async () => {
  Trend.value = await getTendencies()
  users.value = await getSuggestedUsers();
})


function deleteUser(id: number): void {
  users.value = users.value.filter((user) => user.id !== id)
}
</script>
