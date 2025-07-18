import Redis from "ioredis";

export const redisSubscriber = new Redis(
  process.env.UPSTASH_REDIS_URL_TCP as string,
);
