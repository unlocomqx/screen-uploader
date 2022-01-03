import { writable } from "svelte-local-storage-store"
import { get } from "svelte/store"

export type Prefs = {
  start_hidden: boolean
  upload_auto: boolean
  upload_auto_shortcut: string
  downscale: boolean
  copy_auto: boolean
  upload_url: string
  upload_current_shortcut: string
}

export const store = writable<Prefs>("prefs", {
  start_hidden           : false,
  upload_auto            : true,
  upload_auto_shortcut   : "",
  downscale              : false,
  copy_auto              : true,
  upload_url             : null,
  upload_current_shortcut: ""
})

export const prefs = {
  ...store,
  getKey (key: keyof Prefs): any {
    const data = get(store)
    return data[key]
  }
}
