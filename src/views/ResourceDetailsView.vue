<template>
  <div class="h-screen rounded w-full overflow-scroll">
    <div
      class="w-full flex flex-row justify-center items-center text-center relative text-xl py-4">
      <div class="absolute text-start w-full p-2" @click="back()"><i class="fa-solid fa-arrow-left"></i></div>
      <div>Détail</div>
    </div>
    <PostComponent :key="resource.id" :resource="resource" />
    <form class="d-flex" @submit.prevent>
      <textarea
        v-model="commentText"
        class="w-full h-20 border-b border-gray-200 p-3 bg-slate-50"
        placeholder="Ajouter un commentaire"
      ></textarea>
      <ButtonComponent @click="addComment" class="w-full">Envoyer</ButtonComponent>
    </form>
    <div
      v-for="comment in resource.comments"
      :key="comment.id"
      class="flex p-3 border-b border-gray-200 gap-2"
    >
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import PostComponent from '@/components/App/Resource/ResourceComponent.vue'
import { getResourceById } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import router from '@/router'
import CommentComponent from '@/components/CommentComponent.vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'

let resource = ref<ResourceEntity[]>([])
let commentText = ref('')
let idResource = router.currentRoute.value.params.id

onMounted(async () => {
  resource.value = await getResourceById(idResource)
})



async function addComment() {
  try {
    // Vérifiez d'abord si le texte du commentaire n'est pas vide
    if (!commentText.value.trim()) {
      return
    }

    // Préparez les données du commentaire
    const newComment = {
      text: commentText.value
      // Vous pouvez ajouter d'autres champs du commentaire ici si nécessaire
    }

    // Appelez l'API pour ajouter le commentaire
    const response = fetch('http://localhost/api/comments', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ content: commentText.value, resourceId: idResource })
    })

    resource.value = await getResourceById(idResource)
    commentText = ref('')
    // Assurez-vous que la réponse de l'API indique que le commentaire a été ajouté avec succès
  } catch (error) {
    // Gérez les erreurs ici
  }
}

function back(){
  router.go(-1)
}
</script>
