const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const crypto = require("crypto");
const Boom = require("@hapi/boom");
const generateToken = require("../utils/generateToken");
const verifyGoogleToken = require("../utils/verifyGoogleToken");

const registerUser = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  try {
    const infoUser = await verifyGoogleToken(code);
    if (!infoUser) throw Boom.badRequest("Error: verifyGoogleToken failed");

    const parsedEmail = infoUser.email.toLowerCase();

    let userInfo = {};

    const existEmail = await User.findOne({ email: parsedEmail });

    const generateAlias = () => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      let alias = "";
      for (let i = 0; i < 5; i++) {
        alias += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return alias;
    };

    if (!existEmail) {
      userInfo = await User.create({
        email: infoUser.email.toLowerCase(),
        balance: 10,
        alias: generateAlias(),
      });
      if (!userInfo) throw Boom.badRequest("Error: User could not be created");
    } else {
      userInfo = existEmail;
    }

    return res.status(201).json({
      message: "User created successfully",
      user: userInfo,
      register: existEmail ? true : false,
      token: generateToken(userInfo._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

const updateAddressAndSmartContract = asyncHandler(async (req, res, next) => {
  const { email, address } = req.body;
  try {
    const userInfo = await User.findOne({ email });
    if (!userInfo) throw Boom.badRequest("Error: User not found");

    userInfo.wallet = address;
    userInfo.smart_contract = crypto.randomBytes(20).toString("hex");

    await userInfo.save();

    return res.status(200).json({
      message: "User updated successfully",
      userInfo,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const updatePrivateKey = asyncHandler(async (req, res, next) => {
  const { seedPhrase, privateKey, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Boom.badRequest("Error: User not found");

    user.privateKey = privateKey;
    user.seedPhrase = seedPhrase;
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const getInfoUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const userInfo = await User.findById(id);
    if (!userInfo) throw Boom.badRequest("Error: User not found");
    console.log(userInfo);
    return res.status(200).json({
      status: true,
      userInfo,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const transferUser = asyncHandler(async (req, res, next) => {
  const { senderID, amount, wallet, alias } = req.body;
  try {
    const userInfo = await User.findById(senderID);
    if (!userInfo) throw Boom.badRequest("Error: User not found");

    if (userInfo.balance < amount) {
      throw Boom.badRequest("Error: Insufficient balance");
    }

    const infoUserWallet = await User.findOne({ wallet });
    const infoUserAlias = await User.findOne({ alias });

    if (!infoUserWallet && !infoUserAlias) {
      throw Boom.badRequest("Error: User not found");
    }
    console.log(infoUserWallet, infoUserAlias);
    if (infoUserWallet) {
      console.log("Monto a transferir: ", amount);
      infoUserWallet.balance += Number(amount);
      await infoUserWallet.save();
    } else if (infoUserAlias) {
      infoUserAlias.balance += amount;
      await infoUserAlias.save();
    }

    userInfo.balance -= amount;

    await userInfo.save();

    return res.status(200).json({
      status: true,
      message: "Transfer completed successfully",
      userInfo,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getInfoUser,
  updatePrivateKey,
  updateAddressAndSmartContract,
  transferUser,
};
