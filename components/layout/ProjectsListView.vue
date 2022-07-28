<template lang="pug">
div
  div(v-if="directProjects.length")
    .h4 既知の直系企画
    PartsProjectCardList.mb-4(:projects="directProjects")
  div(v-if="indirectProjects.length")
    .h4 既知のすべての企画
    PartsProjectCardList.mb-4(:projects="indirectProjects")
  div(v-if="!directProjects.length && !indirectProjects.length") ここには何もないようです
</template>

<script setup lang="ts">
import { SFProject } from "~~/composables/SFProject";
import data from "~~/assets/data";
const props = defineProps<{ id: string }>();

const owner = data.owners[props.id];
const directProjects = (() => {
  const ret: SFProject[] = [];
  for (const key in data.projects) {
    const current = data.projects[key].project;
    if (current.owner === props.id) {
      ret.push(current);
    }
  }
  return ret;
})();
const indirectProjects = (() => {
  const ret: SFProject[] = [];
  const loop = (id) => {
    for (const key in data.projects) {
      const current = data.projects[key].project;
      if (current.owner === id) {
        ret.push(current);
      }
    }
    for (const child of data.owners[id].childIds) {
      loop(child);
    }
  };
  for (const current of owner.childIds) {
    loop(current);
  }
  return ret;
})();
</script>
