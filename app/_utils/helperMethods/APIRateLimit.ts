import { APIRateLimitKey } from "../constants/APIRateLimitKey";
import { redis } from "../redisClient";

export async function APIRateLimit({
  ip = "",
  expiry = 60,
  requestsLimit = 5,
}: {
  ip: string;
  expiry: number;
  requestsLimit: number;
}): Promise<boolean> {
  let key = `${APIRateLimitKey}:${ip}`;

  const count = await redis.incr(key);

  if (count === 1) {
    // This means the key is newly created → set expiry
    await redis.expire(key, expiry);
  }

  if (count > requestsLimit) {
    return true; // rate limit exceeded
  }

  return false;
}
