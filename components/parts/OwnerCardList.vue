<template lang="pug">
.row.row-cols-1.row-cols-sm-2.row-cols-xl-4.g-4
  .col(v-for="(owner, id) in owners")
    PartsOwnerCard(:owner="owner", :id="owner.id")
</template>

<script setup lang="ts">
defineProps<{ owners: { name: string; id: string; icon: string }[] }>();
</script>
