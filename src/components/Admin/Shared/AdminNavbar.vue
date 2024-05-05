<template>
  <div
    class="flex w-full items-center justify-evenly h-fit border-t md:flex-col md:h-full md:w-fit md:items-start md:justify-start p-4 gap-1 bg-slate-50"
  >
    <ButtonLink linkTo="/feed" buttonLabel="Accueil" icon="fa-solid fa-house-chimney" />
    <ButtonLink v-if="user.isModerator" linkTo="/admin/resources" buttonLabel="Resources" icon="fa-solid fa-list" />
    <ButtonLink v-if="user.isAdmin" linkTo="/admin/categories" buttonLabel="Accueil" icon="fa-solid fa-layer-group" />
    <ButtonLink v-if="user.isAdmin" linkTo="/admin/relationTypes" buttonLabel="Accueil" icon="fa-solid fa-users" />
    <ButtonLink v-if="user.isAdmin" linkTo="/admin/stats" buttonLabel="Accueil" icon="fa-solid fa-chart-simple" />
    <ButtonLink v-if="user.isModerator" linkTo="/admin/commentReports" buttonLabel="Accueil" icon="fa-solid fa-comment" />
    <ButtonLink v-if="user.isModerator" linkTo="/admin/userReports" buttonLabel="Accueil" icon="fa-solid fa-user-ninja" />
    <ButtonLink v-if="user.isSuperAdmin" linkTo="/admin/users" buttonLabel="Accueil" icon="fa-solid fa-users" />
    <ButtonLink v-if="user.isAdmin" linkTo="/admin/reportTypes" buttonLabel="Report types" icon="fa-solid fa-triangle-exclamation" />
  </div>
</template>

<script setup>
import ButtonLink from '@/components/App/Shared/buttons/ButtonLink.vue'
import { useUserStore } from '@/stores/user.js'


const userState = useUserStore()
const user = userState.user
</script>
