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
    name: "サレジオ太郎1",
    description: "1ろーれむいぷさむ",
    id: "Gd3M1s7XXwwE96N8uo4Y",
  },
  {
    name: "サレジオ太郎2",
    description: "2ろーれむいぷさむ",
    id: "VdJiMG4qOmDH2dh9jYtP",
  },
  {
    name: "サレジオ太郎3",
    description: "3ろーれむいぷさむ",
    id: "j5z9HwuiAxKFFXWKPGxS",
  },
  {
    name: "サレジオ太郎4",
    description: "4ろーれむいぷさむ",
    id: "qABPsaScjcqbaLZ9657R",
  },
  {
    name: "サレジオ太郎5",
    description: "5ろーれむいぷさむ",
    id: "qUg5rCwkOABiFupyKvqk",
  },
  {
    name: "サレジオ太郎6",
    description: "6ろーれむイプサム",
    id: "0riP4vf0IgL60UxQX462",
  },
];

for (var i = 0; i < players.length; i++) {
  const rad = Math.floor(Math.random() * players.length);
  [players[i], players[rad]] = [players[rad], players[i]];
}
</script>
