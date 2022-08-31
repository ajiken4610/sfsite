<template lang="pug">
.d-lg-flex(:class="[{ 'flex-row-reverse': reversed }]")
  .flex-fill.position-relative.d-lg-block.d-none
    .position-absolute.top-50.start-50.translate-middle.w-100
      .display-1.text-center {{ name }}
      .h1.lead.text-muted.text-center {{ description }}
  .flex-fill.d-lg-none.d-block
    .display-1.text-center {{ name }}
    .h1.lead.text-muted.text-center {{ description }}
  img.mr-image.d-lg-block.d-none.w-50
  img.mr-image.d-lg-none.d-block.w-100
</template>
<script setup lang="ts">
defineProps<{ name: string; description: string; reversed: boolean }>();
</script>
<style scoped lang="scss">
.mr-image {
  display: block;
  height: 33vh;
}
</style>
