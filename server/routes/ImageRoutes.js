const { MAX_SIZE } = require("../config/const");
const { FILE_SIZE_EXCEEDED } = require("../config/messages");
const {
  getImage,
  colorizeImage,
  totalImages,
} = require("../controllers/ImageControllers");

const router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/", limits: { fileSize: MAX_SIZE } });

router.get("/total", totalImages);
router.get("/get/:id", getImage);
router.post("/colorize/:key", upload.single("image"), colorizeImage);

/**
 * if file to large, return 413
 */
router.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(413).send({ message: FILE_SIZE_EXCEEDED });
    return;
  }
});

module.exports = router;
