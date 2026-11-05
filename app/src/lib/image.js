// Loads an image file into an <img> element the crop sheet can measure
// and draw from. Caller is responsible for revoking the object URL once
// done with the image (crop sheet does this on unmount/cancel/save).
export function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}

// Draws the given source rect (in the image's natural pixel coordinates)
// scaled to fill an outputSize x outputSize square, as a JPEG data URL.
export function cropToDataUrl(img, { sx, sy, sSize }, outputSize = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, outputSize, outputSize);
  return canvas.toDataURL('image/jpeg', 0.85);
}
