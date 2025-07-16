import { fakeNotifications } from "../utils/fakeNotifications";
import NotificationItem from "./NotificationItem";

interface NotificationsDropListProps {
  open: boolean;
  refElement: React.RefObject<HTMLUListElement | null>;
}

function NotificationsDropList({
  refElement,
  open,
}: NotificationsDropListProps) {
  return (
    <ul
      className={`notifications-list ${open ? "active" : "inactive"} absolute top-[86px] right-2 flex flex-col rounded-2xl border border-gray-200 bg-white py-2`}
      ref={refElement}
    >
      <p className="p-2 text-sm font-semibold">Notifications</p>
      {fakeNotifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notificationObj={notification}
        />
      ))}
    </ul>
  );
}

export default NotificationsDropList;
