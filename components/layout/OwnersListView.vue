<template lang="pug">
div(v-if="directOwners.length")
  .h4 既知の直系所属
  PartsOwnerCardList.mb-4(:owners="directOwners")
div(v-if="indirectOwners.length")
  .h4 既知のすべての所属
  PartsOwnerCardList.mb-4(:owners="indirectOwners")
div(v-if="!directOwners.length && !indirectOwners.length") ここには何もないようです
</template>

<script setup lang="ts">
import data from "~~/assets/data";
const props = defineProps<{ id: string }>();
const owner = data.owners[props.id];
const directOwners = (() => {
  const ret: {
    name: string;
    description: string;
    childIds: string[];
    parent: string;
    icon: string;
    id: string;
  }[] = [];
  for (const current of owner.childIds) {
    ret.push({
      ...{ id: current },
      ...toStrictOwner(data.owners[current]),
    });
  }
  return ret;
})();
const indirectOwners = (() => {
  const ret: {
    name: string;
    description: string;
    childIds: string[];
    parent: string;
    icon: string;
    id: string;
  }[] = [];
  const loop = (id) => {
    for (const child of data.owners[id].childIds) {
      ret.push({
        ...{ id: child },
        ...toStrictOwner(data.owners[child]),
      });
      loop(child);
    }
  };
  for (const current of owner.childIds) {
    loop(current);
  }
  return ret;
})();
</script>
