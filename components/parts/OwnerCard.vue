<template lang="pug">
.card.project-card.bg-transparent.border-secondary.overflow-hidden(
  :class="{ horizontal: responsiveHorizontal, vertical: !responsiveHorizontal }"
)
  div(:class="{ 'row g-0 h-100': responsiveHorizontal }")
    .position-relative(:class="{ 'col-4 h-100': responsiveHorizontal }")
      img.card-img-top(v-if="owner.icon", :src="owner.icon")
      .no-thumbnail(v-else)
        svg(height="100%", width="100%")
          rect(width="100%", height="100%", fill="#888")
          text(x="50%", y="50%", dy=".4em", text-anchor="middle") {{ owner.name }}
    .card-body(:class="{ 'col-8 d-table': responsiveHorizontal }")
      div(:class="{ 'd-table-cell align-middle': responsiveHorizontal }")
        .h6.card-title {{ getOwnerName(data.owners, id) }}
  NuxtLink.stretched-link(:to="'/@' + id")
</template>

<script setup lang="ts">
import data from "assets/data";
const props = withDefaults(
  defineProps<{
    id: string;
    owner: { name: string; icon: string };
    horizontal?: boolean;
    responsive?: boolean;
  }>(),
  { horizontal: false, responsive: true }
);

const responsiveHorizontal = ref(
  props.responsive ? 576 > window.innerWidth || props.horizontal : false
);
const onResize = () => {
  responsiveHorizontal.value = props.responsive
    ? 576 > window.innerWidth || props.horizontal
    : false;
};
window.addEventListener("resize", onResize);
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped lang="scss">
.card-title {
  overflow: hidden;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}
.card-subtitle,
.card-owner,
.tags {
  overflow: hidden;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  -webkit-line-clamp: 1;
}
.card-body {
  margin-bottom: 0;
}
.tags:deep(*) {
  font-size: 100% !important;
}
.tags:deep(img),
.tags:deep(pre),
.tags:deep(button),
.tags:deep(a),
.tags:deep(table),
.tags:deep(iframe),
.tags:deep(.table-of-contents) {
  display: none;
}

.card.vertical {
  max-height: 24rem;
}
.card.horizontal {
  height: 8rem;
}
.card.horizontal {
  &.card-img-top,
  .no-thumbnail {
    position: absolute;
    height: 100%;
  }
}

.card-img-top,
.no-thumbnail {
  object-fit: cover;
  height: 8rem;
  //filter: blur(1px);
}

.stretched-link:hover::after {
  background-color: rgba(255, 255, 255, 0.1);
}
.stretched-link::after {
  transition: background-color 0.5s;
}
.tags {
  font-size: 0.7rem;
  background: white; // linear-gradient(white, transparent);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tag:not(:first-child) {
  padding-left: 0.25em;
}
</style>
