const item = localStorage.getItem("voted");
const voted = ref(item === "null" ? null : item);
export default () => voted;
watchEffect(() => {
  localStorage.setItem("voted", voted.value);
});
