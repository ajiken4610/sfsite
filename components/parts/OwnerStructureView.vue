<template lang="pug">
template(v-for="(value, key) in structure")
  .ms-2(
    data-bs-toggle="collapse",
    :data-bs-target="'#owner-structure-' + key",
    :class="{ 'dropdown-toggle': value.childIds?.length, 'd-inline': !value.childIds?.length }"
  )
    NuxtLink(:to="'/owner/' + key") {{ value.name }}
  .collapse.show.border-start.ms-2(
    v-if="value.childIds",
    :id="'owner-structure-' + key"
  )
    OwnerStructureView(:structure="childs(value.childIds)")
</template>

<script lang="ts">
const owners = data.owners;
</script>
<script setup lang="ts">
import data from "~~/assets/data";

const props = defineProps<{
  structure: {
    [key: string]: { childIds?: string[]; name: string; description: string };
  };
}>();
console.log(props.structure);
const childs = (ids: string[]) => {
  const ret = {};
  for (const id of ids) {
    console.log(id);
    ret[id] = owners[id];
  }
  return ret;
};
</script>
