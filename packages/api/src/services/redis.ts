import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "@config";
import Redis from "ioredis";

const redis = new Redis({
  host: REDIS_HOST!,
  port: +REDIS_PORT!,
  password: REDIS_PASSWORD!,
});

redis.on("connect", () => {
  console.log("Connected to Redis...");
});

export default redis;
