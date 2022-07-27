<template lang="pug">
span(v-for="(value, key) in structure")
  .d-flex.m-1
    PartsOwnerCard(:ownerId="key.toString()")
    .ms-2(
      data-bs-toggle="collapse",
      :data-bs-target="'#owner-structure-' + key",
      :class="{ 'dropdown-toggle': value.childIds?.length, 'd-inline': !value.childIds?.length }"
    )
  .collapse.ms-2.border.rounded(
    v-if="value.childIds?.length",
    :id="'owner-structure-' + key",
    :class="{ show }"
  )
    OwnerStructureView(:structure="childs(value.childIds)")
</template>

<script lang="ts">
const owners = data.owners;
</script>
<script setup lang="ts">
import data from "~~/assets/data";

withDefaults(
  defineProps<{
    structure: {
      [key: string]: { childIds?: string[]; name: string; description: string };
    };
    show?: boolean;
  }>(),
  { show: false }
);
const childs = (ids: string[]) => {
  const ret = {};
  for (const id of ids) {
    ret[id] = owners[id];
  }
  return ret;
};
</script>
