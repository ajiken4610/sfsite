export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/" && navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return navigateTo("/h");
  }
});
