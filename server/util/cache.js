const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // 300 secs = 5 mins

module.exports = cache;
