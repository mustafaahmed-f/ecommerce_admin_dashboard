import { Button } from "@/app/_components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { useNotificationsContext } from "../context/NotificationsProvider";
import { notification } from "../types/NotificationType";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";

interface NotificationItemProps {
  notificationObj: notification;
}

function NotificationItem({ notificationObj }: NotificationItemProps) {
  const { message, url, read, createdAt, _id } = notificationObj;
  const { setNotifications } = useNotificationsContext();
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  async function handleRead() {
    const res = await fetch(`/api/notifications/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ read: true }),
    });
    const jsonResponse = await res.json(); // even if !res.ok, still need this

    if (!res.ok) {
      showErrorToast(
        jsonResponse.error ||
          jsonResponse.message ||
          `Failed getting record : ${res.statusText} `,
      );
      return;
    }

    if (!jsonResponse.success) {
      showErrorToast(
        jsonResponse.error || jsonResponse.message || "Unknown error from API",
      );
      return;
    }

    showSuccessToast("Notification updated successfully !!");

    setNotifications((prev) =>
      prev.map((n) => (n._id === _id ? { ...n, read: true } : n)),
    );
  }

  const content = (
    <div
      className={`flex w-full flex-nowrap items-center justify-between border border-gray-200 p-4 transition hover:bg-gray-100`}
    >
      <div>
        {url ? (
          <Link
            className="hover:text-primary flex cursor-pointer flex-nowrap items-center gap-1 text-wrap whitespace-break-spaces underline"
            href={url}
          >
            <span>
              {message} <Link2Icon size={16} />
            </span>
          </Link>
        ) : (
          <div className="text-sm text-wrap whitespace-break-spaces text-gray-800">
            {message}
          </div>
        )}
        <div className="mt-1 text-xs text-gray-500">{formattedTime}</div>
      </div>
      {!read ? (
        <Button
          variant={"default"}
          className="h-1 w-1 cursor-pointer rounded-full p-1"
          onClick={handleRead}
        ></Button>
      ) : (
        <span> </span>
      )}
    </div>
  );

  return <div>{content}</div>;
}

export default NotificationItem;
