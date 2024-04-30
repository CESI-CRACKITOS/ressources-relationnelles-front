<template>
  <div class="h-screen justify-between flex flex-col-reverse md:flex-row w-full items-center overflow-hidden bg-slate-50 xl:px-32 2xl:px-64">
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
