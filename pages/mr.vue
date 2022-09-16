<template lang="pug">
div
  .display-1 Mr.Salesio 投票!
  .lead.mb-4 Mr.Salesio 投票にご参加ください!
  template(v-for="(player,index) of players")
    hr
    Player.my-4(v-bind="player", :reversed="index % 2 === 0", :data="data")
</template>

<script setup lang="ts">
import Player from "~~/components/parts/Player.vue";
import { useMr } from "~~/composables/firestore";
const data = await useMr();
const players = [
  {
    name: "北村 駿",
    description: "恋っていうから愛に来た。",
    id: "02",
  },
  {
    name: "近藤 海斗",
    description: "僕とお付き合いしましょう\n死ぬまであなたを守りますから。",
    id: "06",
  },
  {
    name: "小杉 将矢",
    description:
      "バスケットカウント。それはたとえ邪魔が入っても君の心に愛をねじ込むことを意味する。",
    id: "03",
  },
  {
    name: "佐藤 綾真",
    description: "君の彼氏になりたい。",
    id: "04",
  },
  {
    name: "西村 優亮",
    description: "今夜は俺様の姿を目に焼き付けて寝な。いい夢見れるぜ。",
    id: "05",
  },
  {
    name: "吉田 遼人",
    description: "俺のオフサイドトラップにかかってみないか？",
    id: "01",
  },
];

for (var i = 0; i < players.length; i++) {
  const rad = Math.floor(Math.random() * players.length);
  [players[i], players[rad]] = [players[rad], players[i]];
}
</script>
