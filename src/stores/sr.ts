import { writable } from "svelte/store"

export type SrStore = {
  open: boolean;
  context: string
}

export const store = writable<SrStore>({
  open   : false,
  context: null
})

export const srStore = {
  ...store,

  open (context: string) {
    return store.update(() => {
      return {
        open: true,
        context,
      }
    })
  },

  close () {
    return store.update(() => {
      return {
        open   : false,
        context: null,
      }
    })
  }
}
