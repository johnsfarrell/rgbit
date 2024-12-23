import heic2any from "heic2any";
import { FILE_NOT_IMAGE } from "./desc";

/**
 * Determines whether a file (image) has color or not.
 * @param {File} file to check if it has color, an
 * @returns {Promise<boolean>} Promise that resolves to a boolean indicating if the image has color
 */
export const imageHasColor = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Error getting 2d context."));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let isColor = false;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (
            Math.abs(r - g) > 10 ||
            Math.abs(r - b) > 10 ||
            Math.abs(g - b) > 10
          ) {
            isColor = true;
            break;
          }
        }

        resolve(isColor);
      };

      img.onerror = () => {
        reject(new Error("Error loading image."));
      };

      if (!e.target || typeof e.target.result !== "string") {
        reject(new Error("Error reading file."));
        return;
      }

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Error reading file."));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Converts a URL to a File object.
 * @param {string} url URL to convert to a File object
 * @param {string} filename Name of the file
 * @returns {Promise<File>} Promise that resolves to a File object
 */
export async function urlToFile(url: string, filename: string): Promise<File> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    throw error;
  }
}

/**
 * Gets n random elements from an array.
 *
 * If n is none, return shuffled array
 *
 * @param {any[]} arr - array of strings
 * @param {number?} n - number of elements to get
 * @returns {any[]} - array of n random elements from arr
 */
export const getRandomElements = (arr: any[], n?: number) => {
  if (!n) n = arr.length;
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

/**
 * Checks if a file is an image.
 * @param file - A file to check if it is an image
 * @returns A boolean indicating if the file is an image
 */
export function isImage(file: File | undefined | null): boolean {
  return !!file && file.type.startsWith("image/");
}

/**
 * Checks if a file is a JPEG image.
 * @param file - A file to check if it is a JPEG image
 * @returns A boolean indicating if the file is a JPEG image
 */
export function isJPEG(file: File | undefined | null): boolean {
  return (
    !!file &&
    isImage(file) &&
    (file.type === "image/jpeg" || file.type === "image/jpg")
  );
}

/**
 * Converts a HEIC file to a JPEG file.
 * @param file - A HEIC file to convert to JPEG
 * @returns A promise that resolves to a File object with the same content as the input file, but in JPEG format
 */
async function heicToJPEG(file: File): Promise<File> {
  const heicConversionResult = await heic2any({
    blob: file,
    toType: "image/jpeg"
  });

  const heicBlob = Array.isArray(heicConversionResult)
    ? heicConversionResult[0]
    : heicConversionResult;

  file = new File([heicBlob], file.name.replace(/\.[^/.]+$/, ".jpeg"), {
    type: "image/jpeg",
    lastModified: Date.now()
  });

  return file;
}

/**
 * Converts any file to a JPEG file.
 * @param file - Any file to convert to JPEG
 * @returns A promise that resolves to a File object with the same content as the input file, but in JPEG format
 */
export async function convertToJPEG(file: File): Promise<File> {
  if (isJPEG(file)) return file;

  if (!isImage(file)) throw new Error(FILE_NOT_IMAGE);

  if (["image/heic", "image/heif"].includes(file.type)) return heicToJPEG(file);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0);

        canvas.toBlob(blob => {
          if (blob) {
            const jpegFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".jpeg"),
              {
                type: "image/jpeg",
                lastModified: Date.now()
              }
            );
            resolve(jpegFile);
          } else {
            reject(new Error("Conversion to JPEG failed."));
          }
        }, "image/jpeg");
      };
      img.onerror = function () {
        reject(new Error("Failed to load image."));
      };
      if (event.target) img.src = event.target.result as string;
    };
    reader.onerror = function () {
      reject(new Error("Failed to read file."));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Limits the size of an image file.
 * @param file - An image file to limit the size of
 * @param maxSize - The maximum size in bytes
 * @returns A promise that resolves to a File object with the same content as the input file, but with a size less than or equal to maxSize
 */
export async function limitJPEGSize(
  file: File,
  maxSize: number
): Promise<File> {
  if (!isJPEG(file)) throw new Error("The provided file is not a JPEG image.");

  if (file.size <= maxSize) return file;

  const image = new Image();
  image.src = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get 2d context."));
        return;
      }

      const width = image.width;
      const height = image.height;

      if (width <= 0 || height <= 0) {
        reject(new Error("Invalid image dimensions."));
        return;
      }

      const ratio = Math.sqrt(maxSize / (width * height));
      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(resizedFile);
        } else {
          reject(new Error("Failed to resize image."));
        }
      }, file.type);
    };
    image.onerror = () => {
      reject(new Error("Failed to load image."));
    };
  });
}

/**
 * Grayscales a JPEG image file.
 * @param file - A JPEG file to grayscale
 * @returns A promise that resolves to a File object with the same content as the input file, but in grayscale
 */
export async function grayscaleJPEG(file: File): Promise<File> {
  if (!isJPEG(file)) throw new Error("The provided file is not a JPEG image.");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
          }

          ctx.putImageData(imageData, 0, 0);

          canvas.toBlob(blob => {
            if (blob) {
              const grayscaleFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(grayscaleFile);
            } else {
              reject(new Error("Conversion to grayscale failed."));
            }
          }, file.type);
        } else {
          reject(new Error("Failed to get 2d context."));
        }
      };
      img.onerror = function () {
        reject(new Error("Failed to load image."));
      };
      if (event.target) img.src = event.target.result as string;
    };
    reader.onerror = function () {
      reject(new Error("Failed to read file."));
    };
    reader.readAsDataURL(file);
  });
}
