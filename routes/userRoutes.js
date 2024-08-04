const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getInfoUser,
  updatePrivateKey,
  updateAddressAndSmartContract,
  transferUser,
} = require("../controllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/info/user/:id").get(getInfoUser);

router.route("/update/privatekey").post(updatePrivateKey);
router.route("/update/address").post(updateAddressAndSmartContract);
router.route("/transfer").post(transferUser);

module.exports = router;
