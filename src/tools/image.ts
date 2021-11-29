import type { NativeImage } from "electron";

export function downscale (image: NativeImage, scaleFactor: number) {
  if (scaleFactor === 1) {
    return image;
  }
  let size = image.getSize();

  return image.resize({
    width : size.width / scaleFactor,
    height: size.height / scaleFactor,
  });
}
