import { formatDistanceToNow } from "date-fns";
import { notification } from "../types/NotificationType";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Link2Icon } from "lucide-react";

interface NotificationItemProps {
  notificationObj: notification;
}

function NotificationItem({ notificationObj }: NotificationItemProps) {
  const { message, url, read, createdAt } = notificationObj;
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  function handleRead() {}

  const content = (
    <div
      className={`flex w-full flex-nowrap items-center justify-between border border-gray-200 p-4 transition hover:bg-gray-100`}
    >
      <div>
        {url ? (
          <Link
            className="hover:text-foreground flex cursor-pointer flex-nowrap items-center gap-1 text-wrap whitespace-break-spaces underline"
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
