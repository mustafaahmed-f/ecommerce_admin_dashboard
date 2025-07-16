import { redis } from "./redisClient";
import { Ratelimit } from "@upstash/ratelimit";

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "60 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});
