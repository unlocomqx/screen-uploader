import type { AxiosStatic } from "axios";
import type { Clipboard, NativeImage } from "electron";

export type ClipboardWatcherOpts = {
  watchDelay: number;
  onImageChange: (image: NativeImage) => void;
  onTextChange: (text: string) => void;
}

declare global {
  interface Window {
    axios: AxiosStatic;
    clipboard: Clipboard;
    clipboardWatcher: (opts) => { stop: () => void };
  }
}

export {};
