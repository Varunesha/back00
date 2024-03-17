import mongoose from "mongoose";
const orderData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentdate: {
    type: String,
    required: true
  },
  productname: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: String,
    required: true
  },
  orderstatus: {
    type: String,
    required: true
  }
});
const orderdata = mongoose.model("orders", orderData);

export default orderdata;
