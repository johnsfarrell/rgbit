const { REQUEST_TIME_LIMIT, REQUEST_RATE_LIMIT } = require("../config/const");
const { REQUEST_LIMIT } = require("../config/messages");
const { getTimestampHHMMSS } = require("../util/time");
const rateLimit = require("express-rate-limit");

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

/**
 * Middleware that limits the number of requests from an IP address.
 */
const limiter = rateLimit({
  windowMs: REQUEST_TIME_LIMIT,
  max: REQUEST_RATE_LIMIT,
  message: {
    message: REQUEST_LIMIT,
  },
});

module.exports = { logger, limiter };
