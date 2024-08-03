const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Boom = require("@hapi/boom");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res, next) => {
  try {
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
