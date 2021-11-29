<script lang="ts">
  import { progress } from "../stores/progress";
  import { ui } from "../stores/ui";
  import { uploadScreenshot } from "../tools/uploader";

  async function uploadImage () {
    let image = window.clipboard.readImage();
    if (!image.isEmpty()) {
      uploadScreenshot(image);
    } else {
      ui.setKey("screenshot_url", null);
      ui.setKey("status", "The clipboard does not contain a valid image");
    }
  }

</script>

<div class="form-field">
  <div style="display: inline-block; position: relative;">
    {#if $progress}
      <div id="progress">
        <div id="track" style="width: {$progress}%"></div>
      </div>
    {/if}
    <button on:click={uploadImage} class="btn btn-primary">
      Upload current image
    </button>
  </div>
  {#if $progress}
    <img id="spinner" src="assets/spinner.gif" height="36" alt="loading...">
  {/if}
</div>
