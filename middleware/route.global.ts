export default defineNuxtRouteMiddleware(async (to, from) => {
  const toFes = Math.floor((1663369200000 - Date.now()) / 1000);
  const isSmartphone = navigator.userAgent.match(/iPhone|Android.+Mobile/);
  if (to.path !== "/" && to.path !== "/wait" && toFes > 0) {
    //TODO: 本番の時にコメントアウト外す
    if (isSmartphone) {
      return navigateTo("/wait");
    } else {
      return navigateTo("/");
    }
  } else if (to.path === "/" && isSmartphone) {
    return navigateTo("/home");
  }
});
