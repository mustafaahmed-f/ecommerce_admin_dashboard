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
  const { 0: hasMore, 1: setHasMore } = useState<boolean>(false);
  const { 0: loading, 1: setLoading } = useState<boolean>(false);
  const dropList = useRef<HTMLUListElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);
  const lastCreatedAt = notifications.length
    ? new Date(notifications[notifications.length - 1]?.createdAt).toISOString()
    : null;
  // const lastCreatedAt = new Date("2025-07-17T18:14:55.482+00:00").toISOString();

  const {
    isFetching,
    data: fetchedData,
    error,
    isError,
  } = useQuery({
    queryKey: ["notifications", page],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      setHasMore(fetchedData.hasMore);
    }
  }, [fetchedData, setNotifications, setHasMore]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (dropList.current && btn.current) {
        if (
          !dropList.current.contains(target) &&
          !btn.current.contains(target) &&
          !target.closest("[data-inside-dropdown]")
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
      value={{
        open,
        setOpen,
        loading,
        setLoading,
        isFetching,
        notifications,
        setNotifications,
        setPage,
        error,
        isError,
        hasMore,
      }}
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
