import Redis from "ioredis";
import logger from "./logger";

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("connect", () => {
    logger.info("Redis  connected ✅");
});

redis.on("error", (error) => {
    logger.error("Redis connection failed ❌", error);
});

export default redis;