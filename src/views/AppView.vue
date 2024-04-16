<template>
  <div class="flex flex-row w-full justify-center" style="scrollbar-width: none">
    <FeedLeftComponent />
    <router-view class="w-[575px]"></router-view>
    <FeedRightComponent />
  </div>
</template>

<script setup lang="ts">
import FeedLeftComponent from '@/components/FeedLeftComponent.vue'
import FeedRightComponent from '@/components/FeedRightComponent.vue'
</script>

<style>
* {
  scrollbar-width: none;
}
</style>
