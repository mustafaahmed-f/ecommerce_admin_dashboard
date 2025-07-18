import MiniSpinner from "@/app/_components/general/MiniSpinner";
import { useNotificationsContext } from "../context/NotificationsProvider";
import NotificationItem from "./NotificationItem";

interface NotificationsDropListProps {
  refElement: React.RefObject<HTMLUListElement | null>;
}

function NotificationsDropList({ refElement }: NotificationsDropListProps) {
  const { open, notifications, isFetching, setPage, isError, error, hasMore } =
    useNotificationsContext();

  function handleScroll(e: React.UIEvent<HTMLUListElement>) {
    const element = e.currentTarget as HTMLUListElement;

    if (
      element.scrollHeight - element.scrollTop - element.clientHeight <= 1 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <ul
      className={`notifications-list ${open ? "active" : "inactive"} absolute top-[86px] right-2 flex flex-col rounded-2xl border border-gray-200 bg-white py-2`}
      ref={refElement}
      onScroll={handleScroll}
    >
      <p className="p-2 text-sm font-semibold">Notifications</p>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notificationObj={notification}
        />
      ))}
      {isFetching && !isError && (
        <div className="mt-2 mb-1 flex w-full items-center">
          <MiniSpinner />
        </div>
      )}
      {isError && (
        <p className="mt-2 mb-1 flex w-full items-center justify-center text-center text-sm text-red-500">
          {error}
        </p>
      )}
    </ul>
  );
}

export default NotificationsDropList;
