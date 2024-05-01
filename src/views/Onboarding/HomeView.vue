<template>
  <div class="flex flex-col justify-between items-center w-screen h-screen p-5 bg-slate-50">
    <div class="flex flex-col gap-16 justify-center items-center py-5">
      <h1 class="text-2xl font-mono">(RE)Sources Relationnelles</h1>
    </div>
    <div class="flex flex-col w-full gap-5 py-5">
      <a
        href="/login"
        class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600 w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer text-2xl"
      >
        Se connecter
      </a>
      <a
        href="/register"
        class="flex items-center justify-center px-4 py-2 text-white w-full bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-2xl"
      >
        S'inscrire
      </a>

      <button
        v-if="isComputer && !isPWA"
        @click="openPrompt"
        class="flex gap-2 items-center justify-center px-4 py-2 w-full bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700 text-2xl"
      >
        <p>Installer l'application</p>
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let deferredPrompt = null
const isComputer = ref(false)
const isPWA = ref(false)

const openPrompt = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null
    })
  }
}

onbeforeinstallprompt = (event) => {
  event.preventDefault()
  deferredPrompt = event
}

onMounted(() => {
  isComputer.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  isPWA.value = window.matchMedia('(display-mode: standalone)').matches
})
</script>
