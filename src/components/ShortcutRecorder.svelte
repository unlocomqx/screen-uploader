<script lang="ts">
  import { fade } from "svelte/transition"
  import { prefs } from "../stores/prefs"
  import { srStore } from "../stores/sr"

  function handleKeyUp (e) {
    if (e.key === "Escape") {
      srStore.close()
    }
  }

  $: context = $srStore.context
  $: shortcut = $prefs[context]

  function recordShortcut (e: KeyboardEvent) {
    const meta = e.metaKey
    const ctrl = e.ctrlKey
    const alt = e.altKey
    const shift = e.shiftKey
    const key = e.key

    const ignoredKeys = ["Meta", "Control", "Shift", "Alt"]

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

    $prefs[context] = shortcut
    window.postMessage("registerShortcuts")
  }

  function clear () {
    $prefs[context] = ""
  }
</script>

<svelte:body on:keyup={handleKeyUp}/>

<div class="sr-container" on:keyup={handleKeyUp} transition:fade={{duration: 200}}>
  <button class="btn btn-close" on:click={srStore.close}>
    <i class="material-icons">close</i>
  </button>

  <div>
    <label for="shortcut">Press a shortcut to record it</label>
    <div class="input-group mb-3">
      <input type="text"
             id="shortcut"
             class="form-control"
             value={$prefs[context] || ''}
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
