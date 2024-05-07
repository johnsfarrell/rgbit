const { getImage, colorizeImage } = require("../controllers/ImageControllers");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = require("express").Router();

router.get("/get/:id", getImage);
router.post("/colorize/:key", upload.single("image"), colorizeImage);

module.exports = router;
