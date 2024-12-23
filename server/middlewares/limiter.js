const { REQUEST_TIME_LIMIT, REQUEST_RATE_LIMIT } = require("../config/const");
const { REQUEST_LIMIT } = require("../config/messages");
const rateLimit = require("express-rate-limit");

/**
 * Middleware that limits the number of requests from an IP address.
 */
const limiter = rateLimit({
  windowMs: REQUEST_TIME_LIMIT,
  max: REQUEST_RATE_LIMIT,
  message: {
    message: REQUEST_LIMIT
  }
});

module.exports = limiter;
