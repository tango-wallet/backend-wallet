const express = require("express");
const router = express.Router();

const {
  boomHandler,
  protect,
  admin,
  mitigate,
  joiValidation,
} = require("../middleware");
const { loginUser, registerUser, getInfoUser } = require("../controllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/info/user").get(protect, getInfoUser);

module.exports = router;
