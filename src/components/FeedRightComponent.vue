<template>
  <div
    class="flex flex-col gap-4 items-start w-96 overflow-scroll h-screen max-lg:hidden border-l pl-4"
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

    <div class="bg-gray-100 w-full rounded-3xl p-4">
      <h2 class="text-xl text-black font-bold pb-4">Suggestions</h2>
      <AccountToFollow
        v-for="user in users"
        :key="user.firstname"
        :firstname="user.firstname"
        :lastname="user.lastname"
        :urlImage="user.urlImage"
      ></AccountToFollow>
    </div>

    <div class="bg-gray-100 w-full rounded-3xl">
      <h2 class="text-xl text-black font-bold p-4 pb-4">Catégories Tendances</h2>
      <CategorieTrendComponentVue
        v-for="trend in Trend"
        :key="trend.CategorieName"
        :CategoryName="trend.CategorieName"
        :NumberOfPost="trend.NumberOfPost"
        :TrendRanking="trend.TrendRanking"
      ></CategorieTrendComponentVue>

      <RouterLink
        to="/trend"
        class="text-blue-500 flex w-full hover:bg-gray-300 px-4 py-4 rounded-b-3xl"
      >
        Voir plus
      </RouterLink>
    </div>
    <div class="flex flex-wrap gap-2 p-4">
      <RouterLink to="tos" class="text-sm text-gray-500 hover:underline" target="_blank"
        >Conditions d'utilisation
      </RouterLink>
      <RouterLink to="privacy" class="text-sm text-gray-500 hover:underline" target="_blank"
        >Politique de Confidentialité</RouterLink
      >
      <RouterLink to="cookie" class="text-sm text-gray-500 hover:underline" target="_blank"
        >Politique relative aux cookies</RouterLink
      >
      <RouterLink to="accessibility" class="text-sm text-gray-500 hover:underline" target="_blank"
        >Accessibilité</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountToFollow from '@/components/AccountToFollow.vue'
import CategorieTrendComponentVue from './CategorieTrendComponent.vue'
import { RouterLink } from 'vue-router'
let users = [
  {
    firstname: 'Rocco',
    lastname: 'Siffredi',
    urlImage:
      'https://upload.wikimedia.org/wikipedia/commons/8/80/Rocco_Siffredi_-_Lucca_Comics_%26_Games_2016.jpg'
  },
  {
    firstname: 'lulu',
    lastname: 'chu',
    urlImage:
      'https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-6/271762868_128100336345212_3837073184530467647_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=gBGUdOfT3iIAX_dazfm&_nc_ht=scontent-fra5-1.xx&oh=00_AfD5S8C9Gl8cGyuG0mpFT4ao2MCKWROJ-k5p62LdrgF2Lg&oe=660F7068'
  },
  {
    firstname: 'Johnny',
    lastname: 'Sins',
    urlImage:
      'https://ei.phncdn.com/(m=bLWsSeKlbyaT)(mh=wJ_vUY_K5kY83UTt)8463a828-afb9-4e4f-85be-9b568c1a9160.jpg'
  }
]

let Trend = [
  {
    CategorieName: 'Catégorie',
    NumberOfPost: 9989898,
    TrendRanking: 1
  },
  {
    CategorieName: 'Catégorie',
    NumberOfPost: 9989898,
    TrendRanking: 2
  },
  {
    CategorieName: 'Catégorie',
    NumberOfPost: 9989898,
    TrendRanking: 3
  },
  {
    CategorieName: 'Catégorie',
    NumberOfPost: 9989898,
    TrendRanking: 4
  },
  {
    CategorieName: 'Catégorie',
    NumberOfPost: 9989898,
    TrendRanking: 5
  }
]
</script>
