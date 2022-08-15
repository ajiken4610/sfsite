<template lang="pug">
div
  PartsProjectCardList(
    :projects="projects",
    @clickProject="incrementPredict(id, $event)"
  )
</template>

<script async setup lang="ts">
import projectData from "~~/assets/data";
import { SFProject } from "~~/composables/SFProject.js";

const props = defineProps<{ id: string }>();
const predict: { [key: string]: number } = (await usePredict(props.id)).data
  .value;
const projects = await (async () => {
  const retObject: { [key: string]: string[] } = {};
  for (const key in predict) {
    if (retObject[predict[key]]) {
      retObject[predict[key]].push(key);
    } else {
      retObject[predict[key]] = [key];
    }
  }
  let retIds: string[] = [];
  for (const count of Object.keys(retObject).reverse()) {
    retIds = retIds.concat(retObject[count]);
  }
  retIds = retIds.slice(0, 4);
  let ret: SFProject[] = [];
  for (const currentId of retIds) {
    if (projectData.projects[currentId]) {
      ret.push(projectData.projects[currentId].project);
    }
  }
  const allProjects = (() => {
    const ret: SFProject[] = [];
    for (const current in projectData.projects) {
      ret.push(projectData.projects[current].project);
    }
    return ret;
  })();
  const rearrangedProjects = await (async () => {
    const projects = allProjects;
    const likes = (await useLikes()).data.value || {};
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
  let c = 0;
  while (ret.length <= 8) {
    ret.push(rearrangedProjects[c++]);
    if (rearrangedProjects.length <= c) {
      break;
    }
  }
  return ret;
})();
</script>
