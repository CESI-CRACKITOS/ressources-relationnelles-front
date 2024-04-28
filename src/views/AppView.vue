<template>
  <div class="flex w-full h-screen overflow-scroll">
    <FeedLeftComponent />
    <router-view class="w-full md:border-x" />
    <FeedRightComponent class="hidden lg:flex" />
  </div>
</template>

<script>
import FeedLeftComponent from '@/components/FeedLeftComponent.vue'
import FeedRightComponent from '@/components/FeedRightComponent.vue'

export default {
  components: {
    FeedLeftComponent,
    FeedRightComponent
  }
}
</script>
