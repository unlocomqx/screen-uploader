<script lang="ts">
  import { onMount } from "svelte";
  import UploadBtn from "./components/UploadBtn.svelte";
  import { prefs } from "./stores/prefs";
  import { ui } from "./stores/ui";
  import { initClipboardWatcher } from "./tools/clipboard";

  onMount(initClipboardWatcher)
</script>

<div id="main_container">
  <fieldset>
    <div class="form-group">
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" bind:checked={$prefs.start_hidden} class="custom-control-input" id="start_hidden">
          <label class="custom-control-label" for="start_hidden">Start hidden</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" bind:checked={$prefs.upload_auto} class="custom-control-input" id="upload_auto">
          <label class="custom-control-label" for="upload_auto">Auto upload images in clipboard</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" bind:checked={$prefs.downscale} class="custom-control-input" id="downscale">
          <label class="custom-control-label" for="downscale">Auto downscale retina images</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" bind:checked={$prefs.copy_auto} class="custom-control-input" id="copy_auto">
          <label class="custom-control-label" for="copy_auto">Auto copy url to clipboard</label>
        </div>
      </div>
    </div>
  </fieldset>

  <div class="form-group">
    <label for="upload_url">Upload address:</label>
    <div class="upload_url_div">
      <input placeholder="https://..." id="upload_url" bind:value={$prefs.upload_url} class="form-control"/>
      <button id="save_button" class="btn btn-primary" style="vertical-align: baseline;">Save</button>
    </div>
  </div>

  <UploadBtn/>

  <div class="form-field">
    Screenshot url: <br/>
    <input id="screenshot_url" class="form-control" value="{$ui.screenshot_url}" onclick="this.select()"/>
  </div>
</div>

<style lang="scss">
  .upload_url_div {
    position: relative;

    &:focus-within {
      #save_button {
        opacity: 1;
      }
    }
  }

  #save_button {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
