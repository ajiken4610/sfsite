<template lang="pug">
div
  .full-page-start
    .start-50.w-75.top-50.translate-middle.border-start.border-2.ps-5
      h1.display-1 Welcome to
        br
        | Salesio Galuin Festival
      .display-6.text-muted サレジオ学院学園祭へようこそ
    a.w-100.start-50.bottom-0.translate-middle-x.display-1.scroll.text-center.mb-4(href="#titles")
  hr
  #titles
    .row.title-buttons-group.align-items-center
      .title-buttons
        div
          PartsOwnerCard(id="k3hy28",:owner="toStrictOwner(projectData.owners.k3hy28)" :responsive="false")
      .title-buttons
        div
          .display-2 2022
          .text-muted 2022年度のすべての企画
      .title-buttons
        div
          .display-2 クラス
          .text-muted すべてのクラス企画
      .title-buttons
        div
          PartsOwnerCard(id="52z2zq",:owner="toStrictOwner(projectData.owners['52z2zq'])" :responsive="false")
      .title-buttons
        div
          PartsOwnerCard(id="zddsak",:owner="toStrictOwner(projectData.owners.zddsak)" :responsive="false")
      .title-buttons
        div
          .display-2 生配信
          .text-muted 生配信を一緒に見よう！
      .title-buttons
        .display-1 a
      .title-buttons
        .display-1 a
</template>

<script setup lang="ts">
import projectData from "~~/assets/data";
const navHeight = useState("nav-height");
</script>

<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins/grid";
@import "bootstrap/scss/mixins/breakpoints";
.scroll::after {
  content: "Get started >>>";
}

.full-page-start {
  height: calc(100vh - v-bind("navHeight+'px'") - 20px);
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
.title-buttons {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  height: calc(25vh - 1rem);
  display: table;
}
.title-buttons > * {
  display: table-cell;
  vertical-align: middle;
}
.title-buttons:nth-child(4n + 1),
.title-buttons:nth-child(4n) {
  @include make-col-ready();
  @include make-col(5);
  @include media-breakpoint-up(sm) {
    @include make-col(4);
  }
}
.title-buttons:nth-child(4n + 2),
.title-buttons:nth-child(4n + 3) {
  @include make-col-ready();

  @include make-col(6.25);
  @include media-breakpoint-up(sm) {
    @include make-col(8);
  }
  text-align: center;
  background-color: rgba(1, 1, 1, 0.479);
  border-radius: 5px;
}
.title-buttons:nth-child(4n + 2) {
  border-left: 2px solid white;
}
.title-buttons:nth-child(4n + 3) {
  border-right: 2px solid white;
}
.fixed-background {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}
</style>
