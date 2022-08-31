<template lang="pug">
div
  span.modal-open-button
    slot(:modalId="id")
  Teleport(to="body")
    .modal.fade(:id="id", area-hidden="true", tabindex="-1")
      .modal-dialog.modal-dialog-centered.modal-lg
        .modal-content
          .modal-header
            button.btn.btn-close(data-bs-dismiss="modal", area-label="Close")
          .modal-body
            slot(name="modal")
</template>
<script lang="ts">
import { Slugger } from "marked";
const slugger = new Slugger();
</script>
<script setup lang="ts">
const id = ref(slugger.slug("modal-fullscreen-id"));
</script>

<style scoped lang="scss"></style>
