import { writable } from "svelte/store";

export const scaleFactor = writable(1);

window.addEventListener("message", (event: MessageEvent<{type: string, value: number}>) => {
  if (event.data.type === "scaleFactor") {
    scaleFactor.set(event.data.value);
  }
});
