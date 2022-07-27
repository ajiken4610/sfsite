<template lang="pug">
div
  LayoutHeader
  .container.my-4
    slot
  LayoutFooter
  LayoutLoadingOverlay
  LayoutToastContainer(:toasts="toasts")
</template>

<script setup lang="ts">
const toasts = ref<
  { title?: string; subtitle?: string; body: string; key: number }[]
>([]);

watch(
  getShowingToasts(),
  (value) => {
    toasts.value = value;
  },
  { deep: true, immediate: true }
);

const router = useRouter();
const loading = ref(false);
const overlaying = ref(false);
router.beforeEach((to, from, next) => {
  loading.value = true;
  overlaying.value = true;
  next();
});
router.afterEach(() => {
  overlaying.value = false;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style lang="scss">
@import "highlight.js/scss/github-dark.scss";

@import "bootstrap/scss/functions";
// Default variable overrides
$light: #dddddd;
$dark: #181b2c;

$body-bg: #181b2c;
$body-color: #fff;

$component-active-color: $body-color;
$component-active-bg: $body-bg;

$popover-bg: $body-bg;
$popover-border-color: $body-color;

$modal-content-bg: $body-bg;
$modal-content-color: $body-color;

$toast-header-color: $body-color;
$toast-background-color: rgba(black, 0.5);
$toast-header-background-color: rgba(black, 0.1);

$dropdown-link-color: $body-bg;

$btn-close-color: $body-color;

$card-height: 100%;

:root {
  --vs-controls-color: #ffffff;
  --vs-border-color: #ffffff;

  --vs-dropdown-bg: #181b2c;
  --vs-dropdown-color: #ffffff;
  --vs-dropdown-option-color: #ffffff;

  --vs-selected-bg: #181b2c;
  --vs-selected-color: #ffffff;

  --vs-search-input-color: #ffffff;

  --vs-dropdown-option--active-bg: #2d3353;
  --vs-dropdown-option--active-color: #ffffff;
}
@import "bootstrap/scss/bootstrap";

@import "vue-select/dist/vue-select.css";

@import "bootstrap-icons/font/bootstrap-icons.css";
@import "katex/dist/katex.min.css";

$custom-colors: (
  "sfsite": #181b2c,
);

$theme-colors: map-merge($theme-colors, $custom-colors);
.page-enter-active,
.page-leave-active {
  transition: all 1s ease;
}
a,
a:hover {
  color: $body-color;
}
.page-enter-from,
.page-leave-to,
.page-leave-active {
  transform: translateY(-100vh);
  opacity: 0;
}

.page-move {
  transition: all 1s ease;
}
body:not(.modal-open) {
  overflow-y: scroll;
}
</style>
