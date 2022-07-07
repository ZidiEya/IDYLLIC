// order model
const mongoose = require("mongoose");
const ItemproductSchema=new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    qte:{
        type:Number,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
})
const SchemaOrder = new mongoose.Schema(
  {
    customer: {
        type:mongoose.Types.ObjectId,
        ref:'Customer'
    },
    ref: {
        type: String,
      },
    quntitierTotal: {
      type: String,
      required: true,
    },
    priceTotale: {
      type: Number,
      required: true,
      trim: true,
    },
    pay: {
      type: Boolean,
      default:false
    },
  products:[ItemproductSchema],
  },

  { timestamps: true }
);
module.exports = mongoose.model("Order", SchemaOrder);
