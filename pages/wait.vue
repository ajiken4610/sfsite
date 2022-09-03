<template lang="pug">
div 
  h1.text-center サレ祭開始までお待ちください...
  NuxtLink(v-if="toFes < 0", to="/home")
    button.btn.btn-outline-primary.mx-auto.d-block 進む
  .text-center.lead(v-else) サレ祭開始まで{{ Math.floor(toFes / 3600) }}時間{{ Math.floor((toFes / 60) % 60) }}分{{ toFes % 60 }}秒
</template>

<script setup lang="ts">
const toFes = ref(0);
let running = true;
const render = () => {
  running && requestAnimationFrame(render);
  toFes.value = Math.floor((1663369200000 - Date.now()) / 1000);
};
render();

onUnmounted(() => {
  running = false;
});
</script>
