const FormData = require("form-data");
const fetch = require("node-fetch");
const { COLORIZE_FLASK_API } = require("../config/const");

/**
 * Colorizes a black and white image
 * @param {Buffer} imageBuffer Buffer of the image to colorize
 * @returns {Promise<Buffer>} Promise resolving to the buffer of the colorized image
 */
const colorize = async (imageBuffer) => {
  const formData = new FormData();
  formData.append("file", imageBuffer, "image.jpg");
  const headers = formData.getHeaders();

  try {
    const response = await fetch(COLORIZE_FLASK_API, {
      method: "POST",
      body: formData,
      headers: headers,
    });
    const colorizedBuffer = await response.buffer();
    return colorizedBuffer;
  } catch (error) {
    return null;
  }
};

module.exports = colorize;
