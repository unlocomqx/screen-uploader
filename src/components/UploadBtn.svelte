<script lang="ts">
  import { progress } from "../stores/progress"
  import { srStore } from "../stores/sr"
  import { ui } from "../stores/ui"
  import { uploadScreenshot } from "../tools/uploader"

  async function uploadImage () {
    let image = window.clipboard.readImage()
    if (!image.isEmpty()) {
      uploadScreenshot(image)
    } else {
      ui.setKey("screenshot_url", null)
      ui.setKey("status", "Invalid image")
    }
  }

  progress.subscribe(async (value) => {
    if (!value) {
      window.postMessage({ type: "progress", src: null })
      return
    }
    const width = 16
    const height = 16
    const bar_height = 4
    let offscreen = new OffscreenCanvas(width, height)
    const ctx: CanvasRenderingContext2D = offscreen.getContext("2d")

    ctx.beginPath()
    ctx.rect(0, height / 2 - bar_height / 2, width, bar_height)
    ctx.strokeStyle = "#00AAF2"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.rect(0, height / 2 - bar_height / 2, width * value / 100, bar_height)
    ctx.fillStyle = "#00AAF2"
    ctx.fill()
    ctx.closePath()

    const blob: Blob = await offscreen.convertToBlob()
    window.postMessage({ type: "progress", src: await toDataURL(blob) })
    offscreen = null
  })

  async function toDataURL (blob) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener("load", () => resolve(reader.result))
      reader.readAsDataURL(blob)
    })
  }

  window.addEventListener("message", (event: MessageEvent<{ type: string, value: number }>) => {
    if (event.data.type === "globalShortcut") {
      switch (event.data.value) {
        case "upload_current_shortcut":
          uploadImage()
          break
      }
    }
  })
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
    <button class="btn btn-inline btn-shortcut shortcut-btn"
            title="Record shortcut to toggle this setting"
            on:click={() => srStore.open("upload_current_shortcut")}
    >
      <i class="material-icons">shortcut</i>
    </button>
  </div>
  {#if $progress}
    <img id="spinner" src="assets/spinner.gif" height="36" alt="loading...">
  {/if}
</div>

<style>
  .shortcut-btn {
    vertical-align: middle;
  }
</style>
