export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_MB = 8;

export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file provided.' };
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WEBP image.' };
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return { valid: false, error: `Image must be smaller than ${MAX_FILE_SIZE_MB}MB.` };
  }
  return { valid: true, error: null };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes an image (base64 data URL) to a max dimension to keep
 * API payloads small and requests fast.
 */
export function resizeImage(base64, maxDimension = 1024) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error('Failed to process image.'));
    img.src = base64;
  });
}
