import MiniSpinner from "@/app/_components/general/MiniSpinner";
import { useNotificationsContext } from "../context/NotificationsProvider";
import NotificationItem from "./NotificationItem";
import { Button } from "@/app/_components/ui/button";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";

interface NotificationsDropListProps {
  refElement: React.RefObject<HTMLUListElement | null>;
}

function NotificationsDropList({ refElement }: NotificationsDropListProps) {
  const {
    open,
    notifications,
    isFetching,
    setPage,
    isError,
    error,
    hasMore,
    loading,
    setNotifications,
  } = useNotificationsContext();

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

  async function handleMarkAllAsRead() {
    // Optimistically update UI immediately
    setNotifications((prev) =>
      prev.map((n) => (n.read ? n : { ...n, read: true })),
    );

    // Send async request without blocking UI
    fetch("/api/notifications/mark-all-read", {
      method: "PATCH",
    }).then(async (res) => {
      if (!res.ok) {
        const json = await res.json();
        showErrorToast(json.message || "Failed to mark all as read");
      } else {
        showSuccessToast("All notifications marked as read");
      }
    });
  }

  return (
    <ul
      className={`notifications-list ${open ? "active" : "inactive"} ${loading && "pointer-events-none opacity-65"} absolute top-[86px] right-2 flex flex-col rounded-2xl border border-gray-200 bg-white py-2`}
      ref={refElement}
      onScroll={handleScroll}
    >
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <p className="p-2 text-xl font-semibold">Notifications</p>
        <Button
          variant={"link"}
          onClick={handleMarkAllAsRead}
          className="cursor-pointer"
        >
          Mark all as read
        </Button>
      </div>
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
