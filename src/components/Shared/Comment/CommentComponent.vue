<template>
  <a :href="`/profile/${comment.user?.id}`" class="w-12">
    <img
      class="rounded-lg"
      :src="props.comment.user?.profilePicture ? comment.user?.profilePicture : '/img'"
      alt=""
    />
  </a>
  <div class="w-full">
    <div class="flex flex-row gap-2 items-center justify-between relative">
      <div class="flex flex-row gap-2 items-center">
        <h3 class="max-w-80 truncate">
          {{ comment.user?.firstname + ' ' + comment.user?.lastname }}
        </h3>
        <span class="text-xs h-fit">{{ timeFromPublish }}</span>
      </div>
      <div @click="commentDropDown(comment.id)">
        <i class="fas fa-ellipsis"></i>
      </div>
      <div :id="'commentDropDown' + comment.id" class="z-50 hidden absolute right-0 top-5">
        <ul class="bg-white border rounded-md shadow-md cursor-pointer">
          <li
            v-if="comment.user?.id == user.id && !isAdmin"
            @click="openModal('delete')"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Suprimer
          </li>
          <li
            v-if="comment.user?.id != user.id && !isAdmin"
            @click="openModal('report')"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Signaler
          </li>
          <li
            v-if="isAdmin"
            @click="acceptCommentReport()"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Supprimer
          </li>
          <li
            v-if="isAdmin"
            @click="refuseCommentReport()"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Garder
          </li>

        </ul>
      </div>
    </div>
    <p>{{ comment.content }}</p>
  </div>
  <ListActionModalComponent
    :targetId="comment.id"
    ModalType="comment"
    :modalToOpen="modalToOpen"
    v-if="show"
  >
  </ListActionModalComponent>
</template>

<script setup lang="ts">
import ResourceCommentEntity from '@/composable/Entities/ResourceComment'
import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import { defineProps, onMounted, ref } from 'vue'
import { calculateDates } from '@/composable/Utils/DateUtils'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { refuse, accept } from '@/composable/Utils/Admin/CommentReportUtils'

const userState = useUserStore()
const user = userState.user

let show = ref(false)
let modalToOpen = ref('')

const isAdmin = router.currentRoute.value.fullPath === "/admin/commentReports";

const props = defineProps({
  comment: {
    type: ResourceCommentEntity,
    required: true
  },
  reportId: {
    type: Number,
    required: false
  }
})

let timeFromPublish = ref('')
onMounted(async () => {
  timeFromPublish.value = await calculateDates(props.comment.created_at)
})

function commentDropDown(id: number) {
  show.value = true
  const dropDown = document.getElementById('commentDropDown' + id)
  dropDown?.classList.toggle('hidden')
}

function openModal(type: string) {
  modalToOpen.value = type
}

const refuseCommentReport = async () => {
  await refuse(props.reportId);
  window.location.reload()
}

const acceptCommentReport = async () => {
  await accept(props.reportId);
  window.location.reload()
}

</script>
