const express = require("express");
const router = express.Router();

const { loginUser, registerUser, getInfoUser } = require("../controllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/info/user").get(getInfoUser);

module.exports = router;
