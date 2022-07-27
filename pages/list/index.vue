<template lang="pug">
div 
  h1 企画一覧
  PartsProjectCardList(:projects="projectList")
  h1.mt-4 所属一覧
  .row
    PartsOwnerStructureView(
      :structure="{ '6lqg5f': data.owners['6lqg5f'] }",
      :show="true"
    )
</template>

<script setup lang="ts">
import data from "~~/assets/data";
import { SFProject } from "~~/composables/SFProject";
const projectList = computed(() => {
  const ret: SFProject[] = [];
  for (const current in data.projects) {
    ret.push(data.projects[current].project);
  }
  return ret;
});
</script>
