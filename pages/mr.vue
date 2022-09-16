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
    id: "Gd3M1s7XXwwE96N8uo4Y",
  },
  {
    name: "近藤 海斗",
    description: "僕とお付き合いしましょう\n死ぬまであなたを守りますから。",
    id: "VdJiMG4qOmDH2dh9jYtP",
  },
  {
    name: "小杉 将矢",
    description:
      "バスケットカウント。それはたとえ邪魔が入っても君の心に愛をねじ込むことを意味する。",
    id: "j5z9HwuiAxKFFXWKPGxS",
  },
  {
    name: "佐藤 綾真",
    description: "君の彼氏になりたい。",
    id: "qABPsaScjcqbaLZ9657R",
  },
  {
    name: "西村 優亮",
    description: "今夜は俺様の姿を目に焼き付けて寝な。いい夢見れるぜ。",
    id: "qUg5rCwkOABiFupyKvqk",
  },
  {
    name: "吉田 遼人",
    description: "俺のオフサイドトラップにかかってみないか？",
    id: "0riP4vf0IgL60UxQX462",
  },
];

for (var i = 0; i < players.length; i++) {
  const rad = Math.floor(Math.random() * players.length);
  [players[i], players[rad]] = [players[rad], players[i]];
}
</script>
