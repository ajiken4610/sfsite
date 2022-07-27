<template lang="pug">
div 
  h1 企画一覧
  PartsProjectCardList(:projects="projectList")
  h1.mt-4 所属一覧
  PartsOwnerCard(:ownerId="'0f46rv'")
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
