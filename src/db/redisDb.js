import { createClient } from "redis";
import envConfig from "../config/index.js";
const { REDIS_URI } = envConfig;
const client = createClient({
  url: REDIS_URI,
});
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

export default client;
