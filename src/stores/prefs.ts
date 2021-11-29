import { writable } from "svelte-local-storage-store";
import { get } from "svelte/store";

export type Prefs = {
  start_hidden: boolean,
  upload_auto: boolean,
  downscale: boolean,
  copy_auto: boolean,
  upload_url: string
}

export const store = writable<Prefs>("prefs", {
  start_hidden: false,
  upload_auto: true,
  downscale: false,
  copy_auto: true,
  upload_url: null
});

export const prefs = {
  ...store,
  getKey (key: keyof Prefs): any{
    const data = get(store);
    return data[key];
  }
}
