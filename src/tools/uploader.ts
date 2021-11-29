import { prefs } from "../stores/prefs";
import { progress } from "../stores/progress";
import { ui } from "../stores/ui";

export function uploadScreenshot (image) {
  const form = new FormData();
  form.append("file", image.toDataURL());
  progress.set(0);
  window.axios.request({
    url             : prefs.getKey("upload_url"),
    method          : "POST",
    data            : form,
    onUploadProgress: (ev) => {
      const percent = ev.loaded / ev.total * 100;
      progress.set(percent);
    }
  }).then(res => {
    progress.set(100);
    const url = res.data;
    ui.setKey("screenshot_url", url);
    if (prefs.getKey("copy_auto") && url.startsWith("https://")) {
      window.clipboard.writeText(url);
    }
    playSound();
  }).finally(() => {
    progress.set(0);
  });
}

function playSound () {
  const audio = new Audio("assets/ding.mp3");
  audio.volume = 0.2;
  audio.play();
}
