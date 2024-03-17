import mongoose from "mongoose";

const connectionDB = () => {
  try {
    mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("mongoDB is connected");
  } catch (error) {
    throw error;
  }
};

export default connectionDB;
