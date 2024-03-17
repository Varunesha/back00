import mongoose from "mongoose";
const signupData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const signup = mongoose.model("users", signupData);

export default signup;
