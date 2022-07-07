// Product model
const mongoose = require("mongoose");
const GallerySchema=new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true,
  },
  description:{
    type:String,
    trim:true,
    required:true,
  },
})
//Schema for product
const productSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quntiter: {
      type: Number,
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    //populate product in subcategory
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    gallery:[GallerySchema]
  },
  { timestamps: true }
);
//Export the product Model
module.exports = mongoose.model("Product", productSchema);
