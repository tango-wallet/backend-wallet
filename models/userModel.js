const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    wallet: {
      type: String,
      required: false,
    },
    smart_contract: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
