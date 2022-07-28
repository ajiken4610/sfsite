<template lang="pug">
div
  LayoutProjectsListView(:id="id")
</template>
<script setup lang="ts">
const id = ref(useRoute().params.ownerId?.toString?.() || "");
watch(
  useRoute(),
  (val) => {
    if (val.params.onwerId) {
      id.value = val.params.ownerId?.toString?.() || "";
    }
  },
  { immediate: true }
);
</script>
