import notificationsModel from "@/app/_mongoDB/models/notificationsModel";
import { channelName } from "./redisPublishChannel";
import { redis } from "@/app/_utils/redisClient";
import { GenerateEvents } from "./GenerateEvents";
import { GenerateNotificationMessage } from "./GenerateNotificationMessage";
import { notification } from "../types/NotificationType";
import { ModulesArray } from "@/app/_utils/constants/ModulesSet";
import { actions } from "@/app/_utils/constants/Actions";

export async function PushNotification(
  adminId: string,
  module: (typeof ModulesArray)[number],
  eventAction: (typeof actions)[keyof typeof actions],
  messageAction: keyof typeof actions,
  title: string,
  url?: string,
) {
  const notificationObj: Omit<notification, "_id"> = {
    event: GenerateEvents(module, eventAction),
    message: GenerateNotificationMessage(module, title, messageAction),
    url:
      messageAction === "deleted" && eventAction === "Deleted"
        ? ""
        : (url ?? ""),
    audience: "admin",
    userId: adminId,
    read: false,
    createdAt: new Date(),
  };

  const newNotification = await notificationsModel.create(notificationObj);
  if (!newNotification) throw new Error("Failed creating notification");

  await redis.publish(channelName, JSON.stringify(newNotification.toObject()));
}
