<template lang="pug">
div
  .display-1 Mr.Salesio 投票!
  .lead.mb-4 Mrサレジオ投票にご参加ください!
  template(v-for="(player,index) of players")
    hr
    Player.my-4(v-bind="player", :reversed="index % 2 === 0")
</template>

<script setup lang="ts">
import Player from "~~/components/parts/Player.vue";
const players = [
  { name: "サレジオ太郎1", description: "1ろーれむいぷさむ" },
  { name: "サレジオ太郎2", description: "2ろーれむいぷさむ" },
  { name: "サレジオ太郎3", description: "3ろーれむいぷさむ" },
  { name: "サレジオ太郎4", description: "4ろーれむいぷさむ" },
  { name: "サレジオ太郎5", description: "5ろーれむいぷさむ" },
];

for (var i = 0; i < players.length; i++) {
  const rad = Math.floor(Math.random() * players.length);
  [players[i], players[rad]] = [players[rad], players[i]];
}
</script>
