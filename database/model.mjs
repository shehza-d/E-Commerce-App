import mongoose from "mongoose";

const productModel = mongoose.model(
  "productSchema",
  new mongoose.Schema({
    productName: { type: String, require: true },
    productDescription: String,
    productPrice: { type: Number, require: true },
    productImg: { type: String, required: false },
    // classID: String,
    createdDate: { type: Date, default: Date.now },
  })
);

export default productModel;
