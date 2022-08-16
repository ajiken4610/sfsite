<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-dark.bg-dark.shadow-lg(ref="headerElement")
  .container-fluid
    NuxtLink.navbar-brand(to="/home") Salesio Festa
    button.navbar-toggler(
      type="button",
      data-bs-toggle="collapse",
      data-bs-target="#navbarSupportedContent",
      aria-controls="navbarSupportedContent",
      aria-expanded="false",
      aria-label="Toggle navigation"
    )
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mb-2.mb-lg-0.position-relative
        li.nav-item
          NuxtLink.nav-link(to="/@k3hy28", active-class="active") 2022年度
        li.nav-item
          NuxtLink.nav-link(to="/@52z2zq", active-class="active") クラス企画
      .d-flex.search-box(
        :class="{ searchBoxFocused, searchBoxFocusedDelayed, 'ms-auto': !searchBoxFocused }"
      )
        .input-group(ref="searchGroup")
          input.form-control.bg-black(
            type="search",
            placeholder="検索...",
            aria-label="Search",
            @focusin="searchBoxFocused = true",
            @focusout="searchBoxFocused = false",
            @keydown.enter="search",
            v-model="searchBoxValue",
            ref="searchBox"
          )
          button.btn.btn-outline-light(@click="search")
            .bi-search
</template>

<script setup lang="ts">
const searchBoxFocused = ref(false);
const searchBoxFocusedDelayed = ref(false);
const searchGroup = ref<HTMLDivElement>();
const searchBoxRectOffset = ref<{
  top: number;
  bottom: number;
  left: number;
  right: number;
}>({ top: 0, bottom: 0, left: 0, right: 0 });
let searchBoxRectOffsetOld: {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
watch(searchBoxFocused, () => {
  if (window.innerWidth > 991) {
    if (searchBoxFocused.value) {
      // focused
      searchBoxFocusedDelayed.value = true;
      const rect = searchGroup.value.getBoundingClientRect();
      searchBoxRectOffsetOld = searchBoxRectOffset.value = {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
      setTimeout(() => {
        searchBoxRectOffset.value = {
          top: 20,
          bottom: 0,
          left: 20,
          right: window.innerWidth - 20,
        };
      }, 100);
    } else {
      searchBoxRectOffset.value = searchBoxRectOffsetOld;
      setTimeout(() => {
        searchBoxFocusedDelayed.value = searchBoxFocused.value;
      }, 500);
    }
  }
});
const searchBoxValue = ref("");
const searchBox = ref<HTMLInputElement>();
const search = () => {
  const value = searchBoxValue.value;
  if (value.length > 1) {
    searchBox.value.blur();
    useRouter().push("/list/" + value);
  } else if (value.length == 0) {
    searchBox.value.blur();
    useRouter().push("/list");
  } else {
    showToast({
      title: "検索エラー",
      body: "検索語句は2文字以上である必要があります",
    });
  }
};
const headerElement = ref<HTMLElement>(null);
onMounted(() => {
  const observer = new ResizeObserver((e) => {
    const height = useState("nav-height", () => 0);
    height.value = e[0].contentRect.height;
  });
  observer.observe(headerElement.value);
});
</script>

<style scoped lang="scss">
.searchBoxFocusedDelayed {
  position: fixed;
  top: v-bind("searchBoxRectOffset.top+'px'");
  left: v-bind("searchBoxRectOffset.left+'px'");
  width: v-bind("searchBoxRectOffset.right-searchBoxRectOffset.left+'px'");
}

.search-box {
  transition: all 0.5s ease;
  z-index: 2000;
}
</style>
