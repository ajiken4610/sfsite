<template lang="pug">
.row.row-cols-1.row-cols-sm-2.row-cols-xl-4.g-4
  .col(v-for="(project, id) in rearrangedProjects")
    PartsProjectCard(
      :project="toStrictProject(project)",
      :link="id",
      @click="$emit('clickProject', project.pid)"
    )
</template>

<script async setup lang="ts">
import { SFProject } from "~~/composables/SFProject";

const props = defineProps<{ projects: SFProject[] }>();
const emits = defineEmits<{ clickProject: (id: string) => void }>();

const rearrangedProjects = await (async () => {
  const projects = props.projects;
  const likes = (await useLikes()).data.value;
  const retObject: { [key: string]: SFProject[] } = {};
  for (const project of projects) {
    if (retObject[likes[project.pid] || 0]) {
      retObject[likes[project.pid] || 0].push(project);
    } else {
      retObject[likes[project.pid] || 0] = [project];
    }
  }
  let ret: SFProject[] = [];
  for (const likeCount of Object.keys(retObject).reverse()) {
    ret = ret.concat(retObject[likeCount]);
  }
  return ret;
})();
</script>
