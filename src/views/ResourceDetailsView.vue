<template>
  <div class="h-screen rounded max-w-xl overflow-scroll max-xl:mr-0">
    <PostComponent :key="resource.id" :resource="resource" />
    <form class="d-flex" @submit.prevent>
      <textarea
        v-model="commentText"
        class="w-full h-20 bg-white border-b border-gray-200 p-3"
        placeholder="Ajouter un commentaire"
      ></textarea>
      <ButtonComponent @click="addComment" class="w-full">Envoyer</ButtonComponent>
    </form>
    <div
      v-for="comment in resource.comments"
      :key="comment.id"
      class="flex bg-white p-3 border-b border-gray-200 gap-2"
    >
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import PostComponent from '@/components/PostComponent.vue'
import { getResourceById } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import router from '@/router'
import CommentComponent from '@/components/CommentComponent.vue'
import ButtonComponent from '@/components/shared/buttons/ButtonComponent.vue'

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
</script>
