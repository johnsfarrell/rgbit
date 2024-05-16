const UserModel = require("../models/UserModel");
const {
  USER_ALREADY_EXISTS,
  UNAUTHORIZED,
  USER_CREATION_FAILED,
  USER_CREATED,
  USER_NOT_FOUND,
  SUCCESS,
  USER_DELETED,
  MISSING_KEY,
} = require("../config/messages");
const {
  REFRESH_TIME,
  INITIAL_DATE,
  INITIAL_BALANCE,
  REFRESH_BALANCE,
  TOTAL_USERS_CACHE_KEY,
} = require("../config/const");
const { verifySignature } = require("../util/key");
const cache = require("../util/cache");

/**
 * Endpoint for handling user creation.
 *
 * If key or encryptedKey is missing, returns 400.
 * If user already exists, returns 204.
 * If keys do not match, returns 403 (Forbidden).
 * If user creation fails, returns 500.
 * If user creation is successful, returns 200.
 *
 * @param {Request} req Request containing key and encryptedKey
 * @param {Response} res Response containing the created user
 * @returns {void}
 */
module.exports.createUser = async (req, res) => {
  const { key, encryptedKey } = req.body;

  if (!key || !encryptedKey) {
    res.status(400).send({ message: MISSING_KEY });
    return;
  }

  const user = await UserModel.findOne({ key });

  if (user) {
    res.status(204).send({ message: USER_ALREADY_EXISTS });
    return;
  }

  if (!verifySignature(key, encryptedKey)) {
    console.log("Key verification failed");
    res.status(403).send({ message: UNAUTHORIZED });
    return;
  }

  let result;
  try {
    result = await UserModel({
      key,
      balance: INITIAL_BALANCE,
      refresh: INITIAL_DATE,
    }).save();
  } catch (e) {
    if (e.code === 11000) {
      res.status(204).send({ message: USER_ALREADY_EXISTS });
      return;
    }
  }

  if (!result) {
    res.status(500).send({ message: USER_CREATION_FAILED });
    return;
  }

  res.status(200).send({ message: USER_CREATED });
};

/**
 * Endpoint for deleting a user.
 *
 * If the user does not exist, returns 404.
 * If the keys do not match, returns 403 (Forbidden).
 * If the user is successfully deleted, returns 200.
 *
 * @param {Request} req Request containing the user's key
 * @param {Response} res Response containing the result of the delete operation
 */
module.exports.deleteUser = async (req, res) => {
  const { key, encryptedKey } = req.params.key;
  const user = await UserModel.findOne({ key });

  if (!user) {
    res.status(404).send({ message: USER_NOT_FOUND });
    return;
  }

  if (!verifySignature(key, encryptedKey)) {
    res.status(403).send({ message: UNAUTHORIZED });
    return;
  }

  const result = await UserModel.deleteOne({ key });

  res.status(200).send({ message: USER_DELETED });
};

/**
 * Endpoint for getting the balance of a user.
 *
 * If the user does not exist, returns 404.
 * If the user's balance is less than 1, sets the balance to 1.
 * Reponse includes the user's balance and refresh date.
 *
 * @param {Request} req Request containing the user's key
 * @param {Response} res Response containing the user's balance
 * @returns {void}
 */
module.exports.userBalance = async (req, res) => {
  const key = req.params.key;
  const user = await UserModel.findOne({ key });

  if (!user) {
    res.status(404).send({ message: USER_NOT_FOUND });
    return;
  }

  if (!user.refresh) {
    user.refresh = new Date(new Date().getTime() - REFRESH_TIME);
    await user.save();
  }

  if (user.balance < 1 && user.refresh < new Date()) {
    user.balance = REFRESH_BALANCE;
    await user.save();
  }

  const { balance, refresh } = user;

  res.json({ balance, refresh, message: SUCCESS });
};

/**
 * Endpoint for retreiving the total number of users.
 * @param {Request} req Request containing the user's key
 * @param {Response} res Response containing the total number of users
 */
module.exports.totalUsers = async (req, res) => {
  let total = cache.get(TOTAL_USERS_CACHE_KEY);
  const cached = !!total;

  if (!total) {
    const users = await UserModel.find();
    total = users.length;
    cache.set(TOTAL_USERS_CACHE_KEY, total);
  }

  res.json({ total, SUCCESS, cached });
};
