const {
  createUser,
  userBalance,
  deleteUser,
  totalUsers
} = require("../controllers/UserControllers");

const router = require("express").Router();

router.post("/create", createUser);
router.delete("/delete", deleteUser);
router.get("/balance/:key", userBalance);
router.get("/total", totalUsers);

module.exports = router;
