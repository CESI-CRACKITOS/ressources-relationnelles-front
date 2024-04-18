<template>
  <div class="w-12">
    <img
      class="rounded-lg"
      :src="props.comment.user?.profilePicture ? comment.user?.profilePicture : '/img'"
      alt=""
    />
  </div>
  <div>
    <div class="flex flex-row gap-2 items-center">
      <h3 class="max-w-80 truncate">
        {{ comment.user?.firstname + ' ' + comment.user?.lastname }}
      </h3>
      <span class="text-xs h-fit">{{ timeFromPublish }}</span>
    </div>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script setup lang="ts">
import ResourceCommentEntity from '@/composable/Entities/ResourceComment'
import { defineProps, onMounted, ref } from 'vue'
import { calculateDates } from '@/composable/Utils/DateUtils'

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
</script>
