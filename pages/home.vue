<template lang="pug">
div
  .full-page-start
    .start-50.w-75.top-50.translate-middle.border-start.border-2.ps-5
      h1.display-1 Welcome to
        br
        | Salesio Galuin Festival
      .display-6.text-muted サレジオ学院学園祭へようこそ
  hr
  .full-page
    span こんにちは
</template>

<script setup lang="ts">
const navHeight = useState("nav-height");
</script>

<style scoped lang="scss">
.full-page-start {
  height: calc(100vh - v-bind("navHeight+'px'"));
  position: relative;
}
.full-page-start > * {
  position: absolute;
}
.full-page {
  height: 100vh;
  position: relative;
}
.full-page > * {
  position: absolute;
}
.fixed-background {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}
</style>
