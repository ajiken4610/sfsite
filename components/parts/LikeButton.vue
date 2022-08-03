<template lang="pug">
div.ms-2
  i.h3(@click="pushLike" :class="{'bi-heart':!liked,'bi-heart-fill':liked}")
  span {{like}}
</template>

<script setup lang="ts">
const props = defineProps<{ id: string }>();
const like = ref<number>();
const liked = ref<boolean>(useLikedProjects().value.includes(props.id));

(async () => {
  const likes = await useLikes();
  like.value = likes.data.value[props.id] || 0;
})();
const pushLike = async () => {
  if (!liked.value) {
    like.value++;
    liked.value = true;
    onPushLike(props.id);
  }
};
</script>
