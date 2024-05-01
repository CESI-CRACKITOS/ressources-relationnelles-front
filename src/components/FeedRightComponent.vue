<template>
  <div class="flex-col gap-4 items-start h-screen px-4 min-w-72 bg-slate-50 p-5">

    <div class="flex flex-col items-center justify-center w-full gap-2">
      <input type="text" class="border w-full p-2" placeholder="Recherche" v-model="searchQuery">
      <a :href="`/users/search/${searchQuery}`" class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600
        w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer">
        Rechercher
      </a>
    </div>


    <div class="border-b w-full p-5" id="suggestions" v-if="users.length > 0">
      <h2 class="text-xl text-slate-700 font-bold pb-4">Suggestions</h2>
      <div class="flex flex-col gap-2">
        <AccountToFollow v-for="user in users" :key="user.id" :user="user" @deleted="(id) => deleteUser(id)" />
      </div>
    </div>

    <div
      v-if="router.currentRoute.value.name != 'CategoryList'"
      class="w-full border-b p-5"
    >
      <h2 class="text-xl text-slate-700 font-bold">Tendances du moment</h2>
      <CategorieTrendComponentVue
        v-for="trend in Trend"
        :key="trend.name"
        :name="trend.name"
        :NumberOfPost="trend.numberOfPost"
        :TrendRanking="trend.rank"
        :id="trend.id"
      />

      <a class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600
        w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer" href="/category">
        Voir plus
      </a>
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

const searchQuery = ref("");
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
