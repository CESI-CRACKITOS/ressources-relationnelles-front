<template>
  <div class="w-full flex flex-col items-center p-3">
    <div class="flex flex-col items-center justify-center w-full md:w-1/2 gap-2">
      <input type="text" class="border w-full p-2" placeholder="Recherchez un utilisateur" v-model="searchQuery">
      <a :href="`/admin/users/search/${searchQuery}`" class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600
        w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer">
        Rechercher
      </a>
    </div>
  </div>

</template>
<script setup>
import { destroy, index } from '@/composable/Utils/Admin/CategoryAdminUtils.ts'
import { onMounted, ref } from 'vue'
const searchQuery = ref("");

</script>