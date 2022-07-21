<template lang="pug">
NuxtLayout(:name="$route.path === '/' ? 'full-screen' : 'default'")
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
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | SaleFes` : "Salesio Festa";
  },
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
</script>

<style lang="scss">
a:not(:hover) {
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(128, 128, 128, 0.5);
  border-radius: 3px;
  padding: 6px;
}

::-webkit-scrollbar-thumb {
  background: #292929;
  border-radius: 3px;
  border-top: solid 3px white;
  border-bottom: solid 3px white;
}
</style>
