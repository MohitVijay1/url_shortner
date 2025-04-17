import dotenv from "dotenv";
dotenv.config();
const envConfig = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URI: process.env.REDIS_URI,
};

export default envConfig;
