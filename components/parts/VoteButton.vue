<template lang="pug">
.m-2
  PartsModal
    template(#modal)
      span
        template(v-if="!voted")
          h1 {{ name }}に投票しますか？
          .lead 後から変更できません
        template(v-else)
          h1 既に投票済みです
        .d-flex
          button.btn.btn-primary.ms-auto(
            @click="vote",
            data-bs-dismiss="modal"
          ) {{ voted ? "OK" : "投票する" }}
    template(#default="{ modalId }")
      button.btn.btn-outline-light.mx-auto.d-block(
        data-bs-toggle="modal",
        :data-bs-target="'#' + modalId"
      )
        span.lead(v-if="!voted") {{ name }}に投票する
        b.lead.bi(
          :class="[voted === id ? 'bi-balloon-heart-fill' : 'bi-balloon-heart']"
        )
          | {{ number }}
</template>
<script setup lang="ts">
const props = defineProps<{ id: string; number: number; name: string }>();
const voted = useVoted();

const vote = async () => {
  if (!voted.value) {
    console.log(props.id);
    await incrementMr(props.id);
    showToast({
      title: "投票完了",
      body: "投票は完了しました。反映されるまで時間がかかる場合があります。",
    });
    voted.value = props.id;
  }
};
</script>
