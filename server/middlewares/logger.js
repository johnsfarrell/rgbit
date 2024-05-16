const { getTimestampHHMMSS } = require("../util/time");

/**
 * Middleware that logs the request method and URL to the console.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const logger = function (req, res, next) {
  const timestampMMSS = getTimestampHHMMSS();
  console.log(timestampMMSS, req.method, req.url);
  next();
};

module.exports = logger;
