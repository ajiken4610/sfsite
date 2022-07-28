<template lang="pug">
div
  LayoutOwnerView(v-if="id", :id="id")
  ul.nav.nav-tabs.mb-4(role="tablist")
    li.nav-item
      NuxtLink.nav-link(
        :to="'/@' + id",
        data-bs-toggle="tab",
        exactActiveClass="active",
        @click="$router.push('/@' + id)"
      )
        | 企画
    li.nav-item
      NuxtLink.nav-link(
        :to="'/@' + id + '/owners'",
        data-bs-toggle="tab",
        activeClass="active",
        @click="$router.push('/@' + id + '/owners')"
      )
        | 所属
  NuxtPage
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
