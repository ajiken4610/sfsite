<template lang="pug">
div
  PartsOwnerStructureView(:structure="current")
</template>

<script setup lang="ts">
import data from "~~/assets/data";
const props = defineProps<{ ownerId: string }>();
const current = computed(() => {
  const ret = {};

  if ((ret[props.ownerId] = data.owners[props.ownerId])) {
    return ret;
  } else {
    return {};
  }
});
</script>
