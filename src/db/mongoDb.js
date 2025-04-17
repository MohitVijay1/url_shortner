import mongoose from "mongoose";
import envConfig from "../config/index.js";
const { MONGODB_URI } = envConfig;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully", conn.connection.host);
  } catch (err) {
    console.log("err in connectDb", err.message);
  }
};
export default connectDB;
