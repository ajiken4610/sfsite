<template lang="pug">
div
  h1.mb-4 検索結果: {{ $route.params.query }}
  h2 企画
  div(v-if="projects.length")
    PartsProjectCardList(:projects="projects")
  div(v-else) {{ $route.params.query }} にマッチする企画はありませんでした。
</template>

<script setup lang="ts">
import data from "~~/assets/data";
import { SFProject } from "~~/composables/SFProject";

const query = useRoute().params.query.toString();
const bigram = BiGram.createBiGramArray(query, " 　");
let projects: SFProject[] = [];
if (bigram[0] && data.bigrams.projects[bigram[0]]) {
  let matchProject = data.bigrams.projects[bigram[0]];
  for (var i = 1; i < bigram.length; i++) {
    const next = data.bigrams.projects[bigram[i]] || [];
    matchProject = matchProject.filter((x) => next.includes(x));
  }
  for (const id of matchProject) {
    projects.push(data.projects[id].project);
  }
}
</script>
