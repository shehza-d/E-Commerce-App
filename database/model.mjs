import mongoose from "mongoose";

const MongoDB =(dbURI)=> {
}

const db = mongoose.model(
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

const ConnectMongoDB = (url) => {
  return mongoose.connect(url)
}
// module.exports = ConnectMongoDB
export {MongoDB,db };