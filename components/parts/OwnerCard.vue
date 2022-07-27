<template lang="pug">
.position-relative.border.border-light.rounded.px-4.py-1.d-inline-block.owner-card {{ data.owners[ownerId].name }}
  NuxtLink.stretched-link(:to="'/@' + ownerId")
</template>

<script setup lang="ts">
import data from "~~/assets/data";
const props = defineProps<{ ownerId: string }>();
</script>

<style scoped lang="scss">
.owner-card {
  min-width: 5rem;
  text-align: center;
  width: auto;
}
</style>
