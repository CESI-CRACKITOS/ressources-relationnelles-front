
<template>
  <div class="p-3 overflow-y-auto pb-10">
    <h1 class="text-center text-2xl w-full">Statistiques</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
      <div class="bg-white rounded-lg shadow p-3"><canvas id="resources"></canvas></div>
      <div class="bg-white rounded-lg shadow p-3"><canvas id="comments"></canvas></div>
      <div class="bg-white rounded-lg shadow p-3"><canvas id="users"></canvas></div>
    </div>
  </div>
</template>
<script setup>

import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue'
import {
  getNumberOfResourcesByDay,
  getNumberOfCommentsByDay,
  getNumberOfUsersByDay
} from '@/composable/Utils/Admin/StatsAdminUtils.ts'

const resources = ref([]);
const comments = ref([]);
const users = ref([]);
onMounted(async () => {
  let tableauResources = []
  resources.value = await getNumberOfResourcesByDay()
  for (const [date, nombre] of Object.entries(resources.value)) {
    tableauResources.push({x:date, y:nombre})
  }

  console.log(tableauResources)
  new Chart(
    document.getElementById('resources'),
    {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Nombre de ressources créées par jour',
            data: tableauResources
          }
        ]
      }
    }
  );

  let tableauCommentaires = []
  resources.value = await getNumberOfCommentsByDay()
  for (const [date, nombre] of Object.entries(resources.value)) {
    tableauCommentaires.push({x:date, y:nombre})
  }
  console.log(tableauCommentaires)
  new Chart(
    document.getElementById('comments'),
    {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Nombre de commentaires créés par jour',
            data: tableauCommentaires
          }
        ]
      }
    }
  );

  let tableauUsers = []
  resources.value = await getNumberOfUsersByDay()
  for (const [date, nombre] of Object.entries(resources.value)) {
    tableauUsers.push({x:date, y:nombre})
  }
  console.log(tableauUsers)
  new Chart(
    document.getElementById('users'),
    {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Nombre de comptes créés par jour',
            data: tableauUsers
          }
        ]
      }
    }
  );
})



</script>