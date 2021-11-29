import { writable } from "svelte/store";

export const progress = writable<number>(0);
