<template lang="pug">
.d-lg-flex(:class="[{ 'flex-row-reverse': reversed }]")
  .flex-fill.position-relative.d-lg-block.d-none
    .position-absolute.top-50.start-50.translate-middle.w-100
      .display-1.text-center {{ name }}
      .h1.lead.text-center {{ description }}
      PartsVoteButton(:id="id", :number="data[id]", :name="name")
  .flex-fill.d-lg-none.d-block
    .display-1.text-center {{ name }}
    .h1.lead.text-center {{ description }}
    PartsVoteButton(:id="id", :number="data[id]", :name="name")
  img.mr-image.d-lg-block.d-none.w-50(:src="'/player/' + id + '.jpg'")
  img.mr-image.d-lg-none.d-block.w-100(:src="'/player/' + id + '.jpg'")
</template>
<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  reversed: boolean;
  id: string;
  data: { [key: string]: number };
}>();
</script>
<style scoped lang="scss">
.mr-image {
  display: block;
  border-radius: 5px;
  margin: 0.5rem;
}
</style>
