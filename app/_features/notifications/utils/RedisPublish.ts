import { redis } from "@/app/_utils/redisClient";
import { channelName } from "./redisPublishChannel";
import { notification } from "../types/NotificationType";

export async function RedisPublish(obj: notification): Promise<boolean> {
  try {
    const count = await redis.publish(channelName, JSON.stringify(obj));
    if (count === 0) {
      console.warn("No subscribers received this message.");
    } else {
      console.log(`Published to ${count} subscribers`);
    }
  } catch (error) {
    console.error("Redis publish failed:", error);
    return false;
  }
  return true;
}
