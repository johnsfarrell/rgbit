const { FORBIDDEN_ORIGIN } = require("../config/messages");

/**
 * Check the origin of the request
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {void}
 */
const checkOrigin = (req, res, next) => {
  const allowedOrigin = process.env.CLIENT_URL;
  const requestOrigin = req.get("Origin");

  if (requestOrigin !== allowedOrigin) {
    return res.status(403).json({
      message: FORBIDDEN_ORIGIN
    });
  }
  next();
};

module.exports = checkOrigin;
