<template lang="pug">
div
  LayoutProjectView(v-if="project", :project="project.project")
</template>

<script setup lang="ts">
const project = useProjectData("SJFHOh").data;
</script>
