const {
  createUser,
  userBalance,
  deleteUser,
} = require("../controllers/UserControllers");

const router = require("express").Router();

router.post("/create", createUser);
router.delete("/delete", deleteUser);
router.get("/balance/:key", userBalance);

module.exports = router;
