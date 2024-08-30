import mongoose from "mongoose";
import "dotenv/config";
import env from "../utils/validateEnv";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
