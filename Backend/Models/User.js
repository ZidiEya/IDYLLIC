// user model
const mongoose = require("mongoose");
const SchemaUser = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    resetPasswordToken:{
      type:String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", SchemaUser);
