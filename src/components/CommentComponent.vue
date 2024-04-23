<template>
  <div class="w-12">
    <img
      class="rounded-lg"
      :src="props.comment.user?.profilePicture ? comment.user?.profilePicture : '/img'"
      alt=""
    />
  </div>
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
        <ul class="bg-white border rounded-md shadow-md">
          <li
            v-if="comment.user?.id == user.id"
            @click="Update()"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Modifier
          </li>
          <li
            v-if="comment.user?.id == user.id"
            @click="Delete()"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Suprimer
          </li>
          <li
            v-if="comment.user?.id != user.id"
            @click="Report(comment.id)"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Signaler
          </li>
        </ul>
      </div>
    </div>
    <p>{{ comment.content }}</p>
  </div>

  <ReportModalComponent report="Comment" :id="comment.id" v-if="show" />
</template>

<script setup lang="ts">
import ResourceCommentEntity from '@/composable/Entities/ResourceComment'

import ReportModalComponent from '@/components/ReportModalComponent.vue'
import { defineProps, onMounted, ref } from 'vue'
import { calculateDates } from '@/composable/Utils/DateUtils'
import { reportComment } from '@/composable/Utils/ReportUtils'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user

const props = defineProps({
  comment: {
    type: ResourceCommentEntity,
    required: true
  }
})

let timeFromPublish = ref('')
onMounted(async () => {
  timeFromPublish.value = await calculateDates(props.comment.created_at)
})

function commentDropDown(id: number) {
  const dropDown = document.getElementById('commentDropDown' + id)
  dropDown?.classList.toggle('hidden')
}

function Update() {}

function Delete() {}

let show = ref(false)
async function Report(id: number) {
  show.value = true
}
</script>
