// subcategory model
const mongoose = require("mongoose");
const subcategoryShema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: 4,
    },
    description: {
      type: String,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subcategoryShema);
