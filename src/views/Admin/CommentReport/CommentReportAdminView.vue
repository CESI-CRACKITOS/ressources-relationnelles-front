<template>

<div>

</div>

</template>
<script setup>

import { onMounted } from 'vue'
import { index } from '@/composable/Utils/Admin/CommentReportUtils.ts'

onMounted(async () => {
  const commentReports = await index();
  console.log(commentReports);
})

</script>