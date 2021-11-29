<script lang="ts">
  import { ui } from "../stores/ui";
  import { uploadScreenshot } from "../tools/uploader";

  async function uploadImage () {
    let image = window.clipboard.readImage();
    if (!image.isEmpty()) {
      uploadScreenshot(image);
    } else {
      ui.setKey("screenshot_url", "Not a valid image");
    }
  }

</script>

<div class="form-field">
  <div style="display: inline-block; position: relative;">
    <div id="progress">
      <div id="track"></div>
    </div>
    <button on:click={uploadImage} class="btn btn-primary">
      Upload current image
    </button>
  </div>
  <img id="spinner" style="display: none;" src="assets/spinner.gif" height="36" alt="loading...">
</div>
