const REFRESH_TIME = 1000 * 10;
const REFRESH_BALANCE = 3;
const INITIAL_DATE = new Date();
const INITIAL_BALANCE = 5;
const TOTAL_USERS_CACHE_KEY = "totalUsers";
const TOTAL_IMAGES_CACHE_KEY = "totalImages";
const MAX_SIZE = 750000; // 750kb
const REQUEST_TIME_LIMIT = 15 * 60 * 1000; // 15 minutes
const REQUEST_RATE_LIMIT = 50;
const CACHE_TIME = 300; // 300 secs = 5 mins

module.exports = {
  REFRESH_BALANCE,
  REFRESH_TIME,
  INITIAL_DATE,
  INITIAL_BALANCE,
  TOTAL_USERS_CACHE_KEY,
  TOTAL_IMAGES_CACHE_KEY,
  MAX_SIZE,
  REQUEST_TIME_LIMIT,
  REQUEST_RATE_LIMIT,
  CACHE_TIME,
};
