<template>
  <div
    class="flex w-full items-center justify-evenly h-fit border-t md:flex-col md:h-full md:w-fit md:items-start md:justify-start p-4 gap-1 bg-slate-50"
  >
    <ButtonLink linkTo="/feed" buttonLabel="Accueil" icon="fa-solid fa-house-chimney" />
  </div>
</template>

<script setup>
import ButtonLink from '@/components/App/Shared/buttons/ButtonLink.vue'
</script>
