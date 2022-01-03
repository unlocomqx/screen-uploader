<script lang="ts">
  import { fade } from "svelte/transition"
  import { prefs } from "../stores/prefs"
  import { srStore } from "../stores/sr"

  function handleKeyUp (e) {
    if (e.key === "Escape") {
      srStore.close()
    }
  }

  let shortcut = $prefs.upload_auto_shortcut
  function recordShortcut (e: KeyboardEvent) {
    const meta = e.metaKey
    const ctrl = e.ctrlKey
    const alt = e.altKey
    const shift = e.shiftKey
    const key = e.key

    const ignoredKeys = ["Meta", "Control", "Shift","Alt"]

    if (!key || ignoredKeys.includes(key)) {
      shortcut = ""
      return
    }

    shortcut = ""

    if (meta) {
      shortcut += "Cmd+"
    }

    if (ctrl) {
      shortcut += "Ctrl+"
    }

    if (alt) {
      shortcut += "Alt+"
    }

    if (shift) {
      shortcut += "Shift+"
    }

    if (key) {
      shortcut += String.fromCharCode(e.keyCode)
    }

    $prefs.upload_auto_shortcut = shortcut

  }

  function clear () {
    $prefs.upload_auto_shortcut = ""
  }
</script>

<svelte:body on:keyup={handleKeyUp}/>

<div class="sr-container" on:keyup={handleKeyUp} transition:fade={{duration: 200}}>
  <button class="btn btn-close" on:click={srStore.close}>
    <i class="material-icons">close</i>
  </button>

  <div>
    <label>Press a shortcut to record it</label>
    <div class="input-group mb-3">
      <input type="text"
             class="form-control"
             value={$prefs.upload_auto_shortcut}
             on:keydown={recordShortcut}
      >
      <div class="input-group-append">
        <button class="btn input-group-text"
                title="Clear shortcut"
                on:click={clear}
        >
          <i class="material-icons">clear</i>
        </button>
      </div>
    </div>
  </div>

</div>

<style>
  .sr-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #2B3E50;
  }

  .btn-close {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
