import { get } from "svelte/store";
import { prefs } from "../stores/prefs";
import { scaleFactor } from "../stores/scale-factor";
import { downscale } from "./image";
import { uploadScreenshot } from "./uploader";

export function initClipboardWatcher() {
  const watcher = window.clipboardWatcher({
    // (optional) delay in ms between polls
    watchDelay: 1000,

    // handler for when image data is copied into the clipboard
    onImageChange: (nativeImage) => {
      if (prefs.getKey("downscale")) {
        nativeImage = downscale(nativeImage, get(scaleFactor));
      }

      if (prefs.getKey("upload_auto")) {
        uploadScreenshot(nativeImage);
      }
    }
  });

  return watcher.stop;
}
