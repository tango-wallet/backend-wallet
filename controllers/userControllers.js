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
    console.log(infoUser);
    const parsedEmail = infoUser.email.toLowerCase();

    const userRegister = await User.findOne({ email: parsedEmail });

    let newUser = null;
    if (!userRegister) {
      newUser = await User.create({
        email: infoUser.email.toLowerCase(),
      });
      if (!newUser) throw Boom.badRequest("Error: User could not be created");
    }

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      register: userRegister ? false : true,
    });
  } catch (error) {
    console.log(error);
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
  const { _id } = req.user;
  try {
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getInfoUser,
};
