<template lang="pug">
div
  Title 検索結果: {{ $route.params.query }}
  h1.mb-4 検索結果: {{ $route.params.query }}
  h2 企画
  .mb-2
    div(v-if="projects.length")
      PartsProjectCardList(:projects="projects")
    div(v-else) {{ $route.params.query }} にマッチする企画はありませんでした。
  h2 所属
  .mb-2
    div(v-if="owners.length")
      PartsOwnerCardList(:owners="owners")
    div(v-else) {{ $route.params.query }} にマッチする所属はありませんでした。
</template>

<script setup lang="ts">
import data from "~~/assets/data";
import { SFProject } from "~~/composables/SFProject";

const query = ref(useRoute().params.query?.toString?.() || "");
watch(
  useRoute(),
  (val) => {
    if (val.params.onwerId) {
      query.value = val.params.query?.toString?.() || "";
    }
  },
  { immediate: true }
);
const bigram = BiGram.createBiGramArray(query.value, " 　");
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
let owners: { icon: string; name: string; id: string }[] = [];
if (bigram[0] && data.bigrams.owners[bigram[0]]) {
  let matchOwner = data.bigrams.owners[bigram[0]];
  for (var i = 1; i < bigram.length; i++) {
    const next = data.bigrams.owners[bigram[i]] || [];
    matchOwner = matchOwner.filter((x) => next.includes(x));
  }
  for (const id of matchOwner) {
    owners.push({ ...{ id }, ...toStrictOwner(data.owners[id]) });
  }
}
</script>
