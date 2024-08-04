const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getInfoUser,
  updatePrivateKey,
  updateAddressAndSmartContract,
} = require("../controllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/info/user").get(getInfoUser);

router.route("/update/privatekey").post(updatePrivateKey);
router.route("/update/address").post(updateAddressAndSmartContract);

module.exports = router;
