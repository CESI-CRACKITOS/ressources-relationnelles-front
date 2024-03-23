<template>
  <div
    @click="cta(action)"
    class="flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2"
  >
    <i :class="icon"></i>
    <p class="text-sm">12</p>
  </div>
</template>

<script setup lang="ts">
import getUserFromToken from '@/composable/Utils/UserUtils'
import { ref } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true
  },
  contextId: {
    type: Number,
    required: true
  },
  active: {
    type: String,
    required: true
  }
})

async function cta(action: string) {
  switch (action) {
    case 'like':
      let res
      switch (action) {
        case 'like':
          res = await likeResource()
          console.log(res)
          break
        case 'comment':
          break
        case 'retweet':
          break
        default:
      }
      console.log(res)
      break
    case 'comment':
      break
    case 'retweet':
      break
    default:
  }
}

async function likeResource() {
  const user = await getUserFromToken('dc2288f5-3313-4d3f-9097-ee45ba0715f8')
  const response = await fetch(`http://localhost/api/like/${props.contextId}/${user.id}`, {
    method: 'PACTH',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}
</script>
