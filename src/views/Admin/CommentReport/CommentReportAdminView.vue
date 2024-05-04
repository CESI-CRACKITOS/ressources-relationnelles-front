<template>

<div class="flex flex-col">

  <div v-for="commentReport in commentReports" :key="commentReport.id" class="flex p-3 border-b border-gray-200 gap-2">
    <CommentComponent :comment="commentReport.comment" :reportId="commentReport.id"  />
  </div>

</div>

</template>
<script setup>

import { onMounted, ref } from 'vue'
import { index } from '@/composable/Utils/Admin/CommentReportUtils.ts'
import CommentComponent from '@/components/Shared/Comment/CommentComponent.vue'

const commentReports = ref([]);

onMounted(async () => {
  commentReports.value = await index();
})

</script>