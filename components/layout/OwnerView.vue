<template lang="pug">
div(v-if="owner")
  Title {{ getOwnerName(data.owners, id) }}
  .card.bg-transparent.my-4
    img.card-img.border-start.position-absolute.start-0.end-0.top-0.bottom-0(
      v-if="owner.icon",
      :src="owner.icon"
    )
    svg.card-img.border-start.no-thumbnail.position-absolute.start-0.end-0.top-50.translate-middle-y(
      v-else,
      width="100%"
    )
      rect(width="100%", height="100%", fill="#888")
      text(x="50%", y="50%", dy=".4em", text-anchor="middle") {{ owner.name }}
    .p-3.invisible.my-4
      .display-3.ps-4 {{ getOwnerName(data.owners, id) }}
    .card-img-overlay.my-4
      .display-3.ps-4 {{ getOwnerName(data.owners, id) }}
  PartsShareButton.float-end
  .description
    PartsMarkdownViewer(:src="data.owners[id].description")
</template>

<script setup lang="ts">
import data from "assets/data";
const props = defineProps<{ id: string }>();
const owner = data.owners[props.id];
</script>

<style scoped lang="scss">
.card-img {
  filter: blur(1px);
  object-fit: cover;
}
.card.bg-transparent {
  overflow: hidden;
}
.display-1 {
  text-shadow: rgb(0, 0, 0) 1px 0 10px;
}
</style>
