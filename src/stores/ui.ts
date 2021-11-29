import { writable } from "svelte/store";

export type UiStore = {
  screenshot_url: string;
}

export const store = writable<UiStore>({
  screenshot_url: null,
});

export const ui = {
  ...store,
  setKey (key: keyof UiStore, value: any) {
    return store.update((state) => {
      state[key] = value;
      return state;
    });
  }
}
