const { CACHE_TIME } = require("../config/const");

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: CACHE_TIME });

module.exports = cache;
