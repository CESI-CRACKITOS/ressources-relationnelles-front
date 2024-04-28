<template>
  <div class="h-screen justify-between flex flex-col-reverse md:flex-row w-full items-center overflow-hidden">
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
