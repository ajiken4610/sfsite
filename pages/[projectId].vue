<template lang="pug">
div
  Head(v-if="project")
    Title {{ project.title }}
    Meta(
      v-if="project.thumbnail",
      name="thumbnail",
      :content="project.thumbnail"
    )
    Meta(
      v-if="project.description",
      name="description",
      :content="project.description"
    )
  .display-1.text-center(v-if="!project") Loading...
  .project-wrapper(v-else)
    LayoutProjectView(:project="project")
    hr
    .h2.mb-2 おすすめの企画
    LayoutPredictCards(v-if="project.pid", :id="project.pid")
</template>

<script setup lang="ts">
const project = computed(() => toStrictProject(data.value?.project));

const route = useRoute();

const { data } = useProjectData(route.params.projectId.toString());
</script>

<style scoped lang="scss">
.horizontal-card-wrapper > * {
  max-width: 24rem;
}
.horizontal-card-wrapper > :not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>
