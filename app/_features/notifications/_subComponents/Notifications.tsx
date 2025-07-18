"use client";
import { BellRingIcon } from "lucide-react";
import { Button } from "../../../_components/ui/button";
import NotificationsDropList from "./NotificationsDropList";
import { useEffect, useRef, useState } from "react";
import { showSuccessToast } from "@/app/_utils/toasts";
import { notification } from "../types/NotificationType";
import { useQuery } from "@tanstack/react-query";
import NotificationsProvider from "../context/NotificationsProvider";

interface NotificationsProps {}

function Notifications({}: NotificationsProps) {
  const { 0: open, 1: setOpen } = useState<boolean>(false);
  const { 0: notifications, 1: setNotifications } = useState<notification[]>(
    [],
  );
  const { 0: page, 1: setPage } = useState<number>(1);
  const dropList = useRef<HTMLUListElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);
  const lastCreatedAt = notifications.length
    ? new Date(notifications[notifications.length - 1]?.createdAt).toISOString()
    : null;
  // const lastCreatedAt = new Date("2025-07-17T18:14:55.482+00:00").toISOString();

  const { isFetching, data: fetchedData } = useQuery({
    queryKey: ["notifications", page],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications?lastCreatedAt=${encodeURIComponent(lastCreatedAt ?? "")}&limit=8`,
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (fetchedData && fetchedData.success) {
      setNotifications((prev) => [...prev, ...(fetchedData?.result ?? [])]);
    }
  }, [fetchedData, setNotifications]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropList.current && btn.current) {
        if (
          !dropList.current.contains(e.target as Node) &&
          !btn.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setOpen]);

  useEffect(() => {
    const evtSource = new EventSource("/api/stream");
    evtSource.onmessage = (event) => {
      if (!event.data) return;
      const data = JSON.parse(event.data);
      showSuccessToast(data.message, {
        icon: "📢",
      });
      setNotifications((prev) => [data, ...prev]);
      console.log("New notification:", data);
    };

    return () => evtSource.close();
  }, [setNotifications]);

  return (
    <NotificationsProvider
      value={{ open, isFetching, notifications, setNotifications, setPage }}
    >
      <Button
        variant={"outline"}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
        ref={btn}
      >
        <BellRingIcon />
      </Button>
      <NotificationsDropList refElement={dropList} />
    </NotificationsProvider>
  );
}

export default Notifications;
