<template lang="pug">
NuxtLayout(:name="$route.path === '/' ? 'full-screen' : 'default'")
  NuxtLoadingIndicator(color="#ff2222")
  NuxtPage(key="content")
</template>
<script setup lang="ts">
import "bootstrap";
import { Synchronizer, Sleeper } from "./composables/Utils";
const router = useRouter();
const synchronizer = new Synchronizer();
// 早すぎるナビゲーション回避
router.beforeEach((to, from, next) => {
  if (to.path === from.path) {
  } else {
    synchronizer.synchronized(async () => {
      next();
      await Sleeper.sleep(2000);
    });
  }
});
router.onError((error) => {
  console.log("Routing error:", error);
  alert(
    "ページルーティング時にエラーが発生しました。\nページを再読み込みしてください。"
  );
  window.location.reload();
});
window.addEventListener("hashchange", (e) => {
  if (location.hash.match(/^#.*$/)) {
    document
      .getElementById(decodeURIComponent(location.hash.substring(1)))
      ?.scrollIntoView(true);
  } else {
    //window.scroll({ top: 0, behavior: "smooth" });
  }
});
const titlePrefix = "Salesio Festa";
useHead({
  titleTemplate: (chunk) => {
    return chunk.match(titlePrefix)
      ? chunk
      : (chunk ? chunk + " | " : "") + titlePrefix;
  },
});
</script>
