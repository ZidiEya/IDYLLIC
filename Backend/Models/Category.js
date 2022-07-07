// category models
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      trim: true,
    },
    description: {
      type: String,
    },
    subcategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
