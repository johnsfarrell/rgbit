const { REFRESH_TIME } = require("../config/const");

/**
 * Function to get refresh time in Date format
 * @returns {Date} Date object representing the refresh time
 */
function getRefreshTime() {
  return new Date(new Date().getTime() + REFRESH_TIME);
}

/**
 * Function to get timestamp in HH:MM:SS format
 * @returns {string} timestamp in HH:MM:SS format
 */
function getTimestampHHMMSS() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
  getRefreshTime,
  getTimestampHHMMSS,
};
