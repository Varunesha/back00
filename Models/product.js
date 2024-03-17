import mongoose from "mongoose";
const productData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
const productdata = mongoose.model("products", productData);

export default productdata;
