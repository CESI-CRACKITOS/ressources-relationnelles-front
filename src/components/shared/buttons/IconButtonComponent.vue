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

function cta(action: string) {
  switch (action) {
    case 'like':
      console.log('like', props.contextId)
      break
    case 'comment':
      console.log('comment', props.contextId)
      break
    case 'retweet':
      console.log('retweet', props.contextId)
      break
    default:
      console.log('default', props.contextId)
  }
}
</script>
