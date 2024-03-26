<template>
<div class="w-12">
    <img :src="comment.user?.profilePicture? comment.user?.profilePicture: '/img'" alt="">
  </div>
  <div>
    <div class="flex flex-row gap-2 items-center">
					<h3>{{ comment.user?.firstname + ' ' + comment.user?.lastname }}</h3>
					<span class="text-xs h-fit">{{ tempsDepuisPost }}</span>
				</div>
  <p>{{ comment.content }}</p>
  </div>

</template>

<script setup lang="ts">

import ResourceCommentEntity from '@/composable/Entities/ResourceComment'
import { defineProps, onMounted, ref } from 'vue'
import { calculateDates } from "@/composable/Utils/DateUtils"

const props = defineProps({
	comment: {
		type: ResourceCommentEntity,
		required: true
	}
})

let tempsDepuisPost = ref("")
onMounted(async() => {
	tempsDepuisPost.value = await calculateDates(props.comment.createdAt)
})

</script>