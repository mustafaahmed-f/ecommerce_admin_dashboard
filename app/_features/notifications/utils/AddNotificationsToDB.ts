import notificationsModel from "@/app/_mongoDB/models/notificationsModel";
import { notification } from "../types/NotificationType";

export async function AddNotificationsToDB() {
  const userId = "6735ea601a6d1825e8c37e1e"; // Replace with a valid user ID if needed
  const audience = "admin"; // Adjust if needed

  const notifications: Omit<notification, "_id">[] = Array.from(
    { length: 25 },
    (_, i) => {
      const createdAt = new Date(Date.now() - i * 1000 * 60); // 1-minute intervals

      return {
        event: `event_${i}`,
        message: `Test notification message #${i + 1}`,
        userId,
        audience,
        read: false,
        url: `/notifications/${i}`,
        createdAt,
      };
    },
  );

  await Promise.all(notifications.map((n) => notificationsModel.create(n)));

  console.log("✅ 25 notifications added to the DB");
}
