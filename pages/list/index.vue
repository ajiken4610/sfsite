<template lang="pug">
div
  Title 一覧
  h1 企画一覧
  PartsProjectCardList(:projects="projectList")
  h1.mt-4 所属一覧
  PartsOwnerCardList(:owners="ownerList")
</template>

<script setup lang="ts">
import data from "~~/assets/data";
import { Owner, SFProject } from "~~/composables/SFProject";
const projectList = computed(() => {
  const ret: SFProject[] = [];
  for (const current in data.projects) {
    ret.push(data.projects[current].project);
  }
  return ret;
});
const ownerList = computed(() => {
  const ret: { name: string; id: string; icon: string }[] = [];
  for (const current in data.owners) {
    ret.push({ ...{ id: current }, ...toStrictOwner(data.owners[current]) });
  }
  return ret;
});
</script>
