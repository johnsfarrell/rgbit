const ImageModel = require("../models/ImageModel");
const UserModel = require("../models/UserModel");
const {
  INVALID_KEY,
  INSUFFICIENT_BALANCE,
  SUCCESS,
  MISSING_IMAGE,
  COLORIZE_FAILED,
  IMAGE_CREATION_FAILED,
  IMAGE_NOT_FOUND,
} = require("../config/messages");
const { getRefreshTime } = require("../util/time");
const { generateUniqueKey } = require("../util/key");

const fs = require("fs");
const colorize = require("../util/api");

/**
 * Get image from database by id.
 *
 * If image is not found, returns 404.
 * If image is found, returns 200.
 *
 * @param {Request} req Express request object, containing image id
 * @param {Response} res Express response object
 * @returns {void}
 */
module.exports.getImage = async (req, res) => {
  const image = await ImageModel.findOne({ id: req.params.id });

  if (!image) {
    res.status(404).send(IMAGE_NOT_FOUND);
    return;
  }

  const { colored } = image;

  return res.send({
    status: 200,
    message: SUCCESS,
    colored: colored,
  });
};

/**
 * Colorizes an image for a user.
 *
 * If the user does not exist, returns 403.
 * If the user's balance is less than 1, returns 402.
 * If no image is provided, returns 400.
 * If user's balance > 0, colorizes image, returns 200.
 * If the image fails to colorize, returns 500.
 * If image fails to save, returns 500.
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @returns {void}
 */
module.exports.colorizeImage = async (req, res) => {
  const key = req.params.key;
  const user = await UserModel.findOne({ key });

  if (!user) {
    res.status(403).send({ message: INVALID_KEY });
    return;
  }

  if (user.balance <= 0) {
    res.status(402).send({ message: INSUFFICIENT_BALANCE });
    return;
  }

  const file = req.file;
  if (!file) {
    res.status(400).send({ message: MISSING_IMAGE });
    return;
  }

  const original = fs.readFileSync(file.path);

  const colored = await colorize(original);

  if (!colored) {
    res.status(500).send({ message: COLORIZE_FAILED });
    return;
  }

  const id = generateUniqueKey();

  try {
    await ImageModel({
      id,
      key,
      original,
      colored,
    }).save();
  } catch (error) {
    res.status(500).send({ message: IMAGE_CREATION_FAILED });
    return;
  }

  // if successfully colorized, charge user
  if (user.refresh < Date.now()) user.balance -= 1;
  if (user.balance === 0) user.refresh = getRefreshTime();

  await user.save();

  res.send({
    status: 200,
    remainingBalance: user.balance,
    refresh: user.refresh,
    message: SUCCESS,
    imageId: id,
    download: `${process.env.SERVER_URL}/api/image/get/${id}`,
    redirect: `${process.env.CLIENT_URL}/#image=${id}`,
  });
};
