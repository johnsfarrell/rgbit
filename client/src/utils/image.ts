/**
 * Determines whether a file (image) has color or not.
 * @param {File} file to check if it has color, an
 * @returns {Promise<boolean>} Promise that resolves to a boolean indicating if the image has color
 */
export const imageHasColor = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
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
    console.error("Error fetching and converting file:", error);
    throw error;
  }
}

/**
 * Gets n random elements from an array.
 * @param {any[]} arr - array of strings
 * @param {number} n - number of elements to get
 * @returns {any[]} - array of n random elements from arr
 */
export const getRandomElements = (arr: any[], n: number) => {
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
