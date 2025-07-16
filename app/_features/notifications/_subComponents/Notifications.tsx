"use client";
import { BellRingIcon } from "lucide-react";
import { Button } from "../../../_components/ui/button";
import NotificationsDropList from "./NotificationsDropList";
import { useEffect, useRef, useState } from "react";
import { showSuccessToast } from "@/app/_utils/toasts";

interface NotificationsProps {}

function Notifications({}: NotificationsProps) {
  const { 0: open, 1: setOpen } = useState<boolean>(false);
  const dropList = useRef<HTMLUListElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);
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
      console.log("New notification:", data);
    };

    return () => evtSource.close();
  }, []);

  return (
    <>
      <Button
        variant={"outline"}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
        ref={btn}
      >
        <BellRingIcon />
      </Button>
      <NotificationsDropList open={open} refElement={dropList} />
    </>
  );
}

export default Notifications;
