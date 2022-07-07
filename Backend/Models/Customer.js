const mongoose = require("mongoose");
const User = require("./User");
const SchemaCustomer = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: false,
      trim: true,
    },

    picture: {
      type: String,
    },
    orders:[{
      type:mongoose.Types.ObjectId,
      ref:'Order'
    }]
  },
  { timestamps: true }
);
module.exports = User.discriminator("Customer", SchemaCustomer);
