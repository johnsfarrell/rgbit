const { MAX_SIZE } = require("./const");

const USER_ALREADY_EXISTS = "User already exists.";
const USER_NOT_FOUND = "User does not exist.";
const USER_CREATED = "User created.";
const USER_DELETED = "User deleted.";
const USER_CREATION_FAILED = "Failed to create user.";
const UNAUTHORIZED = "Not authorized to complete action.";
const INVALID_KEY = "Invalid key.";
const MISSING_KEY = "Missing key or encryptedKey.";
const INSUFFICIENT_BALANCE = "Insufficient balance. Please wait for refresh!";
const SUCCESS = "Success.";
const MISSING_IMAGE = "No image provided";
const COLORIZE_FAILED = "Failed to colorize image";
const IMAGE_CREATION_FAILED = "Failed to save image";
const IMAGE_NOT_FOUND = "Image not found";
const FILE_SIZE_EXCEEDED = `File size exceeded. Limit to ${MAX_SIZE} bytes.`;

module.exports = {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  USER_CREATED,
  USER_DELETED,
  USER_CREATION_FAILED,
  UNAUTHORIZED,
  INVALID_KEY,
  INSUFFICIENT_BALANCE,
  SUCCESS,
  MISSING_IMAGE,
  COLORIZE_FAILED,
  IMAGE_CREATION_FAILED,
  IMAGE_NOT_FOUND,
  MISSING_KEY,
  FILE_SIZE_EXCEEDED,
};
