import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";
import { useNotificationsContext } from "../context/NotificationsProvider";
import { notification } from "../types/NotificationType";
import { EllipsisVertical } from "lucide-react";

interface NotificationActionsProps {
  notificationObj: notification;
}

function NotificationActions({ notificationObj }: NotificationActionsProps) {
  const { setNotifications, setOpen } = useNotificationsContext();
  const { read, _id } = notificationObj;
  async function handleUnread() {
    if (!read) return;

    const res = await fetch(`/api/notifications/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ read: false }),
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
      prev.map((n) => (n._id === _id ? { ...n, read: false } : n)),
    );
  }

  async function handleDelete() {
    const res = await fetch(`/api/notifications/${_id}`, {
      method: "DELETE",
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

    showSuccessToast("Notification deleted successfully !!");

    setNotifications((prev) => prev.filter((n) => n._id !== _id));
  }
  return (
    <DropdownMenu data-inside-dropdown>
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVertical size={12} />
      </DropdownMenuTrigger>
      <DropdownMenuContent data-inside-dropdown style={{ zIndex: 99999 }}>
        <DropdownMenuItem
          onClick={(e) => {
            // setOpen(true);
            handleUnread();
          }}
          className="cursor-pointer"
        >
          Mark as unread
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            // setOpen(true);
            handleDelete();
          }}
          className="cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationActions;
